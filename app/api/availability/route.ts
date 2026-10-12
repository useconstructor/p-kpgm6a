import { availability } from '@/lib/bookings';
import { apiError,noCache } from '@/lib/api';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{const q=new URL(request.url).searchParams;return Response.json(await availability(q.get('service')??'',q.get('date')??''),{headers:noCache});}catch(e){return apiError(e);}}
