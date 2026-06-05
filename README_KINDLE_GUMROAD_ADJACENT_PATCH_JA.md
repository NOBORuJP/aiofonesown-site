# Kindle/Gumroad 隣接ボタン + 著者写真調整パッチ

## 修正内容

- Gumroadを下部の「Template Pack」セクション扱いにするのをやめました。
- Kindleボタンの隣にGumroadボタンを配置しました。
- 対象:
  - `index.html`
  - `en/index.html`
  - `ja/index.html`
- 著者写真を少し大きく、四角い窓で表示するようにしました。
  - PC: 148px
  - Mobile: 108px
  - 角丸四角

## GitHubへアップロードするファイル

```text
index.html
en/index.html
ja/index.html
css/style.css
tools/check_kindle_gumroad_adjacent_patch.sh
```

## 確認

```bash
bash tools/check_kindle_gumroad_adjacent_patch.sh
```
