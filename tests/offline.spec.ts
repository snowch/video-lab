// Copyright © 2026 Christopher Snow
import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { test } from "./status-site";
import { offline } from "../src/offline/strings";
import { appStatusStrings as s } from "../src/app-status/strings";
import { command, terminal } from "./cli-helpers";
test.use({ actionTimeout: 10000 });
async function panel(page: Page) {
  const p = page.locator(".app-status");
  if (
    !(await p
      .locator("details")
      .evaluate((d) => (d as HTMLDetailsElement).open))
  )
    await p.locator("summary").click();
  return p;
}
async function save(page: Page) {
  const p = await panel(page);
  await p.getByRole("button", { name: s.download, exact: true }).click();
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 45000 },
  );
}
async function seekAndPlay(video: Locator) {
  await video.scrollIntoViewIfNeeded();
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
  await page.goto(site.url + "#/module-2");
  expect(
    await page.evaluate(() => navigator.serviceWorker.getRegistration()),
  ).toBeUndefined();
  const panel = page.getByRole("region", { name: offline.title });
  await panel.locator(":scope > details > summary").click();
  await panel
    .getByRole("button", { name: offline.download, exact: true })
    .click();
  await expect(panel.locator("[data-offline-ready]")).toHaveText(
    offline.ready,
    {
      timeout: 30000,
    },
  );
  await context.setOffline(true);
  await page.reload();
  await page.locator(".offline-panel > details > summary").click();
  await expect(panel.locator("[data-offline-ready]")).toHaveText(
    offline.offlineReady,
  );
  // All files are fetched through the worker with the network disconnected, not the HTTP cache.
  const manifests = await Promise.all(
    ["dist/offline-manifest.json", "dist/encoder-manifest.json"].map(
      async (path) =>
        JSON.parse(await readFile(path, "utf8")) as {
          files: { path: string; integrity: string }[];
        },
    ),
  );
  const manifest = { files: manifests.flatMap((m) => m.files) };
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
  await command(page, "reference cuts");
  await command(page, "play reference-cuts.mp4");
  await seekAndPlay(page.locator(".cli-preview video"));
  await command(page, 'note offline.txt "Saved while offline."');
  await page.reload();
  await command(page, "cat offline.txt");
  await expect(terminal(page)).toContainText("Saved while offline.");
  const second = await context.newPage();
  await second.goto(site.url + "#/module-0");
  await expect(second.getByRole("heading", { level: 1 })).toHaveText(
    "What is a digital video?",
  );
  await command(second, "reference inspect");
  await command(second, "play reference-inspect.mp4");
  await seekAndPlay(second.locator(".cli-preview video"));
  expect(
    await second.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await second.goto(site.url + "#/appendix/recording");
  await expect(second.getByRole("heading", { level: 1 })).toHaveText(
    "Record your own screen",
  );
  await second
    .getByLabel("Where will you record?", { exact: true })
    .selectOption("mobile");
  await expect(
    second.getByRole("heading", { name: "iPhone or iPad", exact: true }),
  ).toBeVisible();
  await second.reload();
  await expect(second.getByRole("heading", { level: 1 })).toHaveText(
    "Record your own screen",
  );
  await second.close();
});

test("verified partial saves retry corrupt assets, repair eviction and preserve sibling storage", async ({
  page,
  context,
  site,
}) => {
  test.setTimeout(90000);
  site.fail = "media/frames/119.jpg";
  await page.goto(site.url);
  const p = await panel(page);
  await p.getByRole("button", { name: s.download, exact: true }).click();
  await expect(p).toContainText(s.downloadFailed, { timeout: 30000 });
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
  site.fail = "";
  site.corrupt = "media/frames/119.jpg";
  await p.getByRole("button", { name: s.repair, exact: true }).click();
  await expect(
    p.getByRole("button", { name: s.repair, exact: true }),
  ).toBeEnabled();
  site.corrupt = "";
  await p.getByRole("button", { name: s.repair, exact: true }).click();
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 30000 },
  );
  const wasm = JSON.parse(
    await readFile("dist/encoder-manifest.json", "utf8"),
  ).files.find((f: { path: string }) => f.path.endsWith(".wasm")).path;
  await page.evaluate(async (path) => {
    await caches.open("sibling-course");
    for (const name of await caches.keys())
      if (name.includes("video-lab-offline:/video-lab/:encoder:"))
        await (
          await caches.open(name)
        ).put(
          new URL(path, location.href),
          new Response("corrupted cached bytes"),
        );
  }, wasm);
  await context.setOffline(true);
  await page.evaluate(() => dispatchEvent(new Event("focus")));
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
  await context.setOffline(false);
  await page.evaluate(() => dispatchEvent(new Event("online")));
  await p.getByRole("button", { name: s.resume, exact: true }).click();
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 30000 },
  );
  expect(await page.evaluate(() => caches.has("sibling-course"))).toBe(true);
});

test("two real builds detect, prepare, defer and safely restart every window, retaining complete offline work", async ({
  page,
  context,
  site,
}) => {
  test.setTimeout(150000);
  await page.goto(site.url + "#/capture");
  await page
    .getByRole("button", { name: "Use practice video", exact: true })
    .click();
  await expect(page.locator(".cli-preview video")).toBeVisible();
  await save(page);
  await page.goto(site.url + "#/inspect/reference");
  await command(page, 'note retained.txt "Keep this through update."');
  await page.goto(site.url + "#/inspect/lesson/duration");
  await page
    .getByRole("textbox", { name: "Command", exact: true })
    .fill("ffprobe mousepad-demo.mp4");
  const first = await page
    .locator(".app-status")
    .getAttribute("data-running-build");
  const second = await context.newPage();
  await second.goto(site.url + "optional/command-workbench.html");
  await second
    .getByRole("button", { name: "Use practice video", exact: true })
    .click();
  await second
    .getByRole("button", { name: "Continue to Inspect →", exact: true })
    .click();
  const before = Object.entries(site.requests)
    .filter(([k]) => !["release.json", "sw.js"].includes(k))
    .reduce((n, [, v]) => n + v, 0);
  site.release = 1;
  const p = await panel(page);
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.outdated);
  expect(
    Object.entries(site.requests)
      .filter(([k]) => !["release.json", "sw.js"].includes(k))
      .reduce((n, [, v]) => n + v, 0),
  ).toBe(before);
  await p.getByRole("button", { name: s.update, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.ready, {
    timeout: 45000,
  });
  await p.getByRole("button", { name: s.later, exact: true }).click();
  await expect(p.locator("summary")).toContainText(s.ready);
  await expect(p).toHaveAttribute("data-running-build", first!);
  await second.locator("#command").dispatchEvent("compositionstart");
  await panel(page);
  await p.getByRole("button", { name: s.restart, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.restartFailed, {
    timeout: 15000,
  });
  await expect(p).toHaveAttribute("data-running-build", first!);
  await second.locator("#command").dispatchEvent("compositionend");
  // The other real workbench performs actual WASM work; no fake busy timer or mocked engine.
  await second
    .getByRole("button", { name: "Type command", exact: true })
    .click();
  await second
    .locator("#command")
    .fill(
      'ffmpeg -i mousepad-demo.mp4 -vf "scale=1920:1080" -c:v libx264 -preset veryslow -t 12 running.mp4',
    );
  await second
    .getByRole("button", { name: "Run command →", exact: true })
    .click();
  await expect(
    second.getByRole("button", { name: "Cancel operation", exact: true }),
  ).toBeVisible();
  await p.getByRole("button", { name: s.restart, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.restartFailed, {
    timeout: 15000,
  });
  await expect(p).toHaveAttribute("data-running-build", first!);
  await second
    .getByRole("button", { name: "Cancel operation", exact: true })
    .click();
  await expect(
    second.getByRole("button", { name: "Run command →", exact: true }),
  ).toBeEnabled();
  // Drop one activation request to prove timeout recovery before a real coordinated restart.
  await page.evaluate(() => {
    const original = ServiceWorker.prototype.postMessage;
    let drop = true;
    ServiceWorker.prototype.postMessage = function (message, transfer) {
      if (message === "ACTIVATE" && drop) {
        drop = false;
        return;
      }
      return original.call(
        this,
        message,
        Array.isArray(transfer) ? { transfer } : transfer,
      );
    };
  });
  await p.getByRole("button", { name: s.restart, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.restartFailed, {
    timeout: 15000,
  });
  await Promise.all([
    page.waitForEvent("framenavigated", (f) => f === page.mainFrame()),
    second.waitForEvent("framenavigated", (f) => f === second.mainFrame()),
    p.getByRole("button", { name: s.restart, exact: true }).click(),
  ]);
  const replacement = JSON.parse(
    await readFile(".media-work/status-release/release.json", "utf8"),
  );
  await expect(p).toHaveAttribute("data-running-build", replacement.build);
  await expect(second.locator(".app-status")).toHaveAttribute(
    "data-running-build",
    replacement.build,
  );
  await expect(page).toHaveURL(/#\/inspect\/lesson\/duration$/);
  await expect(
    page.getByRole("textbox", { name: "Command", exact: true }),
  ).toHaveValue("ffprobe mousepad-demo.mp4");
  await context.setOffline(true);
  await page.reload();
  await panel(page);
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
  );
  await command(page, "cat retained.txt");
  await expect(terminal(page)).toContainText("Keep this through update.");
  await command(page, "ffprobe mousepad-demo.mp4");
  await expect(
    page.getByLabel("Command output", { exact: true }),
  ).toContainText("Duration: 00:00:12.00");
  await second.close();
});

test("cancelled preparation and failed replacement keep the previous release usable, then resume", async ({
  page,
  context,
  site,
}) => {
  test.setTimeout(90000);
  await page.goto(site.url + "#/capture");
  await save(page);
  const p = await panel(page),
    first = await p.getAttribute("data-running-build");
  site.release = 1;
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.outdated);
  site.delay = "app-status-release-fixture.txt";
  await p.getByRole("button", { name: s.update, exact: true }).click();
  await expect(p.getByRole("progressbar")).toBeVisible();
  await p.getByRole("button", { name: s.cancel, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.updatePaused, {
    timeout: 15000,
  });
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
  );
  await context.setOffline(true);
  await page.reload();
  await expect(p).toHaveAttribute("data-running-build", first!);
  await context.setOffline(false);
  await page.evaluate(() => dispatchEvent(new Event("online")));
  await panel(page);
  site.delay = "";
  site.fail = "app-status-release-fixture.txt";
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator(".release-status")).toHaveAttribute(
    "data-release-state",
    "outdated",
  );
  await p.getByRole("button", { name: s.update, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(
    s.prepareUnavailable,
  );
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
  );
  site.fail = "";
  await p.getByRole("button", { name: s.retry, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.ready, {
    timeout: 30000,
  });
});

test("one download resumes legacy lesson-only protocol saves; removal preserves all user and sibling stores", async ({
  page,
  context,
  site,
}) => {
  test.setTimeout(90000);
  await page.goto(site.url + "#/capture");
  await page.evaluate(async () => {
    await navigator.serviceWorker.register("sw.js");
    const r = await navigator.serviceWorker.ready;
    await new Promise<void>((resolve, reject) => {
      const c = new MessageChannel();
      c.port1.onmessage = (e) => {
        if (e.data.progress) {
          reject(new Error("Legacy command emitted progress"));
          return;
        }
        c.port1.close();
        e.data.ready ? resolve() : reject(new Error("Legacy download failed"));
      };
      r.active!.postMessage("DOWNLOAD", [c.port2]);
    });
  });
  const p = await panel(page);
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
  await expect(p.locator("[data-offline-ready]")).toHaveText(
    s.offlineIncomplete,
  );
  expect(Object.keys(site.requests).some((k) => k.startsWith("encoder/"))).toBe(
    false,
  );
  const count = site.requests["media/frames/119.jpg"];
  await context.setOffline(true);
  await page.reload();
  await panel(page);
  const shipped = JSON.parse(await readFile("dist/release.json", "utf8"));
  await expect(p).toContainText(shipped.bytes.toLocaleString() + " B");
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
  await context.setOffline(false);
  await page.evaluate(() => dispatchEvent(new Event("online")));
  await p.getByRole("button", { name: s.resume, exact: true }).click();
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 30000 },
  );
  expect(site.requests["media/frames/119.jpg"]).toBe(count);
  await page.evaluate(async () => {
    const r = await navigator.serviceWorker.getRegistration();
    await new Promise<void>((resolve, reject) => {
      const c = new MessageChannel();
      c.port1.onmessage = (e) => {
        c.port1.close();
        e.data.ready === true && !e.data.progress
          ? resolve()
          : reject(new Error("Legacy encoder reply must be final"));
      };
      r!.active!.postMessage("DOWNLOAD_ENCODER", [c.port2]);
    });
  });
  await page
    .getByRole("button", { name: "Use practice video", exact: true })
    .click();
  await expect(page.locator(".cli-preview video")).toBeVisible();
  await page.goto(site.url + "#/inspect/reference");
  await command(page, 'note kept.txt "Do not remove user work."');
  await page.evaluate(async () => {
    localStorage.setItem("sibling:answer", "retained");
    await (
      await caches.open("sibling-cache")
    ).put("/sibling/data", new Response("kept"));
  });
  await panel(page);
  await p.getByRole("button", { name: s.remove, exact: true }).click();
  const dialog = page.getByRole("dialog", { name: s.removeTitle, exact: true });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    p.getByRole("button", { name: s.remove, exact: true }),
  ).toBeFocused();
  await p.getByRole("button", { name: s.remove, exact: true }).click();
  await dialog
    .getByRole("button", { name: s.confirmRemove, exact: true })
    .click();
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
  expect(
    await page.evaluate(async () => ({
      sibling: localStorage.getItem("sibling:answer"),
      cached: await caches.has("sibling-cache"),
    })),
  ).toEqual({ sibling: "retained", cached: true });
  await command(page, "cat kept.txt");
  await expect(terminal(page)).toContainText("Do not remove user work.");
  await p.getByRole("button", { name: s.download, exact: true }).click();

  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 30000 },
  );
});

test("unsupported storage keeps the online course and running identity available", async ({
  page,
  site,
}) => {
  // Feature absence, rather than an unavailable registration, is the unsupported case.
  await page.addInitScript(() => {
    delete (Navigator.prototype as unknown as Record<string, unknown>)
      .serviceWorker;
    delete (navigator as unknown as Record<string, unknown>).serviceWorker;
  });
  await page.goto(site.url);
  const p = await panel(page);
  await expect(p.locator("[data-offline-ready]")).toHaveText(
    s.offlineUnavailable,
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(p.locator("summary code")).not.toBeEmpty();
});

test("Later survives closing every app window; only explicit restart selects the prepared saved release", async ({
  page,
  context,
  site,
}) => {
  test.setTimeout(90000);
  await page.goto(site.url + "#/capture");
  await save(page);
  const p = await panel(page),
    first = await p.getAttribute("data-running-build");
  site.release = 1;
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.outdated);
  await p.getByRole("button", { name: s.update, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.ready, {
    timeout: 30000,
  });
  await p.getByRole("button", { name: s.later, exact: true }).click();
  await page.close();
  await context.setOffline(true);
  const fresh = await context.newPage();
  await fresh.goto(site.url + "#/capture");
  const control = await panel(fresh);
  await expect(control).toHaveAttribute("data-running-build", first!);
  await expect(control.locator("summary")).toContainText(s.ready);
  await fresh.evaluate(() => {
    const original = ServiceWorker.prototype.postMessage;
    let drop = true;
    ServiceWorker.prototype.postMessage = function (message, options) {
      if (message === "ACTIVATE" && drop) {
        drop = false;
        return;
      }
      return original.call(
        this,
        message,
        Array.isArray(options) ? { transfer: options } : options,
      );
    };
  });
  await control.getByRole("button", { name: s.restart, exact: true }).click();
  await expect(control.locator("[data-version-state]")).toHaveText(
    s.restartFailed,
    { timeout: 15000 },
  );
  await expect(control).toHaveAttribute("data-running-build", first!);
  await control.getByRole("button", { name: s.restart, exact: true }).click();
  const replacement = JSON.parse(
    await readFile(".media-work/status-release/release.json", "utf8"),
  );
  await expect(control).toHaveAttribute(
    "data-running-build",
    replacement.build,
  );
  await expect(control.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
  );
});

test("online-only update does not opt into the processing-tool offline download", async ({
  page,
  site,
}) => {
  test.setTimeout(60000);
  await page.goto(site.url + "#/");
  const p = await panel(page);
  site.release = 1;
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.outdated);
  await p.getByRole("button", { name: s.update, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.ready, {
    timeout: 30000,
  });
  await p.getByRole("button", { name: s.restart, exact: true }).click();
  const replacement = JSON.parse(
    await readFile(".media-work/status-release/release.json", "utf8"),
  );
  await expect(p).toHaveAttribute("data-running-build", replacement.build);
  await panel(page);
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
  expect(Object.keys(site.requests).some((k) => k.startsWith("encoder/"))).toBe(
    false,
  );
});

test("empty workspaces can restart with unavailable media storage", async ({
  page,
  site,
}) => {
  test.setTimeout(60000);
  await page.addInitScript(() => {
    IDBFactory.prototype.open = function () {
      throw new DOMException("Media storage unavailable", "InvalidStateError");
    };
  });
  await page.goto(site.url + "#/capture");
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-workspace-ready",
    "true",
  );
  const p = await panel(page);
  site.release = 1;
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.outdated);
  await p.getByRole("button", { name: s.update, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.ready, {
    timeout: 30000,
  });
  await p.getByRole("button", { name: s.restart, exact: true }).click();
  const replacement = JSON.parse(
    await readFile(".media-work/status-release/release.json", "utf8"),
  );
  await expect(p).toHaveAttribute("data-running-build", replacement.build);
});

test("non-durable imported work in another tab blocks restart until it is downloaded and that tab closes", async ({
  page,
  context,
  site,
}) => {
  test.setTimeout(60000);
  await page.goto(site.url + "#/");
  const p = await panel(page);
  const first = await p.getAttribute("data-running-build");
  const other = await context.newPage();
  await other.addInitScript(() => {
    IDBFactory.prototype.open = function () {
      throw new DOMException("Storage unavailable", "InvalidStateError");
    };
  });
  await other.goto(site.url + "#/capture");
  const original = await readFile("public/media/mousepad-demo.mp4");
  const chooser = other.waitForEvent("filechooser");
  await other.getByRole("button", { name: "Import file", exact: true }).click();
  await (
    await chooser
  ).setFiles({ name: "unsaved.mp4", mimeType: "video/mp4", buffer: original });
  await expect(other.locator(".cli-preview video")).toBeVisible();
  site.release = 1;
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.outdated);
  await p.getByRole("button", { name: s.update, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.ready, {
    timeout: 30000,
  });
  await p.getByRole("button", { name: s.restart, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.restartFailed, {
    timeout: 15000,
  });
  await expect(p).toHaveAttribute("data-running-build", first!);
  const pending = other.waitForEvent("download");
  await other
    .getByRole("button", { name: "Download unsaved.mp4", exact: true })
    .click();
  expect(await readFile((await (await pending).path())!)).toEqual(original);
  await other.close();
  await p.getByRole("button", { name: s.restart, exact: true }).click();
  const replacement = JSON.parse(
    await readFile(".media-work/status-release/release.json", "utf8"),
  );
  await expect(p).toHaveAttribute("data-running-build", replacement.build);
});

test("incoherent deployed metadata cannot mark another asset set ready; retry prepares the actual published build", async ({
  page,
  site,
}) => {
  test.setTimeout(60000);
  await page.goto(site.url + "#/capture");
  await save(page);
  const p = await panel(page);
  site.release = 1;
  site.metadata = { build: "c".repeat(64) };
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.outdated);
  await p.getByRole("button", { name: s.update, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(
    s.prepareUnavailable,
    { timeout: 15000 },
  );
  await expect(p.locator("summary")).not.toContainText(s.ready);
  await expect(p.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
  );
  expect(
    await page.evaluate(async () => {
      const r = await navigator.serviceWorker.getRegistration();
      return await new Promise((resolve) => {
        const c = new MessageChannel();
        c.port1.onmessage = (e) => {
          c.port1.close();
          resolve(e.data.prepared);
        };
        r!.waiting!.postMessage("DETAILS", [c.port2]);
      });
    }),
  ).toBe(false);
  site.metadata = undefined;
  await p.getByRole("button", { name: s.check, exact: true }).click();
  await expect(p.locator(".release-status")).toHaveAttribute(
    "data-release-state",
    "outdated",
  );
  await p.getByRole("button", { name: s.retry, exact: true }).click();
  await expect(p.locator("[data-version-state]")).toHaveText(s.ready, {
    timeout: 30000,
  });
});
