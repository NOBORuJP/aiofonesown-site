(()=>{
const s=window.AINOBORU_RUNTIME_STATUS||{};
const r=document.getElementById("runtime-status-grid");
if(!r)return;
const e=v=>String(v??"—").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const m=s.memory_connector||{},t=s.tunnel||{},g=s.github||{},p=s.documentation_pr||{},c=s.claude48||{},f=s.fable||{};
const card=(state,cls,title,body,code)=>`<article class="runtime-card"><span class="runtime-state ${cls}">${e(state)}</span><h3>${e(title)}</h3><p>${e(body)}</p><code>${code}</code></article>`;
r.innerHTML=[
 card(m.classification||m.status,m.status==="PASS"?"pass":"stop","Memory接続",m.detail,`Memory ${e(m.memory_role_id)}`),
 card(t.status,t.status==="PASS"?"pass":"stop","noho Tunnel",`${t.profile} / ${t.health}`,`${e(t.tunnel_id)}<br>${e(t.launchagent)}`),
 card(g.pr_state,g.pr_state==="MERGED"?"pass":"wait",`GitHub PR #${e(g.pr_number)}`,g.offsite_status,`checkpoint ${e((g.checkpoint_sha||"").slice(0,7))}<br>main ${e((g.github_main_sha||"").slice(0,12))}`),
 card(p.pr_state,p.pr_state==="MERGED"?"pass":"wait",`8787役割 PR #${e(p.pr_number)}`,`${p.purpose}。main mergeは未実施。`,`commit ${e((p.commit_sha||"").slice(0,12))}<br>${e(p.mergeable)} / ${e(p.merge_state)}`),
 card(c.status,c.article_accepted?"pass":"wait","Claude 48 author-final",`本文受理。Source verification ${c.source_verification_ledger_status}、外部公開不可。`,`result ${e((c.result_sha256||"").slice(0,12))}<br>report metadata corrected`),
 card(f.manifest_status,"info","FABLE世代manifest","隔離draft検証済み。live復元は無効。",e(f.simulation_target))
].join("");
})();