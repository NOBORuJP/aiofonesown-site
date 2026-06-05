# レイアウト微調整パッチ v11

## 修正内容

### 1. トップページのボタン幅を揃える

.com直下 `index.html` の上部ボタンで、Kindle / Gumroad / Japanese Kindle / Updates のサイズが揃うようにしました。

将来 Udemy ボタンを横に追加しても並べやすいように、コンパクトな固定幅ボタンにしています。

### 2. 著者紹介カードの横幅を上の2つのカード幅に合わせる

著者紹介カードが上の2つの窓より狭く見えていたため、rootページのコンテンツ幅いっぱいに合わせました。

### 3. 著者写真

写真は前回より少しだけ大きくし、角丸の四角い窓にしています。

- PC: 152px
- Mobile: 104px

## GitHubにアップロードするファイル

```text
index.html
css/style.css
```

実際の見た目調整は `css/style.css` 側で行っています。  
`index.html` は安全のため、現在のKindle/Gumroad隣接ボタン版を同梱しています。

## 確認

```bash
bash tools/check_layout_fix_buttons_author_card.sh
```

期待:

```text
LAYOUT FIX CHECK PASSED
```
