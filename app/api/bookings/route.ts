import { createBooking,BookingError } from '@/lib/bookings';
import { apiError,noCache,allowedOrigin } from '@/lib/api';
export async function POST(request:Request){
 if(!allowedOrigin(request))return Response.json({error:'El origen de esta solicitud no está autorizado.'},{status:403,headers:noCache});
 try{
  if(!request.headers.get('content-type')?.includes('application/json')) throw new BookingError(400,'Envía el formulario en el formato esperado.');
  const raw=await request.text();if(raw.length>4096)throw new BookingError(400,'El formulario supera el tamaño permitido.');
  let input:unknown;try{input=JSON.parse(raw);}catch{throw new BookingError(400,'El formulario no es válido.');}
  const result=await createBooking(input);return Response.json(result,{status:result.replayed?200:201,headers:noCache});
 }catch(e){return apiError(e);}
}
