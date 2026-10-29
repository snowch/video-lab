// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { formatVisuals as v } from "../src/notebook/format-visuals.strings";

test("format references separate containers from picture storage and sampling controls retain picture dimensions", async ({
  page,
}) => {
  const processing: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/encoder/")) processing.push(request.url());
  });
  await page.goto("./#/");
  const references = page.getByRole("navigation", {
    name: "Appendices and reference",
  });
  await references
    .getByRole("link", { name: v.containerTitle, exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText(v.containerTitle);
  await expect(page.locator("h1")).toBeFocused();
  await expect(page.locator(".format-container")).toHaveCount(3);
  await expect(page.locator("main")).toContainText("WebM");
  await page
    .getByRole("navigation", { name: v.referenceNavLabel })
    .getByRole("link", { name: "Pixel formats →", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("Pixel formats");
  await expect(page.locator("h1")).toBeFocused();
  const sourceColours = await page
    .locator(".format-mini-picture > span")
    .evaluateAll((cells) =>
      [0, 1, 4, 5].map((i) => getComputedStyle(cells[i]!).backgroundColor),
    );
  const enlargedColours = await page
    .locator(".format-pixel-group > span")
    .evaluateAll((cells) =>
      cells.map((cell) => getComputedStyle(cell).backgroundColor),
    );
  expect(enlargedColours).toEqual(sourceColours);
  const y = page.locator('[data-component="Y"] .format-sample-grid');
  const u = page.locator('[data-component="U"] .format-sample-grid');
  const before = await y.boundingBox();
  for (const [mode, count] of [
    ["4:4:4", 4],
    ["4:2:2", 2],
    ["4:2:0", 1],
  ] as const) {
    await page.getByRole("radio", { name: mode, exact: true }).check();
    await expect(y.locator("span")).toHaveCount(4);
    await expect(u.locator("span")).toHaveCount(count);
    await expect(
      page.locator('[data-component="V"] .format-sample-grid span'),
    ).toHaveCount(count);
    await expect(
      page.getByRole("status").filter({ hasText: v.samplingExplanation[mode] }),
    ).toBeVisible();
    expect((await y.boundingBox())?.width).toBeCloseTo(before!.width, 0);
    expect((await y.boundingBox())?.height).toBeCloseTo(before!.height, 0);
  }
  await page.getByRole("radio", { name: "4:4:4", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "4:2:2", exact: true }),
  ).toBeChecked();
  const alpha = page.getByRole("slider", { name: /Foreground alpha/ });
  await alpha.focus();
  await page.keyboard.press("Home");
  await expect(alpha).toHaveValue("0");
  await expect(page.locator(".format-drawing").first()).toHaveCSS(
    "opacity",
    "0",
  );
  await page.keyboard.press("End");
  await expect(alpha).toHaveValue("1");
  await expect(page.locator(".format-drawing").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(alpha).toHaveValue("0.95");
  await expect(page.locator("output")).toContainText("0.95");
  await expect(page.locator("output")).not.toContainText("0.5");
  await page.getByText(v.detailsSummary, { exact: true }).click();
  await expect(page.locator("details.format-details")).toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator("details.format-details")).toContainText(
    "yuv420p10le",
  );
  await page.reload();
  await expect(page.locator("h1")).toBeFocused();
  for (const route of [
    "formats",
    "formats/video-containers",
    "formats/pixel-formats",
  ]) {
    await page.goto(`./#/appendix/${route}`);
    await page.evaluate(
      () => (document.documentElement.style.fontSize = "200%"),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(() => (document.documentElement.style.fontSize = ""));
  }
  expect(processing).toEqual([]);
});
