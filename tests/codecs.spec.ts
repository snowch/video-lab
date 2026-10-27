// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { codecGuide as g } from "../src/notebook/codecs.strings";
import media from "../src/notebook/codecs-media.json" with { type: "json" };
import { appStatusStrings as status } from "../src/app-status/strings";
import { expectPracticeReady, expectSavedCell } from "./notebook-storage";
import { n } from "../src/notebook/ui.strings";

test("codec appendix links, measured listening files and responsive reading work", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("./#/");
  await page
    .locator(".notebook-home")
    .getByRole("link", { name: g.link, exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText(g.title);
  await expect(page).toHaveTitle(/^Choosing video and audio codecs/);
  await expect(page.locator("audio")).toHaveCount(3);
  expect(
    requests.some((url) => /\/encoder\/|\/media\/codecs\//.test(url)),
  ).toBe(false);
  for (let index = 0; index < media.files.length; index++) {
    const file = media.files[index]!;
    const figure = page.locator(".codec-track").nth(index);
    await expect(figure).toContainText(g.size(file.bytes));
    await expect(figure.locator("a")).toHaveAttribute("download", file.name);
    await figure.locator("audio").evaluate(async (audio: HTMLAudioElement) => {
      await audio.play();
    });
    await expect
      .poll(() =>
        figure
          .locator("audio")
          .evaluate((audio: HTMLAudioElement) => audio.currentTime),
      )
      .toBeGreaterThan(0);
    expect(
      await figure
        .locator("audio")
        .evaluate((audio: HTMLAudioElement) => audio.duration),
    ).toBeCloseTo(file.duration, 1);
    expect(
      await page
        .locator("audio")
        .evaluateAll(
          (elements) =>
            elements.filter((element) => !(element as HTMLAudioElement).paused)
              .length,
        ),
    ).toBe(1);
  }
  await page
    .locator("audio")
    .evaluateAll((elements) =>
      elements.forEach((element) => (element as HTMLAudioElement).pause()),
    );
  await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("navigation", { name: g.continueTitle })
    .getByRole("link")
    .first()
    .click();
  await expectPracticeReady(page);
  await expect(
    page.getByRole("link", { name: g.link, exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(g.title);
  await page.goto("./#/glossary");
  await page.getByRole("link", { name: g.link, exact: true }).click();
  await expect(page.locator("h1")).toHaveText(g.title);
  for (const route of ["quality/quality", "quality/speed", "export/format"]) {
    await page.goto(`./#/learn/${route}`);
    await expect(
      page.getByRole("link", { name: g.link, exact: true }),
    ).toHaveAttribute("href", "#/appendix/codecs");
  }
});

test("codec reference keeps an active command, source and authored draft", async ({
  page,
}, info) => {
  test.skip(!["desktop-light", "firefox"].includes(info.project.name));
  await page.goto("./#/learn/inside-video/inspect");
  await expectPracticeReady(page);
  const id = "inside-video/inspect:worked:0";
  const cell = page.locator(`[data-cell="${id}"]`);
  const command = "ffprobe -hide_banner bunny-action.mp4";
  await cell.locator("textarea").fill(command);
  await expectSavedCell(page, id, { command });
  let release!: () => void;
  const hold = new Promise<void>((resolve) => (release = resolve));
  await page.route("**/encoder/**", async (route) => {
    await hold;
    await route.continue();
  });
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.running);
  await page.getByRole("link", { name: g.link, exact: true }).click();
  await expect(page.locator("h1")).toHaveText(g.title);
  await expect(
    page.getByRole("button", { name: n.cancel, exact: true }),
  ).toBeVisible();
  release();
  await expect(
    page.getByRole("button", { name: n.cancel, exact: true }),
  ).toHaveCount(0, { timeout: 45000 });
  await page.goBack();
  await expect(cell.locator("textarea")).toHaveValue(command);
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done);
  await expect(cell).toContainText("bunny-action.mp4");
});

test("saved codec appendix and all listening files work in a new offline page", async ({
  page,
  context,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  test.setTimeout(90000);
  await page.goto("./#/appendix/codecs");
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
  await offline.goto(new URL("./#/appendix/codecs", page.url()).href);
  await expect(offline.locator("h1")).toHaveText(g.title);
  for (const audio of await offline.locator("audio").all()) {
    await audio.evaluate(async (element: HTMLAudioElement) => {
      await element.play();
    });
    await expect
      .poll(() =>
        audio.evaluate((element: HTMLAudioElement) => element.currentTime),
      )
      .toBeGreaterThan(0);
  }
  await offline.close();
  await context.setOffline(false);
});
