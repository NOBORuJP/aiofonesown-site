(()=>{
const data=window.AINOBORU_SOURCE_RESOLUTION||{};
const root=document.getElementById("source-resolution-grid");
if(!root)return;
const esc=value=>String(value??"—")
  .replaceAll("&","&amp;")
  .replaceAll("<","&lt;")
  .replaceAll(">","&gt;")
  .replaceAll('"',"&quot;");
const labels={
  CURRENT_SOURCE_CONFIRMED_READ_ONLY:"現行原本を読取確認",
  TRANSPORT_ONLY_NO_INDEPENDENT_SOURCE:"transportのみ",
  PARKED_NO_EXPLICIT_BINDING:"明示bindingなし・保留",
  SOURCE_CONFLICT_FAIL_CLOSED:"原本競合・停止",
  SOURCE_NOT_CONFIRMED:"原本未確認"
};
const classes={
  CURRENT_SOURCE_CONFIRMED_READ_ONLY:"confirmed",
  TRANSPORT_ONLY_NO_INDEPENDENT_SOURCE:"transport",
  PARKED_NO_EXPLICIT_BINDING:"parked",
  SOURCE_CONFLICT_FAIL_CLOSED:"parked",
  SOURCE_NOT_CONFIRMED:"parked"
};
root.innerHTML=(data.systems||[]).map(item=>`
  <article class="source-resolution-card">
    <h3>${esc(item.name)}</h3>
    <span class="source-resolution-status ${classes[item.classification]||"parked"}">${esc(labels[item.classification]||item.classification)}</span>
    <p>${esc(item.summary)}</p>
    <code>${esc(item.evidence_short||item.active_source||item.classification)}</code>
  </article>
`).join("");
})();