# 著者紹介 英語版のみ差し替え v9

## 目的

.com直下 `index.html` の著者紹介を、日本語混在から英語のみの公式プロフィールへ差し替えます。

## 修正内容

- root `index.html` の著者紹介文を英語のみに変更
- 日本語の著者紹介文を削除
- 著者写真のコンパクト表示を維持
  - デスクトップ: 72px
  - モバイル: 56px
- SNSリンクは維持
  - X
  - Instagram
  - Threads

## GitHubへアップロードするファイル

ZIPを展開して、以下2ファイルだけをGitHubの同じ場所へ上書きしてください。

```text
index.html
css/style.css
```

## 反映確認

```bash
bash tools/check_author_english_only_v9.sh
```

期待:

```text
AUTHOR ENGLISH-ONLY PATCH OK
```

## 注意

- `/ja/index.html` と `/en/index.html` は変更していません。
- Gumroadリンクは変更していません。
- 著者専用ページは作っていません。
