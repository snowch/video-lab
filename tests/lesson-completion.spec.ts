// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { pages, pageHref } from "../src/notebook/structure";
import { courseCopy } from "../src/notebook/copy";
import { completionStrings as c } from "../src/notebook/completion.strings";
import { completionKey } from "../src/notebook/completion";
const first = pages[0]!;
const last = pages.at(-1)!;
test("reading marks are explicit, reversible, persistent and shown in the course index", async ({
  page,
  isMobile,
}) => {
  await page.goto("./" + pageHref(first));
  const mark = page.getByRole("checkbox", { name: c.label });
  await expect(mark).not.toBeChecked();
  const geometry = await mark.evaluate((input) => ({
    width: input.getBoundingClientRect().width,
    display: getComputedStyle(input.parentElement!).display,
  }));
  expect(geometry.width).toBeLessThanOrEqual(24);
  expect(geometry.display).toBe("flex");
  await page.locator(".notebook-pager a").last().click();
  await page.goBack();
  await expect(mark).not.toBeChecked();
  await mark.scrollIntoViewIfNeeded();
  if (isMobile) await mark.tap();
  else {
    await mark.focus();
    await page.keyboard.press("Space");
  }
  await expect(mark).toBeChecked();
  await page.reload();
  await expect(mark).toBeChecked();
  await page.locator(".notebook-toolbar a").click();
  const entry = page
    .locator(".notebook-page-links li")
    .filter({
      has: page.getByRole("link", {
        name: courseCopy.pages[first.id]!.title,
        exact: false,
      }),
    })
    .first();
  await expect(entry).toHaveAttribute("data-completed", "true");
  await expect(entry).toContainText(c.completed);
  await entry.getByRole("link").click();
  await mark.uncheck();
  await page.goto("./" + pageHref(last));
  await expect(mark).not.toBeChecked();
  await mark.check();
  await page.locator(".notebook-pager a").last().click();
  await expect(page.locator(`[data-completed=true]`)).toHaveCount(1);
  await page.setViewportSize({ width: 320, height: 800 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const completedLink = page.locator(
    `[data-completed=true] .notebook-course-link`,
  );
  const bounds = await completedLink.evaluate((link) => {
    const title = link.firstElementChild!.getBoundingClientRect();
    const tick = link
      .querySelector(".notebook-completion-tick")!
      .getBoundingClientRect();
    return {
      titleWidth: title.width,
      titleBottom: title.bottom,
      tickTop: tick.top,
      tickRight: tick.right,
      linkRight: link.getBoundingClientRect().right,
    };
  });
  expect(bounds.titleWidth).toBeGreaterThanOrEqual(80);
  expect(bounds.tickRight).toBeLessThanOrEqual(bounds.linkRight + 1);
  expect(bounds.tickTop).toBeLessThan(bounds.titleBottom);
});
test("independent windows reconcile individual marks without changing other pages", async ({
  page,
  context,
}) => {
  await page.goto("./" + pageHref(first));
  const other = await context.newPage();
  await other.goto("./" + pageHref(last));
  await page.getByRole("checkbox", { name: c.label }).check();
  await other.getByRole("checkbox", { name: c.label }).check();
  await other.goto("./" + pageHref(first));
  await expect(other.getByRole("checkbox", { name: c.label })).toBeChecked();
  await other.getByRole("checkbox", { name: c.label }).uncheck();
  await expect(page.getByRole("checkbox", { name: c.label })).not.toBeChecked();
  expect(
    await page.evaluate(
      (key) => localStorage.getItem(key),
      completionKey(last.id),
    ),
  ).toBe("true");
});
test("failed storage keeps the choice during navigation and explains it was not saved", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith("video-lab:notebook:completion:"))
        throw new DOMException("Full", "QuotaExceededError");
      original.call(this, key, value);
    };
  });
  await page.goto("./" + pageHref(first));
  await page.getByRole("checkbox", { name: c.label }).check();
  await expect(page.locator("#completion-save-note")).toHaveText(c.unsaved);
  await page.locator(".notebook-toolbar a").click();
  await page
    .getByRole("link", { name: new RegExp(courseCopy.pages[first.id]!.title) })
    .first()
    .click();
  await expect(page.getByRole("checkbox", { name: c.label })).toBeChecked();
  await expect(page.locator("#completion-save-note")).toBeVisible();
});
