# Updatesページ 英語デフォルト化パッチ

## 目的

`.com` 直下の `/updates/` を英語デフォルトページに戻します。

## 修正内容

- `updates/index.html` を英語ページへ差し替え
- 2026年5月29日：AI of One’s Own 英語版リリース
- 2026年5月31日：育てるAI 日本語版リリース
- 英語版Gumroadリンクを正しく設定
- 日本語版Gumroadリンクを正しく設定
- SNSリンクもfooterに設定
- 日本語専用サイトは将来 `.jp` 側へ分離する前提

## GitHubアップロード方法

ZIPを展開して、以下のファイルをGitHubの同じ場所へ上書きしてください。

```text
updates/index.html
```

## 確認

```bash
bash tools/check_updates_english_default.sh
```

期待:

```text
UPDATES ENGLISH DEFAULT CHECK PASSED
```
