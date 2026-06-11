# GitHubへの差分アップロード手順(30ファイル)

このフォルダには**今回変更・追加したファイルだけ**が、リポジトリと同じ階層構造で入っています。
GitHubのWeb画面は1回100ファイルまでなので、これなら1回で収まります。

## 手順(Web画面)

1. GitHubでリポジトリ(aiofonesown-site)を開く
2. **Add file → Upload files**
3. Finderでこのフォルダ(aiofonesown-site-upload)を開き、**中身を全選択**(⌘A)して、GitHubのアップロード枠に**フォルダごとドラッグ**
   - フォルダをドラッグすれば `ja/index.html` などの階層は自動で保持されます
   - ※ファイルを個別にドラッグすると階層が消えるので、必ずフォルダ単位で
4. Commit message例: `Brand redesign: statement-first ja/en, EN as root, legacy CSS reskin, canonical links`
5. **Commit changes** → GitHub Pagesが1〜2分で再デプロイ

## 同梱ファイルの内訳

- ルート: `index.html`(英語版=正式トップ) / favicon一式8ファイル / `preview.sh` `preview.command` `README_LOCAL_PREVIEW_JA.md`(ローカル確認用・任意)
- `ja/` `en/`: 改修版(enは互換リダイレクト)
- `css/style.css`: レガシー全ページのブランド刷新
- `updates/` `news/` `support/` `snippets/` `en/updates/`: ナビ統一+正規リンク修正済みの既存ページ
- `assets/promo/ai_of_ones_own_promo_en_60s_web.mp4`: 60秒web版(未参照・将来のX用、任意)

## 補足

- リポジトリ内の `GITHUB_UPLOAD_ROOT/` は過去のステージング用コピー(サイト非表示)のため今回は触っていません。いずれ削除しても問題ありません。
- 今後ターミナルでやる場合は100制限はありません: リポジトリのクローン内で
  `git add -A && git commit -m "update" && git push`
