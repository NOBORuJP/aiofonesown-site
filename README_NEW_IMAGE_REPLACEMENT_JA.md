# 新画像差し替えパッチ

## 目的

ウェブサイトに残っている古い画像を、今日渡した新しい画像へ差し替えます。

## 新しい画像

- 英語版トップ横長画像: `01_top_mainen.png`
- 日本語版トップ横長画像: `01_top_mainja.png`
- 英語版正方形画像: `thumbnail_en_1x1.png`
- 日本語版正方形画像: `thumbnail_ja_1x1.png`

## GitHubへアップロードするファイル

このZIPを展開して、中のファイルをGitHubリポジトリrootへそのまま上書きしてください。

入っている画像は以下です。

```text
assets/en-hero-wide.png
assets/ja-hero-wide.png
assets/en-cover-square.png
assets/ja-cover-square.png
en-hero-wide.png
ja-hero-wide.png
en-cover-square.png
ja-cover-square.png
```

## なぜ8ファイルあるのか

既存HTMLが `/assets/...` を参照している可能性が高い一方で、過去のZIPにはroot直下にも同名画像がありました。

そのため、今回は安全のために両方へ同じ新画像を入れています。

## 反映確認

GitHubへアップロード後、Cloudflare Pagesの反映を待ってから、ブラウザでハードリロードしてください。

Mac Chrome:

```text
Shift + Command + R
```

または、URL末尾に `?v=newimg` を付けて確認してください。
