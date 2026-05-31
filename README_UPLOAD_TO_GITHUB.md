# Priority site patch: Updates + Author page

This patch does two urgent things:

1. Records that the English Early Access Edition was released on Gumroad.
2. Adds an author profile page.

## Upload these folders to the repository root

```text
updates/
author/
```

This creates:

```text
https://aiofonesown.com/updates/
https://aiofonesown.com/updates/english-early-access-gumroad-release.html
https://aiofonesown.com/author/
```

## Gumroad URL used

```text
https://gumroad.com/l/sodateru-ai-early-access
```

If Gumroad's product dashboard Copy URL shows a different URL, replace it before uploading.

## Optional homepage snippet

If you want the release record visible on the homepage, paste:

```text
snippets/homepage-updates-english-gumroad-release.html
```

into `index.html`.

## Optional nav link

If you want an Author link in the site header, add:

```html
<a href="/author/">Author</a>
```

## Commit message

```text
Add English Gumroad release update and author page
```

## Cloudflare build error fix

If Cloudflare logs show:

```text
Executing user command: exit0
/bin/sh: 1: exit0: not found
```

fix the Cloudflare Pages build settings:

```text
Build command: exit 0
Build output directory: .
Root directory: empty
```

Then retry deployment.
