/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {chapters} from './chapters.mjs';
const digits=['零','壱','弐','参','肆','伍','陸','漆','捌','玖'];
export function indexNumber(n){if(typeof document!=='undefined'&&document.documentElement.lang==='en')return String(n).padStart(2,'0');return n<10?digits[n]:(n>=20?digits[Math.floor(n/10)]:'')+'拾'+(n%10?digits[n%10]:'');}
export function toolIndexMarkup(items,id,prefix='#'){
 const size=14,index=Math.max(0,items.findIndex(c=>c.id===id)),page=Math.floor(index/size),start=page*size;
 const nav=items.slice(start,start+size).map((c,i)=>`<a class="nav-item" href="${prefix}${c.id}" ${c.id===id?'aria-current="page"':''}><span class="nav-num" aria-hidden="true">${indexNumber(start+i+1)}</span><span><span class="nav-label">${c.name}</span><span class="nav-sub">${c.sub}</span></span></a>`).join('');
 const english=typeof document!=='undefined'&&document.documentElement.lang==='en';
 const pages=chapters.map((chapter,p)=>{
   const first=items[p*size]; if(!first)return '';
   const [a,b]=chapter.range, label=english?chapter.en:chapter.ja;
   return `<a href="${prefix}${first.id}"${p===page?' aria-current="true"':''}><span class="chapter-range">${String(a).padStart(2,'0')}–${b}</span><span class="chapter-label">${label}</span></a>`;
 }).join('');
 const chapter=chapters[page];
 const range=chapter?`${String(chapter.range[0]).padStart(2,'0')}—${chapter.range[1]} · ${english?chapter.en:chapter.ja}`:`${String(start+1).padStart(2,'0')}—${Math.min(items.length,start+size)}`;
 return {nav,pages,range};
}
