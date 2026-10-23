// Copyright © 2026 Christopher Snow
import { test, expect, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import C from "../src/workbench/strings.json" with { type: "json" };
import { offline } from "../src/offline/strings";
import { j } from "../src/journey/strings";
const run = async (page: Page) => {
  await page
    .getByRole("button", { name: C.live.run + " →", exact: true })
    .click();
  await expect(page.locator("main p.status")).toHaveText(C.live.finished, {
    timeout: 60000,
  });
};
async function start(page: Page) {
  await page.goto("optional/command-workbench.html");
  await page
    .getByRole("button", { name: C.source.sample, exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: C.source.next + " →" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: C.source.next + " →" }).click();
}
async function getDownload(page: Page, label: string) {
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: label, exact: true }).click();
  return (await (await pending).path())!;
}
test("workbench runs real probe and trim, downloads measured media and exact recipe, preserves source and drafts", async ({
  page,
}) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await start(page);
  await expect(
    page.getByRole("textbox", { name: C.command.heading, exact: true }),
  ).toHaveValue("ffprobe mousepad-demo.mp4");
  await run(page);
  await expect(page.getByLabel(C.live.logs)).toBeVisible();
  await expect(page.getByLabel(C.live.logs)).toContainText(
    "Duration: 00:00:12.00",
  );
  await expect(page.getByLabel(C.live.logs)).toContainText("Video: h264");
  await expect(page.getByLabel(C.live.logs)).not.toContainText('"format_name"');
  const readable = page.getByLabel(C.live.logs);
  await expect
    .poll(() =>
      readable.evaluate(
        (el) => el.scrollHeight - el.clientHeight - el.scrollTop,
      ),
    )
    .toBeLessThanOrEqual(2);
  await readable.evaluate((el) => {
    el.scrollTop = 0;
  });
  await page.getByRole("button", { name: /theme/ }).click();
  await expect.poll(() => readable.evaluate((el) => el.scrollTop)).toBe(0);
  await page
    .getByRole("button", { name: C.command.manual, exact: true })
    .click();
  const probeEntry = page.getByRole("textbox", {
    name: C.command.heading,
    exact: true,
  });
  await probeEntry.fill("ffprobe missing.mp4");
  await page
    .getByRole("button", { name: C.live.run + " →", exact: true })
    .click();
  await expect(page.locator("main p.status")).toHaveText(C.live.failed, {
    timeout: 30000,
  });
  await expect(page.getByLabel(C.live.logs)).toContainText(
    "No such file or directory",
  );
  await expect(page.getByLabel(C.live.logs)).not.toContainText('"error"');
  await probeEntry.fill(
    "ffprobe -v error -show_streams -show_format -of json mousepad-demo.mp4",
  );
  await run(page);
  const reportText = await page.getByLabel(C.command.outputLabel).textContent();
  const report = JSON.parse(reportText ?? "{}");
  await expect(page.getByLabel(C.command.outputLabel)).toBeVisible();
  expect(
    await page.getByLabel(C.command.outputLabel).evaluate((el) => el.scrollTop),
  ).toBe(0);
  await expect(page.locator(".metric")).toHaveCount(0);
  await expect(page.getByText(C.live.result, { exact: true })).toHaveCount(0);
  await expect(
    page.getByText(C.live.probeCleanup, { exact: true }),
  ).not.toBeVisible();
  const reportFile = await getDownload(page, C.live.downloadReport);
  expect(readFileSync(reportFile, "utf8")).toEqual(reportText);
  expect(report.streams).toHaveLength(1);
  expect(report.streams[0].codec_name).toBe("h264");
  expect(+report.format.duration).toBe(12);
  await page.getByRole("button", { name: C.inspect.next + " →" }).click();
  await run(page);
  await expect(page.getByLabel(C.live.logs)).toBeVisible();
  await expect(page.getByLabel(C.live.logs)).toContainText("Output #0");
  const output = getDownload(page, C.trim.export);
  const path = await output;
  const native = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
  expect(+native.format.duration).toBe(6);
  expect(native.streams).toHaveLength(1);
  expect(native.streams[0].nb_frames).toBe("90");
  const recipe = JSON.parse(
    readFileSync(await getDownload(page, C.live.downloadRecipe), "utf8"),
  );
  expect(recipe.command).toBe("ffmpeg -i mousepad-demo.mp4 -t 6 demo.mp4");
  expect(recipe.inputs[0].sha256).toBe(
    createHash("sha256")
      .update(readFileSync("public/media/mousepad-demo.mp4"))
      .digest("hex"),
  );
  await page.getByLabel(C.command.duration, { exact: false }).fill("4");
  await expect(page.getByText(C.live.stale)).toBeVisible();
  await page
    .getByRole("button", { name: C.command.manual, exact: true })
    .click();
  const command = page.getByRole("textbox", {
    name: C.command.heading,
    exact: true,
  });
  await command.fill(
    "ffmpeg -i mousepad-demo.mp4 -ss 2 -t 4 -an -c:v libx264 shorter.mp4",
  );
  await page
    .getByRole("button", { name: C.command.builder, exact: true })
    .click();
  await page.getByRole("button", { name: C.command.replace }).click();
  await expect(command).toBeFocused();
  await page.getByRole("button", { name: C.command.restoreTyped }).click();
  await expect(command).toBeFocused();
  await expect(command).toHaveValue(/shorter.mp4$/);
  await page.reload();
  await expect(command).toHaveValue(/shorter.mp4$/);
  await command.fill("ffmpeg -y -i mousepad-demo.mp4 mousepad-demo.mp4");
  await page
    .getByRole("button", { name: C.live.run + " →", exact: true })
    .click();
  await expect(page.locator("main .error")).toContainText("source");
  await command.fill("ffmpeg -i missing.mp4 failed.mp4");
  await page
    .getByRole("button", { name: C.live.run + " →", exact: true })
    .click();
  await expect(page.locator("main .error")).toContainText("exited", {
    timeout: 30000,
  });
  await expect(page.locator("main p.status")).toHaveText(C.live.failed);
  await expect(page.locator("main .error")).toContainText(C.live.logHint);
  await command.fill("ffmpeg -i mousepad-demo.mp4 -t 1 recovered.mp4");
  await run(page);
  await page.getByText(C.files.heading + " · 5", { exact: true }).click();
  expect(
    (await page.locator(".file-row code").allTextContents()).sort(),
  ).toEqual(
    [
      "mousepad-demo.mp4",
      "demo.mp4",
      "demo.mp4.recipe.json",
      "recovered.mp4",
      "recovered.mp4.recipe.json",
    ].sort(),
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
test("import renaming, source replay, cancel/retry and native command boundary", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.goto("optional/command-workbench.html");
  await page
    .getByRole("button", { name: C.source.import, exact: true })
    .waitFor();
  await page.getByLabel(C.source.import, { exact: true }).setInputFiles({
    name: "- my demo's.mp4",
    mimeType: "video/mp4",
    buffer: readFileSync("public/media/mousepad-demo.mp4"),
  });
  await expect(page.locator("main .status")).toContainText("my-demo-s.mp4");
  await page.getByRole("button", { name: C.source.next + " →" }).click();
  await page
    .getByRole("button", { name: C.command.manual, exact: true })
    .click();
  const command = page.getByRole("textbox", {
    name: C.command.heading,
    exact: true,
  });
  await command.fill("sample");
  await page
    .getByRole("button", { name: C.live.run + " →", exact: true })
    .click();
  await expect(page.locator("main .error")).toContainText("ffmpeg");
  await command.fill(
    "ffprobe -v error -show_streams -show_format -of json my-demo-s.mp4",
  );
  await page.route("**/encoder/**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue().catch(() => {});
  });
  await page
    .getByRole("button", { name: C.live.run + " →", exact: true })
    .click();
  await page.getByRole("button", { name: C.live.cancel, exact: true }).click();
  await expect(page.locator("main .status")).toHaveText(C.live.cancelled);
  await page.unrouteAll({ behavior: "wait" });
  await run(page);
  await page.getByText(C.files.replay, { exact: true }).click();
  const video = page.locator(".source-replay video");
  await expect(video).toBeVisible();
  await video.evaluate((el: HTMLVideoElement) => {
    el.currentTime = 4;
  });
  await page.getByRole("button", { name: /theme/ }).click();
  await expect
    .poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime))
    .toBeCloseTo(4, 0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("working entry and separately saved WASM run offline after reload", async ({
  page,
  context,
}) => {
  test.setTimeout(180000);
  await start(page);
  await page.locator(".offline-panel > details > summary").click();
  const panel = page.locator(".offline-panel");
  await panel
    .getByRole("button", { name: offline.download, exact: true })
    .click();
  await expect(panel.getByRole("status")).toHaveText(offline.ready, {
    timeout: 60000,
  });
  await page.locator(".encoder-offline > summary").click();
  await page
    .getByRole("button", { name: j.common.encoderDownload, exact: true })
    .click();
  await expect(page.locator(".encoder-offline [role=status]")).toHaveText(
    j.common.encoderReady,
    { timeout: 60000 },
  );
  await context.setOffline(true);
  await page.reload();
  await run(page);
  await expect(page.getByLabel(C.live.logs)).toContainText(
    "Duration: 00:00:12.00",
  );
  await context.setOffline(false);
});

test("readable ffprobe validates corrupt input and quiet success without leaking its internal check", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto("optional/command-workbench.html");
  await page.getByLabel(C.source.import, { exact: true }).setInputFiles({
    name: "broken.mp4",
    mimeType: "video/mp4",
    buffer: Buffer.from("This is not a media file."),
  });
  await page.getByRole("button", { name: C.source.next + " →" }).click();
  await page
    .getByRole("button", { name: C.live.run + " →", exact: true })
    .click();
  await expect(page.locator("main p.status")).toHaveText(C.live.failed, {
    timeout: 30000,
  });
  await expect(page.getByLabel(C.live.logs)).toContainText(
    "Invalid data found when processing input",
  );
  await expect(page.getByLabel(C.live.logs)).not.toContainText('"error"');
  await page
    .getByRole("button", { name: C.command.manual, exact: true })
    .click();
  await page
    .getByRole("textbox", { name: C.command.heading, exact: true })
    .fill("ffprobe -madeup broken.mp4");
  await page
    .getByRole("button", { name: C.live.run + " →", exact: true })
    .click();
  await expect(page.locator("main p.status")).toHaveText(C.live.failed, {
    timeout: 30000,
  });
  await expect(page.locator("main .error")).toContainText("status 1");
  await page
    .getByRole("button", { name: C.source.change, exact: true })
    .click();
  await page
    .getByRole("button", { name: C.source.sample, exact: true })
    .click();
  await page.getByRole("button", { name: C.source.next + " →" }).click();
  await page
    .getByRole("button", { name: C.command.manual, exact: true })
    .click();
  await page
    .getByRole("textbox", { name: C.command.heading, exact: true })
    .fill("ffprobe -v error mousepad-demo.mp4");
  await run(page);
  await expect(page.locator(".command-echo")).toHaveText(
    "$ ffprobe -v error mousepad-demo.mp4",
  );
  await expect(page.getByLabel(C.live.logs)).toHaveCount(0);
  await expect(page.getByLabel(C.command.outputLabel)).toHaveCount(0);
  await page
    .getByRole("textbox", { name: C.command.heading, exact: true })
    .fill("ffprobe -version");
  await run(page);
  await expect(page.getByLabel(C.live.logs)).toContainText("version 5.1.4");
});
