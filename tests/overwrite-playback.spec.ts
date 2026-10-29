// Copyright © 2026 Christopher Snow
import { test, expect, type Page, type Locator } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expectPracticeReady } from "./notebook-storage";

const route = "./#/learn/frames-time/samples";
function cell(page: Page) {
  return page.locator('[data-cell="frames-time/samples:worked:0"]');
}
async function run(page: Page, command: string) {
  const target = cell(page);
  await target.locator("textarea").fill(command);
  await target
    .getByRole("button", { name: "Run command", exact: true })
    .click();
  await expect(target.locator('[role="status"]').first()).toHaveText(
    "Command completed",
    { timeout: 120000 },
  );
}
async function energy(player: Locator) {
  const liveGraph = test.info().project.name !== "firefox";
  await player.page().bringToFront();
  if (liveGraph) await player.click();
  await expect
    .poll(() => player.evaluate((el) => (el as HTMLMediaElement).readyState))
    .toBeGreaterThanOrEqual(liveGraph ? 2 : 1);
  return player.evaluate(async (el, liveGraph) => {
    const media = el as HTMLMediaElement;
    // This Linux environment has no audio device. Firefox's real-time sink
    // fails even for valid PCM. Verify decoded content and resource lifecycle
    // there; Chromium also measures the live media-element signal and clock.
    let context: AudioContext | undefined;
    let source: MediaElementAudioSourceNode | undefined;
    let analyser: AnalyserNode | undefined;
    let rms = 0;
    if (liveGraph) {
      context = new AudioContext();
      await context.resume();
      analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      source = context.createMediaElementSource(media);
      source.connect(analyser);
      analyser.connect(context.destination);
    } else {
      const bytes = await (await fetch(media.src)).arrayBuffer();
      const offline = new OfflineAudioContext(1, 1, 48000);
      const decoded = await offline.decodeAudioData(bytes);
      const samples = decoded.getChannelData(0);
      rms = Math.sqrt(
        samples.reduce((sum, value) => sum + value * value, 0) / samples.length,
      );
      return { rms, error: media.error?.message };
    }
    media.currentTime = 0.5;
    await media.play();
    const start = media.currentTime;
    const data = new Float32Array(1024);
    for (let i = 0; i < 16; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (analyser) {
        analyser.getFloatTimeDomainData(data);
        rms = Math.max(
          rms,
          Math.sqrt(data.reduce((s, x) => s + x * x, 0) / data.length),
        );
      }
    }
    const elapsed = media.currentTime - start;
    media.pause();
    source?.disconnect();
    await context?.close();
    return { rms, elapsed, error: media.error?.message };
  }, liveGraph);
}

test("unchanged source playback survives real inspection and cloned-file refreshes", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.goto(route);
  await expectPracticeReady(page);
  await run(page, "ffprobe bunny-short.mp4");
  await page
    .getByRole("button", { name: "Replay source", exact: true })
    .click();
  const video = page.locator(".notebook-source video");
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThan(0);
  const before = await video.evaluate(async (v) => {
    const m = v as HTMLVideoElement;
    m.currentTime = 1;
    await m.play();
    return { src: m.src, time: m.currentTime };
  });
  const element = await video.elementHandle();
  await run(page, "ffprobe bunny-short.mp4");
  await expect(video).toHaveAttribute("src", before.src);
  expect(await video.evaluate((v, old) => v === old, element)).toBe(true);
  expect(
    await video.evaluate((v) => (v as HTMLVideoElement).currentTime),
  ).toBeGreaterThan(before.time);
  expect(await video.evaluate((v) => (v as HTMLVideoElement).paused)).toBe(
    false,
  );
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(video).toHaveAttribute("src", before.src);
});

test("same-name overwrites replace retained audio resources and preserve real decoded sound", async ({
  page,
  context,
}, info) => {
  test.skip(
    !["desktop-light", "phone-light", "firefox"].includes(info.project.name),
  );
  test.setTimeout(180000);
  await page.goto(route);
  await expectPracticeReady(page);
  await run(page, "ffmpeg -i bunny-short.mp4 -t 4 -vn -ar 16000 audio.wav");
  const baselineDownload = page.waitForEvent("download");
  await cell(page)
    .getByRole("button", { name: "Download audio.wav", exact: true })
    .click();
  const baseline = readFileSync((await (await baselineDownload).path())!);
  const viewer = await context.newPage();
  await viewer.goto(route);
  await expectPracticeReady(viewer);
  await viewer.getByRole("button", { name: "Files", exact: true }).click();
  await viewer
    .locator("dialog .notebook-file-name")
    .filter({ hasText: /^audio.wav$/ })
    .click();
  const audio = viewer.locator("dialog audio");
  const firstEnergy = await energy(audio);
  expect(firstEnergy.rms).toBeGreaterThan(0.0001);
  const old = await audio.elementHandle();
  const oldUrl = await audio.getAttribute("src");
  // Same size/type/name, different bytes: cached identity must use content.
  await run(
    page,
    'ffmpeg -y -i bunny-short.mp4 -t 4 -vn -ar 16000 -af "volume=0.25" audio.wav',
  );
  await expect(audio).not.toHaveAttribute("src", oldUrl!);
  expect(await audio.evaluate((el, previous) => el === previous, old)).toBe(
    false,
  );
  expect(
    await old!.evaluate((el) => ({
      src: el.getAttribute("src"),
      paused: (el as HTMLMediaElement).paused,
    })),
  ).toEqual({ src: null, paused: true });
  // Fault injection: a late error from a retired player must not hide its replacement.
  await old!.evaluate((el) => el.dispatchEvent(new Event("error")));
  await expect(audio).toBeVisible();
  const replacement = await energy(audio);
  expect(replacement.rms).toBeGreaterThan(0.0001);
  if (replacement.elapsed !== undefined)
    expect(replacement.elapsed).toBeGreaterThan(0.2);
  expect(replacement.error).toBeUndefined();
  const replacementDownload = page.waitForEvent("download");
  await cell(page)
    .getByRole("button", { name: "Download audio.wav", exact: true })
    .click();
  const path = (await (await replacementDownload).path())!;
  const changed = readFileSync(path);
  expect(changed.length).toBe(baseline.length);
  expect(createHash("sha256").update(changed).digest("hex")).not.toBe(
    createHash("sha256").update(baseline).digest("hex"),
  );
  const report = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
  expect(report.streams).toHaveLength(1);
  expect(report.streams[0].sample_rate).toBe("16000");
  expect(Number(report.format.duration)).toBe(4);
  // Reported sequence: 8k -> unplayable 6k -> the same 8k content and name.
  for (const rate of [8000, 6000, 8000]) {
    const retired = (await audio.count()) ? await audio.elementHandle() : null;
    const previousUrl = retired ? await retired.getAttribute("src") : null;
    await run(
      page,
      `ffmpeg -y -i bunny-short.mp4 -t 4 -vn -ar ${rate} audio.wav`,
    );
    await expect(audio).toBeVisible();
    if (retired) {
      await expect(audio).not.toHaveAttribute("src", previousUrl!);
      expect(
        await audio.evaluate((el, previous) => el === previous, retired),
      ).toBe(false);
    }
    const lower = await energy(audio);
    expect(lower.rms).toBeGreaterThan(0.0001);
    if (lower.elapsed !== undefined) expect(lower.elapsed).toBeGreaterThan(0.2);
    if (rate === 6000) {
      // Our decoder supports 6k. Deliberately simulate a playback error so
      // the next same-name 8k write must recover from failed preview state.
      await audio.evaluate((el) => el.dispatchEvent(new Event("error")));
      await expect(audio).toHaveCount(0);
    }
  }
  await viewer.close();
});
