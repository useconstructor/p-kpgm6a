import { services } from '@/lib/bookings';
import { apiError,noCache } from '@/lib/api';
export const dynamic='force-dynamic';
export async function GET(){try{return Response.json({services:await services()},{headers:noCache});}catch(e){return apiError(e);}}
