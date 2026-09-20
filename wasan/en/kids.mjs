/* AI NOBORU — https://www.aiofonesown.com/ | Attribution for distributed materials. See each source for third-party rights. */
const dots=(n,color='')=>`<span class="kid-dots ${color}" aria-hidden="true">${'● '.repeat(n)}</span>`;
const options=(min,max,selected)=>Array.from({length:max-min+1},(_,i)=>`<option value="${i+min}"${i+min===selected?' selected':''}>${i+min}</option>`).join('');
const choose=(key,label,min,max,selected)=>`<label for="kid-${key}">${label} <select id="kid-${key}" name="${key}">${options(min,max,selected)}</select></label>`;
const count=(value,min,max)=>{const n=Number(value);return Number.isInteger(n)&&n>=min&&n<=max?n:min;};

export function kidAnswer(kind,values){
  if(kind==='stack'){
    const rows=count(values.rows,1,5);
    const terms=Array.from({length:rows},(_,i)=>i+1);
    const total=rows*(rows+1)/2;
    const noun=total===1?'circle':'circles';
    return `<div class="kid-picture" aria-label="${total} ${noun}">${terms.map(n=>`<div>${dots(n)}</div>`).join('')}</div><p class="kid-equation">${terms.join(' + ')} = ${total}</p><p>${total===1?'There is':'There are'} <strong>${total} ${noun}</strong> altogether. Each new row has one more.</p>`;
  }
  if(kind==='share'){
    const each=count(values.each,1,5);
    const total=each*3;
    return `<p>Share ${total} circles equally among three people.</p><div class="kid-groups">${[1,2,3].map(person=>`<div><span>Person ${person}</span>${dots(each,person===2?'teal':'')}</div>`).join('')}</div><p class="kid-equation">${each} + ${each} + ${each} = ${total}</p><p>Each person gets <strong>${each}</strong>. Put the groups back together and you have ${total} again.</p>`;
  }
  if(kind==='double'){
    const times=count(values.times,1,4);
    const before=2**(times-1);
    const total=2**times;
    const instruction=times===1?'Start with one circle and double it once.':times===2?'Start with one circle and double it twice.':`Start with one circle and double it ${times} times.`;
    return `<p>${instruction}</p><div class="kid-groups"><div>${dots(before)}</div><div>${dots(before,'teal')}</div></div><p class="kid-equation">${before} + ${before} = ${total}</p><p>Doubling means adding another group of the same size.</p><p class="kid-sequence">${Array.from({length:times+1},(_,i)=>2**i).join(' → ')}</p>`;
  }
  const cranes=count(values.cranes,0,3);
  const turtles=count(values.turtles,0,3);
  const terms=[...Array(cranes).fill(2),...Array(turtles).fill(4)];
  const total=cranes*2+turtles*4;
  return `<p>A crane has two legs. A turtle has four.</p><div class="kid-groups"><div>${cranes} ${cranes===1?'crane':'cranes'}${dots(cranes*2)}</div><div>${turtles} ${turtles===1?'turtle':'turtles'}${dots(turtles*4,'teal')}</div></div><p class="kid-equation">${terms.length?terms.join(' + '):'0'} = ${total}</p><p>That makes <strong>${total} ${total===1?'leg':'legs'}</strong> altogether. Each circle stands for one leg.</p>`;
}

export function bindKids(root){
  for(const card of root.querySelectorAll('[data-kid]')){
    if(card.dataset.bound)continue;
    card.dataset.bound='true';
    card.addEventListener('change',()=>{
      const values=Object.fromEntries([...card.querySelectorAll('select')].map(select=>[select.name,select.value]));
      card.querySelector('.kid-answer').innerHTML=kidAnswer(card.dataset.kid,values);
    });
  }
}
