/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {q,neg,sq,power,scalar,normal,fail} from './expansion-common.mjs';
import {positive,pack,fmt} from './advanced-common.mjs';
import {approximateQ} from './math.mjs';
export const number=approximateQ;
export function inputRows(s,min,max,cols){s=normal(s);if(!s||s.length>1400)fail('入力は全体1400文字以内にしてください。');const lines=s.split('\n').map(t=>t.trim());if(lines.length<min||lines.length>max)fail(`${min}〜${max}行で入力してください。`);return lines.map((line,i)=>{const tokens=line.split(/[,、\s]+/);if(tokens.length!==cols)fail(`${i+1}行目は${cols}個の数にしてください。`);return tokens.map(t=>scalar(t,'座標・条件の数'));});}
export function survey(ds,ns,fs,es){
 const d=positive(ds,'二地点間の距離'),near=positive(ns,'近い地点の傾き'),far=positive(fs,'遠い地点の傾き'),eye=scalar(es,'目の高さ',0,1000000);if(near.sub(far).n<=0n)fail('近い地点の傾きは、遠い地点の傾きより大きくしてください。');
 const x=d.mul(far).div(near.sub(far)),h=x.mul(near).add(eye);
 if(h.sub(eye).div(x.add(d)).sub(far).n)fail('遠い地点からの検算が一致しません。');
 return {...pack(h,'目標の地面から頂点までの高さ', ['量','値'],[['近い地点から目標の足まで',String(x)],['遠い地点から目標の足まで',String(x.add(d))],['目の高さから頂点まで',String(h.sub(eye))],['目標の高さ',String(h)]],['近い地点からの水平距離 x = 基線 × 遠い傾き ÷ (近い傾き − 遠い傾き)。','高さ = x × 近い傾き + 目の高さ。','遠い地点から見た傾きにも戻して照合済み。'],'二地点の関係を分数で照合'),distance:String(x),height:String(h),geometry:{type:'survey',points:[[0,0],[0,number(h)],[number(x),number(eye)],[number(x.add(d)),number(eye)]]}};
}
const sub=(a,b)=>a.map((v,i)=>v.sub(b[i]));
const cross=(a,b)=>a[0].mul(b[1]).sub(a[1].mul(b[0]));
const orient=(a,b,c)=>cross(sub(b,a),sub(c,a));
const dot=(a,b)=>a[0].mul(b[0]).add(a[1].mul(b[1]));
const equal=(a,b)=>a.every((v,i)=>!v.sub(b[i]).n);
const between=(p,a,b)=>p.every((v,i)=>v.sub(a[i]).mul(v.sub(b[i])).n<=0n);
const intersects=(a,b,c,d)=>{const A=orient(a,b,c).n,B=orient(a,b,d).n,C=orient(c,d,a).n,D=orient(c,d,b).n;return (!A&&between(c,a,b))||(!B&&between(d,a,b))||(!C&&between(a,c,d))||(!D&&between(b,c,d))||((A<0n&&B>0n||A>0n&&B<0n)&&(C<0n&&D>0n||C>0n&&D<0n));};
export function polygonArea(s){
 let p=inputRows(s,3,31,2);if(equal(p[0],p.at(-1)))p.pop();const n=p.length;if(n<3||n>30)fail('異なる頂点を3〜30個にしてください。');
 for(let i=0;i<n;i++){for(let j=0;j<i;j++)if(equal(p[i],p[j]))fail('頂点の重複があります。');const before=sub(p[i],p[(i+n-1)%n]),after=sub(p[(i+1)%n],p[i]);if(!cross(before,after).n&&dot(before,after).n<=0n)fail('辺の折り返しや重なりがあります。');}
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(j!==i+1&&!(i===0&&j===n-1)&&intersects(p[i],p[(i+1)%n],p[j],p[(j+1)%n]))fail('隣り合わない辺が交差・接触しています。');
 let A=q(0),X=q(0),Y=q(0);const rows=[];for(let i=0;i<n;i++){const a=p[i],b=p[(i+1)%n],c=cross(a,b);A=A.add(c);X=X.add(a[0].add(b[0]).mul(c));Y=Y.add(a[1].add(b[1]).mul(c));rows.push([i+1,a.map(String).join(', '),String(c)]);}
 if(!A.n)fail('面積が0になる配置です。');const area=(A.n<0n?neg(A):A).div(q(2)),cx=X.div(A.mul(q(3))),cy=Y.div(A.mul(q(3)));
 const translated=p.map(v=>sub(v,p[0]));let unit=q(0);for(const v of translated.flat()){const a=v.n<0n?neg(v):v;if(a.sub(unit).n>0n)unit=a;}
 return {...pack(area,'自己交差しない多角形の面積', ['頂点','座標 (x, y)','隣の頂点との交差積'],rows,['符号付き面積の2倍：'+A,'面積重心 = ('+cx+', '+cy+')。一様な厚さ・密度の図形を想定。','頂点の順を逆にしても、面積と重心は変わりません。'],'面積・重心を分数で厳密計算'),area:String(area),centroid:[String(cx),String(cy)],geometry:{type:'surveyPolygon',points:translated.map(v=>v.map(a=>number(a.div(unit)))),centroid:[number(cx.sub(p[0][0]).div(unit)),number(cy.sub(p[0][1]).div(unit))]}};
}
export function sphericalZone(rs,ls,us){
 const R=positive(rs,'球の半径'),l=scalar(ls,'下側の高さ'),u=scalar(us,'上側の高さ');if(l.add(R).n<0n||u.sub(R).n>0n||u.sub(l).n<=0n)fail('高さは −R ≤ 下側 < 上側 ≤ R にしてください。');
 const volume=sq(R).mul(u.sub(l)).sub(power(u,3).sub(power(l,3)).div(q(3))),surface=q(2).mul(R).mul(u.sub(l)),moment=sq(R).mul(sq(u).sub(sq(l))).div(q(2)).sub(power(u,4).sub(power(l,4)).div(q(4))),center=moment.div(volume);
 return {...pack(volume+' × π','二つの平面にはさまれた球内の体積', ['量','値'],[['体積',volume+' × π'],['球面の曲面積（端面を除く）',surface+' × π'],['一様な立体の重心 z',String(center)],['下端の円の半径の二乗',String(sq(R).sub(sq(l)))],['上端の円の半径の二乗',String(sq(R).sub(sq(u)))]],['球の中心を z=0、上向きを正とします。','断面積 π(R²−z²) を下側から上側まで積分。','重心は z を掛けた断面積の積分を、体積で割って求めます。'],'πの係数と重心を厳密計算'),volumeCoefficient:String(volume),surfaceCoefficient:String(surface),centroid:String(center),geometry:{type:'sphereZone',lower:number(l.div(R)),upper:number(u.div(R)),center:number(center.div(R))}};
}
export function torus(Rs,rs){
 const R=positive(Rs,'回転軸から断面中心までの距離'),r=positive(rs,'断面の円の半径');if(R.sub(r).n<0n)fail('回転軸までの距離 R は断面半径 r 以上にしてください。');const v=q(2).mul(R).mul(sq(r)),s=q(4).mul(R).mul(r),horn=!R.sub(r).n;
 return {...pack(v+' × π²','円の内部を一周回転させた環体の体積', ['量','値'],[['体積',v+' × π²'],['表面積',s+' × π²'],['外側の半径',String(R.add(r))],['内側の半径',String(R.sub(r))]],['断面積 πr² と、断面中心が進む長さ 2πR を掛けます。','表面積は断面の円周 2πr × 2πR。',horn?'R=r：中央の穴が一点に閉じる場合です。':'R>r：中央に穴のある環体です。'],'π²の係数を厳密計算'),volumeCoefficient:String(v),surfaceCoefficient:String(s),horn,geometry:{type:'torusSection',ratio:number(r.div(R))}};
}
export function malfatti(as,bs,cs){
 const sides=[positive(as,'辺 BC'),positive(bs,'辺 CA'),positive(cs,'辺 AB')],S=sides.reduce((a,b)=>a.add(b),q(0)).div(q(2)),parts=sides.map(a=>S.sub(a));if(parts.some(a=>a.n<=0n))fail('各辺は、ほかの二辺の和より小さくしてください。');
 // Normalize first; all small triangle differences are formed exactly before conversion.
 const lengths=sides.map(a=>number(a.div(S))),t=parts.map(a=>number(a.div(S)));if(Math.min(...t)<1e-8)fail('非常に扁平な三角形です。安定した図と接触精度のため、各 (半周長−辺)/半周長 は 0.00000001 以上にしてください。');
 const rho=Math.sqrt(number(parts.reduce((a,b)=>a.mul(b),q(1)).div(power(S,3)))),u=t.map(a=>(1+1/(Math.hypot(a/rho,1)+a/rho))/2),r=[rho*u[1]*u[2]/u[0],rho*u[0]*u[2]/u[1],rho*u[0]*u[1]/u[2]], [a,b,c]=lengths;
 const points=[[0,0],[c,0],[(b*b+c*c-a*a)/(2*c),2*rho/c]],I=[(b*points[1][0]+c*points[2][0])/2,c*points[2][1]/2],centers=points.map((P,i)=>P.map((v,j)=>v+r[i]/rho*(I[j]-v)));
 let error=0;const lineDistance=(P,A,B)=>Math.abs((B[0]-A[0])*(P[1]-A[1])-(B[1]-A[1])*(P[0]-A[0]))/Math.hypot(B[0]-A[0],B[1]-A[1]);
 for(let i=0;i<3;i++){for(let j=i+1;j<3;j++)error=Math.max(error,Math.abs(Math.hypot(centers[i][0]-centers[j][0],centers[i][1]-centers[j][1])/(r[i]+r[j])-1));for(const j of [(i+1)%3,(i+2)%3])error=Math.max(error,Math.abs(lineDistance(centers[i],points[i],points[j])/r[i]-1));if(lineDistance(centers[i],points[(i+1)%3],points[(i+2)%3])+1e-12<r[i])fail('円が三角形の外へ出ています。');}
 if(!Number.isFinite(error)||error>1e-8)fail('この細長い配置では十分な接触精度を確保できません。辺の比を近づけてください。');const scale=number(S),radii=r.map(v=>v*scale),digits=x=>String(Number(x.toPrecision(9)));
 return {...pack(radii.map(digits).join('・'),'頂点 A・B・C に対応する三円の半径（近似）', ['円','半径','中心 (x, y)'],radii.map((v,i)=>['ABC'[i],digits(v),centers[i].map(v=>digits(v*scale)).join(', ')]),['A=(0,0)、B=('+fmt(number(sides[2]))+',0)、Cは上側に配置。','内接円と角の二等分線を使い、三円の半径と中心を構成。','互いの外接・各円と二辺の接触を距離で検算。最大相対残差：'+error.toExponential(2),'三円の合計面積を最大にする問題とは異なります。'],'円同士と二辺への接触を近似検算'),radii,verified:true,residual:error,geometry:{type:'malfatti',points,circles:centers.map((v,i)=>({x:v[0],y:v[1],r:r[i]}))}};
}
