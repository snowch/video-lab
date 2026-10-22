// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { ai } from "../src/assist/strings";
import { checkClaims, cutList } from "../src/assist/claims";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-9");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(ai.title);
};

test("assist lesson renders the transcript, the player and the checker", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await open(page);
  const view = page.locator("#ix-transcript-view-motivation");
  await expect(view.locator("video")).toHaveAttribute(
    "src",
    /build-queue\.mp4$/,
  );
  await expect(view).toContainText("The assisted transcript");
  await expect(view).toContainText(
    "The user presses the Sort button twice to sort the queue.",
  );
  await expect(view).toContainText(ai.transcriptNote);
  const checker = page.locator("#ix-claim-checker-construction");
  await expect(checker).toBeVisible();
  await expect(
    checker.getByRole("button", { name: ai.check, exact: true }),
  ).toBeVisible();
  await expect(checker.getByText(ai.statusIdle, { exact: true })).toBeVisible();
  const cuts = page.locator("#ix-cut-list-failureExperiment");
  await expect(cuts).toContainText("The assisted cut list");
  await expect(cuts).toContainText("(7 s)");
  expect(errors).toEqual([]);
});

test("claim checker checks every claim against a real frame and reports verdicts", async ({
  page,
}) => {
  await open(page);
  const checker = page.locator("#ix-claim-checker-construction");
  await checker.getByRole("button", { name: ai.check, exact: true }).click();
  await expect(checker.getByText(ai.statusDone, { exact: true })).toBeVisible();
  const verdicts = checker.locator(".sound-levels");
  await expect(verdicts).toContainText("Claim 1: matches the frame");
  await expect(verdicts).toContainText("Claim 2: does not match the frame");
  await expect(verdicts).toContainText("Claim 3: matches the frame");
  // Every claim shows a real extracted frame as its evidence.
  const images = checker.locator("img");
  await expect(images).toHaveCount(3);
  await expect(images.nth(0)).toHaveAttribute("src", /frames\/012\.jpg$/);
  await expect(images.nth(1)).toHaveAttribute("src", /frames\/048\.jpg$/);
  await expect(images.nth(2)).toHaveAttribute("src", /frames\/096\.jpg$/);
  // The wrong claim's evidence names the real frame and timestamp.
  await expect(verdicts).toContainText("frames/048.jpg at 4 s");
});

test("assist challenge grades the reference and rejects wrong choices", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(2);
  await expect(
    page.getByText(ai.feedback.wrong, { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: ai.fieldLabels.wrong, exact: true })
    .selectOption("second");
  await page
    .getByRole("combobox", { name: ai.fieldLabels.cut, exact: true })
    .selectOption("padding");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=assist-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=assist-choice]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page
    .getByRole("combobox", { name: ai.fieldLabels.wrong, exact: true })
    .selectOption("first");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(1);
  await expect(
    page.getByText(ai.feedback.wrong, { exact: true }),
  ).toBeVisible();
});

test("assist claim data pins the wrong claim and the weak cut", () => {
  const claims = checkClaims();
  expect(claims.filter((c) => !c.matches).map((c) => c.index)).toEqual([2]);
  expect(cutList.find((c) => c.weak)!.id).toBe("padding");
});
