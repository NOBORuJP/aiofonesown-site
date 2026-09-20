from pathlib import Path
import shutil, hashlib, json, zipfile, tempfile, sys

REPO = Path.cwd()
ROOT = REPO / 'wasan'
DIST = ROOT / 'downloads'
DIST_NAMES = {
    'AI-NOBORu-wasan-site.zip',
    'AI-NOBORu-wasan-site-en.zip',
    'AI-NOBORu-aiofonesown-kit.zip',
}
FIXED_DT=(2026,9,20,0,0,0)

def sha256(p: Path):
    h=hashlib.sha256()
    with p.open('rb') as f:
        for c in iter(lambda:f.read(1024*1024),b''): h.update(c)
    return h.hexdigest()

def manifest_for(root: Path, exclude_names=()):
    ex=set(exclude_names)
    d={}
    for p in sorted(root.rglob('*')):
        if not p.is_file(): continue
        rel=str(p.relative_to(root))
        if rel in ex: continue
        d[rel]=sha256(p)
    return d

def write_manifest(root: Path):
    p=root/'SHA256SUMS.json'
    if p.exists(): p.unlink()
    d=manifest_for(root)
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2,sort_keys=True)+'\n',encoding='utf-8')
    return d

def zip_tree(src: Path, dst: Path, prefix=''):
    if dst.exists(): dst.unlink()
    with zipfile.ZipFile(dst,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        z.comment=b'AI NOBORU WASAN public distribution package.'
        for p in sorted(src.rglob('*')):
            if not p.is_file(): continue
            rel=str(p.relative_to(src)).replace('\\','/')
            arc=(prefix.rstrip('/')+'/'+rel) if prefix else rel
            info=zipfile.ZipInfo(arc, FIXED_DT)
            info.compress_type=zipfile.ZIP_DEFLATED
            info.external_attr=(0o100644 & 0xFFFF)<<16
            z.writestr(info,p.read_bytes(),compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)

def replace_one(p: Path, old: str, new: str):
    s=p.read_text('utf-8')
    n=s.count(old)
    if n != 1:
        raise RuntimeError(f'{p}: expected exactly 1 replacement, got {n}: {old[:80]}')
    p.write_text(s.replace(old,new),'utf-8')

def make_package_copy(src: Path, dst: Path):
    def ignore(d,names):
        rel=Path(d).relative_to(src) if Path(d)!=src else Path('.')
        ignored=[]
        if rel==Path('downloads'):
            ignored += [n for n in names if n in DIST_NAMES]
        return ignored
    shutil.copytree(src,dst,ignore=ignore)


def make_kit_copy(src: Path, dst: Path):
    def ignore(d,names):
        rel=Path(d).relative_to(src) if Path(d)!=src else Path('.')
        if rel==Path('downloads'):
            return [n for n in names if n == 'AI-NOBORu-aiofonesown-kit.zip']
        return []
    shutil.copytree(src,dst,ignore=ignore)

def package_transform(pkg: Path):
    # Site packages must not recursively contain/download themselves or the install kit.
    p=pkg/'downloads.html'
    replace_one(p,'<a download="" href="./downloads/AI-NOBORu-wasan-site.zip">和算計算室一式（日本語入口・ZIP）</a>',
                  '<a href="https://www.aiofonesown.com/wasan/downloads.html">公式サイトのダウンロードページを開く</a>')
    replace_one(p,'<a download="" href="./downloads/AI-NOBORu-wasan-site-en.zip">和算計算室一式（英語入口・ZIP）</a>',
                  '<a href="https://www.aiofonesown.com/wasan/downloads.html">公式サイトのダウンロードページを開く</a>')
    replace_one(p,'<a download="" href="./downloads/AI-NOBORu-aiofonesown-kit.zip">公式サイト設置キット（日本語・英語）</a>',
                  '<a href="https://www.aiofonesown.com/wasan/downloads.html">公式サイトのダウンロードページを開く</a>')
    p=pkg/'embed-example.html'
    replace_one(p,'<script defer="" src="./ainoboru-download.js"></script>',
                  '<script data-package-copy="true" defer="" src="./ainoboru-download.js"></script>')
    p=pkg/'en/downloads.html'
    replace_one(p,'<a class="calculate" download="" href="../downloads/AI-NOBORu-wasan-site-en.zip">Download the bilingual site (English entry)</a>',
                  '<a class="calculate" href="https://www.aiofonesown.com/wasan/en/downloads.html">Open downloads on the official site</a>')
    replace_one(p,'<a download="" href="../downloads/AI-NOBORu-wasan-site.zip">Download the bilingual site (Japanese entry)</a>',
                  '<a href="https://www.aiofonesown.com/wasan/en/downloads.html">Open downloads on the official site</a>')
    replace_one(p,'<a download="" href="../downloads/AI-NOBORu-aiofonesown-kit.zip">Download the website installation kit</a>',
                  '<a href="https://www.aiofonesown.com/wasan/en/downloads.html">Open downloads on the official site</a>')
    p=pkg/'en/embed-example.html'
    replace_one(p,'<script data-lang="en" defer="" src="../ainoboru-download.js"></script>',
                  '<script data-lang="en" data-package-copy="true" defer="" src="../ainoboru-download.js"></script>')
    replace_one(p,'<a download="" href="../downloads/AI-NOBORu-wasan-site-en.zip">Download the bilingual site (English entry)</a>',
                  '<a href="https://www.aiofonesown.com/wasan/en/downloads.html">Download the bilingual site (English entry)</a>')
    for rel in ['downloads.html','embed-example.html','en/downloads.html','en/embed-example.html']:
        q=pkg/rel
        t=q.read_text('utf-8')
        if t.startswith('<!DOCTYPE html>\n<html'):
            q.write_text(t.replace('<!DOCTYPE html>\n<html','<!DOCTYPE html>\n\n<html',1),'utf-8')
    write_manifest(pkg)


def kit_transform(site: Path):
    p=site/'downloads.html'
    replace_one(p,'<a download="" href="./downloads/AI-NOBORu-aiofonesown-kit.zip">公式サイト設置キット（日本語・英語）</a>',
                  '<a href="https://www.aiofonesown.com/wasan/downloads.html">公式サイトのダウンロードページを開く</a>')
    p=site/'en/downloads.html'
    replace_one(p,'<a download="" href="../downloads/AI-NOBORu-aiofonesown-kit.zip">Download the website installation kit</a>',
                  '<a href="https://www.aiofonesown.com/wasan/en/downloads.html">Open the official downloads page</a>')
    for rel in ['downloads.html','en/downloads.html']:
        q=site/rel
        t=q.read_text('utf-8')
        if t.startswith('<!DOCTYPE html>\n<html'):
            q.write_text(t.replace('<!DOCTYPE html>\n<html','<!DOCTYPE html>\n\n<html',1),'utf-8')
    write_manifest(site)

README_JA='''AI NOBORU — 和算計算室 Web設置キット\nhttps://www.aiofonesown.com/\n\nこのキットの wasan/ フォルダを、既存Webサイトの公開ルート直下へ配置してください。既存のトップページを置き換える必要はありません。\n\n設置後の主な入口\n- 日本語: /wasan/\n- 英語: /wasan/en/\n- JavaScript不要の英語83術一覧: /wasan/en/calculators.html\n- ダウンロード: /wasan/downloads.html / /wasan/en/downloads.html\n\n配信時の確認\n1. .mjs が JavaScript のMIME typeで配信されること\n2. /wasan/ と /wasan/en/ の計算室が読み込めること\n3. 日本語・英語の相互リンクが動くこと\n4. downloads/ のZIPが取得できること\n5. 既存サイトのCSPを使う場合、ES modules と同梱スクリプトを許可すること\n\n埋め込み例は embed-snippet.html / embed-snippet-en.html、iframe例は iframe-snippet.html / iframe-snippet-en.html を参照してください。\n'''
README_EN='''AI NOBORU — WASAN Mathematics Laboratory website kit\nhttps://www.aiofonesown.com/\n\nPlace the wasan/ folder under the public root of an existing website. You do not need to replace the site's existing home page.\n\nMain entry points after installation\n- Japanese: /wasan/\n- English: /wasan/en/\n- JavaScript-free English reference for all 83 calculators: /wasan/en/calculators.html\n- Downloads: /wasan/downloads.html and /wasan/en/downloads.html\n\nCheck after deployment\n1. .mjs files are served with a JavaScript MIME type.\n2. Both /wasan/ and /wasan/en/ load the calculator interface.\n3. Japanese/English language links work in both directions.\n4. ZIP files under downloads/ can be retrieved.\n5. If the host uses a Content Security Policy, it allows the included ES modules and scripts.\n\nSee embed-snippet.html / embed-snippet-en.html for the download widget and iframe-snippet.html / iframe-snippet-en.html for iframe examples.\n'''
TOP_FILES={
 'README-JA.txt':README_JA,
 'README-EN.txt':README_EN,
 'embed-snippet.html':'<script src="/wasan/ainoboru-download.js" defer></script>\n',
 'embed-snippet-en.html':'<script src="/wasan/ainoboru-download.js" data-lang="en" defer></script>\n',
 'iframe-snippet.html':'<iframe src="/wasan/" title="和算計算室" style="width:100%;min-height:900px;border:0"></iframe>\n',
 'iframe-snippet-en.html':'<iframe src="/wasan/en/" title="WASAN Mathematics Laboratory" style="width:100%;min-height:900px;border:0"></iframe>\n',
}

def main():
    if not (ROOT/'index.html').exists(): raise SystemExit('wasan root not found')
    DIST.mkdir(exist_ok=True)
    for n in DIST_NAMES:
        p=DIST/n
        if p.exists(): p.unlink()
    # Build self-contained site packages without recursive distribution ZIPs.
    with tempfile.TemporaryDirectory() as td:
        td=Path(td)
        for zname,prefix in [('AI-NOBORu-wasan-site.zip','AI-NOBORu-wasan'),('AI-NOBORu-wasan-site-en.zip','AI-NOBORu-wasan-en')]:
            pkg=td/prefix
            make_package_copy(ROOT,pkg)
            package_transform(pkg)
            zip_tree(pkg,DIST/zname,prefix)
        # Build installation kit: includes both site packages, but not the kit itself.
        kroot=td/'kit'; site=kroot/'wasan'
        make_kit_copy(ROOT,site)  # include the two site packages; exclude only the kit itself
        kit_transform(site)
        for n,txt in TOP_FILES.items(): (kroot/n).write_text(txt,'utf-8')
        # top manifest covers everything except itself
        topman=manifest_for(kroot,exclude_names={'SHA256SUMS.json'})
        (kroot/'SHA256SUMS.json').write_text(json.dumps(topman,ensure_ascii=False,indent=2,sort_keys=True)+'\n','utf-8')
        zip_tree(kroot,DIST/'AI-NOBORu-aiofonesown-kit.zip','')
    rootman=write_manifest(ROOT)
    files=[p for p in ROOT.rglob('*') if p.is_file()]
    if len(files)!=103:
        raise RuntimeError(f'expected 103 files, got {len(files)}')
    # Sanity: internal audit files must not be published.
    bad=[str(p.relative_to(ROOT)) for p in files if any(x in p.name.lower() for x in ['private','audit','r48','prezip','true-final'])]
    if bad: raise RuntimeError('internal filenames remain: '+repr(bad))
    print('WASAN_STAGE_BUILD_PASS files=103 manifest='+str(len(rootman)))

if __name__=='__main__': main()