// Copyright © 2026 Christopher Snow
import { expect } from "@playwright/test";
import { test } from "./status-site";
import { appStatusStrings as s } from "../src/app-status/strings";
import { n } from "../src/notebook/ui.strings";

test("notebook drafts and dirty file dialogs participate in coordinated restart and modal freeze restores on abort", async ({
  page,
  context,
  site,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  test.setTimeout(120000);
  await page.goto(site.url + "#/learn/first-edit/shorten");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  const draft = "ffprobe retained-notebook.mp4";
  await page
    .locator('[data-cell="first-edit/shorten:worked:0"] textarea')
    .fill(draft);
  const other = await context.newPage();
  await other.goto(site.url + "#/learn/text/subtitles");
  await expect(other.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await other.getByRole("button", { name: n.files, exact: true }).click();
  const files = other.locator("dialog.notebook-files");
  await files.getByRole("button", { name: n.newText, exact: true }).click();
  const status = page.locator(".app-status");
  await status.locator("summary").click();
  site.release = 1;
  await status.getByRole("button", { name: s.check, exact: true }).click();
  await expect(status.locator("[data-version-state]")).toHaveText(s.outdated);
  await status.getByRole("button", { name: s.update, exact: true }).click();
  await expect(status.locator("[data-version-state]")).toHaveText(s.ready, {
    timeout: 45000,
  });
  await status.getByRole("button", { name: s.restart, exact: true }).click();
  await expect(status.locator("[data-version-state]")).toHaveText(
    s.restartFailed,
    { timeout: 15000 },
  );
  await expect(
    files.getByRole("textbox", { name: n.name, exact: true }),
  ).toHaveValue("note.txt");
  await files.getByRole("button", { name: n.keep, exact: true }).click();
  // An open safe modal must freeze while its window has acknowledged restart.
  await other.evaluate(() => {
    const original = ServiceWorker.prototype.postMessage;
    ServiceWorker.prototype.postMessage = function (message, transfer) {
      // The worker must receive ACTIVATE to ask every window for consent.
      // Withhold this window's safe acknowledgement to exercise abort recovery.
      if (message?.type === "APP_RESTART_ACK" && message.safe) return;
      return original.call(
        this,
        message,
        Array.isArray(transfer) ? { transfer } : transfer,
      );
    };
  });
  await status.getByRole("button", { name: s.restart, exact: true }).click();
  await expect(files).toHaveJSProperty("inert", true);
  await expect(status.locator("[data-version-state]")).toHaveText(
    s.restartFailed,
    { timeout: 15000 },
  );
  await expect(files).toHaveJSProperty("inert", false);
  await expect(
    page.locator('[data-cell="first-edit/shorten:worked:0"] textarea'),
  ).toHaveValue(draft);
  await files.getByRole("button", { name: n.close, exact: true }).click();
  await other.close();
});
