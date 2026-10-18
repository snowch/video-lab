/// <reference lib="webworker" />
// Copyright © 2026 Christopher Snow
import { rangeResponse } from "./range";
declare const self: ServiceWorkerGlobalScope;
declare const __OFFLINE_MANIFEST__: {
  version: string;
  files: { path: string; integrity: string }[];
};
const manifest = __OFFLINE_MANIFEST__;
const base = self.registration.scope;
const prefix = `video-lab-offline:${new URL(base).pathname}:`;
const cacheName = prefix + manifest.version;
const urls = manifest.files.map((f) => new URL(f.path, base).href);
let download: Promise<void> | undefined;
async function complete() {
  const cache = await caches.open(cacheName);
  return (await Promise.all(urls.map((url) => cache.match(url)))).every(
    Boolean,
  );
}
async function save() {
  if (download) return download;
  download = (async () => {
    const cache = await caches.open(cacheName);
    // Bounded concurrency keeps phone memory and connection use modest.
    let next = 0;
    await Promise.all(
      Array.from({ length: 4 }, async () => {
        while (next < manifest.files.length) {
          const file = manifest.files[next++]!;
          const url = new URL(file.path, base).href;
          if (await cache.match(url)) continue;
          const response = await fetch(url, {
            cache: "reload",
            integrity: file.integrity,
            signal: AbortSignal.timeout(30000),
          });
          if (response.status !== 200) throw new Error("Incomplete download");
          await cache.put(url, response);
        }
      }),
    );
    if (!(await complete())) throw new Error("Incomplete cache");
  })().finally(() => {
    download = undefined;
  });
  return download;
}
self.addEventListener("install", (event) => {
  event.waitUntil(save());
  // Updates wait until the learner requests a reload or all old tabs close.
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      await Promise.all(
        (await caches.keys())
          .filter((k) => k.startsWith(prefix) && k !== cacheName)
          .map((k) => caches.delete(k)),
      );
    })(),
  );
});
self.addEventListener("message", (event) => {
  const reply = (value: unknown) => event.ports[0]?.postMessage(value);
  event.waitUntil(
    (async () => {
      try {
        if (event.data === "STATUS") reply({ ready: await complete() });
        else if (event.data === "DOWNLOAD") {
          await save();
          reply({ ready: true });
        } else if (event.data === "ACTIVATE") await self.skipWaiting();
      } catch {
        reply({ ready: false });
      }
    })(),
  );
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const root = new URL(base);
  if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname))
    return;
  // Hash routes share one document. Ignore search parameters only for that document.
  const key =
    url.pathname === root.pathname ||
    url.pathname === root.pathname + "index.html"
      ? new URL("index.html", base).href
      : url.href;
  if (!urls.includes(key)) return;
  event.respondWith(
    (async () => {
      const cached = await (await caches.open(cacheName)).match(key);
      if (!cached) return fetch(event.request);
      return rangeResponse(cached, event.request.headers.get("range"));
    })(),
  );
});
