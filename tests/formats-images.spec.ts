// Copyright © 2026 Christopher Snow
import { test, expect, type Locator, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { n } from "../src/notebook/ui.strings";
import { courseUI } from "../src/cli/course.strings";
import { appStatusStrings as status } from "../src/app-status/strings";
import { expectPracticeReady, expectSavedCell } from "./notebook-storage";
import { pixelFormats } from "../src/notebook/pixel-formats.strings";

const lessons = [
  {
    slug: "hold",
    assets: ["landscape.jpg"],
    worked: "ffmpeg -loop 1 -i landscape.jpg -t 5 -pix_fmt yuv420p still.mp4",
    starter:
      "ffmpeg -loop 1 -i landscape.jpg -t 5 -pix_fmt yuv420p still-practice.mp4",
    solution:
      "ffmpeg -loop 1 -i landscape.jpg -t 3 -pix_fmt yuv420p still-practice.mp4",
    output: "still.mp4",
    practiceOutput: "still-practice.mp4",
    duration: 5,
    practiceDuration: 3,
    rate: 25,
  },
  {
    slug: "sequence",
    assets: ["drawing-01.png", "drawing-02.png", "drawing-03.png"],
    worked:
      "ffmpeg -framerate 1/2 -i drawing-%02d.png -vf fps=24 -pix_fmt yuv420p slides.mp4",
    starter:
      "ffmpeg -framerate 1/2 -i drawing-%02d.png -vf fps=24 -pix_fmt yuv420p slides-practice.mp4",
    solution:
      "ffmpeg -framerate 1 -i drawing-%02d.png -vf fps=24 -pix_fmt yuv420p slides-practice.mp4",
    output: "slides.mp4",
    practiceOutput: "slides-practice.mp4",
    duration: 6,
    practiceDuration: 3,
    rate: 24,
  },
  {
    slug: "animation",
    assets: Array.from(
      { length: 6 },
      (_, i) => `frame-${String(i + 1).padStart(2, "0")}.png`,
    ),
    worked:
      "ffmpeg -framerate 3 -i frame-%02d.png -vf fps=24 -pix_fmt yuv420p animation.mp4",
    starter:
      "ffmpeg -framerate 3 -i frame-%02d.png -vf fps=24 -pix_fmt yuv420p animation-practice.mp4",
    solution:
      "ffmpeg -framerate 6 -i frame-%02d.png -vf fps=24 -pix_fmt yuv420p animation-practice.mp4",
    output: "animation.mp4",
    practiceOutput: "animation-practice.mp4",
    duration: 2,
    practiceDuration: 1,
    rate: 24,
  },
  {
    slug: "overlay",
    assets: ["bunny-short.mp4", "annotation.png"],
    worked:
      "ffmpeg -i bunny-short.mp4 -i annotation.png -filter_complex overlay annotated.mp4",
    starter:
      "ffmpeg -i bunny-short.mp4 -i annotation.png -filter_complex overlay annotated-practice.mp4",
    solution:
      "ffmpeg -i bunny-short.mp4 -i annotation.png -filter_complex overlay=40:0 annotated-practice.mp4",
    output: "annotated.mp4",
    practiceOutput: "annotated-practice.mp4",
    duration: 8,
    practiceDuration: 8,
    rate: 24,
  },
];

async function run(cell: Locator) {
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  await expect(cell.locator(".notebook-log pre")).toContainText(
    "ffmpeg version",
  );
  await expect(cell.locator(".notebook-cell-result video")).toBeVisible();
}

async function download(page: Page, cell: Locator, name: string) {
  const downloading = page.waitForEvent("download");
  await cell
    .getByRole("button", { name: `${n.download} ${name}`, exact: true })
    .click();
  return (await (await downloading).path())!;
}

function probe(file: string, duration: number, rate: number, audio: boolean) {
  const result = JSON.parse(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-count_frames",
        "-show_streams",
        "-show_format",
        "-of",
        "json",
        file,
      ],
      { encoding: "utf8" },
    ),
  );
  const video = result.streams.find(
    (stream: { codec_type: string }) => stream.codec_type === "video",
  );
  expect(Number(result.format.duration)).toBeCloseTo(duration, 1);
  expect([video.width, video.height]).toEqual(audio ? [854, 480] : [640, 360]);
  expect(video.avg_frame_rate).toBe(`${rate}/1`);
  expect(Number(video.nb_read_frames)).toBe(duration * rate);
  expect(
    result.streams.some(
      (stream: { codec_type: string }) => stream.codec_type === "audio",
    ),
  ).toBe(audio);
}

function pixels(file: string, filter: string) {
  return execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-i",
      file,
      "-vf",
      filter,
      "-pix_fmt",
      "rgb24",
      "-f",
      "rawvideo",
      "-",
    ],
    { maxBuffer: 8 * 1024 * 1024 },
  );
}

function orderedPictures(file: string, duration: number, animation: boolean) {
  const expected = animation
    ? [
        [80, 260],
        [176, 160],
        [272, 90],
        [368, 90],
        [464, 160],
        [560, 260],
      ]
    : [
        [80, 260],
        [272, 90],
        [560, 260],
      ];
  // Sample once within every hold. A missing staged picture, wrong ordering or
  // invented interpolation fails even when the MP4 has the expected duration.
  const frames = pixels(file, `fps=${expected.length / duration}`);
  const size = 640 * 360 * 3;
  expect(frames.length).toBe(size * expected.length);
  for (let frame = 0; frame < expected.length; frame++) {
    let x = 0,
      y = 0,
      count = 0;
    for (let at = 0; at < size; at += 3) {
      const pixel = frame * size + at;
      if (
        frames[pixel]! > 180 &&
        frames[pixel + 1]! > 50 &&
        frames[pixel + 1]! < 160 &&
        frames[pixel + 2]! < 100
      ) {
        x += (at / 3) % 640;
        y += Math.floor(at / 3 / 640);
        count++;
      }
    }
    expect(count).toBeGreaterThan(1500);
    expect(Math.abs(x / count - expected[frame]![0]!)).toBeLessThan(1);
    expect(Math.abs(y / count - expected[frame]![1]!)).toBeLessThan(1);
  }
}

function visibleOverlay(file: string, offset: number) {
  // Check the opaque ring throughout the output and compare a transparent
  // region with the source, rather than treating successful encoding as proof.
  const ring = pixels(file, `crop=2:2:${326 + offset}:234`);
  expect(ring.length).toBe(2 * 2 * 3 * 192);
  for (let at = 0; at < ring.length; at += 3) {
    expect(ring[at]).toBeGreaterThan(180);
    expect(ring[at + 1]).toBeGreaterThan(50);
    expect(ring[at + 1]).toBeLessThan(160);
    expect(ring[at + 2]).toBeLessThan(100);
  }
  const clear = pixels(file, "crop=16:16:32:32");
  const source = pixels(
    "public/media/notebook/bunny-short.mp4",
    "crop=16:16:32:32",
  );
  expect(clear.length).toBe(source.length);
  let difference = 0;
  for (let i = 0; i < clear.length; i++)
    difference += Math.abs(clear[i]! - source[i]!);
  expect(difference / clear.length).toBeLessThan(8);
}

for (const lesson of lessons) {
  test(`${lesson.slug}: real worked output and changed practice retain the supplied pictures`, async ({
    page,
  }, info) => {
    test.skip(!["desktop-light", "firefox"].includes(info.project.name));
    test.setTimeout(300000);
    await page.goto(`./#/learn/image-video/${lesson.slug}`);
    await expectPracticeReady(page);
    const worked = page.locator(
      `[data-cell="image-video/${lesson.slug}:worked:0"]`,
    );
    const practice = page.locator(
      `[data-cell="image-video/${lesson.slug}:practice"]`,
    );
    await expect(worked.locator("textarea")).toHaveValue(lesson.worked);
    await expect(practice.locator("textarea")).toHaveValue(lesson.starter);
    await run(worked);
    const output = await download(page, worked, lesson.output);
    probe(output, lesson.duration, lesson.rate, lesson.slug === "overlay");
    if (lesson.slug === "sequence" || lesson.slug === "animation")
      orderedPictures(output, lesson.duration, lesson.slug === "animation");
    if (lesson.slug === "overlay") visibleOverlay(output, 0);
    if (lesson.slug === "hold") {
      const frames = pixels(output, "fps=1");
      const size = 640 * 360 * 3;
      expect(frames.length).toBe(size * 5);
      for (let frame = 1; frame < 5; frame++) {
        let difference = 0;
        for (let pixel = 0; pixel < size; pixel++)
          difference += Math.abs(
            frames[pixel]! - frames[frame * size + pixel]!,
          );
        expect(difference / size).toBeLessThan(2);
      }
    }

    if (lesson.slug !== "overlay") {
      await run(practice);
      await practice
        .getByRole("button", { name: n.check, exact: true })
        .click();
      await expect(practice.locator(".notebook-check")).toContainText(
        "✗ Duration",
        { timeout: 120000 },
      );
    }
    await practice.locator("textarea").fill(lesson.solution);
    if (lesson.slug !== "overlay") {
      // The starter already created this output. Replacing it requires an
      // explicit, visible -y; failed overwrites must not leave passing checks.
      await practice.getByRole("button", { name: n.run, exact: true }).click();
      await expect(practice.locator("[role=status]").first()).toHaveText(
        n.failed,
      );
      await expect(practice.locator(".notebook-check")).not.toContainText(
        n.passed,
      );
      await practice
        .getByRole("button", { name: n.replace, exact: true })
        .click();
      await expect(practice.locator("[role=status]").first()).toHaveText(
        n.done,
        { timeout: 120000 },
      );
      await expect(practice.locator("textarea")).toHaveValue(
        lesson.solution.replace("ffmpeg ", "ffmpeg -y "),
      );
    } else await run(practice);
    await practice.getByRole("button", { name: n.check, exact: true }).click();
    await expect(practice.locator(".notebook-check")).toContainText(n.passed, {
      timeout: 120000,
    });
    const result = await download(page, practice, lesson.practiceOutput);
    probe(
      result,
      lesson.practiceDuration,
      lesson.rate,
      lesson.slug === "overlay",
    );
    if (lesson.slug === "sequence" || lesson.slug === "animation")
      orderedPictures(
        result,
        lesson.practiceDuration,
        lesson.slug === "animation",
      );
    if (lesson.slug === "overlay") visibleOverlay(result, 40);
    await page.reload();
    await expectPracticeReady(page);
    await expect(practice).toHaveAttribute("data-stale", "false");
    await expect(practice.locator(".notebook-cell-result video")).toBeVisible();
  });
}

test("image sources, touch argument editing and the formats reference need no processing download", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  for (const lesson of lessons) {
    await page.goto(`./#/learn/image-video/${lesson.slug}`);
    await expectPracticeReady(page);
    await page.getByRole("button", { name: n.files, exact: true }).click();
    const files = page.locator("dialog.notebook-files");
    for (const name of lesson.assets)
      await expect(
        files.getByRole("button", { name, exact: true }),
      ).toBeVisible();
    const image = lesson.assets.find((name) => /\.(png|jpg)$/.test(name))!;
    await files.getByRole("button", { name: image, exact: true }).click();
    await expect(
      files.getByRole("img", { name: image, exact: true }),
    ).toBeVisible();
    await expect
      .poll(() =>
        files
          .getByRole("img", { name: image, exact: true })
          .evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBe(lesson.slug === "overlay" ? 854 : 640);
    await files.getByRole("button", { name: n.close, exact: true }).click();
    const practice = page.locator(
      `[data-cell="image-video/${lesson.slug}:practice"]`,
    );
    await practice
      .getByRole("button", { name: n.builder, exact: true })
      .click();
    const builder = practice.locator(".native-builder");
    const editIndex =
      lesson.slug === "hold" ? 2 : lesson.slug === "overlay" ? 2 : 0;
    await builder
      .locator("input")
      .nth(editIndex)
      .fill(
        lesson.slug === "hold"
          ? "3"
          : lesson.slug === "overlay"
            ? "overlay=40:0"
            : lesson.slug === "sequence"
              ? "1"
              : "6",
      );
    await builder
      .getByRole("button", { name: courseUI.apply, exact: true })
      .click();
    await expect(practice.locator("textarea")).toHaveValue(lesson.solution);
    await page.evaluate(
      () => (document.documentElement.style.fontSize = "200%"),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(() => (document.documentElement.style.fontSize = ""));
  }
  await page.goto("./#/");
  await page.locator('.notebook-home a[href="#/appendix/formats"]').click();
  await expect(page).toHaveURL(/#\/appendix\/formats$/);
  await expect(page.locator("h1")).toBeVisible();
  for (const format of [
    "MP4",
    "MOV",
    ".mkv",
    "WebM",
    "AVI",
    "MP3",
    "AAC",
    "M4A",
    "WAV",
    "FLAC",
    "Ogg",
    "Opus",
    "JPEG",
    "PNG",
    "WebP",
    "SVG",
  ])
    await expect(page.locator("main")).toContainText(format);
  await expect(page.locator('main a[href="#/appendix/codecs"]')).toBeVisible();
  await expect(
    page.locator('main a[href="#/learn/image-video/hold"]'),
  ).toBeVisible();
  await page.goto("./#/glossary");
  await expect(page.locator('main a[href="#/appendix/formats"]')).toBeVisible();
  expect(requests.some((url) => url.includes("/encoder/"))).toBe(false);
});

test("saved image chapter and formats reference open with decoded previews offline", async ({
  page,
  context,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  test.setTimeout(240000);
  await page.goto("./#/appendix/formats");
  const panel = page.locator(".app-status");
  await panel.locator("summary").click();
  await panel
    .getByRole("button", { name: status.download, exact: true })
    .click();
  await expect(panel.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 60000 },
  );
  await context.setOffline(true);
  const offline = await context.newPage();
  try {
    await offline.goto(new URL("./#/appendix/formats", page.url()).href);
    await expect(offline.locator("h1")).toBeVisible();
    for (const lesson of lessons) {
      await offline.goto(
        new URL(`./#/learn/image-video/${lesson.slug}`, page.url()).href,
      );
      await expectPracticeReady(offline);
      await offline.getByRole("button", { name: n.files, exact: true }).click();
      const files = offline.locator("dialog.notebook-files");
      for (const name of lesson.assets) {
        await files.getByRole("button", { name, exact: true }).click();
        if (/\.(png|jpg)$/.test(name)) {
          const image = files.getByRole("img", { name, exact: true });
          await expect(image).toBeVisible();
          await expect
            .poll(() =>
              image.evaluate(
                (element: HTMLImageElement) => element.naturalWidth,
              ),
            )
            .toBeGreaterThan(0);
        }
      }
      await files.getByRole("button", { name: n.close, exact: true }).click();
    }
    await offline.goto(
      new URL("./#/learn/image-video/sequence", page.url()).href,
    );
    await expectPracticeReady(offline);
    const cell = offline.locator('[data-cell="image-video/sequence:worked:0"]');
    await run(cell);
    const output = await download(offline, cell, "slides.mp4");
    probe(output, 6, 24, false);
    orderedPictures(output, 6, false);
  } finally {
    await offline.close();
    await context.setOffline(false);
  }
});

test("pixel-format references land at the explanation and preserve edited commands on Back", async ({
  page,
}) => {
  const processing: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/encoder/")) processing.push(request.url());
  });
  for (const route of [
    "image-video/hold",
    "image-video/sequence",
    "image-video/animation",
    "export/format",
  ]) {
    await page.goto(`./#/learn/${route}`);
    await expectPracticeReady(page);
    const id = `${route}:worked:0`;
    const cell = page.locator(`[data-cell="${id}"]`);
    const command = (await cell.locator("textarea").inputValue()).replace(
      "ffmpeg ",
      "ffmpeg -hide_banner ",
    );
    await cell.locator("textarea").fill(command);
    await expectSavedCell(page, id, { command });
    const reference = cell.getByRole("link", {
      name: pixelFormats.linkLabel,
      exact: true,
    });
    await reference.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#\/appendix\/formats\/pixel-formats$/);
    const heading = page.getByRole("heading", {
      name: pixelFormats.title,
      exact: true,
    });
    await expect(heading).toBeFocused();
    await expect(heading).toBeInViewport();
    await page.goBack();
    await expect(cell.locator("textarea")).toHaveValue(command);
  }
  await page.goto("./#/appendix/formats/pixel-formats");
  await page.reload();
  const heading = page.getByRole("heading", {
    name: pixelFormats.title,
    exact: true,
  });
  await expect(heading).toBeFocused();
  await expect(heading).toBeInViewport();
  await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(processing).toEqual([]);
});
