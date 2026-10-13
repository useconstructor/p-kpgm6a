'use client';
import { useEffect,useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BrandRule } from './brand-rule';
import type { Service } from '@/lib/types';
export function AppointmentInvitation({services}:{services:Service[]}){
 const [id,setId]=useState(services[0]?.id??'');
 useEffect(()=>{const select=(e:Event)=>setId((e as CustomEvent<string>).detail);window.addEventListener('taller:service',select);return()=>window.removeEventListener('taller:service',select)},[]);
 const selected=services.find(s=>s.id===id);
 return <section id="cita" className="appointment-section"><Image src="/images/workbench-scene.jpg" alt="Herramientas del oficio sobre una mesa de barbería. Fotografía ilustrativa." fill sizes="100vw" quality={95} className="appointment-scene"/><div className="appointment-docket"><Image src="/images/clipboard-hd.png" alt="" width={145} height={176} className="paper-clip"/><div className="paper-border"><h2>Reserva tu lugar</h2><BrandRule/><p>Consulta disponibilidad y reserva<br/>tu turno de prueba.</p><label htmlFor="docket-service">Elige tu servicio de ejemplo</label><select id="docket-service" value={id} onChange={e=>setId(e.target.value)}><option value="" disabled>Elige un servicio</option>{services.map(s=><option key={s.id} value={s.id}>{s.name} · {s.duration} min</option>)}</select><Link href={selected?`/reservar?servicio=${selected.id}`:'/reservar'} className="solid-link">Reservar ahora</Link><span className="docket-note">Disponibilidad de ejemplo · confirmación en pantalla</span><span className="paper-stamp" aria-hidden="true">Taller<br/>de<br/>Corte</span></div></div></section>
}
