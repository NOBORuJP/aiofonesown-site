# GitHub Web Upload Batch v7 / 100 files limit対応版

このZIPは、GitHub Web画面の「一度に100ファイルまで」制限に合わせた、**必要ファイルだけの更新パッケージ**です。

## ファイル数

このパッケージは100ファイル未満です。展開後、この中身をGitHubリポジトリrootへアップロードしてください。

## 反映内容

- `.com` 直下 `index.html` に顔写真付き著者紹介を掲載
- `/ja/index.html` から著者紹介カードを削除
- `index.html`, `/ja/index.html`, `/en/index.html` にSNSリンク3種を掲載
- 英語版Gumroadリンクを修正
- 日本語版Gumroadリンクを修正
- 2026年5月29日 英語版リリース
- 2026年5月31日 日本語版リリース
- 画像ファイルを既存HTML参照名で上書き
- `author/index.html` はトップページへのリダイレクトに変更

## 正しいURL

英語版:
https://noborikuta.gumroad.com/l/aiofonesown-early-access

日本語版:
https://noborikuta.gumroad.com/l/sodateru-ai-early-access

SNS:
- https://x.com/aiofonesown
- https://www.instagram.com/aiofonesown
- https://www.threads.net/@aiofonesown

## アップロード方法

1. このZIPを展開する。
2. 中のファイル/フォルダをすべて選択する。
3. GitHubの `aiofonesown-site` リポジトリrootへドラッグ＆ドロップでアップロードする。
4. Commit changes を押す。
5. Cloudflare Pagesの反映を待つ。

## 注意

GitHub Webアップロードは既存ファイルの削除が弱いため、`author/` フォルダを完全削除できない場合があります。そのため、このパッケージでは `author/index.html` をトップページへのリダイレクトにしています。

## 確認

ローカルで確認できる場合:

```bash
bash tools/check_github_web_upload_batch_v7.sh
```

期待値:

```text
ALL CORE CHECKS PASSED
```
