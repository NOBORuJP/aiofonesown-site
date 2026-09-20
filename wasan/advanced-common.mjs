/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {normal,Q,rational} from './math.mjs';
export {normal,Q,rational};
export const fail=s=>{throw new Error(s)};
export const abs=n=>n<0n?-n:n;
export const pack=(value,detail,heads,rows,steps,meta)=>({value:String(value),detail,heads,rows,steps,meta});
export function count(s,label,min,max){s=normal(s);if(!/^\d{1,4}$/.test(s)||Number(s)<min||Number(s)>max)fail(`${label}は${min}〜${max}の整数にしてください。`);return Number(s);}
export function positive(s,label){s=normal(s);if(s.length>24)fail(label+'は24文字以内で入力してください。');const q=rational(s);if(q.n*1000n<q.d||q.n>1000000n*q.d)fail(label+'は0.001〜1,000,000の整数・小数・分数で入力してください。');return q;}
export const fmt=n=>Number.isFinite(n)?String(Number(n.toPrecision(13))):fail('表示できる数値の範囲を超えました。');
export function integerSqrt(n){if(n<0n)fail('平方根の中は0以上が必要です。');if(n<2n)return n;let x=1n<<BigInt(Math.ceil(n.toString(2).length/2));while(true){const y=(x+n/x)/2n;if(y>=x)return x;x=y;}}
export function sqrtFloor(q,p){return integerSqrt(q.n*10n**BigInt(2*p)/q.d);}
export function decimal(n,p){const negative=n<0n,s=String(abs(n)).padStart(p+1,'0');return (negative?'-':'')+(p?s.slice(0,-p)+'.'+s.slice(-p):s);}
