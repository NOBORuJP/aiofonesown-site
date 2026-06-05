# Kindle release update patch

## Purpose

This patch adds a combined Kindle release announcement for:

- English edition: AI of One’s Own
- Japanese edition: 育てるAI

## Kindle URLs

English Kindle:

```text
https://www.amazon.com/dp/B0GX2WFTTZ
```

Japanese Kindle:

```text
https://www.amazon.co.jp/dp/B0H3ZSMFMH
```

## Files to upload to GitHub root

```text
updates/index.html
news/index.html
news/kindle-release-ai-of-ones-own-and-sodateru-ai.html
tools/check_kindle_release_update.sh
```

The `social_posts/` folder is for copy/paste use and does not have to be uploaded to the public website unless you want to keep records in the repository.

## Check

```bash
bash tools/check_kindle_release_update.sh
```

Expected:

```text
KINDLE RELEASE UPDATE CHECK PASSED
```
