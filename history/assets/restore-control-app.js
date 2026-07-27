(()=>{
const data=window.AINOBORU_RESTORE_OPERATIONS||{};
const root=document.getElementById("restore-control-grid");
if(!root)return;
const esc=v=>String(v??"—")
  .replaceAll("&","&amp;")
  .replaceAll("<","&lt;")
  .replaceAll(">","&gt;")
  .replaceAll('"',"&quot;");
root.innerHTML=(data.operations||[]).map(item=>{
  const action=item.enabled
    ? `<a href="${esc(item.local_url)}">ローカル隔離復元を実行</a>`
    : `<button class="disabled" disabled>${esc(item.disabled_reason||"利用不可")}</button>`;
  return `<article class="restore-control-card">
    <h3>${esc(item.name)}</h3>
    <p>${esc(item.description)}</p>
    ${action}
    <code>${esc(item.status)}</code>
  </article>`;
}).join("");
})();
