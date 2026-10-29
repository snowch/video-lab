// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { expectPracticeReady, expectSavedCell } from "./notebook-storage";
import { sampleRateStrings as t } from "../src/notebook/visuals/sample-rate.strings";
import { n } from "../src/notebook/ui.strings";

test("picture and sound rates have separate pages and preserve their own drafts", async ({
  page,
}) => {
  await page.goto("./#/learn/frames-time/rate");
  await expectPracticeReady(page);
  const videoId = "frames-time/rate:worked:0";
  const video = page.locator(`[data-cell="${videoId}"] textarea`);
  const command = (await video.inputValue()).replace("fps=12", "fps=10");
  await video.fill(command);
  await expectSavedCell(page, videoId, { command });
  await expect(page.locator(".sample-rate-diagram")).toHaveCount(0);
  await expect(page.locator(".notebook-concept")).not.toContainText(
    "Audio sample rate",
  );
  await page
    .locator('.notebook-pager a[href="#/learn/frames-time/samples"]')
    .click();
  await expect(page.locator("h1")).toHaveText(
    "Count sound samples through time",
  );
  await expect(page.locator(".sample-rate-diagram")).toBeVisible();
  await expect(
    page.locator('.notebook-pager a[href="#/learn/frames-time/timestamps"]'),
  ).toBeVisible();
  await page
    .locator('.notebook-pager a[href="#/learn/frames-time/rate"]')
    .click();
  await expect(video).toHaveValue(command);
});

test("sampling changes count and spacing while preserving the signal, interval and command", async ({
  page,
}) => {
  const processing: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/encoder/")) processing.push(request.url());
  });
  await page.goto("./#/learn/frames-time/samples");
  await expectPracticeReady(page);
  const id = "frames-time/samples:worked:0";
  const editor = page.locator(`[data-cell="${id}"] textarea`);
  const command = (await editor.inputValue()).replace("24000", "22050");
  await editor.fill(command);
  await expectSavedCell(page, id, { command });

  const figure = page.locator(".sample-rate-diagram");
  const select = figure.getByLabel(t.rateLabel, { exact: true });
  const curve = figure.locator(".sample-rate-curve");
  const originalCurve = await curve.getAttribute("d");
  await expect(select).toHaveValue("8000");
  await expect(figure.locator(".sample-rate-dot")).toHaveCount(16);
  await expect(figure.locator("output")).toContainText("0.125 ms");

  for (const [rate, count, spacing] of [
    [4000, 8, 0.25],
    [16000, 32, 0.0625],
  ] as const) {
    await select.selectOption(String(rate));
    await expect(figure.locator(".sample-rate-dot")).toHaveCount(count);
    await expect(figure.locator("output")).toContainText(
      `${count} samples in 2 ms`,
    );
    await expect(figure.locator("output")).toContainText(`${spacing} ms`);
    await expect(curve).toHaveAttribute("d", originalCurve!);
    await expect(figure.locator(".sample-rate-times")).toHaveText(
      "0 ms1 ms2 ms",
    );
    await expect(editor).toHaveValue(command);
  }
  await select.focus();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
  await expect(select).toHaveValue("8000");
  await expect(figure.locator(".sample-rate-dot")).toHaveCount(16);
  await expect(curve).toHaveAttribute("d", originalCurve!);

  await page.setViewportSize({ width: 320, height: 800 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  await expect(select).toBeVisible();
  expect(
    (await figure.locator("svg").boundingBox())!.height,
  ).toBeGreaterThanOrEqual(160);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(processing).toEqual([]);
});

test("audio practice checks real sample rate and accepts the independent resample", async ({
  page,
}, info) => {
  test.skip(!["desktop-light", "firefox"].includes(info.project.name));
  test.setTimeout(180000);
  await page.goto("./#/learn/frames-time/samples");
  await expectPracticeReady(page);
  const cell = page.locator('[data-cell="frames-time/samples:practice"]');
  const editor = cell.locator("textarea");
  // The unchanged starter has the right duration and streams, but the wrong rate.
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  await cell.getByRole("button", { name: n.check, exact: true }).click();
  await expect(cell.locator(".notebook-check")).toContainText(
    "✗ Audio sample rate: expected 16000 Hz per channel; found 24000",
    { timeout: 120000 },
  );
  await editor.fill(
    "ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 16000 independent-samples.wav",
  );
  await expect(cell).toHaveAttribute("data-stale", "true");
  await expect(
    cell.getByRole("button", { name: n.check, exact: true }),
  ).toBeDisabled();
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  await cell.getByRole("button", { name: n.check, exact: true }).click();
  await expect(cell.locator(".notebook-check")).toContainText(n.passed, {
    timeout: 120000,
  });
  const downloaded = page.waitForEvent("download");
  await cell
    .getByRole("button", {
      name: "Download independent-samples.wav",
      exact: true,
    })
    .click();
  const path = (await (await downloaded).path())!;
  const probe = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
  expect(probe.streams).toHaveLength(1);
  expect(probe.streams[0]).toMatchObject({
    codec_type: "audio",
    sample_rate: "16000",
    channels: 2,
  });
  expect(Number(probe.format.duration)).toBe(4);
});
