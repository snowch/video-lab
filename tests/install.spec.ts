// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { install } from "../src/install/strings";
import { offline } from "../src/offline/strings";
test("built app metadata, icons and Chromium installability", async ({
  page,
  context,
  browserName,
}) => {
  await page.goto("./");
  const manifestLink = page.locator("link[rel=manifest]");
  await expect(manifestLink).toHaveAttribute(
    "href",
    "/video-lab/manifest.webmanifest",
  );
  const response = await page.request.get("manifest.webmanifest");
  expect(response.ok()).toBe(true);
  const manifest = await response.json();
  expect(manifest.name).toBe("Video Lab");
  expect(manifest.display).toBe("standalone");
  for (const icon of manifest.icons) {
    const size = Number(icon.sizes.split("x")[0]);
    expect(
      await page.evaluate(async ({ src }) => {
        const image = new Image();
        image.src = src;
        await image.decode();
        return [image.naturalWidth, image.naturalHeight];
      }, icon),
    ).toEqual([size, size]);
  }
  if (browserName === "chromium") {
    await page.locator(".offline-panel > details > summary").click();
    await page
      .getByRole("button", { name: offline.download, exact: true })
      .click();
    await expect(page.locator("[data-offline-ready]")).toHaveAttribute(
      "data-offline-ready",
      "true",
      { timeout: 30000 },
    );
    const cdp = await context.newCDPSession(page);
    const appManifest = await cdp.send("Page.getAppManifest");
    expect(appManifest.errors).toEqual([]);
    for (const key of ["id", "startUrl", "scope"] as const)
      expect(appManifest.manifest?.[key]).toBe(
        new URL("/video-lab/", page.url()).href,
      );
    await expect
      .poll(
        async () =>
          (await cdp.send("Page.getInstallabilityErrors")).installabilityErrors,
      )
      .toEqual([]);
    await context.setOffline(true);
    await page.reload();
    expect(
      await page.evaluate(async () =>
        (await fetch("manifest.webmanifest")).json(),
      ),
    ).toEqual(manifest);
    const icon = await page.evaluate(async () => {
      const image = new Image();
      image.src = "icons/icon-512.png";
      await image.decode();
      return image.naturalWidth;
    });
    expect(icon).toBe(512);
  }
});
test("installation fallback and controlled prompt lifecycle", async ({
  page,
}) => {
  await page.goto("./");
  await page.locator(".offline-panel > details > summary").click();
  const panel = page.locator(".install-access");
  await panel.getByText(install.help, { exact: true }).click();
  await expect(
    panel.getByText(install.safariMac, { exact: true }),
  ).toBeVisible();
  await expect(panel.getByText(install.firefox, { exact: true })).toBeVisible();
  await expect(panel.getByText(install.android, { exact: true })).toBeVisible();
  await expect(
    panel.getByText(install.offlineReminder, { exact: true }),
  ).toBeVisible();
  // Browser prompt lifecycle is simulated; this does not install an OS application.
  async function offer(outcome: "accepted" | "dismissed" | "error") {
    await page.evaluate((outcome) => {
      const event = new Event("beforeinstallprompt", { cancelable: true });
      Object.assign(event, {
        prompt: async () => {
          if (outcome === "error") throw new Error("Prompt failed");
        },
        userChoice: Promise.resolve({ outcome }),
      });
      dispatchEvent(event);
    }, outcome);
  }
  await offer("dismissed");
  await panel.getByRole("button", { name: install.button }).focus();
  await page.keyboard.press("Enter");
  await expect(panel.getByRole("status")).toHaveText(install.dismissed);
  await expect(panel.getByRole("button", { name: install.button })).toHaveCount(
    0,
  );
  await offer("error");
  await panel.getByRole("button", { name: install.button }).click();
  await expect(panel.getByRole("status")).toHaveText(install.failed);
  await offer("accepted");
  await panel.getByRole("button", { name: install.button }).click();
  await expect(panel.getByRole("status")).toHaveText(install.accepted);
  await page.evaluate(() => dispatchEvent(new Event("appinstalled")));
  await expect(panel.getByRole("status")).toHaveText(install.installed);
  await expect(panel.getByRole("button")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("existing app window does not offer installation again", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "standalone", { value: true }),
  );
  await page.goto("./#/module-2");
  await page.locator(".offline-panel > details > summary").click();
  await expect(page.locator(".install-access").getByRole("status")).toHaveText(
    install.installed,
  );
  await expect(page.locator(".install-access").getByRole("button")).toHaveCount(
    0,
  );
});
