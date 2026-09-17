/* AI NOBORU — https://www.aiofonesown.com/ */
(() => {
  const script = document.currentScript;
  if (!script) return;
  const base = new URL('.', script.src);
  const english = (script.getAttribute('data-lang') || document.documentElement.lang || 'ja').toLowerCase().startsWith('en');
  const packageCopy = script.getAttribute('data-package-copy') === 'true';
  const host = document.createElement('span');
  script.after(host);
  const root = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = ':host{display:block;margin:1rem 0}section{font:16px/1.7 sans-serif;color:#183744;background:#f5f3eb;border:1px solid #cbd6d0;padding:20px;border-radius:8px;overflow-wrap:anywhere}a{color:#183744}a.button{display:inline-block;background:#183744;color:white;padding:10px 16px;border-radius:6px;margin:8px 0}small{display:block;font-size:14px}';
  const section = document.createElement('section');
  section.lang = english ? 'en' : 'ja';
  const title = document.createElement('strong');
  title.textContent = english ? 'WASAN Mathematics Laboratory · AI NOBORU' : '和算計算室 · AI NOBORU';
  const br = document.createElement('br');
  const link = document.createElement('a');
  link.className = 'button';
  const filename = english ? 'AI-NOBORu-wasan-site-en.zip' : 'AI-NOBORu-wasan-site.zip';
  link.href = packageCopy ? 'https://www.aiofonesown.com/' : new URL('downloads/' + filename, base).href;
  if (!packageCopy) link.download = filename;
  link.textContent = packageCopy
    ? (english ? 'Visit the official website' : '公式サイトを見る')
    : (english ? 'Download the English package' : '出典表示付きの計算室をダウンロード');
  const note = document.createElement('small');
  const brand = document.createElement('a');
  brand.href = 'https://www.aiofonesown.com/';
  brand.textContent = 'AI NOBORU · www.aiofonesown.com';
  note.append(brand);
  section.append(title, br, link, note);
  root.append(style, section);
})();
