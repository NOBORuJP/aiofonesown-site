# Promo autoplay + thumbnail correction v6

## 修正内容

1. 英語版・日本語版プロモ動画のサムネイルを、動画本体の約5秒地点のフレームに変更しました。
2. 対象ページ:
   - `/`
   - `/en/`
   - `/ja/`
3. 動画タグに `autoplay muted loop playsinline controls` を設定しました。

## 重要

ブラウザは音声付き自動再生をブロックするため、自動再生は `muted` 付きです。  
ユーザーが音声を聞きたい場合は、動画側でミュート解除します。

## GitHubに上書きする主なファイル

```text
index.html
en/index.html
ja/index.html
css/style.css
assets/promo/ai_of_ones_own_promo_en_web.mp4
assets/promo/sodateru_ai_promo_ja_web.mp4
assets/promo/ai_of_ones_own_promo_thumbnail.jpg
assets/promo/sodateru_ai_promo_thumbnail.jpg
```
