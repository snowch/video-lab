// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { offline } from "../src/offline/strings";

test("source ends at continuation while file management and help preserve the lesson", async ({
  page,
}) => {
  await page.goto("./#/capture");
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-workspace-ready",
    "true",
  );
  await expect(
    page.locator(
      ".workspace-management,.workspace-actions,.cli-lab .encoder-offline,.cli-lab .native-tools",
    ),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Files", exact: true }).click();
  const files = page.getByRole("dialog", { name: "Files", exact: true });
  await expect(files).toContainText("No files are saved yet");
  await expect(files.locator("details")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Files", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Use practice video", exact: true })
    .click();
  await expect(page.locator(".cli-preview video")).toBeVisible();
  await page.getByRole("button", { name: "Files", exact: true }).click();
  await expect(files).toContainText("mousepad-demo.mp4");
  await files
    .getByRole("button", { name: "Replay mousepad-demo.mp4", exact: true })
    .click();
  await expect(files).not.toBeVisible();
  await page.getByRole("button", { name: "Next step", exact: true }).click();
  await page.getByRole("button", { name: "Next step", exact: true }).click();
  await page.getByRole("link", { name: /^Continue to Inspect/ }).click();
  const input = page.getByRole("textbox", { name: "Command", exact: true });
  await input.fill("ffprobe -v error mousepad-demo.mp4");
  await page.getByRole("button", { name: "Help", exact: true }).click();
  const help = page.getByRole("dialog", { name: "Help", exact: true });
  await expect(help).toContainText("Browser diagnostics");
  await expect(help.locator("details")).toHaveCount(0);
  await expect(page.locator(".command-workspace")).not.toContainText(
    "Browser diagnostics",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Help", exact: true }),
  ).toBeFocused();
  await expect(input).toHaveValue("ffprobe -v error mousepad-demo.mp4");
  await page.getByRole("button", { name: "Files", exact: true }).click();
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(await files.evaluate((d) => d.scrollWidth <= d.clientWidth)).toBe(
    true,
  );
  await files.getByRole("button", { name: "Close", exact: true }).click();
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "";
  });
  await page.locator(".app-status > details > summary").click();
  await expect(page.locator(".offline-panel .encoder-offline")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: offline.download, exact: true }),
  ).toBeVisible();
  await expect(page.locator(".offline-panel")).toContainText(
    "FFmpeg/ffprobe tools",
  );
});
