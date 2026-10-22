// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { ca } from "../src/captions/strings";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-7");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(ca.title);
};

test("captions lesson renders players, the SRT source and the editor", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await open(page);
  const players = page.locator("#ix-caption-players video");
  await expect(players).toHaveCount(2);
  await expect(players.nth(0)).toHaveAttribute("src", /build-queue\.mp4$/);
  await expect(players.nth(1)).toHaveAttribute("src", /edit\/captioned\.mp4$/);
  const source = page.locator("#ix-caption-source");
  await expect(source).toBeVisible();
  await expect(source.locator("pre")).toContainText(
    "Show the build queue before sorting.",
  );
  await expect(source.locator("pre")).toContainText(
    "00:00:00,000 --> 00:00:03,000",
  );
  await expect(source.locator("pre")).toContainText(
    "Payments is the longest build.",
  );
  await expect(source.locator(".sound-levels")).toContainText(
    "Cue 1: “Show the build queue before sorting.” from 00:00:00 to 00:00:03",
  );
  await expect(
    source.getByRole("link", { name: ca.downloadSrt }),
  ).toHaveAttribute("download", "captions.srt");
  const editor = page.locator("#ix-caption-editor");
  await expect(editor).toBeVisible();
  await expect(
    editor.getByRole("button", { name: ca.burn, exact: true }),
  ).toBeVisible();
  await expect(editor.getByText(ca.statusIdle, { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("caption editor runs a real WASM caption burn and plays the result", async ({
  page,
}) => {
  test.setTimeout(120000);
  await open(page);
  const coreRequests: string[] = [];
  const fontRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("vendor/ffmpeg/"))
      coreRequests.push(request.url());
    if (request.url().includes("fonts/")) fontRequests.push(request.url());
  });
  const editor = page.locator("#ix-caption-editor");
  await expect(editor.getByText(ca.statusIdle, { exact: true })).toBeVisible();
  expect(coreRequests).toEqual([]);
  await editor.getByRole("button", { name: ca.burn, exact: true }).click();
  await expect(editor.getByText(ca.statusDone, { exact: true })).toBeVisible({
    timeout: 90000,
  });
  expect(coreRequests.some((u) => u.endsWith("ffmpeg-core.wasm"))).toBe(true);
  expect(fontRequests.some((u) => u.endsWith("DejaVuSans-Bold.ttf"))).toBe(
    true,
  );
  await expect(editor.locator(".encode-command")).toContainText(
    "ffmpeg -y -i source.mp4 -vf subtitles=captions.srt",
  );
  const facts = editor.locator(".encode-facts");
  // The burn must produce a real file of a plausible size for this content.
  await expect(facts).toContainText(/1[23][0-9]{4} bytes/);
  await expect(facts).toContainText(/10\.00\d s/);
  const video = editor.locator("video");
  await expect(video).toHaveAttribute("src", /^blob:/);
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  const download = editor.getByRole("link", { name: ca.download });
  await expect(download).toHaveAttribute("download", "captioned.mp4");
  expect(await download.getAttribute("href")).toMatch(/^blob:/);
});

test("caption editor reports failure honestly when the encoder core cannot load", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.route("**/vendor/ffmpeg/ffmpeg-core.wasm", (route) =>
    route.abort(),
  );
  await open(page);
  const editor = page.locator("#ix-caption-editor");
  await editor.getByRole("button", { name: ca.burn, exact: true }).click();
  await expect(editor.getByText(ca.unavailable, { exact: true })).toBeVisible({
    timeout: 60000,
  });
});

test("caption challenge grades the reference and rejects wrong choices", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
  await expect(
    page.getByText(ca.feedback.readable, { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: ca.fieldLabels.readable, exact: true })
    .selectOption("full");
  await page
    .getByRole("combobox", { name: ca.fieldLabels.track, exact: true })
    .selectOption("switchable");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=caption-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=caption-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page
    .getByRole("combobox", { name: ca.fieldLabels.readable, exact: true })
    .selectOption("small");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await expect(
    page.getByText(ca.feedback.readable, { exact: true }),
  ).toBeVisible();
});

test("failed caption media keeps the editor and grading usable", async ({
  page,
}) => {
  await page.route("**/media/edit/captioned*.mp4", (route) => route.abort());
  await open(page);
  await expect(page.getByRole("alert").first()).toBeVisible();
  const editor = page.locator("#ix-caption-editor");
  await expect(
    editor.getByRole("button", { name: ca.burn, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
});
