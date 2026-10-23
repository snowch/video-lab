// Copyright © 2026 Christopher Snow
import { expect, type Page } from "@playwright/test";
import { cli } from "../src/cli/strings";
import { routeFor } from "../src/journey/routes";
export const terminal = (page: Page) => page.locator(".command-workspace");
export { runCommand as command } from "./course-actions";
import { runCommand as command } from "./course-actions";
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
