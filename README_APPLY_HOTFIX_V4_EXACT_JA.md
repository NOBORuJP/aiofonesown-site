# v4 exact hotfix — Gumroadリンク / Updates / Authorリンク修正

これは、以下の指摘を正確に反映するための修正パッケージです。

## 絶対に固定するURL

| ページ | 正しいリンク |
|---|---|
| 英語版 / AI of One’s Own | `https://noborikuta.gumroad.com/l/aiofonesown-early-access` |
| 日本語版 / 育てるAI | `https://noborikuta.gumroad.com/l/sodateru-ai-early-access` |

## 修正対象

1. `/updates/english-early-access-gumroad-release` のGumroadリンクを `https://noborikuta.gumroad.com/l/aiofonesown-early-access` に修正する。
2. 英語版リリースページの日付を **May 28, 2026** にする。
3. `/updates/` にニュースリリースを2件表示する。
   - 2026-05-28: English Early Access Edition
   - 2026-05-31: 育てるAI 日本語版
4. `Author` へのナビゲーションリンクを削除する。
5. `/en` の画像2枚を差し替える。
6. `/ja` の画像2枚を差し替える。
7. 裸の `gumroad.com/l/...` を使わず、必ず `https://noborikuta.gumroad.com/l/...` を使う。

## 画像差し替え

### /en

```text
public/assets/site/en/en-hero-cover.png
public/assets/site/en/en-reader-note-hierarchy.png
```

### /ja

```text
public/assets/site/ja/ja-hero-cover.png
public/assets/site/ja/ja-reader-note-hierarchy.png
```

## Updatesページ

`snippets/updates_index_cards.html` に、2件表示用のカードHTMLを入れています。

## 自動補助スクリプト

まずドライラン：

```bash
python3 scripts/apply_common_hotfixes.py
```

適用：

```bash
python3 scripts/apply_common_hotfixes.py --apply
```

確認：

```bash
bash scripts/audit_site_exact.sh
```

## Git投入例

```bash
git add .
git commit -m "Fix Gumroad release links and updates page"
git push
```

## 最終確認

- [ ] `/updates/` に2件出ている
- [ ] `/updates/english-early-access-gumroad-release` の日付が May 28, 2026
- [ ] `/updates/english-early-access-gumroad-release` のGumroadリンクが `https://noborikuta.gumroad.com/l/aiofonesown-early-access`
- [ ] 日本語版のGumroadリンクが `https://noborikuta.gumroad.com/l/sodateru-ai-early-access`
- [ ] `gumroad.com/l/...` ではなく、すべて `https://noborikuta.gumroad.com/l/...`
- [ ] ナビゲーションに `Author` がない
- [ ] `/en` の画像が差し替わっている
- [ ] `/ja` の画像が差し替わっている
