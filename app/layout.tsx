import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const anton=localFont({src:'../public/fonts/six-caps.ttf',variable:'--font-display',display:'swap',weight:'400'});
const hero=localFont({src:'../public/fonts/barlow-condensed-bold.ttf',variable:'--font-hero',display:'swap',weight:'700'});
const manrope=localFont({src:'../public/fonts/barlow-condensed.ttf',variable:'--font-manrope',display:'swap',weight:'400'});
const source=localFont({src:'../public/fonts/source-sans.ttf',variable:'--font-source',display:'swap',weight:'400'});
export const metadata:Metadata={title:{default:'Taller de Corte · marca ficticia',template:'%s | Barbería · negocio de ejemplo'},description:'Descubre servicios de ejemplo y reserva una cita de prueba. Demostración de barbería sin establecimiento real.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body className={`${anton.variable} ${hero.variable} ${manrope.variable} ${source.variable} antialiased`}><a href="#contenido" className="skip-link">Saltar al contenido</a>{children}</body></html>}
