/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,rational,pack,positive,count,fmt,fail} from './advanced-common.mjs';
const norm=v=>Math.hypot(...v),dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),distance=(a,b)=>norm(a.map((x,i)=>x-b[i]));
const sum=q=>q.reduce((s,x)=>s.add(x),new Q(0n));
function inputs(values){const q=values.map((v,i)=>positive(v,'半径 '+(i+1))),scale=q.reduce((a,b)=>a.sub(b).n>0n?a:b);if(q.some(x=>scale.sub(x.mul(new Q(10000n))).n>0n))fail('半径の最大と最小の比は10,000倍以内にしてください。');return {r:q.map(x=>x.div(scale).number()),k:q.map(x=>scale.div(x)),scale:scale.number()};}
function triangle(a,b,c){const t=(a-b)/(a+b),x=a+c*t,y=2*Math.sqrt(a*b*c*(a+b+c))/(a+b);return {base:[{center:[0,0],radius:a},{center:[a+b,0],radius:b},{center:[x,y],radius:c}],u:[a,a*(a+c-x)/y],v:[t,(a-c-x*t)/y]};}
function verify(base,s){if(s.radius===null)return Math.max(...base.map(b=>Math.abs(dot(s.normal,b.center)+b.radius-s.offset)),Math.abs(norm(s.normal)-1));if(s.radius<0&&base.some(b=>-s.radius<b.radius))fail('包み込む解の半径が成立しません。');return Math.max(...base.map(b=>Math.abs(distance(s.center,b.center)-Math.abs(s.radius+b.radius))));}
function physical(base,solutions,scale){return {base:base.map((b,i)=>({center:b.center.map(x=>x*scale),radius:b.radius*scale,label:String.fromCharCode(65+i)})),solutions:solutions.map((s,i)=>s.radius===null?{...s,label:'解'+(i+1),offset:s.offset*scale,curvature:0,error:s.error*scale}:{...s,label:'解'+(i+1),center:s.center.map(x=>x*scale),radius:s.radius*scale,curvature:s.curvature/scale,error:s.error*scale})};}
function output(base,solutions,scale,selected,view,dimension,steps){
 solutions.forEach(s=>{if(s.radius!==null&&Math.abs(s.radius)>1e8)fail('解の曲率が0に近すぎるため、小数で接触を確認できません。半径の比を変えてください。直線・平面になる正確な分数は入力できます。');s.error=verify(base,s);if(!Number.isFinite(s.error)||s.error>1e-7)fail('接触条件の数値検算が成立しません。半径の比を変えてください。');});
 const actual=physical(base,solutions,scale),rows=actual.solutions.map((s,i)=>[i+1,fmt(s.curvature),s.radius===null?(dimension===2?'直線':'平面'):fmt(Math.abs(s.radius))+(s.radius<0?'（包囲）':''),s.radius===null?s.normal.map(fmt).join(', ')+' · X = '+fmt(s.offset):s.center.map(fmt).join(', '),fmt(s.error)]);
 const chosen=actual.solutions[selected-1],value=chosen.radius===null?(dimension===2?'接する直線':'接する平面'):'半径 '+fmt(Math.abs(chosen.radius));
 return {...pack(value,`表示：解${selected}。2つの解は別々の配置です。${chosen.radius<0?'負の曲率は全体を包む境界を表します。':''}`,['解','符号付き曲率','半径 / 境界','中心 / 境界式','接触誤差'],rows,steps,'中心間距離による検算付き・小数近似'),...actual,geometry:{type:'balls',dimension,balls:[...actual.base,{...chosen,accent:true}],view,boundary:chosen.radius===null?chosen:null}};
}
export function tangentCircles(a,b,c,branch){
 const selected=count(branch,'表示する解',1,2),{r,k,scale}=inputs([a,b,c]),{base,u,v}=triangle(...r),S=sum(k),P=k[0].mul(k[1]).add(k[1].mul(k[2])).add(k[2].mul(k[0]));
 const plus=S.number()+2*Math.sqrt(P.number()),product=S.mul(S).sub(P.mul(new Q(4n))),minus=product.n===0n?0:product.number()/plus;
 const solutions=[plus,minus].map(curvature=>curvature===0?{curvature:0,radius:null,normal:v,offset:r[0]}:{curvature,radius:1/curvature,center:u.map((x,i)=>x+v[i]/curvature)});
 return output(base,solutions,scale,selected,0,2,['3つの円の中心間距離を、半径の和として三角形を作ります。','k=1/r とすると、k₄=k₁+k₂+k₃ ± 2√(k₁k₂+k₂k₃+k₃k₁)。','接触条件の平方を引き合わせ、中心座標を求めます。','曲率0は直線。負の曲率は包囲円で、その実際の半径は |1/k|。','3つの与円それぞれと、選んだ解の距離を検算しています。']);
}
export function tangentSpheres(a,b,c,d,branch,angle){
 const selected=count(branch,'表示する解',1,2),view=count(angle,'見る向き',0,360),{r,k,scale}=inputs([a,b,c,d]),t=triangle(...r.slice(0,3)),[ra,rb,rc,rd]=r;
 const base=t.base.map(b=>({...b,center:[...b.center,0]})),[x,y]=base[2].center,S=sum(k),Q2=sum(k.map(x=>x.mul(x))),E=S.mul(S).sub(Q2.mul(new Q(2n)));
 if(E.n<0n)fail('この4つの半径では、互いに外接する4球を配置できません。');
 const x4=ra+rd*(ra-rb)/(ra+rb),y4=((ra+rd)**2+(ra+rc)**2-(rc+rd)**2-2*x*x4)/(2*y);
 const z2=ra*rb*rc*rd*rd/(ra+rb+rc)*E.number(),z4=E.n===0n?0:Math.sqrt(z2);base.push({center:[x4,y4,z4],radius:rd});
 let solutions;
 if(E.n===0n){const curvature=S.number()/2,radius=1/curvature,xx=t.u[0]+radius*t.v[0],yy=t.u[1]+radius*t.v[1],zz2=(ra+radius)**2-xx*xx-yy*yy;if(zz2<=0)fail('同一平面の球配置が数値的に退化しています。');solutions=[1,-1].map(sign=>({curvature,radius,center:[xx,yy,sign*Math.sqrt(zz2)]}));}
 else{
  if(z4<1e-8)fail('4球の中心が同一平面に近すぎます。半径の比を変えてください。');
  const u=[...t.u,(ra*(ra+rd)-x4*t.u[0]-y4*t.u[1])/z4],v=[...t.v,(ra-rd-x4*t.v[0]-y4*t.v[1])/z4];
  const plus=(S.number()+Math.sqrt(3*E.number()))/2,product=Q2.mul(new Q(3n)).sub(S.mul(S)),minus=product.n===0n?0:product.number()/(2*plus);
  solutions=[plus,minus].map(curvature=>curvature===0?{curvature:0,radius:null,normal:v,offset:ra}:{curvature,radius:1/curvature,center:u.map((x,i)=>x+v[i]/curvature)});
 }
 for(let i=0;i<base.length;i++)for(let j=i+1;j<base.length;j++)if(Math.abs(distance(base[i].center,base[j].center)-base[i].radius-base[j].radius)>1e-7)fail('与えた4球の接触条件を確認できません。');
 return output(base,solutions,scale,selected,view,3,['最初の4球は6組すべての中心間距離を検査します。','S=Σkᵢ、Q=Σkᵢ² とし、S²−2Q が負なら与えた4球を配置できません。','5球では (Σkᵢ)²=3Σkᵢ²。第5球の曲率は (S ± √(3S²−6Q))/2。','中心座標も求め、各候補を4つの球との距離で検算します。','曲率0は平面。最初の4球の中心が同一平面の場合は、同じ半径で面の両側にある2解を別々に扱います。']);
}
export function hexlet(outer,sun,moon,phase,angle){
 const Rq=positive(outer,'外球の半径 R'),aq=positive(sun,'日球の半径 a'),bq=positive(moon,'月球の半径 b'),gap=Rq.sub(aq).sub(bq);
 if(gap.n<0n)fail('日球と月球の半径の和は、外球の半径以下にしてください。');
 const R=Rq.number(),a=aq.div(Rq).number(),b=bq.div(Rq).number();if([aq,bq].some(x=>x.mul(new Q(1000n)).sub(Rq).n<0n))fail('日球と月球は、それぞれ外球の半径の1/1000以上にしてください。');
 const raw=String(phase).normalize('NFKC').trim();if(!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)||raw.length>24||rational(raw).sub(new Q(360n)).n>0n)fail('開始角は0〜360度の小数にしてください。');
 const phi=Number(raw)*Math.PI/180,view=count(angle,'見る向き',0,360),g=gap.div(Rq).number();
 const sunBall={center:[1-a,0,0],radius:a,label:'日'},moonBall={center:[1-b*(1+a)/(1-a),2*Math.sqrt(a*b*g)/(1-a),0],radius:b,label:'月'};
 const K=4*a/(1-a),m=-(1+a)/(1-a),q=2*Math.sqrt(a*g/b)/(1-a);
 const build=n=>{const theta=phi+n*Math.PI/3,U=[m,q+2*Math.cos(theta),2*Math.sin(theta)],den=(m-1)*(m+1)+U[1]**2+U[2]**2,radius=K/den;return {center:[1+radius*U[0],radius*U[1],radius*U[2]],radius,label:['甲','乙','丙','丁','戊','己','甲へ'][n]};};
 const balls=Array.from({length:7},(_,i)=>build(i)),spheres=balls.slice(0,6),contacts=[],nonoverlaps=[];
 spheres.forEach((s,i)=>{contacts.push({pair:s.label+'—外',error:Math.abs(norm(s.center)+s.radius-1)});for(const fixed of [sunBall,moonBall])contacts.push({pair:s.label+'—'+fixed.label,error:Math.abs(distance(s.center,fixed.center)-s.radius-fixed.radius)});const next=spheres[(i+1)%6];contacts.push({pair:s.label+'—'+next.label,error:Math.abs(distance(s.center,next.center)-s.radius-next.radius)});});
 for(let i=0;i<6;i++)for(let j=i+1;j<6;j++)if(j!==i+1&&!(i===0&&j===5))nonoverlaps.push({pair:spheres[i].label+'—'+spheres[j].label,gap:distance(spheres[i].center,spheres[j].center)-spheres[i].radius-spheres[j].radius});
 const closureError=Math.max(distance(balls[0].center,balls[6].center),Math.abs(balls[0].radius-balls[6].radius)),error=Math.max(...contacts.map(c=>c.error));
 if(error>1e-8||closureError>1e-8||nonoverlaps.some(c=>c.gap< -1e-8))fail('球の接触・非重複・閉鎖条件の検算が成立しません。');
 const scale=s=>({...s,center:s.center.map(x=>x*R),radius:s.radius*R}),actual=spheres.map(scale),closure=scale(balls[6]);
 const rows=actual.map((s,i)=>[s.label,fmt(s.radius),fmt(2*s.radius),s.center.map(fmt).join(', ')]);rows.push(['甲へ戻る',fmt(closure.radius),fmt(2*closure.radius),closure.center.map(fmt).join(', ')]);
 return {...pack('6球で、同じ位置へ',`接触24組・非隣接9組を検算 ／ 閉鎖誤差/R ${fmt(closureError)}`,['球','半径','直径','中心 (x, y, z)'],rows,['外球と日球の接点を中心に反転すると、2つの境界は平行な平面になります。','その間では、月球と連鎖する球は同じ半径。中心は正六角形の周りを60度ずつ進みます。','6球を元の空間へ反転し直し、中心座標と半径を計算します。',`最大接触誤差/R：${fmt(error)}。非隣接球の最小の隙間/R：${fmt(Math.min(...nonoverlaps.map(x=>x.gap)))}。`,'直径の一致だけでなく、7番目の中心と半径が最初の球へ戻ることを検査しています。','図は3次元の正投影です。見かけの重なりは球の衝突を意味しません。見る向きを変えて確かめられます。'],'反転幾何による構成・小数で接触検算'),spheres:actual,closure,contacts,nonoverlaps,closureError,geometry:{type:'balls',dimension:3,view,outer:{center:[0,0,0],radius:R},balls:[scale(sunBall),scale(moonBall),...actual.map(s=>({...s,accent:true}))]}};
}
