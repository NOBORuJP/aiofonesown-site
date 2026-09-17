/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {pack,count,positive,fmt} from './advanced-common.mjs';
import {q,scalar,neg,sq,add,multiply,textPolynomial,determinant} from './expansion-common.mjs';
export function regularPolygon(number,radius){
 const n=count(number,'辺の数',3,60),R=positive(radius,'外接円の半径'),r=R.number(),angle=Math.PI/n,side=2*r*Math.sin(angle),area=n*r*r*Math.sin(2*angle)/2;
 let a=[q(2)],b=[q(0),q(1)];for(let k=2;k<=n;k++){const c=add(multiply(b,[q(0),q(1)]),a.map(neg));a=b;b=c;}b=add(b,[q(-2)]);
 return {...pack(fmt(side),`正${n}角形の一辺 ／ 外接円の半径 ${R}`,['量','小数の近似値'],[['一辺',fmt(side)],['周長',fmt(n*side)],['面積',fmt(area)],['内接円の半径',fmt(r*Math.cos(angle))]],[`t=2cos(2π/${n}) と置きます。`,'C₀=2、C₁=t、Cₖ=tCₖ₋₁−Cₖ₋₂。Cₙ(t)−2=0 を整数係数で生成。',textPolynomial(b,'t')+' = 0。','この式には、他の回転角に対応する根もあります。求める角は2π/nです。','辺や面積の数値は三角関数による小数近似。角の多項式の係数は厳密値です。'],'角の多項式は厳密、長さ・面積は近似'),side,area,angleCoefficients:[...b].reverse().map(String),geometry:{type:'regular',n}};
}
export function circularSegment(radius,height){
 const R=positive(radius,'円の半径'),H=scalar(height,'弧の高さ',0,2000000),twoR=R.mul(q(2));if(H.sub(twoR).n>0n)throw new Error('弧の高さは直径以下にしてください。');
 const major=H.sub(R).n>0n,cap=major?twoR.sub(H):H,u=cap.div(R).number(),theta=2*Math.asin(Math.sqrt(u/2)),r=R.number();
 let term=2*theta**3/3,sum=term;for(let j=1;j<30;j++){term*=-4*theta*theta/((2*j+2)*(2*j+3));sum+=term;}
 const area=(major?Math.PI-sum:sum)*r*r,chord=2*r*Math.sqrt(u*(2-u)),arc=2*r*(major?Math.PI-theta:theta);
 return {...pack(fmt(area),'弦と円弧に挟まれる部分の面積',['量','小数の近似値'],[['面積',fmt(area)],['弦の長さ',fmt(chord)],['円弧の長さ',fmt(arc)]],[`円の半径 R=${R}、弦から円弧までの高さ h=${H}。`,'h*=min(h,2R−h)、θ=2 asin √(h*/(2R))。小さい側の面積はR²(θ−sinθ cosθ)。','浅い弧では近い数の引き算を避け、θ−sinθcosθ の級数で計算。','高さが半径を超えるときは、円全体から反対側の小さな弧の面積を引きます。'],'相殺を避けた小数近似'),area,chord,arc,geometry:{type:'segment',height:H.div(R).number()}};
}
export function ellipticArc(aa,bb,start,end,parts){
 const A=positive(aa,'x方向の半径 a'),B=positive(bb,'y方向の半径 b'),lo=scalar(start,'開始角',0,360),hi=scalar(end,'終了角',0,360),n=count(parts,'分割数',16,4096);
 if(lo.sub(hi).n>0n)throw new Error('開始角は終了角以下にしてください。');
 const a=A.number(),b=B.number(),t0=lo.number()*Math.PI/180,D=hi.sub(lo).number()*Math.PI/180,h=D/n,speed=t=>Math.hypot(a*Math.sin(t),b*Math.cos(t));
 let lower=0,upper=0,estimate=0;const rows=[];
 for(let i=0;i<n;i++){const l=t0+i*h,r=t0+(i+1)*h,values=[speed(l),speed(r)];for(let j=0;j<=4;j++)if(j*Math.PI/2>l&&j*Math.PI/2<r)values.push(j%2?a:b);
  const low=h*Math.min(...values),high=h*Math.max(...values);lower+=low;upper+=high;estimate+=h*(values[0]+4*speed((l+r)/2)+values[1])/6;if(i<4||i===n-1)rows.push([i+1,fmt(low),fmt(high)]);
 }
 const exact=A.sub(B).n===0n?String(A.mul(hi.sub(lo)).div(q(180)))+'π':D===0?'0':null;
 return {...pack(exact||fmt(estimate),`x=a cos t、y=b sin t ／ ${lo}° から ${hi}°`,['区間','長さの下界の近似','長さの上界の近似'],rows,[`弧長=∫ √(a²sin²t+b²cos²t) dt。角度の入力は度、積分ではラジアン。`,`${n}分割し、それぞれの速度の最小・最大から挟み込みます。`,`下界 ≈ ${fmt(lower)}、上界 ≈ ${fmt(upper)}。数学上の上下界を小数で近似表示しています。`,'答えは各区間の両端と中点の速度によるSimpson近似。表示の末尾桁まで保証する区間演算ではありません。','ここでの t は楕円を表す媒介変数の角で、中心から見た点の方角とは異なります。'],'区間ごとの速度で挟み込む'),lower,upper,estimate,exact,geometry:{type:'ellipticArc',ratio:b/a,start:t0,end:t0+D}};
}
export function pappusChain(left,right,number){
 const a=positive(left,'左の内円の半径 a'),b=positive(right,'右の内円の半径 b'),n=count(number,'連ねる円の個数',1,100),R=a.add(b),ar=a.mul(R),abR=ar.mul(b),circles=[];
 for(let k=0;k<=n;k++){const den=ar.add(sq(b).mul(q(k*k))),r=abR.div(den),x=ar.mul(a.mul(q(2)).add(b)).div(den),y=r.mul(q(2*k));circles.push({k,x,y,r});}
 const distance=(p,x,y)=>sq(p.x.sub(x)).add(sq(p.y.sub(y)));
 for(let i=1;i<circles.length;i++){const c=circles[i],prev=circles[i-1];if(distance(c,R,q(0)).sub(sq(R.sub(c.r))).n||distance(c,a,q(0)).sub(sq(a.add(c.r))).n||distance(c,prev.x,prev.y).sub(sq(c.r.add(prev.r))).n)throw new Error('円の接触条件の検算に失敗しました。');}
 const out=circles.slice(1).map(c=>Object.fromEntries(Object.entries(c).map(([k,v])=>[k,k==='k'?v:String(v)])));
 return {...pack(String(circles.at(-1).r),`${n}番目の円の半径 ／ 原点は大きい半円の左端`,['円 n','中心 x','中心 y','半径'],out.map(c=>[c.k,c.x,c.y,c.r]),[`大きい半円の半径 R=a+b=${R}。左の内円中心は(a,0)、最初の右の内円はn=0。`,'Dₙ=a(a+b)+n²b²。rₙ=ab(a+b)/Dₙ。','xₙ=a(a+b)(2a+b)/Dₙ、yₙ=2nrₙ。','外円への内接、左円への外接、直前の円への外接を、中心間距離の二乗で全件厳密照合。','左円と外円の接点へ近づく、一方向の連鎖です。'],'全円の座標・半径・接触を分数で検算'),circles:out,verified:true,geometry:{type:'pappus',a:a.number()/R.number(),b:b.number()/R.number(),circles:circles.slice(1,Math.min(n+1,21)).map(c=>({x:c.x.div(R).number(),y:c.y.div(R).number(),r:c.r.div(R).number()})),shown:Math.min(n,20),total:n}};
}
export function cyclicQuadrilateral(aa,bb,cc,dd){
 const [a,b,c,d]=[aa,bb,cc,dd].map((v,i)=>positive(v,'辺 '+['AB','BC','CD','DA'][i])),s=a.add(b).add(c).add(d).div(q(2)),factors=[a,b,c,d].map(x=>s.sub(x));
 if(factors.some(x=>x.n<=0n))throw new Error('どの一辺も、残り三辺の和より小さくしてください。');
 const K2=factors.reduce((p,v)=>p.mul(v),q(1)),acbd=a.mul(c).add(b.mul(d)),adbc=a.mul(d).add(b.mul(c)),abcd=a.mul(b).add(c.mul(d)),p2=acbd.mul(adbc).div(abcd),q2=acbd.mul(abcd).div(adbc),radius2=acbd.mul(adbc).mul(abcd).div(K2.mul(q(16))),area=Math.sqrt(K2.number()),p=Math.sqrt(p2.number()),other=Math.sqrt(q2.number());
 // Place opposite vertices across the AC diagonal; compute heights from exact squared quantities.
 const bx=sq(a).add(p2).sub(sq(b)).div(q(2)),dx=sq(d).add(p2).sub(sq(c)).div(q(2));
 const points=[[0,0],[bx.number()/p,Math.sqrt(sq(a).sub(sq(bx).div(p2)).number())],[p,0],[dx.number()/p,-Math.sqrt(sq(d).sub(sq(dx).div(p2)).number())]];
 return {...pack(fmt(area),'四頂点が一つの円にある凸四角形の面積',['量','値'],[['面積の二乗（厳密）',String(K2)],['対角線 AC（近似）',fmt(p)],['対角線 BD（近似）',fmt(other)],['外接円半径（近似）',fmt(Math.sqrt(radius2.number()))]],[`辺は順に AB=${a}、BC=${b}、CD=${c}、DA=${d}。`,`半周 s=${s}、面積²=(s−a)(s−b)(s−c)(s−d)=${K2}。`,'AC²=(ac+bd)(ad+bc)/(ab+cd)、BD²=(ac+bd)(ab+cd)/(ad+bc)。','R²=(ac+bd)(ad+bc)(ab+cd)/(16·面積²)。','辺だけから一般の四角形の面積は決まりません。四頂点が同じ円上にある条件で計算しています。'],'平方量は分数で厳密、平方根は近似'),areaSquared:String(K2),diagonals:[p,other],radius:Math.sqrt(radius2.number()),geometry:{type:'quadrilateral',points}};
}
export function tetrahedron(ab,ac,ad,bc,bd,cd){
 const [u,v,w,U,V,W]=[ab,ac,ad,bc,bd,cd].map((x,i)=>positive(x,['AB','AC','AD','BC','BD','CD'][i]));
 for(const [a,b,c] of [[u,v,U],[u,w,V],[v,w,W],[U,V,W]])if(a.add(b).sub(c).n<0n||a.add(c).sub(b).n<0n||b.add(c).sub(a).n<0n)throw new Error('三辺が三角形を作れない面があります。');
 const uv=sq(u).add(sq(v)).sub(sq(U)).div(q(2)),uw=sq(u).add(sq(w)).sub(sq(V)).div(q(2)),vw=sq(v).add(sq(w)).sub(sq(W)).div(q(2)),G=[[sq(u),uv,uw],[uv,sq(v),vw],[uw,vw,sq(w)]],det=determinant(G),vol2=det.div(q(36));
 const minors=[sq(u).mul(sq(v)).sub(sq(uv)),sq(u).mul(sq(w)).sub(sq(uw)),sq(v).mul(sq(w)).sub(sq(vw))];
 if(minors.some(x=>x.n<0n)||det.n<0n)throw new Error('各面の三角形条件だけでは足りません。この六辺を持つ実数の四面体は作れません。');
 let geometry=null;if(minors[0].n>0n){const bx=u.number(),cx=uv.div(u).number(),cy=Math.sqrt(minors[0].div(sq(u)).number()),dx=uw.div(u).number(),dy=vw.sub(uv.mul(uw).div(sq(u))).number()/cy,dz=Math.sqrt(det.div(minors[0]).number());geometry={type:'tetrahedron',points:[[0,0,0],[bx,0,0],[cx,cy,0],[dx,dy,dz]]};}
 return {...pack(det.n?fmt(Math.sqrt(vol2.number())):'0',det.n?'六辺の長さから求めた体積（近似）。':'平面に退化しています。厚みのある四面体ではありません。',['内積行列','AB方向','AC方向','AD方向'],G.map((r,i)=>[['AB','AC','AD'][i],...r.map(String)]),['AからB、C、Dへ向かう三つのベクトルを使います。','内積は u·v=(|u|²+|v|²−|u−v|²)/2。',`Gram行列式=${det}。体積²=det(G)/36=${vol2}。`,'面の三角形条件と行列の主小行列式の非負性を、分数で厳密判定。','図は斜めからの正投影。長さや角度を画面上で測った値とは異なります。'],'存在条件・体積の二乗を厳密判定'),volumeSquared:String(vol2),flat:!det.n,geometry};
}
