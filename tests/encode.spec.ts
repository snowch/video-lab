// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { b } from "../src/build/strings";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-1");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(b.title);
};

test("real WASM encode: video-only build produces a probed MP4 you can play and download", async ({
  page,
}) => {
  test.setTimeout(120000);
  await open(page);
  // The core must not be requested before Run is pressed.
  const coreRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("vendor/ffmpeg/"))
      coreRequests.push(request.url());
  });
  await expect(page.getByText(b.statusIdle)).toBeVisible();
  expect(coreRequests).toEqual([]);
  await page.getByRole("button", { name: b.run, exact: true }).click();
  await expect(page.getByText(b.statusDone, { exact: true })).toBeVisible({
    timeout: 90000,
  });
  expect(coreRequests.some((u) => u.endsWith("ffmpeg-core.wasm"))).toBe(true);
  const result = page.locator(".recorder-result").first();
  await expect(result.locator("video")).toBeVisible();
  await expect(
    result.getByText("ffmpeg -y -framerate 1 -i still-%03d.jpg"),
  ).toBeVisible();
  const facts = result.locator(".encode-facts");
  await expect(facts).toContainText("h264");
  await expect(facts).toContainText("960 × 540");
  await expect(facts).toContainText("4 s");
  const video = result.locator("video");
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  await video.evaluate((v) => {
    const media = v as HTMLVideoElement;
    media.currentTime = 1.5;
    return media.play();
  });
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).currentTime))
    .toBeGreaterThan(1.6);
  await video.evaluate((v) => (v as HTMLVideoElement).pause());
  const download = result.getByRole("link", { name: b.download });
  await expect(download).toHaveAttribute("download", "film.mp4");
  const href = await download.getAttribute("href");
  expect(href).toMatch(/^blob:/);
});

test("real mux: adding sound produces an H.264 + AAC file with a measured probe", async ({
  page,
}) => {
  test.setTimeout(120000);
  await open(page);
  await page.getByRole("button", { name: b.runMux, exact: true }).click();
  await expect(page.getByText(b.statusDone, { exact: true })).toBeVisible({
    timeout: 90000,
  });
  const results = page.locator(".recorder-result");
  await expect(results).toHaveCount(2);
  const muxed = results.nth(1);
  await expect(muxed.locator(".encode-facts")).toContainText("aac");
  await expect(muxed.locator(".encode-facts")).toContainText("8000 Hz");
  await expect(muxed.locator("video")).toBeVisible();
  await expect(
    muxed.getByText("ffmpeg -y -i film.mp4 -i tone.wav -map 0:v:0 -map 1:a:0"),
  ).toBeVisible();
});

test("frame-rate choice changes the run's measured result", async ({
  page,
}) => {
  test.setTimeout(120000);
  await open(page);
  await page.getByLabel(b.rateLabel).selectOption("2");
  await page.getByRole("button", { name: b.run, exact: true }).click();
  await expect(page.getByText(b.statusDone, { exact: true })).toBeVisible({
    timeout: 90000,
  });
  const facts = page
    .locator(".recorder-result")
    .first()
    .locator(".encode-facts");
  await expect(facts).toContainText("2 s");
  await expect(
    page.getByText("ffmpeg -y -framerate 2 -i still-%03d.jpg"),
  ).toBeVisible();
});

test("encoder failure offers the labelled pre-generated fallback", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.route("**/vendor/ffmpeg/ffmpeg-core.wasm", (route) =>
    route.abort(),
  );
  await open(page);
  await page.getByRole("button", { name: b.run, exact: true }).click();
  await expect(page.getByText(b.fallbackNote, { exact: true })).toBeVisible({
    timeout: 60000,
  });
  await expect(
    page.getByRole("link", { name: /pre-generated/ }).first(),
  ).toHaveAttribute("href", /fallback-video-only\.mp4$/);
});

test("probe challenge grades the reference and rejects wrong predictions", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(4);
  await page.getByLabel(b.fieldLabels.pictures, { exact: true }).fill("4");
  await page.getByLabel(b.fieldLabels.duration, { exact: true }).fill("4");
  await page.getByLabel(b.fieldLabels.size, { exact: true }).fill("34473");
  await page
    .getByRole("combobox", { name: b.fieldLabels.muxCodec, exact: true })
    .selectOption("aac");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(
    page.locator("[data-challenge=probe-prediction]"),
  ).toHaveAttribute("data-complete", "true");
});
