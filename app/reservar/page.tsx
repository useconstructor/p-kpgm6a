import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookingForm } from '@/components/booking-form';
import { services, availability } from '@/lib/bookings';
import { dateWindow } from '@/lib/time';
import { Temporal } from '@js-temporal/polyfill';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Reserva de prueba',description:'Elige un servicio y un horario demostrativos para confirmar una reserva de prueba. No se envían correos.'};
export default async function BookingPage({searchParams}:{searchParams:Promise<{servicio?:string|string[]}>}){
 const query=await searchParams;const requested=typeof query.servicio==='string'?query.servicio:query.servicio?'invalid':'';
 let catalog:Awaited<ReturnType<typeof services>>=[];let failed=false;try{catalog=await services()}catch{failed=true}
 const valid=!!requested&&catalog.some(s=>s.id===requested);
 const range=dateWindow();let initialDate=range.min;
 const defaultService=valid?requested:!requested?catalog[0]?.id:undefined;
 if(defaultService){for(let offset=0;offset<28;offset+=7){const dates=Array.from({length:Math.min(7,28-offset)},(_,i)=>Temporal.PlainDate.from(range.min).add({days:offset+i}).toString());const results=await Promise.allSettled(dates.map(date=>availability(defaultService,date)));const found=results.findIndex(r=>r.status==='fulfilled'&&r.value.slots.length>0);if(found>=0){initialDate=dates[found];break;}}}
 return <><Header/><main id="contenido" className="booking-page page-width py-10 max-sm:py-4"><Link href="/" className="mb-6 max-sm:mb-3 inline-flex min-h-11 items-center gap-2 text-base text-primary hover:underline"><ArrowLeft size={18}/>Volver al inicio</Link>{failed?<div role="alert" className="mb-12 rounded-lg border p-8"><h2 className="text-2xl">No pudimos cargar los servicios</h2><p className="mt-3">La conexión es temporalmente inaccesible. Puedes volver a intentarlo.</p><Link href="/reservar" className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-primary px-5 text-primary-foreground">Reintentar</Link></div>:<BookingForm services={catalog} initialService={valid?requested:''} invalidService={!!requested&&!valid} window={range} initialDate={initialDate}/>}</main><Footer/></>
}
