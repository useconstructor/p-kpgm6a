import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function Footer() {
  return <footer className="site-footer"><div className="page-width footer-main"><div><Link href="/" className="footer-brand">Taller de Corte<span>Barbería · marca ficticia</span></Link></div><nav aria-label="Navegación del pie">{[['/', 'Inicio'], ['/#oficio', 'El oficio'], ['/#servicios', 'Servicios'], ['/reservar', 'Reservar']].map(([href, label]) => <Link key={href} href={href}>{label}{href === '/reservar' && <ArrowUpRight size={17} />}</Link>)}</nav></div><div className="page-width footer-bottom"><span>Sin pagos ni envío de correos.</span><details className="photo-credits"><summary>Créditos de las imágenes</summary><p>Escenas ilustrativas: <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash · licencia de uso</a>. Detalle de herramientas: recorte y conversión a blanco y negro de una escena de Unsplash.</p></details></div></footer>;
}
