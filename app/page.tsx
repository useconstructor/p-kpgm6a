import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Plus, Scissors, Brush, Armchair } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BrandRule } from '@/components/brand-rule';
import { CraftGallery } from '@/components/craft-gallery';
import { AppointmentInvitation } from '@/components/appointment-invitation';
import { services } from '@/lib/bookings';
export const dynamic = 'force-dynamic';
export default async function Home() {
 let catalog: Awaited<ReturnType<typeof services>> = []; let failed=false;
 try {catalog=await services();}catch{failed=true;}
 const icons=[Scissors,Brush,Armchair];
 return <><Header immersive/><main id="contenido" tabIndex={-1}>
 <section className="hero"><Image src="/images/reference-hd-hero.png" alt="Sillón de cuero y metal en una barbería. Fotografía ilustrativa." fill priority sizes="100vw" quality={90} className="hero-photo"/><div className="hero-shade"/>
 <div className="hero-content"><h1>Taller de Corte</h1><BrandRule/><p className="hero-motto">Oficio. Precisión. Estilo.</p><Link href="/reservar" className="solid-link">Reservar ahora</Link><p className="hero-help">Explora nuestros servicios o consulta disponibilidad.</p><Link href="#oficio" className="hero-explore" aria-label="Explorar estilos"><ChevronDown/></Link></div>
 </section>
 <CraftGallery services={catalog}/>
 <section id="servicios" className="service-section"><div className="page-width service-layout"><div className="section-sidebar"><h2>Nuestros <br/>servicios</h2><BrandRule short/><p>Servicios de barbería de ejemplo, pensados para cada estilo y necesidad.</p></div><div className="service-menu">{catalog.map((s,i)=>{const Icon=icons[i%3];return <article key={s.id} className="service-row"><Icon className="service-icon" size={42} strokeWidth={1}/><div><h3>{s.name}</h3><p>{s.description.replace('Servicio de ejemplo: ','')} <span>· {s.duration} min</span></p></div><Link href={`/reservar?servicio=${s.id}`} className="menu-link" aria-label={`Consultar disponibilidad de ${s.name}`}>Consultar<Plus size={20}/></Link></article>})}{failed&&<p role="alert" className="catalog-state">No pudimos cargar los servicios. <Link href="/">Reintentar</Link></p>}{!failed&&!catalog.length&&<p className="catalog-state">No hay servicios activos en este momento.</p>}<p className="menu-footnote">Catálogo de ejemplo · consulta disponibilidad para reservar.</p></div></div></section>
 <AppointmentInvitation services={catalog}/>
 </main><Footer/></>;
}
