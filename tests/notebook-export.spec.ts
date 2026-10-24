// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { mkdtempSync, copyFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { n } from "../src/notebook/ui.strings";

test("multiline browser commands copy and export as one runnable native shell command", async ({
  page,
  context,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("./#/learn/first-edit/shorten");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  const cell = page.locator('[data-cell="first-edit/shorten:worked:0"]');
  await cell
    .locator("textarea")
    .fill('ffmpeg -i bunny-short.mp4\n -t 1\n "my cut.mp4"');
  await cell.getByRole("button", { name: n.copy, exact: true }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  const downloading = page.waitForEvent("download");
  await cell
    .getByRole("button", { name: n.downloadCommand, exact: true })
    .click();
  const script = await (await downloading).path();
  expect(readFileSync(script!, "utf8")).toBe("#!/bin/sh\n" + copied + "\n");
  expect(copied.split("\n")).toHaveLength(1);
  const dir = mkdtempSync(join(tmpdir(), "video-lab-export-"));
  try {
    copyFileSync(
      resolve("public/media/notebook/bunny-short.mp4"),
      join(dir, "bunny-short.mp4"),
    );
    execFileSync("sh", [script!], { cwd: dir, stdio: "pipe" });
    const probe = JSON.parse(
      execFileSync(
        "ffprobe",
        ["-v", "error", "-show_format", "-of", "json", join(dir, "my cut.mp4")],
        { encoding: "utf8" },
      ),
    );
    expect(Number(probe.format.duration)).toBe(1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
