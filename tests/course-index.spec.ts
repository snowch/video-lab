// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { chapters, pages, pageHref } from "../src/notebook/structure";
import { courseCopy } from "../src/notebook/copy";
import { n } from "../src/notebook/ui.strings";
import { expectSavedCell } from "./notebook-storage";

test("one course index exposes every page and preserves drafts through real navigation", async ({
  page,
}) => {
  await page.goto("./#/");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await expect(
    page.getByRole("button", { name: n.chapters, exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".notebook-menu, .notebook-sidebar")).toHaveCount(
    0,
  );
  await expect(page.locator(".notebook-toolbar")).toHaveCount(0);
  await expect(page.locator(".notebook-workspace-status")).toHaveClass(
    /sr-only/,
  );
  await expect(
    page.getByRole("button", { name: n.files, exact: true }),
  ).toHaveCount(1);
  await expect(page.locator(".notebook-workspace-status")).toBeEmpty();
  const cards = page.locator(".notebook-chapter-cards > li");
  await expect(cards).toHaveCount(chapters.length);
  for (const [index, chapter] of chapters.entries()) {
    const links = cards.nth(index).locator(".notebook-page-links a");
    const chapterPages = pages.filter((p) => p.chapter === chapter);
    await expect(links).toHaveText(
      chapterPages.map((p) => courseCopy.pages[p.id]!.title),
    );
    expect(
      await links.evaluateAll((els) =>
        els.map((el) => el.getAttribute("href")),
      ),
    ).toEqual(chapterPages.map(pageHref));
    await expect(cards.nth(index).locator("h3 a")).toHaveCount(0);
  }
  const indexLinks = page.locator(
    ".notebook-chapter-cards .notebook-page-links a",
  );
  await indexLinks.first().click();
  const lessonFiles = page
    .locator(".site-header")
    .getByRole("button", { name: n.files, exact: true });
  await lessonFiles.click();
  const files = page.getByRole("dialog", { name: n.yourFiles, exact: true });
  await expect(files).toBeVisible();
  await expect(files).toContainText(n.filesIntro);
  await page.keyboard.press("Escape");
  await expect(lessonFiles).toBeFocused();
  await lessonFiles.click();
  await page.goBack();
  await expect(page.locator(".notebook-home")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(lessonFiles).toBeFocused();
  await page.goForward();
  await expect(lessonFiles).toBeVisible();
  const command = "ffmpeg -i bunny-short.mp4 -t 4 index-draft.mp4";
  const editor = page.locator(
    '[data-cell="first-edit/shorten:worked:0"] textarea',
  );
  await editor.fill(command);
  await expectSavedCell(page, "first-edit/shorten:worked:0", { command });
  await expect(
    page.getByRole("button", { name: n.chapters, exact: true }),
  ).toHaveCount(0);
  await page
    .locator(".notebook-toolbar")
    .getByRole("link", { name: n.overview, exact: true })
    .click();
  await expect(page.locator(".notebook-toolbar")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: n.files, exact: true }),
  ).toHaveCount(1);
  await indexLinks.nth(3).click();
  await expect(page.locator(".notebook-page")).toHaveAttribute(
    "data-page",
    pages[3]!.id,
  );
  await page.goBack();
  await expect(page.locator(".notebook-home")).toBeVisible();
  await page.goBack();
  await expect(editor).toHaveValue(command);
  await page.goForward();
  await expect(page.locator(".notebook-home")).toBeVisible();
  await page.getByRole("link", { name: n.recordingGuide, exact: true }).click();
  await expect(page).toHaveURL(/#\/appendix\/recording$/);
  await page.goBack();
  await expect(indexLinks).toHaveCount(pages.length);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  for (const link of await indexLinks.all()) {
    expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
});
