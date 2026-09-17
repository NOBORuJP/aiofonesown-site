/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
const svg=(body,label)=>`<svg class="advanced-drawing" viewBox="0 0 520 398" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><g font-family="sans-serif" font-size="14" fill="#244a5d">${body}</g><g data-ainoboru-attribution="true"><rect x="0" y="370" width="520" height="28" fill="#183744"/><a href="https://www.aiofonesown.com/"><text x="260" y="389" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white" style="fill:#fff;font-size:16px;font-family:sans-serif">AI NOBORU · www.aiofonesown.com</text></a></g></svg>`;
const path=(points,closed=false,color='#c24e38',fill='none')=>`<${closed?'polygon':'polyline'} points="${points.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="${color}" stroke-width="2"/>`;
const circle=(x,y,r,color='#244a5d')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="1.8"/>`;
const caption=s=>`<text x="260" y="350" text-anchor="middle">${s}</text>`;
function fit(points){const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),lo=Math.min(...xs),hi=Math.max(...xs),bottom=Math.min(...ys),top=Math.max(...ys),scale=Math.min(420/(hi-lo||1),250/(top-bottom||1));return points.map(([x,y])=>[260+(x-(hi+lo)/2)*scale,170-(y-(top+bottom)/2)*scale]);}
export function renderExpansionGeometry(g){
 if(!g)return '';
 if(g.type==='regular')return svg(circle(260,170,130,'#91a8b2')+path(Array.from({length:g.n},(_,i)=>[260+130*Math.cos(2*Math.PI*i/g.n-Math.PI/2),170+130*Math.sin(2*Math.PI*i/g.n-Math.PI/2)]),true,'#244a5d','#dce7ec77')+caption('正'+g.n+'角形 ／ 同じ外接円上の頂点'),'正多角形と外接円');
 if(g.type==='segment'){
  const angle=Math.acos(Math.max(-1,Math.min(1,1-g.height))),points=Array.from({length:81},(_,i)=>{const t=-angle+2*angle*i/80;return [260+130*Math.sin(t),175-130*Math.cos(t)]});
  return svg(circle(260,175,130,'#91a8b2')+path(points,true,'#c24e38','#e58b6855')+caption('朱色：弦と円弧で囲まれた部分'),'円の弧と弦に挟まれた部分');
 }
 if(g.type==='ellipticArc'){
  const rx=135/Math.max(1,g.ratio),ry=rx*g.ratio,point=t=>[260+rx*Math.cos(t),170-ry*Math.sin(t)],points=Array.from({length:161},(_,i)=>point(g.start+(g.end-g.start)*i/160));
  return svg(`<ellipse cx="260" cy="170" rx="${rx}" ry="${ry}" fill="none" stroke="#91a8b2"/>`+path(points)+points.filter((_,i)=>i===0||i===160).map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#c24e38"/><text x="${p[0]+8}" y="${p[1]+(i?18:-10)}">${i?'終':'始'}</text>`).join('')+caption('朱色：計算する弧 ／ 角度は媒介変数'),'楕円上の指定した弧');
 }
 if(g.type==='revolution'){
  if(!g.points)return '<p class="empty-state">図で扱える数値範囲を超えています。厳密な体積は答えと表を参照してください。</p>';
  const all=[...g.points,...[...g.points].reverse().map(([x,y])=>[x,-y])];if(all.flat().some(x=>!Number.isFinite(x)))return '<p class="empty-state">値が大きいため図を省略します。厳密な値は表を参照してください。</p>';
  const P=fit(all);return svg(path(P,true,'#244a5d','#dce7ec66')+`<line x1="40" y1="170" x2="480" y2="170" stroke="#c24e38" stroke-dasharray="4 4"/>`+caption('回転軸を含む断面の概形 ／ 横と縦は同じ尺度'),'多項式を半径とする回転体の断面');
 }
 if(g.type==='pappus'){
  const scale=210,X=x=>50+x*scale,Y=y=>295-y*scale,semi=(x,r,color)=>`<path d="M ${X(x-r)},295 A ${r*scale},${r*scale} 0 0 1 ${X(x+r)},295" fill="none" stroke="${color}" stroke-width="2"/>`;
  return svg(semi(1,1,'#91a8b2')+semi(g.a,g.a,'#447d86')+semi(2*g.a+g.b,g.b,'#447d86')+`<line x1="50" y1="295" x2="470" y2="295" stroke="#91a8b2"/>`+g.circles.map((c,i)=>circle(X(c.x),Y(c.y),c.r*scale,i?'#244a5d':'#c24e38')).join('')+caption(g.total>g.shown?'図は最初の'+g.shown+'円 ／ 全'+g.total+'円は表に表示':'すべての円を同じ尺度で表示'),'大きい半円と内円に接しながら続く円の連鎖');
 }
 if(g.type==='quadrilateral'){
  const p=fit(g.points);return svg(path(p,true,'#244a5d','#dce7ec77')+path([p[0],p[2]],false,'#c24e38')+path([p[1],p[3]],false,'#91a8b2')+p.map(([x,y],i)=>`<text x="${x+8}" y="${y-8}">${'ABCD'[i]}</text>`).join('')+caption('四辺の順序を保った形 ／ 二本の対角線'),'円に内接する四角形と対角線');
 }
 if(g.type==='tetrahedron'){
  const p=fit(g.points.map(([x,y,z])=>[(x-y)/Math.sqrt(2),(-x-y+2*z)/Math.sqrt(6)]));let body='';for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)body+=path([p[i],p[j]],false,i===0?'#c24e38':'#244a5d');
  return svg(body+p.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="3" fill="#244a5d"/><text x="${x+8}" y="${y-7}">${'ABCD'[i]}</text>`).join('')+caption('朱色：Aからの三辺 ／ 斜めからの正投影'),'六辺から配置した四面体の正投影');
 }
 return '';
}
