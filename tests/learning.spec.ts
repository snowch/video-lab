// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import {
  chapterTitles,
  additionalTasks,
  teachingUI,
  courseUI,
} from "../src/course/strings";
import { chapterOrder } from "../src/course/structure";
import { cli } from "../src/cli/strings";
import { command, downloaded } from "./cli-helpers";
import { navigateChapter } from "./course-actions";

test("one chapter sequence matches overview, navigation and headings with separate references", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("./");
  await expect(page.locator(".module-list>li")).toHaveCount(5);
  const headings = await page.locator(".module-list h3").allTextContents();
  expect(headings).toEqual(chapterOrder.map((step) => chapterTitles[step]));
  await expect(page.locator(".course-references a")).toHaveCount(2);
  await expect(page.locator(".planned-topics .module-list")).toHaveCount(0);
  await page
    .getByRole("link", { name: "Start chapter 1", exact: true })
    .click();
  for (const step of chapterOrder) {
    if (step !== "capture") await navigateChapter(page, step);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      chapterTitles[step],
    );
    await expect(page.locator(".chapter-count")).toHaveText(
      `Chapter ${chapterOrder.indexOf(step) + 1} of 5`,
    );
    await expect(
      page.getByRole("combobox", {
        name: courseUI.chapterNav,
        includeHidden: true,
      }),
    ).toHaveValue(step);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "";
    });
  }
  expect(requests.some((url) => url.includes("/encoder/"))).toBe(false);
  await page.goto("./#/module-2/challenge");
  await expect(page).toHaveURL(/edit\/reference\/challenge$/);
  await expect(page.locator(".chapter-count")).toHaveText(courseUI.references);
});

test("timing models and actual supplied comparisons teach cause and effect without processing", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("./#/edit/lesson/start");
  const start = page.getByRole("slider", {
    name: teachingUI.start,
    exact: true,
  });
  await start.focus();
  await start.press("ArrowRight");
  const duration = page.getByRole("slider", {
    name: teachingUI.duration,
    exact: true,
  });
  await duration.focus();
  await duration.press("Home");
  for (let i = 0; i < 3; i++) await duration.press("ArrowRight");
  await expect(page.locator(".teaching-figure output")).toHaveText(
    "3 + 4 = 7 seconds",
  );
  await page.goto("./#/build/lesson/rate");
  await page
    .getByRole("combobox", { name: teachingUI.rate, exact: true })
    .selectOption("2");
  await expect(page.locator(".teaching-figure output")).toHaveCount(0);
  await page
    .getByRole("button", { name: teachingUI.showCalculation, exact: true })
    .click();
  await expect(page.locator(".teaching-figure output")).toHaveText(
    "3 ÷ 2 = 1.5 seconds",
  );
  await page.goto("./#/edit/lesson/compare-story");
  const video = page.locator(".teaching-figure video");
  await expect(video).toHaveAttribute("src", /context.mp4$/);
  await page
    .getByRole("button", { name: teachingUI.compareLabels.early, exact: true })
    .click();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.duration))
    .toBe(4);
  await video.evaluate((v: HTMLVideoElement) => v.play());
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0.1);
  await page
    .getByRole("button", { name: teachingUI.compareLabels.late, exact: true })
    .click();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.duration))
    .toBe(3);
  expect(requests.some((url) => url.includes("/encoder/"))).toBe(false);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("independent practice keeps learner commands, creates real media and downloads persistent self-review", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.goto("./#/capture");
  await page
    .getByRole("button", { name: "Use practice video", exact: true })
    .click();
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "mousepad-demo.mp4",
  );
  await page.goto("./#/edit/lesson/edit-practice");
  await expect(page.locator("#current-task")).toHaveText(
    additionalTasks.edit.at(-1)!.title,
  );
  const entry = page.getByRole("textbox", { name: cli.input, exact: true });
  expect(await entry.inputValue()).not.toContain("independent.mp4");
  await page.getByText(teachingUI.hints, { exact: true }).click();
  for (let i = 1; i <= 5; i++)
    await page
      .getByRole("button", { name: `${teachingUI.nextHint} ${i}`, exact: true })
      .click();
  await expect(
    page.locator(".practice-guide details").first().locator("li"),
  ).toHaveCount(5);
  await command(page, "ffmpeg -i mousepad-demo.mp4 -ss 1 -t 7 learner.mp4");
  const file = await downloaded(page, "learner.mp4");
  const report = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", file],
      { encoding: "utf8" },
    ),
  );
  expect(Number(report.format.duration)).toBe(7);
  expect(Number(report.streams[0].nb_frames)).toBe(105);
  const review =
    "Kept source 1–8 seconds: predicted seven seconds. Replayed the opening and result; outside-player review remains pending.";
  await page.locator("#chapter-review").fill(review);
  await page.reload();
  await expect(page.locator("#chapter-review")).toHaveValue(review);
  await expect(entry).toHaveValue(
    "ffmpeg -i mousepad-demo.mp4 -ss 1 -t 7 learner.mp4",
  );
  const pending = page.waitForEvent("download");
  await page
    .getByRole("button", { name: teachingUI.reviewDownload, exact: true })
    .click();
  expect(readFileSync((await (await pending).path())!, "utf8")).toContain(
    review,
  );
  await command(page, "fixtures");
  await page.goto("./#/build/lesson/build-practice");
  await command(
    page,
    "ffmpeg -framerate 2 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p independent-build.mp4",
  );
  const built = JSON.parse(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_streams",
        "-show_format",
        "-of",
        "json",
        await downloaded(page, "independent-build.mp4"),
      ],
      { encoding: "utf8" },
    ),
  );
  expect(Number(built.format.duration)).toBe(1.5);
  expect(Number(built.streams[0].nb_frames)).toBe(3);
  await page.goto("./#/publish/lesson/publish-practice");
  await page
    .locator(".publish-choices")
    .getByRole("button", { name: "Replay learner.mp4", exact: true })
    .click();
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "learner.mp4",
  );
  await expect(page.locator(".practice-review")).toContainText(
    teachingUI.selfReview,
  );
  await page.goBack();
  await expect(page).toHaveURL(/build\/lesson\/build-practice$/);
});

test("every lesson reflows at doubled text size and sequential practice leaves one diagram", async ({
  page,
}) => {
  const { lessonTasks } = await import("../src/cli/tasks");
  await page.goto("./#/capture");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  for (const chapter of chapterOrder)
    for (const task of lessonTasks(chapter)) {
      await page.evaluate((hash) => {
        location.hash = hash;
      }, `#/${chapter}/lesson/${task.id}`);
      await expect(page.locator("#current-task")).toHaveText(task.title);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${chapter}/${task.id}`,
      ).toBe(true);
      const expectedFigures =
        task.visual ||
        [
          "inspect:streams",
          "edit:start",
          "edit:compare",
          "build:rate",
        ].includes(`${chapter}:${task.id}`)
          ? 1
          : 0;
      await expect(page.locator(".teaching-figure")).toHaveCount(
        expectedFigures,
      );
    }
  await page.evaluate(() => {
    location.hash = "#/build/lesson/rate";
  });
  await expect(page.locator("#current-task")).toHaveText(
    "Give pictures a display rate",
  );
  await expect(page.locator(".teaching-figure")).toHaveCount(1);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "";
    location.hash = "#/edit/lesson/compare-story";
  });
  await expect(page.locator("#current-task")).toHaveText(
    additionalTasks.edit[0]!.title,
  );
  await expect(page.locator(".task-panel .teaching-figure")).toHaveCount(0);
  await expect(
    page.locator(".command-workspace .teaching-figure video"),
  ).toBeVisible();
  if ((page.viewportSize()?.width ?? 0) >= 900) {
    const video = await page
        .locator(".command-workspace .teaching-figure video")
        .boundingBox(),
      instructions = await page.locator(".task-panel").boundingBox();
    expect(video!.width).toBeGreaterThan(instructions!.width);
  }
});

test("the complete command sequence finishes within storage limits after the taught safe handoff", async ({
  page,
}) => {
  test.setTimeout(180000);
  const { productionTasks } = await import("../src/cli/progressive.strings");
  await page.goto("./#/capture");
  await command(page, "sample");
  for (const task of productionTasks.inspect) {
    await page.goto(`./#/inspect/lesson/${task.id}`);
    for (const example of task.examples) await command(page, example.command);
  }
  for (const task of productionTasks.edit) {
    await page.goto(`./#/edit/lesson/${task.id}`);
    for (const example of task.examples) await command(page, example.command);
  }
  for (const [name, duration, frames] of [
    ["range.mp4", 3, 45],
    ["joined.mp4", 5, 75],
  ] as const) {
    const report = JSON.parse(
      execFileSync(
        "ffprobe",
        [
          "-v",
          "error",
          "-show_streams",
          "-show_format",
          "-of",
          "json",
          await downloaded(page, name),
        ],
        { encoding: "utf8" },
      ),
    );
    expect(Number(report.format.duration)).toBe(duration);
    expect(Number(report.streams[0].start_time)).toBe(0);
    expect(Number(report.streams[0].nb_frames)).toBe(frames);
    expect(report.streams[0].codec_name).toBe("h264");
  }
  await page.goto("./#/edit/lesson/edit-practice");
  await command(page, "ffmpeg -i mousepad-demo.mp4 -ss 1 -t 7 independent.mp4");
  const selected = await downloaded(page, "independent.mp4");
  const recipe = JSON.parse(
    readFileSync(await downloaded(page, "independent.mp4.recipe.json"), "utf8"),
  );
  expect(JSON.stringify(recipe)).toContain("mousepad-demo.mp4");
  const retained = readFileSync(selected);
  await downloaded(page, "mousepad-demo.mp4");
  await page.goto("./#/build/lesson/pictures");
  await expect(page.locator(".task-panel")).toContainText(
    "use Files to delete unneeded experiments",
  );
  for (const name of [
    "first-cut.mp4",
    "cut.mp4",
    "shorter.mp4",
    "range.mp4",
    "joined.mp4",
  ]) {
    await command(page, `rm ${name}`);
    await command(page, `rm ${name}.recipe.json`);
  }
  for (const task of productionTasks.build) {
    await page.goto(`./#/build/lesson/${task.id}`);
    for (const example of task.examples) await command(page, example.command);
  }
  await page.goto("./#/build/lesson/build-practice");
  await command(
    page,
    "ffmpeg -framerate 2 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p independent-build.mp4",
  );
  expect(readFileSync(await downloaded(page, "independent.mp4"))).toEqual(
    retained,
  );
  const report = JSON.parse(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_streams",
        "-show_format",
        "-of",
        "json",
        await downloaded(page, "demo.mp4"),
      ],
      { encoding: "utf8" },
    ),
  );
  expect(
    report.streams.map((stream: { codec_type: string }) => stream.codec_type),
  ).toEqual(["video", "audio"]);
  expect(Number(report.format.duration)).toBeCloseTo(3, 1);
  await page.goto("./#/publish/lesson/publish-practice");
  await page
    .locator(".publish-choices")
    .getByRole("button", { name: "Replay independent.mp4", exact: true })
    .click();
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "independent.mp4",
  );
});
