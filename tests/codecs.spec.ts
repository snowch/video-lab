// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { formatGuide } from "../src/notebook/formats.strings";
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
    .getByRole("navigation", { name: n.referencesTitle })
    .getByRole("link", { name: g.title, exact: true })
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
  const continuation = page.getByRole("navigation", { name: g.continueTitle });
  await continuation
    .getByRole("link", { name: formatGuide.link, exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText(formatGuide.title);
  await page.goBack();
  await expect(page.locator("h1")).toHaveText(g.title);
  await continuation.locator('a[href="#/learn/inside-video/inspect"]').click();
  await expect(page).toHaveURL(/#\/learn\/inside-video\/inspect$/);
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

test("delayed animation frames cannot steal focus from reference links", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const frames = new Map<number, FrameRequestCallback>();
    let next = 0;
    window.requestAnimationFrame = (callback) => {
      frames.set(++next, callback);
      return next;
    };
    window.cancelAnimationFrame = (id) => frames.delete(id);
    window.addEventListener("test:release-frames", () => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(performance.now()));
    });
  });
  for (const route of [
    "formats/video-containers",
    "formats/pixel-formats",
    "codecs/check-playback",
  ]) {
    await page.goto(`./#/appendix/${route}`);
    const codecs = route.startsWith("codecs");
    const link = page.getByRole("link", {
      name: `${codecs ? g.startLink : g.checkLink} →`,
      exact: true,
    });
    await link.focus();
    await page.evaluate(() =>
      window.dispatchEvent(new Event("test:release-frames")),
    );
    await expect(link).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(
      codecs
        ? /#\/learn\/export\/format$/
        : /#\/appendix\/codecs\/check-playback$/,
    );
    if (!codecs)
      await expect(
        page.getByRole("heading", { name: g.checkTitle, exact: true }),
      ).toBeFocused();
  }
});

test("format references reach the export-check procedure and retain an edited command on Back", async ({
  page,
}) => {
  const processing: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/encoder/")) processing.push(request.url());
  });
  await page.goto("./#/learn/export/format");
  await expectPracticeReady(page);
  const id = "export/format:worked:0";
  const cell = page.locator(`[data-cell="${id}"]`);
  const command = (await cell.locator("textarea").inputValue()).replace(
    "ffmpeg ",
    "ffmpeg -hide_banner ",
  );
  await cell.locator("textarea").fill(command);
  await expectSavedCell(page, id, { command });
  await page.getByRole("link", { name: g.link, exact: true }).click();
  await expect(
    page.getByRole("heading", { name: g.startTitle, exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: `${g.startLink} →`, exact: true })
    .click();
  await expect(page).toHaveURL(/#\/learn\/export\/format$/);
  await expect(cell.locator("textarea")).toHaveValue(command);
  await page.goBack();
  for (const route of [
    "formats",
    "formats/video-containers",
    "formats/pixel-formats",
  ]) {
    await page.goto(`./#/appendix/${route}`);
    const link = page.getByRole("link", {
      name: `${g.checkLink} →`,
      exact: true,
    });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#\/appendix\/codecs\/check-playback$/);
    await expect(
      page.getByRole("heading", { name: g.checkTitle, exact: true }),
    ).toBeFocused();
    await page.goBack();
    await expect(page.locator(".format-guide")).toBeVisible();
  }
  await page.goto("./#/appendix/codecs/check-playback");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: g.checkTitle, exact: true }),
  ).toBeFocused();
  await page
    .getByRole("link", { name: `${g.startLink} →`, exact: true })
    .click();
  await expect(cell.locator("textarea")).toHaveValue(command);
  expect(processing).toEqual([]);
});
