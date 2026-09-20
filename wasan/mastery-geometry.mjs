/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,normal,rational,positive,count,pack,fail,fmt} from './advanced-common.mjs';
const signed=(s,label)=>{s=normal(s);if(s.length>24)fail(label+'は24文字以内で入力してください。');const q=rational(s);if(q.n>1000000n*q.d||q.n< -1000000n*q.d)fail(label+'の絶対値は1,000,000以下にしてください。');return q};
const absQ=q=>q.n<0n?new Q(-q.n,q.d):q;
export function inversion(x,y,r,k){
 const X=signed(x,'中心 x'),Y=signed(y,'中心 y'),R=positive(r,'円の半径 r'),K=positive(k,'反転円の半径 k'),power=K.mul(K),norm=X.mul(X).add(Y.mul(Y)),delta=norm.sub(R.mul(R)),base={center:[X.number(),Y.number()],radius:R.number()};
 const point=norm.n?[String(power.mul(X).div(norm)),String(power.mul(Y).div(norm))]:null;
 const rows=[['元の円の中心',`(${X}, ${Y})`],['元の円の半径',String(R)],['Δ = x²+y²−r²',String(delta)],['中心点そのものの反転',point?'('+point.join(', ')+')':'原点なので定義されません']];
 let result,roundTrip=false;
 if(delta.n===0n){
  const offset=power.div(new Q(2n)),restored=[power.mul(X).div(offset.mul(new Q(2n))),power.mul(Y).div(offset.mul(new Q(2n)))];
  roundTrip=restored[0].sub(X).n===0n&&restored[1].sub(Y).n===0n&&norm.sub(R.mul(R)).n===0n;
  const line={normal:[String(X),String(Y)],offset:String(offset)};
  rows.push(['反転後の直線',`${X}·x + ${Y}·y = ${offset}`]);
  result={kind:'line',line,geometry:{type:'inversion',before:base,k:K.number(),line:{normal:[X.number(),Y.number()],offset:offset.number()}},value:`${X}·x + ${Y}·y = ${offset}`};
 }else{
  const center=[power.mul(X).div(delta),power.mul(Y).div(delta)],radius=absQ(power.mul(R).div(delta)),backDelta=center[0].mul(center[0]).add(center[1].mul(center[1])).sub(radius.mul(radius));
  roundTrip=power.mul(center[0]).div(backDelta).sub(X).n===0n&&power.mul(center[1]).div(backDelta).sub(Y).n===0n&&absQ(power.mul(radius).div(backDelta)).sub(R).n===0n;
  rows.push(['反転後の円の中心','('+center.join(', ')+')'],['反転後の半径',String(radius)]);
  result={kind:'circle',center:center.map(String),radius:String(radius),geometry:{type:'inversion',before:base,k:K.number(),after:{center:center.map(c=>c.number()),radius:radius.number()}},value:'中心 ('+center.join(', ')+')\n半径 '+radius};
 }
 if(!roundTrip)fail('2回の反転で元へ戻る検算に失敗しました。');
 return {...pack(result.value,delta.n===0n?'原点を通る円は直線へ移ります。':'反転後の円を、中心と半径まで厳密に計算。',['量','厳密値'],rows,[`反転の中心は原点、半径 k=${K}。点 P の像は k²P/|P|²。`,'Δ≠0 なら円の中心は k²(x,y)/Δ、半径は |k²r/Δ|。','Δ=0 の円は直線へ。式は x₀x+y₀y=k²/2。ゼロで割らず、分数の一致で判定しています。','元の円の中心点の像と、反転後の円の中心は一般には異なります。','反転を2回行うと、元の中心と半径へ戻ることを厳密に確認しました。','原点そのものに像はありません。原点で接する円どうしは平行な直線になる場合があり、その接触点は有限の場所へは移りません。'],'分数による厳密値・図は小数表示'),...result,roundTrip,pointImage:point};
}
export function steiner(outer,inner,offset,number,phase){
 const Rq=positive(outer,'外円の半径 R'),rq=positive(inner,'内円の半径 r'),dq=signed(offset,'中心のずれ d');
 if(dq.n<0n||dq.add(rq).sub(Rq).n>=0n)fail('d は0以上、内円は外円の内側に離して置きます（d+r<R）。');
 const n=count(number,'つなぐ円の個数',3,24),phaseQ=signed(phase,'開始角');if(phaseQ.n<0n||phaseQ.sub(new Q(360n)).n>0n)fail('開始角は0〜360度にしてください。');
 const R=Rq.number(),r=rq.number(),d=dq.number(),u=r/R,e=d/R;
 if(rq.mul(new Q(1000000n)).sub(Rq).n<0n||Rq.sub(dq).sub(rq).mul(new Q(10000000n)).sub(Rq).n<0n)fail('安定して図示するため、r≥R/1,000,000、円の間隔 R−d−r≥R/10,000,000 としてください。');
 const Cq=Rq.mul(Rq).add(rq.mul(rq)).sub(dq.mul(dq)).div(Rq.mul(rq).mul(new Q(2n)));
 const radicand=(1-e-u)*(1+e+u)*(1-e+u)*(1+e-u),root=Math.sqrt(radicand),a=2*e/(1+e*e-u*u+root),h=2*u/(1+u*u-e*e+root),mid=(1+h)/2,p=(1-h)/2;
 const delta=2*Math.asin((1-h)/(1+h)),phi=phaseQ.number()*Math.PI/180;
 const circle=j=>{const theta=phi+j*delta,vx=mid*Math.cos(theta),vy=mid*Math.sin(theta),H=1-2*a*vx+a*a*h;return {center:[R*(a*(1+h)-(1+a*a)*vx)/H,R*(1-a*a)*vy/H],radius:R*(1-a*a)*p/H,label:String(j+1)}};
 const all=Array.from({length:n+1},(_,j)=>circle(j)),circles=all.slice(0,n),last=all[n],first=circles[0];
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 let residual=0;for(let i=0;i<n;i++){const c=circles[i],next=all[i+1];residual=Math.max(residual,Math.abs(Math.hypot(...c.center)+c.radius-R)/R,Math.abs(dist(c.center,[d,0])-c.radius-r)/R,Math.abs(dist(c.center,next.center)-c.radius-next.radius)/R);}
 if(!all.every(c=>c.radius>0&&[...c.center,c.radius].every(Number.isFinite))||residual>1e-7)fail('中心座標と接触の数値検算が安定しません。円の間隔を広げてください。');
 const closingError=Math.abs(dist(circles.at(-1).center,first.center)-circles.at(-1).radius-first.radius)/R,returnError=Math.max(dist(last.center,first.center)/R,Math.abs(last.radius-first.radius)/R),angleError=n*delta-2*Math.PI;
 const exactC={3:new Q(7n),4:new Q(3n),6:new Q(5n,3n)}[n],exactCertificate=exactC?Cq.sub(exactC).n===0n:null;
 let nonoverlap=true,minGap=Infinity,nonneighborPairs=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){if(j===i+1||i===0&&j===n-1)continue;const gap=(dist(circles[i].center,circles[j].center)-circles[i].radius-circles[j].radius)/R;minGap=Math.min(minGap,gap);nonneighborPairs++;if(gap< -1e-9)nonoverlap=false;}
 const endGap=(dist(circles.at(-1).center,first.center)-circles.at(-1).radius-first.radius)/R;minGap=Math.min(minGap,endGap);if(endGap< -1e-9)nonoverlap=false;
 const numericalClosure=Math.abs(angleError)<1e-10&&closingError<1e-8&&returnError<1e-8&&nonoverlap;
 const closed=exactCertificate===null?numericalClosure:exactCertificate&&numericalClosure;
 if(exactCertificate===true&&!numericalClosure)fail('閉鎖条件は成立しますが、配置の数値検算が安定しません。');
 const status=closed?(exactCertificate===true?`${n}円で閉鎖（条件は厳密）`:`${n}円で閉鎖（数値判定）`):`${n}円では一周の輪が閉じません`;
 const rows=all.map((c,i)=>[i===n?'戻り位置 '+(n+1):i+1,fmt(c.center[0]),fmt(c.center[1]),fmt(c.radius)]);
 const steps=[`閉鎖を決める量 C=(R²+r²−d²)/(2Rr)=${Cq}。`,`同心円へ移したときの1歩 δ=${fmt(delta*180/Math.PI)}度。1周に必要な個数 360°/δ≈${fmt(2*Math.PI/delta)}。`,`nδ−360°=${fmt(angleError*180/Math.PI)}度。必要な個数を丸めて閉鎖と判定することはありません。`,
 exactCertificate===null?'この個数の閉鎖は角度・距離の小数検算です。厳密な等式の証明とは区別します。':`n=${n} では C=${exactC} が厳密な閉鎖条件。今回の分数による判定：${exactCertificate?'一致':'不一致'}。`,
 `生成した各円の内外接と次の円との接触：最大誤差/R=${fmt(residual)}。`,`最後と最初の接触誤差/R=${fmt(closingError)}。独立に生成した${n+1}番目と最初の中心・半径の差/R=${fmt(returnError)}。`,
 `非隣接${nonneighborPairs}組と最初・最後の円の重なり：${nonoverlap?'検出なし':'あり'}。${Number.isFinite(minGap)?'最小すき間/R='+fmt(minGap)+'。':''}`,
 '円の数を増やして何周も進めば戻る配置と、重ならず1周で閉じる輪は別です。ここでは後者を判定します。','開始角は同心円へ移した図上の角度。開始位置を動かしても、閉鎖を決める C は変わりません。'];
 return {...pack(status,closed?'開始角を変え、個々の半径が変わっても同じ輪になるか試せます。':'最後の接触、戻り位置、重なりを途中式で確認できます。',['円','中心 x','中心 y','半径'],rows,steps,exactCertificate===true?'閉鎖条件は分数で証明・配置は数値検算':'角度・中心・半径による数値判定'),closed,circles,returnCircle:last,contacts:3*n,residual,closingError,returnError,angleError,nonoverlap,nonneighborPairs,exactCertificate,C:String(Cq),geometry:{type:'chain',R,r,d,circles,returnCircle:last,closed}};
}
