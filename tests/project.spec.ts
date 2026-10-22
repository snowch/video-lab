// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { p } from "../src/project/strings";
import { recipeSteps } from "../src/project/recipe";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-10");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.title);
};

test("final project renders the recipe steps with their recorded outputs", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await open(page);
  const view = page.locator("#ix-recipe-view-motivation");
  await expect(view).toBeVisible();
  await expect(view).toContainText(p.recipeLabel);
  for (const step of recipeSteps) {
    await expect(view).toContainText(`Step ${step.n}: ${step.name}`);
    await expect(view).toContainText(step.command);
    await expect(view).toContainText(`Recorded output: ${step.recordedFacts}`);
  }
  const players = view.locator("video");
  await expect(players).toHaveCount(3);
  await expect(players.nth(0)).toHaveAttribute(
    "src",
    /edit\/recipe-step1-crop\.mp4$/,
  );
  await expect(players.nth(1)).toHaveAttribute(
    "src",
    /edit\/recipe-step2-captioned\.mp4$/,
  );
  await expect(players.nth(2)).toHaveAttribute(
    "src",
    /edit\/recipe-step3-final\.mp4$/,
  );
  const runner = page.locator("#ix-recipe-runner-construction");
  await expect(runner).toBeVisible();
  await expect(
    runner.getByRole("button", { name: p.run, exact: true }),
  ).toBeVisible();
  await expect(runner.getByText(p.statusIdle, { exact: true })).toBeVisible();
  const review = page.locator("#ix-viewer-review-failureExperiment");
  await expect(review).toContainText(p.reviewLabel);
  await expect(review.locator("fieldset")).toHaveCount(6);
  expect(errors).toEqual([]);
});

test("recipe runner executes all three steps in a real WASM worker and probes the result", async ({
  page,
}) => {
  test.setTimeout(180000);
  await open(page);
  const coreRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("vendor/ffmpeg/"))
      coreRequests.push(request.url());
  });
  const runner = page.locator("#ix-recipe-runner-construction");
  await expect(runner.getByText(p.statusIdle, { exact: true })).toBeVisible();
  expect(coreRequests).toEqual([]);
  await runner.getByRole("button", { name: p.run, exact: true }).click();
  await expect(runner.getByText(p.statusDone, { exact: true })).toBeVisible({
    timeout: 150000,
  });
  expect(coreRequests.some((u) => u.endsWith("ffmpeg-core.wasm"))).toBe(true);
  const commands = runner.locator(".encode-command");
  await expect(commands).toHaveCount(3);
  await expect(commands.nth(0)).toContainText("crop=480:270:240:135");
  await expect(commands.nth(1)).toContainText("subtitles=captions.srt");
  await expect(commands.nth(2)).toContainText("scale=640:360");
  const facts = runner.locator(".encode-facts");
  // The produced file must report both streams and the final resolution.
  await expect(facts).toContainText("Video: h264 640 × 360");
  await expect(facts).toContainText("Audio: aac 48000 Hz × 1 ch");
  await expect(facts).toContainText(/10\.00\d s/);
  await expect(facts).toContainText(/[0-9]{5,6} bytes/);
  const video = runner.locator("video");
  await expect(video).toHaveAttribute("src", /^blob:/);
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  const download = runner.getByRole("link", { name: p.download });
  await expect(download).toHaveAttribute("download", "final.mp4");
  expect(await download.getAttribute("href")).toMatch(/^blob:/);
});

test("recipe runner reports failure honestly when the encoder core cannot load", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.route("**/vendor/ffmpeg/ffmpeg-core.wasm", (route) =>
    route.abort(),
  );
  await open(page);
  const runner = page.locator("#ix-recipe-runner-construction");
  await runner.getByRole("button", { name: p.run, exact: true }).click();
  await expect(runner.getByText(p.unavailable, { exact: true })).toBeVisible({
    timeout: 60000,
  });
});

test("viewer review answers persist and clear", async ({ page }) => {
  await open(page);
  const review = page.locator("#ix-viewer-review-failureExperiment");
  const first = review.locator("fieldset").first();
  await first.getByLabel(p.checkYes).check();
  await expect(first.getByLabel(p.checkYes)).toBeChecked();
  await page.reload();
  await expect(
    page.locator("#ix-viewer-review-failureExperiment fieldset"),
  ).toHaveCount(6);
  await expect(
    page
      .locator("#ix-viewer-review-failureExperiment fieldset")
      .first()
      .getByLabel(p.checkYes),
  ).toBeChecked();
  await page
    .locator("#ix-viewer-review-failureExperiment")
    .getByRole("button", { name: "Clear answers" })
    .click();
  await expect(
    page
      .locator("#ix-viewer-review-failureExperiment fieldset")
      .first()
      .getByLabel(p.checkYes),
  ).not.toBeChecked();
});

test("final project challenge grades the reference and rejects wrong choices", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
  await expect(page.getByText(p.feedback.order, { exact: true })).toBeVisible();
  await page
    .getByRole("combobox", { name: p.fieldLabels.order, exact: true })
    .selectOption("correct");
  await page
    .getByRole("combobox", { name: p.fieldLabels.verify, exact: true })
    .selectOption("probe");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=recipe-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=recipe-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page
    .getByRole("combobox", { name: p.fieldLabels.order, exact: true })
    .selectOption("encodeOnly");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await expect(page.getByText(p.feedback.order, { exact: true })).toBeVisible();
});

test("failed project media keeps the runner and grading usable", async ({
  page,
}) => {
  await page.route("**/media/edit/recipe-*.mp4", (route) => route.abort());
  await open(page);
  await expect(page.getByRole("alert").first()).toBeVisible();
  const runner = page.locator("#ix-recipe-runner-construction");
  await expect(
    runner.getByRole("button", { name: p.run, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
});
