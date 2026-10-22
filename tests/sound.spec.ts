// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { sd } from "../src/sound/strings";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-5");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(sd.title);
};

test("sound lesson renders five players, the measured table and the over-driven file", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await open(page);
  const players = page.locator("audio");
  await expect(players).toHaveCount(6);
  await expect(players.nth(0)).toHaveAttribute("src", /build\/tone\.wav$/);
  await expect(players.nth(1)).toHaveAttribute("src", /edit\/quiet-tone\.wav$/);
  await expect(players.nth(2)).toHaveAttribute("src", /edit\/loud-tone\.wav$/);
  await expect(players.nth(3)).toHaveAttribute("src", /edit\/over-tone\.wav$/);
  await expect(players.nth(4)).toHaveAttribute("src", /edit\/band-tone\.wav$/);
  await expect(players.nth(5)).toHaveAttribute("src", /edit\/over-tone\.wav$/);
  const table = page.locator(".sound-levels");
  await expect(table).toBeVisible();
  await expect(table).toContainText("-47.1 dB");
  await expect(table).toContainText("-27.1 dB");
  await expect(table).toContainText("-15.1 dB");
  // The editor is present with its measure button and idle status.
  const editor = page.locator("#ix-sound-editor");
  await expect(editor).toBeVisible();
  await expect(
    editor.getByRole("button", { name: sd.measure, exact: true }),
  ).toBeVisible();
  await expect(editor.getByText(sd.notMeasured, { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("sound editor runs a real WASM volumedetect and reports the levels", async ({
  page,
}) => {
  test.setTimeout(120000);
  await open(page);
  const coreRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("vendor/ffmpeg/"))
      coreRequests.push(request.url());
  });
  const editor = page.locator("#ix-sound-editor");
  await expect(editor.getByText(sd.notMeasured, { exact: true })).toBeVisible();
  expect(coreRequests).toEqual([]);
  await editor.getByRole("button", { name: sd.measure, exact: true }).click();
  await expect(editor.getByText(sd.measured, { exact: true })).toBeVisible({
    timeout: 90000,
  });
  expect(coreRequests.some((u) => u.endsWith("ffmpeg-core.wasm"))).toBe(true);
  await expect(
    editor.getByText("ffmpeg -i source.mp4 -af volumedetect"),
  ).toBeVisible();
  const facts = editor.locator(".encode-facts");
  // The recording's sound is the 5% tone: mean near -47 dB, max near -44 dB.
  await expect(facts).toContainText("-47");
  await expect(facts).toContainText("-44");
});

test("sound editor reports failure honestly when the encoder core cannot load", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.route("**/vendor/ffmpeg/ffmpeg-core.wasm", (route) =>
    route.abort(),
  );
  await open(page);
  const editor = page.locator("#ix-sound-editor");
  await editor.getByRole("button", { name: sd.measure, exact: true }).click();
  await expect(editor.getByText(sd.unavailable, { exact: true })).toBeVisible({
    timeout: 60000,
  });
});

test("sound challenge grades the reference and rejects wrong choices", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
  await expect(
    page.getByText(sd.feedback.clear, { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: sd.fieldLabels.clear, exact: true })
    .selectOption("loud");
  await page
    .getByRole("combobox", { name: sd.fieldLabels.treatment, exact: true })
    .selectOption("none");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=sound-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=sound-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page
    .getByRole("combobox", { name: sd.fieldLabels.clear, exact: true })
    .selectOption("quiet");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await expect(
    page.getByText(sd.feedback.clear, { exact: true }),
  ).toBeVisible();
});

test("failed sound media keeps the editor and grading usable", async ({
  page,
}) => {
  await page.route("**/media/edit/*.wav", (route) => route.abort());
  await open(page);
  await expect(page.getByRole("alert").first()).toBeVisible();
  const editor = page.locator("#ix-sound-editor");
  await expect(
    editor.getByRole("button", { name: sd.measure, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
});
