import 'server-only';
import { BookingError } from './bookings';
export const noCache={'Cache-Control':'no-store, max-age=0'};
export function apiError(error:unknown){
 if(error instanceof BookingError) return Response.json({error:error.message,fields:error.fields},{status:error.status,headers:noCache});
 console.error('Booking API failure',error instanceof Error?error.message:'Unknown error');
 return Response.json({error:'No pudimos conectar. Tus datos se conservan; vuelve a intentarlo.'},{status:503,headers:noCache});
}
export function allowedOrigin(request:Request){
 const configured=(process.env.ALLOWED_ORIGINS??'').split(',').map(s=>s.trim()).filter(Boolean);
 const deployment=[process.env.VERCEL_URL,process.env.VERCEL_PROJECT_PRODUCTION_URL].filter(Boolean).map(v=>`https://${v}`);
 const origins=new Set([...configured,...deployment,'http://127.0.0.1:3100','http://localhost:3100',...(process.env.NODE_ENV==='development'||process.env.ENABLE_LOCAL_QA==='1'?['http://localhost:3000','http://127.0.0.1:3000','http://localhost:3100','http://127.0.0.1:3100']:[])]);
 const origin=request.headers.get('origin');
 return !!origin&&origins.has(origin);
}
