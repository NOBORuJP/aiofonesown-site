# ローカル確認の手順(GitHubへ上げる前に)

## 起動(いちばん簡単な方法)

**`preview.command` をダブルクリック**してください。サーバーが立ち上がり、ブラウザが自動で http://localhost:8080/ を開きます。
初回はmacOSが警告を出す場合があります → その時は `preview.command` を**右クリック→「開く」**で許可してください。

ターミナル派は、このフォルダ(aiofonesown-site-main)の**中で**:

```bash
python3 -m http.server 8080
```

## よくあるつまずき(前回の症状はこれです)

- **「トップだけ見えて他のリンクが死ぬ」** → 原因は2つのどちらかです:
  1. サーバーを**1つ上のフォルダ**で起動した(リンクは `/ja/` のような絶対パスなので、起動場所がサイトルートでないと切れます)
  2. `index.html` を**ダブルクリックで直接開いた**(file:// では絶対パスのリンクは全滅します)
- `preview.command` はどこに置かれていても自動で正しいフォルダに入って起動するので、これを使えば両方とも起きません。

- `/` … **AI of One's Own(英語版が正式トップ)** — ヒーローに「日本語版はこちら →」併置
- `/ja/` … 育てるAI(全面改修版)
- `/en/` … 旧URL互換の即時リダイレクト(→ `/`)。プレス等の既存リンクは切れません
- `/updates/` `/support/` `/news/` … 既存のまま(今回は未改修)

## 今回の変更点

1. `ja/index.html` `en/index.html` を全面改修(コアステートメント前面・借りる/所有の二色設計・ブロンズ帯・立ち読みPDFはプレビューセクション内へ)
2. `index.html`(ルート)を言語ゲートに刷新
3. favicon一式をルートに配備(favicon.svg / .ico / 各PNG / apple-touch-icon / icon-192 / icon-512)
4. Udemyリンクを正式URLに統一(README_UDEMY_URL_FIX_V7B準拠: EN=aionesown / JA=aionesown-ja、各リファラルコード付き)
5. ENの立ち読みPDFを実パス(`/assets/previews/ai-of-ones-own-free-preview.pdf`)で組み込み
6. OGP画像を `assets/og/` の正規1200×630に統一
7. **css/style.css をブランドトークンで全面書き直し** — updates / news / support / author 等のレガシー全ページが新テイスト(ネイビー×金・serif見出し)に統一されます。HTML構造は無変更
8. **動画は日英ともフルバージョンで統一**(Xの視聴データに基づく決定)。両言語の動画にposter追加。`ai_of_ones_own_promo_en_60s_web.mp4`(1.7MB)は将来のX投稿用にassetsに残置(未参照)
9. **動画→立ち読みの順に入替**、立ち読みPDFはカルーセル下の横長ストリップに再設計(縦横の高さ不一致を解消)
10. **言語ゲートを廃止し、英語版をルートに昇格**。`/en/`はmeta-refreshの互換リダイレクトとして残置。全ページのナビ「English」を`/`に統一。hreflang更新済み

## 注意

- 見出しフォント(Noto Serif JP)はGoogle Fontsから読み込むため、オフラインでは代替セリフで表示されます(オンラインなら正常)。
- 既存の `css/style.css` と `js/preview-carousel.js` は新ページでは未使用ですが、updates/news等が使うため残しています。
