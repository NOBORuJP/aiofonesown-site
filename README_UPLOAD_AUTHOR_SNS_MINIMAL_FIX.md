# aiofonesown-site author/SNS minimal fix

## 内容

これは、最新GitHub ZIP `aiofonesown-site-e164c85b622f087aa6f2e7b09ef502e7d84a8087.zip` を正本にした、最小修正パッケージです。

前回のように途中生成物からページ全体を戻さないため、画像やGumroad導線を大きく触りません。

## 変更ファイル

```text
index.html
ja/index.html
en/index.html
css/style.css
tools/check_author_sns_minimal_fix.sh
```

## 変更内容

- `.com` 直下の `index.html` に英語のみの著者紹介を設置
- 著者写真を小さく固定
  - desktop: 72px
  - mobile: 56px
- `index.html` / `ja/index.html` / `en/index.html` にSNSリンクを追加
  - X: https://x.com/aiofonesown
  - Instagram: https://www.instagram.com/aiofonesown
  - Threads: https://www.threads.net/@aiofonesown

## GitHubへの入れ方

ZIPを展開し、中のファイルをGitHubリポジトリrootへ上書きしてください。
ファイル数は少ないため、GitHub Webアップロードの100ファイル制限に収まります。

## 確認

```bash
bash tools/check_author_sns_minimal_fix.sh
```

期待:

```text
AUTHOR SNS MINIMAL FIX CHECK PASSED
```
