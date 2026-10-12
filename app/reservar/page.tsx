import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookingForm } from '@/components/booking-form';
import { services } from '@/lib/bookings';
import { dateWindow } from '@/lib/time';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Reserva de prueba',description:'Elige un servicio y un horario demostrativos para confirmar una reserva de prueba. No se envían correos.'};
export default async function BookingPage({searchParams}:{searchParams:Promise<{servicio?:string|string[]}>}){
 const query=await searchParams;const requested=typeof query.servicio==='string'?query.servicio:query.servicio?'invalid':'';
 let catalog:Awaited<ReturnType<typeof services>>=[];let failed=false;try{catalog=await services()}catch{failed=true}
 const valid=!!requested&&catalog.some(s=>s.id===requested);
 return <><Header/><main id="contenido" className="page-width py-10 max-sm:py-4"><Link href="/" className="mb-6 max-sm:mb-3 inline-flex min-h-11 items-center gap-2 text-base text-primary hover:underline"><ArrowLeft size={18}/>Volver al inicio</Link>{failed?<div role="alert" className="mb-12 rounded-lg border p-8"><h2 className="text-2xl">No pudimos cargar los servicios</h2><p className="mt-3">La conexión es temporalmente inaccesible. Puedes volver a intentarlo.</p><Link href="/reservar" className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-primary px-5 text-primary-foreground">Reintentar</Link></div>:<BookingForm services={catalog} initialService={valid?requested:''} invalidService={!!requested&&!valid} window={dateWindow()}/>}</main><Footer/></>
}
