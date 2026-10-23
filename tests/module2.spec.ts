// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { cli } from "../src/cli/strings";
import { refStrings } from "../src/cli/reference.strings";
import { joinedCommand } from "../src/cli/reference-model";
import { command, terminal, downloaded, visiblePlay } from "./cli-helpers";
const native = (path: string) =>
  JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_streams", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
test("actual stream copy versus accurate trim uses commands and measured output", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.goto("./#/module-2");
  await command(page, "reference cuts");
  await command(
    page,
    "ffprobe -v error -select_streams v:0 -show_frames -show_entries frame=key_frame,pts_time -of json reference-cuts.mp4",
  );
  await expect(terminal(page)).toContainText("key_frame");
  await command(
    page,
    "ffmpeg -ss 3 -i reference-cuts.mp4 -t 2 -map 0:v:0 -map 0:a:0 -c copy -avoid_negative_ts make_zero copy-3.mp4",
  );
  const copy = native(await downloaded(page, "copy-3.mp4"));
  expect(Number(copy.format.duration)).toBeGreaterThan(2.8);
  await command(
    page,
    'ffmpeg -i reference-cuts.mp4 -filter_complex "[0:v:0]trim=start=3:end=5,setpts=PTS-STARTPTS[v];[0:a:0]atrim=start=3:end=5,asetpts=PTS-STARTPTS[a]" -map "[v]" -map "[a]" -c:v libx264 -preset ultrafast -pix_fmt yuv420p -c:a aac exact.mp4',
  );
  expect(
    Number(native(await downloaded(page, "exact.mp4")).format.duration),
  ).toBeCloseTo(2, 1);
});
test("audio/video joined output passes real decoded-picture check; reversed order fails", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.goto("./#/edit/reference/challenge");
  await command(page, "reference cuts");
  await command(page, joinedCommand);
  await command(page, "check edit joined-check.mp4");
  await expect(terminal(page)).toContainText(refStrings.checkPassed);
  await expect(
    page.getByLabel("Workspace feedback", { exact: true }),
  ).not.toContainText("Aborted()");
  const p = native(await downloaded(page, "joined-check.mp4"));
  expect(Number(p.format.duration)).toBeCloseTo(4, 1);
  expect(p.streams.map((s: { codec_type: string }) => s.codec_type)).toEqual([
    "video",
    "audio",
  ]);
  const reversed = joinedCommand
    .replace("[v0][a0][v1][a1]concat", "[v1][a1][v0][a0]concat")
    .replace("joined-check.mp4", "reversed.mp4");
  await command(page, reversed);
  await command(page, "check edit reversed.mp4");
  await expect(terminal(page)).toContainText(refStrings.checkFailed);
  const recipe = JSON.parse(
    readFileSync(
      await downloaded(page, "joined-check.mp4.recipe.json"),
      "utf8",
    ),
  );
  expect(recipe.command).toBe(joinedCommand);
  await page.reload();
  await command(page, "progress");
  await expect(terminal(page)).toContainText(refStrings.checked);
});
test("unreset clocks produce a real longer file; reset and retry fixes the result", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.goto("./#/module-2/failureExperiment");
  await command(page, "reference cuts");
  const broken = joinedCommand
    .replaceAll(",setpts=PTS-STARTPTS", "")
    .replaceAll(",asetpts=PTS-STARTPTS", "")
    .replace("joined-check.mp4", "unreset.mp4");
  await command(page, broken);
  const p = native(await downloaded(page, "unreset.mp4"));
  expect(Number(p.format.duration)).toBeCloseTo(8, 1);
  await command(page, "check edit unreset.mp4");
  await expect(terminal(page)).toContainText(refStrings.checkFailed);
  await command(page, joinedCommand);
  await command(page, "check edit joined-check.mp4");
  await expect(terminal(page)).toContainText(refStrings.checkPassed);
});
test("hints, legacy achievements, notes and chapter bookmarks remain accessible through commands", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "video-lab:v1:cutting-and-joining",
      JSON.stringify({
        version: 1,
        challenges: {
          "edit-plan": {
            artifact: {
              answers: {
                method: "encode",
                order: "AB",
                reset: "yes",
                end: "6",
                duration: "4",
                join: "2",
              },
            },
          },
        },
        slots: { reflection: "Archived reflection survives." },
      }),
    ),
  );
  await page.goto("./#/module-2/reflection");
  await expect(page).toHaveURL(/edit\/reference\/reflection$/);
  await command(page, "progress");
  await expect(terminal(page)).toContainText(refStrings.legacySaved);
  await expect(terminal(page)).toContainText("Archived reflection survives.");
  for (let level = 1; level <= 5; level++) {
    await command(page, `hint edit ${level}`);
    await expect(terminal(page)).toContainText(
      refStrings.hints.edit[level - 1]!,
    );
  }
  await command(
    page,
    'note edit.txt "Keep both clocks reset before concatenation."',
  );
  await page.reload();
  await command(page, "cat edit.txt");
  await expect(terminal(page)).toContainText("both clocks reset");
});
test("provided playback remains clearly supplied; imported media cannot fake executed challenge work", async ({
  page,
}) => {
  await page.goto("./#/module-2");
  await command(page, "reference edit");
  await command(page, "play reference-edit.mp4");
  await visiblePlay(page);
  await command(page, "check edit reference-edit.mp4", cli.failed);
  await expect(terminal(page)).toContainText(refStrings.missingEvidence);
  expect(await page.getByRole("combobox").count()).toBe(0);
  expect(await page.getByRole("slider").count()).toBe(0);
});
