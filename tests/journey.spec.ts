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
const status = (page: Page) => page.locator(".command-workspace [role=status]");
import { runCommand as command, clickAction } from "./course-actions";
const output = (page: Page) => page.locator(".command-workspace");
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
  await page.getByRole("link", { name: /^Build$/ }).click();
  await command(page, "fixtures");
  await command(page, buildCommand(1, "video.mp4"));
  await expect(page.getByLabel(cli.output, { exact: true })).not.toContainText(
    cli.cleanupNotice,
  );
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
  await page.getByRole("link", { name: /^Inspect$/ }).click();
  await command(page, probeCommand("mousepad-demo.mp4"));
  await expect(output(page)).toContainText("12.000000");
  await page.getByRole("link", { name: /^Edit$/ }).click();
  const trim = lessons.edit.examples[0]!.command;
  await command(page, trim);
  const trimmed = nativeProbe(await download(page, "cut.mp4"));
  expect(Number(trimmed.format.duration)).toBeCloseTo(6, 1);
  expect(
    trimmed.streams.map((s: { codec_type: string }) => s.codec_type),
  ).toEqual(["video"]);
  const join = lessons.edit.examples[1]!.command;
  await command(page, join);
  const joined = nativeProbe(await download(page, "joined.mp4"));
  expect(Number(joined.format.duration)).toBeCloseTo(5, 1);
  expect(joined.streams).toHaveLength(1);
  await page.getByRole("link", { name: /^Publish$/ }).click();
  const recipe = JSON.parse(
    readFileSync(await download(page, "joined.mp4.recipe.json"), "utf8"),
  );
  expect(recipe.command).toBe(join);
  expect(recipe.args).toContain("-filter_complex");
  expect(
    recipe.inputs.find((i: { name: string }) => i.name === "mousepad-demo.mp4")
      .sha256,
  ).toBe(
    createHash("sha256")
      .update(readFileSync("public/media/mousepad-demo.mp4"))
      .digest("hex"),
  );
  await page.reload();
  await command(page, "ls");
  await expect(page.locator(".workspace-files")).toContainText("joined.mp4");
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
  await expect(output(page)).toContainText("already exists");
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
  await expect(page.locator(".workspace-files")).not.toContainText(
    "pending.mp4",
  );
  expect(readFileSync(await download(page, "video.mp4"))).toEqual(first);
  await command(page, buildCommand(2, "video.mp4"), cli.failed);
  await command(
    page,
    buildCommand(2, "video.mp4").replace("ffmpeg ", "ffmpeg -y "),
  );
  const revised = nativeProbe(await download(page, "video.mp4"));
  expect(Number(revised.format.duration)).toBeCloseTo(1.5, 1);
});

test("removed browser recording never requests capture and earlier captured files remain usable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getDisplayMedia: async () => {
          throw new Error("Browser recording must not be invoked");
        },
      },
    });
    Object.defineProperty(window, "MediaRecorder", {
      configurable: true,
      value: class {
        constructor() {
          throw new Error("Retired recorder must not be constructed");
        }
      },
    });
  });
  await page.goto("./#/capture");
  await expect(
    page.getByRole("button", { name: /Record screen|Stop recording/ }),
  ).toHaveCount(0);
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-workspace-ready",
    "true",
  );
  await expect(page.locator(".cli-lab")).not.toContainText(
    "recording is unavailable",
  );
  await page.evaluate(async () => {
    const blob = await fetch("media/mousepad-demo.mp4").then((r) => r.blob());
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("video-lab-cli", 1);
      request.onsuccess = () => {
        const db = request.result,
          transaction = db.transaction("files", "readwrite");
        transaction
          .objectStore("files")
          .put({ name: "earlier-recording.mp4", blob, origin: "captured" });
        transaction.oncomplete = () => {
          db.close();
          resolve();
        };
        transaction.onerror = () => reject(transaction.error);
      };
      request.onerror = () => reject(request.error);
    });
    localStorage.setItem("video-lab:source", "earlier-recording.mp4");
  });
  await page.reload();
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "earlier-recording.mp4",
  );
  const probe = nativeProbe(await download(page, "earlier-recording.mp4"));
  expect(Number(probe.format.duration)).toBe(12);
  await page.getByRole("link", { name: /^Inspect$/ }).click();
  await command(page, "ffprobe earlier-recording.mp4");
  await expect(page.getByLabel(cli.output, { exact: true })).toContainText(
    "Duration: 00:00:12.00",
  );
  await page.goto("./optional/command-workbench.html");
  await expect(
    page.getByRole("button", { name: /Record screen|Finish recording/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Use practice video", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
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
  await expect(page.locator(".workspace-files")).toContainText("capture.mp4");
  const chooser = page.waitForEvent("filechooser");
  await clickAction(page, "Import file");
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
  await expect(page.locator(".workspace-files")).toContainText(
    "own-recording.mp4",
  );
  await command(page, "rm own-edit.mp4");
  await page.reload();
  await command(page, "ls");
  await expect(
    page
      .locator(".workspace-files code")
      .filter({ hasText: /^own-edit\.mp4$/ }),
  ).toHaveCount(0);
  await page.goto("./#/module-0/challenge");
  await command(page, "progress");
  await expect(output(page)).toContainText(refStrings.legacySaved);
});
test("one download preserves saved files and supports real offline processing after reload", async ({
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
  await expect(page.locator(".workspace-files")).toContainText("frame000.jpg");
  await command(page, buildCommand(1, "video.mp4"));
  expect(
    Number(nativeProbe(await download(page, "video.mp4")).format.duration),
  ).toBeCloseTo(3, 1);
  await page.reload();
  await command(page, probeCommand("video.mp4"));
  await expect(output(page)).toContainText("3.000000");
});
test("native editor, argument builder, output scrolling and session-only files remain usable", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "indexedDB", {
      get() {
        throw new Error("Storage unavailable");
      },
    }),
  );
  await page.goto("./#/inspect");
  await command(page, "sample");
  await expect(page.getByText(cli.session, { exact: true })).toBeVisible();
  const input = page.getByRole("textbox", { name: cli.input, exact: true });
  await input.fill("ffprobe mousepad-demo.mp4");
  await page
    .getByRole("button", { name: "Build command", exact: true })
    .click();
  await page.locator(".native-builder input").last().fill("missing.mp4");
  await page
    .getByRole("button", { name: "Apply to command", exact: true })
    .click();
  await expect(input).toHaveValue("ffprobe mousepad-demo.mp4");
  await page
    .getByRole("button", { name: "Keep my draft", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Apply to command", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Replace draft", exact: true })
    .click();
  await expect(input).toHaveValue("ffprobe missing.mp4");
  await page
    .getByRole("button", { name: "Restore previous draft", exact: true })
    .click();
  await expect(input).toHaveValue("ffprobe mousepad-demo.mp4");
  await input.press("Enter");
  await expect(status(page)).toHaveText(cli.done, { timeout: 120000 });
  const raw = page.getByLabel(cli.output, { exact: true });
  await expect(raw).toContainText("Duration: 00:00:12.00");
  await expect(raw).toContainText("Stream #0:0");
  await expect(raw).not.toContainText(cli.probeSuccess);
  await expect(raw).not.toContainText(cli.done);
  await expect(raw).toHaveCSS("white-space", "pre");
  const right = page.getByRole("button", { name: cli.moreOutput, exact: true });
  await expect(right).toBeVisible();
  await right.click();
  await expect(
    page.getByRole("button", { name: cli.previousOutput, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: cli.wrapLines, exact: true }).click();
  await expect(raw).toHaveCSS("white-space", "pre-wrap");
  await expect(right).toHaveCount(0);
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await input.fill("ffprobe -v error mousepad-demo.mp4");
  await page.locator(".native-tools > summary").click();
  await page
    .getByRole("button", { name: "Use this command", exact: true })
    .click();
  await expect(page.locator(".native-tools")).toHaveAttribute("open", "");
  await expect(
    page.getByRole("button", { name: "Replace draft", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Replace draft", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Keep my draft", exact: true })
    .click();
  await expect(input).toHaveValue("ffprobe -v error mousepad-demo.mp4");
  await input.fill("sample");
  await input.press("Enter");
  await expect(status(page)).toHaveText(cli.failed);
  await expect(
    page.getByLabel("Workspace feedback", { exact: true }),
  ).toContainText("Enter an ffmpeg or ffprobe command");
  await expect(raw).not.toContainText("$ sample");
  await input.fill("ffprobe");
  await input.press("Shift+Enter");
  await input.press("m");
  await expect(input).toHaveValue("ffprobe\nm");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("source controls retain actual imported names, current tasks, comparisons and downloads", async ({
  page,
}) => {
  await page.goto("./#/capture");
  const chooser = page.waitForEvent("filechooser");
  await clickAction(page, "Import file");
  await (
    await chooser
  ).setFiles({
    name: "my capture.mp4",
    mimeType: "video/mp4",
    buffer: readFileSync("public/media/mousepad-demo.mp4"),
  });
  await expect(status(page)).toHaveText(cli.done);
  await expect(
    page.getByLabel("Workspace feedback", { exact: true }),
  ).toContainText("my-capture.mp4");
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "my-capture.mp4",
  );
  await expect(
    page.getByRole("button", { name: guided.next, exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".task-panel")).not.toContainText(
    "Find your recording's exact name",
  );
  expect(
    Number(nativeProbe(await download(page, "my-capture.mp4")).format.duration),
  ).toBe(12);
  await page.getByRole("link", { name: /^Inspect$/ }).click();
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .fill("ffprobe my-capture.mp4");
  await page.reload();

  await expect(
    page.getByRole("textbox", { name: cli.input, exact: true }),
  ).toHaveValue("ffprobe my-capture.mp4");
  await page.getByRole("link", { name: /^Inspect$/ }).click();
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-step",
    "inspect",
  );
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: cli.input, exact: true }),
  ).toHaveValue("ffprobe my-capture.mp4");
  await expect(
    page.getByRole("button", { name: "Use this command", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .press("Enter");
  await expect(status(page)).toHaveText(cli.done, { timeout: 120000 });
  await expect(page.getByLabel(cli.output, { exact: true })).toContainText(
    "Duration: 00:00:12.00",
  );
  await command(page, "reference build");
  await command(page, "reference edit");
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
});
