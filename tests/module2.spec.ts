// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { m2 } from "../src/module2/strings";
import { ui } from "../src/content/ui.strings";
import { fixture, referenceAnswers } from "../src/module2/model";
const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-2");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(m2.title);
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
test("source, prediction and every real cut variant", async ({ page }) => {
  await open(page);
  await play(page.locator("#ix-cut-source video"));
  const prediction = page.locator("#ix-cut-prediction");
  await prediction.getByRole("button", { name: m2.checkPrediction }).click();
  await expect(prediction.getByRole("status")).toHaveText(m2.predictionMissing);
  await prediction
    .getByLabel(`${m2.requestedStartOption}: 3 s`, { exact: true })
    .check();
  await prediction.getByRole("button", { name: m2.checkPrediction }).click();
  await expect(prediction.getByRole("status")).toHaveText(m2.predictionWrong);
  await prediction
    .getByLabel(`${m2.keyframeOption}: 2 s`, { exact: true })
    .check();
  await prediction.getByRole("button", { name: m2.checkPrediction }).click();
  await expect(prediction.getByRole("status")).toHaveText(m2.predictionRight);
  const cut = page.locator("#ix-cut-explorer");
  for (const start of [1, 3, 5])
    for (const method of ["copy", "encode"]) {
      await cut
        .getByRole("combobox", { name: m2.start, exact: true })
        .selectOption(String(start));
      await cut
        .getByRole("combobox", { name: m2.method, exact: true })
        .selectOption(method);
      await expect(cut.getByRole("status")).toContainText(
        `${m2.sourceTime} ${method === "copy" ? start - 1 : start} s`,
      );
      await expect(cut.getByRole("status")).toContainText(
        `${m2.pictureDuration}: ${method === "copy" ? 3 : 2} s`,
      );
      await expect(cut.locator("video")).toHaveAttribute(
        "src",
        `/video-lab/media/module-2/${method}-${start}.mp4`,
      );
      await play(cut.locator("video"));
      await expect(
        cut.locator(".edit-boundary").first().locator("dd").first(),
      ).toHaveText(`${method === "copy" ? start - 1 : start} s`);
      const imgs = cut.locator("img");
      await expect
        .poll(() =>
          imgs.evaluateAll((images) =>
            images.every(
              (img) => (img as HTMLImageElement).naturalWidth === 960,
            ),
          ),
        )
        .toBe(true);
    }
  await cut.getByText(m2.command, { exact: true }).click();
  await expect(cut.locator("pre")).toContainText("trim=start=5:end=7");
  const evidence = await page.request.get("media/module-2/evidence.json");
  expect((await evidence.json()).results).toHaveLength(fixture.results.length);
});
test("join order, hold duration and mathematical clock experiment", async ({
  page,
}) => {
  await open(page);
  const join = page.locator("#ix-join-explorer");
  for (const order of ["AB", "BA"])
    for (const end of [6, 8]) {
      await join
        .getByRole("combobox", { name: m2.order, exact: true })
        .selectOption(order);
      await join
        .getByRole("combobox", { name: m2.bEnd, exact: true })
        .selectOption(String(end));
      const joinTime = order === "AB" ? 2 : end - 4;
      await expect(join.getByRole("status")).toContainText(
        `${m2.duration}: ${end - 2} s`,
      );
      await expect(join.getByRole("status")).toContainText(
        `${m2.joinTime}: ${joinTime} s`,
      );
      await expect(join.locator("video")).toHaveAttribute(
        "src",
        `/video-lab/media/module-2/join-${order}-${end}.mp4`,
      );
      await play(join.locator("video"));
      await expect(
        join.locator(".edit-boundary").last().locator("dd").first(),
      ).toHaveText(order === "AB" ? "4 s" : "0 s");
      await expect(
        join.locator(".edit-boundary").last().locator("dd").last(),
      ).toHaveText(`${joinTime} s`);
    }
  const clock = page.locator("#ix-edit-clock");
  await expect(clock.getByRole("status")).toContainText("2 s");
  await clock.getByLabel(m2.clockMode).selectOption("reset");
  await expect(clock.getByRole("status")).toContainText("0 s");
  await clock.getByLabel(m2.clockMode).selectOption("keep");
  await expect(clock.getByRole("status")).toContainText("2 s");
});
test("edit challenge hints, corrections, persistence, isolation and reset", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(6);
  for (let i = 1; i <= 5; i++)
    await page
      .getByRole("button", { name: `Show hint (${i} of 5)`, exact: true })
      .click();
  await expect(
    page.getByText("All hints shown", { exact: true }),
  ).toBeVisible();
  for (const [key, value] of Object.entries(referenceAnswers)) {
    // Challenge labels may also describe investigation controls; scope to its editor.
    const field = page
      .locator("[data-challenge=edit-plan]")
      .getByLabel(m2.fieldLabels[key as keyof typeof m2.fieldLabels], {
        exact: true,
      });
    if (["method", "order", "reset"].includes(key))
      await page
        .locator("[data-challenge=edit-plan]")
        .getByRole("combobox", {
          name: m2.fieldLabels[key as keyof typeof m2.fieldLabels],
          exact: true,
        })
        .selectOption(value);
    else await field.fill(value);
  }
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=edit-plan]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=edit-plan]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page
    .getByRole("link", { name: "What is a digital video?", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "What is a digital video?",
  );
  await expect(page.locator("[data-challenge=inspection]")).toHaveAttribute(
    "data-complete",
    "false",
  );
  await page.goBack();
  await expect(page.locator("[data-challenge=edit-plan]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.getByLabel(m2.fieldLabels.join, { exact: true }).fill("4");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await expect(page.getByText(m2.feedback.join, { exact: true })).toBeVisible();
  await page
    .getByLabel(m2.reflectionLabel)
    .fill("Keep enough time to read the result.");
  await page.reload();
  await expect(page.getByLabel(m2.reflectionLabel)).toHaveValue(
    "Keep enough time to read the result.",
  );
  await page.getByRole("button", { name: /Clear work:/ }).click();
  await page.getByRole("button", { name: "Discard work", exact: true }).click();
  await expect(
    page.getByLabel(m2.fieldLabels.join, { exact: true }),
  ).toHaveValue("");
  await expect(page.getByLabel(m2.reflectionLabel)).toHaveValue(
    "Keep enough time to read the result.",
  );
  await page.getByRole("button", { name: m2.clearNotes, exact: true }).click();
  await expect(page.getByLabel(m2.reflectionLabel)).toHaveValue("");
});
test("course routes, keyboard controls, both themes and responsive diagrams", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await page
    .locator(".module-list li")
    .filter({ has: page.getByRole("heading", { name: m2.title, exact: true }) })
    .getByRole("link", { name: /Open lesson/ })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(m2.title);
  await page
    .getByRole("link", { name: /04 Compare requested and actual cuts/ })
    .click();
  await expect(page).toHaveURL(/module-2\/investigation$/);
  await page.reload();
  await expect(page.locator("#section-investigation")).toBeInViewport();
  const choice = page.locator("#ix-cut-prediction input").first();
  await choice.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#ix-cut-prediction input").last()).toBeChecked();
  for (let i = 0; i < 2; i++) {
    for (const id of [
      "#ix-cut-explorer",
      "#ix-join-explorer",
      "#ix-edit-clock",
      "[data-challenge=edit-plan]",
    ]) {
      await page.locator(id).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.getByRole("button", { name: ui.theme }).click();
  }
  expect(errors).toEqual([]);
});
test("failed output playback retains independent stills, evidence and grading", async ({
  page,
}) => {
  await page.route("**/media/module-2/*.mp4", (route) => route.abort());
  await open(page);
  const cut = page.locator("#ix-cut-explorer");
  await expect(cut.getByRole("alert")).toHaveText(m2.mediaError);
  await expect(cut.locator("img").first()).toBeVisible();
  await expect(cut.getByRole("status")).toContainText("3 s");
  await cut
    .getByRole("combobox", { name: m2.method, exact: true })
    .selectOption("encode");
  await expect(cut.getByRole("status")).toContainText(
    `${m2.pictureDuration}: 2 s`,
  );
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(6);
});
