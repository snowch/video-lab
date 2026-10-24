// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { ui } from "../src/content/ui.strings";
import { home } from "../src/content/home.strings";
import { cli } from "../src/cli/strings";
import { referenceLessons, refStrings } from "../src/cli/reference.strings";
import { inspectionCommand } from "../src/cli/reference-model";
import { clickAction } from "./course-actions";
import { command, terminal, downloaded, visiblePlay } from "./cli-helpers";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
test("introduction, theme, reference deep links and navigation all lead to command workspaces", async ({
  page,
}) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    home.subtitle,
  );
  await expect(page.getByText(ui.planned, { exact: true })).toHaveCount(6);
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: ui.theme }).click();
  await page.reload();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", theme!);
  await page.getByRole("link", { name: home.start, exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Import file", exact: true }).first(),
  ).toBeVisible();
  await page.goto("./#/module-0/investigation");
  await expect(page).toHaveURL(/inspect\/reference\/investigation$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    referenceLessons.inspect.title,
  );
  await page.getByText("Lesson steps", { exact: true }).click();
  await page
    .getByRole("link", {
      name: referenceLessons.inspect.sections.find((s) => s.id === "challenge")!
        .title,
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/reference\/challenge$/);
  await page.goBack();
  await expect(page).toHaveURL(/reference\/investigation$/);
  expect(
    await page
      .locator(
        ".cli-lab select,.cli-lab input[type=range],.cli-lab input[type=number],.cli-lab input[type=radio]",
      )
      .count(),
  ).toBe(0);
});
test("reference inspection runs real frame extraction, stream removal and persisted report checking", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.goto("./#/module-0");
  await command(page, "reference inspect");
  await command(page, inspectionCommand);
  await command(page, "check inspect inspect-report.json");
  await expect(terminal(page)).toContainText(refStrings.checkPassed);
  const report = JSON.parse(
    readFileSync(await downloaded(page, "inspect-report.json"), "utf8"),
  );
  expect(
    report.frames.filter(
      (f: { media_type: string }) => f.media_type === "video",
    ),
  ).toHaveLength(120);
  await command(
    page,
    'ffmpeg -i reference-inspect.mp4 -vf "select=eq(n\\,75)" -frames:v 1 frame75.png',
  );
  const image = await downloaded(page, "frame75.png");
  const probe = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-of", "json", image],
      { encoding: "utf8" },
    ),
  );
  expect(probe.streams[0].width).toBe(960);
  await command(page, "play frame75.png");
  await expect(page.locator(".cli-preview img")).toBeVisible();
  await command(
    page,
    "ffmpeg -i reference-inspect.mp4 -map 0:v:0 -c copy pictures.mp4",
  );
  await command(page, "ffprobe -v error -show_streams -of json pictures.mp4");
  await expect(terminal(page)).toContainText("h264");
  await command(
    page,
    'note inspection.txt "Check sound content as well as stream presence."',
  );
  await page.reload();
  await command(page, "cat inspection.txt");
  await expect(terminal(page)).toContainText("Check sound content");
  await command(page, "progress");
  await expect(terminal(page)).toContainText(refStrings.checked);
});
test("incomplete or imported report fails; progressive command hints and corrected real evidence work", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.goto("./#/inspect/reference/challenge");
  await command(page, "reference inspect");
  await command(
    page,
    "ffprobe -v error -show_format -of json reference-inspect.mp4 -o incomplete.json",
  );
  await command(page, "check inspect incomplete.json");
  await expect(terminal(page)).toContainText(refStrings.checkFailed);
  for (let level = 1; level <= 5; level++) {
    await command(page, `hint inspect ${level}`);
    await expect(terminal(page)).toContainText(
      refStrings.hints.inspect[level - 1]!,
    );
  }
  await command(page, "solution inspect");
  await expect(terminal(page)).toContainText(inspectionCommand);
  await command(page, inspectionCommand);
  await command(page, "check inspect inspect-report.json");
  await expect(terminal(page)).toContainText(refStrings.checkPassed);
  const report = readFileSync(await downloaded(page, "inspect-report.json"));
  const chooser = page.waitForEvent("filechooser");
  await clickAction(page, "Import file");
  await (
    await chooser
  ).setFiles({
    name: "imported-report.json",
    mimeType: "application/json",
    buffer: report,
  });
  await expect(page.locator(".command-workspace [role=status]")).toHaveText(
    cli.done,
  );
  await expect(page.locator(".selected-source code")).not.toHaveText(
    "imported-report.json",
  );
  await command(page, "check inspect imported-report.json", cli.failed);
  await expect(terminal(page)).toContainText(refStrings.missingEvidence);
  await command(page, "rm inspect-report.json");
  await page.reload();
  await command(page, "progress");
  await expect(terminal(page)).toContainText(refStrings.changed);
});
test("every reachable production and reference lab is CLI on desktop and phone", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of [
    "capture",
    "build",
    "inspect",
    "edit",
    "publish",
    "inspect/reference",
    "edit/reference",
    "module-0",
    "module-2",
  ]) {
    await page.goto(`./#/${route}`);
    const input = page.getByRole("textbox", { name: cli.input, exact: true });
    if (route === "capture" || route === "publish") {
      await expect(input).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Files", exact: true }),
      ).toBeVisible();
      continue;
    }
    if (!(await input.isVisible())) {
      const hiddenInput = page.getByRole("textbox", {
        name: cli.input,
        exact: true,
        includeHidden: true,
      });
      for (const detail of await page
        .locator("details")
        .filter({ has: hiddenInput })
        .all()) {
        if ((await detail.getAttribute("open")) === null)
          await detail.locator(":scope > summary").click();
      }
    }
    await expect(input).toBeVisible();
    expect(
      await page
        .locator(
          ".command-workspace select,.command-workspace input[type=range],.command-workspace input[type=number],.command-workspace input[type=radio],.command-workspace input[type=checkbox],.challenge-editor",
        )
        .count(),
    ).toBe(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.screenshot({
    path: info.outputPath("all-labs-cli.png"),
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
test("offline reading and provided playback do not silently load the processing core", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("./#/module-0");
  await command(page, "reference inspect");
  await command(page, "play reference-inspect.mp4");
  await visiblePlay(page);
  expect(requests.some((u) => u.includes("/encoder/"))).toBe(false);
  await command(
    page,
    "ffmpeg -i absent.mp4 -c:v libx264 failed.mp4",
    cli.failed,
  );
  await expect(terminal(page)).toContainText("absent.mp4");
});

test("reflection opens a personal draft without saving an answer and downloads the actual custom note", async ({
  page,
}) => {
  for (const lab of ["inspect", "edit"]) {
    await page.goto(`./#/${lab}/reference/reflection`);
    await page
      .getByRole("button", { name: "Write a note", exact: true })
      .click();
    await expect(page.getByLabel("Note text", { exact: true })).toBeFocused();
    await expect(page.getByLabel("Note text", { exact: true })).toHaveValue("");
    await expect(page.locator(".workspace-files")).not.toContainText(
      "inspection-notes.txt",
    );
    const name = `my-${lab}.txt`,
      text = `My own ${lab} observation.`;
    await page.getByLabel("Note filename", { exact: true }).fill(name);
    await page.getByLabel("Note text", { exact: true }).fill(text);
    await page
      .getByRole("button", { name: "Write a note", exact: true })
      .click();
    await expect(page.getByLabel("Note filename", { exact: true })).toHaveValue(
      name,
    );
    await expect(page.getByLabel("Note text", { exact: true })).toHaveValue(
      text,
    );
    await expect(page.locator(".workspace-files")).not.toContainText(name);
    await page.getByRole("button", { name: "Save note", exact: true }).click();
    await expect(page.locator(".command-workspace [role=status]")).toHaveText(
      cli.done,
    );
    expect(readFileSync(await downloaded(page, name), "utf8")).toBe(text);
    await page.setViewportSize({ width: 390, height: 900 });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.reload();
    await command(page, `cat ${name}`);
    await expect(terminal(page)).toContainText(text);
  }
});
