/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,rational,normal,fail,count,pack} from './advanced-common.mjs';
import {gcd} from './math.mjs';
const integer=(s,label,max)=>{s=normal(s);if(!/^\d{1,13}$/.test(s)||BigInt(s)<1n||BigInt(s)>max)fail(`${label}は1〜${max}の整数にしてください。`);return BigInt(s)};
const abs=a=>new Q(a.n<0n?-a.n:a.n,a.d);
export function josephus(ns,ks,ss,rs){
 const n=count(ns,'人数',2,200),k=integer(ks,'数える数',1000000000000n),start=count(ss,'開始番号',1,n),remaining=count(rs,'残す人数',1,n);
 const people=Array.from({length:n},(_,i)=>i+1),removed=[];let index=start-1;
 while(people.length>remaining){index=(index+Number((k-1n)%BigInt(people.length)))%people.length;removed.push(people.splice(index,1)[0]);index%=people.length;}
 if(remaining===1){let j=0n;for(let size=2n;size<=BigInt(n);size++)j=(j+k)%size;if(Number((j+BigInt(start-1))%BigInt(n))+1!==people[0])fail('順番の検算が一致しません。');}
 return {...pack(people.join('・'),`全${n}人から${remaining}人を残す`,['取り除く順','番号'],removed.map((v,i)=>[i+1,v]),['開始番号を1として数え、指定した数番目を取り除きます。','次の人から再び1と数えます。残った番号は元の番号順に表示します。',remaining===1?'最後の番号は漸化式でも照合済み。':'残す人数に達したところで停止します。'],'整数で順序を計算'),removed,survivors:people,geometry:{type:'counting',n,survivors:people}};
}
function oddSquare(n){const a=Array.from({length:n},()=>Array(n).fill(0));let r=0,c=(n-1)/2;for(let k=1;k<=n*n;k++){a[r][c]=k;const nr=(r+n-1)%n,nc=(c+1)%n;if(a[nr][nc])r=(r+1)%n;else[r,c]=[nr,nc];}return a;}
export function magicSquare(s){
 const n=count(s,'一辺のマス数',3,16);let a;
 if(n%2)a=oddSquare(n);
 else if(n%4===0)a=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>{const v=i*n+j+1;return i%4===j%4||i%4+j%4===3?n*n+1-v:v;}));
 else{const m=n/2,k=(n-2)/4,b=oddSquare(m),z=m*m;a=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>b[i%m][j%m]+(i<m?(j<m?0:2*z):(j<m?3*z:z))));
  const swap=(i,j)=>{[a[i][j],a[i+m][j]]=[a[i+m][j],a[i][j]];};
  for(let i=0;i<m;i++){for(let j=0;j<k;j++)swap(i,j);for(let j=n-k+1;j<n;j++)swap(i,j);}swap(k,0);swap(k,k);
 }
 const M=n*(n*n+1)/2,sums=[...a.map(r=>r.reduce((s,v)=>s+v,0)),...a[0].map((_,j)=>a.reduce((s,r)=>s+r[j],0)),a.reduce((s,r,i)=>s+r[i],0),a.reduce((s,r,i)=>s+r[n-1-i],0)];
 if(new Set(a.flat()).size!==n*n||sums.some(s=>s!==M))fail('方陣の検算が一致しません。');
 return {...pack(M,`${n}×${n}の方陣：どの縦・横・二本の対角線もこの和`,['行',...a[0].map((_,i)=>`${i+1}列`)],a.map((r,i)=>[i+1,...r]),['1から'+n*n+'までを一度ずつ配置。',n%2?'奇数の方陣を斜めの移動と折り返しで構成。':n%4===0?'4の倍数の方陣を補数の置換で構成。':'奇数の小方陣を四つ並べ、一部の列を交換。','すべての行・列・二本の対角線と、数の重複がないことを照合済み。'],'整数で全方向を検算'),square:a};
}
const floor=(n,d)=>{const z=n/d;return n<0n&&n%d?z-1n:z;};
export function continuedFraction(s,bs){
 s=normal(s);if(!s||s.length>80)fail('近似する数は80文字以内の整数・小数・分数にしてください。');const x=rational(s),B=integer(bs,'分母の上限',1000000000000n);
 let n=x.n,d=x.d,p0=0n,q0=1n,p1=1n,q1=0n,best,partial=false;const rows=[],quotients=[];
 while(d){const a=floor(n,d),p2=p0+a*p1,q2=q0+a*q1;quotients.push(String(a));
  if(q2>B){const k=(B-q0)/q1,candidates=[new Q(p0+k*p1,q0+k*q1),new Q(p1,q1)];candidates.sort((u,v)=>{const e=abs(x.sub(u)).sub(abs(x.sub(v)));return e.n<0n?-1:e.n>0n?1:u.d<v.d?-1:u.d>v.d?1:u.n<v.n?-1:u.n>v.n?1:0;});best=candidates[0];partial=true;break;}
  const value=new Q(p2,q2);rows.push([quotients.length,String(a),String(value),String(abs(x.sub(value)))]);best=value;[p0,q0,p1,q1]=[p1,q1,p2,q2];[n,d]=[d,n-a*d];
 }
 return {...pack(best,`分母 ${B} 以下で、入力した数との差が最小`,['段','商','収束分数','入力値との絶対差'],rows,['連分数の商：['+quotients.join(', ')+']'+(partial?'（上限に達した段まで）':''),'最後の収束分数と中間分数を、誤差の交差積で比較。','誤差が同じなら分母が小さい方、さらに同じなら小さい数を採用。','入力値との差：'+abs(x.sub(best))],'分数で誤差を厳密比較'),best:String(best),error:String(abs(x.sub(best)))};
}
export function pythagorean(ms,ns,ks){
 const m=integer(ms,'大きい数 m',1000000000n),n=integer(ns,'小さい数 n',1000000000n),k=integer(ks,'倍率',1000000000n);if(m<=n)fail('mはnより大きくしてください。');
 let a=2n*m*n,b=m*m-n*n,c=m*m+n*n;if(a>b)[a,b]=[b,a];const common=gcd(a,b),primitive=[a/common,b/common,c/common],sides=[a*k,b*k,c*k];
 if(sides[0]**2n+sides[1]**2n!==sides[2]**2n)fail('勾股の検算が一致しません。');
 return {...pack(sides.join('・'),'短い直角辺・長い直角辺・斜辺', ['量','値'],[['短い直角辺',sides[0]],['長い直角辺',sides[1]],['斜辺',sides[2]],['三辺の最大公約数',common*k],['原始三つ組',primitive.join('・')]],['2mn、m²−n²、m²+n²から三辺を構成。','三辺に同じ正整数の倍率を掛けます。','直角を挟む二辺の平方和と斜辺の平方が一致することを照合済み。'],'大きな整数も厳密計算'),sides:sides.map(String),primitive:primitive.map(String),geometry:{type:'integerTriangle',ratio:Number(sides[0])/Number(sides[1])}};
}
