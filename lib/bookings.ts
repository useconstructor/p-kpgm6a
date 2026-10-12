import 'server-only';
import { Temporal } from '@js-temporal/polyfill';
import type { Transaction, Row } from '@libsql/client';
import { createHash, randomUUID } from 'node:crypto';
import { getDb, initializeDb } from './db';
import { instantAt, validDate, utc, ZONE, BOOKING_WINDOW_DAYS } from './time';
import type { Service, Confirmation } from './types';
type Reader=Pick<Transaction,'execute'>;
export class BookingError extends Error {
 constructor(public status:number,message:string,public fields:Record<string,string>={}){super(message);}
}
export async function services():Promise<Service[]> {
 await initializeDb(); const {rows}=await getDb().execute('SELECT id,name,description,duration FROM services WHERE active=1 ORDER BY duration');
 return rows.map(r=>({id:String(r.id),name:String(r.name),description:String(r.description),duration:Number(r.duration)})).sort((a,b)=>['corte','barba','corte-y-barba'].indexOf(a.id)-['corte','barba','corte-y-barba'].indexOf(b.id));
}
async function service(db:Reader,id:string) {
 const {rows}=await db.execute({sql:'SELECT id,name,description,duration FROM services WHERE id=? AND active=1',args:[id]});
 if(!rows.length) throw new BookingError(400,'Revisa el servicio elegido.',{service:'Este servicio no existe o ya no está activo. Elige uno de la lista.'});
 return {id:String(rows[0].id),name:String(rows[0].name),duration:Number(rows[0].duration)};
}
async function allowedSlots(db:Reader,id:string,date:string) {
 if(!validDate(date)) throw new BookingError(400,'Revisa la fecha.',{date:`Elige una fecha dentro de los próximos ${BOOKING_WINDOW_DAYS} días en Europe/Madrid.`});
 const s=await service(db,id);
 const weekday=Temporal.PlainDate.from(date).dayOfWeek;
 const {rows:rules}=await db.execute({sql:'SELECT * FROM availability_rules WHERE weekday=? AND resource=?',args:[weekday,'silla-1']});
 const now=Temporal.Now.instant();
 const slots:{time:string;start:string;end:string}[]=[];
 for(const r of rules){
  const start=instantAt(date,String(r.start_time));const end=instantAt(date,String(r.end_time));
  for(let t=start;Temporal.Instant.compare(t.add({minutes:s.duration}),end)<=0;t=t.add({minutes:10})){
   if(Temporal.Instant.compare(t,now)<=0) continue;
   slots.push({time:t.toZonedDateTimeISO(ZONE).toPlainTime().toString({smallestUnit:'minute'}),start:utc(t),end:utc(t.add({minutes:s.duration}))});
  }
 }
 return {service:s,slots,closed:rules.length===0};
}
export async function availability(id:string,date:string){
 await initializeDb();const db=getDb(); const allowed=await allowedSlots(db,id,date);
 const {rows}=await db.execute({sql:'SELECT start_utc,end_utc FROM bookings WHERE resource=? AND start_utc<? AND end_utc>?',args:['silla-1',utc(instantAt(Temporal.PlainDate.from(date).add({days:1}).toString(),'00:00')),utc(instantAt(date,'00:00'))]});
 return {date,timezone:ZONE,slots:allowed.slots.filter(s=>!rows.some(r=>String(r.start_utc)<s.end&&String(r.end_utc)>s.start)).map(s=>s.time),closed:allowed.closed};
}
function summary(row:Row,name:string,duration:number):Confirmation {
 const z=Temporal.Instant.from(String(row.start_utc)).toZonedDateTimeISO(ZONE);
 return {id:String(row.id),service:name,duration,date:z.toPlainDate().toString(),time:z.toPlainTime().toString({smallestUnit:'minute'}),timezone:ZONE};
}
export async function createBooking(input:unknown) {
 if(!input || typeof input!=='object' || Array.isArray(input)) throw new BookingError(400,'El formulario no es válido.');
 const b=input as Record<string,unknown>;const fields:Record<string,string>={};
 const string=(key:string)=>typeof b[key]==='string'?(b[key] as string).trim():'';
 const name=string('name'),email=string('email').toLowerCase(),id=string('service'),date=string('date'),time=string('time'),key=string('idempotencyKey');
 if(name.length<2||name.length>100) fields.name='Introduce un nombre de entre 2 y 100 caracteres.';
 if(email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email))fields.email='Introduce un correo electrónico válido.';
 if(!id||id.length>80)fields.service='Elige un servicio de ejemplo.';
 if(!date)fields.date='Elige una fecha.';
 if(!/^\d{2}:\d{2}$/.test(time))fields.time='Elige una hora disponible.';
 if(!/^[a-zA-Z0-9-]{20,100}$/.test(key)) throw new BookingError(400,'No se pudo identificar el intento. Vuelve a cargar el formulario.');
 if(Object.keys(fields).length) throw new BookingError(400,'Revisa los campos indicados.',fields);
 const hash=createHash('sha256').update(JSON.stringify({name,email,id,date,time})).digest('hex');
 await initializeDb(); const tx=await getDb().transaction('write');
 try{
  const existing=await tx.execute({sql:'SELECT b.*,s.name AS service_name,s.duration AS service_duration FROM bookings b JOIN services s ON s.id=b.service_id WHERE idempotency_key=?',args:[key]});
  if(existing.rows.length){const r=existing.rows[0];if(r.payload_hash!==hash) throw new BookingError(409,'Esta clave ya se utilizó con datos diferentes. Inicia un nuevo intento.');await tx.commit();return {booking:summary(r,String(r.service_name),Number(r.service_duration)),replayed:true};}
  const allowed=await allowedSlots(tx,id,date);const slot=allowed.slots.find(s=>s.time===time);
  if(!slot)throw new BookingError(400,'Esta hora no está permitida.',{time:allowed.closed?'Los domingos no hay horarios de ejemplo. Elige otro día.':'Elige una hora futura que permita completar el servicio dentro del horario de ejemplo.'});
  const conflicts=await tx.execute({sql:'SELECT id FROM bookings WHERE resource=? AND start_utc<? AND end_utc>? LIMIT 1',args:['silla-1',slot.end,slot.start]});
  if(conflicts.rows.length)throw new BookingError(409,'Esta hora acaba de ocuparse. Elige otra hora.',{time:'Esta hora ya no está disponible.'});
  const bookingId=randomUUID();
  await tx.execute({sql:'INSERT INTO bookings(id,service_id,resource,name,email,start_utc,end_utc,idempotency_key,payload_hash) VALUES(?,?,?,?,?,?,?,?,?)',args:[bookingId,id,'silla-1',name,email,slot.start,slot.end,key,hash]});
  await tx.commit();return {booking:{id:bookingId,service:allowed.service.name,duration:allowed.service.duration,date,time,timezone:ZONE},replayed:false};
 }catch(e){await tx.rollback();if(String(e).includes('booking_overlap'))throw new BookingError(409,'Esta hora acaba de ocuparse. Elige otra hora.',{time:'Esta hora ya no está disponible.'});throw e;}finally{tx.close();}
}
