/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {normal,pack,fail,abs} from './advanced-common.mjs';
import {gcd} from './math.mjs';
import {polynomialText} from './advanced-algebra.mjs';
const trim=p=>{p=[...p];while(p.length>1&&p.at(-1)===0n)p.pop();return p};
const zero=p=>p.every(x=>x===0n),Z=()=>[0n];
const add=(a,b)=>trim(Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]||0n)+(b[i]||0n)));
const neg=p=>p.map(x=>-x),sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>{const c=Array(a.length+b.length-1).fill(0n);a.forEach((v,i)=>b.forEach((w,j)=>c[i+j]+=v*w));return trim(c)};
function parse(s){
 s=normal(s);if(s.length>1400)fail('式の入力は1400文字以内です。');const lines=s.trim().split('\n');
 if(lines.length<2||lines.length>5)fail('y の最高次から定数項まで、2〜5行で入力してください。');
 const p=lines.map(line=>{const c=line.trim().split(/[,、\s]+/);if(!line.trim()||c.length>3||c.some(x=>! /^[+-]?\d{1,4}$/.test(x)||abs(BigInt(x))>1000n))fail('各行は x の2次以下。係数は−1000〜1000の整数を最高次から並べてください。');return trim(c.map(BigInt).reverse());}).reverse();
 while(p.length>1&&zero(p.at(-1)))p.pop();if(p.length<2)fail('y の次数が1〜4の式を入力してください。');return p;
}
const yadd=(a,b)=>Array.from({length:Math.max(a.length,b.length)},(_,i)=>add(a[i]||Z(),b[i]||Z()));
const ysub=(a,b)=>yadd(a,b.map(neg)),ymul=(a,p)=>a.map(c=>mul(c,p));
const shift=(a,k)=>[...Array.from({length:k},Z),...a];
function determinant(M){
 const size=M.length,dp=Array(1<<size).fill(null);dp[0]=[1n];
 for(let mask=0;mask<dp.length;mask++){if(!dp[mask])continue;let row=0;for(let k=0;k<size;k++)if(mask&(1<<k))row++;if(row===size)continue;
  for(let j=0;j<size;j++){if(mask&(1<<j)||zero(M[row][j]))continue;let inversions=0;for(let k=j+1;k<size;k++)if(mask&(1<<k))inversions++;
   const next=mask|(1<<j),value=mul(dp[mask],M[row][j]);dp[next]=add(dp[next]||Z(),inversions%2?neg(value):value);
  }
 }
 return dp.at(-1)||Z();
}
export function replacement(first,second){
 let f=parse(first),g=parse(second),swapped=false;if(f.length<g.length){[f,g]=[g,f];swapped=true;}
 const n=f.length-1,m=g.length-1,shifted=shift(g,n-m),h=[];
 h.push(ysub(ymul(f,g[m]),ymul(shifted,f[n])));
 for(let i=2;i<=m;i++)h.push(ysub(yadd(shift(h.at(-1),1),ymul(f,g[m-i+1])),ymul(shifted,f[n-i+1])));
 for(let i=m+1;i<=n;i++)h.push(shift(g,i-m-1));
 for(const p of h)if(p.slice(n).some(c=>!zero(c)))fail('換式の次数を下げる検算に失敗しました。');
 const matrix=h.map(p=>Array.from({length:n},(_,i)=>p[i]||Z())),raw=determinant(matrix),sylvester=[];
 const descendingF=[...f].reverse(),descendingG=[...g].reverse();
 for(const [poly,number] of [[descendingF,m],[descendingG,n]])for(let i=0;i<number;i++)sylvester.push(Array.from({length:n+m},(_,j)=>j>=i&&j<i+poly.length?poly[j-i]:Z()));
 const other=determinant(sylvester),expected=n*m%2?neg(other):other;if(!zero(sub(raw,expected)))fail('換式とシルベスター行列式の照合に失敗しました。');
 const divisor=raw.reduce((d,x)=>gcd(d,x),0n)||1n;let p=raw.map(x=>x/divisor);if(p.at(-1)<0n)p=neg(p);
 const isZero=zero(p),degree=isZero?-1:p.length-1,coefficients=[...p].reverse().join(', '),eligible=degree>=1&&degree<=8&&p.every(x=>abs(x)<=10n**18n);
 const description=isZero?'共通因子があり、この消去式だけでは x を絞れません。':degree===0?'非零定数なので、2式に共通する根はありません。':`${degree}次の必要条件。最高次係数が消える x と、実数の y の存在は元の式で確認します。`;
 const textMatrix=matrix.map(row=>row.map(polynomialText));
 return {...pack(isZero?'R(x) ≡ 0':polynomialText(p)+' = 0',description,['換式',...Array.from({length:n},(_,i)=>i?'y^'+i:'定数')],textMatrix.map((row,i)=>['h'+(i+1),...row]),[
 swapped?'y の次数が高い方を前式 f として入れ替えました。':'入力順に前式 f、後式 g とします。',`前式の y 次数 n=${n}、後式 m=${m}。係数 aⱼ,bⱼ は x の多項式です。`,
 'h₁=bₘf−aₙy^(n−m)g。hᵢ=yhᵢ₋₁+bₘ₋ᵢ₊₁f−aₙ₋ᵢ₊₁y^(n−m)g（2≤i≤m）。','m<i≤n では hᵢ=y^(i−m−1)g。すべて y の n 次未満になります。',
 `${n}×${n} の換式行列の行列式：${polynomialText(raw)}。`,`${n+m}×${n+m} のシルベスター行列式とも、符号 (−1)^(nm) を含め厳密に一致しました。`,
 `最高次係数 aₙ(x)=${polynomialText(f[n])}、bₘ(x)=${polynomialText(g[m])}。これらが消える候補では、次数が落ちて見かけの解が出ることがあります。`,
 '例：xy+1=0、xy+2=0 は消去式が x=0 でも、代入すると1=0、2=0で解がありません。',
 '零式は有理関数係数で共通因子があることを示します。すべての実数 x に実数解 y があるという意味ではありません。',
 eligible?'下のボタンから、この係数を実根の計算へ渡せます。':'実根へ渡せるのは1〜8次、各整数係数の絶対値10¹⁸以下。範囲外でも消去式そのものは厳密値です。'
 ],'二つの行列式を整数多項式で厳密照合'),matrix:textMatrix,coefficients,degree,zero:isZero,verified:true,transfer:eligible?{mode:'roots',input:{coefficients,precision:'8'}}:null};
}
