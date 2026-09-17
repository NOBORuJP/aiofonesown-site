/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,rational,normal,fail} from './advanced-common.mjs';
import {gcd} from './math.mjs';
export {Q,rational,normal,fail};
export const q=n=>new Q(BigInt(n)),neg=a=>new Q(-a.n,a.d),sq=a=>a.mul(a);
export function scalar(s,label='数',min=-1000000,max=1000000){
 s=normal(s);if(!s||s.length>24)fail(label+'は24文字以内の整数・小数・分数にしてください。');
 const x=rational(s);if(x.sub(rational(min)).n<0n||x.sub(rational(max)).n>0n)fail(`${label}は${min}〜${max}にしてください。`);return x;
}
export const trim=p=>{p=[...p];while(p.length>1&&!p.at(-1).n)p.pop();return p};
export const isZero=p=>p.every(c=>!c.n);
export function coefficients(s,max=12,ascending=false){
 s=normal(s);if(!s||s.length>1400)fail('係数は全体で1400文字以内にしてください。');
 const tokens=s.split(/[,、\s]+/);if(tokens.length>max+1||tokens.some(t=>!t))fail(`係数は${max+1}個以内で入力してください。`);
 const p=tokens.map(t=>scalar(t,'係数'));return trim(ascending?p:p.reverse());
}
export const add=(a,b)=>trim(Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]||q(0)).add(b[i]||q(0))));
export const multiply=(a,b)=>{const c=Array.from({length:a.length+b.length-1},()=>q(0));a.forEach((v,i)=>b.forEach((w,j)=>c[i+j]=c[i+j].add(v.mul(w))));return trim(c)};
export const evaluate=(p,x)=>[...p].reverse().reduce((s,a)=>s.mul(x).add(a),q(0));
export const derivative=p=>p.length===1?[q(0)]:p.slice(1).map((v,i)=>v.mul(q(i+1)));
export function divide(a,b){
 if(isZero(b))fail('零多項式で割ることはできません。');let r=trim(a);const quot=Array.from({length:Math.max(1,a.length-b.length+1)},()=>q(0));
 while(!isZero(r)&&r.length>=b.length){const k=r.length-b.length,t=r.at(-1).div(b.at(-1));quot[k]=quot[k].add(t);b.forEach((v,i)=>r[k+i]=r[k+i].sub(t.mul(v)));r=trim(r);}
 return {quotient:trim(quot),remainder:r};
}
const intTrim=p=>{while(p.length>1&&p.at(-1)===0n)p.pop();return p};
function primitive(p){p=intTrim(p);let d=p.reduce((a,b)=>gcd(a,b),0n)||1n;if(p.at(-1)<0n)d=-d;return p.map(c=>c/d);}
function integerPolynomial(p){const denominator=p.reduce((d,c)=>d/gcd(d,c.d)*c.d,1n);return primitive(p.map(c=>c.n*(denominator/c.d)));}
function pseudoRemainder(a,b){
 let r=[...a];while(r.length>=b.length&&r.some(c=>c!==0n)){
  const k=r.length-b.length,lead=r.at(-1),divisor=b.at(-1);r=r.map(c=>c*divisor);for(let i=0;i<b.length;i++)r[i+k]-=lead*b[i];
  // Content can be removed at every step: gcd over Q[x] is unchanged.
  r=primitive(r);
 }return r;
}
function remainderLabel(p){const text=textPolynomial(p.map(c=>new Q(c)));return text.length<=1000?text:`次数 ${p.length-1} ／ 係数の最大桁数 ${Math.max(...p.map(c=>String(c<0n?-c:c).length))}（表では式を省略）`;}
export function polynomialGcd(a,b,rows=[]){
 let A=integerPolynomial(a),B=integerPolynomial(b);while(B.some(c=>c!==0n)){
  const r=pseudoRemainder(A,B);rows.push([remainderLabel(A),remainderLabel(B),remainderLabel(r)]);[A,B]=[B,r];
 }return A.every(c=>c===0n)?[q(0)]:A.map(c=>new Q(c,A.at(-1)));
}
export function textPolynomial(p,variable='x'){
 let s='';for(let i=p.length-1;i>=0;i--){const a=p[i];if(!a.n)continue;const m=a.n<0n?neg(a):a;s+=(s?(a.n<0n?' − ':' + '):(a.n<0n?'−':''))+(i&&String(m)==='1'?'':String(m)+(i?'·':''))+(i?variable+(i===1?'':'^'+i):'');}return s||'0';
}
export function determinant(input){
 const a=input.map(r=>[...r]);let d=q(1);for(let i=0;i<a.length;i++){
  const pivot=a.findIndex((r,j)=>j>=i&&r[i].n);if(pivot<0)return q(0);if(pivot!==i){[a[i],a[pivot]]=[a[pivot],a[i]];d=neg(d);}const p=a[i][i];d=d.mul(p);
  for(let j=i+1;j<a.length;j++){const t=a[j][i].div(p);for(let k=i+1;k<a.length;k++)a[j][k]=a[j][k].sub(t.mul(a[i][k]));a[j][i]=q(0);}
 }return d;
}
export function power(a,n){let r=q(1);for(let i=0;i<n;i++)r=r.mul(a);return r;}
