// Copyright © 2026 Christopher Snow
import { expectPracticeReady } from "./notebook-storage";
import { test, expect, type Locator } from "@playwright/test";

async function contrast(button: Locator) {
  return button.evaluate((el) => {
    const style = getComputedStyle(el);
    const brightness = Number(
      style.filter.match(/brightness\(([\d.]+)\)/)?.[1] ?? 1,
    );
    const luminance = (colour: string) => {
      const rgb = colour
        .match(/[\d.]+/g)!
        .slice(0, 3)
        .map(Number);
      const linear = rgb.map((value) => {
        const channel = Math.min(255, value * brightness) / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
    };
    const foreground = luminance(style.color),
      background = luminance(style.backgroundColor);
    return (
      (Math.max(foreground, background) + 0.05) /
      (Math.min(foreground, background) + 0.05)
    );
  });
}

test("primary actions remain readable while hovered and after running by touch or mouse", async ({
  page,
  isMobile,
}) => {
  test.setTimeout(120000);
  await page.goto("./#/learn/first-edit/shorten");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await expectPracticeReady(page);
  const cell = page.locator('[data-cell="first-edit/shorten:worked:0"]');
  const run = cell.getByRole("button", { name: "Run command", exact: true });
  await cell
    .locator("textarea")
    .fill("ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4");
  await expect(run).toBeEnabled();
  expect(await contrast(run)).toBeGreaterThanOrEqual(4.5);
  await run.hover();
  expect(await contrast(run)).toBeGreaterThanOrEqual(4.5);
  if (isMobile) await run.tap();
  else await run.click();
  await expect(cell.locator("[role=status]").first()).toHaveText(
    "Command completed",
    { timeout: 120000 },
  );
  await expect(run).toBeEnabled();
  expect(await contrast(run)).toBeGreaterThanOrEqual(4.5);
  await run.focus();
  expect(await contrast(run)).toBeGreaterThanOrEqual(4.5);
  // The same shared hover rule applies to chapter continuation links.
  const next = page.locator("a.button.primary").last();
  await next.hover();
  expect(await contrast(next)).toBeGreaterThanOrEqual(4.5);
});
