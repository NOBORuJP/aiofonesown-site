# 著者写真サイズ調整パッチ v7b

このZIPは、root `index.html` の著者紹介セクションで使っている顔写真を小さくするための差し替えパッチです。

## 変更内容
- 著者写真: 150px → 96px
- 著者カードの左カラム: 150px → 104px
- モバイル時の著者写真: 128px → 84px
- カード余白とgapも少し縮小

## GitHubでの反映方法
1. ZIPを展開
2. 中の `css/style.css` を GitHubリポジトリの同じ場所へ上書きアップロード
3. Cloudflare Pages の反映を待つ
4. もし古い見た目のままならブラウザをハードリロード

## 対象
- `index.html` の著者紹介セクション
- `/ja/index.html` や `/en/index.html` のSNSリンクや他要素には影響しません
