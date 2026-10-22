// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { q } from "../src/quality/strings";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-6");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(q.title);
};

test("quality lesson renders three players, four stills, the measured table and the editor", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await open(page);
  const players = page.locator("#ix-quality-players video");
  await expect(players).toHaveCount(3);
  await expect(players.nth(0)).toHaveAttribute(
    "src",
    /edit\/half-size-crf18\.mp4$/,
  );
  await expect(players.nth(1)).toHaveAttribute(
    "src",
    /edit\/half-size-crf23\.mp4$/,
  );
  await expect(players.nth(2)).toHaveAttribute(
    "src",
    /edit\/half-size-crf35\.mp4$/,
  );
  const stills = page.locator("#ix-quality-stills img");
  await expect(stills).toHaveCount(4);
  await expect(stills.nth(0)).toHaveAttribute(
    "src",
    /edit\/stills\/half-size-crf18\.jpg$/,
  );
  await expect(stills.nth(3)).toHaveAttribute(
    "src",
    /edit\/stills\/quarter-size-crf23\.jpg$/,
  );
  const table = page.locator(".sound-levels");
  await expect(table).toBeVisible();
  await expect(table).toContainText(`${q.variants.crf18.bytes} ${q.bytes}`);
  await expect(table).toContainText(
    `${q.variants.crf35.bitrate} ${q.bitsPerSecond}`,
  );
  await expect(table).toContainText(`${q.fullFrame.bytes} ${q.bytes}`);
  const editor = page.locator("#ix-quality-editor");
  await expect(editor).toBeVisible();
  await expect(
    editor.getByRole("button", { name: q.run, exact: true }),
  ).toBeVisible();
  await expect(editor.getByText(q.statusIdle, { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("quality editor runs a real WASM re-encode and reports the measured size", async ({
  page,
}) => {
  test.setTimeout(120000);
  await open(page);
  const coreRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("vendor/ffmpeg/"))
      coreRequests.push(request.url());
  });
  const editor = page.locator("#ix-quality-editor");
  await expect(editor.getByText(q.statusIdle, { exact: true })).toBeVisible();
  expect(coreRequests).toEqual([]);
  await editor.getByRole("button", { name: q.run, exact: true }).click();
  await expect(editor.getByText(q.statusDone, { exact: true })).toBeVisible({
    timeout: 90000,
  });
  expect(coreRequests.some((u) => u.endsWith("ffmpeg-core.wasm"))).toBe(true);
  await expect(editor.locator(".encode-command")).toContainText(
    "ffmpeg -y -i source.mp4 -vf scale=640:360 -c:v libx264 -crf 23",
  );
  const facts = editor.locator(".encode-facts");
  // The default 640 x 360 CRF 23 run must produce a file close to the
  // recorded desktop encode (113187 bytes): same settings, same source.
  await expect(facts).toContainText(/11[0-9]{4} bytes/);
  await expect(facts).toContainText("640 × 360");
  await expect(editor.locator("video")).toHaveAttribute("src", /^blob:/);
});

test("quality editor reports failure honestly when the encoder core cannot load", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.route("**/vendor/ffmpeg/ffmpeg-core.wasm", (route) =>
    route.abort(),
  );
  await open(page);
  const editor = page.locator("#ix-quality-editor");
  await editor.getByRole("button", { name: q.run, exact: true }).click();
  await expect(editor.getByText(q.unavailable, { exact: true })).toBeVisible({
    timeout: 60000,
  });
});

test("quality challenge grades the reference and rejects wrong choices", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
  await expect(
    page.getByText(q.feedback.readable, { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: q.fieldLabels.readable, exact: true })
    .selectOption("half");
  await page
    .getByRole("combobox", { name: q.fieldLabels.tradeoff, exact: true })
    .selectOption("pixels");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=quality-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=quality-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page
    .getByRole("combobox", { name: q.fieldLabels.readable, exact: true })
    .selectOption("quarter");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await expect(
    page.getByText(q.feedback.readable, { exact: true }),
  ).toBeVisible();
});

test("failed quality media keeps the editor and grading usable", async ({
  page,
}) => {
  await page.route("**/media/edit/*.mp4", (route) => route.abort());
  await open(page);
  await expect(page.getByRole("alert").first()).toBeVisible();
  const editor = page.locator("#ix-quality-editor");
  await expect(
    editor.getByRole("button", { name: q.run, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
});
