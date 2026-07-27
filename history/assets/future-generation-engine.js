(()=>{
const catalog=window.AINOBORU_GENERATION_CATALOG||{};
const root=document.getElementById("future-generation-grid");
if(!root)return;
const esc=v=>String(v??"—").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const download=(name,obj)=>{
  const blob=new Blob([JSON.stringify(obj,null,2)+"\n"],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=name; a.click();
};
root.innerHTML=(catalog.systems||[]).map(sys=>{
  const ready=(sys.generations||[]).length>1;
  const options=(sys.generations||[]).filter(g=>!g.current).map(
    g=>`<option value="${esc(g.generation)}">${esc(g.generation)} · ${esc(g.source_short)}</option>`
  ).join("");
  const rows=(sys.generations||[]).slice().reverse().map(
    g=>`<div class="generation-item"><strong>${esc(g.generation)}</strong><code>${esc(g.source_short)}</code><span>${esc(g.title)}${g.current?" · 現在":""}</span></div>`
  ).join("")||"<p>復元元として使える実在世代がまだありません。</p>";
  return `<article class="future-card" data-id="${esc(sys.id)}">
    <div class="future-card-head"><h3>${esc(sys.name)}</h3><span class="future-status ${ready?"ready":""}">${ready?"未来復元案を作成可":esc(sys.status)}</span></div>
    <p>現在世代: ${esc(sys.current_generation)} / 履歴 ${esc(sys.generation_count)}。本番復元は無効です。</p>
    <div class="generation-list">${rows}</div>
    <div class="future-actions"><select class="future-select" ${ready?"":"disabled"}><option value="">過去世代を選択</option>${options}</select><button class="plan-button" ${ready?"":"disabled"}>未来世代案</button></div>
    <div class="future-plan" hidden></div>
  </article>`;
}).join("");
root.querySelectorAll("[data-id]").forEach(card=>{
  const sys=catalog.systems.find(x=>x.id===card.dataset.id);
  const select=card.querySelector("select");
  const button=card.querySelector("button");
  const box=card.querySelector(".future-plan");
  button?.addEventListener("click",()=>{
    const source=sys.generations.find(g=>g.generation===select.value);
    if(!source)return;
    const future=`${sys.id.toUpperCase().replaceAll("-","_")}-G${String(sys.generation_count+1).padStart(3,"0")}-RESTORED-FROM-${source.generation.split("-").pop()}`;
    const plan={
      schema_version:"1.0.0",
      record_type:"future_generation_restore_plan",
      system_id:sys.id,
      current_generation:sys.current_generation,
      selected_past_generation:source.generation,
      selected_source_ref:source.source_ref,
      new_future_generation:future,
      principle:"create_new_generation_never_rewind_history",
      preserve_generations:sys.generations.map(g=>g.generation),
      isolation_test_required:true,
      common_restore_engine:catalog.common_restore_engine,
      production_restore_allowed:false,
      noboru_final_approval_required:true
    };
    box.hidden=false;
    box.innerHTML=`<strong>${esc(future)}</strong><p>${esc(source.generation)}の内容を現在履歴の先に作る案です。既存履歴は削除しません。</p><code>${esc(source.source_ref)}</code><div class="future-actions"><button class="plan-button">計画JSONを保存</button></div>`;
    box.querySelector("button").addEventListener("click",()=>download(`${future}.json`,plan));
  });
});
})();