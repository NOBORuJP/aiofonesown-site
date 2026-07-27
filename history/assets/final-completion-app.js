(()=>{
const data=window.AINOBORU_FINAL_LOCAL_COMPLETION||{};
const root=document.getElementById("final-eight-summary");
const banner=document.getElementById("final-completion-banner");
if(!root||!banner)return;
const esc=v=>String(v??"—")
  .replaceAll("&","&amp;")
  .replaceAll("<","&lt;")
  .replaceAll(">","&gt;")
  .replaceAll('"',"&quot;");
const cls=value=>{
  if(["PAST_TO_FUTURE_VALIDATED","CURRENT_BASELINE_VALIDATED","CURRENT_CONTROL_BASELINE_VALIDATED"].includes(value))return "pass";
  if(value==="TRANSPORT_COMPONENT_BASELINE_VALIDATED")return "transport";
  return "parked";
};
const label=value=>({
  PAST_TO_FUTURE_VALIDATED:"過去→未来復元 PASS",
  CURRENT_BASELINE_VALIDATED:"現行基準復元 PASS",
  CURRENT_CONTROL_BASELINE_VALIDATED:"現行制御基準 PASS",
  TRANSPORT_COMPONENT_BASELINE_VALIDATED:"transport基準 PASS",
  PARKED_NO_EXPLICIT_BINDING:"明示bindingなし・保留"
}[value]||value);
banner.innerHTML=`<strong>ローカル8枠統合 完了</strong><br>
実Git反映・Cloudflare公開・本番復元は未実施です。公開候補は独立配置物として生成されています。`;
root.innerHTML=(data.systems||[]).map(item=>`
  <article class="final-eight-card">
    <h3>${esc(item.name)}</h3>
    <span class="final-eight-badge ${cls(item.status)}">${esc(label(item.status))}</span>
    <p>${esc(item.summary)}</p>
  </article>
`).join("");
})();