// Copyright © 2026 Christopher Snow
import { test, expect, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { guided } from "../src/cli/guided.strings";
import { refStrings } from "../src/cli/reference.strings";
import { routeFor } from "../src/journey/routes";
import { cli, lessons } from "../src/cli/strings";
import { offline } from "../src/offline/strings";
import { j } from "../src/journey/strings";
const status = (page: Page) => page.locator(".command-workspace [role=status]");
async function command(page: Page, text: string, result = cli.done) {
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-step",
    routeFor(new URL(page.url()).hash).step!,
  );
  await page.getByRole("textbox", { name: cli.input, exact: true }).fill(text);
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .press("Enter");
  await expect(status(page)).toHaveText(result, { timeout: 20000 });
}
const output = (page: Page) => page.getByLabel(cli.output, { exact: true });
const probeCommand = (file: string) =>
  `ffprobe -v error -show_streams -show_format -of json ${file}`;
const buildCommand = (rate: number, name: string) =>
  `ffmpeg -framerate ${rate} -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p ${name}`;
async function download(page: Page, name: string) {
  const pending = page.waitForEvent("download");
  await command(page, `download ${name}`);
  return (await (await pending).path())!;
}
function nativeProbe(path: string) {
  return JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
}
test("typed real commands encode, change rate, mux, inspect, edit and download source-hashed recipes", async ({
  page,
}) => {
  test.setTimeout(240000);
  const errors: string[] = [],
    requests: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("./#/capture");
  await command(page, "sample");
  await command(page, "ls");
  expect(requests.some((u) => u.includes("/encoder/"))).toBe(false);
  await page.getByRole("link", { name: /1 · How a video/ }).click();
  await command(page, "fixtures");
  await command(page, buildCommand(1, "video.mp4"));
  await expect(output(page)).toContainText(cli.cleanupNotice);
  await command(page, probeCommand("video.mp4"));
  await expect(output(page)).toContainText("3.000000");
  await command(page, buildCommand(2, "faster.mp4"));
  await command(page, probeCommand("faster.mp4"));
  await expect(output(page)).toContainText("1.500000");
  await command(
    page,
    "ffmpeg -i video.mp4 -i tone.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -shortest demo.mp4",
  );
  const muxed = nativeProbe(await download(page, "demo.mp4"));
  expect(
    muxed.streams.map((s: { codec_type: string }) => s.codec_type),
  ).toEqual(["video", "audio"]);
  await page.getByRole("link", { name: /2 · Inspect and prepare/ }).click();
  await command(page, probeCommand("capture.mp4"));
  await expect(output(page)).toContainText("10.000000");
  await page.getByRole("link", { name: /3 · Cut and join/ }).click();
  const trim = lessons.edit.examples[0]!.command;
  await command(page, trim);
  const trimmed = nativeProbe(await download(page, "cut.mp4"));
  expect(Number(trimmed.format.duration)).toBeCloseTo(4, 1);
  expect(
    trimmed.streams.map((s: { codec_type: string }) => s.codec_type),
  ).toEqual(["video", "audio"]);
  const join = lessons.edit.examples[1]!.command;
  await command(page, join);
  const joined = nativeProbe(await download(page, "joined.mp4"));
  expect(Number(joined.format.duration)).toBeCloseTo(5, 1);
  expect(joined.streams).toHaveLength(1);
  await page.getByRole("link", { name: /8 · Export, publish/ }).click();
  const recipe = JSON.parse(
    readFileSync(await download(page, "joined.mp4.recipe.json"), "utf8"),
  );
  expect(recipe.command).toBe(join);
  expect(recipe.args).toContain("-filter_complex");
  expect(
    recipe.inputs.find((i: { name: string }) => i.name === "capture.mp4")
      .sha256,
  ).toBe(
    createHash("sha256")
      .update(readFileSync("public/media/build-queue.mp4"))
      .digest("hex"),
  );
  await page.reload();
  await command(page, "ls");
  await expect(output(page)).toContainText("joined.mp4");
  await command(page, "play joined.mp4");
  await page
    .locator(".cli-preview video")
    .evaluate((v: HTMLVideoElement) => v.play());
  await expect
    .poll(() =>
      page
        .locator(".cli-preview video")
        .evaluate((v: HTMLVideoElement) => v.currentTime),
    )
    .toBeGreaterThan(0.1);
  expect(await page.getByRole("spinbutton").count()).toBe(0);
  expect(await page.getByRole("combobox").count()).toBe(0);
  expect(errors).toEqual([]);
});
test("tool errors, quoting errors, cancellation, history and explicit overwrite preserve prior output", async ({
  page,
  context,
}) => {
  test.setTimeout(180000);
  await page.goto("./#/build");
  await command(page, "fixtures");
  await command(page, buildCommand(1, "video.mp4"));
  const first = readFileSync(await download(page, "video.mp4"));
  await command(page, "ffmpeg -definitely-not-an-option video.mp4", cli.failed);
  await expect(output(page)).toContainText(cli.overwrite);
  await command(page, "ffmpeg -i missing.mp4 -c:v libx264 bad.mp4", cli.failed);
  await expect(output(page)).toContainText("missing.mp4");
  await command(page, "clear");
  await command(page, "ffmpeg -bogus-option bad.mp4", cli.failed);
  await expect(output(page)).not.toContainText(cli.cleanupNotice);
  await expect(output(page)).toContainText("Unrecognized option");
  await command(page, 'ffmpeg -i "unfinished', cli.failed);
  await expect(output(page)).toContainText("quoted");
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .press("ArrowUp");
  await expect(
    page.getByRole("textbox", { name: cli.input, exact: true }),
  ).toHaveValue('ffmpeg -i "unfinished');
  await page.getByRole("textbox", { name: cli.input, exact: true }).fill("");
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  await context.route("**/encoder/**", async (r) => {
    await gate;
    await r.continue().catch(() => {});
  });
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .fill(buildCommand(2, "pending.mp4"));
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .press("Enter");
  await expect(status(page)).toHaveText(cli.running);
  await command(page, "cancel", cli.cancelled);
  release();
  await context.unroute("**/encoder/**");
  await command(page, "ls");
  await expect(output(page)).not.toContainText("Saved pending.mp4");
  expect(readFileSync(await download(page, "video.mp4"))).toEqual(first);
  await command(page, buildCommand(2, "video.mp4"), cli.failed);
  await command(
    page,
    buildCommand(2, "video.mp4").replace("ffmpeg ", "ffmpeg -y "),
  );
  const revised = nativeProbe(await download(page, "video.mp4"));
  expect(Number(revised.format.duration)).toBeCloseTo(1.5, 1);
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
  await command(page, "capture", cli.failed);
  await command(page, "capture", cli.capture.recording);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { captureTest: { frames: number } }).captureTest
            .frames,
      ),
    )
    .toBeGreaterThan(8);
  await command(page, "stop");
  await expect(page.locator(".cli-preview")).toHaveCount(1);
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { captureTest: { tracks: MediaStreamTrack[] } }
      ).captureTest.tracks.every((track) => track.readyState === "ended"),
    ),
  ).toBe(true);
  const file = await page
    .locator(".cli-preview video")
    .getAttribute("aria-label");
  const probe = nativeProbe(await download(page, file!));
  expect(probe.streams[0].codec_type).toBe("video");
  expect(probe.streams[0].width).toBe(640);
  await page.getByRole("link", { name: /2 · Inspect and prepare/ }).click();
  await command(page, probeCommand(file!));
  await command(
    page,
    `ffmpeg -i ${file} -t 0.4 -an -c:v libx264 -preset ultrafast short.mp4`,
  );
  expect(nativeProbe(await download(page, "short.mp4")).streams).toHaveLength(
    1,
  );
  await command(page, "capture", cli.capture.recording);
  await command(page, "cancel", cli.cancelled);
  await command(page, "capture", cli.capture.recording);
  await page.getByRole("link", { name: /1 · How a video file/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    lessons.build.title,
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
test("imported own media and legacy project migrate without changing reference challenge progress", async ({
  page,
}) => {
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
  await command(page, "progress");
  await expect(output(page)).toContainText(refStrings.legacySaved);
  await page.evaluate(async () => {
    // Simulate an older installation that has not migrated its project yet.
    localStorage.removeItem("video-lab:cli-migrated");
    const blob = await fetch("media/build-queue.mp4").then((r) => r.blob());
    await new Promise<void>((resolve, reject) => {
      const r = indexedDB.open("video-lab-project", 1);
      r.onupgradeneeded = () =>
        r.result.createObjectStore("media", { keyPath: "id" });
      r.onerror = () => reject(r.error);
      r.onsuccess = () => {
        const db = r.result,
          t = db.transaction("media", "readwrite");
        t.objectStore("media").put({
          id: "capture",
          blob,
          name: "previous-source.mp4",
          origin: "provided",
          created: Date.now(),
        });
        t.oncomplete = () => {
          db.close();
          resolve();
        };
        t.onerror = () => reject(t.error);
      };
    });
  });
  await page.reload();
  await page.goto("./#/capture");
  await command(page, "ls");
  await expect(output(page)).toContainText("capture.mp4");
  const chooser = page.waitForEvent("filechooser");
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .fill("import");
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .press("Enter");
  await (
    await chooser
  ).setFiles({
    name: "own-recording.mp4",
    mimeType: "video/mp4",
    buffer: readFileSync("public/media/build-queue.mp4"),
  });
  await expect(status(page)).toHaveText(cli.done);
  await command(page, probeCommand("own-recording.mp4"));
  await expect(output(page)).toContainText("10.000000");
  await command(
    page,
    "ffmpeg -i own-recording.mp4 -ss 2 -t 2 -an -c:v libx264 -preset ultrafast own-edit.mp4",
  );
  expect(
    Number(nativeProbe(await download(page, "own-edit.mp4")).format.duration),
  ).toBeCloseTo(2, 1);
  await page.reload();
  await command(page, "ls");
  await expect(output(page)).toContainText("own-recording.mp4");
  await command(page, "rm own-edit.mp4");
  await page.reload();
  await command(page, "ls");
  expect(await output(page).textContent()).not.toMatch(/^own-edit\.mp4\t/m);
  await page.goto("./#/module-0/challenge");
  await command(page, "progress");
  await expect(output(page)).toContainText(refStrings.legacySaved);
});
test("saved files survive offline reload; processing requires deliberately saved tools and works offline", async ({
  page,
  context,
}) => {
  test.setTimeout(180000);
  await page.goto("./#/build");
  await command(page, "fixtures");
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
  await command(page, "ls");
  await expect(output(page)).toContainText("frame000.jpg");
  await command(page, buildCommand(1, "video.mp4"), cli.failed);
  await expect(output(page)).toContainText("Save the processing tools");
  await context.setOffline(false);
  await page.evaluate(() => dispatchEvent(new Event("focus")));
  await page.getByText(j.common.encoderTitle, { exact: true }).click();
  await page
    .getByRole("button", { name: j.common.encoderDownload, exact: true })
    .click();
  await expect(
    page.getByText(j.common.encoderReady, { exact: true }),
  ).toBeVisible({ timeout: 60000 });
  await context.setOffline(true);
  await command(page, buildCommand(1, "video.mp4"));
  expect(
    Number(nativeProbe(await download(page, "video.mp4")).format.duration),
  ).toBeCloseTo(3, 1);
  await page.reload();
  await command(page, probeCommand("video.mp4"));
  await expect(output(page)).toContainText("3.000000");
});
test("keyboard command entry, light/dark layout and session-only fallback remain usable", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "indexedDB", {
      get() {
        throw new Error("Storage unavailable");
      },
    }),
  );
  await page.goto("./#/capture");
  await command(page, "sample");
  await expect(page.getByText(cli.session, { exact: true })).toBeVisible();
  await command(page, "help all");
  await expect(output(page)).toContainText("ffmpeg");
  const wrap = page.getByRole("button", { name: cli.wrapLines, exact: true });
  await expect(wrap).toHaveAttribute("aria-pressed", "false");
  await expect(output(page)).toHaveCSS("white-space", "pre");
  const originalOutput = await output(page).textContent();
  const right = page.getByRole("button", { name: cli.moreOutput, exact: true });
  const left = page.getByRole("button", {
    name: cli.previousOutput,
    exact: true,
  });
  await expect(right).toBeVisible();
  await expect(left).toHaveCount(0);
  await expect(page.locator(".terminal-frame")).toHaveAttribute(
    "data-right",
    "true",
  );
  await right.click();
  await expect(output(page)).toBeFocused();
  await expect(left).toBeVisible();
  await output(page).evaluate((el) => {
    el.scrollLeft = el.scrollWidth;
  });
  await expect(right).toHaveCount(0);
  await expect(page.locator(".terminal-frame")).toHaveAttribute(
    "data-right",
    "false",
  );
  await left.click();
  await expect(right).toBeVisible();
  expect(await output(page).textContent()).toBe(originalOutput);
  if (page.viewportSize()!.width < 500) {
    expect(
      await output(page).evaluate((el) => {
        el.scrollLeft = el.scrollWidth;
        return el.scrollLeft;
      }),
    ).toBeGreaterThan(0);
  }
  await wrap.focus();
  await page.keyboard.press("Space");
  await expect(wrap).toHaveAttribute("aria-pressed", "true");
  await expect(output(page)).toHaveCSS("white-space", "pre-wrap");
  await expect(right).toHaveCount(0);
  await expect(left).toHaveCount(0);
  await expect(page.locator(".terminal-frame")).toHaveAttribute(
    "data-right",
    "false",
  );
  expect(await output(page).textContent()).toBe(originalOutput);
  expect(
    await output(page).evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);
  await wrap.click();
  await expect(output(page)).toHaveCSS("white-space", "pre");
  const input = page.getByRole("textbox", { name: cli.input, exact: true });
  await input.fill("ffmpeg -i capture.mp4");
  await input.press("Shift+Enter");
  await input.press("1");
  await expect(input).toHaveValue("ffmpeg -i capture.mp4\n1");
  await command(page, "play capture.mp4");
  await command(page, "reference build");
  await command(page, "reference edit");
  await expect(output(page)).toContainText(cli.referenceSaved);
  expect(
    Number(
      nativeProbe(await download(page, "reference-edit.mp4")).format.duration,
    ),
  ).toBeCloseTo(6, 1);
  await command(page, "comparison");
  await expect(page.locator(".cli-preview")).toContainText("CC BY 3.0");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".cli-preview video")).toBeVisible();
});

test("guided tasks keep source choices, current help and actual imported filenames beside the prompt", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (navigator.mediaDevices)
      Object.defineProperty(navigator.mediaDevices, "getDisplayMedia", {
        value: undefined,
        configurable: true,
      });
  });
  await page.goto("./#/capture");
  const task = page.locator(".task-panel");
  await expect(task.getByRole("heading", { level: 2 })).toHaveText(
    guided.capture.getSource,
  );
  await expect(task).toContainText(guided.capture.unsupported);
  await expect(
    page.getByRole("button", {
      name: guided.capture.recordChoice,
      exact: true,
    }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: guided.capture.sampleChoice,
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await command(page, "help");
  await expect(output(page)).toContainText(guided.helpAll);
  await expect(output(page)).toContainText("sample");
  await expect(output(page)).not.toContainText("Limits:");
  await command(page, "help all");
  await expect(output(page)).toContainText("Limits:");
  await page
    .getByRole("button", { name: guided.capture.importChoice, exact: true })
    .click();
  await command(page, "ls");
  await expect(output(page)).toContainText(cli.empty);
  const chooser = page.waitForEvent("filechooser");
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .fill("import");
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .press("Enter");
  await (
    await chooser
  ).setFiles({
    name: "my-source.mp4",
    mimeType: "video/mp4",
    buffer: readFileSync("public/media/build-queue.mp4"),
  });
  await expect(status(page)).toHaveText(cli.done);
  const next = page
    .locator(".command-workspace")
    .getByRole("button", { name: guided.next, exact: true });
  await next.click();
  await expect(task.getByRole("heading", { level: 2 })).toHaveText(
    guided.capture.listFiles,
  );
  await command(page, "ls");
  await next.click();
  await expect(task).toContainText("play my-source.mp4");
  await command(page, "help");
  await expect(output(page)).toContainText("play my-source.mp4");
  await command(page, "play my-source.mp4");
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "my-source.mp4",
  );
  await next.click();
  await expect(task).toContainText("download my-source.mp4");
  expect(
    Number(nativeProbe(await download(page, "my-source.mp4")).format.duration),
  ).toBeCloseTo(10, 1);
  await page
    .getByRole("button", { name: guided.previous, exact: true })
    .click();
  await expect(task).toContainText("play my-source.mp4");
  const positions = await page.evaluate(() => ({
    task: document
      .querySelector(".task-panel")!
      .getBoundingClientRect()
      .toJSON(),
    terminal: document
      .querySelector(".command-workspace")!
      .getBoundingClientRect()
      .toJSON(),
    width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));
  if (positions.width >= 900)
    expect(positions.task.right).toBeLessThanOrEqual(positions.terminal.left);
  else
    expect(positions.task.bottom).toBeLessThanOrEqual(positions.terminal.top);
  expect(positions.documentWidth).toBe(positions.width);
  expect(
    await output(page).evaluate((el) => el.clientHeight),
  ).toBeLessThanOrEqual(256);
});
