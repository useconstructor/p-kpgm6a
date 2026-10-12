import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Scissors, CalendarDays, Check } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { services } from '@/lib/bookings';
import { DEMO } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let catalog: Awaited<ReturnType<typeof services>> = [];
  let failed = false;
  try { catalog = await services(); } catch { failed = true; }

  return <><Header /><main id="contenido">
    <section className="page-width grid items-center gap-12 py-12 lg:grid-cols-[.95fr_1.05fr] max-lg:gap-6 max-lg:py-8 max-sm:gap-5 max-sm:py-5">
      <div className="max-w-[560px] max-lg:max-w-none">
        <p className="mb-6 max-lg:mb-4 flex items-center gap-3 text-base text-primary max-sm:hidden"><Scissors size={20} strokeWidth={1.5} />Corte. Contorno. Detalle.</p>
        <h1 className="text-[56px] font-bold leading-[1.04] max-lg:text-[40px] max-lg:max-w-[704px] max-lg:text-balance max-sm:text-[36px]">Corte y barba,<br className="max-lg:hidden" /> con atención<br className="max-lg:hidden" /> al detalle</h1>
        <p className="mt-6 max-w-[390px] text-lg leading-relaxed text-muted-foreground max-lg:mt-4 max-lg:max-w-[620px] max-sm:mt-3 max-sm:text-base">Elige un servicio de ejemplo y una hora. Prueba el recorrido de reserva, de principio a fin.</p>
        <div className="mt-8 flex flex-wrap items-center gap-6 max-lg:mt-6 max-sm:mt-4 max-sm:gap-5">
          <Link href="/reservar" className="inline-flex min-h-14 items-center justify-center gap-8 rounded-lg bg-primary px-6 text-base text-primary-foreground transition-colors hover:bg-foreground active:scale-[.98]">Reservar ahora<ArrowUpRight size={20} /></Link>
          <Link href="/#servicios" className="inline-flex min-h-12 items-center gap-2 text-base hover:text-primary">Ver servicios<ArrowDown size={17} /></Link>
        </div>
        <p className="mt-8 max-lg:mt-5 border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground max-sm:hidden">{DEMO}</p>
      </div>
      <figure className="relative h-[488px] overflow-hidden rounded-[2px] max-lg:h-[360px] max-sm:row-start-1 max-sm:h-[188px]">
        <Image src="/images/cut-illustrative.jpg" alt="Máquina de corte perfilando el cabello en una fotografía ilustrativa" fill priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 600px" className="object-cover object-[50%_38%] max-sm:object-[50%_42%]" />
        <figcaption className="absolute right-4 bottom-4 rounded-md bg-background/95 px-3 py-1 text-sm">Imagen ilustrativa</figcaption>
        <div className="tile-pattern absolute bottom-0 left-0 h-16 w-32 max-sm:h-12 max-sm:w-24" aria-hidden="true" />
      </figure>
      <p className="border-t pt-4 text-sm leading-relaxed text-muted-foreground sm:hidden">{DEMO}</p>
    </section>
    <div className="tile-pattern h-16 border-y border-primary max-sm:h-10" aria-hidden="true" />

    <section id="servicios" className="page-width py-[72px] max-sm:py-12">
      <div className="mb-10 flex items-end justify-between gap-6 max-sm:mb-6 max-sm:block">
        <h2 className="text-[40px] font-bold leading-tight max-sm:text-[28px]">Servicios de ejemplo</h2>
        <p className="max-w-[300px] text-base text-muted-foreground max-sm:mt-3">Cabello, barba o ambos.<br />Elige el detalle que buscas.</p>
      </div>
      <div className="grid items-stretch gap-12 lg:grid-cols-[.6fr_1.4fr] max-lg:gap-8">
        <figure className="relative h-[456px] self-start overflow-hidden rounded-[2px] max-lg:h-[224px] max-sm:h-[168px]">
          <Image src="/images/tools-editorial.jpg" alt="Tijeras, navaja y máquina manual de corte en una fotografía ilustrativa de herramientas históricas" fill sizes="(min-width: 1024px) 800px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)" quality={90} className="object-cover object-[48%_65%] max-lg:object-[50%_70%]" />
          <figcaption className="absolute bottom-4 left-4 rounded-md bg-background/95 px-3 py-1 text-sm">Imagen ilustrativa</figcaption>
        </figure>
        <div className="border-t-2 border-primary">
          {catalog.map(s => <article key={s.id} className="group grid min-h-[152px] grid-cols-[1fr_64px_160px] items-center gap-6 border-b py-6 transition-colors hover:bg-muted/60 focus-within:bg-muted/60 max-sm:grid-cols-[1fr_auto] max-sm:gap-x-3 max-sm:gap-y-4">
            <div className="max-sm:contents">
              <h3 className="text-[30px] font-bold leading-tight max-sm:text-2xl">{s.name}</h3>
              <p className="mt-3 max-w-[360px] text-base leading-relaxed text-muted-foreground max-sm:col-span-2 max-sm:row-start-2 max-sm:mt-0">{s.description}</p>
            </div>
            <span className="heading flex flex-col items-center justify-self-center text-[30px] font-bold leading-none tabular-nums text-primary max-sm:flex-row max-sm:gap-1 max-sm:justify-self-end max-sm:text-2xl">{s.duration}<span className="mt-2 font-sans text-sm font-normal max-sm:mt-0">min</span></span>
            <Link href={`/reservar?servicio=${s.id}`} aria-label={`Elegir servicio: ${s.name}`} className="inline-flex min-h-12 items-center justify-between gap-3 justify-self-end rounded-md border border-input px-4 text-base transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-[.98] max-sm:col-span-2 max-sm:justify-self-start">Elegir servicio<ArrowUpRight size={18} /></Link>
          </article>)} 
          {failed && <p role="status" className="p-6 text-base">No pudimos cargar los servicios. <Link href="/" className="text-primary underline">Volver a intentarlo</Link></p>}
        </div>
      </div>
    </section>

    <section id="como-reservar" className="border-t bg-muted">
      <div className="page-width py-[72px] max-sm:py-12">
        <div className="mb-12 flex items-center justify-between gap-6 max-sm:mb-8 max-sm:block">
          <h2 className="text-[40px] font-bold max-sm:text-[28px]">Cómo reservar</h2>
          <Link href="/reservar" className="inline-flex min-h-12 items-center gap-6 border-b border-primary text-base text-primary hover:text-foreground max-sm:mt-4">Elegir mi próxima cita<ArrowUpRight size={19} /></Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {[{ icon: Scissors, title: 'Elige tu servicio', text: 'Corte, barba o ambos. Consulta la duración y elige tu opción de ejemplo.' }, { icon: CalendarDays, title: 'Encuentra una hora', text: 'Consulta los próximos 14 días y selecciona un hueco de ejemplo en Europe/Madrid.' }, { icon: Check, title: 'Confirma tu reserva de prueba', text: 'Completa tus datos y recibe la confirmación aquí mismo. No enviamos correos.' }].map((step, i) => <div key={step.title} className="border-t border-secondary pt-6 max-lg:grid max-lg:grid-cols-[96px_1fr] max-lg:gap-x-6 max-sm:grid-cols-[64px_1fr] max-sm:gap-x-4">
            <div className="mb-5 flex items-center justify-between text-primary max-lg:row-span-2 max-lg:mb-0 max-lg:flex-col max-lg:items-start max-lg:justify-start max-lg:gap-4"><span className="text-base">Paso {i + 1}</span><step.icon size={24} strokeWidth={1.5} /></div>
            <h3 className="text-2xl font-bold">{step.title}</h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">{step.text}</p>
          </div>)}
        </div>
      </div>
    </section>
  </main><Footer /></>;
}
