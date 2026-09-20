/* AI NOBORU — https://www.aiofonesown.com/
 * 整数論・数え上げ・現代数列の計算。
 * 史料上の和算と現代的再構成は catalog 側で明示して分離する。
 */
import {normal} from './math.mjs';

const fail=s=>{throw new Error(s)};
const natural=(s,label,maxDigits=80)=>{
  s=normal(String(s));
  if(!new RegExp('^\\+?\\d{1,'+maxDigits+'}$').test(s))fail(`${label}は${maxDigits}桁以内の0以上の整数で入力してください。`);
  return BigInt(s);
};
const positive=(s,label,maxDigits=80)=>{const n=natural(s,label,maxDigits);if(n<1n)fail(`${label}は1以上の整数で入力してください。`);return n;};
const boundedInt=(s,label,min,max)=>{const n=natural(s,label,12);if(n<BigInt(min)||n>BigInt(max))fail(`${label}は${min}〜${max}の整数で入力してください。`);return Number(n);};
const pack=(value,detail,heads,rows,steps,meta='整数を厳密計算')=>({value:String(value),detail,heads,rows,steps,meta});
const pow=(a,b)=>a**BigInt(b);
const superscript=n=>String(n).replace(/[0-9-]/g,c=>({'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'}[c]));
const factorialBig=n=>{let v=1n;for(let i=2n;i<=n;i++)v*=i;return v;};
const chooseBig=(n,r)=>{if(r<0n||r>n)return 0n;r=r>n-r?n-r:r;let v=1n;for(let i=1n;i<=r;i++)v=v*(n-r+i)/i;return v;};

function sumPower(n,p){
  switch(p){
    case 1:return n*(n+1n)/2n;
    case 2:return n*(n+1n)*(2n*n+1n)/6n;
    case 3:{const t=n*(n+1n)/2n;return t*t;}
    case 4:return n*(n+1n)*(2n*n+1n)*(3n*n*n+3n*n-1n)/30n;
    case 5:return n*n*(n+1n)*(n+1n)*(2n*n*n+2n*n-1n)/12n;
    default:fail('垜積の次数は1〜5から選んでください。');
  }
}
const dasekiNames={1:'圭垜積（1+2+…+n）',2:'平方垜積（1²+2²+…+n²）',3:'立方垜積（1³+2³+…+n³）',4:'三乗方垜積（1⁴+2⁴+…+n⁴）',5:'四乗方垜積（1⁵+2⁵+…+n⁵）'};
export function daseki(nText,pText){
  const n=natural(nText,'底子 n',80),p=boundedInt(pText,'次数',1,5),value=sumPower(n,p);
  const sample=[];
  if(n<=10n){for(let k=1n;k<=n;k++)sample.push(k);}else sample.push(1n,2n,3n,n-2n,n-1n,n);
  const seen=new Set(),rows=[];for(const k of sample){if(k<1n||seen.has(String(k)))continue;seen.add(String(k));rows.push([String(k),String(pow(k,p)),String(sumPower(k,p))]);}
  return {...pack(value,`${dasekiNames[p]} / 底子 n = ${n}`,['段 k',`その段 k${superscript(p)}`,'1段目からの垜積'],rows,[`各段の数を k${superscript(p)} として、k=1 から n までを積み重ねます。`,`底子 n = ${n}、次数 p = ${p}。`,`公式で得た厳密値は ${value}。`]),n:String(n),power:p};
}

export function polygonalNumber(kText,nText){
  const k=boundedInt(kText,'多角数の種類 k',3,30),n=natural(nText,'項番号 n',60);
  const K=BigInt(k),value=((K-2n)*n*n-(K-4n)*n)/2n;
  const names={3:'三角数',4:'四角数',5:'五角数',6:'六角数',7:'七角数',8:'八角数'};
  const name=names[k]||`${k}角数`;
  const indices=[];if(n<=10n){for(let i=0n;i<=n;i++)indices.push(i);}else indices.push(1n,2n,3n,n-2n,n-1n,n);
  const rows=[];const seen=new Set();for(const m of indices){if(m<0n||seen.has(String(m)))continue;seen.add(String(m));const v=((K-2n)*m*m-(K-4n)*m)/2n;rows.push([String(m),String(v)]);}
  return {...pack(value,`${name} P${k}(${n})`,['項番号 n',name],rows,[`一般の k 角数を P_k(n)=((k−2)n²−(k−4)n)/2 で計算します。`,`k=${k}, n=${n} を代入すると ${value}。`]),order:k,n:String(n)};
}

export function combinatorics(nText,rText){
  const n=boundedInt(nText,'n',0,500),r=boundedInt(rText,'r',0,500);if(r>n)fail('r は n 以下にしてください。');
  const N=BigInt(n),R=BigInt(r),fac=factorialBig(N),perm=factorialBig(N)/factorialBig(N-R),comb=chooseBig(N,R);
  const rows=[['階乗',`${n}!`,String(fac)],['順列',`${n}P${r}`,String(perm)],['組合せ',`${n}C${r}`,String(comb)]];
  return {...pack(`${n}! = ${fac}\n${n}P${r} = ${perm}\n${n}C${r} = ${comb}`,`n=${n}, r=${r}`,['種類','記号','厳密値'],rows,[`n! は 1 から n までを掛け合わせます。`,`nPr = n!/(n−r)!。`,`nCr = n!/(r!(n−r)!)。`,`整数の割り切れる順序で計算し、丸めを使いません。`]),factorial:String(fac),permutation:String(perm),combination:String(comb),n,r};
}

function factorBig(n){
  const out=[];let m=n;
  const take=p=>{let e=0;while(m%p===0n){m/=p;e++;}if(e)out.push([p,e]);};
  take(2n);take(3n);
  for(let p=5n,step=2n;p*p<=m;p+=step,step=6n-step)take(p);
  if(m>1n)out.push([m,1]);
  return out;
}
function primesUpTo(limit){
  const mark=new Uint8Array(limit+1),pr=[];for(let i=2;i<=limit;i++){if(mark[i])continue;pr.push(i);if(i*i<=limit)for(let j=i*i;j<=limit;j+=i)mark[j]=1;}return pr;
}
const factorText=f=>f.map(([p,e])=>String(p)+(e===1?'':superscript(e))).join(' × ');
export function factorAndPrimes(nText,limitText){
  const n=natural(nText,'調べる整数 N',13);if(n<2n)fail('調べる整数 N は2以上の整数で入力してください。');if(n>1000000000000n)fail('調べる整数 N は 1兆以下にしてください。');
  const limit=boundedInt(limitText,'素数列の上限',2,5000),f=factorBig(n),primes=primesUpTo(limit),prime=f.length===1&&f[0][0]===n&&f[0][1]===1;
  const value=factorText(f),rows=f.map(([p,e])=>[String(p),String(e),String(p**BigInt(e))]);
  const chunks=[];for(let i=0;i<primes.length;i+=25)chunks.push(primes.slice(i,i+25).join(', '));
  return {...pack(value,prime?`${n} は素数です。`: `${n} の素因数分解`,['素因数 p','指数','p^指数'],rows,[`2、3、その後は 6m±1 の候補で割り、残りが1になるまで因数を取り出します。`,`素数列（${limit}以下、${primes.length}個）：${chunks.join(' / ')}`]),factors:f.map(([p,e])=>[String(p),e]),primes,prime};
}

export function primeCounting(nText){
  const n=boundedInt(nText,'N',0,5000000);if(n<2)return {...pack('0',`${n} 以下に素数はありません。`,['上限','素数の個数'],[[String(n),'0']],[`1以下は素数ではありません。`]),count:0,primes:[]};
  const mark=new Uint8Array(n+1),primes=[];for(let i=2;i<=n;i++){if(mark[i])continue;primes.push(i);if(i*i<=n)for(let j=i*i;j<=n;j+=i)mark[j]=1;}
  const checks=[10,100,1000,10000,100000,1000000,n].filter((v,i,a)=>v<=n&&a.indexOf(v)===i);
  const countLE=x=>{let lo=0,hi=primes.length;while(lo<hi){const m=(lo+hi)>>1;if(primes[m]<=x)lo=m+1;else hi=m;}return lo;};
  const rows=checks.map(x=>[String(x),String(countLE(x))]);
  const tail=primes.length<=20?primes:primes.slice(0,10).concat(['…'],primes.slice(-10));
  return {...pack(primes.length,`π(${n}) = ${primes.length}`,['上限 N','π(N)'],rows,[`エラトステネスの篩で 2 から ${n} までを調べました。`,`素数の例：${tail.join(', ')}`]),count:primes.length,primes};
}

export function kurushimaTotient(nText){
  const n=positive(nText,'N',13);if(n>1000000000000n)fail('N は 1兆以下にしてください。');
  if(n===1n)return {...pack('1','φ(1)=1 と定めます。',['N','φ(N)'],[['1','1']],[`1 と互いに素な 1〜1 の正整数は 1 だけです。`]),factors:[],phi:'1'};
  const f=factorBig(n);let phi=n;const rows=[];for(const [p,e] of f){const before=phi;phi=phi/p*(p-1n);rows.push([String(p),String(e),`${before} × (${p}−1) ÷ ${p} = ${phi}`]);}
  return {...pack(phi,`${n} 以下で ${n} と互いに素な正の整数の個数`,['素因数 p','指数','φへの反映'],rows,[`N=${n}=${factorText(f)}。`,`異なる素因数 p ごとに N × (1−1/p) を掛けます。`,`φ(${n})=${phi}。`]),factors:f.map(([p,e])=>[String(p),e]),phi:String(phi)};
}

function bellList(n){
  const B=Array(n+1).fill(0n);B[0]=1n;
  for(let m=0;m<n;m++){let s=0n;for(let k=0;k<=m;k++)s+=chooseBig(BigInt(m),BigInt(k))*B[k];B[m+1]=s;}
  return B;
}
export function bellNumber(nText){
  const n=boundedInt(nText,'n',0,30),B=bellList(n),value=B[n];
  const rows=B.map((v,i)=>[String(i),String(v)]);
  return {...pack(value,`ベル数 B${n}`,['n','Bₙ'],rows,[`B₀=1。`,`Bₙ₊₁=Σ C(n,k)Bₖ を用いて0から順に計算します。`,n===5?'B₅=52。5種類の香を同じ香りごとの組に分ける52通りと対応します。':`B${n}=${value}。`]),bell:B.map(String)};
}

function stirlingSecondRows(n){const a=Array.from({length:n+1},()=>Array(n+1).fill(0n));a[0][0]=1n;for(let i=1;i<=n;i++)for(let k=1;k<=i;k++)a[i][k]=a[i-1][k-1]+BigInt(k)*a[i-1][k];return a;}
function stirlingFirstRows(n){const a=Array.from({length:n+1},()=>Array(n+1).fill(0n));a[0][0]=1n;for(let i=1;i<=n;i++)for(let k=1;k<=i;k++)a[i][k]=a[i-1][k-1]+BigInt(i-1)*a[i-1][k];return a;}
export function stirlingNumber(nText,kText,kindText){
  const n=boundedInt(nText,'n',0,25),k=boundedInt(kText,'k',0,25);if(k>n)fail('k は n 以下にしてください。');
  const kindTextNormalized=String(kindText);if(kindTextNormalized!=='第二種'&&kindTextNormalized!=='第一種（符号なし）')fail('種類は「第二種」または「第一種（符号なし）」を選んでください。');
  const first=kindTextNormalized==='第一種（符号なし）',a=first?stirlingFirstRows(n):stirlingSecondRows(n),value=a[n][k],rows=[];for(let j=0;j<=n;j++)rows.push([String(j),String(a[n][j])]);
  const kind=first?'第一種スターリング数（符号なし）':'第二種スターリング数';
  const recurrence=first?'c(n,k)=c(n−1,k−1)+(n−1)c(n−1,k)':'S(n,k)=S(n−1,k−1)+kS(n−1,k)';
  return {...pack(value,`${kind}：n=${n}, k=${k}`,['k',first?'c(n,k)':'S(n,k)'],rows,[`初期値は (0,0)=1、それ以外の範囲外を0とします。`,recurrence,`${kind} = ${value}。`]),kind:first?'第一種（符号なし）':'第二種',triangle:a.map(row=>row.map(String))};
}

const positiveDecimal=(s,label)=>{s=normal(String(s));if(!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)||s.length>110)fail(`${label}は正の十進数で入力してください。`);const v=Number(s);if(!(v>0)||!Number.isFinite(v)||v<1e-100||v>1e100)fail(`${label}は 10^-100 〜 10^100 の範囲で入力してください。`);return v;};
const fixed=(x,d)=>Number(x).toFixed(d);
export function logarithmTable(aText,bText,dText){
  const a=positiveDecimal(aText,'a'),b=positiveDecimal(bText,'b'),digits=boundedInt(dText,'対数の小数桁',4,12);
  const la=Math.log10(a),lb=Math.log10(b),rla=Number(la.toFixed(digits)),rlb=Number(lb.toFixed(digits)),sum=rla+rlb,approx=10**sum,direct=a*b,relative=direct===0?0:Math.abs(approx-direct)/direct;
  const rows=[['a',String(a),fixed(la,digits),fixed(rla,digits)],['b',String(b),fixed(lb,digits),fixed(rlb,digits)],['積','a×b',fixed(Math.log10(direct),digits),String(approx)]];
  return {...pack(approx,`対数を小数${digits}桁へ丸めて復元 / 直接の積 ${direct}`,['対象','値','log₁₀（現代計算）','表の丸め値 / 復元値'],rows,[`log₁₀(a)≈${fixed(rla,digits)}、log₁₀(b)≈${fixed(rlb,digits)}。`,`足すと ${fixed(sum,digits)}。`,`10 の ${fixed(sum,digits)} 乗を取ると ${approx}。`,`直接計算 a×b=${direct}。相対差は ${relative.toExponential(3)}。`],'対数表を模した近似計算'),a,b,digits,approx,direct,relative,logA:la,logB:lb};
}

export function takebeTrigTable(degreeText,dText){
  const degree=boundedInt(degreeText,'角度',0,90),digits=boundedInt(dText,'表示桁数',6,13);
  const calc=d=>{const rad=d*Math.PI/180;return {degree:d,arc:rad/2,halfChord:Math.sin(rad)/2,sagitta:(1-Math.cos(rad))/2};};
  const o=calc(degree),from=Math.max(0,degree-2),to=Math.min(90,degree+2),rows=[];for(let d=from;d<=to;d++){const q=calc(d);rows.push([`${d}°`,q.arc.toFixed(digits),q.halfChord.toFixed(digits),q.sagitta.toFixed(digits)]);}
  return {...pack(o.halfChord.toFixed(digits),`直径1の円：${degree}°の半弦（現代の三角関数で再計算）`,['角度','弧長','半弦 = 1/2 sinθ','矢 = 1/2(1−cosθ)'],rows,[`直径1なので半径は1/2。`,`弧長 = (1/2)×θ(rad) = ${o.arc}。`,`半弦 = (1/2)sinθ = ${o.halfChord}。`,`矢 = (1/2)(1−cosθ) = ${o.sagitta}。`],'現代の浮動小数による再計算'),...o,digits};
}

export function chikusakuEnumerate(nText,rText){
  const n=boundedInt(nText,'品物の数 n',1,10),r=boundedInt(rText,'選ぶ数 r',0,10);if(r>n)fail('r は n 以下にしてください。');
  const combos=[];const cur=[];const visit=(start,left)=>{if(left===0){combos.push([...cur]);return;}for(let x=start;x<=n-left+1;x++){cur.push(x);visit(x+1,left-1);cur.pop();}};visit(1,r);
  const formula=chooseBig(BigInt(n),BigInt(r));if(BigInt(combos.length)!==formula)fail('列挙数と組合せ公式が一致しません。');
  const shown=combos.length<=80?combos:[...combos.slice(0,70),null,...combos.slice(-9)],rows=shown.map((c,i)=>c?[String(i<70||combos.length<=80?i+1:combos.length-9+(i-71)+1),`{${c.join(', ')}}`]:['…',`${combos.length-79}通りを表示省略`]);
  return {...pack(combos.length,`${n}個から${r}個を選ぶ全組合せを列挙`,['番号','選び方'],rows,[`1から${n}までの候補から、重複なく昇順に${r}個を選ぶ枝をすべて辿ります。`,`実際に列挙した数は ${combos.length}。`,`公式 nCr=${formula} と一致します。`],'全候補を列挙して厳密に確認'),combinations:combos,formula:String(formula)};
}

function sayOnce(s){let out='';for(let i=0;i<s.length;){let j=i+1;while(j<s.length&&s[j]===s[i])j++;out+=(j-i)+s[i];i=j;}return out;}
export function lookAndSay(seedText,stepsText){
  const seed=normal(String(seedText)),steps=boundedInt(stepsText,'繰り返す回数',0,20);if(!/^\d{1,40}$/.test(seed))fail('初期列は数字だけを1〜40文字で入力してください。');
  const sequence=[seed];for(let i=0;i<steps;i++){const next=sayOnce(sequence.at(-1));if(next.length>10000)fail('数列が10,000文字を超えるため、回数を減らしてください。');sequence.push(next);}
  const rows=sequence.map((s,i)=>[String(i),s.length>180?s.slice(0,85)+' … '+s.slice(-85):s,String(s.length)]);
  return {...pack(sequence.at(-1),`${steps}回後 / 文字数 ${sequence.at(-1).length}`,['回','列','文字数'],rows,[`同じ数字が何個続くかを左から読み、「個数＋数字」に置き換えます。`,`初期列 ${seed} から ${steps} 回変換しました。`,`この数列は歴史的和算ではありません。`],'現代の数列・文字列変換'),sequence};
}

export function collatzOrbit(startText,maxText){
  let n=positive(startText,'初期値 n',100),max=n;const maxSteps=boundedInt(maxText,'最大ステップ数',1,5000),sequence=[n];let steps=0;
  while(n!==1n&&steps<maxSteps){n=n%2n===0n?n/2n:3n*n+1n;sequence.push(n);if(n>max)max=n;steps++;}
  const reached=n===1n,display=sequence.length<=140?sequence:[...sequence.slice(0,100),null,...sequence.slice(-39)],rows=[];for(let i=0;i<display.length;i++){const v=display[i];if(v===null){rows.push(['…',`${sequence.length-139}項を表示省略`,'']);continue;}const originalIndex=sequence.length<=140?i:(i<100?i:sequence.length-39+(i-101));rows.push([String(originalIndex),String(v),v===1n?'到達':v%2n===0n?'偶数':'奇数']);}
  const value=reached?`${steps} ステップ`:`${maxSteps} ステップでは1に未到達`;
  const detail=reached?`初期値 ${startText} → 1 / 最大値 ${max}`:`有限回の未到達は反例を意味しません。最後の値 ${n} / 最大値 ${max}`;
  return {...pack(value,detail,['ステップ','値','状態'],rows,[`偶数なら2で割り、奇数なら3倍して1を足します。`,reached?`${steps}ステップで1へ到達しました。`:`${maxSteps}ステップで計算を打ち切りました。一般の予想を否定する結果ではありません。`,`この問題は歴史的和算ではなく、現代の未解決問題です。`],'有限軌道をBigIntで厳密計算'),reached,stepsCount:steps,maxValue:String(max),lastValue:String(n),sequence:sequence.map(String)};
}

export const heritageEngines={
 daseki:p=>daseki(p.n,p.power),
 polygonal:p=>polygonalNumber(p.order,p.n),
 combinatorics:p=>combinatorics(p.n,p.r),
 jiyaku:p=>factorAndPrimes(p.n,p.limit),
 primecount:p=>primeCounting(p.n),
 totient:p=>kurushimaTotient(p.n),
 bell:p=>bellNumber(p.n),
 stirling:p=>stirlingNumber(p.n,p.k,p.kind),
 logarithm:p=>logarithmTable(p.a,p.b,p.digits),
 takebetrig:p=>takebeTrigTable(p.degree,p.digits),
 chikusaku:p=>chikusakuEnumerate(p.n,p.r),
 looksay:p=>lookAndSay(p.seed,p.steps),
 collatz:p=>collatzOrbit(p.start,p.maxSteps)
};
