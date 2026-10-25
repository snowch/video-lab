// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { appStatusStrings as s } from "../src/app-status/strings";
const published = JSON.parse(readFileSync("dist/release.json", "utf8"));
test("running identity stays embedded; deployed metadata is network-only, validated and independent of offline readiness", async ({
  page,
  context,
}) => {
  await page.goto("./#/capture");
  const control = page.locator(".app-status"),
    badge = control.locator(".release-status");
  await expect(badge).toHaveAttribute("data-release-state", "latest");
  await expect(badge.locator("code")).toContainText(
    published.commit.slice(0, 7),
  );
  await expect(control).toHaveAttribute("data-running-build", published.build);
  await page.route("**/release.json?*", (r) =>
    r.fulfill({ json: { ...published, build: "a".repeat(64) } }),
  );
  await control.locator("summary").click();
  await expect(control).toHaveAttribute("data-pending-update", "true");
  await control.locator("summary").click();
  await expect(badge).toContainText(s.outdated);
  await expect(badge.locator("code")).toContainText(
    published.commit.slice(0, 7),
  );
  await context.setOffline(true);
  await expect(badge).toHaveAttribute("data-release-state", "offline");
  await expect(badge).toContainText(s.outdated);
  await context.setOffline(false);
  await page.unroute("**/release.json?*");
  await control.locator("summary").click();
  await control.getByRole("button", { name: s.check, exact: true }).click();
  await expect(badge).toHaveAttribute("data-release-state", "latest");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("failures, malformed metadata, stale responses and timeouts never claim current", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("./");
  const control = page.locator(".app-status"),
    badge = control.locator(".release-status");
  await expect(badge).toHaveAttribute("data-release-state", "latest");
  await page.route("**/release.json?*", (r) =>
    r.fulfill({ json: { commit: published.commit } }),
  );
  // Opening the panel starts its own check. Install the response before opening
  // so an automatic failure cannot race a click on a button now labelled Retry.
  await control.locator("summary").click();
  await expect(badge).toHaveAttribute("data-release-state", "unavailable");
  await page.unroute("**/release.json?*");
  await page.route("**/release.json?*", (r) => r.abort());
  await control.getByRole("button", { name: s.retry, exact: true }).click();
  await expect(badge).toHaveAttribute("data-release-state", "unavailable");
  await page.unroute("**/release.json?*");
  await page.route("**/release.json?*", async (r) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    await r.fulfill({ json: published }).catch(() => {});
  });
  await control.getByRole("button", { name: s.retry, exact: true }).click();
  await expect(badge).toHaveAttribute("data-release-state", "unavailable", {
    timeout: 12000,
  });
  await page.unroute("**/release.json?*");
  await control.getByRole("button", { name: s.retry, exact: true }).click();
  await expect(badge).toHaveAttribute("data-release-state", "latest");
  await expect(control.locator("[data-offline-ready]")).toHaveAttribute(
    "data-offline-ready",
    "false",
  );
});
