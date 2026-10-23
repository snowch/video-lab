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
  await run(page);
  const report = JSON.parse(
    (await page.getByLabel(C.command.outputLabel).textContent()) ?? "{}",
  );
  expect(report.streams).toHaveLength(1);
  expect(report.streams[0].codec_name).toBe("h264");
  expect(+report.format.duration).toBe(12);
  await page.getByRole("button", { name: C.inspect.next + " →" }).click();
  await run(page);
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
  expect(recipe.command).toContain("-ss 2 -t 6");
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
  await expect(page.getByLabel(C.command.outputLabel)).toContainText(
    "12.000000",
  );
  await context.setOffline(false);
});
