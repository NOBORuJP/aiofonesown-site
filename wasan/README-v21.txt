WASAN v21 — Final language and distribution review
AI NOBORU — https://www.aiofonesown.com/
FINAL DISTRIBUTION REVIEW — 2026-09-16

The version remains v21. This revision replaces the earlier v21 packages.
English: en/index.html#sangaku
Japanese: index.html#sangaku
Text-only English reference: en/calculators.html
Downloads: en/downloads.html or downloads.html

This package adds readable source credits to diagrams, copied answers and printed
pages. The source link remains https://www.aiofonesown.com/ when the files are
hosted elsewhere. It does not identify visitors, send tracking requests, prevent
editing, or force a redirect to the official website.

The English growth description now uses "1 step" rather than "1 times". The
circle-chain explanation now uses 360 degrees divided by an angle in degrees.
The underlying radian-based arithmetic is unchanged; only that Japanese display
sentence and its English translation were corrected. All other calculation-engine
files are unchanged. Shared rendering files and Japanese HTML were also updated
for source credit and printing. Result labels and precision badges from the earlier
v21 review remain in place.

Keep the directory structure intact and serve the files over HTTP or HTTPS.
Serve .mjs files as text/javascript (or a supported JavaScript MIME type).
Opening a module-based site by double-clicking an HTML file is not equivalent.
For a local preview, run in the extracted directory:
  python3 -m http.server 8000 --bind 127.0.0.1
Then open http://127.0.0.1:8000/en/ in your browser.

The installation kit in downloads/AI-NOBORu-aiofonesown-kit.zip contains a wasan/
folder for an existing website. Upload that folder, not its contents over your
current home page. English then opens at /wasan/en/ and Japanese at /wasan/.
The package has no password gate or domain restriction. Actual public access,
server MIME/CSP settings, robots policy, indexing and external AI access depend
on the hosting service and are not granted or certified by this ZIP.

The plain HTML reference is readable without JavaScript. Calculations still run
in the visitor's browser; there is no public server-side calculation API here.

This delivery does not upload files, change hosting permissions, or replace the
copy in project sources. See PUBLICATION-CHECKLIST.md before publication.
Finite tests are not a proof for every input or a human usability study.

Preserve the source credit and the existing historical and third-party citations
when sharing. Numeric research data are preserved rather than watermarked inside
data cells. A ZIP checksum checks file identity; it is not a digital signature.

Earlier v21 revisions and audit records are retained in the separate audit archive.
Historical download filenames retain "AI-NOBORu" for link compatibility; visible
site credits use "AI NOBORU".

日本語版 index.html／英語版 en/index.html。版番号はv21のままです。
今回は図の署名の可読性、結果コピー、印刷、日英配布・設置キットを修正。
共通計算処理は変更せず、円連鎖の説明文だけを角度の単位と一致させました。
署名は複製先でも公式URLを案内しますが、除去・切抜きは防止できません。
設置キットの wasan フォルダを公開ルートへ置き、既存のトップページは
上書きしないでください。公開サイトの更新・権限変更は本納品では未実施です。
