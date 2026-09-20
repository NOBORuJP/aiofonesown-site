/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,pack,count,positive,sqrtFloor,decimal} from './advanced-common.mjs';
export function takebeArc(diameter,sagitta,terms){
 const d=positive(diameter,'円の直径 d'),c=positive(sagitta,'矢の高さ c'),z=c.div(d),n=count(terms,'項数',1,120);
 if(z.sub(new Q(1n,2n)).n>0n)throw new Error('短い円弧を扱います。矢 c は直径 d の半分以下にしてください。');
 let term=z,sum=new Q(0n);const rows=[];
 for(let k=1;k<=n;k++){sum=sum.add(term);if(k<=8||k===n)rows.push([k,String(term),String(sum)]);term=term.mul(new Q(2n*BigInt(k)**2n,BigInt(k+1)*BigInt(2*k+1))).mul(z);}
 const tail=term.div(new Q(1n).sub(z)),scale=d.mul(d).mul(new Q(4n));
 const lowerSquared=sum.mul(scale),upperSquared=sum.add(tail).mul(scale),p=32,lo=sqrtFloor(lowerSquared,p),hi=sqrtFloor(upperSquared,p)+1n;
 const lower=decimal(lo,p),upper=decimal(hi,p);
 return {...pack(lower+'\n< s <\n'+upper,`${n}項の級数から得た円弧長の厳密な包含区間`,['項 n','加える分数','部分和'],rows,[`z=c/d=${z}。弧長の平方を s²=4d² Σ tₙ と表します。`,'t₁=z、tₙ₊₁/tₙ=2n²z/((n+1)(2n+1))。',`残りの項の和は ${tail} より小さい（正項かつ項比<z）。`,'弧長平方の上下界から、整数平方根で外向きに小数32桁へ丸めました。','円弧長の平方の級数を、現代の逆三角関数と同値な形で計算しています。'],'正項級数と剰余上限による厳密区間'),lower,upper,lowerSquared:String(lowerSquared),upperSquared:String(upperSquared),tail:String(tail),geometry:{type:'arc',ratio:z.number(),diameter:d.number()}};
}
export function certifiedPi(precision){
 const p=count(precision,'小数点以下の桁数',1,50),rows=[];let term=new Q(1n,2n),sum=new Q(0n);
 for(let n=1;n<=140;n++){
  sum=sum.add(term);const next=term.mul(new Q(BigInt(n)**2n,2n*BigInt(n+1)*BigInt(2*n+1)));
  const lowerSquared=sum.mul(new Q(18n)),upperSquared=lowerSquared.add(next.mul(new Q(24n)));
  const lo=sqrtFloor(lowerSquared,p),hi=sqrtFloor(upperSquared,p);if(n<=6||n%10===0)rows.push([n,decimal(lo,p),decimal(hi+1n,p)]);
  if(lo===hi){if(rows.at(-1)[0]!==n)rows.push([n,decimal(lo,p),decimal(hi+1n,p)]);return {...pack(decimal(lo,p),`小数${p}桁を切り捨てで確定 ／ ${n}項`,['項数','下界 L < π','上界 π < U'],rows,['円弧平方の級数に z=1/4 を入れると π²=18Σ1/(n² C(2n,n))。','次項への比は n²/(2(n+1)(2n+1))<1/4。','π²の残差は次項の24倍より小さい。','上下界の平方根を整数計算し、指定桁で切り捨てた値が一致した時だけ確定します。','表は安全側へ丸めた L < π < U。最終行の U は表示値の最後の桁を1増やした数で、その値未満であることを保証します。','建部と同値な円弧級数から導く現代的な計算であり、史料に残る円周率計算の全手順の再現ではありません。'],'上下界が一致した桁を確定'),terms:n,lowerSquared:String(lowerSquared),upperSquared:String(upperSquared)};}
  term=next;
 }
 throw new Error('指定桁を確定できませんでした。未確定の値は表示しません。');
}
