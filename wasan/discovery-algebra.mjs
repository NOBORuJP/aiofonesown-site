/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,q,normal,fail,scalar,coefficients,trim,isZero,neg,add,multiply,evaluate,derivative,divide,polynomialGcd,textPolynomial} from './expansion-common.mjs';
import {count,pack} from './advanced-common.mjs';
const scale=(p,a)=>trim(p.map(v=>v.mul(a)));
const same=(a,b)=>isZero(add(a,scale(b,q(-1))));
const exactDivide=(a,b)=>{const d=divide(a,b);if(!isZero(d.remainder))fail('多項式の割り戻しが一致しません。');return d.quotient;};
export function hermite(s,target){
 s=normal(s);if(!s||s.length>1400)fail('条件は全体1400文字以内で入力してください。');const lines=s.split(/\n/).map(x=>x.trim());if(lines.length<2||lines.length>6)fail('条件は2〜6行で入力してください。');
 const nodes=lines.map((line,i)=>{const a=line.split(/[,、\s]+/);if(a.length!==3)fail(`${i+1}行目は x、値、傾き の3個にしてください。`);return a.map(t=>scalar(t,'条件の数'));});
 if(new Set(nodes.map(p=>String(p[0]))).size!==nodes.length)fail('xはすべて異なる値にしてください。');const x=scalar(target,'求める位置');let result=[q(0)];
 for(let i=0;i<nodes.length;i++){
  const [xi,yi,mi]=nodes[i];let L=[q(1)],slope=q(0);for(let j=0;j<nodes.length;j++)if(j!==i){const d=xi.sub(nodes[j][0]);L=scale(multiply(L,[neg(nodes[j][0]),q(1)]),q(1).div(d));slope=slope.add(q(1).div(d));}
  const L2=multiply(L,L),K=multiply([neg(xi),q(1)],L2),H=add(L2,scale(K,slope.mul(q(-2))));result=add(result,add(scale(H,yi),scale(K,mi)));
 }
 const dp=derivative(result);if(nodes.some(([x,y,m])=>evaluate(result,x).sub(y).n||evaluate(dp,x).sub(m).n))fail('補間条件の検算が一致しません。');
 return {...pack(evaluate(result,x),`P(${x}) ／ 次数 ${result.length-1}`,['次数','係数'],result.map((v,i)=>[i,String(v)]),['P(x) = '+textPolynomial(result),'各点の値と傾きを満たす基底多項式を組み立て、重み付きで足します。','全'+nodes.length+'点の値と傾きを元の条件へ再代入し、一致を確認。'],'全条件を分数で照合'),coefficients:[...result].reverse().map(String),verified:true};
}
export function squareFreeFactors(s){
 const f=coefficients(s,12);if(f.length<2)fail('1〜12次の多項式にしてください。');const leading=f.at(-1),monic=scale(f,q(1).div(leading));let c=polynomialGcd(monic,derivative(monic)),w=exactDivide(monic,c),i=1;const factors=[];
 while(w.length>1){const y=polynomialGcd(w,c),z=exactDivide(w,y);if(z.length>1)factors.push({p:z,multiplicity:i});w=y;c=exactDivide(c,y);if(++i>13)fail('因子分解の反復上限に達しました。');}
 let reconstructed=[leading];for(const factor of factors)for(let k=0;k<factor.multiplicity;k++)reconstructed=multiply(reconstructed,factor.p);
 if(!same(f,reconstructed)||factors.some((a,i)=>polynomialGcd(a.p,derivative(a.p)).length>1||factors.some((b,j)=>j<i&&polynomialGcd(a.p,b.p).length>1)))fail('因子の検算が一致しません。');
 const expression=(String(leading)==='1'?'':String(leading)+' × ')+factors.map(({p,multiplicity})=>'('+textPolynomial(p)+')'+(multiplicity===1?'':'^'+multiplicity)).join(' × ');
 return {...pack(expression,'同じ重複度の因子をまとめた分解', ['重複度','最高次係数1の因子'],factors.map(a=>[a.multiplicity,textPolynomial(a.p)]),['元の最高次係数：'+leading,'fとf′の共通因子を取り、重複度ごとに分けます。','積を展開し直し、元の全係数と一致することを確認。','各因子に重根がなく、異なる群の因子どうしが互いに素であることも照合。'],'有理数係数で厳密分解'),factors:factors.map(a=>({coefficients:[...a.p].reverse().map(String),multiplicity:a.multiplicity})),leading:String(leading),verified:true};
}
const bounded=a=>{if(a.n.toString(2).length>1024||a.d.toString(2).length>1024)fail('係数が大きくなりすぎるため計算を停止しました。次数を下げるか、係数を簡単な数にしてください。');return a;};
function truncatedProduct(a,b,N){const c=Array.from({length:Math.min(N+1,a.length+b.length-1)},()=>q(0));for(let i=0;i<a.length&&i<=N;i++)if(a[i].n)for(let j=0;j<b.length&&i+j<=N;j++)if(b[j].n)c[i+j]=bounded(c[i+j].add(a[i].mul(b[j])));return trim(c);}
function compose(a,b,N){let r=[q(0)];for(let i=a.length-1;i>=0;i--)r=add(truncatedProduct(r,b,N),[a[i]]).map(bounded);return trim(r.slice(0,N+1));}
export function revertSeries(s,ns){
 const f=coefficients(s,12,true),N=count(ns,'打ち切る次数',1,20);if(f[0].n||f.length<2||!f[1].n)fail('定数項は0、一次の係数は0以外にしてください。');
 const g=Array.from({length:N+1},()=>q(0));for(let k=1;k<=N;k++){const known=compose(f,g.slice(0,k+1),k)[k]||q(0);g[k]=bounded(q(k===1?1:0).sub(known).div(f[1]));}
 if(!same(compose(f,g,N),[q(0),q(1)])||!same(compose(g,f,N),[q(0),q(1)]))fail('逆級数の合成検算が一致しません。');
 return {...pack(textPolynomial(g),`${N}次までの合成逆 g(x)`,['次数','係数'],g.map((v,i)=>[i,String(v)]),['f(g(x))の低い次数から、未知の係数を一つずつ決めます。','f(g(x)) と g(f(x)) が、ともに '+N+'次まで x と一致することを確認。','表示していない高次の項は残ります。数値としての収束範囲はここでは判定しません。'],'両方向の合成を厳密照合'),coefficients:g.map(String),verified:true};
}
function binomial(n,k){let c=1n;for(let i=1;i<=k;i++)c=c*BigInt(n+1-i)/BigInt(i);return c;}
export function cyclotomic(s){
 const n=count(s,'円を分ける数 n',3,60),cache=new Map();
 function phi(k){if(cache.has(k))return cache.get(k);let p=Array.from({length:k+1},(_,i)=>q(i===k?1:i===0?-1:0));for(let d=1;d<k;d++)if(k%d===0)p=exactDivide(p,phi(d));cache.set(k,p);return p;}
 const F=phi(n),m=(F.length-1)/2;if(!Number.isInteger(m)||F.some((v,i)=>v.sub(F[F.length-1-i]).n))fail('円分多項式の対称性が一致しません。');
 let result=[F[m]],C0=[q(2)],C1=[q(0),q(1)];for(let k=1;k<=m;k++){const C=k===1?C1:add(multiply([q(0),q(1)],C1),scale(C0,q(-1)));result=add(result,scale(C,F[m+k]));if(k>1)[C0,C1]=[C1,C];}
 const expanded=Array.from({length:2*m+1},()=>q(0));result.forEach((v,k)=>{for(let j=0;j<=k;j++){const index=m+k-2*j;expanded[index]=expanded[index].add(v.mul(new Q(binomial(k,j))));}});
 if(!same(expanded,F))fail('円分多項式への置換の検算が一致しません。');
 return {...pack(textPolynomial(result,'t'),`t = 2cos(2π/${n}) の最小多項式 ／ 次数 ${m}`,['次数','係数'],result.map((v,i)=>[i,String(v)]),['z^'+n+'−1 から、真の約数に対応する円分多項式を順に割って Φ_'+n+' を構成。','対称な係数を t=z+1/z の多項式へ変換。','z^'+m+' Ψ(z+1/z) = Φ_'+n+'(z) を展開し、全係数が一致することを確認。','この次数は現代の実円分体の次数です。史料の「定乗数」とは区別します。'],'整数係数で恒等式を検算'),coefficients:[...result].reverse().map(String),degree:m,verified:true,cyclotomicCoefficients:[...F].reverse().map(String)};
}
