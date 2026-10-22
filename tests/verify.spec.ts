// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { v } from "../src/verify/strings";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-8");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(v.title);
};

test("verify lesson renders three candidate players, the probe table and the editor", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await open(page);
  const players = page.locator("#ix-candidate-players video");
  await expect(players).toHaveCount(3);
  await expect(players.nth(0)).toHaveAttribute("src", /build-queue\.mp4$/);
  await expect(players.nth(1)).toHaveAttribute("src", /edit\/captioned\.mp4$/);
  await expect(players.nth(2)).toHaveAttribute(
    "src",
    /edit\/half-size-crf23\.mp4$/,
  );
  const table = page.locator("#ix-candidate-probes .sound-levels");
  await expect(table).toBeVisible();
  await expect(table).toContainText(`${v.candidates.plain.bytes} ${v.bytes}`);
  await expect(table).toContainText(
    `${v.candidates.captioned.bytes} ${v.bytes}`,
  );
  await expect(table).toContainText(`${v.candidates.half.bytes} ${v.bytes}`);
  await expect(table).toContainText("Video: h264 640 × 360");
  await expect(table).toContainText("Audio: aac 48000 Hz × 1 ch");
  const editor = page.locator("#ix-export-editor");
  await expect(editor).toBeVisible();
  await expect(
    editor.getByRole("button", { name: v.export, exact: true }),
  ).toBeVisible();
  await expect(editor.getByText(v.statusIdle, { exact: true })).toBeVisible();
  const broken = page.locator("#ix-broken-candidate");
  await expect(broken.locator("video")).toHaveAttribute(
    "src",
    /edit\/video-only\.mp4$/,
  );
  await expect(broken).toContainText("44659");
  expect(errors).toEqual([]);
});

test("export editor runs a real WASM export and probes the produced file", async ({
  page,
}) => {
  test.setTimeout(120000);
  await open(page);
  const coreRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("vendor/ffmpeg/"))
      coreRequests.push(request.url());
  });
  const editor = page.locator("#ix-export-editor");
  await expect(editor.getByText(v.statusIdle, { exact: true })).toBeVisible();
  expect(coreRequests).toEqual([]);
  await editor.getByRole("button", { name: v.export, exact: true }).click();
  await expect(editor.getByText(v.statusDone, { exact: true })).toBeVisible({
    timeout: 90000,
  });
  expect(coreRequests.some((u) => u.endsWith("ffmpeg-core.wasm"))).toBe(true);
  await expect(editor.locator(".encode-command").first()).toContainText(
    "ffmpeg -y -i source.mp4 -vf scale=960:540 -c:v libx264 -crf 23",
  );
  const facts = editor.locator(".encode-facts");
  // The default 960x540 CRF 23 export must report both streams.
  await expect(facts).toContainText("Video: h264 960 × 540");
  await expect(facts).toContainText("Audio: aac 48000 Hz × 1 ch");
  await expect(facts).toContainText(/12[0-9]{4} bytes/);
  await expect(facts).toContainText(/10\.00\d s/);
  const video = editor.locator("video");
  await expect(video).toHaveAttribute("src", /^blob:/);
  await expect
    .poll(() => video.evaluate((el) => (el as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  const download = editor.getByRole("link", { name: v.download });
  await expect(download).toHaveAttribute("download", "export.mp4");
  expect(await download.getAttribute("href")).toMatch(/^blob:/);
});

test("export editor reports failure honestly when the encoder core cannot load", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.route("**/vendor/ffmpeg/ffmpeg-core.wasm", (route) =>
    route.abort(),
  );
  await open(page);
  const editor = page.locator("#ix-export-editor");
  await editor.getByRole("button", { name: v.export, exact: true }).click();
  await expect(editor.getByText(v.unavailable, { exact: true })).toBeVisible({
    timeout: 60000,
  });
});

test("verify challenge grades the reference and rejects wrong choices", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
  await expect(
    page.getByText(v.feedback.broken, { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: v.fieldLabels.broken, exact: true })
    .selectOption("videoOnly");
  await page
    .getByRole("combobox", { name: v.fieldLabels.check, exact: true })
    .selectOption("streams");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=publish-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=publish-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page
    .getByRole("combobox", { name: v.fieldLabels.broken, exact: true })
    .selectOption("plain");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await expect(
    page.getByText(v.feedback.broken, { exact: true }),
  ).toBeVisible();
});

test("failed verify media keeps the editor and grading usable", async ({
  page,
}) => {
  await page.route("**/media/edit/*.mp4", (route) => route.abort());
  await open(page);
  await expect(page.getByRole("alert").first()).toBeVisible();
  const editor = page.locator("#ix-export-editor");
  await expect(
    editor.getByRole("button", { name: v.export, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
});
