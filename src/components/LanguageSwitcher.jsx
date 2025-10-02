'use client';
import {usePathname, useRouter} from 'next/navigation';
import {useMemo} from 'react';

const locales = ['ru','kk','en'];

export default function LanguageSwitcher({className=''}){
  const router = useRouter();
  const pathname = usePathname();
  const current = useMemo(()=>{
    const seg = pathname?.split('/')[1] || 'ru';
    return locales.includes(seg) ? seg : 'ru';
  },[pathname]);

  function switchTo(l){
    if(l===current) return;
    const parts = pathname.split('/');
    if(locales.includes(parts[1])){
      parts[1] = l;
    } else {
      parts.splice(1,0,l);
    }
    router.push(parts.join('/') || '/'+l);
  }

  return (
    <div className={className} style={{display:'flex', gap:8, alignItems:'center'}}>
      {locales.map(l => (
        <button key={l}
          onClick={()=>switchTo(l)}
          aria-pressed={l===current}
          style={{padding:'6px 10px', borderRadius:8, border: l===current?'2px solid #000':'1px solid #999', background:'transparent', cursor:'pointer'}}
        >
          {l==='ru'?'Рус':l==='kk'?'Қаз':'Eng'}
        </button>
      ))}
    </div>
  );
}
