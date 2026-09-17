# WASAN v21: publication and source-credit checklist

AI NOBORU — https://www.aiofonesown.com/

## Install without replacing the existing home page

Use `downloads/AI-NOBORu-aiofonesown-kit.zip`. Its `wasan/` folder is the complete
bilingual site. Place that folder under the existing website's public root.

- Japanese: `/wasan/`
- English: `/wasan/en/`
- Text-only English calculator reference: `/wasan/en/calculators.html`
- Download pages: `/wasan/downloads.html` and `/wasan/en/downloads.html`

The kit includes separate English/Japanese script and iframe examples. Download
URLs are resolved relative to `ainoboru-download.js`. The visible source link is
fixed to the official website even when the files are hosted on another domain.
No tracking, hostname allowlist or automatic redirect is added.

The ordinary site-download ZIPs contain both language editions and research ZIPs.
They do not nest other full-site ZIPs. In those extracted copies, links that would
otherwise point to omitted full-site ZIPs are replaced with an explanatory notice.
The installation kit, by contrast, includes both full-site downloads so a newly
installed website can offer them. Only its link to the installation kit itself is
replaced: the kit cannot recursively contain itself.

## Check the public server after uploading

Open the English page in a signed-out/private window. Do not rely on the publisher's
logged-in browser. Confirm the HTML, .mjs modules, styles, SVGs and downloaded ZIPs
return successful responses without login, an access challenge, or a permission page.
A successful response for the home page does not prove the English subdirectory is public.

Serve `.mjs` as `text/javascript` or another supported JavaScript MIME type. Do not
serve missing JS paths by returning the HTML home page. Where CSP is enabled,
check that it permits the actual module and import-map setup; do not disable
security protections site-wide. Confirm the download ZIP matches the delivered
file by SHA-256 and clear only the relevant stale cache if necessary.

For ChatGPT Sites, check the site's actual sharing scope and publish the new
revision. A ZIP attachment in a chat does not change that site's sharing settings.
This package cannot read or modify those account settings.

## Public reading and AI retrieval are separate checks

The HTML has no authentication code or noindex/nofollow directive. The added
calculator reference is plain HTML and can be read without running JavaScript.
This does not guarantee that every AI service has browsing enabled or that its
crawler can reach your server. Ask a browsing-enabled AI to open the exact public
English URL and quote a current result label and the source-credit line.

Review the host's existing robots.txt, response headers and any CDN/bot challenge
for `/wasan/`. Do not overwrite the existing site's root robots.txt with a blanket
rule. Search/retrieval access and permission to use content for model training are
not the same decision. No crawler or training policy file is installed by this kit.

## Test the actual copy and download paths

Run one calculation and use **Copy result**. The pasted text should end with
`AI NOBORU — https://www.aiofonesown.com/`. When clipboard access is denied,
selecting the answer should also include the visible credit. Print a multi-page
article with background graphics turned off and check the credit on every page.
Download each SVG: the credit must be inside the SVG, not just on the web page.
Extract each site ZIP: open its English entry point through a web server and check
that it is this v21 revision, not the earlier version-18 Japanese package.

A person can remove a credit, edit the files or crop an image. These marks identify
the source during ordinary reuse; they are not DRM or a new license for third-party
work. Research numeric data remain unchanged and are accompanied by source notices.

## What this delivery has not done

No upload, hosting-permission change, CDN change, production restart or root
configuration change has been made. Final public-access acceptance must be based
on the deployed files, not on the presence of this checklist.

## Technical references

- JavaScript modules and MIME types: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- OpenAI search and training crawler controls: https://developers.openai.com/api/docs/bots
- ChatGPT Sites sharing and publishing: https://learn.chatgpt.com/docs/sites

## 日本語の要点

公式サイトのトップページは上書きせず、キットの `wasan/` フォルダを配置します。
英語入口は `/wasan/en/`、JavaScript不要の説明は `/wasan/en/calculators.html`。
公開可否はログアウト状態で、ページ・モジュール・図・ZIPそれぞれを確認します。
robots.txtや認証設定は既存サイト全体を上書きしません。AIによる検索・閲覧と
学習利用の扱いは別です。署名は通常の再配布で提供元を案内するためのもので、
削除や切抜きを防ぐものではありません。実際の公開・権限変更は未実施です。

## Print compatibility / 印刷互換性

Repeating print credits use CSS page-margin boxes. They were verified in the recorded Chromium build with background printing disabled. A browser that does not support page-margin boxes still prints the ordinary page and result credits, but a credit on every page is not guaranteed. Print settings can override page margins.

各ページ下部の署名にはCSSのページ余白欄を使います。記録したChromiumでは背景印刷を無効にして確認しました。未対応ブラウザーでも通常のページ署名・結果署名は残りますが、全ページへの繰り返しは保証しません。印刷設定で余白が変更される場合もあります。
