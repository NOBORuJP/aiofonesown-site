/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {normal,Q,rational} from './math.mjs';
const fail=s=>{throw new Error(s)};
const natural=(s,label,maxDigits=80)=>{s=normal(s);if(!new RegExp('^\\+?\\d{1,'+maxDigits+'}$').test(s))fail(label+'は'+maxDigits+'桁以内の0以上の整数で入力してください。');return BigInt(s);};
const bounded=(s,label,min,max)=>{const n=natural(s,label,3);if(n<BigInt(min)||n>BigInt(max))fail(label+'は'+min+'〜'+max+'の整数で入力してください。');return Number(n);};
const pack=(value,detail,heads,rows,steps,meta='整数を厳密計算')=>({value:String(value),detail,heads,rows,steps,meta});
export function craneTurtle(heads,legs){
 const h=natural(heads,'頭の数'),l=natural(legs,'足の数');
 if(l<2n*h||l>4n*h||l%2n)fail('足は頭の数の2倍〜4倍で、偶数にしてください。鶴と亀の数が整数になりません。');
 const k=(l-2n*h)/2n,t=h-k;
 return {...pack('鶴 '+t+'羽\n亀 '+k+'匹','頭 '+h+'、足 '+l,['種類','数','足の合計'],[['鶴',String(t),String(2n*t)],['亀',String(k),String(4n*k)]],[`全部を鶴と考えると、足は ${h} × 2 = ${2n*h} 本。`,`実際との差は ${l} − ${2n*h} = ${l-2n*h} 本。`,`鶴を亀に替えると2本増えるので、亀は ${l-2n*h} ÷ 2 = ${k} 匹。`,`検算：${t} + ${k} = ${h}、2 × ${t} + 4 × ${k} = ${l}。`]),cranes:String(t),turtles:String(k)};
}
export function excessDeficit(a,s,b,d){
 a=natural(a,'少ない配り方');s=natural(s,'余る数');b=natural(b,'多い配り方');d=natural(d,'足りない数');
 if(a===0n||b<=a)fail('1人に配る数は正の整数で、多い配り方を少ない配り方より大きくしてください。');
 if((s+d)%(b-a)!==0n||s+d===0n)fail('この条件では人数が正の整数になりません。余りと不足を確認してください。');
 const n=(s+d)/(b-a),total=a*n+s;
 return {...pack(n+'人','品物の合計 '+total+'個',['配り方','配る総数','品物の合計'],[[a+'個ずつ',String(a*n),a*n+' + '+s+' = '+total],[b+'個ずつ',String(b*n),b*n+' − '+d+' = '+total]],[`余りと不足を合わせる：${s} + ${d} = ${s+d}。`,`1人分の差：${b} − ${a} = ${b-a}。`,`人数：${s+d} ÷ ${b-a} = ${n}。`,`品物：${a} × ${n} + ${s} = ${total}。`]),people:String(n),total:String(total)};
}
export function growth(initial,factor,steps){
 const start=natural(initial,'最初の数'),f=natural(factor,'増える倍率',3),count=bounded(steps,'回数',0,100);
 if(f<1n||f>100n)fail('倍率は1〜100の整数で入力してください。');
 let n=start;const rows=[['0（はじめ）',String(n)]];for(let i=1;i<=count;i++){n*=f;rows.push([String(i),String(n)]);}
 return pack(n,`${start} から、${f}倍を ${count}回`,['回','その時点の数'],rows,[`0回目は ${start}。`,`次の数 = 今の数 × ${f}。`,`最後の数 = ${start} × ${f}^${count} = ${n}。`]);
}
export function pourOil(a,b,c,target){
 const caps=[bounded(a,'容器A',1,100),bounded(b,'容器B',1,100),bounded(c,'容器C',1,100)],goal=bounded(target,'量りたい量',1,caps[0]);
 const nodes=[{state:[caps[0],0,0],parent:-1,from:null,to:null,amount:0}],seen=new Set([nodes[0].state.join(',')]);let end=-1;
 for(let q=0;q<nodes.length;q++){
  const state=nodes[q].state;if(state.includes(goal)){end=q;break;}
  for(let from=0;from<3;from++)for(let to=0;to<3;to++){
   if(from===to)continue;const amount=Math.min(state[from],caps[to]-state[to]);if(!amount)continue;
   const next=[...state];next[from]-=amount;next[to]+=amount;const key=next.join(',');if(seen.has(key))continue;
   seen.add(key);nodes.push({state:next,parent:q,from,to,amount});
  }
 }
 const path=[];for(let i=end;i>=0;i=nodes[i].parent)path.push(nodes[i]);path.reverse();
 const found=end>=0,rows=path.map((s,i)=>[String(i),i?`${'ABC'[s.from]} → ${'ABC'[s.to]}：${s.amount}`:'はじめ',...s.state.map(String)]);
 const o=pack(found?(path.length-1)+'回':'到達できません',found?`いずれかの容器に ${goal} を量る最短の注ぎ回数`:`この容器と注ぎ方では ${goal} を量れません。`,['回','注ぎ方','A','B','C'],rows,[`初めは A に ${caps[0]}、B と C は空。`,`注ぐ元が空になるか、注ぐ先が満杯になるまで注ぎます。途中では止めません。`,`各状態で可能な注ぎ方を、回数の少ない順に探索しました。`,found?`最後の量：${path.at(-1).state.join('、')}。合計は常に ${caps[0]}。`:'到達可能な状態を調べ終えました。'],'最短手順を整数で探索');
 return {...o,found,path,capacities:caps,target:goal};
}
const length=(s,label)=>{s=normal(s);if(s.length>30||!/^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))fail(label+'は30文字以内の正の小数で入力してください。');const q=rational(s);if(q.n*1000000n<q.d||q.n>1000000n*q.d)fail(label+'は0.000001〜1,000,000で入力してください。');return q;};
export function rightTriangle(a,b){
 const x=length(a,'勾 a'),y=length(b,'股 b'),sq=x.mul(x).add(y.mul(y)),h=Math.sqrt(sq.number());
 return {...pack(h,`斜辺の長さ（入力と同じ単位）`,['辺','長さ'],[['勾 a',String(x)],['股 b',String(y)],['弦 c（近似）',String(h)]],[`a² = ${x.mul(x)}、b² = ${y.mul(y)}。`,`c² = ${sq}。`,`c = √(${sq}) ≈ ${h}。`],'平方の和は厳密・平方根は近似'),hypotenuse:h,triangle:[x.number(),y.number(),h],squared:String(sq)};
}
export function threeSides(a,b,c){
 const q=[length(a,'辺 a'),length(b,'辺 b'),length(c,'辺 c')],s=q[0].add(q[1]).add(q[2]).div(new Q(2n));
 const gaps=q.map(x=>s.sub(x));if(gaps.some(x=>x.n<=0n))fail('三角形になりません。どの2辺の和も、残りの1辺より大きくしてください。');
 const sq=gaps.reduce((v,g)=>v.mul(g),s),area=Math.sqrt(sq.number());
 if(!Number.isFinite(area)||area<=0)fail('この細さは表示範囲外です。辺の尺度を変更してください。');
 return {...pack(area,'三角形の面積（入力単位の2乗）',['量','値'],[['半周 s',String(s)],['面積の平方（厳密）',String(sq)],['面積（近似）',String(area)]],[`半周 s = (a + b + c) ÷ 2 = ${s}。`,`面積の平方 = s(s−a)(s−b)(s−c) = ${sq}。`,`面積 = √(${sq}) ≈ ${area}。`],'面積の平方は厳密・平方根は近似'),area,squared:String(sq),sides:q.map(x=>x.number())};
}
const scaledDecimal=(n,p)=>{const s=String(n).padStart(p+1,'0');return p?s.slice(0,-p)+'.'+s.slice(-p):s;};
export function cubeRoot(value,precision){
 const p=bounded(precision,'小数点以下の桁数',0,30),s=normal(value).replace(/^\+/,'');
 if(s.length>100||! /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))fail('0以上の整数・小数を100文字以内で入力してください。指数表記は使えません。');
 let [a,b='']=s.split('.');a=(a||'0').replace(/^0+(?=\d)/,'');a=a.padStart(Math.ceil(a.length/3)*3,'0');
 const body=a+b.padEnd(3*p,'0').slice(0,3*p);let root=0n,rest=0n;const rows=[];
 for(let i=0;i<body.length;i+=3){
  const pair=body.slice(i,i+3),expanded=rest*1000n+BigInt(pair);let digit=9n;
  const cost=q=>(300n*root*root+30n*root*q+q*q)*q;
  while(cost(digit)>expanded)digit--;const subtract=cost(digit);rest=expanded-subtract;root=root*10n+digit;
  rows.push([pair,String(digit),String(root),String(rest)]);
 }
 const n=BigInt(a+b),d=10n**BigInt(b.length),exact=root**3n*d===n*10n**BigInt(3*p),out=scaledDecimal(root,p),upper=scaledDecimal(root+1n,p);
 return {...pack(out,exact?'立方すると入力値に一致します。':`${out} ≤ ∛N < ${upper}（指定桁で切り捨て）`,['下ろす3桁','選ぶ桁','ここまでの桁列','余り'],rows,['数を3桁ずつ区切り、余りに次の3桁を下ろします。','既決の桁列を r、次の桁を q として、(300r² + 30rq + q²)q が下ろした数を超えない最大の q を選びます。','立方したときに入力値を超えない条件で、次の一桁を確定します。'],exact?'厳密値':'整数計算による厳密な上下区間'),upper,scaled:String(root),exact,precision:p};
}
export const extraEngines={tsurukame:p=>craneTurtle(p.heads,p.legs),kafusoku:p=>excessDeficit(p.a,p.surplus,p.b,p.deficit),nezumi:p=>growth(p.initial,p.factor,p.steps),abura:p=>pourOil(p.a,p.b,p.c,p.target),koko:p=>rightTriangle(p.a,p.b),sansha:p=>threeSides(p.a,p.b,p.c),kairitsu:p=>cubeRoot(p.value,p.precision)};
