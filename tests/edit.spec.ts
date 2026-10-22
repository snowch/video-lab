// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { ed } from "../src/edit/strings";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-4");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(ed.title);
};
const play = async (video: import("@playwright/test").Locator) => {
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  await video.evaluate((v) => (v as HTMLVideoElement).play());
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime))
    .toBeGreaterThan(0.05);
  await video.evaluate((v) => (v as HTMLVideoElement).pause());
};

test("readability lesson renders the source, comparison, scale-down, callouts and pacing players", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await open(page);
  const videos = page.locator("video");
  // motivation source, prediction source, investigation pair (full, cropped),
  // failure scale-down, callouts pair, pacing pair.
  await expect(videos).toHaveCount(9);
  await expect(videos.nth(0)).toHaveAttribute("src", /build-queue\.mp4$/);
  await expect(videos.nth(1)).toHaveAttribute("src", /build-queue\.mp4$/);
  await expect(videos.nth(2)).toHaveAttribute("src", /build-queue\.mp4$/);
  await expect(videos.nth(3)).toHaveAttribute(
    "src",
    /edit\/cropped-zoom\.mp4$/,
  );
  await expect(videos.nth(4)).toHaveAttribute(
    "src",
    /edit\/half-size-crf23\.mp4$/,
  );
  await expect(videos.nth(5)).toHaveAttribute("src", /edit\/callout\.mp4$/);
  await expect(videos.nth(6)).toHaveAttribute(
    "src",
    /edit\/timed-callout\.mp4$/,
  );
  await expect(videos.nth(7)).toHaveAttribute("src", /edit\/zoom-pan\.mp4$/);
  await expect(videos.nth(8)).toHaveAttribute("src", /edit\/crossfade\.mp4$/);
  await play(videos.nth(3));
  await play(videos.nth(4));
  await play(videos.nth(8));
  // The crop editor is present with its six geometry controls.
  const editor = page.locator("#ix-crop-editor");
  await expect(editor).toBeVisible();
  await expect(
    editor.getByRole("button", { name: ed.run, exact: true }),
  ).toBeVisible();
  await expect(editor.getByText(ed.statusIdle, { exact: true })).toBeVisible();
  for (const label of [
    ed.width,
    ed.height,
    ed.x,
    ed.y,
    ed.outWidth,
    ed.outHeight,
  ])
    await expect(
      editor.getByRole("spinbutton", { name: label, exact: true }),
    ).toBeVisible();
  expect(errors).toEqual([]);
});

test("crop editor runs a real WASM crop-and-scale and probes the result", async ({
  page,
}) => {
  test.setTimeout(120000);
  await open(page);
  const coreRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("vendor/ffmpeg/"))
      coreRequests.push(request.url());
  });
  const editor = page.locator("#ix-crop-editor");
  await expect(editor.getByText(ed.statusIdle, { exact: true })).toBeVisible();
  expect(coreRequests).toEqual([]);
  await editor.getByRole("button", { name: ed.run, exact: true }).click();
  await expect(editor.getByText(ed.statusDone, { exact: true })).toBeVisible({
    timeout: 90000,
  });
  expect(coreRequests.some((u) => u.endsWith("ffmpeg-core.wasm"))).toBe(true);
  await expect(editor.getByText("ffmpeg -y -i source.mp4")).toBeVisible();
  await expect(
    editor.getByText("crop=480:270:240:135,scale=960:540"),
  ).toBeVisible();
  const facts = editor.locator(".encode-facts");
  await expect(facts).toContainText("960 × 540");
  await expect(facts).toContainText("bytes");
  const video = editor.locator("video");
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  const download = editor.getByRole("link", { name: ed.download });
  await expect(download).toHaveAttribute("download", "cropped.mp4");
  expect(await download.getAttribute("href")).toMatch(/^blob:/);
});

test("crop editor rejects odd dimensions and reports failure honestly", async ({
  page,
}) => {
  test.setTimeout(60000);
  await open(page);
  const editor = page.locator("#ix-crop-editor");
  const run = editor.getByRole("button", { name: ed.run, exact: true });
  await editor
    .getByRole("spinbutton", { name: ed.width, exact: true })
    .fill("481");
  await expect(run).toBeDisabled();
  await page.route("**/vendor/ffmpeg/ffmpeg-core.wasm", (route) =>
    route.abort(),
  );
  await editor
    .getByRole("spinbutton", { name: ed.width, exact: true })
    .fill("480");
  await expect(run).toBeEnabled();
  await run.click();
  await expect(editor.getByText(ed.unavailable, { exact: true })).toBeVisible({
    timeout: 60000,
  });
});

test("readability challenge grades the reference and rejects wrong choices", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
  await expect(
    page.getByText(ed.feedback.readable, { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: ed.fieldLabels.readable, exact: true })
    .selectOption("crop");
  await page
    .getByRole("combobox", { name: ed.fieldLabels.why, exact: true })
    .selectOption("enlarge");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=readability]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=readability]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page
    .getByRole("combobox", { name: ed.fieldLabels.readable, exact: true })
    .selectOption("full");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await expect(
    page.getByText(ed.feedback.readable, { exact: true }),
  ).toBeVisible();
});

test("failed media keeps the crop editor and grading usable", async ({
  page,
}) => {
  await page.route("**/media/edit/*.mp4", (route) => route.abort());
  await open(page);
  await expect(page.getByRole("alert").first()).toBeVisible();
  const editor = page.locator("#ix-crop-editor");
  await expect(
    editor.getByRole("button", { name: ed.run, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
});
