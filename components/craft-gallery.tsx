'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import type { Service } from '@/lib/types';
const studies = [
  { id: 'corte', label: 'Corte', title: 'La forma está en el detalle.', text: 'Textura, línea y contorno. Una mirada al trabajo que da forma al cabello.', image: '/images/craft-barber.jpg', alt: 'Fotografía ilustrativa de un corte con navaja y definición de contornos', position: '50% 55%' },
  { id: 'barba', label: 'Barba', title: 'Cada línea tiene intención.', text: 'Volumen y definición. Un estudio del gesto preciso con tijera y peine.', image: '/images/atelier.jpg', alt: 'Fotografía ilustrativa del arreglo de una barba con tijeras', position: '60% 35%' },
  { id: 'corte-y-barba', label: 'Corte + barba', title: 'Un acabado con carácter.', text: 'Textura y perfil. Cabello y barba reunidos en un mismo servicio.', image: '/images/craft-finish.jpg', alt: 'Fotografía ilustrativa del acabado de un corte con peine de metal', position: '50% 50%' },
];
export function CraftGallery({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const study = studies[active];
  const available = services.some(s => s.id === study.id);
  return <section id="oficio" className="craft-section page-width">
    <div className="section-heading"><p className="section-label">El oficio</p><h2>El buen corte<br />empieza en las manos.</h2><p className="section-intro">Un estudio de formas,<br />texturas y pequeños detalles.</p></div>
    <div className="craft-layout"><div className="study-selectors" role="group" aria-label="Explorar estilos"><span className="selection-track" aria-hidden="true" style={{ transform: `translateY(${active * 64}px)` }} />{studies.map((s, i) => <button key={s.id} type="button" aria-pressed={active === i} aria-controls="study-caption" onClick={() => { setActive(i); window.dispatchEvent(new CustomEvent('taller:service', { detail: s.id })); }}>{s.label}<span className="study-marker" aria-hidden="true" /></button>)}</div><div className="craft-visual"><figure className="study-image"><Image key={study.image} src={study.image} alt={study.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="craft-photo" style={{ objectPosition: study.position }} /><figcaption>Estudio de {study.label.toLowerCase()}</figcaption></figure><div className="craft-image-note"><MoveUpRight size={21} strokeWidth={1.3} /><span>Forma. Contorno. Carácter.</span></div></div>
    <div className="craft-side">
    <div id="study-caption" className="study-caption" aria-live="polite"><h3>{study.title}</h3><p>{study.text}</p><Link href={available ? `/reservar?servicio=${study.id}` : '/reservar'} className="text-link">{available ? `Reservar ${study.label.toLowerCase()}` : 'Ver disponibilidad'}<ArrowUpRight size={19} /></Link></div>
    <figure className="tool-inset"><Image src="/images/tools-steel.jpg" alt="Detalle ilustrativo de tijeras de acero cepillado sobre una superficie de trabajo" fill sizes="(max-width: 480px) 68vw, 300px" className="object-cover" /><figcaption>Las herramientas del oficio</figcaption></figure></div></div>
  </section>;
}
