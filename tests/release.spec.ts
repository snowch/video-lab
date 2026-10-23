// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { releaseStrings as s } from "../src/release/strings";
import { offline } from "../src/offline/strings";
const published = JSON.parse(readFileSync("dist/release.json", "utf8")) as {
  commit: string;
};
test("footer identifies the running commit and detects a different published build without reloading", async ({
  page,
}) => {
  await page.goto("./#/capture");
  const footer = page.locator(".release-status");
  await expect(footer).toHaveAttribute("data-release-state", "latest");
  await expect(footer.getByRole("link")).toHaveText(
    published.commit.slice(0, 7),
  );
  await expect(footer.getByRole("link")).toHaveAttribute(
    "href",
    `https://github.com/snowch/video-lab/commit/${published.commit}`,
  );
  expect(await page.locator("script[src]").count()).toBeGreaterThan(0);
  const manifest = await (
    await page.request.get("offline-manifest.json")
  ).json();
  expect(
    manifest.files.some(
      (file: { path: string }) => file.path === "release.json",
    ),
  ).toBe(false);
  const other =
    published.commit === "a".repeat(40) ? "b".repeat(40) : "a".repeat(40);
  await page.route("**/release.json?*", (route) =>
    route.fulfill({ json: { commit: other } }),
  );
  await page.evaluate(() => dispatchEvent(new Event("focus")));
  await expect(footer).toHaveAttribute("data-release-state", "outdated");
  await expect(footer).toContainText("✕");
  await expect(footer).toContainText(s.updateHint);
  await expect(page).toHaveURL(/#\/capture$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("offline and failed checks stay unknown, then reconnection can confirm the current version", async ({
  page,
  context,
}) => {
  await page.goto("./");
  const footer = page.locator(".release-status");
  test.setTimeout(90000);
  await expect(footer).toHaveAttribute("data-release-state", "latest");
  await page.locator(".offline-panel > details > summary").click();
  await page
    .getByRole("button", { name: offline.download, exact: true })
    .click();
  await expect(page.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "true",
    { timeout: 30000 },
  );
  await context.setOffline(true);
  await page.reload();
  await expect(footer.getByRole("link")).toHaveText(
    published.commit.slice(0, 7),
  );
  await expect(footer).toHaveAttribute("data-release-state", "offline");
  await expect(footer).not.toContainText("✓");
  await page.route("**/release.json?*", (route) =>
    route.fulfill({ json: { commit: "invalid" } }),
  );
  await context.setOffline(false);
  // Firefox automation can omit the online event after an offline reload.
  await page.evaluate(() => dispatchEvent(new Event("online")));
  await expect(footer).toHaveAttribute("data-release-state", "unavailable");
  await page.unroute("**/release.json?*");
  await page.evaluate(() => dispatchEvent(new Event("focus")));
  await expect(footer).toHaveAttribute("data-release-state", "latest");
  await expect(footer).toContainText("✓");
  await page.route("**/release.json?*", (route) => route.abort());
  await page.evaluate(() => dispatchEvent(new Event("focus")));
  await expect(footer).toHaveAttribute("data-release-state", "unavailable");
});
