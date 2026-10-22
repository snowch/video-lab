/// <reference lib="webworker" />
// Copyright © 2026 Christopher Snow
import { rangeResponse } from "./range";
declare const self: ServiceWorkerGlobalScope;
declare const __OFFLINE_MANIFEST__: {
  version: string;
  files: { path: string; integrity: string; bytes?: number }[];
  groups?: Record<
    string,
    {
      bytes: number;
      files: { path: string; integrity: string; bytes?: number }[];
    }
  >;
};
const manifest = __OFFLINE_MANIFEST__;
const base = self.registration.scope;
const prefix = `video-lab-offline:${new URL(base).pathname}:`;
const cacheName = prefix + manifest.version;
const groupCaches = new Map<string, string>();
function groupCache(group: string): string {
  let name = groupCaches.get(group);
  if (!name) {
    name = `${cacheName}:group:${group}`;
    groupCaches.set(group, name);
  }
  return name;
}
function groupFiles(group: string) {
  return manifest.groups?.[group]?.files ?? [];
}
async function cacheFiles(
  cache: Cache,
  files: readonly { path: string; integrity: string }[],
): Promise<void> {
  // Bounded concurrency keeps phone memory and connection use modest.
  let next = 0;
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (next < files.length) {
        const file = files[next++]!;
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
}
async function completeGroup(group: string): Promise<boolean> {
  const files = groupFiles(group);
  if (!files.length) return false;
  const cache = await caches.open(groupCache(group));
  return (
    await Promise.all(files.map((f) => cache.match(new URL(f.path, base).href)))
  ).every(Boolean);
}
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
    await cacheFiles(cache, manifest.files);
    if (!(await complete())) throw new Error("Incomplete cache");
  })().finally(() => {
    download = undefined;
  });
  return download;
}
let groupDownloads: Record<string, Promise<void> | undefined> = {};
async function saveGroup(group: string) {
  if (groupDownloads[group]) return groupDownloads[group];
  const promise = (async () => {
    const files = groupFiles(group);
    if (!files.length) throw new Error("Unknown offline group");
    const cache = await caches.open(groupCache(group));
    await cacheFiles(cache, files);
    if (!(await completeGroup(group)))
      throw new Error("Incomplete group cache");
  })().finally(() => {
    groupDownloads[group] = undefined;
  });
  groupDownloads[group] = promise;
  return promise;
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
          .filter(
            (k) =>
              k.startsWith(prefix) &&
              k !== cacheName &&
              !k.startsWith(cacheName + ":group:"),
          )
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
        } else if (
          typeof event.data === "string" &&
          event.data.startsWith("GROUP:")
        ) {
          const group = event.data.slice("GROUP:".length);
          const files = groupFiles(group);
          const bytes = manifest.groups?.[group]?.bytes ?? 0;
          if (!files.length) {
            reply({ ready: false, bytes: 0, known: false });
            return;
          }
          reply({
            ready: await completeGroup(group),
            bytes,
            known: true,
            downloading: Boolean(groupDownloads[group]),
          });
        } else if (
          typeof event.data === "string" &&
          event.data.startsWith("DOWNLOAD_GROUP:")
        ) {
          const group = event.data.slice("DOWNLOAD_GROUP:".length);
          await saveGroup(group);
          reply({ ready: await completeGroup(group) });
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
  event.respondWith(
    (async () => {
      // Baseline files are served from the main cache; opt-in group files
      // (the encoder core, optional samples) only when their group is cached.
      if (urls.includes(key)) {
        const cached = await (await caches.open(cacheName)).match(key);
        if (cached)
          return rangeResponse(cached, event.request.headers.get("range"));
        return fetch(event.request);
      }
      for (const [group, entry] of Object.entries(manifest.groups ?? {})) {
        const groupUrls = entry.files.map((f) => new URL(f.path, base).href);
        if (groupUrls.includes(key)) {
          const cached = await (
            await caches.open(groupCache(group))
          ).match(key);
          if (cached) return cached;
          return fetch(event.request);
        }
      }
      return fetch(event.request);
    })(),
  );
});
