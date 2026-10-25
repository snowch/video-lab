// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { n } from "../src/notebook/ui.strings";

test("normal FFmpeg exits have clean logs while failed commands keep real errors", async ({
  page,
}, info) => {
  test.skip(!["desktop-light", "firefox"].includes(info.project.name));
  test.setTimeout(180000);
  await page.goto("./#/learn/first-edit/shorten");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await page.evaluate(() =>
    sessionStorage.setItem(
      "video-lab:notebook:cell:first-edit/shorten:worked:0",
      JSON.stringify({
        id: "first-edit/shorten:worked:0",
        command: "ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4",
        last: {
          command: "ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4",
          code: 0,
          log: "Old saved output\nAborted()",
          inputs: [],
          at: "2026-10-24T00:00:00Z",
        },
      }),
    ),
  );
  await page.reload();
  const cell = page.locator('[data-cell="first-edit/shorten:worked:0"]');
  await expect(cell.locator(".notebook-runtime-note")).toHaveText(
    n.runtimeFfmpeg,
  );
  await expect(cell.locator(".notebook-log pre")).toContainText(
    "Old saved output\nAborted()",
  );
  await page.getByRole("button", { name: n.load, exact: true }).click();
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  await expect(cell.locator(".notebook-runtime-note")).toHaveCount(0);
  await expect(cell.locator(".notebook-log pre")).toContainText(
    "ffmpeg version",
  );
  await expect(cell.locator(".notebook-log pre")).not.toContainText(
    "Aborted()",
  );
  const download = page.waitForEvent("download");
  await cell
    .getByRole("button", { name: "Download first-cut.mp4", exact: true })
    .click();
  const path = (await (await download).path())!;
  const probe = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
  expect(Number(probe.format.duration)).toBeCloseTo(5, 1);
  expect(
    probe.streams.map((s: { codec_type: string }) => s.codec_type),
  ).toEqual(["video", "audio"]);
  execFileSync(
    "ffmpeg",
    ["-v", "error", "-xerror", "-i", path, "-f", "null", "-"],
    { stdio: "pipe" },
  );
  await page.reload();
  await expect(cell.locator(".notebook-runtime-note")).toHaveCount(0);
  await expect(cell.locator(".notebook-log pre")).not.toContainText(
    "Aborted()",
  );
  for (const [command, error] of [
    ["ffmpeg -i missing.mp4 missing-cut.mp4", "No such file or directory"],
    [
      "ffmpeg -unknown-option -i bunny-short.mp4 bad.mp4",
      "Unrecognized option",
    ],
    ["ffprobe missing.mp4", "No such file or directory"],
  ]) {
    await cell.locator("textarea").fill(command!);
    await cell.getByRole("button", { name: n.run, exact: true }).click();
    await expect(cell.locator("[role=status]").first()).toHaveText(n.failed, {
      timeout: 120000,
    });
    await expect(cell.locator(".notebook-log pre")).toContainText(error!);
    await expect(cell.locator(".notebook-runtime-note")).toHaveCount(0);
  }
  await cell.locator("textarea").fill("ffprobe bunny-short.mp4");
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  await expect(cell.locator(".notebook-log pre")).toContainText("Video: h264");
});

test("the actual core adapter preserves literal stderr and rejects unexpected native aborts", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  test.setTimeout(120000);
  await page.goto("./");
  const result = await page.evaluate(async () => {
    const run = async (base: string) => {
      const coreURL = base + "encoder/0.12.10/ffmpeg-adapter.js";
      const { default: createCore } = await import(/* @vite-ignore */ coreURL);
      const core = await createCore({
        mainScriptUrlOrBlob:
          coreURL +
          "#" +
          btoa(
            JSON.stringify({
              wasmURL: base + "encoder/0.12.10/ffmpeg-core.wasm",
              workerURL: "",
            }),
          ),
      });
      const logs: string[] = [];
      core.setLogger(({ message }: { message: string }) => logs.push(message));
      core.printErr("Aborted()");
      const literal = logs.slice();
      logs.length = 0;
      core.reset();
      // Fault injection into the actual pinned native entry point: a completed
      // report must not let the -1 probe sentinel hide a real runtime abort.
      core._ffprobe = () => {
        core.FS.writeFile("report.json", '{"format":{"format_name":"mp4"}}');
        core._abort();
      };
      let rejected = false,
        message = "";
      try {
        core.ffprobe("-of", "json", "source.mp4");
      } catch (e) {
        rejected = true;
        message = String(e);
      }
      self.postMessage({ literal, logs, rejected, message, code: core.ret });
    };
    const url = URL.createObjectURL(
      new Blob(
        [
          `(${run.toString()})(${JSON.stringify(new URL("./", location.href).href)})`,
        ],
        { type: "text/javascript" },
      ),
    );
    const worker = new Worker(url, { type: "module" });
    try {
      return await new Promise<{
        literal: string[];
        logs: string[];
        rejected: boolean;
        message: string;
        code: number;
      }>((resolve, reject) => {
        worker.onmessage = (e) => resolve(e.data);
        worker.onerror = (e) => reject(new Error(e.message));
      });
    } finally {
      worker.terminate();
      URL.revokeObjectURL(url);
    }
  });
  expect(result.literal).toEqual(["Aborted()"]);
  expect(result.logs).toEqual(["Aborted()"]);
  expect(result.rejected).toBe(true);
  expect(result.message).toContain("Aborted()");
  expect(result.code).toBe(-1);
});
