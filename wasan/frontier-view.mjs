/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {Q,approximateQ} from './math.mjs';
const svg=(body,label)=>`<svg class="advanced-drawing" viewBox="0 0 520 398" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><g font-family="sans-serif" font-size="14" fill="#244a5d">${body}</g><g data-ainoboru-attribution="true"><rect x="0" y="370" width="520" height="28" fill="#183744"/><a href="https://www.aiofonesown.com/"><text x="260" y="389" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white" style="fill:#fff;font-size:16px;font-family:sans-serif">AI NOBORU · www.aiofonesown.com</text></a></g></svg>`;
const path=(p,closed=false,color='#244a5d',fill='none')=>`<${closed?'polygon':'polyline'} points="${p.map(v=>v.join(',')).join(' ')}" fill="${fill}" stroke="${color}" stroke-width="2"/>`;
const label=(x,y,s)=>`<text x="${x}" y="${y}" text-anchor="middle">${s}</text>`;
const caption=s=>label(260,350,s);
const circle=(x,y,r,color='#244a5d')=>`<circle cx="${x}" cy="${y}" r="${r}" stroke="${color}" fill="${color}18" stroke-width="2"/>`;
function frame(p){const x=p.map(p=>p[0]),y=p.map(p=>p[1]),l=Math.min(...x),r=Math.max(...x),b=Math.min(...y),t=Math.max(...y),s=Math.min(410/(r-l||1),255/(t-b||1));return {s,p:([x,y])=>[260+(x-(l+r)/2)*s,170-(y-(b+t)/2)*s]};}
function boundedParabola(g){
 const n=x=>new Q(BigInt(x)),read=s=>{const [a,b='1']=s.split('/');return new Q(BigInt(a),BigInt(b));},[a,b,c]=g.exactCoefficients.map(read),aa=a.mul(new Q(9n,4n)),bb=b.mul(new Q(3n,2n)),ys=[c.add(aa).sub(bb),c.sub(aa),c.add(aa).add(bb)].map(y=>n(170).sub(n(110).mul(y))),pieces=[];let omitted=false;
 const below=(v,k)=>v.n<BigInt(k)*v.d,above=(v,k)=>v.n>BigInt(k)*v.d,mid=(p,q)=>p.map((v,i)=>v.add(q[i]).div(n(2)));
 // Exact de Casteljau subdivision preserves the same parabola. Discard only
 // convex hulls outside the clip; bound every emitted control point so the
 // browser never has to flatten coordinates millions of pixels away.
 const visit=(p,depth)=>{const y=p.map(v=>v[1]);if(y.every(v=>below(v,20))||y.every(v=>above(v,320)))return;
  if(y.every(v=>!below(v,-580)&&!above(v,920))){const v=p.map(point=>point.map(approximateQ).join(' '));pieces.push(`<path d="M ${v[0]} Q ${v[1]} ${v[2]}" fill="none" stroke="#244a5d" stroke-width="2"/>`);return;}
  if(depth===64){omitted=true;return;}const l=mid(p[0],p[1]),r=mid(p[1],p[2]),m=mid(l,r);visit([p[0],l,m],depth+1);visit([m,r,p[2]],depth+1);
 };visit([95,260,425].map((x,i)=>[n(x),ys[i]]),0);return {markup:pieces.join(''),omitted};
}
export function renderFrontierGeometry(g){if(!g)return '';
 if(g.type==='frontierBox'){const P=([x,y])=>[60+x*400,295-y*235],v=P(g.peak);return svg(path([[60,40],[60,295],[470,295]],false,'#91a8b2')+path(g.points.map(P))+circle(...v,5,'#c24e38')+label(v[0],v[1]-14,'最大')+label(260,322,'幅 w / (幅＋高さ)')+caption('体積の変化 ／ 縦軸は最大体積を1として表示'),'箱の幅を変えたときの体積と最大点');}
 if(g.type==='frontierFour'){const F=frame(g.points);return svg(path(g.points.map(F.p),true)+g.circles.map((c,i)=>{const [x,y]=F.p([c.x,c.y]);return circle(x,y,c.r*F.s,['#244a5d','#447d86','#447d86','#c24e38'][i])+label(x,y+4,['A','B','C','4'][i]);}).join('')+g.points.map((p,i)=>{const [x,y]=F.p(p);return label(x+(i===2?12:-12),y+(i===0?-12:20),'ABC'[i]);}).join('')+caption('朱色：底辺BCと三つの円に接する第4円'),'三角形の中の安島の四円接触配置');}
 if(g.type==='frontierEllipses'){const F=frame(g.points);return svg(path(g.points.map(F.p),true)+g.ellipses.map((e,i)=>{const [x,y]=F.p([e.x,e.y]);return `<ellipse cx="${x}" cy="${y}" rx="${e.rx*F.s}" ry="${e.ry*F.s}" fill="${i?'#c24e38':'#447d86'}18" stroke="${i?'#c24e38':'#447d86'}" stroke-width="2"/>`;}).join('')+caption('合同な楕円を横向き・縦向きに配置'),'二等辺三角形に接する向きの異なる合同な二楕円');}
 if(g.type==='frontierDisk')return svg(circle(260,170,125)+g.cuts.map((u,i)=>{const x=260+125*u,y=125*Math.sqrt(Math.max(0,1-u*u));return path([[x,170-y],[x,170+y]],false,'#c24e38')+(g.cuts.length<8?label(x,320,i+1):'');}).join('')+caption('中心は0 ／ 左から順に、指定した面積比で切断'),'円を指定した面積比へ分ける平行な切断線');
 if(g.type==='frontierIntersections'){const P=([x,y])=>[260+110*x,170-110*y],curve=boundedParabola(g);return svg('<defs><clipPath id="intersection-clip"><rect x="65" y="20" width="390" height="300"/></clipPath></defs><g clip-path="url(#intersection-clip)">'+circle(260,170,110,'#447d86')+curve.markup+g.points.map(p=>circle(...P(p),4,'#c24e38')).join('')+'</g>'+caption('朱色：交点 ／ 円の中心・半径を基準に同じ尺度で表示'),'円と放物線の交点')+(curve.omitted?'<p class="empty-state">曲線の一部は表示精度を超えるため省略しました。交点の値は表で確認できます。</p>':'');}
 return '';
}
