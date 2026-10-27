// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import {
  glossaryEntries,
  glossaryUI as g,
} from "../src/notebook/glossary.strings";
import { courseCopy } from "../src/notebook/copy";
import { n } from "../src/notebook/ui.strings";
import { appStatusStrings as status } from "../src/app-status/strings";
import { expectPracticeReady, expectSavedCell } from "./notebook-storage";

test("glossary is alphabetical, searchable by names and aliases, and readable without media downloads", async ({
  page,
  isMobile,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("./#/");
  const indexLink = page
    .locator(".notebook-home")
    .getByRole("link", { name: g.title, exact: true });
  await expect(indexLink).toBeVisible();
  await expect(
    page.locator("footer").getByRole("link", { name: g.title, exact: true }),
  ).toHaveAttribute("href", "#/glossary");
  if (isMobile) await indexLink.tap();
  else await indexLink.click();
  await expect(page.locator("h1")).toHaveText(g.title);
  await expect(page).toHaveTitle(/^Glossary ·/);
  const headings = page.locator(".glossary-entry h2");
  const names = await headings.allTextContents();
  expect(names).toHaveLength(glossaryEntries.length);
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "en")));
  const search = page.getByRole("searchbox", { name: g.search });
  await search.fill(" FPS ");
  await expect(headings).toHaveText(["Frame rate"]);
  await search.fill("hz");
  await expect(headings).toHaveText(["Audio sample rate"]);
  await search.fill("cRf");
  await expect(headings).toHaveText(["Constant rate factor (CRF)"]);
  await search.fill("isom");
  await expect(headings).toHaveText(["Brand"]);
  await search.fill("not-a-term");
  await expect(headings).toHaveCount(0);
  await expect(page.locator(".glossary [role=status]")).toHaveText(g.noResults);
  await page.getByRole("button", { name: g.clear, exact: true }).click();
  await expect(search).toBeFocused();
  await expect(headings).toHaveCount(glossaryEntries.length);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await search.fill("demuxer");
  await expect(headings).toHaveText(["Demuxer"]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    requests.some((url) =>
      /\/encoder\/|\/media\/notebook\/.*\.(mp4|srt|ttf)/.test(url),
    ),
  ).toBe(false);
  await expect(page.locator(".notebook-source, [data-cell]")).toHaveCount(0);
  const link = page.locator(".glossary-entry a");
  await expect(link).toHaveText(
    `${g.lessonPrefix} ${courseCopy.pages["inside-video/inspect"]!.title}`,
  );
  await link.click();
  await expect(page.locator("h1")).toHaveText(
    courseCopy.pages["inside-video/inspect"]!.title,
  );
  await expect(page.locator("main")).toBeFocused();
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(g.title);
  await page.reload();
  await expect(page.locator("h1")).toHaveText(g.title);
  await page.goForward();
  await expect(page.locator("h1")).toHaveText(
    courseCopy.pages["inside-video/inspect"]!.title,
  );
});

test("visiting the glossary preserves a draft and an active real command", async ({
  page,
}, info) => {
  test.skip(!["desktop-light", "firefox"].includes(info.project.name));
  test.setTimeout(120000);
  await page.goto("./#/learn/first-edit/shorten");
  await expectPracticeReady(page);
  const id = "first-edit/shorten:worked:0";
  const cell = page.locator(`[data-cell="${id}"]`);
  const command = "ffmpeg -i bunny-short.mp4 -t 1 glossary-cut.mp4";
  await cell.locator("textarea").fill(command);
  await expectSavedCell(page, id, { command });
  let release!: () => void;
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/encoder/**", async (route) => {
    await hold;
    await route.continue();
  });
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.running);
  await page
    .locator("footer")
    .getByRole("link", { name: g.title, exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText(g.title);
  await expect(
    page.getByRole("button", { name: n.cancel, exact: true }),
  ).toBeVisible();
  await expect(page.locator(".notebook-workspace-status")).toContainText(
    n.running,
  );
  release();
  await expect(
    page.getByRole("button", { name: n.cancel, exact: true }),
  ).toHaveCount(0, { timeout: 90000 });
  await page.goBack();
  await expect(cell.locator("textarea")).toHaveValue(command);
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done);
  await expect(cell.locator(".notebook-cell-result h4")).toHaveText(
    "glossary-cut.mp4",
  );
  await page.getByRole("button", { name: n.files, exact: true }).click();
  const files = page.getByRole("dialog", { name: n.yourFiles });
  await expect(
    files.getByRole("button", { name: "bunny-short.mp4", exact: true }),
  ).toBeVisible();
  await expect(
    files.getByRole("button", { name: "glossary-cut.mp4", exact: true }),
  ).toBeVisible();
});

test("a saved glossary opens cold offline and its lesson links work", async ({
  page,
  context,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  test.setTimeout(90000);
  await page.goto("./#/");
  const panel = page.locator(".app-status");
  await panel.locator("summary").click();
  await panel
    .getByRole("button", { name: status.download, exact: true })
    .click();
  await expect(panel.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 45000 },
  );
  await context.setOffline(true);
  const offline = await context.newPage();
  await offline.goto(new URL("./#/glossary", page.url()).href);
  await expect(offline.locator("h1")).toHaveText(g.title);
  await offline.getByRole("searchbox", { name: g.search }).fill("demuxer");
  await expect(offline.locator(".glossary-entry h2")).toHaveText(["Demuxer"]);
  await offline.locator(".glossary-entry a").click();
  await expectPracticeReady(offline);
  await expect(offline.locator("h1")).toHaveText(
    courseCopy.pages["inside-video/inspect"]!.title,
  );
  await offline.close();
  await context.setOffline(false);
});
