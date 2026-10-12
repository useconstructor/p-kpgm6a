import Link from 'next/link';
import { Scissors,ArrowUpRight } from 'lucide-react';
import { DEMO } from '@/lib/types';
export function Footer() {
  return <footer className="border-t">
    <div className="page-width grid gap-8 py-12 md:grid-cols-[1fr_1fr] max-sm:gap-5 max-sm:py-8">
      <div>
        <div className="heading mb-4 flex items-center gap-3 text-xl"><Scissors size={21} />Barbería · negocio de ejemplo</div>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{DEMO}</p>
      </div>
      <nav aria-label="Navegación del pie" className="grid grid-cols-2 content-start gap-x-6 md:justify-self-end">
        {[['/', 'Inicio'], ['/#servicios', 'Servicios'], ['/#como-reservar', 'Cómo reservar'], ['/reservar', 'Reservar']].map(([href, label]) => <Link key={href} href={href} className="flex min-h-11 items-center gap-2 text-base hover:text-primary">{label}{href === '/reservar' && <ArrowUpRight size={16} />}</Link>)}
      </nav>
    </div>
    <div className="page-width flex flex-wrap justify-between gap-x-6 gap-y-2 border-t py-5 text-sm text-muted-foreground">
      <span>Un recorrido de reserva, de principio a fin.</span><span>Sin pagos. Sin envío de correos.</span>
      <div className="mt-2 flex w-full flex-wrap items-center gap-x-2 text-sm">
        <span>Fotografía de herramientas:</span>
        <span className="inline-flex items-center gap-2">
          <a href="https://commons.wikimedia.org/wiki/File:Charlie_Young%27s_Barber_Tools.jpg" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline hover:text-primary">Mitchel23</a>
          <span aria-hidden="true">·</span>
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center whitespace-nowrap underline hover:text-primary">CC BY SA 4.0</a>
        </span>
        <span>Recorte y conversión a blanco y negro.</span>
      </div>
    </div>
  </footer>;
}
