# Push-ready official site package FINAL3

これは、Gitに入れるだけの静的サイト一式です。

## 正しいURL

- 英語版: https://noborikuta.gumroad.com/l/aiofonesown-early-access
- 日本語版: https://noborikuta.gumroad.com/l/sodateru-ai-early-access

## 含まれるページ

- `/`
- `/ja/`
- `/en/`
- `/updates/`
- `/updates/english-early-access-gumroad-release/`
- `/updates/sodateru-ai-early-access-gumroad-release/`
- `/support/`

## 含まれないもの

- `/author/`
- Author ナビ
- Coming soon 表記
- 裸の `gumroad.com/l/...` リンク

## 反映手順

このZIPの中身を、WebサイトGitリポジトリ直下へそのまま入れてください。
その後は Git へ入れるだけです。

```bash
git add -A
git commit -m "Rebuild official site with corrected Gumroad releases"
git push
```
