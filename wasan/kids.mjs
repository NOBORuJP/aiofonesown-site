/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
const dots=(n,color='')=>`<span class="kid-dots ${color}" aria-hidden="true">${'● '.repeat(n)}</span>`;
const options=(min,max,selected)=>Array.from({length:max-min+1},(_,i)=>`<option value="${i+min}"${i+min===selected?' selected':''}>${i+min}</option>`).join('');
const choose=(key,label,min,max,selected)=>`<label for="kid-${key}">${label} <select id="kid-${key}" name="${key}">${options(min,max,selected)}</select></label>`;
const count=(v,min,max)=>{const n=Number(v);return Number.isInteger(n)&&n>=min&&n<=max?n:min;};
export function kidAnswer(kind,values){
 if(kind==='stack'){
  const n=count(values.rows,1,5),terms=Array.from({length:n},(_,i)=>i+1),total=n*(n+1)/2;
  return `<div class="kid-picture" aria-label="${total}このまる">${terms.map(x=>`<div>${dots(x)}</div>`).join('')}</div><p class="kid-equation">${terms.join(' + ')} = ${total}</p><p>ぜんぶで <strong>${total}こ</strong>。したの だんほど、1こ おおいね。</p>`;
 }
 if(kind==='share'){
  const n=count(values.each,1,5);
  return `<p>${n*3}こを、3にんで おなじ かずずつ わけよう。</p><div class="kid-groups">${[1,2,3].map(i=>`<div><span>${i}にんめ</span>${dots(n,i===2?'teal':'')}</div>`).join('')}</div><p class="kid-equation">${n} + ${n} + ${n} = ${n*3}</p><p>ひとり <strong>${n}こ</strong>。あつめると、もとの ${n*3}こに もどった！</p>`;
 }
 if(kind==='double'){
  const n=count(values.times,1,4),before=2**(n-1),total=2**n;
  return `<p>1こから はじめて、${n}かい、かずを ばいに するよ。</p><div class="kid-groups"><div>${dots(before)}</div><div>${dots(before,'teal')}</div></div><p class="kid-equation">${before} + ${before} = ${total}</p><p>いまの かずと、おなじ かずを たすんだね。</p><p class="kid-sequence">${Array.from({length:n+1},(_,i)=>2**i).join(' → ')}</p>`;
 }
 const birds=count(values.birds,0,3),turtles=count(values.turtles,0,3),terms=[...Array(birds).fill(2),...Array(turtles).fill(4)],total=birds*2+turtles*4;
 return `<p>つるの あしは 2ほん。かめの あしは 4ほん。</p><div class="kid-groups"><div>つる ${birds}わ${dots(birds*2)}</div><div>かめ ${turtles}ひき${dots(turtles*4,'teal')}</div></div><p class="kid-equation">${terms.length?terms.join(' + '):'0'} = ${total}</p><p>あしは ぜんぶで <strong>${total}ほん</strong>。まる 1こが、あし 1ほんだよ。</p>`;
}
const cards=[
 {kind:'stack',title:'まるを つもう',text:'いちばん うえは 1こ。その したに 2こ、その したに 3こ。',controls:()=>choose('rows','なんだん？',1,5,3),initial:{rows:3},href:'tawara',link:'もっと おおきく つむ'},
 {kind:'share',title:'おなじ かずに わけよう',text:'3にんとも、おなじ かず。たりない ひとは いないかな？',controls:()=>choose('each','ひとり なんこ？',1,5,4),initial:{each:4},href:'kafusoku',link:'あまる・たりない を しらべる'},
 {kind:'double',title:'ばい、ばい、ばい！',text:'「ばい」は、いまの かずを もう ひとつぶん たすこと。',controls:()=>choose('times','なんかい？',1,4,2),initial:{times:2},href:'nezumi',link:'もっと ふやしてみる'},
 {kind:'legs',title:'あしは なんぼん？',text:'つると かめの かずを かえて、あしを かぞえよう。',controls:()=>choose('birds','つるは なんわ？',0,3,2)+choose('turtles','かめは なんびき？',0,3,1),initial:{birds:2,turtles:1},href:'tsurukame',link:'あしから つると かめを さがす'},
];
export function renderKids(){return `<div class="reading-lead"><p>むかしの にほんでも、「いくつ？」「どう わける？」を かんがえたよ。それが <ruby>和算<rt>わさん</rt></ruby>への いりぐち。</p><p>「+」は たす。「=」は、ひだりと みぎが おなじ かず、という しるしだよ。</p></div><div class="kids-grid">${cards.map(c=>`<section class="kid-card" data-kid="${c.kind}"><h2>${c.title}</h2><p>${c.text}</p><div class="kid-controls">${c.controls()}</div><div class="kid-answer" aria-live="polite" aria-atomic="true">${kidAnswer(c.kind,c.initial)}</div><a class="reading-try" href="#${c.href}">${c.link} →</a></section>`).join('')}</div><p class="reading-footnote">保護者の方へ：和算につながる考え方を、小さな数の足し算で試す教材です。史料の問題文をそのまま写したものではありません。リンク先の計算室では、より大きな数や一般的な条件も試せます。</p>`;}
export function bindKids(root){for(const card of root.querySelectorAll('[data-kid]')){
 if(card.dataset.bound)continue;card.dataset.bound='true';
 card.addEventListener('change',()=>{const values=Object.fromEntries([...card.querySelectorAll('select')].map(s=>[s.name,s.value]));card.querySelector('.kid-answer').innerHTML=kidAnswer(card.dataset.kid,values);});
}}
