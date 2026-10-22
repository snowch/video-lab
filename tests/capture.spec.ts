// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { cap } from "../src/capture/strings";
import { home } from "../src/content/home.strings";

const open = async (page: import("@playwright/test").Page) => {
  await page.goto("./#/module-0");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(cap.title);
};

test("capture lesson renders the recorder, pipeline and labelled fallback", async ({
  page,
}) => {
  await open(page);
  const recorder = page.locator(".recorder").first();
  await expect(
    recorder.getByRole("button", { name: cap.start, exact: true }),
  ).toBeVisible();
  await expect(recorder.getByRole("button", { name: cap.stop })).toBeDisabled();
  await expect(recorder.getByText(cap.stateIdle)).toBeVisible();
  await expect(page.locator(".pipeline")).toBeVisible();
  await expect(
    page.getByRole("button", { name: cap.useFallback, exact: true }),
  ).toBeVisible();
  await expect(recorder.getByText(cap.privacy, { exact: true })).toBeVisible();
});

test("permission denial is reported honestly and offers the fallback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const mediaDevices = navigator.mediaDevices;
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        ...mediaDevices,
        getDisplayMedia: () =>
          Promise.reject(
            new DOMException("Permission denied", "NotAllowedError"),
          ),
      },
    });
  });
  await open(page);
  await page.getByRole("button", { name: cap.start, exact: true }).click();
  await expect(
    page.getByText(`${cap.state}: ${cap.denied}`, { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: cap.useFallback, exact: true })
    .click();
  await expect(
    page.getByText(`${cap.state}: ${cap.fallbackActive}`, { exact: true }),
  ).toBeVisible();
  const video = page.locator(".recorder-result video");
  await expect(video).toHaveAttribute("src", /build-queue\.mp4$/);
});

test("unsupported capture shows the notice and the labelled pre-recorded original", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "mediaDevices", { value: undefined });
  });
  await open(page);
  await expect(page.getByText(cap.unsupported, { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: cap.start, exact: true }),
  ).toBeDisabled();
});

test("fallback section plays the labelled pre-recorded original", async ({
  page,
}) => {
  await open(page);
  const section = page.locator("section", {
    has: page.locator("#section-failureExperiment"),
  });
  await expect(section.locator(".recorder")).toBeVisible();
  await expect(
    section.getByText(/recorded in advance/, { exact: false }),
  ).toBeVisible();
  const video = section.locator("video");
  await expect(video).toHaveAttribute("src", /build-queue\.mp4$/);
  await expect
    .poll(() => video.evaluate((v) => (v as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  await expect(
    section.getByRole("link", { name: cap.download, exact: true }),
  ).toHaveAttribute("download", "build-queue-original.mp4");
});

test("capture plan challenge grades all four fields with feedback", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator(".verdict-failure")).toHaveCount(4);
  await expect(
    page.getByText(cap.feedback.surface, { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: cap.fieldLabels.surface, exact: true })
    .selectOption("app");
  await page
    .getByRole("combobox", { name: cap.fieldLabels.action, exact: true })
    .selectOption("one");
  await page
    .getByRole("combobox", { name: cap.fieldLabels.scaling, exact: true })
    .selectOption("zoom125");
  await page
    .getByRole("combobox", { name: cap.fieldLabels.hold, exact: true })
    .selectOption("hold4");
  await page.getByRole("button", { name: "Run tests", exact: true }).click();
  await expect(page.locator("[data-challenge=capture-plan]")).toHaveAttribute(
    "data-complete",
    "true",
  );
  await page.reload();
  await expect(page.locator("[data-challenge=capture-plan]")).toHaveAttribute(
    "data-complete",
    "true",
  );
});

test("old bookmarks land on real lessons and unknown routes fall back home", async ({
  page,
}) => {
  await page.goto("./#/module-0");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(cap.title);
  await page.goto("./#/module-0/investigation");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(cap.title);
  await page.goto("./#/module-3/investigation");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cutting and joining",
  );
  // A number no lesson lives at renders the home page instead of failing.
  await page.goto("./#/module-99");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    home.subtitle,
  );
  // In-page hash changes to a real lesson still work without a reload.
  await page.goto("./#/module-1");
  await page.evaluate(() => {
    location.hash = "#/module-0/investigation";
  });
  await expect(page).toHaveURL(/#\/module-0\/investigation$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(cap.title);
  await page.evaluate(() => {
    location.hash = "#/module-99";
  });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    home.subtitle,
  );
});
