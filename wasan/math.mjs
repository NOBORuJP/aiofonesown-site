/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
// WASAN calculation engine. No eval, network, or mutable global state.
const fail=(message)=>{throw new Error(message)};
export const normal=s=>String(s).normalize('NFKC').replaceAll('−','-').trim();
const finite=(x,label,min=-1e12,max=1e12)=>{if(normal(x).length>1400)fail(`${label}は1400文字以内で入力してください。`);if(normal(x)==='')fail(`${label}を入力してください。`);const n=Number(normal(x));if(n===0 && /[1-9]/.test(normal(x).split(/[eE]/)[0]))fail(`${label}は浮動小数で扱うには小さすぎます。`);if(!Number.isFinite(n)||n<min||n>max)fail(`${label}は ${min} 〜 ${max} の数を入力してください。`);const q=numericQ(x);if(q.sub(numericQ(min)).n<0n||q.sub(numericQ(max)).n>0n)fail(`${label}は ${min} 〜 ${max} の数を入力してください。`);return n;};
const integer=(x,label,min,max)=>{const n=finite(x,label,min,max);if(numericQ(x).d!==1n)fail(`${label}は整数で指定してください。`);return n;};
const abs=n=>n<0n?-n:n;
export function gcd(a,b){a=abs(a);b=abs(b);while(b)[a,b]=[b,a%b];return a;}
const mod=(a,b)=>(a%b+b)%b;
export class Q{
 constructor(n,d=1n){if(d===0n)fail('分母を 0 にはできません。');if(d<0n){n=-n;d=-d;}const g=gcd(n,d);this.n=n/g;this.d=d/g;}
 add(q){return new Q(this.n*q.d+q.n*this.d,this.d*q.d)}
 sub(q){return new Q(this.n*q.d-q.n*this.d,this.d*q.d)}
 mul(q){return new Q(this.n*q.n,this.d*q.d)}
 div(q){return new Q(this.n*q.d,this.d*q.n)}
 toString(){return this.d===1n?String(this.n):`${this.n}/${this.d}`}
 number(){return approximateQ(this)}
}
export function rational(value){const s=normal(value);if(s.length>100)fail('1つの数は100文字以内で入力してください。');if(/^[+-]?\d+\/[+-]?\d+$/.test(s)){const [n,d]=s.split('/');return new Q(BigInt(n),BigInt(d));}if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))fail('整数・小数・分数（例 3/4）で入力してください。');const sign=s.startsWith('-')?-1n:1n;const [a,b='']=s.replace(/^[+-]/,'').split('.');return new Q(sign*BigInt((a||'0')+b),10n**BigInt(b.length));}
// Called after finite-number validation; retain decimal/exponent and radix input values.
function numericQ(value){
 const s=normal(value);if(/^0[xob]/i.test(s))return new Q(BigInt(s));
 const m=s.match(/^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/);
 if(!m)fail('数値を入力してください。');
 const fraction=m[3]??m[4]??'',digits=(m[2]||'0')+fraction,n=BigInt(digits)*(m[1]==='-'?-1n:1n);
 if(n===0n)return new Q(0n); // A zero mantissa needs no power, even with a huge exponent.
 const exponent=Number(m[5]||0)-fraction.length;
 if(!Number.isSafeInteger(exponent))fail('指数が大きすぎます。');
 return exponent>=0?new Q(n*10n**BigInt(exponent)):new Q(n,10n**BigInt(-exponent));
}
// Convert an exact value only for display; avoid Infinity/Infinity for large fractions.
export function approximateQ(q){
 if(q.n===0n)return 0;
 const n=abs(q.n);let exponent=n.toString(2).length-q.d.toString(2).length;
 if(exponent>=0?n<(q.d<<BigInt(exponent)):(n<<BigInt(-exponent))<q.d)exponent--;
 const shift=exponent< -1022?1074:52-exponent;
 const numerator=shift>=0?n<<BigInt(shift):n,denominator=shift>=0?q.d:q.d<<BigInt(-shift);
 let significand=numerator/denominator;const remainder=numerator%denominator;
 if(2n*remainder>denominator||2n*remainder===denominator&&significand%2n)significand++;
 const value=(q.n<0n?-1:1)*Number(significand)*2**(-shift);
 if(value===0)fail('式の計算途中の値が小さすぎて、小数で表示できません。係数や変数の尺度を変更してください。');
 if(!Number.isFinite(value))fail('式の計算結果が表示できる範囲を超えました。');
 return value;
}
const list=s=>normal(s).split(/[,、\s]+/).filter(Boolean);
const plotNumber=value=>{try{return approximateQ(value);}catch{return NaN;}};
export function contactCircles(a,b){a=finite(a,'左の円の半径',0.000001,1e6);b=finite(b,'右の円の半径',0.000001,1e6);const sa=Math.sqrt(a),sb=Math.sqrt(b),r=(sa*sb/(sa+sb))**2;const x=2*Math.sqrt(a*r),distance=2*Math.sqrt(a*b);return {a,b,r,x,distance,residual:Math.max(Math.abs(Math.hypot(x,a-r)-(a+r)),Math.abs(Math.hypot(distance-x,b-r)-(b+r)))};}
export function circlePi(rounds){rounds=integer(rounds,'辺を倍にする回数',0,15);let s=0.5,n=6;const rows=[];for(let i=0;i<=rounds;i++){const c=Math.sqrt(1-s*s),lower=n*s,upper=n*s/c;rows.push({n,lower,upper,gap:upper-lower});s=s/Math.sqrt(2*(1+c));n*=2;}let accelerated=null;if(rows.length>=3){const [a,b,c]=rows.slice(-3).map(r=>r.lower),d1=b-a,d2=c-b;if(Math.abs(d1-d2)>Number.EPSILON*Math.max(1,Math.abs(c))*8)accelerated=b+d1*d2/(d1-d2);}return {rows,...rows.at(-1),accelerated};}
export function interpolate(values,x0,h,x){const arr=list(values);if(arr.length<2||arr.length>12)fail('値は2〜12個、カンマ区切りで入力してください。');const ys=arr.map(rational),start=rational(x0),step=rational(h),target=rational(x);if(step.n===0n)fail('刻み幅 h を 0 にはできません。');const t=target.sub(start).div(step),table=[ys];while(table.at(-1).length>1){const last=table.at(-1);table.push(last.slice(1).map((v,i)=>v.sub(last[i])));}let c=new Q(1n),sum=new Q(0n);const terms=[];table.forEach((row,k)=>{if(k)c=c.mul(t.sub(new Q(BigInt(k-1)))).div(new Q(BigInt(k)));const contribution=c.mul(row[0]);sum=sum.add(contribution);terms.push({k,difference:String(row[0]),binomial:String(c),contribution:String(contribution)});});return {value:String(sum),approx:plotNumber(sum),t:String(t),table:table.map(row=>row.map(String)),terms,degree:table.findLastIndex(row=>row.some(q=>q.n!==0n)),extrapolation:t.n<0n||t.n>BigInt(ys.length-1)*t.d,points:ys.map((q,i)=>({x:plotNumber(start.add(step.mul(new Q(BigInt(i))))),y:plotNumber(q)})),target:{x:plotNumber(target),y:plotNumber(sum)}};}
function decimalScaled(n,p){const s=String(n).padStart(p+1,'0');return p?`${s.slice(0,-p)}.${s.slice(-p)}`:s;}
// Preserve exact decimal inputs and bisection endpoints; nonterminating values
// retain their exact fraction instead of implying a rounded decimal is exact.
export function exactDecimal(value){let d=value.d,twos=0,fives=0;while(d%2n===0n){d/=2n;twos++;}while(d%5n===0n){d/=5n;fives++;}if(d!==1n)return String(value);const p=Math.max(twos,fives),n=abs(value.n)*2n**BigInt(p-twos)*5n**BigInt(p-fives);return (value.n<0n?'-':'')+decimalScaled(n,p);}
export function squareRoot(value,precision){precision=integer(precision,'小数点以下の桁数',0,60);const s=normal(value);if(s.replace(/^\+/,'').length>160||!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))fail('0以上の小数を160文字以内で入力してください（指数表記は使えません）。');let [a,b='']=s.replace(/^\+/,'').split('.');a=(a||'0').replace(/^0+(?=\d)/,'');if(a.length%2)a='0'+a;const body=a+b.padEnd(2*precision,'0').slice(0,2*precision);let root=0n,rest=0n;const steps=[];for(let i=0;i<body.length;i+=2){const pair=body.slice(i,i+2),expanded=rest*100n+BigInt(pair);let digit=9n;while((20n*root+digit)*digit>expanded)digit--;const subtraction=(20n*root+digit)*digit;steps.push({pair,previous:String(root),expanded:String(expanded),digit:String(digit),subtraction:String(subtraction),remainder:String(expanded-subtraction)});root=root*10n+digit;rest=expanded-subtraction;}const numerator=BigInt(a+b),denominator=10n**BigInt(b.length);const exact=root*root*denominator===numerator*10n**BigInt(precision*2);return {value:decimalScaled(root,precision),upper:decimalScaled(root+1n,precision),scaled:String(root),exact,precision,steps};}
export function polynomialRoot(coefficients,lower,upper,tolerance=1e-10){
 if(normal(coefficients).length>1400)fail('係数は全体で1400文字以内で入力してください。');
 const tokens=list(coefficients);if(tokens.length<2||tokens.length>9)fail('係数を2〜9個、最高次から入力してください（1〜8次）。');
 tokens.forEach((v,i)=>finite(v,`係数 ${i+1}`,-1e6,1e6));
 const c=tokens.map(numericQ);while(c.length&&c[0].n===0n)c.shift();
 if(c.length<2)fail('0でない最高次係数を持つ1次以上の式を入力してください。');
 const startLo=finite(lower,'区間の左端',-1e6,1e6),startHi=finite(upper,'区間の右端',-1e6,1e6);
 if(startLo>=startHi)fail('左端は右端より小さくしてください。');
 const tol=finite(tolerance,'区間の許容幅',1e-12,1),toleranceQ=numericQ(tolerance),two=new Q(2n);
 let lo=numericQ(lower),hi=numericQ(upper);
 const evaluate=x=>c.reduce((s,a)=>s.mul(x).add(a),new Q(0n));
 const rows=[],pack=(root,reason)=>({rootText:exactDecimal(root),lowerText:exactDecimal(lo),upperText:exactDecimal(hi),widthText:exactDecimal(hi.sub(lo)),coefficientText:c.map(exactDecimal),root:approximateQ(root),lower:approximateQ(lo),upper:approximateQ(hi),residual:approximateQ(evaluate(root)),rows,coefficients:c.map(approximateQ),reason,startLo,startHi,tolerance:tol,points:Array.from({length:81},(_,i)=>{
  const x=numericQ(lower).add(numericQ(upper).sub(numericQ(lower)).mul(new Q(BigInt(i),80n)));return {x:approximateQ(x),y:approximateQ(evaluate(x))};
 })});
 let fl=evaluate(lo),fh=evaluate(hi);approximateQ(fl);approximateQ(fh);
 if(fl.n===0n){hi=lo;return pack(lo,'endpoint');}if(fh.n===0n){lo=hi;return pack(hi,'endpoint');}
 if((fl.n<0n)===(fh.n<0n))fail('両端の符号が同じです。符号が変わる区間に変更してください。重根などはこの方法では検出できない場合があります。');
 for(let i=0;i<100;i++){
  const mid=lo.add(hi).div(two),midNumber=approximateQ(mid);
  if(midNumber===approximateQ(lo)||midNumber===approximateQ(hi))return pack(mid,'precision');
  const fm=evaluate(mid),value=approximateQ(fm);
  rows.push({iteration:i+1,lowerText:exactDecimal(lo),upperText:exactDecimal(hi),midText:exactDecimal(mid),lower:approximateQ(lo),upper:approximateQ(hi),mid:approximateQ(mid),value});
  if(fm.n===0n){lo=hi=mid;return pack(mid,'exact-zero');}
  if((fl.n<0n)!==(fm.n<0n)){hi=mid;fh=fm;}else{lo=mid;fl=fm;}
  if(hi.sub(lo).sub(toleranceQ).n<=0n)return pack(lo.add(hi).div(two),'width');
 }
 return pack(lo.add(hi).div(two),'limit');
}
const bigInteger=(value,label)=>{const s=normal(value);if(!/^[+-]?\d{1,80}$/.test(s))fail(`${label}は80桁以内の整数で入力してください。`);return BigInt(s);};
function egcd(a,b){let old=1n,cur=0n;while(b){const q=a/b;[a,b]=[b,a-q*b];[old,cur]=[cur,old-q*cur];}return old;}
export function remainders(input){const lines=normal(input).split(/\n|;/).filter(s=>s.trim());if(!lines.length||lines.length>10)fail('条件は1〜10行で入力してください。');let x=0n,M=1n;const rows=[];for(const [i,line] of lines.entries()){const parts=list(line);if(parts.length!==2)fail(`${i+1}行目は「割る数, 余り」の2つを入力してください。`);const n=bigInteger(parts[0],'割る数');if(n<2n)fail('割る数は2以上にしてください。');const r=mod(bigInteger(parts[1],'余り'),n),g=gcd(M,n),d=r-x;if(d%g!==0n)fail(`${i+1}行目の条件が、それまでの条件と矛盾しています。共通する整数解はありません。`);const nn=n/g,mm=M/g;const t=mod((d/g)*egcd(mm,nn),nn);x=mod(x+M*t,M*nn);M*=nn;rows.push({modulus:String(n),remainder:String(r),solution:String(x),period:String(M),gcd:String(g)});}return {value:String(x),period:String(M),rows};}
export function powerSum(value,power){const n=bigInteger(value,'項数 n');if(n<0n)fail('n は0以上の整数で指定してください。');const p=integer(power,'累乗 p',0,12);const samples=[0n];for(let i=1;i<=p+1;i++)samples.push(samples.at(-1)+BigInt(i)**BigInt(p));const table=[samples];while(table.at(-1).length>1){const a=table.at(-1);table.push(a.slice(1).map((v,i)=>v-a[i]));}let choose=1n,sum=0n;const terms=[];for(let k=0;k<table.length;k++){if(k)choose=choose*(n-BigInt(k-1))/BigInt(k);const d=table[k][0],term=choose*d;sum+=term;terms.push({k,difference:String(d),binomial:String(choose),contribution:String(term)});}return {value:String(sum),n:String(n),power:p,terms,table:table.map(row=>row.map(String))};}
