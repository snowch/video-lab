// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { resolutionGuide as g } from "../src/notebook/resolution.strings";
test("resolution reference compares computed grids, reflows and links to real practice without tools", async ({
  page,
}) => {
  const processing: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/encoder/")) processing.push(r.url());
  });
  await page.goto("./");
  await page.getByRole("link", { name: g.title, exact: true }).click();
  await expect(page.locator("h1")).toHaveText(g.title);
  await expect(page).toHaveTitle(new RegExp(g.title));
  const figure = page.locator(".resolution-figure");
  const select = figure.getByLabel(g.diagramSelectLabel);
  await expect(figure.locator(".resolution-outline-labels li")).toHaveCount(3);
  await expect(figure.locator(".resolution-outline-labels")).toContainText(
    "480p",
  );
  await expect(figure.locator(".resolution-outline-labels")).toContainText(
    "720p",
  );
  await expect(figure.locator(".resolution-outline-labels")).toContainText(
    "1080p",
  );
  for (const [index, width, height, count] of [
    [0, 854, 480, "409,920"],
    [1, 1280, 720, "921,600"],
    [2, 1920, 1080, "2,073,600"],
  ]) {
    await select.selectOption(String(index));
    await expect(figure.locator("output")).toContainText(String(count));
    await expect(figure.locator(".resolution-selected")).toHaveAttribute(
      "width",
      String(width),
    );
    await expect(figure.locator(".resolution-selected")).toHaveAttribute(
      "height",
      String(height),
    );
  }
  await page.setViewportSize({ width: 320, height: 800 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("link", { name: g.exerciseLink + " →", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("Resize the picture");
  await page.getByRole("link", { name: g.link, exact: true }).click();
  await expect(page.locator("h1")).toHaveText(g.title);
  expect(processing).toEqual([]);
});
