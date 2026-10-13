import { Scissors } from 'lucide-react';
export function BrandRule({short=false}:{short?:boolean}) {return <div className={`brand-rule ${short?'short':''}`} aria-hidden="true"><span/><Scissors strokeWidth={1.2}/><span/></div>}
