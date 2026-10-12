'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/types';

export function AppointmentInvitation({ services }: { services: Service[] }) {
  const [id, setId] = useState(services[0]?.id ?? '');
  useEffect(() => {
    const select = (event: Event) => setId((event as CustomEvent<string>).detail);
    window.addEventListener('taller:service', select);
    return () => window.removeEventListener('taller:service', select);
  }, []);
  const selected = services.find(service => service.id === id);
  return <section id="cita" className="appointment-section"><div className="page-width appointment-inner">
    <h2>Haz sitio<br />para tu estilo.</h2>
    <div className="appointment-docket">
      <div className="docket-heading"><span>Ficha de cita</span><span>Taller de Corte</span></div>
      <label htmlFor="docket-service">Tu servicio</label>
      <select id="docket-service" value={id} onChange={event => setId(event.target.value)}><option value="" disabled>Elige un servicio</option>{services.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}</select>
      <div className="docket-details" aria-live="polite"><span>{selected ? `${selected.duration} minutos` : 'Consulta disponibilidad'}</span><span>Día y hora por elegir</span></div>
      <p>Elige el día y encuentra una hora<br />para darle forma.</p>
      <Link href={selected ? `/reservar?servicio=${selected.id}` : '/reservar'} className="solid-link">Encontrar una hora<ArrowUpRight size={22} /></Link>
      <span className="docket-note">Horarios de ejemplo · Europe/Madrid</span>
    </div>
  </div></section>;
}
