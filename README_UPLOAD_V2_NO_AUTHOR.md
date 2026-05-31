# AI of One's Own / 育てるAI Site Update Package v2

作成日: 2026-05-30  
版: v2_no_author

## 修正内容

前版からの修正点は以下です。

1. 英語版正式リリース告知のリンク先を、英語版Gumroad正式URLに固定。
2. Author / 著者紹介 の専用ページを作らない方針へ変更。
3. Authorページへのナビゲーションリンクを削除するパッチを追加。
4. トップページ内の著者紹介は残す前提。
5. 日本語版は「今晩〜明朝公開予定」のまま。

## 英語版Gumroad正式URL

```text
https://noborikuta.gumroad.com/l/aiofonesown-early-access
```

このURLを英語版リリース告知のリンク先として使ってください。  
日本語版Gumroad URLと混ぜないでください。

## 画像

```text
assets/images/aiofonesown-hero-en.png
assets/images/aiofonesown-logo-en-square.png
assets/images/sodateru-ai-hero-ja.png
assets/images/sodateru-ai-logo-ja-square.png
```

## そのまま使えるHTML断片

```text
snippets/updates-en-20260530-english-release.html
snippets/updates-ja-20260530-english-release.html
snippets/hero-en.html
snippets/hero-ja.html
snippets/header-logo-en.html
snippets/header-logo-ja.html
snippets/nav-en-no-author.html
snippets/nav-ja-no-author.html
```

## Authorページ削除方針

削除するもの:

```text
Author専用ページ
Authorページへのリンク
About the Author専用ページ
著者紹介だけの独立ページ
```

残すもの:

```text
トップページ内の短い著者紹介
既存ページ中の自然な著者紹介セクション
```

## パッチスクリプト

GitHubリポジトリをローカルに持っている場合、リポジトリrootで以下を実行できます。

```bash
bash path/to/aiofonesown_site_update_20260530_v2_no_author/patch/apply_site_patch_no_author_v2.sh
```

実行内容:

- 新画像を `assets/images/` へコピー
- Author専用ページ候補を `.disabled_YYYYMMDD-HHMMSS` にリネーム
- Authorナビゲーションリンク候補をHTML/MDから削除
- UPDATES用Markdownを `updates/` にコピー
- GumroadリンクとAuthorリンク残存候補を表示

確認:

```bash
bash path/to/aiofonesown_site_update_20260530_v2_no_author/patch/check_site_after_patch.sh
```

## 手動アップロードの場合

1. `assets/images/` 内の4画像をサイト側の同じ場所へアップロード。
2. 英語版トップ画像を `/assets/images/aiofonesown-hero-en.png` に差し替え。
3. 日本語版トップ画像を `/assets/images/sodateru-ai-hero-ja.png` に差し替え。
4. 英語版UPDATESへ `snippets/updates-en-20260530-english-release.html` を貼る。
5. 日本語版UPDATESへ `snippets/updates-ja-20260530-english-release.html` を貼る。
6. Authorページへのリンクを削除。
7. Author専用ページは公開しない。
8. Gumroad英語版リンクが必ず `https://noborikuta.gumroad.com/l/aiofonesown-early-access` になっていることを確認。

## 注意

- 生成AI動画工場のページやRAGとは混ぜない。
- 日本語版Gumroadリンクと英語版Gumroadリンクを混ぜない。
- 日本語版公開後は「今晩〜明朝公開予定」の文言を「公開しました」に更新する。
