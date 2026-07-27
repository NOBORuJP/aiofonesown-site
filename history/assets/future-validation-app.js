(()=>{
const validation=window.AINOBORU_FUTURE_VALIDATION||{};
const results=validation.systems||[];
const corrections=new Map(
  (validation.catalog_corrections||[]).map(item=>[item.system_id,item])
);
const apply=()=>{
  const cards=document.querySelectorAll("[data-id]");
  if(!cards.length)return false;
  cards.forEach(card=>{
    const item=results.find(value=>value.system_id===card.dataset.id);
    if(!item)return;

    card.querySelector(".future-validation")?.remove();
    card.querySelector(".catalog-correction")?.remove();

    const box=document.createElement("div");
    box.className="future-validation pass";
    box.innerHTML=`<strong>main限定・隔離復元 PASS</strong>
      <span>${item.selected_past_generation} → ${item.validated_future_generation}</span>
      <code>${item.source_commit.slice(0,12)} / tree ${item.restored_tree_sha256.slice(0,12)}</code>`;
    card.appendChild(box);

    const correction=corrections.get(item.system_id);
    if(correction?.non_main_catalog_refs?.length){
      const note=document.createElement("div");
      note.className="catalog-correction";
      note.textContent=`旧catalogの非main参照を分離: ${correction.non_main_catalog_refs.map(x=>x.short).join(", ")}`;
      card.appendChild(note);
    }
  });
  return true;
};
if(!apply()){
  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    if(apply()||attempts>50)clearInterval(timer);
  },100);
}
})();