// Copyright © 2026 Christopher Snow
/** Serve a single byte range from a complete cached response, including MP4 seeks. */
export async function rangeResponse(response: Response, range: string | null) {
  if (!range) return response;
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  // HTTP permits ignoring unsupported/malformed ranges (including multipart).
  if (!match || (!match[1] && !match[2])) return response;
  const data = await response.arrayBuffer();
  const size = data.byteLength;
  const start = match[1]
    ? Number(match[1])
    : Math.max(0, size - Number(match[2]));
  const end =
    match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  const headers = new Headers(response.headers);
  headers.delete("content-encoding");
  headers.set("accept-ranges", "bytes");
  if (!Number.isSafeInteger(start) || start > end || start >= size) {
    headers.set("content-range", `bytes */${size}`);
    headers.set("content-length", "0");
    return new Response(null, { status: 416, headers });
  }
  headers.set("content-range", `bytes ${start}-${end}/${size}`);
  headers.set("content-length", String(end - start + 1));
  return new Response(data.slice(start, end + 1), { status: 206, headers });
}
