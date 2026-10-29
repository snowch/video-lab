// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { expectPracticeReady, expectSavedCell } from "./notebook-storage";
import { sampleRateStrings as t } from "../src/notebook/visuals/sample-rate.strings";

test("sampling changes count and spacing while preserving the signal, interval and command", async ({
  page,
}) => {
  const processing: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/encoder/")) processing.push(request.url());
  });
  await page.goto("./#/learn/frames-time/rate");
  await expectPracticeReady(page);
  const id = "frames-time/rate:worked:0";
  const editor = page.locator(`[data-cell="${id}"] textarea`);
  const command = (await editor.inputValue()).replace("fps=12", "fps=10");
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
