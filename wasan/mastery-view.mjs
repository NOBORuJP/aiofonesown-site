/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=(body,label)=>`<svg class="advanced-drawing" viewBox="0 0 520 398" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><g font-family="sans-serif" font-size="14" fill="#244a5d">${body}</g><g data-ainoboru-attribution="true"><rect x="0" y="370" width="520" height="28" fill="#183744"/><a href="https://www.aiofonesown.com/"><text x="260" y="389" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white" style="fill:#fff;font-size:16px;font-family:sans-serif">AI NOBORU · www.aiofonesown.com</text></a></g></svg>`;
const circle=(x,y,r,color='#244a5d',fill='none',dash='')=>`<circle cx="${x}" cy="${y}" r="${Math.abs(r)}" fill="${fill}" stroke="${color}" stroke-width="2" ${dash?'stroke-dasharray="'+dash+'"':''}/>`;
export function renderMasteryGeometry(g){
 if(!g)return '';
 if(g.type==='ellipse'){return svg(`<ellipse cx="260" cy="165" rx="140" ry="${140*g.ratio}" fill="#dce7ec66" stroke="#c24e38" stroke-width="2.5"/><line x1="120" y1="165" x2="400" y2="165" stroke="#91a8b2"/><line x1="260" y1="${165-Math.min(145,140*g.ratio)}" x2="260" y2="${165+Math.min(145,140*g.ratio)}" stroke="#91a8b2"/><text x="350" y="188">a</text><text x="270" y="${165-Math.min(135,90*g.ratio)}">b</text><text x="260" y="350" text-anchor="middle">a と b は、中心から測る長さ</text>`,'半長軸aと半短軸bの楕円');}
 if(g.type==='integrand'||g.type==='cylinders'){
  const points=Array.from({length:161},(_,i)=>{const t=i/160;const y=g.type==='cylinders'?Math.sqrt(Math.max(0,1-t*t))*Math.sqrt(Math.max(0,1-g.ratio*g.ratio*t*t)):g.mode===1?t**g.p*(1-t)**g.q:Math.sin(t*Math.PI/2)**g.p*Math.cos(t*Math.PI/2)**g.q;return [t,y]});
  const peak=Math.max(...points.map(p=>p[1]));const P=points.map(([t,y])=>`${60+400*t},${290-220*y/(peak||1)}`).join(' ');
  return svg(`<line x1="60" y1="290" x2="470" y2="290" stroke="#91a8b2"/><line x1="60" y1="290" x2="60" y2="45" stroke="#91a8b2"/><polygon points="60,290 ${P} 460,290" fill="#dce7ec88"/><polyline points="${P}" fill="none" stroke="#c24e38" stroke-width="2.5"/><text x="60" y="315">0</text><text x="460" y="315" text-anchor="end">${g.type==='cylinders'?'b':g.mode===1?'1':'π/2'}</text><text x="72" y="35">${g.type==='cylinders'?'断面積 A(z)':'積分する関数'}</text><text x="260" y="350" text-anchor="middle">${g.type==='cylinders'?'z≥0 側の断面。面積の積分を2倍して体積へ':'縦の尺度は、形が見やすいよう調整しています'}</text>`,g.type==='cylinders'?'高さzによる二円柱の共通断面積の変化':'被積分関数の概形');
 }
 if(g.type==='chain'){
  const scale=135/g.R,X=x=>260+x*scale,Y=y=>175-y*scale;
  let body=circle(260,175,135,'#91a8b2')+circle(X(g.d),175,g.r*scale,'#447d86','#dfedec66');
  for(let i=0;i<g.circles.length;i++){const c=g.circles[i],r=c.radius*scale;body+=circle(X(c.center[0]),Y(c.center[1]),r,i===0?'#c24e38':'#244a5d',i===0?'#e58b6855':'#dce7ec44');if(r>9)body+=`<text x="${X(c.center[0])}" y="${Y(c.center[1])+5}" text-anchor="middle">${i+1}</text>`;}
  if(!g.closed){const c=g.returnCircle;body+=circle(X(c.center[0]),Y(c.center[1]),c.radius*scale,'#c24e38','none','4 4');}
  body+=`<text x="260" y="350" text-anchor="middle">${g.closed?'朱：出発する円 ／ すべて同じ尺度':'朱の破線：次に戻る位置。閉鎖していません'}</text>`;return svg(body,'中心がずれた二円の間をつなぐ円の連鎖');
 }
 if(g.type==='inversion'){
  let body='<line x1="260" y1="35" x2="260" y2="300" stroke="#dce5e8"/>';
  for(let panel=0;panel<2;panel++){
   const c=panel?g.after:g.before,frame=Math.max(g.k,c?Math.abs(c.center[0])+c.radius:0,c?Math.abs(c.center[1])+c.radius:0,g.line&&panel?Math.abs(g.line.offset)/Math.hypot(...g.line.normal)*1.4:0),scale=92/(frame||1),cx=panel?390:130,cy=170;
   body+=circle(cx,cy,g.k*scale,'#91a8b2','none','4 4')+`<circle cx="${cx}" cy="${cy}" r="2.5" fill="#244a5d"/>`;
   if(c)body+=circle(cx+c.center[0]*scale,cy-c.center[1]*scale,c.radius*scale,panel?'#c24e38':'#244a5d',panel?'#e58b6844':'#dce7ec44');
   else{const length=Math.hypot(...g.line.normal),nx=g.line.normal[0]/length,ny=g.line.normal[1]/length,t=g.line.offset/length;body+=`<line x1="${cx+nx*t*scale-ny*90}" y1="${cy-ny*t*scale-nx*90}" x2="${cx+nx*t*scale+ny*90}" y2="${cy-ny*t*scale+nx*90}" stroke="#c24e38" stroke-width="2.5"/>`;}
   body+=`<text x="${cx}" y="35" text-anchor="middle">${panel?'反転した図形':'元の円'}</text>`;
  }
  return svg(body+'<text x="260" y="335" text-anchor="middle">破線：反転円 ／ 左右は別々の尺度</text>','元の円と、その反転後の円または直線');
 }
 return '';
}
