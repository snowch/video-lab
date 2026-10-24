// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { cli } from "../src/cli/strings";
import { guided } from "../src/cli/guided.strings";
import { progressiveUI as flow } from "../src/cli/progressive.strings";
import { chapterTitles, courseUI } from "../src/course/strings";
import { clickAction, navigateChapter } from "./course-actions";

test("prototype interaction leads from source to a minimal cut and one-value comparison", async ({
  page,
}, info) => {
  test.setTimeout(180000);
  const status = page.locator(".command-workspace [role=status]");
  const entry = page.getByRole("textbox", { name: cli.input, exact: true });
  await page.goto("./#/capture");
  await page
    .getByRole("button", { name: "Use practice video", exact: true })
    .first()
    .click();
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "mousepad-demo.mp4",
  );
  await expect(page.locator(".selected-source code")).toHaveText(
    "mousepad-demo.mp4",
  );
  await expect(
    page.getByRole("button", { name: guided.next, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await page.screenshot({
    path: info.outputPath("source-ready.png"),
    fullPage: true,
  });
  await page.getByRole("link", { name: /Continue to Inspect/ }).click();
  await expect(entry).toHaveValue("ffprobe mousepad-demo.mp4");
  await entry.press("Enter");
  await expect(status).toHaveText(cli.done, { timeout: 120000 });
  await expect(page.getByLabel(cli.output, { exact: true })).toContainText(
    "Duration: 00:00:12.00",
  );
  await expect(page.getByLabel(cli.output, { exact: true })).not.toContainText(
    cli.probeSuccess,
  );
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await expect(page.locator("#current-task")).toHaveText(
    "Find pictures and sound",
  );
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await page.getByRole("link", { name: /Continue to Trim and join/ }).click();
  await expect(entry).toHaveValue(
    "ffmpeg -i mousepad-demo.mp4 -t 6 first-cut.mp4",
  );
  await expect(page.locator(".native-builder input")).toHaveCount(3);
  await expect(page.locator(".task-panel")).not.toContainText("-map");
  await expect(page.locator(".task-panel")).not.toContainText("pixel format");
  async function runAndMeasure(name: string, duration: number, frames: number) {
    const producing = await entry.inputValue();
    await page.getByRole("button", { name: cli.run, exact: true }).click();
    await expect(status).toHaveText(cli.done, { timeout: 120000 });
    await expect(page.locator(".cli-preview video")).toHaveAttribute(
      "aria-label",
      name,
    );
    await page.locator(".output-command>summary").click();
    await expect(page.locator(".output-command pre")).toHaveText(producing);
    const pending = page.waitForEvent("download");
    await clickAction(page, "Download " + name);
    const path = await (await pending).path();
    const probe = JSON.parse(
      execFileSync(
        "ffprobe",
        ["-v", "error", "-show_streams", "-show_format", "-of", "json", path!],
        { encoding: "utf8" },
      ),
    );
    expect(+probe.format.duration).toBe(duration);
    expect(probe.streams).toHaveLength(1);
    expect(probe.streams[0]).toMatchObject({
      codec_name: "h264",
      pix_fmt: "yuv420p",
      width: 1280,
      height: 720,
      nb_frames: String(frames),
    });
    await page
      .locator(".cli-preview video")
      .evaluate(async (v: HTMLVideoElement) => {
        await v.play();
        v.pause();
      });
  }
  await runAndMeasure("first-cut.mp4", 6, 90);
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await expect(entry).toHaveValue(
    "ffmpeg -i mousepad-demo.mp4 -ss 2 -t 6 cut.mp4",
  );
  await runAndMeasure("cut.mp4", 6, 90);
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await expect(entry).toHaveValue(
    "ffmpeg -i mousepad-demo.mp4 -ss 2 -t 4 shorter.mp4",
  );
  await runAndMeasure("shorter.mp4", 4, 60);
  await page.screenshot({
    path: info.outputPath("comparison-result.png"),
    fullPage: true,
  });
  await entry.fill("ffprobe missing.mp4");
  await entry.press("Enter");
  await expect(status).toHaveText(cli.failed, { timeout: 120000 });
  await expect(page.locator(".output-command pre")).toHaveText(
    "ffmpeg -i mousepad-demo.mp4 -ss 2 -t 4 shorter.mp4",
  );
  await expect(page.getByLabel(cli.output, { exact: true })).toContainText(
    "$ ffprobe missing.mp4",
  );
  await page.screenshot({
    path: info.outputPath("error-with-retained-file.png"),
    fullPage: true,
  });
  const pending = page.waitForEvent("download");
  await clickAction(page, "Download mousepad-demo.mp4");
  expect(
    createHash("sha256")
      .update(readFileSync((await (await pending).path())!))
      .digest("hex"),
  ).toBe("d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page
      .locator(".result-heading")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "";
  });
  await page.reload();
  await expect(entry).toHaveValue("ffprobe missing.mp4");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("short steps and adjacent goal/action preserve prototype hierarchy and manual drafts", async ({
  page,
}, info) => {
  await page.goto("./#/edit");
  const entry = page.getByRole("textbox", { name: cli.input, exact: true });
  await expect(entry).toHaveValue(
    "ffmpeg -i mousepad-demo.mp4 -t 6 first-cut.mp4",
  );
  const task = await page.locator(".task-panel").boundingBox(),
    card = await page.locator(".command-workspace").boundingBox();
  if ((page.viewportSize()?.width ?? 0) >= 900) {
    expect(card!.x).toBeGreaterThan(task!.x + task!.width);
    expect(Math.abs(card!.y - task!.y)).toBeLessThan(3);
  } else expect(card!.y).toBeGreaterThan(task!.y + task!.height);
  await page.getByText(guided.navigation, { exact: true }).click();
  const labels = await page
    .getByRole("navigation", { name: guided.navigation, exact: true })
    .getByRole("button")
    .allTextContents();
  expect(labels.length).toBeGreaterThan(3);
  expect(labels.every((label) => label.length < 65)).toBe(true);
  await page.getByText(guided.navigation, { exact: true }).click();
  await entry.fill("ffmpeg -i my-source.webm -t 3 personal.mp4");
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await expect(entry).toHaveValue("ffmpeg -i my-source.webm -t 3 personal.mp4");
  await page
    .getByRole("button", { name: "Use this command", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Replace draft", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Replace draft", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Restore previous draft", exact: true })
    .click();
  await expect(entry).toHaveValue("ffmpeg -i my-source.webm -t 3 personal.mp4");
  await page.screenshot({
    path: info.outputPath("command-ready.png"),
    fullPage: true,
  });
  await navigateChapter(page, "publish");
  await expect(
    page.getByText(flow.publishEmpty, { exact: true }),
  ).toBeVisible();
});

test("fresh links expose required inputs and reference choices before loading commands", async ({
  page,
}) => {
  await page.goto("./#/inspect");
  await expect(
    page
      .locator(".source-recovery")
      .getByRole("button", { name: "Use practice video", exact: true }),
  ).toBeVisible();
  await page
    .locator(".source-recovery")
    .getByRole("button", { name: "Use practice video", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Use this command", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Apply to command", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".processing-download")).toContainText("32.4 MB");
  await page.goto("./#/edit/reference/investigation");
  await expect(page.locator(".selected-source code")).toHaveText(
    "reference-cuts.mp4",
  );
  await expect(
    page
      .locator(".source-recovery")
      .getByRole("button", { name: "Load cutting source", exact: true }),
  ).toBeVisible();
  await page
    .locator(".source-recovery")
    .getByRole("button", { name: "Load cutting source", exact: true })
    .click();
  await expect(page.locator(".source-recovery")).toHaveCount(0);
  const choices = page.locator(".task-panel .command-lessons li");
  await expect(choices).toHaveCount(3);
  for (let i = 0; i < 3; i++) {
    await expect(choices.nth(i).locator("pre code")).toContainText(
      /ffmpeg|ffprobe/,
    );
    await expect(
      choices
        .nth(i)
        .getByRole("button", { name: `Use command ${i + 1}`, exact: true }),
    ).toBeVisible();
  }
  await page
    .getByRole("button", { name: "Use command 2", exact: true })
    .click();
  if (
    await page
      .getByRole("button", { name: "Replace draft", exact: true })
      .isVisible()
  )
    await page
      .getByRole("button", { name: "Replace draft", exact: true })
      .click();
  await expect(
    page.getByRole("textbox", { name: cli.input, exact: true }),
  ).toHaveValue(/accurate-3.mp4$/);
  await navigateChapter(page, "build");
  await page.getByRole("button", { name: guided.next, exact: true }).click();
  await expect(page.locator(".selected-source")).toContainText(
    "Experiment inputs",
  );
  await expect(page.locator(".selected-source code")).toHaveText(
    "frame%03d.jpg",
  );
  await page.getByText(guided.navigation, { exact: true }).click();
  await page
    .getByRole("navigation", { name: guided.navigation, exact: true })
    .getByRole("button", {
      name: "Copy pictures and encode sound",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Use this command", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Replace draft", exact: true })
    .click();
  await expect(
    page
      .locator(".native-builder")
      .getByLabel(flow.outputFile, { exact: true }),
  ).toHaveValue("demo.mp4");
  await expect(
    page.locator(".native-builder").getByLabel("-shortest", { exact: true }),
  ).toHaveCount(0);
  await navigateChapter(page, "capture");
  await expect(page.locator(".selected-source code")).toHaveText(
    "mousepad-demo.mp4",
  );
});

test("course navigation and cards reflow at doubled text size without document overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const route of [
    "",
    "capture",
    "inspect",
    "edit",
    "build",
    "publish",
    "inspect/reference/reflection",
    "edit/reference/reflection",
  ]) {
    await page.goto(`./#/${route}`);
    if (route) {
      await expect(page.locator(".cli-lab")).toHaveAttribute(
        "data-step",
        route.split("/")[0]!,
      );
      await expect(page.locator(".cli-lab")).toHaveAttribute(
        "data-reference",
        route.includes("/reference") ? route.split("/")[0]! : "",
      );
      if (route.endsWith("/reflection"))
        await expect(page.locator("#section-reflection")).toBeVisible();
    } else await expect(page.locator(".cli-lab")).toHaveCount(0);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route || "home",
    ).toBe(true);
    if (route) {
      const nav = page.locator(".journey-nav");
      const picker = nav.getByRole("combobox", {
        name: courseUI.chapterNav,
        exact: true,
      });
      await expect(picker).toBeVisible();
      await expect(picker.locator("option:not([disabled])")).toHaveCount(5);
      expect(
        await picker.locator("option:not([disabled])").allTextContents(),
      ).toEqual(
        Object.values(chapterTitles).map(
          (title, index) => `${index + 1} · ${title}`,
        ),
      );
    }
  }
});
