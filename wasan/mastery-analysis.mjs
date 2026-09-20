/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,normal,rational,pack,fail,count,positive,decimal} from './advanced-common.mjs';
import {certifiedPi} from './advanced-analysis.mjs';
const choose=(n,k)=>{let c=1n;for(let j=1;j<=k;j++)c=c*BigInt(n-j+1)/BigInt(j);return c};
const fact=n=>{let v=1n;for(let i=2;i<=n;i++)v*=BigInt(i);return v};
export function bernoulli(n,p){
 n=normal(n);if(!/^\d{1,80}$/.test(n))fail('最後の数 N は0以上、80桁以内の整数にしてください。');
 const N=BigInt(n),power=count(p,'累乗 p',0,40),a=[],b=[];
 for(let m=0;m<=power;m++){a[m]=new Q(1n,BigInt(m+1));for(let j=m;j>=1;j--)a[j-1]=a[j-1].sub(a[j]).mul(new Q(BigInt(j)));b.push(a[0]);}
 const coeff=Array(power+2).fill(null).map(()=>new Q(0n));let value=new Q(0n);const rows=[];
 for(let j=0;j<=power;j++){const degree=power+1-j,c=b[j].mul(new Q(choose(power+1,j),BigInt(power+1)));coeff[degree]=c;value=value.add(c.mul(new Q(N**BigInt(degree))));rows.push([j,String(b[j]),degree,String(c)]);}
 if(value.d!==1n)fail('和が整数になる条件の検算に失敗しました。');
 // A symbolic certificate is independent of evaluating at the chosen N.
 for(let k=0;k<=power;k++){let d=new Q(0n);for(let j=k+1;j<coeff.length;j++)d=d.add(coeff[j].mul(new Q(choose(j,k)*((j-k)%2?1n:-1n))));if(d.sub(new Q(k===power?1n:0n)).n)fail('和の多項式の差分検算に失敗しました。');}
 let polynomial='';for(let j=coeff.length-1;j>=1;j--){const c=coeff[j];if(!c.n)continue;const neg=c.n<0n,mag=new Q(neg?-c.n:c.n,c.d);polynomial+=(polynomial?(neg?' − ':' + '):(neg?'−':''))+(String(mag)==='1'?'':String(mag)+'·')+'N'+(j===1?'':'^'+j);}
 return {...pack(value,`1^${power} から ${N}^${power} までの厳密な和`,['j','ベルヌーイ係数 βⱼ','N の次数','和の多項式の係数'],rows,[`S(N) = ${polynomial}。`,'ここでは β₁=+1/2 の約束を使います。β₁=−1/2 の表とは一次項の符号の約束が異なります。','βⱼ を有理数の三角漸化式で生成し、S(N)=Σ C(p+1,j)βⱼN^(p+1−j)/(p+1) に入れます。','全係数について S(N)−S(N−1)=N^p、S(0)=0 を厳密に検算しています。','p=0 は N 個の1の和です。N=0 の空の和は0です。'],'有理数係数・整数の和・差分恒等式を厳密計算'),bernoulli:b.map(String),polynomial,coefficients:coeff.map(String),certificate:true};
}
function beta(p,q){return new Q(fact(p)*fact(q),fact(p+q+1));}
function trig(p,q){
 if(p>=2)return trig(p-2,q).mul(new Q(BigInt(p-1),BigInt(p+q)));
 if(q>=2)return trig(p,q-2).mul(new Q(BigInt(q-1),BigInt(p+q)));
 return p===0&&q===0?new Q(1n,2n):p===1&&q===1?new Q(1n,2n):new Q(1n);
}
export function enriTable(p,q,mode){
 p=count(p,'指数 p',0,40);q=count(q,'指数 q',0,40);mode=count(mode,'積分の種類',1,2);
 const coefficient=mode===1?beta(p,q):trig(p,q),pi=mode===2&&p%2===0&&q%2===0;
 const label=(c,hasPi)=>String(c)+(hasPi?'π':''),rows=[];
 for(let j=0;j<=Math.min(q,6);j++)rows.push([j,...Array.from({length:Math.min(p,6)+1},(_,i)=>label(mode===1?beta(i,j):trig(i,j),mode===2&&i%2===0&&j%2===0))]);
 const steps=mode===1?[`I(${p},${q}) = p!q!/(p+q+1)! = ${coefficient}。`,'I(p,0)=1/(p+1)。I(p,q)=q·I(p,q−1)/(p+q+1)。','また I(p,q)=I(p+1,q)+I(p,q+1)。x+(1−x)=1 を積分した関係です。','区間は0から1。被積分関数は x^p(1−x)^q。']:['区間は0からπ/2。被積分関数は sin^p θ cos^q θ。','p≥2 なら J(p,q)=(p−1)J(p−2,q)/(p+q)。q側にも同じ漸化式があります。','J(0,0)=π/2、J(1,0)=J(0,1)=1、J(1,1)=1/2。','両指数が偶数の場合だけ、有理数×π の形になります。これは円理表につながる現代的な変数変換です。'];
 return {...pack(label(coefficient,pi),mode===1?`∫₀¹ x^${p}(1−x)^${q} dx`:`∫₀^(π/2) sin^${p} θ cos^${q} θ dθ`,['q ＼ p',...Array.from({length:Math.min(p,6)+1},(_,i)=>i)],rows,[...steps,`表は p≤${Math.min(p,6)}、q≤${Math.min(q,6)} の部分。指定した指数の答えは上の結果です。`],'分数、または分数×π の厳密値'),coefficient:String(coefficient),pi,geometry:{type:'integrand',p,q,mode}};
}
const DIGITS=50,SCALE=10n**50n;
const ceil=(a,b)=>(a+b-1n)/b;
let cachedPi;
function piBounds(){if(!cachedPi){const lo=BigInt(certifiedPi('50').value.replace('.',''));cachedPi=[lo,lo+1n]}return cachedPi;}
function intervalProduct(i,q){if(q.n<0n)fail('区間計算の符号条件に反しました。');return [i[0]*q.n/q.d,ceil(i[1]*q.n,q.d)];}
function boundedSeries(m,n,cylinder){
 let t=intervalProduct([SCALE,SCALE],m.div(new Q(cylinder?8n:4n))),sum=[0n,0n];const rows=[];
 for(let k=1;k<=n;k++){
  sum=[sum[0]+t[0],sum[1]+t[1]];
  if(k<=5||k===n)rows.push([k,decimal(t[0],DIGITS),decimal(t[1],DIGITS)]);
  const ratio=m.mul(cylinder?new Q(BigInt(4*k*k-1),BigInt(4*(k+1)*(k+2))):new Q(BigInt(4*k*k-1),BigInt(4*(k+1)**2)));
  t=intervalProduct(t,ratio);
 }
 let tail=t[1]*BigInt(n+2);
 if(m.n<m.d){const geo=ceil(t[1]*m.d,m.d-m.n);if(geo<tail)tail=geo;}
 return {sum,tail,rows};
}
function boundedOutput(a,b,terms,cylinder){
 let A=positive(a,'半径・半長軸 a'),B=positive(b,'半径・半短軸 b');if(A.sub(B).n<0n)[A,B]=[B,A];
 const n=count(terms,'級数の項数',1,1000),same=A.sub(B).n===0n;
 const geometry=cylinder?{type:'cylinders',ratio:B.div(A).number()}:{type:'ellipse',ratio:B.div(A).number()};
 if(cylinder&&same){const exact=String(A.mul(A).mul(A).mul(new Q(16n,3n)));return {...pack(exact,'同じ半径の直交二円柱の共通体積',['量','厳密値'],[['半径',String(A)],['体積',exact]],['断面積は 4(r²−z²)。−r から r まで積分すると16r³/3。'],'有理数の厳密値'),exact,lower:exact,upper:exact,geometry,terms:n};}
 const m=cylinder?B.mul(B).div(A.mul(A)):new Q(1n).sub(B.mul(B).div(A.mul(A))),o=boundedSeries(m,n,cylinder);
 const factor=cylinder?B.mul(B).mul(A).mul(new Q(2n)):A.mul(new Q(2n));
 const [pl,pu]=piBounds(),fl=SCALE-o.sum[1]-o.tail,fu=SCALE-o.sum[0];if(fl<=0n)fail('下界を正にできませんでした。項数を増やしてください。');
 const lo=new Q(pl*fl,SCALE*SCALE).mul(factor),hi=new Q(pu*fu,SCALE*SCALE).mul(factor),p=24,displayScale=10n**24n;
 const lower=decimal(lo.n*displayScale/lo.d,p),upper=decimal(ceil(hi.n*displayScale,hi.d),p),exact=!cylinder&&same?String(factor)+'π':null;
 const steps=[`大きい半径・半長軸 a=${A}、小さい半径・半短軸 b=${B}。m=${m}。`,cylinder?'V=8∫₀ᵇ √(b²−z²)√(a²−z²) dz = 2πb²a(1−Σtₙ)。':'L=4a∫₀^(π/2) √(1−m sin²θ) dθ = 2πa(1−Σtₙ)。',cylinder?'t₁=m/8、tₙ₊₁/tₙ=m(4n²−1)/(4(n+1)(n+2))。':'t₁=m/4、tₙ₊₁/tₙ=m(4n²−1)/(4(n+1)²)。',`正の残差は (N+2)t_(N+1) 以下。m<1 では t_(N+1)/(1−m) と比べ小さい上限を使います。N=${n}。`,`各段を小数50桁で外向きに丸め、残差上限と確定したπの区間を掛け、結果を小数24桁で外向きに丸めました。`,`区間の幅：${rational(upper).sub(rational(lower))}。表示24桁すべてが確定桁という意味ではありません。`];
 return {...pack(exact||lower+'\n≤ '+(cylinder?'V':'L')+' ≤\n'+upper,exact?'円になった場合の厳密な周長':`${n}項 ／ ${cylinder?'直角に交わる円柱の共通体積':'楕円の周長'}の保証された区間`,['項 n','加える項の下界','加える項の上界'],o.rows,steps,exact?'πを含む厳密値':'剰余と丸め誤差を含む包含区間'),lower,upper,exact,geometry,terms:n};
}
export const ellipse=(a,b,terms)=>boundedOutput(a,b,terms,false);
export const cylinders=(a,b,terms)=>boundedOutput(a,b,terms,true);
