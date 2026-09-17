/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
// Enhance the existing navigation; calculators and reading content keep their own routing.
export function bindMobileNavigation(doc=document,win=window){
 const sidebar=doc.querySelector('.sidebar'),nav=doc.getElementById('navigation'),workspace=doc.getElementById('workspace');
 if(!sidebar||!nav||!workspace||sidebar.dataset.mobileReady||!win.matchMedia)return;
 const media=win.matchMedia('(max-width: 930px)'),tableAttributes=new WeakMap();
 const button=doc.createElement('button');
 button.type='button';button.className='mobile-nav-toggle';button.setAttribute('aria-controls',nav.id);button.setAttribute('aria-expanded','false');
 button.innerHTML='<span class="mobile-nav-heading"><span class="mobile-nav-title"></span><span class="mobile-nav-count"></span></span><span class="mobile-nav-current"></span><span class="mobile-nav-chevron" aria-hidden="true">⌄</span>';
 sidebar.insertBefore(button,doc.getElementById('navigation-pages')||nav);
 const close=()=>{sidebar.dataset.mobileOpen='false';button.setAttribute('aria-expanded','false');};
 const syncNavigation=()=>{
  const english=doc.documentElement.lang==='en',reading=['和算の読み物','Articles about wasan'].includes(nav.getAttribute('aria-label')),selected=nav.querySelector('[aria-current="page"]');
  button.querySelector('.mobile-nav-title').textContent=reading?(english?'Choose an article':'読み物を選ぶ'):(english?'Choose a tool':'術を選ぶ');
  button.querySelector('.mobile-nav-count').textContent=nav.dataset.total||String(nav.querySelectorAll('a').length);
  button.querySelector('.mobile-nav-current').textContent=selected?[selected.querySelector('.nav-num')?.textContent,selected.querySelector('.nav-label')?.textContent||selected.textContent].filter(Boolean).join('　'):(english?'Open the calculation index':'計算の一覧を開く');
  close();
 };
 const syncTables=()=>{
  for(const table of workspace.querySelectorAll('.table-wrap')){
   if(media.matches){
    if(!tableAttributes.has(table))tableAttributes.set(table,['tabindex','role','aria-label'].map(key=>table.getAttribute(key)));
    table.setAttribute('tabindex','0');table.setAttribute('role','region');table.setAttribute('aria-label',doc.documentElement.lang==='en'?'Calculation table (scroll horizontally)':'計算の表（左右にスクロールできます）');
   }else if(tableAttributes.has(table)){
    const original=tableAttributes.get(table);
    ['tabindex','role','aria-label'].forEach((key,i)=>original[i]===null?table.removeAttribute(key):table.setAttribute(key,original[i]));
    tableAttributes.delete(table);
   }
  }
 };
 button.addEventListener('click',()=>{
  if(!media.matches)return;
  const open=button.getAttribute('aria-expanded')!=='true';
  sidebar.dataset.mobileOpen=String(open);button.setAttribute('aria-expanded',String(open));
  if(open){
   const selected=nav.querySelector('[aria-current="page"]');nav.scrollLeft=0;
   nav.scrollTop=selected?Math.max(0,nav.scrollTop+selected.getBoundingClientRect().top-nav.getBoundingClientRect().top-nav.clientHeight/3):0;
  }
 });
 nav.addEventListener('click',event=>{
  if(!media.matches)return;
  const link=event.target.closest('a');if(!link)return;close();
  if(link.getAttribute('href')===win.location.hash){event.preventDefault();workspace.scrollIntoView?.({block:'start'});workspace.focus({preventScroll:true});}
 });
 doc.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&media.matches&&button.getAttribute('aria-expanded')==='true'){close();button.focus();}
 });
 doc.addEventListener('click',event=>{if(media.matches&&!sidebar.contains(event.target))close();});
 win.addEventListener('hashchange',close);
 media.addEventListener('change',()=>{
  const focusWouldBeHidden=media.matches&&(nav.contains(doc.activeElement)||doc.getElementById('navigation-pages')?.contains(doc.activeElement));
  close();syncTables();if(focusWouldBeHidden)button.focus();
 });
 new win.MutationObserver(syncNavigation).observe(nav,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-current','aria-label']});
 new win.MutationObserver(syncTables).observe(workspace,{childList:true,subtree:true});
 syncNavigation();syncTables();sidebar.dataset.mobileReady='true';
}
if(typeof document!=='undefined')bindMobileNavigation();
