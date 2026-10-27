// Copyright © 2026 Christopher Snow
import { expectPracticeReady } from "./notebook-storage";
import { test, expect } from "@playwright/test";
import media from "../src/notebook/visuals/media.json" with { type: "json" };

const routes = [
  "inside-video/inspect",
  "inside-video/streams",
  "frames-time/rate",
  "frames-time/timestamps",
  "cut-join/copy",
  "cut-join/keyframes",
  "framing/scale",
  "framing/crop",
  "framing/pad",
  "sound/level",
  "sound/fade",
  "text/subtitles",
  "quality/quality",
  "export/faststart",
];

test("visual lessons reflow and their supplied images belong to the offline bundle", async ({
  page,
}) => {
  const tools: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/encoder/")) tools.push(r.url());
  });
  await page.goto("./#/learn/inside-video/inspect");
  const manifest = await (
    await page.request.get("./offline-manifest.json")
  ).json();
  for (const asset of [
    ...Object.values(media.framing.images),
    ...media.quality.encodes.flatMap((e) => [e, e.image]),
  ]) {
    expect(
      manifest.files.some((f: { path: string }) => f.path === asset.path),
      asset.path,
    ).toBe(true);
  }
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  for (const route of routes) {
    await page.evaluate((r) => {
      location.hash = "#/learn/" + r;
    }, route);
    await expect(page.locator(".notebook-page")).toHaveAttribute(
      "data-page",
      route,
    );
    if (route === "inside-video/inspect") {
      const brands = page.locator(".visual-brands");
      const summary = brands.locator("summary");
      await expect(brands).not.toHaveAttribute("open", "");
      await expect(brands.locator("pre")).toBeHidden();
      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(brands).toHaveAttribute("open", "");
      await expect(brands.locator("pre")).toHaveText(
        media.probe.brandLines.join("\n"),
      );
      await expect(brands.getByRole("link")).toHaveAttribute(
        "href",
        "https://mp4ra.org/registered-types/brands",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await summary.press("Space");
      await expect(brands.locator("pre")).toBeHidden();
      if (test.info().project.use.isMobile) await summary.tap();
      else await summary.click();
      await expect(brands.locator("pre")).toBeVisible();
      await summary.click();
      await expect(brands.locator("pre")).toBeHidden();
    }
    const figures = page.locator(".notebook-page > figure");
    await expect(figures.first()).toBeVisible();
    for (const img of await figures.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() => img.evaluate((e) => (e as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
    await expect(page.locator(".notebook-concept")).not.toContainText("**");
  }
  await page.setViewportSize({ width: 320, height: 800 });
  await page.evaluate(() => {
    location.hash = "#/learn/cut-join/keyframes";
  });
  await expect(page.locator(".notebook-page")).toHaveAttribute(
    "data-page",
    "cut-join/keyframes",
  );
  for (const picture of await page.locator(".media-pictures li").all()) {
    expect(
      await picture.evaluate((el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const text = range.getBoundingClientRect(),
          box = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return (
          text.left >= box.left + parseFloat(style.borderLeftWidth) - 1 &&
          text.right <= box.right - parseFloat(style.borderRightWidth) + 1
        );
      }),
      "dependency letter fits its box at 320px with doubled text",
    ).toBe(true);
  }
  expect(tools).toEqual([]);
});

test("probe guide remains a supplied example while actual output stays byte-for-byte text", async ({
  page,
}, info) => {
  test.skip(!["desktop-light", "firefox"].includes(info.project.name));
  test.setTimeout(120000);
  await page.goto("./#/learn/inside-video/inspect");
  await expectPracticeReady(page);
  const cell = page.locator('[data-cell="inside-video/inspect:worked:0"]');
  await expect(
    cell.locator(".visual-probe-lines dt").filter({ hasText: "Video:" }),
  ).toHaveText("Stream #0:0 … Video: h264 … 854x480 … 24 fps");
  await cell.locator("textarea").fill("ffprobe bunny-action.mp4");
  await cell.getByRole("button", { name: "Run command", exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(
    "Command completed",
    { timeout: 90000 },
  );
  await expect(cell.locator(".notebook-log pre")).toContainText(
    "bunny-action.mp4",
  );
  await expect(cell.locator(".visual-probe-lines dt").first()).toContainText(
    "bunny-short.mp4",
  );
  await expect(
    cell.locator(".visual-probe-lines dt").filter({ hasText: "Duration:" }),
  ).toHaveText("Duration: 00:00:08.00 … bitrate: 352 kb/s");
  await expect
    .poll(() =>
      page.evaluate(async () => {
        const db = await new Promise<IDBDatabase>((resolve, reject) => {
          const r = indexedDB.open("video-lab-notebook");
          r.onsuccess = () => resolve(r.result);
          r.onerror = () => reject(r.error);
        });
        try {
          return await new Promise<string | undefined>((resolve, reject) => {
            const tx = db.transaction("cells");
            const r = tx
              .objectStore("cells")
              .get("inside-video/inspect:worked:0");
            tx.oncomplete = () => resolve(r.result?.last?.log);
            tx.onerror = () => reject(tx.error);
          });
        } finally {
          db.close();
        }
      }),
    )
    .toBe(await cell.locator(".notebook-log pre").textContent());
  await expect(
    cell.locator(".notebook-log pre code, .notebook-log pre strong"),
  ).toHaveCount(0);
});

test("amplitude model changes height with the keyboard without editing the command", async ({
  page,
}) => {
  await page.goto("./#/learn/sound/level");
  const input = page.locator(".time-gain-control input");
  const editor = page.locator(".notebook-cell > textarea").first();
  const command = await editor.inputValue();
  const after = page.locator(".time-wave-row").nth(1).locator(".time-signal");
  const original = await after.getAttribute("d");
  await input.focus();
  await page.keyboard.press("Home");
  await expect(input).toHaveValue("0");
  await expect(after).not.toHaveAttribute("d", original!);
  await expect(after).toHaveAttribute("d", /^M[\d.]+,56(?: L?[\d.]+,56)*$/);
  await page.keyboard.press("End");
  await expect(input).toHaveValue("1");
  await expect(after).toHaveAttribute(
    "d",
    (await page
      .locator(".time-wave-row")
      .first()
      .locator(".time-signal")
      .getAttribute("d"))!,
  );
  await expect(editor).toHaveValue(command);
});
