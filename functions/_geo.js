// 訪問者の国（Cloudflare が判定した接続元の国）で、日本と日本以外に振り分ける。
export function geoRedirect(request, jaUrl, enUrl) {
  const country = (request.cf && request.cf.country) || request.headers.get("CF-IPCountry") || "";
  const target = country.toUpperCase() === "JP" ? jaUrl : enUrl;
  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      // 国ごとに行き先が違うので、どこにも覚えさせない。
      "Cache-Control": "private, no-store",
    },
  });
}
