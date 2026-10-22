// Copyright © 2026 Christopher Snow
import { test as base, expect, type Locator } from "@playwright/test";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { offline } from "../src/offline/strings";
import { m2 } from "../src/module2/strings";
import { referenceAnswers } from "../src/module2/model";
const root = resolve("dist");
type Site = { url: string; fail: string; corrupt: string; revision: number };
// A real HTTP origin (not route mocks) exercises service-worker requests in both browsers.
const test = base.extend<{ site: Site }>({
  site: async ({}, use) => {
    const site: Site = { url: "", fail: "", corrupt: "", revision: 0 };
    const server = createServer(async (req, res) => {
      try {
        const path = new URL(req.url!, "http://localhost").pathname;
        if (!path.startsWith("/video-lab/")) {
          res.writeHead(404).end();
          return;
        }
        if (site.fail && path.endsWith(site.fail)) {
          res.writeHead(503).end();
          return;
        }
        const relative = path.slice("/video-lab/".length) || "index.html";
        const file = resolve(root, relative);
        if (!file.startsWith(root + "/")) {
          res.writeHead(404).end();
          return;
        }
        let data = await readFile(file);
        if (site.corrupt && path.endsWith(site.corrupt))
          data = Buffer.from("wrong file contents");
        if (relative === "sw.js" && site.revision) {
          // Change only the cache version to exercise a second complete deployment.
          data = Buffer.from(
            data
              .toString()
              .replace(
                /(version: ")([^"]+)/,
                `$1test-release-${site.revision}`,
              ),
          );
        }
        const types: Record<string, string> = {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".webmanifest": "application/manifest+json",
          ".png": "image/png",
          ".svg": "image/svg+xml",
          ".mp4": "video/mp4",
          ".jpg": "image/jpeg",
          ".woff2": "font/woff2",
          ".woff": "font/woff",
          ".ttf": "font/ttf",
        };
        res.writeHead(200, {
          "content-type": types[extname(file)] ?? "application/octet-stream",
          "cache-control": "no-store",
          "content-length": data.length,
        });
        res.end(data);
      } catch {
        res.writeHead(404).end();
      }
    });
    await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
    const address = server.address() as { port: number };
    site.url = `http://127.0.0.1:${address.port}/video-lab/`;
    await use(site);
    server.closeAllConnections();
    await new Promise<void>((done, reject) =>
      server.close((e) => (e ? reject(e) : done())),
    );
  },
});
async function seekAndPlay(video: Locator) {
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  await video.evaluate((v) => {
    const media = v as HTMLVideoElement;
    media.currentTime = 0.7;
    return media.play();
  });
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime))
    .toBeGreaterThan(0.8);
  await video.evaluate((v) => (v as HTMLVideoElement).pause());
}
test("complete download survives offline reload and new tab, with all media and saved work", async ({
  page,
  context,
  site,
}) => {
  test.setTimeout(90000);
  await page.goto(site.url + "#/module-3");
  expect(
    await page.evaluate(() => navigator.serviceWorker.getRegistration()),
  ).toBeUndefined();
  const panel = page.getByRole("region", { name: offline.title });
  await panel.locator(":scope > details > summary").click();
  await panel
    .getByRole("button", { name: offline.download, exact: true })
    .click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.ready,
    {
      timeout: 30000,
    },
  );
  await context.setOffline(true);
  await page.reload();
  await page.locator(".offline-panel > details > summary").click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.offlineReady,
  );
  // All files are fetched through the worker with the network disconnected, not the HTTP cache.
  const manifest = JSON.parse(
    await readFile("dist/offline-manifest.json", "utf8"),
  ) as { files: { path: string; integrity: string }[] };
  expect(
    await page.evaluate(async (files) => {
      for (const file of files) {
        const response = await fetch(file.path).catch((e) => {
          throw new Error(file.path + ": " + e.message);
        });
        const bytes = await response.arrayBuffer();
        const hash = await crypto.subtle.digest("SHA-256", bytes);
        if (
          !response.ok ||
          "sha256-" + btoa(String.fromCharCode(...new Uint8Array(hash))) !==
            file.integrity
        )
          return file.path;
      }
      return null;
    }, manifest.files),
  ).toBeNull();
  const range = await page.evaluate(async () => {
    const r = await fetch("media/build-queue.mp4", {
      headers: { Range: "bytes=100-199" },
    });
    return {
      status: r.status,
      bytes: (await r.arrayBuffer()).byteLength,
      range: r.headers.get("content-range"),
    };
  });
  expect(range.status).toBe(206);
  expect(range.bytes).toBe(100);
  expect(range.range).toMatch(/^bytes 100-199\//);
  await seekAndPlay(page.locator("#ix-cut-source video"));
  for (const start of [1, 3, 5])
    for (const method of ["copy", "encode"]) {
      const cut = page.locator("#ix-cut-explorer");
      await cut
        .getByRole("combobox", { name: m2.start, exact: true })
        .selectOption(String(start));
      await cut
        .getByRole("combobox", { name: m2.method, exact: true })
        .selectOption(method);
      await seekAndPlay(cut.locator("video"));
    }
  for (const order of ["AB", "BA"])
    for (const end of [6, 8]) {
      const join = page.locator("#ix-join-explorer");
      await join
        .getByRole("combobox", { name: m2.order, exact: true })
        .selectOption(order);
      await join
        .getByRole("combobox", { name: m2.bEnd, exact: true })
        .selectOption(String(end));
      await seekAndPlay(join.locator("video"));
    }
  for (const [key, value] of Object.entries(referenceAnswers)) {
    const name = m2.fieldLabels[key as keyof typeof m2.fieldLabels];
    const editor = page.locator("[data-challenge=edit-plan]");
    if (["method", "order", "reset"].includes(key))
      await editor
        .getByRole("combobox", { name, exact: true })
        .selectOption(value);
    else await editor.getByLabel(name, { exact: true }).fill(value);
  }
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=edit-plan]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.getByLabel(m2.reflectionLabel).fill("Saved while offline.");
  await page.reload();
  await expect(page.locator("[data-challenge=edit-plan]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await expect(page.getByLabel(m2.reflectionLabel)).toHaveValue(
    "Saved while offline.",
  );
  const second = await context.newPage();
  await second.goto(site.url + "#/module-2");
  await expect(second.getByRole("heading", { level: 1 })).toHaveText(
    "What is a digital video?",
  );
  await seekAndPlay(second.locator("video").first());
  expect(
    await second.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await second.close();
});
test("incomplete download reports failure and retries; missing storage can be repaired", async ({
  page,
  context,
  site,
}) => {
  site.fail = "media/frames/119.jpg";
  await page.goto(site.url);
  const panel = page.locator(".offline-panel");
  await panel.locator(":scope > details > summary").click();
  await panel
    .getByRole("button", { name: offline.download, exact: true })
    .click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.failed,
    {
      timeout: 30000,
    },
  );
  await expect(panel.locator("[role=status]").first()).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
  site.fail = "";
  site.corrupt = "media/frames/119.jpg";
  await panel.getByRole("button", { name: offline.retry, exact: true }).click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.failed,
  );
  site.corrupt = "";
  await panel.getByRole("button", { name: offline.retry, exact: true }).click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.ready,
    {
      timeout: 30000,
    },
  );
  // Inject eviction only after the download action settles, with no network repair.
  await expect(
    panel.getByRole("button", { name: offline.check, exact: true }),
  ).toBeEnabled();
  await context.setOffline(true);
  expect(
    await page.evaluate(async () => {
      await caches.open("another-app-cache");
      let removed = false;
      for (const name of await caches.keys())
        if (name.startsWith("video-lab-offline:")) {
          const cache = await caches.open(name);
          removed =
            (await cache.delete(
              new URL("media/frames/119.jpg", location.href),
            )) || removed;
        }
      return removed;
    }),
  ).toBe(true);
  await page.reload();
  await panel.locator(":scope > details > summary").click();
  await expect(panel.locator("[role=status]").first()).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
  await context.setOffline(false);
  await panel
    .getByRole("button", { name: offline.download, exact: true })
    .click();
  // Firefox's emulated connectivity signal may lag behind restored requests.
  // The repair contract is a complete saved copy, regardless of that signal.
  await expect(panel.locator("[role=status]").first()).toHaveAttribute(
    "data-offline-ready",
    "true",
  );
  expect(await page.evaluate(() => caches.has("another-app-cache"))).toBe(true);
});
test("updates wait for a complete copy and explicit reload, preserving saved work", async ({
  page,
  context,
  site,
}) => {
  test.setTimeout(90000);
  await page.goto(site.url + "#/module-3");
  const panel = page.locator(".offline-panel");
  await panel.locator(":scope > details > summary").click();
  await panel
    .getByRole("button", { name: offline.download, exact: true })
    .click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.ready,
    {
      timeout: 30000,
    },
  );
  await page
    .getByLabel(m2.reflectionLabel)
    .fill("Keep this note through an update.");
  await page.evaluate(() => caches.open("another-app-cache"));
  site.revision = 1;
  site.fail = "media/frames/119.jpg";
  await panel.getByRole("button", { name: offline.check, exact: true }).click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.updateFailed,
    {
      timeout: 30000,
    },
  );
  await expect(panel.locator("[role=status]").first()).toHaveAttribute(
    "data-offline-ready",
    "true",
  );
  await context.setOffline(true);
  await page.reload();
  await seekAndPlay(page.locator("#ix-cut-source video"));
  await panel.locator(":scope > details > summary").click();
  await panel.getByRole("button", { name: offline.check, exact: true }).click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.updateFailed,
  );
  await panel.locator(":scope > details > summary").click();
  await context.setOffline(false);
  site.fail = "";
  // A distinct script ensures retry even if the browser remembers the failed update.
  site.revision = 2;
  await panel.locator(":scope > details > summary").click();
  await panel.getByRole("button", { name: offline.check, exact: true }).click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.updateReady,
    {
      timeout: 30000,
    },
  );
  await expect(page.getByLabel(m2.reflectionLabel)).toHaveValue(
    "Keep this note through an update.",
  );
  const second = await context.newPage();
  await second.goto(site.url + "#/module-2");
  await Promise.all([
    page.waitForEvent("framenavigated", (frame) => frame === page.mainFrame()),
    second.waitForEvent(
      "framenavigated",
      (frame) => frame === second.mainFrame(),
    ),
    panel.getByRole("button", { name: offline.reload, exact: true }).click(),
  ]);
  await page.waitForLoadState();
  await second.waitForLoadState();
  await expect
    .poll(() => page.evaluate(() => caches.keys()))
    .toContain("video-lab-offline:/video-lab/:test-release-2");
  await expect(page.getByLabel(m2.reflectionLabel)).toHaveValue(
    "Keep this note through an update.",
  );
  expect(await page.evaluate(() => caches.has("another-app-cache"))).toBe(true);
  await context.setOffline(true);
  await second.reload();
  await seekAndPlay(second.locator("video").first());
  await second.close();
  await context.setOffline(false);
  await panel.locator(":scope > details > summary").click();
  await panel.getByRole("button", { name: offline.check, exact: true }).click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.current,
  );
  site.revision = 3;
  // Browser-initiated updates must replace a previous "up to date" status too.
  await page.evaluate(async () =>
    (await navigator.serviceWorker.getRegistration())!.update(),
  );
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.updateReady,
    {
      timeout: 30000,
    },
  );
  await context.setOffline(true);
  await panel.getByRole("button", { name: offline.check, exact: true }).click();
  // A waiting worker must not let a disconnected check report a fresh success.
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.updateFailed,
  );
  await expect(
    panel.getByText(offline.updateReady, { exact: true }),
  ).toBeVisible();
  await context.setOffline(false);
  site.revision = 4;
  site.fail = "media/frames/119.jpg";
  await panel.getByRole("button", { name: offline.check, exact: true }).click();
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.updateFailed,
  );
  await expect(
    panel.getByText(offline.updateReady, { exact: true }),
  ).toBeVisible();
  await expect(
    panel.getByRole("button", { name: offline.reload, exact: true }),
  ).toBeEnabled();
});

test("unsupported browsers keep online lessons usable", async ({
  page,
  site,
}) => {
  await page.addInitScript(() => {
    delete (Navigator.prototype as { serviceWorker?: unknown }).serviceWorker;
  });
  await page.goto(site.url + "#/module-3");
  const panel = page.locator(".offline-panel");
  await panel.locator(":scope > details > summary").focus();
  await page.keyboard.press("Enter");
  await expect(panel.locator("[role=status]").first()).toHaveText(
    offline.unsupported,
  );
  await expect(panel.getByRole("button")).toHaveCount(0);
  await seekAndPlay(page.locator("#ix-cut-source video"));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
