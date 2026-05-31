# aiofonesown.com hotfix package — 2026-05-31 v3

このZIPは、以下の修正をGitに入れるための素材一式です。

## 修正内容

1. TOPページの `Author` リンクを削除する。
2. `/updates/` ページの `Author` リンクを削除する。
3. `/updates/` にニュースを2件表示する。
   - 2026-05-28：英語版リリース
   - 2026-05-31：日本語版リリース
4. `/updates/english-early-access-gumroad-release` のGumroadリンクを修正する。
5. `/en` の古い画像2枚を差し替える。
6. `/ja` の古い画像2枚を差し替える。

## 固定URL

| 版 | URL |
|---|---|
| 英語版 | https://noborikuta.gumroad.com/l/aiofonesown-early-access |
| 日本語版 | https://noborikuta.gumroad.com/l/sodateru-ai-early-access |

## 重要

- `/en` の購入リンクは `https://noborikuta.gumroad.com/l/aiofonesown-early-access`。
- `/ja` の購入リンクは `https://noborikuta.gumroad.com/l/sodateru-ai-early-access`。
- `Author` へのナビゲーションリンクは復活させない。
- `/author/` ページ自体が不要なら、該当route/pageを削除または非表示にする。

## 使い方

このZIPを展開し、既存リポジトリの構成に合わせて以下をコピーしてください。

```text
public/assets/gumroad/
public/assets/updates/
src/content/updates/
src/data/product-links.json
snippets/
```

`snippets/` はそのまま公開用ではなく、既存コンポーネントに貼り込むための置換用です。

## 確認コマンド

```bash
bash scripts/find_author_links.sh
bash scripts/verify_links.sh
```

## Git投入例

```bash
git add .
git commit -m "Fix Gumroad links, updates page, and release images"
git push
```
