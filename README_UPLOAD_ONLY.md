# GitHub upload-only package

This package is prepared so you do NOT need to manually edit HTML.

## What to upload

Upload the CONTENTS of this folder to the root of the GitHub repository:

```text
GITHUB_UPLOAD_ROOT/
```

Repository:

```text
NOBORuJP/aiofonesown-site
```

It contains:

```text
en/index.html
ja/index.html
assets/book-preview/en/*.png
assets/book-preview/ja/*.png
css/preview-carousel.css
js/preview-carousel.js
```

## Important

Do not upload this ZIP file itself to GitHub.
Unzip it, open `GITHUB_UPLOAD_ROOT`, then drag the files/folders inside it into the GitHub repository root.

No copy-paste editing is required.

## Commit message

```text
Add book preview carousels to English and Japanese pages
```

## Check after Cloudflare deployment

```text
https://www.aiofonesown.com/en/
https://www.aiofonesown.com/ja/
```

Confirm:
- the carousel appears on both pages
- arrows work
- dots work
- mobile horizontal swipe works
- images 02 through 07 appear
