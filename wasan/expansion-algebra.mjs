/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {pack,count,decimal} from './advanced-common.mjs';
import {approximateQ} from './math.mjs';
import {q,Q,rational,scalar,normal,fail,coefficients,trim,isZero,neg,add,multiply,evaluate,derivative,divide,polynomialGcd,textPolynomial,determinant,power} from './expansion-common.mjs';
export function linearSystem(input){
 const raw=normal(input);if(!raw||raw.length>1400)fail('連立方程式は1400文字以内で入力してください。');
 const lines=raw.split('\n');if(lines.length<2||lines.length>6)fail('式は2〜6行にしてください。');
 const a=lines.map(r=>r.trim().split(/[,、\s]+/).map(x=>scalar(x,'係数・右辺'))),n=a[0].length-1;
 if(n<2||n>6||a.some(r=>r.length!==n+1))fail('各行は2〜6個の未知数の係数と右辺。すべて同じ個数にしてください。');
 const original=a.map(r=>[...r]),pivots=[],steps=[];let row=0;
 for(let col=0;col<n&&row<a.length;col++){
  const pivot=a.findIndex((r,i)=>i>=row&&r[col].n);if(pivot<0)continue;
  if(pivot!==row){[a[row],a[pivot]]=[a[pivot],a[row]];steps.push(`${row+1}行と${pivot+1}行を交換。`);}
  const v=a[row][col];a[row]=a[row].map(x=>x.div(v));
  for(let i=0;i<a.length;i++)if(i!==row){const t=a[i][col];a[i]=a[i].map((x,j)=>x.sub(t.mul(a[row][j])));}
  pivots.push(col);steps.push(`x${col+1} の係数を1にし、他の行から消去。`);row++;
 }
 const no=a.some(r=>r.slice(0,n).every(x=>!x.n)&&r[n].n),free=Array.from({length:n},(_,i)=>i).filter(i=>!pivots.includes(i));
 const particular=Array.from({length:n},()=>q(0));pivots.forEach((c,i)=>particular[c]=a[i][n]);
 const basis=free.map(c=>{const b=Array.from({length:n},()=>q(0));b[c]=q(1);pivots.forEach((j,i)=>b[j]=neg(a[i][c]));return b});
 if(!no){for(const r of original){if(r.slice(0,n).reduce((s,x,i)=>s.add(x.mul(particular[i])),q(0)).sub(r[n]).n)fail('解の再代入に失敗しました。');for(const b of basis)if(r.slice(0,n).reduce((s,x,i)=>s.add(x.mul(b[i])),q(0)).n)fail('自由変数の検算に失敗しました。');}}
 const status=no?'none':free.length?'infinite':'unique',value=no?'解はありません':free.length?'自由変数 '+free.length+'個':particular.map((v,i)=>`x${i+1} = ${v}`).join('\n');
 if(!no){steps.push(`特解：(${particular.join(', ')})。`);basis.forEach((b,i)=>steps.push(`任意の実数 t${i+1} × (${b.join(', ')}) を足せます。`));steps.push('特解を元の式へ代入し、自由変数の各方向で右辺が0になることも厳密照合。');}
 return {...pack(value,`係数行列の階数 ${pivots.length} ／ 未知数 ${n}個`,[...Array.from({length:n},(_,i)=>'x'+(i+1)),'右辺'],a.map(r=>r.map(String)),steps,'分数による消去と再代入'),status,solution:status==='unique'?particular.map(String):null,particular:no?null:particular.map(String),basis:no?[]:basis.map(b=>b.map(String)),verified:!no};
}
export function commonFactor(f,g){
 const a=coefficients(f),b=coefficients(g),rows=[];if(isZero(a)&&isZero(b))fail('少なくとも一方は零多項式以外にしてください。');
 const h=polynomialGcd(a,b,rows),fa=divide(a,h),fb=divide(b,h);if(!isZero(fa.remainder)||!isZero(fb.remainder))fail('共通因子の検算に失敗しました。');
 return {...pack(textPolynomial(h),`共通因子の次数 ${h.length-1}。最高次係数を1にそろえています。`,['前の式（整数化）','次の式（整数化）','定数倍を除いた余式'],rows,[`f = (${textPolynomial(h)}) × (${textPolynomial(fa.quotient)})。`,`g = (${textPolynomial(h)}) × (${textPolynomial(fb.quotient)})。`,'分母を払って整数化し、擬除法と係数の共通因子の除去で次数を下げます。大きな余式は表では概要を表示します。','両方の式を共通因子で割り、余りが0であることを厳密に検算。','共通因子が1なら、複素数まで含めて共通根はありません。'],'有理数係数の最大公約因子'),coefficients:[...h].reverse().map(String),verified:true};
}
export function discriminant(input){
 const f=coefficients(input,8),n=f.length-1;if(n<1)fail('1〜8次の多項式にしてください。');const g=derivative(f),m=g.length-1,F=[...f].reverse(),G=[...g].reverse(),matrix=[];
 for(const [p,k] of [[F,m],[G,n]])for(let i=0;i<k;i++)matrix.push(Array.from({length:n+m},(_,j)=>j>=i&&j<i+p.length?p[j-i]:q(0)));
 const resultant=determinant(matrix),d=resultant.div(f.at(-1)).mul(q((n*(n-1)/2)%2?-1:1)),h=polynomialGcd(f,g);
 return {...pack(d,d.n===0n?'重根があります（複素数の重根も含む）。':'重根はありません（複素数も含む）。',['量','厳密値'],[['次数',n],['Res(f,f′)',String(resultant)],['gcd(f,f′)',textPolynomial(h)]],[`f(x) = ${textPolynomial(f)}。`,`f′(x) = ${textPolynomial(g)}。`,`${n+m}行のシルベスター行列式から終結式を計算。`,`D = (−1)^(n(n−1)/2) Res(f,f′) / aₙ = ${d}。`,'D=0 と gcd(f,f′) の次数が正であることを別々に確かめます。','判別式の符号だけでは、一般の高次方程式の実根数は決まりません。'],'判別式と共通因子を厳密計算'),discriminant:String(d),repeated:!d.n,gcd:[...h].reverse().map(String)};
}
export function rootPowers(input,order){
 const f=coefficients(input),n=f.length-1,k=count(order,'最後の累乗',1,30);if(n<1)fail('1〜12次の式にしてください。');const a=[...f].reverse().map(x=>x.div(f.at(-1))),s=[q(n)];
 for(let j=1;j<=k;j++){let t=q(0);for(let i=1;i<=Math.min(j-1,n);i++)t=t.add(a[i].mul(s[j-i]));if(j<=n)t=t.add(a[j].mul(q(j)));s[j]=neg(t);}
 return {...pack(s[k],`重複を含む${n}個の根の${k}乗和`,['累乗 k','根の累乗和 Sₖ'],s.map((x,i)=>[i,String(x)]),[`f(x) = ${textPolynomial(f)}。`,'最高次係数で割って xⁿ+a₁xⁿ⁻¹+…+aₙ にそろえます。','k≤n：Sₖ+a₁Sₖ₋₁+…+aₖ₋₁S₁+k aₖ=0。','k>n：Sₖ+a₁Sₖ₋₁+…+aₙSₖ₋ₙ=0。','根を個別に求めず、複素根と重複も含めて計算します。S₀=n。'],'係数から有理数で厳密計算'),sums:s.map(String)};
}
function integerRoot(N,k){
 if(N<2n)return N;let lo=0n,hi=1n<<BigInt(Math.ceil(N.toString(2).length/k));
 while(hi-lo>1n){const mid=(hi+lo)/2n;if(mid**BigInt(k)<=N)lo=mid;else hi=mid;}return hi**BigInt(k)<=N?hi:lo;
}
export function nthRoot(value,degree,precision){
 const raw=normal(value);if(raw.length>80)fail('開く数は80文字以内にしてください。');
 // Unlike geometry lengths this input may be arbitrarily large within its digit limit.
 const v=rational(raw),k=count(degree,'開く次数',2,20),p=count(precision,'小数桁',0,40),negative=v.n<0n;
 if(negative&&k%2===0)fail('負の数の偶数乗根は実数ではありません。');
 const mag=negative?neg(v):v,scale=10n**BigInt(p),t=integerRoot(mag.n*scale**BigInt(k)/mag.d,k),exact=t**BigInt(k)*mag.d===mag.n*scale**BigInt(k);
 const lower=negative?-(exact?t:t+1n):t,upper=exact?lower:lower+1n,L=decimal(lower,p),U=decimal(upper,p);
 return {...pack(exact?L:`${L}\n≤ ${k}乗根 <\n${U}`,exact?'指定した小数で厳密に一致。':'隣り合う小数で囲んだ厳密区間。',['量','値'],[['下端',L],['上端',U],['次数',k]],[`対象：${v} の実数の${k}乗根。`,'整数の累乗比較で、小数点を除いた整数を二分探索します。','下端を k 乗した値と元の分数を、整数の交差積で比較。','負の奇数乗根は符号を反転すると上下が入れ替わることも反映しています。'],'整数比較による厳密区間'),lower:L,upper:U,exact};
}
export function translatePolynomial(input,shift){
 const f=coefficients(input),h=scalar(shift,'移す量 h');let p=[q(0)];for(const a of [...f].reverse())p=add(multiply(p,[h,q(1)]),[a]);
 // Undo the shift and compare all coefficients, not just sampled values.
 let back=[q(0)];for(const a of [...p].reverse())back=add(multiply(back,[neg(h),q(1)]),[a]);if(back.length!==f.length||back.some((x,i)=>x.sub(f[i]).n))fail('逆向きの転位の検算に失敗しました。');
 return {...pack(textPolynomial(p,'u'),`x = u + (${h}) と置いた式`,['u の次数','係数'],[...p].reverse().map((v,i)=>[p.length-1-i,String(v)]),[`元の式：${textPolynomial(f)}。`,'最高次の係数から順に (u+h) を掛け、次の係数を加えます。','u=x−h を代入し直し、元の多項式とすべての係数が一致することを検算。','係数0の項も表に残します。次数や定数項の位置を確かめられます。'],'係数を厳密に転位'),coefficients:[...p].reverse().map(String),verified:true};
}
export function divideSeries(numerator,denominator,order){
 const a=coefficients(numerator,12,true),b=coefficients(denominator,12,true),n=count(order,'打ち切る次数',0,30);if(!b[0].n)fail('分母の定数項は0以外にしてください。');const c=[];
 for(let k=0;k<=n;k++){let s=a[k]||q(0);for(let j=1;j<=Math.min(k,b.length-1);j++)s=s.sub(b[j].mul(c[k-j]));c[k]=s.div(b[0]);}
 const product=multiply(b,c);for(let k=0;k<=n;k++)if((product[k]||q(0)).sub(a[k]||q(0)).n)fail('級数を掛け戻す検算に失敗しました。');
 return {...pack(textPolynomial(c),`x^${n}まで。これより高い次数の項は省略。`,['次数 k','商の係数 cₖ'],c.map((v,i)=>[i,String(v)]),`分子 A(x)=${textPolynomial(a)}。|分母 B(x)=${textPolynomial(b)}。|cₖ=(aₖ−Σⱼ₌₁ᵏ bⱼcₖ₋ⱼ)/b₀。|B(x)を掛け戻し、指定次数までA(x)と全係数が一致することを厳密照合。|形式的な級数です。具体的な x で無限級数が収束するかは、別の条件です。`.split('|'),'打ち切り次数まで厳密な形式的級数'),coefficients:c.map(String),verified:true};
}
export function revolution(input,lower,upper){
 const f=coefficients(input,12),a=scalar(lower,'左端'),b=scalar(upper,'右端');if(a.sub(b).n>=0n)fail('左端は右端より小さくしてください。');const square=multiply(f,f),terms=square.map((c,i)=>c.mul(power(b,i+1).sub(power(a,i+1))).div(q(i+1))),v=terms.reduce((s,c)=>s.add(c),q(0));
 return {...pack(v.n?String(v)+'π':'0',`区間 [${a}, ${b}] を x 軸のまわりに回した体積`,['次数 k','P(x)² の係数','積分への寄与（πを除く）'],square.map((c,i)=>[i,String(c),String(terms[i])]),[`P(x) = ${textPolynomial(f)}。`,'断面は半径 |P(x)| の円。面積は πP(x)²。','P(x)² を分数係数で展開し、各項を厳密に積分します。','P(x)が軸を横切っても、二乗した断面積を積分するので相殺されません。'],'πの係数を厳密計算'),coefficient:String(v),geometry:{type:'revolution',points:revolutionPoints(f,a,b)}};
}

function revolutionPoints(f,a,b){
 try{return Array.from({length:81},(_,i)=>{const x=a.add(b.sub(a).mul(new Q(BigInt(i),80n)));return [approximateQ(x),Math.abs(approximateQ(evaluate(f,x)))]});}catch{return null;}
}
