# Release record + promo-video fix v4b

## 修正内容

1. `/updates/` と `/news/` を、新しい情報が上・古い情報が下の時系列記録ページに修正。
2. Kindle電子書籍の日付を `June 4, 2026 (JST)` に修正。
3. 英語版ペーパーバックを `June 6, 2026 (JST)` に記録。
4. 日本語版ペーパーバックを `June 7, 2026 (JST)` に記録。
5. `/en/` と `/ja/` の book preview（添付画像が出ていた箇所）を維持。
6. `/en/` と `/ja/` のプロモ動画欄から冗長な説明文を削除し、動画だけを残す。
7. トップページでも英語動画・日本語動画だけを縦に残し、冗長な説明文を削除。

## GitHubに上書きする主なファイル

```text
index.html
en/index.html
ja/index.html
updates/index.html
news/index.html
css/style.css
assets/promo/ai_of_ones_own_promo_en_web.mp4
assets/promo/sodateru_ai_promo_ja_web.mp4
assets/book-preview/en/05_heart_chapter.png
```
