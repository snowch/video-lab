// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import { rangeResponse } from "./range";
const full = () =>
  new Response("0123456789", {
    headers: { "content-type": "video/mp4", "content-length": "10" },
  });
describe("offline byte ranges", () => {
  it.each([
    ["bytes=2-5", "2345", "bytes 2-5/10"],
    ["bytes=8-", "89", "bytes 8-9/10"],
    ["bytes=-3", "789", "bytes 7-9/10"],
    ["bytes=8-99", "89", "bytes 8-9/10"],
    ["bytes=-99", "0123456789", "bytes 0-9/10"],
  ])("serves %s", async (range, body, contentRange) => {
    const response = await rangeResponse(full(), range);
    expect(response.status).toBe(206);
    expect(response.headers.get("content-range")).toBe(contentRange);
    expect(response.headers.get("content-length")).toBe(String(body.length));
    expect(response.headers.get("content-type")).toBe("video/mp4");
    expect(await response.text()).toBe(body);
  });
  it.each(["bytes=10-", "bytes=7-3", "bytes=-0"])(
    "rejects unsatisfiable %s",
    async (range) => {
      const response = await rangeResponse(full(), range);
      expect(response.status).toBe(416);
      expect(response.headers.get("content-range")).toBe("bytes */10");
    },
  );
  it.each([null, "not-a-range", "bytes=0-1,4-5", "bytes=-"])(
    "returns full content for %s",
    async (range) => {
      const response = await rangeResponse(full(), range);
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("0123456789");
    },
  );
});
