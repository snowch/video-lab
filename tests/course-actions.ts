// Copyright © 2026 Christopher Snow
import { expect, type Page } from "@playwright/test";
import { cli } from "../src/cli/strings";
import { browserAction, courseUI as ux } from "../src/cli/course.strings";
import { routeFor } from "../src/journey/routes";
import { progressiveUI as flow } from "../src/cli/progressive.strings";
import { parseCommand } from "../src/cli/command";
import type { StepName } from "../src/journey/routes";
import { chapterTitles, courseUI } from "../src/course/strings";
export async function navigateChapter(page: Page, step: StepName) {
  const picker = page.getByRole("combobox", {
    name: courseUI.chapterNav,
    exact: true,
  });
  if (await picker.isVisible()) await picker.selectOption(step);
  else
    await page
      .locator(".journey-nav")
      .getByRole("link", { name: new RegExp(chapterTitles[step] + "$") })
      .click();
  await expect(page.locator(".cli-lab")).toHaveAttribute("data-step", step);
}
export async function clickAction(page: Page, name: string) {
  const visible = page.getByRole("button", { name, exact: true }).first();
  if (await visible.isVisible()) {
    await visible.click();
    return;
  }
  const files = page.getByRole("dialog", {
    name: flow.files,
    includeHidden: true,
  });
  if (
    await files
      .getByRole("button", { name, exact: true, includeHidden: true })
      .count()
  ) {
    await page.getByRole("button", { name: flow.files, exact: true }).click();
    await files.getByRole("button", { name, exact: true }).first().click();
    if (await files.isVisible())
      await files
        .getByRole("button", { name: flow.close, exact: true })
        .click();
    return;
  }
  const comparison = page.getByRole("dialog", {
    name: ux.comparisons,
    includeHidden: true,
  });
  if (
    await comparison
      .getByRole("button", { name, exact: true, includeHidden: true })
      .count()
  ) {
    await page.getByRole("button", { name: flow.compare, exact: true }).click();
    await comparison.getByRole("button", { name, exact: true }).click();
    return;
  }
  const hidden = page
    .getByRole("button", { name, exact: true, includeHidden: true })
    .first();
  for (const detail of await page
    .locator("details")
    .filter({ has: hidden })
    .all()) {
    if ((await detail.getAttribute("open")) === null)
      await detail.locator(":scope > summary").click();
  }
  await page.getByRole("button", { name, exact: true }).first().click();
}
/** Legacy test descriptions identify an action; only real app controls invoke it. */
export async function workspaceAction(page: Page, text: string) {
  if (/^\s*ff(mpeg|probe)(\s|$)/.test(text)) return false;
  const [tool, ...args] = parseCommand(text);
  if (tool === "ffmpeg" || tool === "ffprobe") return false;
  if (tool === "clear") await clickAction(page, ux.clear);
  else if (tool === "cancel") await clickAction(page, ux.cancel);
  else if (tool === "note") {
    const details = page.locator(".reference-controls");
    if ((await details.getAttribute("open")) === null)
      await details.locator(":scope > summary").click();
    await page.getByLabel(ux.noteName, { exact: true }).fill(args[0]!);
    await page.getByLabel(ux.noteText, { exact: true }).fill(args[1]!);
    await clickAction(page, ux.saveNote);
  } else if (tool === "hint")
    await clickAction(page, `${ux.hint} ${args[1] ?? 1}`);
  else if (tool === "solution") await clickAction(page, ux.solution);
  else if (tool === "check") await clickAction(page, `${ux.check} ${args[1]}`);
  else {
    const destination = tool === "fixtures" ? "build" : null;
    if (
      text === "reference build" ||
      text === "reference edit" ||
      text === "comparison"
    ) {
      if (
        !(await page
          .getByRole("button", {
            name: browserAction(text),
            exact: true,
            includeHidden: true,
          })
          .count())
      ) {
        await page.goto(
          text === "reference edit"
            ? "./#/edit/reference"
            : "./#/inspect/reference",
        );
      }
    } else if (
      destination &&
      !(await page
        .getByRole("button", {
          name: browserAction(text),
          exact: true,
          includeHidden: true,
        })
        .count())
    ) {
      await navigateChapter(page, destination);
    }
    await expect(page.locator(".cli-lab")).toHaveAttribute(
      "data-workspace-ready",
      "true",
    );
    await clickAction(page, browserAction(text));
  }
  return true;
}
export async function runCommand(page: Page, text: string, result = cli.done) {
  const opened = page.locator(".workspace-dialog[open]");
  if (await opened.count())
    await opened.getByRole("button", { name: flow.close, exact: true }).click();
  const route = routeFor(new URL(page.url()).hash);
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-step",
    route.step!,
  );
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-reference",
    route.reference ? route.step! : "",
  );
  await expect(page.locator(".cli-lab")).toHaveAttribute(
    "data-workspace-ready",
    "true",
  );
  if (text === "ls") {
    await page.getByRole("button", { name: flow.files, exact: true }).click();
    const files = page.getByRole("dialog", { name: flow.files, exact: true });
    await expect(files).toBeVisible();
    await files.getByRole("button", { name: flow.close, exact: true }).click();
    return;
  }
  if (!(await workspaceAction(page, text))) {
    if (route.step === "capture" || route.step === "publish") {
      await navigateChapter(page, "inspect");
      await expect(page.locator(".cli-lab")).toHaveAttribute(
        "data-step",
        "inspect",
      );
      await expect(page.locator(".cli-lab")).toHaveAttribute(
        "data-workspace-ready",
        "true",
      );
    }
    const entry = page.getByRole("textbox", {
      name: cli.input,
      exact: true,
      includeHidden: true,
    });
    for (const detail of await page
      .locator("details")
      .filter({ has: entry })
      .all()) {
      if ((await detail.getAttribute("open")) === null)
        await detail.locator(":scope > summary").click();
    }
    await page
      .getByRole("textbox", { name: cli.input, exact: true })
      .fill(text);
    await page
      .getByRole("textbox", { name: cli.input, exact: true })
      .press("Enter");
  }
  if (text !== "import")
    await expect(page.locator(".command-workspace [role=status]")).toHaveText(
      result,
      { timeout: 120000 },
    );
}
