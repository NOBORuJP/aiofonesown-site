(()=>{
const data=window.AINOBORU_COMPONENT_BASELINES||{};
const root=document.getElementById("component-baselines");
if(!root)return;
const esc=v=>String(v??"—")
  .replaceAll("&","&amp;")
  .replaceAll("<","&lt;")
  .replaceAll(">","&gt;")
  .replaceAll('"',"&quot;");
const gemini=data.gemini||{};
const r6=data.r6||{};
root.innerHTML=`
  <article class="component-baseline-card">
    <h3>Gemini</h3>
    <span class="component-baseline-badge pass">transport構成 隔離復元 PASS</span>
    <p>4つのtransport構成ファイルを検証しました。Gemini独立Memory、共通mailbox DB、API実行結果は世代原本に含めていません。</p>
    <code>${esc(gemini.bundle_tree_sha256?.slice(0,16))} / files ${esc(gemini.file_count)}</code>
  </article>
  <article class="component-baseline-card">
    <h3>R6 AI撮影</h3>
    <span class="component-baseline-badge parked">明示bindingなし・保留</span>
    <p>control-planeとinfraを再検索し、R6固有のrepository・system_id・source_path bindingは確認されませんでした。MediaIndexを代用原本にはしません。</p>
    <code>binding hits ${esc(r6.explicit_binding_hit_count)}</code>
  </article>`;
})();