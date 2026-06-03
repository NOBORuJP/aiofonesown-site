# aiofonesown-site recovered from latest GitHub ZIP

## 重要

このZIPは、あなたがアップロードした最新GitHub ZIPだけを正本にして作り直した復旧版です。

```text
aiofonesown-site-e164c85b622f087aa6f2e7b09ef502e7d84a8087.zip
```

途中生成物や過去のv9/v8/v7断片パッチは使っていません。

## 目的

デグレ解消を最優先しています。

- 画像を勝手に古い生成物へ戻さない
- 既存サイト構成を保つ
- 最小限の修正だけを加える
- GitHubへ中身をそのまま上書きできる形式にする

## 修正内容

1. `.com` 直下 `index.html` の著者紹介を英語のみへ変更
2. 著者写真を小さく表示
   - PC: 72px
   - Mobile: 56px
3. `index.html` / `ja/index.html` / `en/index.html` にSNSリンクを確認・追加
   - X: https://x.com/aiofonesown
   - Instagram: https://www.instagram.com/aiofonesown
   - Threads: https://www.threads.net/@aiofonesown
4. 既知の古いデッドリンク `https://gumroad.com/aiofonesown` を修正
5. standalone `author/index.html` がある場合はトップページ著者セクションへのリダイレクト化

## 画像について

今回、画像ファイルの一括置換はしていません。  
最新GitHub ZIPに入っていた画像を基準に維持しています。

## GitHubアップロード方法

ZIPを展開し、リポジトリrootへ中身をそのまま上書きしてください。

## 検査

```bash
bash tools/check_recovery_from_latest.sh
```

期待:

```text
RECOVERY CHECK PASSED
```

## 正式リンク

English Gumroad:

```text
https://noborikuta.gumroad.com/l/aiofonesown-early-access
```

Japanese Gumroad:

```text
https://noborikuta.gumroad.com/l/sodateru-ai-early-access
```
