// Copyright © 2026 Christopher Snow
import { test, expect, type Locator, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { n } from "../src/notebook/ui.strings";
import { expectPracticeReady } from "./notebook-storage";

async function openFiles(page: Page, route = "./#/") {
  await page.goto(route);
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await page.getByRole("button", { name: n.files, exact: true }).click();
  const dialog = page.getByRole("dialog", { name: n.yourFiles, exact: true });
  await expect(dialog).toBeVisible();
  return dialog;
}
function rowMenu(dialog: Locator, name: string) {
  return dialog.getByLabel(`${n.moreActions}: ${name}`, { exact: true });
}
function fileButton(dialog: Locator, name: string) {
  return dialog.getByRole("button", { name, exact: true });
}
function filePicker(dialog: Locator) {
  return dialog.locator("input[type=file]").first();
}
function textFile(name: string, contents = "Saved text") {
  return { name, mimeType: "text/plain", buffer: Buffer.from(contents) };
}

test("Files is a single header utility, empty on the overview and showing the lesson's practice video", async ({
  page,
}) => {
  for (const route of ["./#/", "./#/learn/first-edit/shorten"]) {
    const dialog = await openFiles(page, route);
    await expect(page.locator("dialog.notebook-files")).toHaveCount(1);
    await expect(
      page.locator("#notebook-header-tools").getByRole("button", {
        name: n.files,
        exact: true,
        includeHidden: true,
      }),
    ).toHaveCount(1);
    await expect(page.locator(".notebook-toolbar button")).toHaveCount(0);
    await expect(
      dialog.getByRole("heading", { name: n.yourFiles }),
    ).toBeVisible();
    await expect(fileButton(dialog, n.import)).toBeVisible();
    if (route === "./#/") {
      await expect(dialog.getByText(n.noFiles, { exact: true })).toBeVisible();
    } else {
      await expectPracticeReady(page);
      await expect(dialog.getByText(n.noFiles, { exact: true })).toHaveCount(0);
      await expect(dialog.locator(".notebook-file-list > li")).toHaveCount(1);
      await expect(fileButton(dialog, "bunny-short.mp4")).toBeVisible();
      await expect(dialog.locator(".notebook-file-list")).toContainText(
        n.originPracticeVideo,
      );
    }
    await expect(dialog.getByText(n.storageNote, { exact: true })).toBeHidden();
    await expect(
      dialog.getByText(n.nearFileLimit, { exact: false }),
    ).toHaveCount(0);
    await expect(dialog.getByRole("searchbox")).toHaveCount(0);
    await expect(dialog.locator(".notebook-breadcrumb")).toHaveCount(0);
    await expect(fileButton(dialog, n.earlierWork)).toHaveCount(0);
    await expect(fileButton(dialog, "Load practice files")).toHaveCount(0);
    await expect(dialog.locator("select")).toHaveCount(0);
    await fileButton(dialog, n.close).click();
    await expect(
      page.getByRole("button", { name: n.files, exact: true }),
    ).toBeFocused();
  }
});

test("imported files preview and download their actual contents; row actions confirm changes and return focus", async ({
  page,
}) => {
  const dialog = await openFiles(page);
  await filePicker(dialog).setInputFiles(
    "public/media/notebook/bunny-short.mp4",
  );
  // setInputFiles delivers the change event, not the asynchronous import.
  // Wait for the same ready state a learner needs before importing again.
  await expect(fileButton(dialog, "bunny-short.mp4")).toBeVisible();
  await expect(fileButton(dialog, n.import)).toBeEnabled();
  await filePicker(dialog).setInputFiles(
    textFile("notes.txt", "Original notes"),
  );
  await expect(fileButton(dialog, "notes.txt")).toBeVisible();
  await fileButton(dialog, "bunny-short.mp4").click();
  const video = dialog.locator("video");
  await expect(video).toBeVisible();
  await expect
    .poll(() => video.evaluate((el: HTMLVideoElement) => el.duration))
    .toBeCloseTo(8, 1);
  await expect(dialog.locator(".notebook-file-list")).toContainText(
    n.originImported,
  );
  const downloading = page.waitForEvent("download");
  await fileButton(dialog, `${n.download} notes.txt`).click();
  const downloaded = await downloading;
  expect(downloaded.suggestedFilename()).toBe("notes.txt");
  expect(readFileSync((await downloaded.path())!, "utf8")).toBe(
    "Original notes",
  );

  const menu = rowMenu(dialog, "notes.txt");
  await menu.click();
  await fileButton(dialog, `${n.rename} notes.txt`).click();
  const path = dialog.getByRole("textbox", { name: n.name, exact: true });
  await expect(path).toBeFocused();
  await path.fill("renamed.txt");
  await fileButton(dialog, n.keep).click();
  await expect(menu).toBeFocused();
  await expect(fileButton(dialog, "notes.txt")).toBeVisible();
  await menu.click();
  await fileButton(dialog, `${n.rename} notes.txt`).click();
  await path.fill("renamed.txt");
  await fileButton(dialog, n.save).click();
  await expect(fileButton(dialog, "notes.txt")).toHaveCount(0);
  await expect(fileButton(dialog, "renamed.txt")).toBeVisible();
  await expect(fileButton(dialog, n.import)).toBeFocused();
  const renamedMenu = rowMenu(dialog, "renamed.txt");
  await renamedMenu.click();
  await fileButton(dialog, `${n.copyFile} renamed.txt`).click();
  await expect(path).toHaveValue("renamed-copy.txt");
  await fileButton(dialog, n.save).click();
  await expect(renamedMenu).toBeFocused();
  await fileButton(dialog, "renamed-copy.txt").click();
  await expect(dialog.getByRole("textbox", { name: n.editText })).toHaveValue(
    "Original notes",
  );
  await rowMenu(dialog, "renamed-copy.txt").click();
  await fileButton(dialog, `${n.delete} renamed-copy.txt`).click();
  await expect(
    dialog.getByRole("heading", { name: n.confirmDelete }),
  ).toBeVisible();
  await expect(fileButton(dialog, n.keep)).toBeFocused();
  await expect(fileButton(dialog, "renamed-copy.txt")).toBeVisible();
  await fileButton(dialog, n.keep).click();
  await expect(rowMenu(dialog, "renamed-copy.txt")).toBeFocused();
  await rowMenu(dialog, "renamed-copy.txt").click();
  await fileButton(dialog, `${n.delete} renamed-copy.txt`).click();
  await fileButton(dialog, n.delete).click();
  await expect(fileButton(dialog, "renamed-copy.txt")).toHaveCount(0);
  await expect(fileButton(dialog, "renamed.txt")).toBeVisible();
  await expect(fileButton(dialog, n.import)).toBeFocused();
});

test("text rows offer Edit, focus the editor and retain saved changes", async ({
  page,
}) => {
  const dialog = await openFiles(page, "./#/learn/first-edit/shorten");
  await expectPracticeReady(page);
  await filePicker(dialog).setInputFiles([
    textFile("captions.srt", "1\n00:00:00,000 --> 00:00:03,000\nHello\n"),
    textFile("empty.txt", ""),
  ]);
  await expect(fileButton(dialog, `${n.editFile} bunny-short.mp4`)).toHaveCount(
    0,
  );
  const edit = fileButton(dialog, `${n.editFile} captions.srt`);
  await edit.focus();
  await page.keyboard.press("Enter");
  const editor = dialog.getByRole("textbox", { name: n.editText });
  await expect(editor).toBeFocused();
  await expect(editor).toHaveValue(/Hello/);
  await editor.fill("1\n00:00:00,000 --> 00:00:03,000\nChanged caption\n");
  await expect(fileButton(dialog, `${n.editFile} empty.txt`)).toBeDisabled();
  await fileButton(dialog, n.save).click();
  await fileButton(dialog, `${n.editFile} empty.txt`).click();
  await expect(editor).toBeFocused();
  await expect(editor).toHaveValue("");
  await editor.fill("New notes");
  await fileButton(dialog, n.save).click();
  await fileButton(dialog, n.close).click();
  await page.reload();
  await page.getByRole("button", { name: n.files, exact: true }).click();
  await fileButton(dialog, `${n.editFile} captions.srt`).click();
  await expect(editor).toHaveValue(
    "1\n00:00:00,000 --> 00:00:03,000\nChanged caption\n",
  );
  await fileButton(dialog, `${n.editFile} empty.txt`).click();
  await expect(editor).toHaveValue("New notes");
});

test("row actions stay aligned and only the current dropdown stays open", async ({
  page,
}) => {
  const dialog = await openFiles(page);
  await filePicker(dialog).setInputFiles([
    textFile("first.txt"),
    textFile("last.txt"),
  ]);
  const first = rowMenu(dialog, "first.txt");
  const last = rowMenu(dialog, "last.txt");
  const row = dialog.locator(".notebook-file-list > li").first();
  const height = await row.evaluate((el) => el.getBoundingClientRect().height);
  await first.click();
  await expect(fileButton(dialog, `${n.copyFile} first.txt`)).toBeVisible();
  expect(await row.evaluate((el) => el.getBoundingClientRect().height)).toBe(
    height,
  );
  await last.focus();
  await page.keyboard.press("Enter");
  await expect(fileButton(dialog, `${n.copyFile} first.txt`)).toBeHidden();
  const copy = fileButton(dialog, `${n.copyFile} last.txt`);
  await expect(copy).toBeVisible();
  const panel = dialog.locator(
    ".notebook-row-options[open] .notebook-row-option-buttons",
  );
  const panelBounds = await panel.boundingBox();
  const dialogBounds = await dialog.boundingBox();
  expect(panelBounds!.x).toBeGreaterThanOrEqual(dialogBounds!.x);
  expect(panelBounds!.y).toBeGreaterThanOrEqual(dialogBounds!.y);
  expect(panelBounds!.x + panelBounds!.width).toBeLessThanOrEqual(
    dialogBounds!.x + dialogBounds!.width,
  );
  expect(panelBounds!.y + panelBounds!.height).toBeLessThanOrEqual(
    dialogBounds!.y + dialogBounds!.height,
  );
  await copy.focus();
  await page.keyboard.press("Escape");
  await expect(last).toBeFocused();
  await expect(copy).toBeHidden();
  await last.click();
  await dialog.getByRole("heading", { name: n.yourFiles }).click();
  await expect(copy).toBeHidden();
  await expect(dialog).toBeVisible();
});

test("search appears after eight entries, keeps a no-match query editable and follows folder navigation", async ({
  page,
}) => {
  const dialog = await openFiles(page);
  await filePicker(dialog).setInputFiles(
    Array.from({ length: 8 }, (_, i) => textFile(`note-${i}.txt`)),
  );
  await expect(dialog.locator(".notebook-file-list > li")).toHaveCount(8);
  await expect(dialog.getByRole("searchbox", { name: n.filter })).toHaveCount(
    0,
  );
  await filePicker(dialog).setInputFiles(textFile("ninth.txt"));
  const search = dialog.getByRole("searchbox", { name: n.filter });
  await expect(search).toBeVisible();
  await search.fill("does not exist");
  await expect(
    dialog.getByText(n.noSearchMatches, { exact: true }),
  ).toBeVisible();
  await expect(search).toBeVisible();
  await search.fill("");
  await expect(dialog.locator(".notebook-file-list > li")).toHaveCount(9);
  await dialog.locator(".notebook-file-options > summary").click();
  await fileButton(dialog, n.newFolder).click();
  await dialog.getByRole("textbox", { name: n.name }).fill("My folder");
  await fileButton(dialog, n.save).click();
  await expect(dialog.locator(".notebook-breadcrumb")).toBeVisible();
  await fileButton(dialog, "▸ My folder").click();
  await expect(dialog.getByText(n.empty, { exact: true })).toBeVisible();
  await expect(search).toHaveCount(0);
  await filePicker(dialog).setInputFiles(textFile("inside.txt"));
  await expect(fileButton(dialog, "inside.txt")).toBeVisible();
  await dialog
    .locator(".notebook-breadcrumb")
    .getByRole("button", { name: n.root, exact: true })
    .click();
  await expect(search).toBeVisible();
  await expect(fileButton(dialog, "inside.txt")).toHaveCount(0);
  await fileButton(dialog, "▸ My folder").click();
  await expect(fileButton(dialog, "inside.txt")).toBeVisible();
});

test("secondary options work by keyboard and touch, and Escape preserves dirty text until explicitly discarded", async ({
  page,
}, info) => {
  const dialog = await openFiles(page);
  const options = dialog.locator(".notebook-file-options > summary");
  await options.focus();
  await page.keyboard.press("Enter");
  await expect(dialog.getByText(n.storageNote, { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(options).toBeFocused();
  await expect(dialog.getByText(n.storageNote, { exact: true })).toBeHidden();
  await expect(dialog).toBeVisible();
  if (info.project.use.hasTouch) await options.tap();
  else await options.click();
  await fileButton(dialog, n.newText).click();
  await expect(dialog.getByRole("textbox", { name: n.name })).toBeFocused();
  await fileButton(dialog, n.save).click();
  await fileButton(dialog, "note.txt").click();
  const editor = dialog.getByRole("textbox", { name: n.editText });
  await expect(editor).toHaveValue("");
  await editor.fill("Keep this unsaved edit");
  await page.keyboard.press("Escape");
  await expect(fileButton(dialog, n.keep)).toBeFocused();
  await fileButton(dialog, n.keep).click();
  await expect(editor).toBeFocused();
  await expect(editor).toHaveValue("Keep this unsaved edit");
  await fileButton(dialog, n.save).click();
  const menu = rowMenu(dialog, "note.txt");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(fileButton(dialog, `${n.copyFile} note.txt`)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(dialog).toBeVisible();
  await editor.fill("Discard this edit");
  await fileButton(dialog, n.close).click();
  await fileButton(dialog, n.discard).click();
  await expect(dialog).toBeHidden();
  await page.getByRole("button", { name: n.files, exact: true }).click();
  await fileButton(dialog, "note.txt").click();
  await expect(editor).toHaveValue("Keep this unsaved edit");
});

test("Files remains readable at 320 pixels with doubled text and long filenames", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const dialog = await openFiles(page);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
    // CI desktop Linux uses a wider fallback than this workspace’s system font.
    document.documentElement.style.fontFamily = "DejaVu Sans, sans-serif";
  });
  const name = "Long filename with several ordinary words and accented été.txt";
  await filePicker(dialog).setInputFiles(textFile(name));
  await rowMenu(dialog, name).click();
  await expect(fileButton(dialog, `${n.rename} ${name}`)).toBeVisible();
  await dialog.locator(".notebook-file-options > summary").click();
  await expect(fileButton(dialog, n.newText)).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
  ).toBe(true);
  const title = dialog.getByRole("heading", { name: n.yourFiles });
  // Both complete words must fit the heading width, even when the title wraps.
  expect(
    await title.evaluate((el) => {
      const text = el.firstChild!;
      const bounds = el.getBoundingClientRect();
      return [...el.textContent!.matchAll(/\S+/g)].every((word) => {
        const range = document.createRange();
        range.setStart(text, word.index!);
        range.setEnd(text, word.index! + word[0].length);
        const wordBounds = range.getBoundingClientRect();
        return (
          wordBounds.width <= bounds.width + 1 &&
          wordBounds.left >= 0 &&
          wordBounds.right <= innerWidth
        );
      });
    }),
  ).toBe(true);
  for (const control of [
    fileButton(dialog, n.import),
    rowMenu(dialog, name),
    fileButton(dialog, `${n.download} ${name}`),
  ]) {
    const bounds = await control.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
  }
});

test("the file-count warning starts at 80 percent and disappears after confirmed deletion", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  const dialog = await openFiles(page);
  await filePicker(dialog).setInputFiles(
    Array.from({ length: 51 }, (_, i) => textFile(`file-${i}.txt`)),
  );
  await expect(dialog.locator(".notebook-file-list > li")).toHaveCount(51);
  await expect(dialog.locator(".notebook-file-limits")).toHaveCount(0);
  await filePicker(dialog).setInputFiles(textFile("threshold.txt"));
  await expect(dialog.locator(".notebook-file-limits")).toContainText(
    n.nearFileLimit,
  );
  await expect(dialog.locator(".notebook-file-limits")).toContainText(
    n.fileLimits,
  );
  await rowMenu(dialog, "threshold.txt").click();
  await fileButton(dialog, `${n.delete} threshold.txt`).click();
  await fileButton(dialog, n.delete).click();
  await expect(dialog.locator(".notebook-file-limits")).toHaveCount(0);
});

test("an empty legacy database and migration flags are not earlier work, while an actual saved draft is", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  const dialog = await openFiles(page);
  await fileButton(dialog, n.close).click();
  await page.evaluate(async () => {
    localStorage.setItem("video-lab:cli-migrated", "1");
    localStorage.setItem("video-lab:notebook:migrated", "1");
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("video-lab-cli", 1);
      request.onupgradeneeded = () =>
        request.result.createObjectStore("files", { keyPath: "name" });
      request.onsuccess = () => {
        request.result.close();
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  });
  await page.reload();
  await page.getByRole("button", { name: n.files, exact: true }).click();
  await expect(fileButton(dialog, n.earlierWork)).toHaveCount(0);
  await fileButton(dialog, n.close).click();
  await page.evaluate(() =>
    localStorage.setItem(
      "video-lab:course-command-draft",
      "ffprobe my-saved-source.mp4",
    ),
  );
  await page.getByRole("button", { name: n.files, exact: true }).click();
  await expect(fileButton(dialog, n.earlierWork)).toBeVisible();
  await fileButton(dialog, n.earlierWork).click();
  await expect(page).toHaveURL(/#\/earlier$/);
});

test("browser Back and Forward preserve unsaved file text until Save or explicit discard", async ({
  page,
}) => {
  await page.goto("./#/earlier");
  await page
    .locator(".notebook-archive")
    .getByRole("link", { name: `${n.overview} →`, exact: true })
    .click();
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await page.getByRole("button", { name: n.files, exact: true }).click();
  const dialog = page.getByRole("dialog", { name: n.yourFiles, exact: true });
  const editor = dialog.getByRole("textbox", { name: n.editText, exact: true });
  const original = "Previously saved notes";
  const draft = "Unsaved notes retained through browser history";
  await filePicker(dialog).setInputFiles(
    textFile("history-notes.txt", original),
  );
  await fileButton(dialog, "history-notes.txt").click();
  await expect(editor).toHaveValue(original);

  async function savedText() {
    return page.evaluate(async () => {
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open("video-lab-notebook");
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      try {
        const file = await new Promise<{ blob: Blob } | undefined>(
          (resolve, reject) => {
            const transaction = db.transaction("files");
            const request = transaction
              .objectStore("files")
              .get("history-notes.txt");
            transaction.oncomplete = () => resolve(request.result);
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error);
          },
        );
        return file?.blob.text();
      } finally {
        db.close();
      }
    });
  }
  async function returnThroughHistory() {
    await page.goBack();
    await expect(page).toHaveURL(/#\/earlier$/);
    await expect(
      page.getByRole("heading", { name: n.earlier, exact: true }),
    ).toBeVisible();
    await page.goForward();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
      "data-notebook-ready",
      "true",
    );
    await page.getByRole("button", { name: n.files, exact: true }).click();
    await expect(dialog).toBeVisible();
  }

  await expect.poll(savedText).toBe(original);
  await editor.fill(draft);
  await returnThroughHistory();
  await expect(editor).toHaveValue(draft);
  await expect.poll(savedText).toBe(original);
  await fileButton(dialog, n.close).click();
  await expect(fileButton(dialog, n.discard)).toBeVisible();
  await fileButton(dialog, n.keep).click();
  await expect(editor).toHaveValue(draft);
  await expect.poll(savedText).toBe(original);
  await fileButton(dialog, n.save).click();
  await expect.poll(savedText).toBe(draft);

  const discarded = "This later draft must be discarded";
  await editor.fill(discarded);
  await returnThroughHistory();
  await expect(editor).toHaveValue(discarded);
  await expect.poll(savedText).toBe(draft);
  await fileButton(dialog, n.close).click();
  await fileButton(dialog, n.discard).click();
  await expect(dialog).toBeHidden();
  await returnThroughHistory();
  await fileButton(dialog, "history-notes.txt").click();
  await expect(editor).toHaveValue(draft);
  await fileButton(dialog, n.close).click();
  await expect(dialog).toBeHidden();

  await page.getByRole("button", { name: n.files, exact: true }).click();
  await dialog.locator(".notebook-file-options > summary").click();
  await fileButton(dialog, n.newText).click();
  const path = dialog.getByRole("textbox", { name: n.name, exact: true });
  const unfinishedName = "My unfinished notes.txt";
  await path.fill(unfinishedName);
  await returnThroughHistory();
  await expect(path).toHaveValue(unfinishedName);
  await expect(fileButton(dialog, unfinishedName)).toHaveCount(0);
  await fileButton(dialog, n.keep).click();
  await fileButton(dialog, n.close).click();
  await returnThroughHistory();
  await expect(path).toHaveCount(0);
  await expect(fileButton(dialog, unfinishedName)).toHaveCount(0);
  await fileButton(dialog, n.close).click();
  await expect(dialog).toBeHidden();
});
