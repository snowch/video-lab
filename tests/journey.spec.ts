// Copyright © 2026 Christopher Snow
import { test, expect, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { j } from "../src/journey/strings";
import { offline } from "../src/offline/strings";
const chooseSource = async (page: Page) => {
  await page.goto("./#/capture");
  await page
    .getByRole("button", { name: j.capture.fallback, exact: true })
    .click();
  await expect(page.locator(".media-result")).toHaveCount(1);
};
const probeCount = (page: Page, count: number) =>
  expect(page.locator("[data-probe-streams]")).toHaveAttribute(
    "data-probe-streams",
    String(count),
    { timeout: 120000 },
  );
function nativeProbe(path: string) {
  return JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
}
test("real file creation, rate rerun, mux, own project edit and saved publish output", async ({
  page,
  context,
  browserName,
}, info) => {
  test.setTimeout(180000);
  const errors: string[] = [],
    requests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => requests.push(request.url()));
  await chooseSource(page);
  expect(requests.some((url) => url.includes("/encoder/"))).toBe(false);
  expect(requests.some((url) => url.includes("big-buck-bunny"))).toBe(false);
  await page.goto("./#/build");
  await page.getByRole("button", { name: j.build.encode, exact: true }).click();
  await probeCount(page, 1);
  await expect(page.locator(".probe-result")).toContainText("3.000 s");
  await page.getByRole("button", { name: j.build.mux, exact: true }).click();
  await probeCount(page, 2);
  await expect(page.locator(".probe-result")).toContainText("aac");
  const firstDownload = page.waitForEvent("download");
  await page
    .getByRole("link", { name: j.common.download, exact: true })
    .click();
  const output = await firstDownload;
  const muxed = nativeProbe((await output.path())!);
  expect(
    muxed.streams.map((stream: { codec_type: string }) => stream.codec_type),
  ).toEqual(["video", "audio"]);
  await page
    .getByRole("combobox", { name: new RegExp(j.build.rate) })
    .selectOption("2");
  await expect(
    page.getByRole("button", { name: j.build.mux, exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".media-result")).toHaveCount(0);
  await page.getByRole("button", { name: j.build.encode, exact: true }).click();
  await probeCount(page, 1);
  await expect(page.locator(".probe-result")).toContainText("1.500 s");
  await page.goto("./#/inspect");
  await expect(page.locator(".media-result")).toContainText("build-queue.mp4");
  await page.getByRole("button", { name: j.inspect.run, exact: true }).click();
  await probeCount(page, 2);
  await expect(page.locator(".probe-result")).toContainText("10.000 s");
  await page.goto("./#/edit");
  await page.getByRole("button", { name: j.inspect.run, exact: true }).click();
  await probeCount(page, 2);
  await page
    .getByRole("spinbutton", { name: j.edit.firstEnd, exact: true })
    .fill("0");
  await page.getByRole("button", { name: j.edit.run, exact: true }).click();
  await expect(page.getByRole("alert")).toHaveText(j.edit.invalidRange);
  await page
    .getByRole("spinbutton", { name: j.edit.firstEnd, exact: true })
    .fill("2");
  await page.getByRole("button", { name: j.edit.run, exact: true }).click();
  await expect(
    page.getByRole("heading", { name: j.edit.ready, exact: true }),
  ).toBeVisible({ timeout: 120000 });
  await page.goto("./#/publish");
  const download = page.waitForEvent("download");
  await page
    .getByRole("link", { name: j.publish.download, exact: true })
    .click();
  const file = await download;
  const final = nativeProbe((await file.path())!);
  expect(
    final.streams.map((stream: { codec_name: string }) => stream.codec_name),
  ).toEqual(["h264", "aac"]);
  expect(Number(final.format.duration)).toBeGreaterThanOrEqual(6);
  expect(Number(final.format.duration)).toBeLessThan(6.2);
  const recipeDownload = page.waitForEvent("download");
  await page
    .getByRole("link", { name: j.publish.downloadRecipe, exact: true })
    .click();
  const recipe = JSON.parse(
    readFileSync((await (await recipeDownload).path())!, "utf8"),
  );
  expect(recipe.ranges).toEqual([
    { start: 0, end: 2 },
    { start: 3, end: 7 },
  ]);
  expect(recipe.sourceSha256).toBe(
    createHash("sha256")
      .update(readFileSync("public/media/build-queue.mp4"))
      .digest("hex"),
  );
  await page.reload();
  await expect(
    page.getByRole("link", { name: j.publish.download, exact: true }),
  ).toBeVisible();
  const video = page.locator(".media-result video");
  await video.evaluate(async (element: HTMLVideoElement) => {
    element.muted = true;
    await element.play();
  });
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.1);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  // Reimport the actual sparse 1fps output: cuts must not retain a whole
  // original one-second picture hold beyond the selected range.
  await page.goto("./#/inspect");
  await page.getByLabel(j.inspect.upload, { exact: true }).setInputFiles({
    name: "own-built.mp4",
    mimeType: "video/mp4",
    buffer: readFileSync((await output.path())!),
  });
  await expect(page.locator(".source-label")).toContainText(j.common.imported);
  await page.goto("./#/edit");
  await page.getByRole("button", { name: j.inspect.run, exact: true }).click();
  await probeCount(page, 2);
  await page
    .getByRole("checkbox", { name: j.edit.secondRange, exact: true })
    .uncheck();
  await page
    .getByRole("spinbutton", { name: j.edit.firstEnd, exact: true })
    .fill("1.25");
  for (const expectedDuration of [1.25, 1.75]) {
    if (expectedDuration === 1.75) {
      await page
        .getByRole("spinbutton", { name: j.edit.firstStart, exact: true })
        .fill("0.25");
      await page
        .getByRole("spinbutton", { name: j.edit.firstEnd, exact: true })
        .fill("1.5");
      await page
        .getByRole("checkbox", { name: j.edit.secondRange, exact: true })
        .check();
      await page
        .getByRole("spinbutton", { name: j.edit.secondStart, exact: true })
        .fill("2");
      await page
        .getByRole("spinbutton", { name: j.edit.secondEnd, exact: true })
        .fill("2.5");
    }
    await page.getByRole("button", { name: j.edit.run, exact: true }).click();
    await expect(
      page.getByRole("heading", { name: j.edit.ready, exact: true }),
    ).toBeVisible({ timeout: 120000 });
    const editedDownload = page.waitForEvent("download");
    await page
      .locator('.media-result[data-origin="generated"]')
      .getByRole("link", { name: j.common.download, exact: true })
      .click();
    const actual = nativeProbe((await (await editedDownload).path())!);
    // One 12fps picture interval allows picture-boundary rounding, not a
    // whole one-second hold. These selected bounds align exactly to 12fps.
    expect(
      Math.abs(Number(actual.format.duration) - expectedDuration),
    ).toBeLessThan(0.09);
  }
  // At least one production-build run per engine saves the actual core separately.
  if (info.project.name === "desktop-light" || browserName === "firefox") {
    await page.locator(".offline-panel > details > summary").click();
    await page
      .getByRole("button", { name: offline.download, exact: true })
      .click();
    await expect(page.locator("[data-offline-ready]")).toHaveAttribute(
      "data-offline-ready",
      "true",
      { timeout: 30000 },
    );
    const baseline = await (
      await page.request.get("offline-manifest.json")
    ).json();
    expect(
      baseline.files.some(
        (file: { path: string }) =>
          file.path.startsWith("encoder/") || file.path.startsWith("optional/"),
      ),
    ).toBe(false);
    await page.goto("./#/build");
    await page.getByText(j.common.encoderTitle, { exact: true }).click();
    await expect(
      page.getByRole("button", { name: j.common.encoderDownload, exact: true }),
    ).toBeEnabled();
    await page
      .getByRole("button", { name: j.common.encoderDownload, exact: true })
      .click();
    await expect(
      page.getByText(j.common.encoderReady, { exact: true }),
    ).toBeVisible({ timeout: 120000 });
    await context.setOffline(true);
    await page.reload();
    await page
      .getByRole("button", { name: j.build.encode, exact: true })
      .click();
    await probeCount(page, 1);
    await expect(page.locator(".probe-result")).toContainText("1.500 s");
  }
  expect(errors).toEqual([]);
});
test("actual MediaRecorder bytes, denied capture, explicit start and navigation cleanup", async ({
  page,
}) => {
  test.setTimeout(120000);
  // Only the browser chooser is replaced; the canvas track and MediaRecorder are real APIs.
  await page.addInitScript(() => {
    const state = {
      frames: 0,
      requests: 0,
      tracks: [] as MediaStreamTrack[],
      denied: true,
    };
    Object.assign(window, { captureTest: state });
    Object.defineProperty(navigator.mediaDevices, "getDisplayMedia", {
      configurable: true,
      value: async () => {
        state.requests++;
        if (state.denied) {
          state.denied = false;
          throw new DOMException("Denied", "NotAllowedError");
        }
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 360;
        const drawing = canvas.getContext("2d")!;
        const timer = setInterval(() => {
          state.frames++;
          drawing.fillStyle = "#12695e";
          drawing.fillRect(0, 0, 640, 360);
          drawing.fillStyle = "white";
          drawing.font = "32px sans-serif";
          drawing.fillText(`Real capture ${state.frames}`, 30, 100);
        }, 70);
        const stream = canvas.captureStream(12);
        state.tracks.push(...stream.getTracks());
        stream
          .getTracks()
          .forEach((track) =>
            track.addEventListener("ended", () => clearInterval(timer)),
          );
        return stream;
      },
    });
  });
  await page.goto("./#/capture");
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { captureTest: { requests: number } }).captureTest
          .requests,
    ),
  ).toBe(0);
  await page
    .getByRole("button", { name: j.capture.start, exact: true })
    .click();
  await expect(page.getByRole("alert")).toHaveText(j.capture.failed);
  await page
    .getByRole("button", { name: j.capture.start, exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: j.capture.start, exact: true }),
  ).toBeDisabled();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { captureTest: { frames: number } }).captureTest
            .frames,
      ),
    )
    .toBeGreaterThan(8);
  await page.getByRole("button", { name: j.capture.stop, exact: true }).click();
  await expect(page.locator(".media-result")).toHaveCount(1);
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { captureTest: { tracks: MediaStreamTrack[] } }
      ).captureTest.tracks.every((track) => track.readyState === "ended"),
    ),
  ).toBe(true);
  const downloaded = page.waitForEvent("download");
  await page
    .getByRole("link", { name: j.common.download, exact: true })
    .click();
  const probe = nativeProbe((await (await downloaded).path())!);
  expect(probe.streams[0].codec_type).toBe("video");
  expect(probe.streams[0].width).toBe(640);
  await page.getByRole("link", { name: /2 · Inspect and prepare/ }).click();
  await page.getByRole("button", { name: j.inspect.run, exact: true }).click();
  await probeCount(page, 1);
  await page.getByRole("link", { name: /3 · Cut and join/ }).click();
  await page.getByRole("button", { name: j.inspect.run, exact: true }).click();
  await probeCount(page, 1);
  await page
    .getByRole("checkbox", { name: j.edit.secondRange, exact: true })
    .uncheck();
  await page
    .getByRole("spinbutton", { name: j.edit.firstEnd, exact: true })
    .fill("0.4");
  await page.getByRole("button", { name: j.edit.run, exact: true }).click();
  await expect(
    page.getByRole("heading", { name: j.edit.ready, exact: true }),
  ).toBeVisible({ timeout: 120000 });
  await expect(page.locator(".probe-result").last()).toContainText(
    j.common.audioAbsent,
  );
  await page.getByRole("link", { name: /0 · Capture your first/ }).click();
  await page
    .getByRole("button", { name: j.capture.start, exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: j.capture.stop, exact: true }),
  ).toBeEnabled();
  await page.getByRole("link", { name: /1 · How a video file/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    j.build.title,
  );
  await expect
    .poll(() =>
      page.evaluate(() =>
        (
          window as unknown as { captureTest: { tracks: MediaStreamTrack[] } }
        ).captureTest.tracks.every((track) => track.readyState === "ended"),
      ),
    )
    .toBe(true);
});
test("cancelled and failed processing leaves no stale output and can retry", async ({
  page,
  context,
}) => {
  test.setTimeout(120000);
  await page.goto("./#/build");
  await context.route("**/encoder/**", (route) => route.abort());
  await page.getByRole("button", { name: j.build.encode, exact: true }).click();
  await expect(page.getByRole("alert")).toContainText(
    j.common.processingFailed,
  );
  await expect(page.locator(".media-result")).toHaveCount(0);
  await page
    .getByRole("button", { name: j.build.reference, exact: true })
    .click();
  await expect(page.locator(".media-result")).toHaveAttribute(
    "data-origin",
    "provided",
  );
  await context.unroute("**/encoder/**");
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const hold = async (route: import("@playwright/test").Route) => {
    await gate;
    await route.continue().catch(() => {});
  };
  await context.route("**/encoder/**", hold);
  await page.getByRole("button", { name: j.build.encode, exact: true }).click();
  await page
    .getByRole("button", { name: j.common.cancel, exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText(j.common.cancelled);
  release();
  await context.unroute("**/encoder/**", hold);
  await expect(
    page.getByRole("button", { name: j.build.encode, exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: j.build.encode, exact: true }).click();
  await probeCount(page, 1);
  await expect(page.locator(".media-result")).toHaveAttribute(
    "data-origin",
    "generated",
  );
});

test("provided references keep fixed settings and legacy bookmarks preserve stored work", async ({
  page,
  context,
  browserName,
}, info) => {
  test.setTimeout(120000);
  await page.addInitScript(() =>
    localStorage.setItem(
      "video-lab:v1:what-is-video",
      JSON.stringify({
        version: 1,
        challenges: {
          inspection: {
            artifact: {
              answers: {
                video: "0",
                audio: "1",
                container: "mp4",
                codec: "h264",
                frame: "75",
                timestamp: "6.25",
              },
            },
            attempts: 1,
            hintsRevealed: 2,
          },
        },
        slots: {},
      }),
    ),
  );
  await page.goto("./#/module-0/challenge");
  await expect(page).toHaveURL(/inspect\/reference\/challenge$/);
  await expect(page.locator("[data-challenge=inspection]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.goto("./#/build");
  await page
    .getByRole("combobox", { name: new RegExp(j.build.rate) })
    .selectOption("2");
  if (info.project.name === "desktop-light" || browserName === "firefox") {
    await page.locator(".offline-panel > details > summary").click();
    await page
      .getByRole("button", { name: offline.download, exact: true })
      .click();
    await expect(page.locator("[data-offline-ready]")).toHaveAttribute(
      "data-offline-ready",
      "true",
      { timeout: 30000 },
    );
    await context.setOffline(true);
    await page.reload();
    await page
      .getByRole("button", { name: j.build.encode, exact: true })
      .click();
    await expect(page.getByRole("alert")).toHaveText(
      j.common.processingFailed,
      { timeout: 30000 },
    );
    await expect(page.locator(".media-result")).toHaveCount(0);
    await page.getByText(j.common.encoderTitle, { exact: true }).click();
    await expect(
      page.getByText(j.common.encoderMissing, { exact: true }),
    ).toBeVisible();
  }
  await page
    .getByRole("button", { name: j.build.reference, exact: true })
    .click();
  await expect(page.locator(".media-result")).toHaveAttribute(
    "data-origin",
    "provided",
  );
  await expect(
    page.getByText(j.build.referenceNote, { exact: true }).first(),
  ).toBeVisible();
  await expect(page.locator(".probe-result")).toContainText("3.000 s");
  await expect(page.locator(".probe-result")).toHaveAttribute(
    "data-probe-streams",
    "2",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.setOffline(false);
  await page.goto("./#/inspect");
  const upload = page.getByLabel(j.inspect.upload, { exact: true });
  await upload.setInputFiles("public/media/build-queue.mp4");
  await expect(page.locator(".source-label")).toContainText(j.common.imported);
  await expect(page.locator(".source-label")).not.toContainText(
    j.common.generated,
  );
  await page.getByRole("button", { name: j.inspect.run, exact: true }).click();
  await probeCount(page, 2);
  await upload.setInputFiles({
    name: "unsupported.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("not media"),
  });
  await expect(page.getByRole("alert")).toHaveText(j.common.processingFailed);
  await expect(page.locator(".source-label")).toContainText("build-queue.mp4");
});
