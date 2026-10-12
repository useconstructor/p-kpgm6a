import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const manrope=localFont({src:'../public/fonts/manrope.ttf',variable:'--font-manrope',display:'swap',weight:'700'});
const source=localFont({src:'../public/fonts/source-sans.ttf',variable:'--font-source',display:'swap',weight:'400'});
export const metadata:Metadata={title:{default:'Barbería · negocio de ejemplo',template:'%s | Barbería · negocio de ejemplo'},description:'Descubre servicios de ejemplo y reserva una cita de prueba. Demostración de barbería sin establecimiento real.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body className={`${manrope.variable} ${source.variable} antialiased`}><a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:p-4">Saltar al contenido</a>{children}</body></html>}
