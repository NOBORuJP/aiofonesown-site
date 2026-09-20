/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,normal,abs,pack,fail,count,decimal} from './advanced-common.mjs';
import {gcd} from './math.mjs';
const trim=p=>{p=[...p];while(p.length>1&&p.at(-1)===0n)p.pop();return p};
const zero=p=>p.length===1&&p[0]===0n;
const degree=p=>zero(p)?-1:p.length-1;
const add=(a,b)=>trim(Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]||0n)+(b[i]||0n)));
const neg=a=>a.map(x=>-x);
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>{const c=Array(a.length+b.length-1).fill(0n);a.forEach((x,i)=>b.forEach((y,j)=>c[i+j]+=x*y));return trim(c)};
const primitive=p=>{const g=p.reduce((a,b)=>gcd(a,b),0n)||1n;return trim(p.map(x=>x/g))};
function parse(s,maxDegree,limit){s=normal(s);if(s.length>600)fail('係数の入力が長すぎます。');const a=s.split(/[,、\s]+/).filter(Boolean);if(!a.length||a.length>maxDegree+1||a.some(x=>! /^[+-]?\d{1,19}$/.test(x)))fail(`係数は最高次から、${maxDegree+1}個以内の整数で入力してください。`);const p=a.map(BigInt);if(p.some(x=>abs(x)>limit))fail(`各係数の絶対値は${limit}以下にしてください。`);return trim(p.reverse());}
export function polynomialText(p){let s='';for(let i=p.length-1;i>=0;i--){const n=p[i];if(!n)continue;s+=(s?(n<0n?' − ':' + '):(n<0n?'−':''))+(i&&abs(n)===1n?'':String(abs(n)))+(i?'x'+(i===1?'':'^'+i):'');}return s||'0';}
export function eliminate(a,b,c,d){
 const [A,B,C,D]=[a,b,c,d].map(s=>parse(s,2,1000n)),diff=sub(A,C),constant=sub(B,D);
 const r=add(mul(constant,constant),mul(diff,sub(mul(A,D),mul(B,C))));
 let p=primitive(r);if(p.at(-1)<0n)p=neg(p);
 const coeff=[...p].reverse().join(', '),deg=degree(p),isZero=zero(p);
 const rows=[['f の y係数 A(x)',polynomialText(A)],['f の定数 B(x)',polynomialText(B)],['g の y係数 C(x)',polynomialText(C)],['g の定数 D(x)',polynomialText(D)],['終結式 R(x)',polynomialText(r)],['解を変えない整数係数',coeff]];
 return {...pack(isZero?'R(x) ≡ 0':polynomialText(p)+' = 0',isZero?'共通因子があり、この消去式だけでは x を絞れません。':deg===0?'非零定数なので、共通解はありません。':`y を消去した ${deg}次式。実数の候補は元の2式への代入が必要です。`,['係数・式','厳密値'],rows,[`f = y² + (${polynomialText(A)})y + (${polynomialText(B)})。`,`g = y² + (${polynomialText(C)})y + (${polynomialText(D)})。`,'シルベスター行列： [1,A,B,0] / [0,1,A,B] / [1,C,D,0] / [0,1,C,D]。','この4×4行列式を展開すると R=(B−D)²+(A−C)(AD−BC)。','A(x)≠C(x)なら y=−(B−D)/(A−C) を元の式へ代入。A=C なら B=D も必要で、y²+Ay+B の判別式が0以上か確認します。','R=0 は複素数の共通根の条件です。実数の y や、幾何の長さが正であることまで保証しません。'],'多項式を整数で厳密展開'),coefficients:coeff,degree:deg,zero:isZero,transfer:deg>=1?{mode:'roots',input:{coefficients:coeff,precision:'8'}}:null};
}
const derivative=p=>p.length<2?[0n]:p.slice(1).map((x,i)=>x*BigInt(i+1));
function rationalDivision(a,b){
 if(zero(b))fail('零多項式では割れません。');let r=a.map(x=>new Q(x)),q=Array(Math.max(1,a.length-b.length+1)).fill(null).map(()=>new Q(0n));
 while(r.length>=b.length&&r.some(x=>x.n)){
  const i=r.length-b.length,t=r.at(-1).div(new Q(b.at(-1)));q[i]=q[i].add(t);
  b.forEach((x,j)=>r[i+j]=r[i+j].sub(t.mul(new Q(x))));while(r.length>1&&!r.at(-1).n)r.pop();
 }
 return {q,r};
}
function intPoly(q){const den=q.reduce((d,x)=>d/gcd(d,x.d)*x.d,1n);return primitive(q.map(x=>x.n*(den/x.d)))}
function remainder(a,b){return intPoly(rationalDivision(a,b).r)}
function pgcd(a,b){while(!zero(b))[a,b]=[b,remainder(a,b)];return primitive(a)}
function divideExact(a,b){const {q,r}=rationalDivision(a,b);if(r.some(x=>x.n))fail('多項式の割り切れ条件を満たしません。');return intPoly(q)}
function squareFree(p){return divideExact(p,pgcd(p,derivative(p)))}
function sturm(p){const s=[primitive(p),primitive(derivative(p))];if(zero(s[1]))return [s[0]];while(!zero(s.at(-1))){const r=neg(remainder(s.at(-2),s.at(-1)));if(zero(r))break;s.push(r);}return s;}
// Homogeneous evaluation avoids floating signs and fraction growth in bisection.
function signAt(p,x){let n=p.at(-1),d=1n;for(let i=p.length-2;i>=0;i--){d*=x.d;n=n*x.n+p[i]*d;}return n<0n?-1:n>0n?1:0;}
function variations(s,x){let previous=0,v=0;for(const p of s){const sign=signAt(p,x);if(!sign)continue;if(previous&&previous!==sign)v++;previous=sign;}return v;}
export function allRealRoots(coefficients,precision){
 const original=parse(coefficients,8,10n**18n),p=count(precision,'表示する小数桁',0,12);if(degree(original)<1)fail('0でない最高次係数を持つ1〜8次式にしてください。');
 const f=squareFree(original),sequence=sturm(f),lead=abs(f.at(-1));
 const maximum=f.slice(0,-1).reduce((m,x)=>abs(x)>m?abs(x):m,0n),bound=2n+(maximum+lead-1n)/lead;
 const start=new Q(-bound),end=new Q(bound),tol=new Q(1n,10n**BigInt(p+2));
 const total=variations(sequence,start)-variations(sequence,end),stack=[{lo:start,hi:end,n:total}],found=[];let splits=0;
 while(stack.length){const {lo,hi,n}=stack.pop();if(!n)continue;
  if(n===1&&(signAt(f,hi)===0||hi.sub(lo).sub(tol).n<=0n)){found.push({lo:signAt(f,hi)===0?hi:lo,hi,exact:signAt(f,hi)===0});continue;}
  if(++splits>1600)fail('根の分離に必要な計算量が上限を超えました。係数の尺度や共通因子を整理してください。未確認の解は表示しません。');
  const mid=lo.add(hi).div(new Q(2n)),left=variations(sequence,lo)-variations(sequence,mid);
  if(left<0||left>n)fail('根の個数の検算に失敗しました。');stack.push({lo:mid,hi,n:n-left},{lo,hi:mid,n:left});
 }
 found.sort((a,b)=>a.lo.sub(b.lo).n<0n?-1:1);
 const chains=[];let g=pgcd(original,derivative(original));while(degree(g)>0){chains.push({p:g,s:sturm(squareFree(g))});g=pgcd(g,derivative(g));}
 const roots=found.map(({lo,hi,exact})=>{let multiplicity=1;for(const c of chains)if(exact?signAt(c.p,hi)===0:variations(c.s,lo)-variations(c.s,hi)>0)multiplicity++;
  const mid=lo.add(hi).div(new Q(2n)),approx=decimal(mid.n*10n**BigInt(p)/mid.d,p);
  return {lower:String(lo),upper:String(hi),exact,multiplicity,approx};});
 return {...pack(roots.length?`${roots.length}個の異なる実根`:'実根はありません',`次数 ${degree(original)} ／ 重複を数えた実根 ${roots.reduce((s,r)=>s+r.multiplicity,0)}個`,['根','小数の目安','厳密区間 (左, 右] または厳密値','重複度'],roots.map((r,i)=>[i+1,r.approx,r.exact?r.upper:`(${r.lower}, ${r.upper}]`,r.multiplicity]),[`式：${polynomialText(original)} = 0。`,`全実根は (−${bound}, ${bound}) にあります。`,'f と f′ の最大公約因子を取り、重根を除いた式のSturm列を作ります。','零を除いた符号変化数 V(a)−V(b) で、半開区間 (a,b] の異なる実根を数えます。',`${splits}回の区間分割で、各区間を1根ずつに分離しました。`,'重複度は最大公約因子の連鎖で厳密に検査しています。小数欄は区間中点からの目安で、厳密値ではありません。'],'現代的補助：Sturm列・有理数区間'),roots,total,splits,sturm:sequence.map(polynomialText)};
}
