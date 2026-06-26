# Delta-006 upload patch

この版では、誤ってルート直下に置いた `delta006*.html` を使わず、以下の正式パスへ配置しています。

- `/lab/delta006/` → 通常版 / interactive
- `/lab/delta006/screensaver-dramatic.html` → スクリーンセーバー dramatic版
- `/lab/delta006/screensaver-overview.html` → スクリーンセーバー overview版
- `/lab/` → Lab一覧ページ

変更ファイル:

- `lab/index.html`
- `lab/delta006/index.html`
- `lab/delta006/screensaver-dramatic.html`
- `lab/delta006/screensaver-overview.html`
- `index.html`
- `ja/index.html`
- `sitemap.xml`

反映手順:

```bash
cd ~/Downloads/aiofonesown-site
unzip -o ~/Downloads/aiofonesown_delta006_patch_only.zip

git status
git add index.html ja/index.html sitemap.xml lab README_DELTA006_UPLOAD_JA.md
git commit -m "Add Delta-006 lab pages"
git push origin main
```

注意:

- `delta006.html`, `delta006-screensaver.html`, `delta006-screensaver2.html` はルート直下には置かないでください。
- Delta-006はThree.jsをCDNから読みます。CSPを厳しくしている場合は `cdnjs.cloudflare.com` を許可してください。
