// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import {
  commandReferenceGroups,
  commandReferenceUI as r,
} from "../src/notebook/command-reference.strings";
import { appStatusStrings as status } from "../src/app-status/strings";
import { n } from "../src/notebook/ui.strings";

test("command reference searches syntax and purpose, filters groups and links back to teaching", async ({
  page,
  isMobile,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("./#/");
  const link = page
    .locator(".notebook-reference-card")
    .getByRole("link", { name: r.title, exact: true });
  if (isMobile) await link.tap();
  else await link.click();
  await expect(page.locator("h1")).toHaveText(r.title);
  await expect(page).toHaveTitle(new RegExp(`^${r.title}`));
  const entries = page.locator(".command-reference-entry");
  const total = commandReferenceGroups.reduce(
    (n, group) => n + group.entries.length,
    0,
  );
  await expect(entries).toHaveCount(total);
  const search = page.getByRole("searchbox", { name: r.search });
  await search.fill("-ar sample");
  await expect(entries).not.toHaveCount(0);
  await expect(entries.first()).toContainText("-ar");
  await search.fill("no-such-option-xyz");
  await expect(entries).toHaveCount(0);
  await expect(page.locator(".command-reference > [role=status]")).toHaveText(
    r.noResults,
  );
  await page.getByRole("button", { name: r.clear }).click();
  await expect(search).toBeFocused();
  const group = commandReferenceGroups[0]!;
  await page.getByRole("combobox", { name: r.category }).selectOption(group.id);
  await expect(entries).toHaveCount(group.entries.length);
  await page.getByRole("button", { name: r.clear }).click();
  await expect(entries).toHaveCount(total);
  await search.fill("-h");
  await page
    .getByRole("link", { name: "Command help cell →", exact: true })
    .click();
  const help = page.locator('[data-cell="appendix/commands:help"]');
  await expect(help.locator("textarea")).toBeFocused();
  await expect(
    help.getByRole("heading", { name: r.helpTitle }),
  ).toBeInViewport();
  await expect(search).toHaveValue("-h");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await search.fill("-ar sample");
  expect(
    requests.some((url) =>
      /\/encoder\/|\/media\/notebook\/.*\.(mp4|srt|ttf)/.test(url),
    ),
  ).toBe(false);
  await entries.first().getByRole("link").click();
  await expect(page).toHaveURL(/#\/learn\/frames-time\/samples$/);
  await expect(page.locator("main")).toBeFocused();
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(r.title);
  await expect(search).toHaveValue("-ar sample");
  await page.reload();
  await expect(page.locator("h1")).toHaveText(r.title);
  await expect(search).toHaveValue("-ar sample");
});

test("command reference works on a cold offline visit", async ({
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
  await offline.goto(new URL("./#/appendix/commands", page.url()).href);
  await expect(offline.locator("h1")).toHaveText(r.title);
  await offline.getByRole("searchbox", { name: r.search }).fill("-loop");
  await expect(offline.locator(".command-reference-entry")).not.toHaveCount(0);
  const help = offline.locator('[data-cell="appendix/commands:help"]');
  await help.getByRole("button", { name: n.run, exact: true }).click();
  await expect(help.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 30000,
  });
  await expect(help.locator(".notebook-log pre")).toContainText(
    "Getting help:",
  );
  await offline.close();
  await context.setOffline(false);
});

test("reference runs actual FFmpeg help without practice media and retains its result", async ({
  page,
}) => {
  test.setTimeout(60000);
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("./#/appendix/commands");
  const help = page.locator('[data-cell="appendix/commands:help"]');
  await expect(help.locator("textarea")).toHaveValue("ffmpeg -h");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await help.getByRole("button", { name: n.run, exact: true }).click();
  await expect(help.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 30000,
  });
  await expect(help.locator(".notebook-log pre")).toContainText(
    "Getting help:",
  );
  expect(
    requests.some((url) => /\/media\/notebook\/.*\.(mp4|srt|ttf)/.test(url)),
  ).toBe(false);
  await page.reload();
  await expect(help.locator(".notebook-log pre")).toContainText(
    "Getting help:",
  );
});
