// Copyright © 2026 Christopher Snow
import { expect, type Page } from "@playwright/test";
import { cli } from "../src/cli/strings";
import { routeFor } from "../src/journey/routes";
export const terminal = (page: Page) =>
  page.getByLabel(cli.output, { exact: true });
export async function command(page: Page, text: string, result = cli.done) {
  const route = routeFor(new URL(page.url()).hash);
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-step",
    route.step!,
  );
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-reference",
    route.reference ? route.step! : "",
  );
  await expect(
    page.getByRole("button", { name: cli.run, exact: true }),
  ).toBeEnabled();
  await page.getByRole("textbox", { name: cli.input, exact: true }).fill(text);
  await page
    .getByRole("textbox", { name: cli.input, exact: true })
    .press("Enter");
  await expect(page.locator(".command-workspace [role=status]")).toHaveText(
    result,
    { timeout: 120000 },
  );
}
export async function downloaded(page: Page, name: string) {
  const waiting = page.waitForEvent("download");
  await command(page, `download ${name}`);
  return (await (await waiting).path())!;
}
export async function visiblePlay(page: Page) {
  const v = page.locator(".cli-preview video");
  await v.scrollIntoViewIfNeeded();
  await v.evaluate((v: HTMLVideoElement) => v.play());
  await expect
    .poll(() => v.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0.1);
  await v.evaluate((v: HTMLVideoElement) => v.pause());
}
