# AI of One’s Own / 育てるAI Official Site v0.1

This is a static website package for the first official public-record site.

## Recommended deployment

Recommended: **GitHub repository + Cloudflare Pages**.

- GitHub keeps a public commit history.
- Cloudflare Pages handles the custom domain and delivery.
- Use `aiofonesown.com` as the production domain.

## Cloudflare Pages settings

- Framework preset: None
- Build command: leave blank
- Output directory: `/`
- Production branch: `main`

## Custom domains

Add these in Cloudflare Pages > Custom domains:

- `aiofonesown.com`
- `www.aiofonesown.com` if needed

## Important

Do not put private files, unpublished manuscripts, API keys, `.env` files, logs, database files, or customer records in this repository.

## Files

- `index.html` — global top page
- `ja/index.html` — Japanese page
- `en/index.html` — English page
- `updates/index.html` — public timeline
- `support/index.html` — support guidance
- `assets/` — official images
- `CHANGELOG.md` — release record
- `CNAME` — custom domain declaration for GitHub Pages compatibility
