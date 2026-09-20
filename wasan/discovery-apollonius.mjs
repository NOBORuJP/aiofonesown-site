/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {q,sq,neg,fail} from './expansion-common.mjs';
import {pack,integerSqrt} from './advanced-common.mjs';
import {Q,exactDecimal} from './math.mjs';
import {inputRows,number} from './discovery-geometry.mjs';
const dot=(a,b)=>a[0].mul(b[0]).add(a[1].mul(b[1]));
const f=x=>String(Number(x.toPrecision(13)));
const coordinate=x=>String(Number(x.toPrecision(15)));
const exactRoot=value=>({radius:number(value),exact:value});
export function apollonius(s){
 const original=inputRows(s,3,3,3);if(original.some(p=>p[2].n<=0n||p[2].mul(q(1000)).sub(q(1)).n<0n))fail('各半径は0.001〜1,000,000にしてください。');
 const origin=original[0],delta=original.map(p=>[p[0].sub(origin[0]),p[1].sub(origin[1]),p[2]]);let scale=q(0);for(const p of delta)for(const v of p){const a=v.n<0n?neg(v):v;if(a.sub(scale).n>0n)scale=a;}
 const P=delta.map(p=>p.map(v=>v.div(scale))),det=P[1][0].mul(P[2][1]).sub(P[1][1].mul(P[2][0]));if(!det.n||Math.abs(number(det))<1e-8)fail('三つの中心が一直線上、または非常に近い配置です。中心が作る三角形を広げてください。');
 const solve=(rhs)=>[rhs[0].mul(P[2][1]).sub(rhs[1].mul(P[1][1])).div(det),P[1][0].mul(rhs[1]).sub(P[2][0].mul(rhs[0])).div(det)];
 const U=solve(P.slice(1).map(p=>sq(p[0]).add(sq(p[1])).sub(sq(p[2])).add(sq(P[0][2])).div(q(2)))),solutions=[];let maxResidual=0;
 for(let mask=0;mask<8;mask++){
  const signs=[0,1,2].map(i=>mask&(1<<i)?-1:1),V=solve(P.slice(1).map((p,i)=>P[0][2].mul(q(signs[0])).sub(p[2].mul(q(signs[i+1]))))),A=dot(V,V).sub(q(1)),B=dot(U,V).sub(P[0][2].mul(q(signs[0]))).mul(q(2)),C=dot(U,U).sub(sq(P[0][2]));let roots=[];
  if(!A.n){if(!B.n){if(!C.n)fail('接円が一意に列挙できない退化した配置です。入力円を動かしてください。');}else if(neg(C).div(B).n>0n)roots=[exactRoot(neg(C).div(B))];}
  else{const D=sq(B).sub(A.mul(C).mul(q(4)));if(D.n>=0n){const an=number(A);if(!D.n){const root=neg(B).div(A.mul(q(2)));if(root.n>0n)roots=[exactRoot(root)];}
   else{const sn=integerSqrt(D.n),sd=integerSqrt(D.d);if(sn*sn===D.n&&sd*sd===D.d){const radical=new Q(sn,sd),denominator=A.mul(q(2));roots=(B.n<0n?[neg(B).add(radical),neg(B).sub(radical)]:[neg(B).sub(radical),neg(B).add(radical)]).map(v=>v.div(denominator)).filter(v=>v.n>0n).map(exactRoot);}
    else{const bn=number(B),cn=C.n?number(C):0,discriminant=Math.sqrt(number(D)),stable=-0.5*(bn+(bn<0?-discriminant:discriminant));roots=[{radius:stable/an}];if(C.n)roots.push({radius:cn/stable});}}
  }}
  // Remove exact coincident-circle roots algebraically, without merging nearby distinct circles.
  const identical=P.filter((p,i)=>signs[i]===-1&&U.every((v,j)=>!v.add(V[j].mul(p[2])).sub(p[j]).n)).map(p=>p[2]);
  if(identical.length){if(!A.n)roots=[];else{const other=neg(B).div(A).sub(identical[0]);roots=other.n>0n&&!identical.some(r=>!r.sub(other).n)?[exactRoot(other)]:[];}}
  for(const candidate of roots){const {radius,exact}=candidate;if(radius<=0)continue;if(!Number.isFinite(radius))fail('解の半径が表示範囲を超えています。配置を変えてください。');
   // Evaluate cancellation-prone centers and contact signs before converting
   // exact rational roots to binary64. SVG coordinates remain approximate.
   const centerQ=exact?U.map((v,i)=>v.add(V[i].mul(exact))):null,center=centerQ?centerQ.map(number):U.map((v,i)=>number(v)+(V[i].n?number(V[i]):0)*radius);let error=0;
   const contains=[];
   for(let i=0;i<3;i++){
    if(exact){const difference=centerQ.map((v,j)=>v.sub(P[i][j])),signed=exact.add(P[i][2].mul(q(signs[i])));if(dot(difference,difference).sub(sq(signed)).n)fail('接円の厳密な距離検算が一致しません。');contains.push(exact.sub(P[i][2]).n>0n);}
    else{const ri=number(P[i][2]);if(signs[i]===-1&&Math.abs(radius-ri)<=32*Number.EPSILON*Math.max(radius,ri))fail('接円と入力円の半径差が小さく、内接の向きを十分な精度で判定できません。入力円を動かしてください。');contains.push(radius>ri);}
    const dx=exact?number(centerQ[0].sub(P[i][0])):center[0]-number(P[i][0]),dy=exact?number(centerQ[1].sub(P[i][1])):center[1]-number(P[i][1]),ri=number(P[i][2]),distance=Math.hypot(dx,dy),expected=Math.abs(exact?number(exact.add(P[i][2].mul(q(signs[i])))):radius+signs[i]*ri);error=Math.max(error,Math.abs(distance-expected)/Math.max(radius,ri));
   }
   if(!Number.isFinite(error)||error>1e-8)fail('接触距離の精度を確保できない解があります。入力円の位置や半径を近づけてください。');maxResidual=Math.max(maxResidual,error);const S=number(scale),worldQ=centerQ?.map((v,i)=>v.mul(scale).add(origin[i])),radiusQ=exact?.mul(scale),differenceQ=centerQ?.map(v=>v.mul(scale));
   // If rounded radii would conceal containment, show the exact rational
   // radius. The table must not contradict its own contact classification.
   const radiusText=radiusQ&&original.some((p,i)=>signs[i]===-1&&radiusQ.sub(p[2]).n&&f(number(radiusQ))===f(number(p[2])))?exactDecimal(radiusQ):f(radius*S);
   solutions.push({x:worldQ?number(worldQ[0]):center[0]*S+number(origin[0]),y:worldQ?number(worldQ[1]):center[1]*S+number(origin[1]),r:radiusQ?number(radiusQ):radius*S,radiusText,difference:differenceQ?differenceQ.map(number):center.map(v=>v*S),contains,signs,residual:error,normalized:{x:center[0],y:center[1],r:radius}});
  }
 }
 const contact=(solution,i)=>solution.signs[i]===1?'外接':solution.contains[i]?'入力円を包む':'入力円の内側';
 return {...pack(solutions.length+' 個',solutions.length?'内接・外接の組合せを含む正の半径の解':'この配置には正の半径の接円がありません', ['解','中心 (x, y) の近似','半径（近似・一部は厳密値）','円1の中心からの差 (Δx, Δy)','円1との接触','円2との接触','円3との接触'],solutions.map((v,i)=>[i+1,coordinate(v.x)+', '+coordinate(v.y),v.radiusText,f(v.difference[0])+', '+f(v.difference[1]),...v.signs.map((_,j)=>contact(v,j))]),['表の小数は近似です。丸めると内接の向きが読めなくなる場合のみ、半径を厳密な有限小数・分数で示します。','差の原点は円1の中心 ('+original[0][0]+', '+original[0][1]+')。大きな座標中の小さなずれは、差の列を使ってください。','接触距離 |ρ + σᵢrᵢ| を8通りの符号で調べます。','円の方程式を引き算し、中心を半径の一次式として表した後、二次方程式を解きます。','二乗する前の距離式で全解を再検算。最大相対残差：'+maxResidual.toExponential(2),'表はすべての解。図は入力した三円と、表の1番の解を同じ尺度で表示します。'],'接触の符号と距離を検算'),solutions,verified:true,geometry:{type:'apollonius',circles:P.map(p=>({x:number(p[0]),y:number(p[1]),r:number(p[2])})),answer:solutions[0]?.normalized}};
}
