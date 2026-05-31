# AI of One's Own site patch: author intro + FAQ link cleanup

This patch replaces these files:

```text
index.html
en/index.html
ja/index.html
```

## What changed

- Removed the `FAQ` navigation link from all three pages.
- Kept `Support` as the normal internal site navigation item.
- Restored the English author introduction on `/en/`.
- Added a Japanese author introduction on `/ja/`.
- Changed language-specific support links to the single support root:

```text
https://support.aiofonesown.com
```

## Upload to GitHub

Upload the three files to the same paths in:

```text
NOBORuJP/aiofonesown-site
```

Then commit to `main`.

Recommended commit message:

```text
Restore author sections and remove FAQ nav link
```

## After Cloudflare Pages auto-deploy

Check:

```text
https://aiofonesown.com/
https://aiofonesown.com/en/
https://aiofonesown.com/ja/
```
