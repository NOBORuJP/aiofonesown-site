# GitHubアップロード用 差分パッチ

これは、最新GitHub ZIP
`aiofonesown-site-e164c85b622f087aa6f2e7b09ef502e7d84a8087.zip`
を正本にした差分ファイルだけのZIPです。

## 使い方
1. ZIPを展開
2. 中のファイルを GitHub リポジトリ root にそのまま上書きアップロード
3. 100ファイル制限に収まるよう、必要最小限の差分だけを入れています

## このパッチに含まれる主な修正
- root `index.html` の著者紹介を英語のみへ修正
- 著者写真を小さく表示するための `css/style.css` 修正
- `index.html` / `ja/index.html` / `en/index.html` のSNSリンク追加・確認
- `author/index.html` はトップページ著者セクションへのリダイレクト化
- 検査スクリプト追加

## 注意
- 画像ファイルは入れていません
- 最新GitHub ZIPの画像をそのまま使います
