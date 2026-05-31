# AI of One's Own site patch: Gumroad links + deploy guide

This patch replaces:

```text
index.html
en/index.html
ja/index.html
```

## Added Gumroad links

Japanese:

```text
https://gumroad.com/l/sodateru-ai-early-access
```

English:

```text
https://gumroad.com/l/ai-of-ones-own-early-access
```

If Gumroad's product dashboard `Copy URL` shows a different URL, replace the URL before uploading.

## What this patch does

- Removes the FAQ navigation link.
- Keeps Support in the header.
- Adds Gumroad links to the Japanese Early Access section.
- Adds Gumroad links to the English Early Access section.
- Restores / adds author introduction sections.
- Uses a single support URL: `https://support.aiofonesown.com`.

## Deployment steps

1. Open GitHub repository: `NOBORuJP/aiofonesown-site`
2. Replace these three files:
   - `index.html`
   - `en/index.html`
   - `ja/index.html`
3. Commit to the `main` branch.

Recommended commit message:

```text
Add Gumroad links and restore author sections
```

4. Open Cloudflare:
   - Workers & Pages
   - aiofonesown-site
   - Deployments
5. Confirm a new deployment appears and ends as `Success`.

## If Cloudflare does not deploy automatically

Go to:

```text
Workers & Pages
→ aiofonesown-site
→ Deployments
→ latest Production deployment
→ ...
→ Retry deployment
```

If still no new deployment appears, check:

```text
Settings
→ Builds and deployments
→ Production branch: main
→ Automatic production branch deployments: enabled
```

## Post-deploy checks

```text
https://aiofonesown.com/
https://aiofonesown.com/en/
https://aiofonesown.com/ja/
```

Confirm:
- FAQ link is gone from the header.
- Japanese Early Access links to `https://gumroad.com/l/sodateru-ai-early-access`.
- English Early Access links to `https://gumroad.com/l/ai-of-ones-own-early-access`.
- Author sections appear in both `/en/` and `/ja/`.
