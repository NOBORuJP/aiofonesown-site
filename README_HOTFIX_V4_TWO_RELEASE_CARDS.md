# HOTFIX v4: リリース日修正 / 2枚告知 / Gumroadリンク修正 / Authorページ削除

## 正しい時系列

```text
2026年5月29日：英語版 AI of One’s Own サービス開始
2026年5月31日：日本語版 育てるAI サービス開始
```

したがって、UPDATES / uploadページには告知カードが2枚必要です。

1. 2026年5月29日 英語版リリース
2. 2026年5月31日 日本語版リリース

## 正しいURL

英語版:

```text
https://noborikuta.gumroad.com/l/aiofonesown-early-access
```

日本語版:

```text
https://noborikuta.gumroad.com/l/sodateru-ai-early-access
```

## このZIPの目的

前回の誤りを修正します。

- 英語版リリース日を 5/29 に戻す
- 日本語版リリース日を 5/31 として追加する
- UPDATES / uploadページに2枚の告知を載せる
- `/en` 配下のGumroadリンクを英語版へ修正する
- 日本語版リリースカードには日本語版Gumroadリンクを使う
- Author専用ページとAuthorリンクを削除する
- トップページ内の著者紹介は残す

## 自動パッチ

サイトリポジトリrootで実行します。

```bash
bash path/to/aiofonesown_site_hotfix_v4_two_release_cards_20260531/patch/hotfix_v4_two_release_cards.sh
```

確認:

```bash
bash path/to/aiofonesown_site_hotfix_v4_two_release_cards_20260531/patch/check_hotfix_v4.sh
```

## 手動で貼る場合

日本語UPDATESに貼る:

```text
snippets/updates-section-ja-two-release-cards.html
```

英語UPDATESに貼る:

```text
snippets/updates-section-en-two-release-cards.html
```

単体カード:

```text
snippets/update-card-ja-2026-05-29-english-release.html
snippets/update-card-ja-2026-05-31-japanese-release.html
snippets/update-card-en-2026-05-29-english-release.html
snippets/update-card-en-2026-05-31-japanese-release.html
```

## 注意

- 5/30を英語版リリース日として使わない。
- 英語版リリース告知を消さない。
- 日本語版リリース告知を追加する。
- Authorページを作らない。
- 日本語版と英語版のGumroadリンクを混ぜない。
