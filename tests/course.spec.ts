// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { ui } from "../src/content/ui.strings";
import { labels } from "../src/content/module0.labels";
import { home } from "../src/content/home.strings";
import { cap } from "../src/capture/strings";
const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-2");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    labels.title,
  );
};
const openCapture = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-0");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(cap.title);
};
test("introduction, theme persistence and browser navigation", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    home.subtitle,
  );
  await expect(page.getByText(ui.planned, { exact: true })).toHaveCount(5);
  const theme = await page.locator("html").getAttribute("data-theme");
  if (isMobile) await page.getByRole("button", { name: ui.theme }).tap();
  else await page.getByRole("button", { name: ui.theme }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", theme!);
  await page.reload();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", theme!);
  await page.getByRole("link", { name: home.start }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(cap.title);
  await page.getByRole("link", { name: ui.back }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    home.subtitle,
  );
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(cap.title);
  await page.goForward();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    home.subtitle,
  );
  expect(errors).toEqual([]);
});
test("real playback, frame inspection, prediction, streams and failure experiment", async ({
  page,
  isMobile,
}) => {
  await open(page);
  await page.getByRole("button", { name: ui.checkPrediction }).click();
  await expect(page.getByText(ui.predictionMissing)).toBeVisible();
  await page.getByLabel(ui.predictionYes).check();
  await page.getByRole("button", { name: ui.checkPrediction }).click();
  await expect(page.getByText(ui.predictionWrong)).toBeVisible();
  await page.getByLabel(ui.predictionNo).check();
  await page.getByRole("button", { name: ui.checkPrediction }).click();
  await expect(page.getByText(ui.predictionRight)).toBeVisible();
  const player = page.locator("video");
  await expect
    .poll(() => player.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  await page.getByRole("button", { name: ui.play, exact: true }).click();
  await expect
    .poll(() => player.evaluate((v) => (v as HTMLVideoElement).currentTime))
    .toBeGreaterThan(0.15);
  await page.getByRole("button", { name: ui.pause, exact: true }).click();
  await page.getByRole("button", { name: ui.unmute, exact: true }).click();
  await expect
    .poll(() => player.evaluate((v) => (v as HTMLVideoElement).muted))
    .toBe(false);
  const slider = page.locator("#frame-cursor");
  await slider.fill("75");
  await expect(page.getByTestId("reference-frame")).toHaveAttribute(
    "src",
    /075.jpg$/,
  );
  await expect(page.getByTestId("frame-time")).toHaveText("6.25 s");
  await expect
    .poll(() => player.evaluate((v) => (v as HTMLVideoElement).currentTime))
    .toBeCloseTo(6.25, 1);
  if (isMobile)
    await page.getByRole("button", { name: ui.next, exact: true }).tap();
  else await page.getByRole("button", { name: ui.next, exact: true }).click();
  await expect(slider).toHaveValue("76");
  await slider.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(slider).toHaveValue("75");
  await page
    .getByRole("button", { name: `${ui.frameSlider} 0`, exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: ui.previous, exact: true }),
  ).toBeDisabled();
  await slider.fill("119");
  await expect(
    page.getByRole("button", { name: ui.next, exact: true }),
  ).toBeDisabled();
  await page.getByLabel(ui.selectStream).selectOption("audio");
  await expect(page.locator("#ix-streams [role=status]")).toContainText(
    "48000",
  );
  await page.getByLabel(ui.interval).selectOption("9");
  await page.getByRole("button", { name: ui.testAssumption }).click();
  await expect(page.getByText(ui.failureResult)).toBeVisible();
  await expect(page.locator("#ix-failure [role=status]")).toContainText(
    "0.981333",
  );
  await page.getByText(ui.evidence, { exact: true }).click();
  const evidence = await page.request.get("media/ffprobe.json");
  expect(evidence.ok()).toBe(true);
  expect((await evidence.json()).streams).toHaveLength(2);
});
test("challenge errors, five progressive hints, retry, saved completion and reset", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(6);
  await expect(
    page.getByText(labels.feedback.frame, { exact: true }),
  ).toBeVisible();
  for (let i = 1; i <= 5; i++)
    await page
      .getByRole("button", { name: `Show hint (${i} of 5)`, exact: true })
      .click();
  await expect(page.getByText("All hints shown")).toBeVisible();
  for (const [key, value] of Object.entries({
    video: "0",
    audio: "1",
    container: "mp4",
    codec: "h264",
  }))
    await page
      .getByRole("combobox", {
        name: labels.fields[key as keyof typeof labels.fields],
        exact: true,
      })
      .selectOption(value);
  await page.getByLabel(labels.fields.frame, { exact: true }).fill("75");
  await page.getByLabel(labels.fields.timestamp, { exact: true }).fill("6.25");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=inspection]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=inspection]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.getByLabel(labels.fields.frame, { exact: true }).fill("74");
  await expect(page.locator("[data-challenge=inspection]")).toHaveAttribute(
    "data-complete",
    "false",
  );
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await page.getByRole("button", { name: /Clear work:/ }).click();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(
    page.getByLabel(labels.fields.frame, { exact: true }),
  ).toHaveValue("74");
  await page.getByRole("button", { name: /Clear work:/ }).click();
  await page.getByRole("button", { name: "Discard work", exact: true }).click();
  await expect(
    page.getByLabel(labels.fields.frame, { exact: true }),
  ).toHaveValue("");
  await expect(page.locator(".hints")).toHaveAttribute("data-revealed", "0");
  await page
    .getByLabel(ui.reflectionLabel)
    .fill("Check whether the player is muted, then inspect the audio stream.");
  await page.reload();
  await expect(page.getByLabel(ui.reflectionLabel)).toHaveValue(
    /Check whether/,
  );
  await page.getByRole("button", { name: ui.clearNotes }).click();
  await expect(page.getByLabel(ui.reflectionLabel)).toHaveValue("");
});
test("responsive layout, readable controls, no page errors and screenshots", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of ["./", "./#/module-2"]) {
    await page.goto(route);
    await page.locator("h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const small = await page
      .locator("button,select,input:not([type=radio]),summary")
      .evaluateAll((elements) =>
        elements
          .filter(
            (e) =>
              e.getBoundingClientRect().height > 0 &&
              e.getBoundingClientRect().height < 40,
          )
          .map((e) => e.textContent),
      );
    expect(small).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(
        route === "./" ? "introduction.png" : "module-2-inspection.png",
      ),
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
});

test("media failure keeps measured inspection and grading usable", async ({
  page,
}) => {
  await page.route("**/media/build-queue.mp4", (route) => route.abort());
  await open(page);
  await expect(page.getByRole("alert")).toHaveText(ui.previewError);
  await page.locator("#frame-cursor").fill("75");
  await expect(page.getByTestId("reference-frame")).toHaveAttribute(
    "src",
    /075.jpg$/,
  );
  await expect(page.getByTestId("frame-time")).toHaveText("6.25 s");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(6);
});
