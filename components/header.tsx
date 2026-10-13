'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
export function Header({ immersive = false }: { immersive?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  const links = [{ href: '/#oficio', label: 'Estilos' }, { href: '/#servicios', label: 'Servicios' }, { href: '/reservar', label: 'Reservar ahora' }];
  return <header className={`masthead ${immersive ? 'masthead-immersive' : ''}`}><div className="masthead-inner">
    <Link href="/" onClick={() => setOpen(false)} className="wordmark" aria-label="Taller de Corte, marca ficticia, inicio"><span>Taller de Corte</span></Link>
    <nav aria-label="Navegación principal" className="desktop-nav"><Link href="/#servicios">Servicios</Link><Link href="/#oficio">Estilos</Link><Link href="/reservar" className="nav-reserve">Reservar</Link></nav>
    <button ref={toggle} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} className="menu-toggle">{open ? <X /> : <Menu />}</button>
  </div><nav ref={panel} id="mobile-navigation" aria-label="Navegación móvil" inert={!open} className={`mobile-nav ${open ? 'is-open' : ''}`}>{links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}<ArrowUpRight size={20} /></Link>)}</nav></header>;
}
