'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { BrandRule } from './brand-rule';
import type { Service } from '@/lib/types';
const styles=[{label:'Clásico',service:'corte'},{label:'Degradado',service:'corte'},{label:'Texturizado',service:'corte'},{label:'Barba',service:'barba'},{label:'Diseño',service:'corte'},{label:'Largo natural',service:'corte'}];
export function CraftGallery({services}:{services:Service[]}){
 const [active,setActive]=useState<number|null>(null);const style=active===null?null:styles[active];const selected=services.find(s=>s.id===style?.service);
 return <section id="oficio" className="craft-section"><div className="page-width gallery-layout"><div className="section-sidebar"><h2>Elige tu <br/>estilo</h2><BrandRule short/><p>Cada corte es un diseño a medida. Explora estilos de ejemplo e inspírate para tu próxima visita.</p><Link className="solid-link" href="#servicios">Ver servicios</Link><div className="style-selection" aria-live="polite">{style&&<><p><strong>{style.label}</strong> seleccionado.</p><Link href={selected?`/reservar?servicio=${selected.id}`:'/reservar'} className="text-link">Consultar {selected?.name.toLowerCase()??'disponibilidad'}<ArrowRight size={17}/></Link></>}</div></div><div className="style-grid" role="group" aria-label="Estilos ilustrativos de ejemplo">{styles.map((s,i)=><button type="button" key={s.label} className={`style-card ${active===i?'selected':''}`} aria-label={s.label} aria-pressed={active===i} onClick={()=>{setActive(i);window.dispatchEvent(new CustomEvent('taller:service',{detail:s.service}));}}><div className="style-photo"><Image src={`/images/style-${i}.png`} alt={`Retrato ilustrativo: estilo ${s.label.toLowerCase()}`} fill sizes="(max-width: 600px) 44vw, (max-width: 900px) 23vw, 22vw" unoptimized/></div><span className="style-caption">{s.label}{active===i?<Check size={18}/>:<ArrowRight size={18}/>}</span></button>)}</div></div><p className="gallery-note">Imágenes ilustrativas · estilos de ejemplo</p></section>
}
