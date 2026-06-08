# Udemy URL only fix v9

## 方針

ページ崩れを避けるため、今回は **CSSを一切含めていません**。  
クーポン告知も入れていません。  
Udemy宛のURLだけを正式な通常紹介URLに修正します。

## 修正後のUdemy URL

English:

```text
https://www.udemy.com/course/aionesown/?referralCode=C8E43BDE282665E35B61
```

Japanese:

```text
https://www.udemy.com/course/aionesown-ja/?referralCode=5F2A4FDAD2C129070F86
```

## GitHubに上書きするファイル

このZIPに入っているHTML/TXTだけを上書きしてください。

```text
index.html
en/index.html
ja/index.html
updates/index.html
news/index.html
social_posts/*.txt
```

## 含めていないもの

```text
css/style.css
assets/
coupon URL
free review coupon URL
```

つまり、レイアウトや画像・動画には触りません。
