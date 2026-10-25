// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { appStatusStrings as s } from "../src/app-status/strings";

test("header status stays compact and its panel supports keyboard, dismissal and independent offline state", async ({
  page,
  context,
}) => {
  const initialViewport = page.viewportSize()!;
  for (const entry of ["./#/", "./optional/command-workbench.html"]) {
    await page.setViewportSize(initialViewport);
    await page.goto(entry);
    const control = page.locator(".app-status");
    const summary = control.locator(":scope > details > summary");
    const details = control.locator(":scope > details");
    const badge = control.locator(".release-status");
    await expect(page.locator("header .app-status")).toHaveCount(1);
    await expect(badge).toHaveAttribute("data-release-state", "latest");
    await expect(summary.locator("code")).toHaveCount(0);
    await expect(summary.locator("[data-offline-state]")).toHaveText(
      s.offlineSummary.offlineIdle,
    );
    await expect(control.locator("[data-running-identity]")).not.toBeVisible();
    const closed = await summary.boundingBox();
    // Firefox reports subpixel floating-point noise for an exact 44px box.
    expect(Math.round(closed!.height * 100) / 100).toBeGreaterThanOrEqual(44);
    expect(closed!.height).toBeLessThan(90);
    await summary.focus();
    await summary.press("Enter");
    await expect(control.locator("[data-running-identity]")).toBeVisible();
    await expect(control.locator("[data-running-identity]")).toHaveAttribute(
      "title",
      /^[a-f0-9]{64}$/,
    );
    const panel = control.locator(".app-status-content");
    const bounds = await panel.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(
      page.viewportSize()!.width,
    );
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(
      page.viewportSize()!.height,
    );
    const remove = control.getByRole("button", { name: s.remove, exact: true });
    await remove.click();
    await expect(control.locator("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(control.locator("dialog")).not.toBeVisible();
    await expect(details).toHaveJSProperty("open", true);
    await expect(remove).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(details).toHaveJSProperty("open", false);
    await expect(summary).toBeFocused();
    await summary.press("Space");
    await control.getByRole("button", { name: s.close, exact: true }).click();
    await expect(summary).toBeFocused();
    await summary.click();
    await page
      .locator("header")
      .first()
      .click({ position: { x: 1, y: 1 } });
    await expect(details).toHaveJSProperty("open", false);
    await summary.click();
    await page.evaluate(() => {
      location.hash = "#/learn/first-edit/start";
    });
    await expect(details).toHaveJSProperty("open", false);
    await context.setOffline(true);
    await expect(badge).toHaveAttribute("data-release-state", "offline");
    await expect(summary.locator("[data-offline-state]")).toHaveText(
      s.offlineSummary.offlineIdle,
    );
    await context.setOffline(false);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await summary.click();
    const enlarged = await panel.boundingBox();
    expect(enlarged!.x).toBeGreaterThanOrEqual(0);
    expect(enlarged!.x + enlarged!.width).toBeLessThanOrEqual(
      page.viewportSize()!.width,
    );
    expect(enlarged!.y + enlarged!.height).toBeLessThanOrEqual(
      page.viewportSize()!.height,
    );
    await page.setViewportSize({ width: 320, height: 568 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    const brand = page.locator("header .brand").first();
    expect(
      await brand.evaluate(
        (el) =>
          el.getBoundingClientRect().height <=
          parseFloat(getComputedStyle(el).lineHeight) * 2,
      ),
    ).toBe(true);
    await expect
      .poll(() =>
        panel.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return (
            rect.left >= 0 &&
            rect.right <= innerWidth + 0.01 &&
            rect.bottom <= innerHeight + 0.01
          );
        }),
      )
      .toBe(true);
  }
});
