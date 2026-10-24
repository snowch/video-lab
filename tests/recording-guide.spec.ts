// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { recordingGuide as text } from "../src/capture/guide.strings";
import { captureCommands } from "../src/capture/native";

test("optional recording guide preserves the source and draft without browser screen capture", async ({
  page,
}) => {
  const errors: string[] = [],
    requests: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => requests.push(r.url()));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          localStorage.setItem("test:copied-command", value);
        },
      },
    });
  });
  await page.goto("./#/capture");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    text.sourceTitle,
  );
  await expect(page).toHaveTitle(`${text.sourceTitle} · Video Lab`);
  await page
    .getByRole("button", { name: "Use practice video", exact: true })
    .click();
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "mousepad-demo.mp4",
  );
  await page.getByRole("link", { name: "Inspect", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Command", exact: true })
    .fill("ffprobe -v error mousepad-demo.mp4");
  await page.getByRole("link", { name: "Get video", exact: true }).click();
  await page.getByRole("link", { name: text.link, exact: true }).click();
  await expect(page).toHaveURL(/#\/appendix\/recording$/);
  await expect(page).toHaveTitle(`${text.title} · Video Lab`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(text.title);
  await expect(page.locator(".journey-nav,.cli-lab")).toHaveCount(0);
  await expect(page.locator(".recording-command")).toHaveCount(0);
  await expect(
    page.getByRole("option", { name: "In this browser", exact: true }),
  ).toHaveCount(0);
  const method = page.getByLabel(text.methodLabel, { exact: true });
  for (const value of ["windows", "macos", "linux", "mobile"]) {
    await method.selectOption(value);
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
  await method.selectOption("macos");
  await expect(page.getByText(text.macos.listNote)).toBeVisible();
  await expect(page.getByText(text.macos.replace)).toBeVisible();
  await page
    .getByRole("button", { name: text.copyTemplate, exact: true })
    .click();
  expect(
    await page.evaluate(() => localStorage.getItem("test:copied-command")),
  ).toBe(captureCommands.macos);
  await method.selectOption("linux");
  await expect(page.getByText(text.linux.sessionResult)).toBeVisible();
  const instructions = await page
    .locator("#recording-instructions")
    .innerText();
  expect(instructions.indexOf(text.linux.sessionTitle)).toBeLessThan(
    instructions.indexOf(text.native.checkTitle),
  );
  await expect(page.getByText(text.linux.wayland)).toBeVisible();
  const example = page.getByRole("region", {
    name: text.linux.commandTitle,
    exact: true,
  });
  await example.getByRole("button", { name: text.copy, exact: true }).click();
  await expect(example.getByRole("status")).toHaveText(text.copied);
  expect(
    await page.evaluate(() => localStorage.getItem("test:copied-command")),
  ).toBe(captureCommands.linux);
  await page.reload();
  await expect(method).toHaveValue("");
  await page.getByRole("link", { name: text.back, exact: true }).click();
  await expect(page.locator(".cli-preview video")).toHaveAttribute(
    "aria-label",
    "mousepad-demo.mp4",
  );
  await page.getByRole("link", { name: "Inspect", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Command", exact: true }),
  ).toHaveValue("ffprobe -v error mousepad-demo.mp4");
  expect(requests.some((url) => url.includes("/encoder/"))).toBe(false);
  await page.goto("./");
  await expect(page.locator(".module-list h3").first()).toHaveText(
    text.sourceTitle,
  );
  await page.getByRole("link", { name: text.link, exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(text.title);
  expect(errors).toEqual([]);
});
