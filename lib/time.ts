import { Temporal } from '@js-temporal/polyfill';
export const ZONE='Europe/Madrid';
export const BOOKING_WINDOW_DAYS=28;
export function dateWindow(now=Temporal.Now.instant()) {
 const today=now.toZonedDateTimeISO(ZONE).toPlainDate();
 return {min:today.toString(),max:today.add({days:BOOKING_WINDOW_DAYS-1}).toString()};
}
export function validDate(value:string,now=Temporal.Now.instant()) {
 try { if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false; const d=Temporal.PlainDate.from(value); const w=dateWindow(now); return d.toString()>=w.min && d.toString()<=w.max; } catch {return false;}
}
export function instantAt(date:string,time:string) {return Temporal.PlainDate.from(date).toZonedDateTime({timeZone:ZONE,plainTime:Temporal.PlainTime.from(time)}).toInstant();}
export function utc(instant:Temporal.Instant){return instant.toString({smallestUnit:'millisecond'});}
export function formatDate(date:string){return new Intl.DateTimeFormat('es-ES',{timeZone:ZONE,weekday:'long',day:'numeric',month:'long'}).format(new Date(instantAt(date,'12:00').epochMilliseconds));}
