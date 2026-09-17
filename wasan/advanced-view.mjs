/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=(body,label)=>`<svg class="drawing advanced-drawing" viewBox="0 0 520 388" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${body}<g data-ainoboru-attribution="true"><rect x="0" y="360" width="520" height="28" fill="#183744"/><a href="https://www.aiofonesown.com/"><text x="260" y="379" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white" style="fill:#fff;font-size:16px;font-family:sans-serif">AI NOBORU · www.aiofonesown.com</text></a></g></svg>`;
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=v=>{const n=Math.hypot(...v);return v.map(x=>x/n)};
export function renderAdvancedGeometry(g){
 if(!g)return '';
 if(g.type==='arc'){
  const r=126,c=2*r*g.ratio,y=180-r+c,half=Math.sqrt(c*(2*r-c));
  return svg(`<circle cx="260" cy="180" r="${r}" fill="#dce7ec55" stroke="#91a8b2"/><line x1="${260-half}" y1="${y}" x2="${260+half}" y2="${y}" stroke="#244a5d" stroke-width="2"/><path d="M ${260-half},${y} A ${r},${r} 0 0 1 ${260+half},${y}" fill="none" stroke="#c24e38" stroke-width="4"/><line x1="260" y1="${180-r}" x2="260" y2="${y}" stroke="#c24e38" stroke-dasharray="4 3"/><text x="270" y="${180-r+c/2+5}">矢 c</text><line x1="134" y1="180" x2="386" y2="180" stroke="#708891" stroke-dasharray="4 4"/><text x="260" y="205" text-anchor="middle">直径 d</text><text x="260" y="340" text-anchor="middle">朱の円弧の長さ s を求めます</text>`,'直径 d の円、弦と矢 c、求める短い円弧 s');
 }
 const balls=g.balls.filter(b=>b.radius!==null&&b.center?.every(Number.isFinite)),angle=(g.view||0)*Math.PI/180,tilt=25*Math.PI/180;
 const project=p=>{if(g.dimension===2)return [p[0],p[1],0];const x=p[0]*Math.cos(angle)-p[1]*Math.sin(angle),y=p[0]*Math.sin(angle)+p[1]*Math.cos(angle),z=p[2];return [x,y*Math.cos(tilt)-z*Math.sin(tilt),y*Math.sin(tilt)+z*Math.cos(tilt)]};
 const objects=balls.map(b=>({...b,p:project(b.center)})),frame=g.outer?[{...g.outer,p:project(g.outer.center)}]:objects;
 let xmin=Math.min(...frame.map(b=>b.p[0]-Math.abs(b.radius))),xmax=Math.max(...frame.map(b=>b.p[0]+Math.abs(b.radius))),ymin=Math.min(...frame.map(b=>b.p[1]-Math.abs(b.radius))),ymax=Math.max(...frame.map(b=>b.p[1]+Math.abs(b.radius)));
 const span=Math.max(xmax-xmin,ymax-ymin),s=Math.min(440/(xmax-xmin),280/(ymax-ymin)),cx=(xmin+xmax)/2,cy=(ymin+ymax)/2,X=x=>260+(x-cx)*s,Y=y=>175-(y-cy)*s;
 let body='';
 if(g.boundary){const b=g.boundary,n=b.normal;
  if(g.dimension===2){const midpoint=[n[0]*b.offset,n[1]*b.offset],t=[-n[1],n[0]],ends=[-1,1].map(sign=>midpoint.map((x,i)=>x+sign*t[i]*span));body+=`<line x1="${X(ends[0][0])}" y1="${Y(ends[0][1])}" x2="${X(ends[1][0])}" y2="${Y(ends[1][1])}" stroke="#c24e38" stroke-width="2"/>`;}
  else{const u=unit(cross(n,Math.abs(n[0])<.8?[1,0,0]:[0,1,0])),v=cross(n,u),center=n.map(x=>x*b.offset);const points=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,c])=>project(center.map((x,i)=>x+(a*u[i]+c*v[i])*span*.65)));body+=`<polygon points="${points.map(p=>`${X(p[0])},${Y(p[1])}`).join(' ')}" fill="#e58b6822" stroke="#c24e38" stroke-dasharray="5 4"/>`;}
 }
 if(g.outer)body+=`<circle cx="${X(0)}" cy="${Y(0)}" r="${g.outer.radius*s}" fill="none" stroke="#91a8b2" stroke-width="2" stroke-dasharray="5 4"/>`;
 objects.sort((a,b)=>a.p[2]-b.p[2]);
 for(const b of objects){const r=Math.abs(b.radius)*s,color=b.accent?'#c24e38':'#244a5d',fill=b.radius<0?'none':b.accent?'#e58b6830':'#dce7ec88';body+=`<circle cx="${X(b.p[0])}" cy="${Y(b.p[1])}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="1.7"/><circle cx="${X(b.p[0])}" cy="${Y(b.p[1])}" r="2" fill="${color}"/>`;if(r>9)body+=`<text x="${X(b.p[0])+5}" y="${Y(b.p[1])-7}" style="fill:${color};font-size:13px">${esc(b.label)}</text>`;}
 body+=`<text x="260" y="341" text-anchor="middle" style="font-size:12px">${g.dimension===3?'正投影・見る向き '+g.view+'° ／ 表の中心座標で接触を確認':'朱：選んだ解 ／ 青：与えた円'}</text>`;
 return svg(body,g.dimension===3?'中心座標に基づく球の正投影。見かけの重なりは衝突を意味しません。':'中心座標と半径に比例した接円図。極端に小さい円は見えにくくなります。');
}
