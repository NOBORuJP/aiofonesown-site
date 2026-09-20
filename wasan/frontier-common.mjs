/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,rational,normal,approximateQ,gcd} from './math.mjs';
import {q,neg,trim,textPolynomial} from './expansion-common.mjs';
import {fail,count,pack,fmt} from './advanced-common.mjs';
export {Q,rational,normal,approximateQ,gcd,q,neg,trim,textPolynomial,fail,count,pack,fmt};
export function guard(x){if(x.n.toString(2).length>1024||x.d.toString(2).length>1024)fail('途中の分数が約300桁を超えました。係数や次数を小さくしてください。');return x;}
export const plus=(a,b)=>guard(a.add(b)),times=(a,b)=>guard(a.mul(b)),quot=(a,b)=>guard(a.div(b));
export function list(s,max=21){s=normal(s);if(!s||s.length>1400)fail('係数は全体1400文字以内で入力してください。');const a=s.split(/[,、\s]+/);if(a.length>max||a.some(t=>!t||t.length>24))fail(`係数は${max}個以内、各24文字以内で入力してください。`);return a.map(t=>{const x=rational(t);if(x.n< -1000000n*x.d||x.n>1000000n*x.d)fail('係数の絶対値は100万以下にしてください。');return x;});}
export function product(a,b,N=a.length+b.length-2){const c=Array.from({length:Math.min(N+1,a.length+b.length-1)},()=>q(0));for(let i=0;i<a.length;i++)for(let j=0;j<b.length&&i+j<=N;j++)c[i+j]=plus(c[i+j],times(a[i],b[j]));return trim(c);}
export function sum(a,b){return trim(Array.from({length:Math.max(a.length,b.length)},(_,i)=>plus(a[i]||q(0),b[i]||q(0))));}
export const scale=(a,k)=>trim(a.map(x=>times(x,k)));
export function powerPoly(a,n,N){let r=[q(1)];for(let i=0;i<n;i++)r=product(r,a,N);return r;}
export function valueAt(a,x){let r=q(0);for(let i=a.length-1;i>=0;i--)r=plus(times(r,x),a[i]);return r;}
export function solve(A,b){const n=b.length,M=A.map((r,i)=>[...r,b[i]]);for(let k=0;k<n;k++){const j=M.findIndex((r,i)=>i>=k&&r[k].n);if(j<0)fail('この条件では一意な正規化解が定まりません。次数や係数を変えてください。');[M[k],M[j]]=[M[j],M[k]];const pivot=M[k][k];M[k]=M[k].map(x=>quot(x,pivot));for(let i=0;i<n;i++)if(i!==k){const c=M[i][k];if(c.n)M[i]=M[i].map((x,j)=>plus(x,neg(times(c,M[k][j]))));}}return M.map(r=>r[n]);}
export function dividePoly(a,b){let r=trim(a),out=Array.from({length:Math.max(1,r.length-b.length+1)},()=>q(0));if(b.every(x=>!x.n))fail('零多項式では割れません。');while(r.length>=b.length&&r.some(x=>x.n)){const k=r.length-b.length,t=quot(r.at(-1),b.at(-1));out[k]=t;r=sum(r,Array(k).fill(q(0)).concat(scale(b,neg(t))));}return {quotient:trim(out),remainder:r};}
export const same=(a,b)=>sum(a,scale(b,q(-1))).every(x=>!x.n);
export function integerPolynomial(a){const d=a.reduce((d,x)=>{const v=d/gcd(d,x.d)*x.d;if(v.toString(2).length>1024)fail('係数の分母をそろえる計算が上限を超えました。');return v;},1n);let p=trim(a).map(x=>x.n*(d/x.d));const g=p.reduce((g,x)=>gcd(g,x),0n)||1n;p=p.map(x=>x/g);if(p.some(x=>x< -(10n**18n)||x>10n**18n))fail('根を分離する整数係数が10の18乗を超えました。係数の分母や尺度を整理してください。');return p.reverse().join(',');}
export function intervalValue(p,l,h){let a=q(0),b=q(0);for(let i=p.length-1;i>=0;i--){const v=[times(a,l),times(a,h),times(b,l),times(b,h)].sort((x,y)=>x.sub(y).n<0n?-1:x.sub(y).n>0n?1:0);a=plus(v[0],p[i]);b=plus(v[3],p[i]);}return [a,b];}
export const seriesOutput=(g,N,steps)=>({...pack(textPolynomial(g),'xの'+N+'次までの形式的な級数',['次数','係数'],g.map((x,i)=>[i,String(x)]),steps,'分数による係数計算・恒等式の検算'),coefficients:g.map(String),verified:true});
