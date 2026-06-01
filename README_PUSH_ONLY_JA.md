# Git push用：AI of One’s Own / 育てるAI 公式サイト 完全版

このフォルダは、現在の指摘を反映した **静的サイト一式** です。

## 固定URL

- 英語版: https://noborikuta.gumroad.com/l/aiofonesown-early-access
- 日本語版: https://noborikuta.gumroad.com/l/sodateru-ai-early-access

## 反映済み

- `/en/` のGumroadリンク修正
- `/ja/` のGumroadリンク修正
- `/updates/` に2件表示
  - May 28, 2026: English Early Access Edition
  - May 31, 2026: 育てるAI — 先行アクセス版
- `/updates/english-early-access-gumroad-release/` の日付・内容・リンク修正
- `/updates/sodateru-ai-early-access-gumroad-release/` 追加
- Authorナビ削除
- `/author/` ページは含めない
- 画像はアップロード済みの手元ファイルを使用

## 既存リポジトリへの投入例

WebサイトGitリポジトリの直下で実行してください。

```bash
# 必ずWebサイトのGitリポジトリで実行
pwd

# 古いページと画像を消してから展開する場合
rm -rf assets css en ja updates support author

# このZIPを展開済みフォルダからコピー、またはZIPを直接展開
# 例: 展開済みフォルダをrepoへコピー
rsync -av /path/to/aiofonesown_site_PUSH_READY_20260601/ ./

git status
git add -A
git commit -m "Publish final official site updates"
git push
```

## 重要

`SODATERU_AI_SOURCE_CODE_SET...` ではなく、WebサイトのGitリポジトリに入れてください。
