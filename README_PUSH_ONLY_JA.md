# Push-ready official site package

これは `aiofonesown.com` 用の静的Webサイト一式です。

## 正しいURL

- 英語版: https://noborikuta.gumroad.com/l/aiofonesown-early-access
- 日本語版: https://noborikuta.gumroad.com/l/sodateru-ai-early-access

## 使い方

WebサイトのGitリポジトリ直下で実行してください。

```bash
rm -rf assets css en ja updates support author
unzip -o ~/Downloads/aiofonesown_site_PUSH_READY_20260601_FINAL2_CONTENTS_ONLY.zip -d .
git status
git add -A
git commit -m "Rebuild official site with corrected Gumroad releases"
git push
```
