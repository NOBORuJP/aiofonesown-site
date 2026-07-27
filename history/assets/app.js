(() => {
const data=window.AINOBORU_DATA;
const q=(s)=>document.querySelector(s);
const qa=(s)=>[...document.querySelectorAll(s)];
const esc=(v)=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
const systemGrid=q("#system-grid"),side=q("#side-systems"),rows=q("#fable-rows"),roadmap=q("#roadmap-list");
const modal=q("#generation-modal"),backdrop=q("#modal-backdrop"),content=q("#modal-content");

function renderSystems(){
 systemGrid.innerHTML=data.systems.map(s=>`<article class="system-card ${s.featured?"featured":""}" data-system="${esc(s.id)}" tabindex="0">
 <div class="system-head"><h3>${esc(s.name)}</h3><span class="pill ${esc(s.tone)}">${esc(s.status)}</span></div>
 <p>${esc(s.summary)}</p><div class="system-foot"><span>${esc(s.current)}</span><span>履歴 ${s.historyCount}</span></div></article>`).join("");
 side.innerHTML=data.systems.map(s=>`<button data-side="${esc(s.id)}"><span><i class="dot ${esc(s.tone)}"></i>${esc(s.short)}</span><span>›</span></button>`).join("");
 qa("[data-system]").forEach(card=>card.addEventListener("click",()=>{if(card.dataset.system==="batch")q("#fable-history").scrollIntoView({behavior:"smooth"});}));
 qa("[data-side]").forEach(button=>button.addEventListener("click",()=>{const card=q(`[data-system="${button.dataset.side}"]`);card?.scrollIntoView({behavior:"smooth",block:"center"});}));
}
function renderRows(){
 rows.innerHTML=data.fable.generations.map(g=>`<article class="history-row">
 <div><span class="state ${esc(g.statusTone)}">${g.current?"●":"○"} ${esc(g.status)}</span></div>
 <div class="generation"><strong>${esc(g.generation)} — ${esc(g.title)}</strong><span><code>${esc(g.shaShort)}</code> · ${esc(g.type)}</span></div>
 <div class="source">${esc(g.source)}</div><div class="date">${esc(g.date)}</div>
 <button class="view-button" data-generation="${esc(g.generation)}">詳細</button></article>`).join("");
 qa("[data-generation]").forEach(btn=>btn.addEventListener("click",()=>openGeneration(btn.dataset.generation)));
}
function renderRoadmap(){
 roadmap.innerHTML=data.roadmap.map((r,i)=>`<div class="roadmap-item ${esc(r.status)}"><i>${r.status==="done"?"✓":i+1}</i><span>${esc(r.name)}</span></div>`).join("");
}
function openModal(html){content.innerHTML=html;backdrop.hidden=false;modal.classList.add("open");modal.setAttribute("aria-hidden","false")}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");setTimeout(()=>backdrop.hidden=true,160)}
function openGeneration(id){
 const g=data.fable.generations.find(x=>x.generation===id);
 const canRestore=!g.current;
 openModal(`<span class="eyebrow">FABLE generation</span><h2>${esc(g.generation)} — ${esc(g.title)}</h2>
 <div class="modal-sha">${esc(g.sha)}</div>
 <div class="modal-section"><h3>概要</h3><p>${esc(g.summary)}</p></div>
 <div class="modal-section"><h3>証拠</h3><ul>${g.evidence.map(e=>`<li>${esc(e)}</li>`).join("")}</ul></div>
 ${canRestore?`<div class="action-row"><button id="simulate" class="primary-button">復元シミュレーション</button><button class="disabled-button" disabled>実際に復元する（未接続）</button></div><div id="simulation-slot"></div>`:`<div class="action-row"><button class="disabled-button" disabled>現在の世代です</button></div>`}`);
 if(canRestore)q("#simulate").addEventListener("click",()=>simulate(g));
}
function simulate(g){
 const next=`FABLE-G${String(data.fable.nextGenerationNumber).padStart(3,"0")}-RESTORED-FROM-${g.generation.replace("FABLE-","")}`;
 q("#simulation-slot").innerHTML=`<div class="simulation"><span class="eyebrow">Restore simulation</span>
 <div class="simulation-grid"><div class="simulation-box"><strong>${esc(data.fable.currentGeneration)}</strong><span>現在</span></div><b>→</b><div class="simulation-box"><strong>${esc(next)}</strong><span>${esc(g.generation)}の内容を再現</span></div></div>
 <div class="modal-section"><h3>変更するもの</h3><ul><li>FABLE repositoryの内容を${esc(g.shaShort)}相当にする新しいcommit</li><li>世代manifestと復元理由</li><li>復元後の検証記録</li></ul></div>
 <div class="modal-section"><h3>変更しないもの</h3><ul><li>FABLE-G002を含む既存履歴</li><li>他の7枠</li><li>Memory Bridge、Memory DB、RAG</li></ul></div>
 <p class="simulation-note">この画面ではシミュレーションのみです。実装後もNOBORUの最終承認までは書込みません。</p></div>`;
}
q("#modal-close").addEventListener("click",closeModal);backdrop.addEventListener("click",closeModal);document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
qa("[data-scroll]").forEach(b=>b.addEventListener("click",()=>q(`#${b.dataset.scroll}`)?.scrollIntoView({behavior:"smooth"})));
renderSystems();renderRows();renderRoadmap();
})();