// Copyright © 2026 Christopher Snow
import { test as base } from "@playwright/test";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
export type Site = {
  url: string;
  release: 0 | 1;
  fail: string;
  corrupt: string;
  delay: string;
  metadata?: Record<string, unknown>;
  requests: Record<string, number>;
};
export const test = base.extend<{ site: Site }>({
  site: async ({}, use) => {
    const site: Site = {
      url: "",
      release: 0,
      fail: "",
      corrupt: "",
      delay: "",
      requests: {},
    };
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url!, "http://localhost"),
          relative = url.pathname.slice("/video-lab/".length) || "index.html";
        if (
          !url.pathname.startsWith("/video-lab/") ||
          relative.includes("..")
        ) {
          res.writeHead(404).end();
          return;
        }
        site.requests[relative] = (site.requests[relative] ?? 0) + 1;
        if (site.delay && relative.endsWith(site.delay))
          await new Promise((r) => setTimeout(r, 5000));
        if (site.fail && relative.endsWith(site.fail)) {
          res.writeHead(503).end();
          return;
        }
        const root = resolve(
          site.release ? ".media-work/status-release" : "dist",
        );
        let bytes = await readFile(resolve(root, relative));
        if (relative === "release.json" && site.metadata)
          bytes = Buffer.from(
            JSON.stringify({
              ...JSON.parse(bytes.toString()),
              ...site.metadata,
            }),
          );
        if (site.corrupt && relative.endsWith(site.corrupt))
          bytes = Buffer.from("corrupt production asset");
        const mime: Record<string, string> = {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".mp4": "video/mp4",
          ".jpg": "image/jpeg",
          ".png": "image/png",
          ".svg": "image/svg+xml",
          ".webmanifest": "application/manifest+json",
          ".wasm": "application/wasm",
        };
        res.writeHead(200, {
          "content-type": mime[extname(relative)] ?? "application/octet-stream",
          "cache-control": "no-store",
          "content-length": bytes.length,
        });
        res.end(bytes);
      } catch {
        res.writeHead(404).end();
      }
    });
    await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
    site.url = `http://127.0.0.1:${(server.address() as { port: number }).port}/video-lab/`;
    await use(site);
    server.closeAllConnections();
    await new Promise<void>((r) => server.close(() => r()));
  },
});
