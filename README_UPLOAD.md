# AI of One's Own / 育てるAI Site Update Package

作成日: 2026-05-30

このフォルダは、公式サイトへそのままアップロードできるように整理した更新パッケージです。

## 1. 画像ファイル

以下をGitHubリポジトリまたはサイトの同じパスへアップロードしてください。

```text
assets/images/aiofonesown-hero-en.png
assets/images/sodateru-ai-hero-ja.png
assets/images/aiofonesown-logo-en-square.png
assets/images/sodateru-ai-logo-ja-square.png
```

使い分け:

```text
英語トップページ メインビジュアル: assets/images/aiofonesown-hero-en.png
日本語トップページ メインビジュアル: assets/images/sodateru-ai-hero-ja.png
英語ヘッダー/小型ロゴ: assets/images/aiofonesown-logo-en-square.png
日本語ヘッダー/小型ロゴ: assets/images/sodateru-ai-logo-ja-square.png
```

## 2. UPDATES掲載内容

そのまま貼れるHTML:

```text
snippets/updates-en-20260530-gumroad-release.html
snippets/updates-ja-20260530-gumroad-release.html
```

Markdown版:

```text
updates/2026-05-30-en-ai-of-ones-own-release.md
updates/2026-05-30-ja-ai-of-ones-own-en-release.md
```

単体HTMLページ版:

```text
updates/updates-en.html
updates/updates-ja.html
```

## 3. Gumroad英語版URL

```text
https://noborikuta.gumroad.com/l/aiofonesown-early-access
```

## 4. リリース日表記

```text
日本時間 2026年5月30日
May 30, 2026 (JST)
```

## 5. 日本語版ステータス

現時点の文案では以下の扱いです。

```text
日本語版「育てるAI 先行アクセス版」は今晩から明朝にかけて公開予定。
```

日本語版公開後は、この文を「公開しました」に更新してください。

## 6. 推奨アップロード手順

1. GitHubリポジトリ `aiofonesown-site` を開く。
2. このZIP内の `assets/images/` をサイト側の `assets/images/` にアップロードする。
3. 既存トップページの画像参照を以下へ差し替える。
   - English: `/assets/images/aiofonesown-hero-en.png`
   - Japanese: `/assets/images/sodateru-ai-hero-ja.png`
4. ヘッダーロゴを以下へ差し替える。
   - English: `/assets/images/aiofonesown-logo-en-square.png`
   - Japanese: `/assets/images/sodateru-ai-logo-ja-square.png`
5. UPDATESページへHTML断片を追加する。
6. Cloudflare Pagesの自動デプロイ完了後、以下を確認する。
   - `https://aiofonesown.com`
   - `https://www.aiofonesown.com`
   - Gumroadリンクが新規タブで開くこと

## 7. 注意

- 生成AI動画工場の素材やRAGとは混ぜない。
- 日本語版と英語版の導線は混ぜない。
- サポート本体は `https://support.aiofonesown.com`。
- Gumroad英語版URLは `https://noborikuta.gumroad.com/l/aiofonesown-early-access`。
