import { geoRedirect } from "./_geo.js";

// /youtube : 日本からは日本語チャンネル、日本以外からは英語チャンネルへ。
export function onRequest({ request }) {
  return geoRedirect(
    request,
    "https://www.youtube.com/@sugaku-tsukaikataByAINOBORu",
    "https://www.youtube.com/@MathinUseByAINOBOru"
  );
}
