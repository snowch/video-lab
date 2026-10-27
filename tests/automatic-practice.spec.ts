// Copyright © 2026 Christopher Snow
import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { expectPracticeReady, expectSavedCell } from "./notebook-storage";
import { n } from "../src/notebook/ui.strings";
import { appStatusStrings as status } from "../src/app-status/strings";
import { practiceAssets } from "../src/notebook/assets";

async function storedFiles(page: Page) {
  return page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("video-lab-notebook", 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const files = await new Promise<
      { name: string; blob: Blob; origin: string }[]
    >((resolve, reject) => {
      const tx = db.transaction("files");
      const request = tx.objectStore("files").getAll();
      tx.oncomplete = () => resolve(request.result);
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return Promise.all(
      files.map(async (file) => ({
        name: file.name,
        origin: file.origin,
        sha256: [
          ...new Uint8Array(
            await crypto.subtle.digest(
              "SHA-256",
              await file.blob.arrayBuffer(),
            ),
          ),
        ]
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(""),
      })),
    );
  });
}

test("opening a page prepares only its required files and guards commands during loading", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  let release!: () => void;
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/media/notebook/bunny-short.mp4", async (route) => {
    await hold;
    await route.continue();
  });
  await page.goto("./");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  expect(await storedFiles(page)).toEqual([]);
  await page
    .getByRole("link", { name: "Start chapter 1 →", exact: true })
    .click();
  const source = page.locator(".notebook-source");
  await expect(source.getByRole("status")).toHaveText(n.sourceLoading);
  await expect(page.locator(".notebook-workspace-status")).toHaveClass(
    /sr-only/,
  );
  await expect(
    page.locator(".notebook-workspace-status > [role=status]"),
  ).toBeEmpty();
  const cell = page.locator('[data-cell="first-edit/shorten:worked:0"]');
  await expect(
    cell.getByRole("button", { name: n.run, exact: true }),
  ).toBeDisabled();
  await cell.locator("textarea").press("Shift+Enter");
  await expect(cell.locator(".notebook-log")).toHaveCount(0);
  release();
  await expectPracticeReady(page);
  await expect(source.getByRole("button", { name: n.sourceRetry })).toHaveCount(
    0,
  );
  await expect(source.locator("video")).toBeVisible();
  expect((await storedFiles(page)).map((f) => f.name)).toEqual([
    "bunny-short.mp4",
  ]);
  expect(
    requests.filter((url) => url.endsWith("/bunny-short.mp4")),
  ).toHaveLength(1);
  expect(
    requests.some(
      (url) => url.includes("/encoder/") || url.endsWith("/bunny.mp4"),
    ),
  ).toBe(false);
  await expect(
    cell.getByRole("button", { name: n.run, exact: true }),
  ).toBeEnabled();
  await page.reload();
  await expectPracticeReady(page);
  expect(
    requests.filter((url) => url.endsWith("/bunny-short.mp4")),
  ).toHaveLength(1);
});

test("failed and corrupt downloads stop, preserve drafts and recover only on retry", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/media/notebook/bunny-short.mp4", async (route) => {
    calls++;
    if (calls === 1) return route.abort("internetdisconnected");
    if (calls === 2) {
      const bytes = Buffer.from(
        readFileSync("public/media/notebook/bunny-short.mp4"),
      );
      bytes[20] = bytes[20]! ^ 1;
      return route.fulfill({ contentType: "video/mp4", body: bytes });
    }
    await route.continue();
  });
  await page.goto("./#/learn/first-edit/shorten");
  const source = page.locator(".notebook-source");
  await expect(source.getByRole("alert")).toHaveText(n.sourceLoadFailed);
  const cell = page.locator('[data-cell="first-edit/shorten:worked:0"]');
  const draft = "ffprobe bunny-short.mp4";
  await cell.locator("textarea").fill(draft);
  await expectSavedCell(page, "first-edit/shorten:worked:0", {
    command: draft,
  });
  expect(calls).toBe(1);
  expect(await storedFiles(page)).toEqual([]);
  await source.getByRole("button", { name: n.sourceRetry }).click();
  await expect(source.getByRole("alert")).toHaveText(n.sourceMismatch);
  expect(calls).toBe(2);
  expect(await storedFiles(page)).toEqual([]);
  await source.getByRole("button", { name: n.sourceRetry }).click();
  await expectPracticeReady(page);
  expect(calls).toBe(3);
  await expect(cell.locator("textarea")).toHaveValue(draft);
  expect((await storedFiles(page))[0]!.sha256).toBe(
    practiceAssets["bunny-short.mp4"]!.sha256,
  );
});

test("automatic preparation preserves an imported same-name file and never overwrites a draft", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: n.files, exact: true }).click();
  const dialog = page.getByRole("dialog", { name: n.yourFiles, exact: true });
  const ownVideo = readFileSync("public/media/notebook/bunny-action.mp4");
  await dialog
    .locator('input[type="file"]:not([webkitdirectory])')
    .setInputFiles({
      name: "bunny-short.mp4",
      mimeType: "video/mp4",
      buffer: ownVideo,
    });
  await expect(
    dialog.getByRole("button", { name: "bunny-short.mp4", exact: true }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: n.close, exact: true }).click();
  await page.route("**/media/notebook/bunny-short.mp4", (route) =>
    route.abort(),
  );
  await page.goto("./#/learn/first-edit/shorten");
  await expectPracticeReady(page);
  const id = "first-edit/shorten:worked:0";
  const editor = page.locator(`[data-cell="${id}"] textarea`);
  await editor.fill("ffprobe -show_streams bunny-short.mp4");
  await expectSavedCell(page, id, {
    command: "ffprobe -show_streams bunny-short.mp4",
  });
  await page.reload();
  await expectPracticeReady(page);
  await expect(editor).toHaveValue("ffprobe -show_streams bunny-short.mp4");
  expect(await storedFiles(page)).toEqual([
    {
      name: "bunny-short.mp4",
      origin: "imported",
      sha256: createHash("sha256").update(ownVideo).digest("hex"),
    },
  ]);
});

test("leaving a loading lesson cancels it and the next page prepares its own inputs", async ({
  page,
}) => {
  let release!: () => void;
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  let requested = false;
  await page.route("**/media/notebook/bunny-short.mp4", async (route) => {
    requested = true;
    await hold;
    await route.continue().catch(() => {});
  });
  await page.goto("./#/learn/first-edit/shorten");
  await expect.poll(() => requested).toBe(true);
  await page.evaluate(() => {
    location.hash = "#/";
  });
  await expect(page.locator(".notebook-home")).toBeVisible();
  release();
  await page.unroute("**/media/notebook/bunny-short.mp4");
  await page.evaluate(() => {
    location.hash = "#/learn/text/subtitles";
  });
  await expectPracticeReady(page);
  expect((await storedFiles(page)).map((f) => f.name)).toEqual([
    "bunny-short.mp4",
    "captions.srt",
    "fonts/DejaVuSans.ttf",
  ]);
  await expect(page.locator(".notebook-source [role=alert]")).toHaveCount(0);
});

test("two tabs can prepare the same lesson without collisions", async ({
  page,
  context,
}) => {
  const other = await context.newPage();
  await Promise.all([
    page.goto("./#/learn/inside-video/inspect"),
    other.goto("./#/learn/inside-video/inspect"),
  ]);
  await Promise.all([expectPracticeReady(page), expectPracticeReady(other)]);
  const expected = ["bunny-action.mp4", "bunny-short.mp4"].map((name) => ({
    name,
    origin: "provided",
    sha256: practiceAssets[name]!.sha256,
  }));
  expect(await storedFiles(page)).toEqual(expected);
  expect(await storedFiles(other)).toEqual(expected);
  await other.close();
});

test("a saved offline app prepares a not-yet-visited lesson from its cache", async ({
  page,
  context,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  test.setTimeout(90000);
  await page.goto("./");
  const panel = page.locator(".app-status");
  await panel.locator("summary").click();
  await panel
    .getByRole("button", { name: status.download, exact: true })
    .click();
  await expect(panel.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 45000 },
  );
  expect(await storedFiles(page)).toEqual([]);
  await context.setOffline(true);
  await page.goto("./#/learn/text/subtitles");
  await page.reload();
  await expectPracticeReady(page);
  expect((await storedFiles(page)).map((f) => f.name)).toEqual([
    "bunny-short.mp4",
    "captions.srt",
    "fonts/DejaVuSans.ttf",
  ]);
  await context.setOffline(false);
});

test("deleting a practice file does not immediately recreate it", async ({
  page,
}) => {
  let requests = 0;
  page.on("request", (r) => {
    if (r.url().endsWith("/bunny-short.mp4")) requests++;
  });
  await page.goto("./#/learn/first-edit/shorten");
  await expectPracticeReady(page);
  await page.getByRole("button", { name: n.files, exact: true }).click();
  const dialog = page.getByRole("dialog", { name: n.yourFiles, exact: true });
  await dialog
    .getByLabel(`${n.moreActions}: bunny-short.mp4`, { exact: true })
    .click();
  await dialog
    .getByRole("button", { name: `${n.delete} bunny-short.mp4`, exact: true })
    .click();
  await dialog.getByRole("button", { name: n.delete, exact: true }).click();
  await dialog.getByRole("button", { name: n.close, exact: true }).click();
  await expect(page.locator(".notebook-source [role=alert]")).toHaveText(
    n.sourceMissing,
  );
  expect(await storedFiles(page)).toEqual([]);
  expect(requests).toBe(1);
  await page.getByRole("button", { name: n.sourceRetry, exact: true }).click();
  await expectPracticeReady(page);
  expect(requests).toBe(2);
});

test("a stalled practice download times out and can be retried", async ({
  page,
}) => {
  await page.clock.install();
  let calls = 0;
  let release!: () => void;
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/media/notebook/bunny-short.mp4", async (route) => {
    calls++;
    if (calls === 1) await hold;
    await route.continue().catch(() => {});
  });
  await page.goto("./#/learn/first-edit/shorten");
  await expect.poll(() => calls).toBe(1);
  await page.clock.fastForward(30001);
  await expect(page.locator(".notebook-source [role=alert]")).toHaveText(
    n.sourceTimeout,
  );
  expect(await storedFiles(page)).toEqual([]);
  release();
  await page.getByRole("button", { name: n.sourceRetry, exact: true }).click();
  await expectPracticeReady(page);
  expect(calls).toBe(2);
});

test("a full workspace keeps every file and can prepare after space is freed", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  await page.goto("./");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve) => {
      const request = indexedDB.open("video-lab-notebook", 1);
      request.onsuccess = () => resolve(request.result);
    });
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("files", "readwrite");
      for (let i = 0; i < 64; i++)
        tx.objectStore("files").put({
          name: `note-${String(i).padStart(2, "0")}.txt`,
          blob: new Blob(["Keep me"]),
          origin: "imported",
        });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  });
  await page.goto("./#/learn/first-edit/shorten");
  await expect(page.locator(".notebook-source [role=alert]")).toContainText(
    "at most 64 files",
  );
  expect(await storedFiles(page)).toHaveLength(64);
  await page.getByRole("button", { name: n.files, exact: true }).click();
  const dialog = page.getByRole("dialog", { name: n.yourFiles, exact: true });
  await dialog
    .getByLabel(`${n.moreActions}: note-00.txt`, { exact: true })
    .click();
  await dialog
    .getByRole("button", { name: `${n.delete} note-00.txt`, exact: true })
    .click();
  await dialog.getByRole("button", { name: n.delete, exact: true }).click();
  await dialog.getByRole("button", { name: n.close, exact: true }).click();
  await page.getByRole("button", { name: n.sourceRetry, exact: true }).click();
  await expectPracticeReady(page);
  const files = await storedFiles(page);
  expect(files).toHaveLength(64);
  expect(files.filter((f) => f.origin === "imported")).toHaveLength(63);
});
