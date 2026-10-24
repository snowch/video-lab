/// <reference lib="webworker" />
// Copyright © 2026 Christopher Snow
import { rangeResponse } from "./range";
declare const self: ServiceWorkerGlobalScope;
type Asset = { path: string; integrity: string; bytes: number };
type Manifest = { version: string; files: Asset[]; bytes: number };
declare const __OFFLINE_MANIFEST__: Manifest;
declare const __ENCODER_MANIFEST__: Manifest;
declare const __APP_BUILD__: string;
const manifest = __OFFLINE_MANIFEST__,
  encoder = __ENCODER_MANIFEST__;
const base = self.registration.scope,
  prefix = `video-lab-offline:${new URL(base).pathname}:`;
const cacheName = prefix + manifest.version,
  encoderCache = prefix + "encoder:" + encoder.version,
  stateCache = prefix + "state";
const marker = new URL("__app-status/prepared", base).href;
const snapshotKey = new URL("__app-status/active", base).href;
const intentKey = new URL("__app-status/activation", base).href;
type Snapshot = {
  manifest: Manifest;
  encoder: Manifest;
  cacheName: string;
  encoderCache: string;
  build: string;
};
const ownSnapshot: Snapshot = {
  manifest,
  encoder,
  cacheName,
  encoderCache,
  build: __APP_BUILD__,
};
const offlineWantedKey = new URL("__app-status/offline-wanted", base).href;
async function requestOffline() {
  await (
    await caches.open(stateCache)
  ).put(offlineWantedKey, new Response("1"));
}
async function offlineWanted(target: Snapshot) {
  if (await (await caches.open(stateCache)).match(offlineWantedKey))
    return true;
  const r = await (await caches.open(target.cacheName)).match(marker);
  return r ? (await r.json()).full === true : false;
}
async function snapshot(): Promise<Snapshot | undefined> {
  const r = await (await caches.open(stateCache)).match(snapshotKey);
  return r ? await r.json() : undefined;
}
async function selectRelease() {
  await (
    await caches.open(stateCache)
  ).put(snapshotKey, new Response(JSON.stringify(ownSnapshot)));
}
const urls = manifest.files.map((f) => new URL(f.path, base).href),
  encoderUrls = encoder.files.map((f) => new URL(f.path, base).href);
let operation: Promise<void> | undefined, abort: AbortController | undefined;
async function valid(response: Response | undefined, file: Asset) {
  if (!response || response.status !== 200) return false;
  const bytes = await response.clone().arrayBuffer();
  if (bytes.byteLength !== file.bytes) return false;
  const digest = btoa(
    String.fromCharCode(
      ...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)),
    ),
  );
  return file.integrity === "sha256-" + digest;
}
async function inventory(m: Manifest, name: string) {
  const cache = await caches.open(name);
  let count = 0,
    bytes = 0;
  for (const file of m.files)
    if (await valid(await cache.match(new URL(file.path, base).href), file)) {
      count++;
      bytes += file.bytes;
    }
  return { ready: count === m.files.length, count, bytes };
}
const complete = () => inventory(manifest, cacheName);
const encoderComplete = () => inventory(encoder, encoderCache);
async function prepared() {
  const r = await (await caches.open(cacheName)).match(marker);
  if (!r) return false;
  const m = await r.json();
  return (
    m.build === __APP_BUILD__ &&
    (await complete()).ready &&
    (!m.full || (await encoderComplete()).ready)
  );
}
async function save(
  full: boolean,
  progress?: (value: unknown) => void,
  toolsOnly = false,
  target: Snapshot = ownSnapshot,
) {
  if (operation) throw new Error("Download already active");
  const controller = new AbortController();
  abort = controller;
  operation = (async () => {
    const groups = toolsOnly
      ? [[target.encoder, target.encoderCache] as const]
      : [
          [target.manifest, target.cacheName] as const,
          ...(full ? [[target.encoder, target.encoderCache] as const] : []),
        ];
    const total = groups.reduce((n, [m]) => n + m.bytes, 0);
    let done = 0;
    const existing = (await caches.keys()).filter(
      (k) => k.startsWith(prefix) && k !== stateCache,
    );
    for (const [m, name] of groups) {
      const cache = await caches.open(name);
      for (const file of m.files) {
        controller.signal.throwIfAborted();
        const url = new URL(file.path, base).href;
        let response = await cache.match(url);
        if (!(await valid(response, file))) {
          response = undefined;
          for (const older of existing) {
            const r = await (await caches.open(older)).match(url);
            if (await valid(r, file)) {
              response = r;
              break;
            }
          }
          if (!response) {
            response = await fetch(url, {
              cache: "no-store",
              integrity: file.integrity,
              signal: AbortSignal.any([
                controller.signal,
                AbortSignal.timeout(120000),
              ]),
            });
            if (!(await valid(response, file)))
              throw new Error("Asset verification failed");
          }
          controller.signal.throwIfAborted();
          await cache.put(url, response);
        }
        done += file.bytes;
        progress?.({ progress: true, done, total });
      }
    }
    if (!toolsOnly)
      await (
        await caches.open(target.cacheName)
      ).put(
        marker,
        new Response(JSON.stringify({ build: target.build, full })),
      );
  })().finally(() => {
    operation = undefined;
    abort = undefined;
  });
  return operation;
}
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      // One-time old-protocol migration retains the complete save before old clients close.
      const keys = await caches.keys();
      if (
        !keys.includes(stateCache) &&
        keys.some(
          (k) =>
            k.startsWith(prefix) &&
            k !== cacheName &&
            k !== encoderCache &&
            !k.includes(":encoder:"),
        )
      ) {
        const full = (await encoderComplete()).ready;
        await save(full);
      }
    })(),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const intent = await (await caches.open(stateCache)).match(intentKey);
      const authorised =
        intent && (await intent.json()).build === __APP_BUILD__;
      if ((authorised && (await prepared())) || !(await snapshot()))
        await selectRelease();
      await (
        await caches.open(stateCache)
      ).put(new URL("__app-status/contract", base).href, new Response("1"));
      await self.clients.claim();
      // Previous releases are retained until explicit scoped removal. Failed preparation cannot erase them.
    })(),
  );
});
type Restart = {
  token: string;
  pending: Set<string>;
  clients: WindowClient[];
  resolve: (safe: boolean) => void;
  timer: ReturnType<typeof setTimeout>;
};
let restart: Restart | undefined;
async function restartAll() {
  if (restart || !(await prepared())) return false;
  const clients = (
    await self.clients.matchAll({ type: "window", includeUncontrolled: true })
  ).filter((c) => c.url.startsWith(base));
  if (!clients.length) return false;
  const token = crypto.randomUUID();
  const safe = await new Promise<boolean>((resolve) => {
    const timer = setTimeout(() => resolve(false), 5000);
    restart = {
      token,
      pending: new Set(clients.map((c) => c.id)),
      clients,
      resolve,
      timer,
    };
    for (const c of clients)
      c.postMessage({ type: "APP_RESTART_QUERY", token });
  });
  clearTimeout(restart!.timer);
  if (!safe) {
    for (const c of clients)
      c.postMessage({ type: "APP_RESTART_ABORT", token });
    restart = undefined;
    return false;
  }
  try {
    await (
      await caches.open(stateCache)
    ).put(intentKey, new Response(JSON.stringify({ build: __APP_BUILD__ })));
    if (self.registration.waiting) await self.skipWaiting();
    else await selectRelease();
    for (const c of clients)
      c.postMessage({ type: "APP_RESTART_COMMIT", token });
    return true;
  } catch {
    for (const c of clients)
      c.postMessage({ type: "APP_RESTART_ABORT", token });
    return false;
  } finally {
    restart = undefined;
  }
}
self.addEventListener("message", (event) => {
  const data = event.data,
    type = typeof data === "string" ? data : data?.type;
  if (type === "APP_RESTART_ACK") {
    if (
      restart &&
      data.token === restart.token &&
      event.source &&
      "id" in event.source &&
      restart.pending.has(event.source.id)
    ) {
      if (!data.safe) restart.resolve(false);
      else {
        restart.pending.delete(event.source.id);
        if (!restart.pending.size) restart.resolve(true);
      }
    }
    return;
  }
  const reply = (value: unknown) => event.ports[0]?.postMessage(value);
  event.waitUntil(
    (async () => {
      try {
        if (type === "CANCEL") {
          abort?.abort();
          reply({ ready: false });
        } else if (type === "ENCODER_STATUS") {
          const s = await snapshot();
          reply(
            s
              ? await inventory(s.encoder, s.encoderCache)
              : await encoderComplete(),
          );
        } else if (type === "STATUS" || type === "DETAILS") {
          const s = type === "STATUS" ? await snapshot() : undefined;
          reply({
            ...(s
              ? await inventory(s.manifest, s.cacheName)
              : await complete()),
            toolsReady: s
              ? (await inventory(s.encoder, s.encoderCache)).ready
              : (await encoderComplete()).ready,
            version: s?.manifest.version ?? manifest.version,
            build: s?.build ?? __APP_BUILD__,
            prepared: await prepared(),
            offlineWanted: await offlineWanted(s ?? ownSnapshot),
            total: s
              ? s.manifest.bytes + s.encoder.bytes
              : manifest.bytes + encoder.bytes,
          });
        } else if (type === "DOWNLOAD_ENCODER") {
          const target = (await snapshot()) ?? ownSnapshot;
          await requestOffline();
          await save(true, undefined, true, target);
          reply({ ready: true });
        } else if (type === "REMOVE_ENCODER") {
          await caches.delete((await snapshot())?.encoderCache ?? encoderCache);
          reply({ ready: false });
        } else if (
          type === "DOWNLOAD" ||
          type === "DOWNLOAD_ALL" ||
          type === "PREPARE"
        ) {
          const target =
            type === "PREPARE"
              ? ownSnapshot
              : ((await snapshot()) ?? ownSnapshot);
          if (
            typeof data !== "string" &&
            (data.build !== target.build ||
              data.version !== target.manifest.version)
          )
            throw new Error("Deployment changed");
          if (type === "DOWNLOAD_ALL") await requestOffline();
          await save(
            type === "DOWNLOAD_ALL" ||
              (type === "PREPARE" && data.full === true),
            typeof data === "string" ? undefined : reply,
            false,
            target,
          );
          reply({
            ready: true,
            build: target.build,
            version: target.manifest.version,
          });
        } else if (type === "ACTIVATE") reply({ ready: await restartAll() });
      } catch {
        reply({ ready: false, cancelled: abort?.signal.aborted === true });
      }
    })(),
  );
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url),
    root = new URL(base);
  if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname))
    return;
  // Deployment metadata and workers always reach the network, including query checks.
  if (
    url.pathname === root.pathname + "release.json" ||
    url.pathname === root.pathname + "sw.js"
  )
    return;
  const key =
    url.pathname === root.pathname ||
    url.pathname === root.pathname + "index.html"
      ? new URL("index.html", base).href
      : url.pathname === root.pathname + "optional/command-workbench.html"
        ? new URL("optional/command-workbench.html", base).href
        : url.href;
  const isEncoder = encoderUrls.includes(key);
  event.respondWith(
    (async () => {
      const s = await snapshot();
      const tool = s
        ? s.encoder.files.some((f) => new URL(f.path, base).href === key)
        : isEncoder;
      const response = await (
        await caches.open(
          tool
            ? (s?.encoderCache ?? encoderCache)
            : (s?.cacheName ?? cacheName),
        )
      ).match(key);
      return response
        ? rangeResponse(response, event.request.headers.get("range"))
        : fetch(event.request);
    })(),
  );
});
