import { geoRedirect } from "./_geo.js";

// /ainoboru : 日本からは日本語ページ、日本以外からは英語ページへ。
export function onRequest({ request }) {
  const origin = new URL(request.url).origin;
  return geoRedirect(request, origin + "/lab/ainoboru/", origin + "/lab/ainoboru/en/");
}
