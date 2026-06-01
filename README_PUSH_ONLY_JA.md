# Push-ready official site package FINAL4

これは、Gitに入れるだけの静的サイト一式です。

## 今回の修正

- 英語版の発売日を **2026-05-29** に修正
- 日本語版の発売日は **2026-05-31** のまま
- `/ja/` と `/en/` の「読後ノート / A different relationship with AI」から、拡大サムネイル画像を削除
- 代わりに、読後メモ本文を直接表示

## 正しいURL

- 英語版: https://noborikuta.gumroad.com/l/aiofonesown-early-access
- 日本語版: https://noborikuta.gumroad.com/l/sodateru-ai-early-access

## 反映方法

このZIPの中身を、WebサイトGitリポジトリ直下へそのまま入れてください。
その後は Git へ入れるだけです。

```bash
git add -A
git commit -m "Fix release dates and replace review thumbnails with text"
git push
```
