import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CraftGallery } from '@/components/craft-gallery';
import { AppointmentInvitation } from '@/components/appointment-invitation';
import { services } from '@/lib/bookings';
export const dynamic = 'force-dynamic';
export default async function Home() {
  let catalog: Awaited<ReturnType<typeof services>> = [];
  let failed = false;
  try { catalog = await services(); } catch { failed = true; }
  return <><Header immersive /><main id="contenido" tabIndex={-1}>
    <section className="hero"><picture><source media="(max-width: 480px)" srcSet="/images/chair-mobile.jpg" /><Image src="/images/chair.jpg" alt="Fotografía ilustrativa de un sillón de barbería de cuero y metal cepillado" fill priority sizes="100vw" quality={90} className="hero-photo" /></picture><div className="hero-shade" />
      <div className="hero-content"><p className="hero-kicker">Corte, contorno y carácter.</p><h1>El arte de<br /><span>dar forma.</span></h1><div className="hero-bottom"><div><p>Un homenaje al oficio de la barbería.<br />Una nueva mirada al corte de siempre.</p><Link href="/reservar" className="solid-link">Reservar ahora<ArrowUpRight size={22} /></Link></div><Link href="#oficio" className="hero-explore">Descubre el taller<ArrowDown size={19} /></Link></div></div>
      <span className="hero-photo-label">Fotografía ilustrativa</span>
    </section>
    <div className="demo-ribbon">Concepto ficticio · servicios, imágenes y horarios de ejemplo.</div>
    <CraftGallery services={catalog} />
    <section id="servicios" className="service-section"><div className="page-width"><div className="menu-heading"><div><p className="section-label">La carta del taller</p><h2>Lo esencial.<br />Bien definido.</h2></div><p>Elige tu servicio.<br />Consulta las horas<br />disponibles.</p></div>
      <div className="service-menu">{catalog.map(s => <article key={s.id} className="service-row"><div><h3>{s.name}</h3><p>{s.description.replace('Servicio de ejemplo: ', '')}</p></div><span className="service-duration">{s.duration}<span>minutos</span></span><Link href={`/reservar?servicio=${s.id}`} className="menu-link" aria-label={`Reservar ${s.name}`}>Reservar<ArrowUpRight size={24} /></Link></article>)}
      {failed && <p role="alert" className="catalog-state">No pudimos cargar los servicios. <Link href="/" className="underline">Reintentar</Link></p>}{!failed && !catalog.length && <p className="catalog-state">No hay servicios activos en este momento.</p>}</div><p className="menu-footnote">Duración de cada servicio · sin pagos.</p></div></section>
    <AppointmentInvitation services={catalog} />
  </main><Footer /></>;
}
