// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { pages, chapters, pageHref } from "../src/notebook/structure";
import { courseCopy } from "../src/notebook/copy";
import { n } from "../src/notebook/ui.strings";
import { expectSavedCell, expectPracticeReady } from "./notebook-storage";

test("notebook outline and every concept page reflow without loading processing tools", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("./");
  await expect(page.locator("h1")).toHaveText(courseCopy.title);
  await expect(page.locator(".notebook-chapter-cards>li")).toHaveCount(
    chapters.length,
  );
  await expect(
    page.locator(
      `.notebook-home a[href="#/earlier"], .notebook-sidebar a[href="#/earlier"], .notebook-menu a[href="#/earlier"]`,
    ),
  ).toHaveCount(0);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  for (const p of pages) {
    await page.evaluate((hash) => {
      location.hash = hash;
    }, pageHref(p));
    await expect(page.locator("h1")).toHaveText(courseCopy.pages[p.id]!.title);
    if (page.viewportSize()!.width <= 600) {
      await page.locator("h1").evaluate((el) => el.scrollIntoView());
      expect(
        await page.evaluate(
          () =>
            document.querySelector(".notebook-toolbar")!.getBoundingClientRect()
              .bottom <=
            document.querySelector("h1")!.getBoundingClientRect().top,
        ),
        p.id + " enlarged heading is not covered by navigation",
      ).toBe(true);
    }
    await expect(page.locator("[data-cell]")).toHaveCount(p.worked.length + 1);
    await expect(
      page.getByRole("button", { name: n.run, exact: true }),
    ).toHaveCount(p.worked.length + 1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      p.id,
    ).toBe(true);
    await expect(
      page.locator(".notebook-prediction, .notebook-change"),
    ).toHaveCount(0);
    await expect(page.locator(".notebook-review")).not.toHaveAttribute(
      "open",
      "",
    );
    for (const cell of await page.locator("[data-cell]").all()) {
      expect(
        await cell
          .locator("textarea")
          .evaluate((el) => el.scrollHeight <= el.clientHeight + 1),
        p.id + " complete command visible",
      ).toBe(true);
      const editorBox = await cell.locator("textarea").boundingBox();
      const runBox = await cell
        .getByRole("button", { name: n.run, exact: true })
        .boundingBox();
      expect(
        runBox!.y - editorBox!.y - editorBox!.height,
        p.id + " command/run distance",
      ).toBeLessThan(180);
      const guide = cell.locator(".notebook-command-guide");
      if (await guide.count()) {
        expect(
          await cell.evaluate((el) =>
            Boolean(
              el
                .querySelector("textarea")!
                .compareDocumentPosition(
                  el.querySelector(".notebook-command-guide")!,
                ) & Node.DOCUMENT_POSITION_FOLLOWING,
            ),
          ),
        ).toBe(true);
      }
    }
    for (let i = 0; i < 5; i++)
      await page.getByRole("button", { name: /^Hints/ }).click();
    await expect(page.locator(".notebook-hints li")).toHaveCount(5);
  }
  expect(requests.some((u) => u.includes("/encoder/"))).toBe(false);
  await expect(page.locator(".notebook-native")).toContainText(n.nativeNote);
  await expect(page.locator(".notebook-native button")).toHaveCount(1);
});

test("cells preserve edited drafts and raw evidence, check actual outputs, and reject stale results", async ({
  page,
}, info) => {
  test.skip(!["desktop-light", "firefox"].includes(info.project.name));
  test.setTimeout(180000);
  await page.goto("./#/learn/first-edit/shorten");
  await expectPracticeReady(page);
  await expect(
    page.getByRole("button", { name: n.replaySource, exact: true }),
  ).toBeVisible();
  const cell = page.locator('[data-cell="first-edit/shorten:practice"]');
  const input = cell.locator("textarea");
  await input.fill("ffmpeg -i bunny-short.mp4 -t 4 own-cut.mp4");
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  await cell.getByRole("button", { name: n.check, exact: true }).click();
  await expect(cell.locator(".notebook-check")).toContainText("✗ Duration");
  await input.fill("ffmpeg -i bunny-short.mp4 -t 3 own-three.mp4");
  await expect(cell).toHaveAttribute("data-stale", "true");
  await expect(
    cell.getByRole("button", { name: n.check, exact: true }),
  ).toBeDisabled();
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  // Typing during execution must not be replaced when the run completes.
  await input.fill("ffmpeg -i bunny-short.mp4 -t 2 next-edit.mp4");
  await expect(cell).toContainText(n.last, { timeout: 120000 });
  await expect(input).toHaveValue(
    "ffmpeg -i bunny-short.mp4 -t 2 next-edit.mp4",
  );
  await expect(cell.locator(".notebook-last-command")).toContainText(
    "-t 3 own-three.mp4",
    { timeout: 120000 },
  );
  const download = page.waitForEvent("download");
  await cell
    .getByRole("button", { name: "Download own-three.mp4", exact: true })
    .click();
  const path = (await (await download).path())!;
  const probe = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_format", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
  expect(Number(probe.format.duration)).toBeCloseTo(3, 1);
  await page.reload();
  await expect(input).toHaveValue(
    "ffmpeg -i bunny-short.mp4 -t 2 next-edit.mp4",
  );
  await expect(cell).toHaveAttribute("data-stale", "true");
  await input.fill("ffmpeg -i bunny-short.mp4 -t 3 own-three.mp4");
  await expect(cell).toHaveAttribute("data-stale", "false");
  await cell.getByRole("button", { name: n.check, exact: true }).click();
  await expect(cell.locator(".notebook-check")).toContainText(n.passed, {
    timeout: 120000,
  });
  await expect(cell.locator(".notebook-log pre")).toContainText(
    "ffmpeg version",
  );
});

test("file management keeps collisions safe, text changes explicit, and ZIP paths intact", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  await page.addInitScript(() => {
    localStorage.setItem(
      "video-lab:course-command-draft",
      "ffprobe retained-earlier-source.mp4",
    );
  });
  await page.goto("./#/learn/first-edit/shorten");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await page.getByRole("button", { name: n.files, exact: true }).click();
  const dialog = page.locator("dialog.notebook-files");
  await dialog
    .locator("input[type=file]")
    .first()
    .setInputFiles({
      name: "original.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("keep original"),
    });
  await expect(
    dialog.getByRole("button", { name: "original.txt", exact: true }),
  ).toBeVisible();
  await dialog.locator(".notebook-file-options > summary").click();
  await dialog.getByRole("button", { name: n.newText, exact: true }).click();
  await dialog
    .getByRole("textbox", { name: n.name, exact: true })
    .fill("original.txt");
  await dialog.getByRole("button", { name: n.save, exact: true }).click();
  await expect(dialog.getByRole("alert")).toContainText("already exists");
  await dialog.getByRole("button", { name: n.keep, exact: true }).click();
  await dialog
    .getByRole("button", { name: "original.txt", exact: true })
    .click();
  await expect(
    dialog.getByRole("textbox", { name: n.editText, exact: true }),
  ).toHaveValue("keep original");
  await dialog
    .getByRole("textbox", { name: n.editText, exact: true })
    .fill("changed");
  await expect(
    dialog.getByRole("button", { name: n.earlierWork, exact: true }),
  ).toBeDisabled();
  await dialog.getByRole("button", { name: n.close, exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: n.discard, exact: true }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: n.keep, exact: true }).click();
  await dialog.getByRole("button", { name: n.save, exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: n.save, exact: true }),
  ).toBeDisabled();
  await dialog
    .getByLabel(`${n.moreActions}: original.txt`, { exact: true })
    .click();
  await dialog
    .getByRole("button", { name: `${n.rename} original.txt`, exact: true })
    .click();
  await dialog
    .getByRole("textbox", { name: n.name, exact: true })
    .fill("My notes/été.txt");
  await dialog
    .getByRole("button", { name: n.save, exact: true })
    .first()
    .click();
  await expect(
    dialog.getByRole("button", { name: "▸ My notes", exact: true }),
  ).toBeVisible();
  await dialog.locator(".notebook-file-options > summary").click();
  const downloading = page.waitForEvent("download");
  await dialog
    .getByRole("button", { name: n.downloadAll, exact: true })
    .click();
  const path = (await (await downloading).path())!;
  expect(
    execFileSync("unzip", ["-p", path, "My notes/été.txt"], {
      encoding: "utf8",
    }),
  ).toBe("changed");
  await dialog.getByRole("button", { name: n.close, exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: n.files, exact: true }).click();
  await dialog.getByRole("button", { name: "▸ My notes", exact: true }).click();
  await dialog.getByRole("button", { name: "été.txt", exact: true }).click();
  await expect(
    dialog.getByRole("textbox", { name: n.editText, exact: true }),
  ).toHaveValue("changed");
  await dialog
    .getByRole("button", { name: n.earlierWork, exact: true })
    .click();
  await expect(page).toHaveURL(/#\/earlier$/);
  await expect(
    page.getByRole("heading", { name: n.earlier, exact: true }),
  ).toBeVisible();
});

test("earlier files and drafts migrate without changing the archive; notebook storage errors remain explicit", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  await page.goto("./#/capture");
  await page
    .getByRole("button", { name: "Use practice video", exact: true })
    .click();
  await expect(page.locator(".cli-preview video")).toBeVisible();
  await page.goto("./#/inspect");
  const previous = "ffprobe -show_streams mousepad-demo.mp4";
  await page
    .getByRole("textbox", { name: "Command", exact: true })
    .fill(previous);
  await page.goto("./#/learn/first-edit/shorten");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  const hashes = await page.evaluate(async () => {
    async function read(db: string) {
      const d = await new Promise<IDBDatabase>((res, rej) => {
        const r = indexedDB.open(db, 1);
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
      const f = await new Promise<{ blob: Blob }>((res, rej) => {
        const q = d
          .transaction("files")
          .objectStore("files")
          .get("mousepad-demo.mp4");
        q.onsuccess = () => res(q.result);
        q.onerror = () => rej(q.error);
      });
      d.close();
      return [
        ...new Uint8Array(
          await crypto.subtle.digest("SHA-256", await f.blob.arrayBuffer()),
        ),
      ].join(",");
    }
    return [await read("video-lab-cli"), await read("video-lab-notebook")];
  });
  expect(hashes[0]).toBe(hashes[1]);
  await page.goto("./#/inspect");
  await expect(
    page.getByRole("textbox", { name: "Command", exact: true }),
  ).toHaveValue(previous);
  await page.addInitScript(() => {
    Object.defineProperty(window, "indexedDB", {
      get() {
        throw new DOMException("Test unavailable storage", "SecurityError");
      },
    });
  });
  await page.goto("./#/learn/first-edit/shorten");
  await page.reload();
  await expect(page.locator(".notebook-workspace-status")).toContainText(
    n.sessionOnly,
  );
  const editor = page.locator(
    '[data-cell="first-edit/shorten:worked:0"] textarea',
  );
  await editor.fill("ffprobe own-file.mp4");
  await page.reload();
  await expect(editor).toHaveValue("ffprobe own-file.mp4");
  await expect(page.locator(".notebook-workspace-status")).toContainText(
    n.sessionOnly,
  );
  await page
    .locator(".notebook-toolbar")
    .getByRole("link", { name: n.overview, exact: true })
    .click();
  await expect(page.locator(".notebook-toolbar")).toHaveCount(0);
  await expect(page.locator(".notebook-workspace-status")).not.toHaveClass(
    /sr-only/,
  );
  await expect(page.locator(".notebook-workspace-status")).toContainText(
    n.sessionOnly,
  );
});

test("inspection checks stay visible for unchanged evidence and failed runs never show success notes", async ({
  page,
}, info) => {
  test.skip(!["desktop-light", "firefox"].includes(info.project.name));
  test.setTimeout(120000);
  await page.goto("./#/learn/inside-video/inspect");
  await expectPracticeReady(page);
  await expect(
    page.getByRole("button", { name: n.replaySource, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: n.replaySource, exact: true }).click();
  await page
    .locator(".notebook-source-choices")
    .getByRole("button", { name: "bunny-action.mp4", exact: true })
    .click();
  await expect(page.locator(".notebook-source > code")).toHaveText(
    "bunny-action.mp4",
  );
  await expect(page.locator(".notebook-source-preview > strong")).toHaveText(
    "bunny-action.mp4",
  );
  const cell = page.locator('[data-cell="inside-video/inspect:practice"]');
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  await cell.getByRole("button", { name: n.check, exact: true }).click();
  await expect(cell.locator(".notebook-check")).toContainText(n.passed);
  // Wait beyond asynchronous Blob hashing/file refresh, which previously erased feedback.
  await page.waitForTimeout(750);
  await expect(cell.locator(".notebook-check")).toContainText(n.passed);
  await cell.locator("textarea").fill("ffprobe missing.mp4");
  await expect(
    cell.getByRole("button", { name: n.check, exact: true }),
  ).toBeDisabled();
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.failed, {
    timeout: 120000,
  });
  await expect(cell.locator(".notebook-runtime-note")).toHaveCount(0);
  await expect(cell.locator(".notebook-check")).not.toContainText(n.passed);
});

test("subtitles render visible lettering with the supplied font in the actual WASM output", async ({
  page,
}, info) => {
  test.skip(!["desktop-light", "firefox"].includes(info.project.name));
  test.setTimeout(120000);
  await page.goto("./#/learn/text/subtitles");
  await expectPracticeReady(page);
  await expect(
    page.getByRole("button", { name: n.replaySource, exact: true }),
  ).toBeVisible();
  const cell = page.locator('[data-cell="text/subtitles:worked:0"]');
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  const downloading = page.waitForEvent("download");
  await cell
    .getByRole("button", { name: "Download subtitled.mp4", exact: true })
    .click();
  const path = (await (await downloading).path())!;
  function cueBand(file: string) {
    const bytes = execFileSync("ffmpeg", [
      "-v",
      "error",
      "-ss",
      "1.5",
      "-i",
      file,
      "-frames:v",
      "1",
      "-vf",
      "crop=640:50:100:425,format=gray",
      "-f",
      "rawvideo",
      "-",
    ]);
    return {
      dark: [...bytes].filter((p) => p < 30).length,
      white: [...bytes].filter((p) => p > 230).length,
    };
  }
  // This supplied frame has no dark pixels in the cue band. Rendering must add
  // black glyph outlines and white lettering; a decodable uncaptioned MP4 fails.
  const before = cueBand("public/media/notebook/bunny-short.mp4"),
    after = cueBand(path);
  expect(after.dark - before.dark).toBeGreaterThan(1000);
  expect(after.white - before.white).toBeGreaterThan(500);
});

test("optional notes preserve earlier predictions and reviews without adding required forms", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop-light");
  await page.goto("./#/learn/first-edit/shorten");
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("video-lab-notebook", 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("cells", "readwrite");
      tx.objectStore("cells").put({
        id: "first-edit/shorten:notes",
        command: "",
        prediction: "My earlier prediction",
        review: "My saved review",
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  });
  await page.reload();
  await expect(page.locator(".notebook-review")).not.toHaveAttribute(
    "open",
    "",
  );
  await page.getByText(n.notes, { exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: n.previousPrediction, exact: true }),
  ).toHaveValue("My earlier prediction");
  const notes = page.getByRole("textbox", { name: n.notesLabel, exact: true });
  await expect(notes).toHaveValue("My saved review");
  await notes.fill("My revised observation");
  await expectSavedCell(page, "first-edit/shorten:notes", {
    review: "My revised observation",
  });
  await page.reload();
  await page.getByText(n.notes, { exact: true }).click();
  await expect(notes).toHaveValue("My revised observation");
  await expect(
    page.getByRole("textbox", { name: n.previousPrediction, exact: true }),
  ).toHaveValue("My earlier prediction");
  await page.goto("./#/learn/first-edit/start");
  await expectPracticeReady(page);
  await expect(page.locator(".notebook-cut-plan figcaption")).toHaveText(
    "Planned cut · 2–6 s (4 s)",
  );
});

test("a planned cut follows the editor while real output stays next to Run", async ({
  page,
}, info) => {
  test.skip(
    !["desktop-light", "phone-light", "firefox"].includes(info.project.name),
  );
  test.setTimeout(180000);
  await page.goto("./#/learn/first-edit/shorten");
  const cell = page.locator('[data-cell="first-edit/shorten:worked:0"]');
  const editor = cell.locator("textarea");
  const plan = cell.locator(".notebook-cut-plan");
  await expectPracticeReady(page);
  await expect(plan).toContainText("Planned cut · 0–5 s (5 s)");
  await editor.fill("ffmpeg -i bunny-short.mp4 -ss 6 -t 5 tail.mp4");
  await expect(plan).toContainText("Planned cut · 6–8 s (2 s)");
  for (const command of [
    "ffmpeg -i missing.mp4 -t 3 output.mp4",
    "ffmpeg -i bunny-short.mp4 -t 3 -c copy output.mp4",
    'ffmpeg -i "unfinished',
    "ffmpeg -i bunny-short.mp4 -ss 8 -t 3 output.mp4",
  ]) {
    await editor.fill(command);
    await expect(plan).toHaveCount(0);
  }
  await editor.fill("ffmpeg -i bunny-short.mp4 -t 3 readable.mp4");
  await expect(plan).toContainText("Planned cut · 0–3 s (3 s)");
  expect(
    await cell.evaluate((el) =>
      Boolean(
        el
          .querySelector(".notebook-cut-plan")!
          .compareDocumentPosition(el.querySelector("textarea")!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ),
  ).toBe(true);
  await cell.getByRole("button", { name: n.run, exact: true }).click();
  await expect(cell.locator("[role=status]").first()).toHaveText(n.done, {
    timeout: 120000,
  });
  await expect(cell.locator(".notebook-log pre")).toContainText(
    "ffmpeg version",
  );
  await expect(cell.locator(".notebook-cell-result video")).toBeVisible();
  expect(
    await cell.evaluate((el) => {
      const actions = el.querySelector(".notebook-cell-actions")!;
      const output = el.querySelector(".notebook-log")!;
      const guide = el.querySelector(".notebook-command-guide")!;
      return (
        Boolean(
          actions.compareDocumentPosition(output) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ) &&
        Boolean(
          output.compareDocumentPosition(guide) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ) &&
        !Array.from(el.children)
          .slice(
            Array.from(el.children).indexOf(actions) + 1,
            Array.from(el.children).indexOf(output),
          )
          .some((node) =>
            node.matches(
              ".notebook-command-guide, .notebook-diagram, .notebook-observation",
            ),
          )
      );
    }),
  ).toBe(true);
  const videoDuration = await cell
    .locator("video")
    .evaluate((video: HTMLVideoElement) => video.duration);
  expect(videoDuration).toBeCloseTo(3, 1);
  await editor.fill("ffmpeg -i bunny-short.mp4 -t 2 next.mp4");
  await expect(plan).toContainText("Planned cut · 0–2 s (2 s)");
  await expect(cell.locator(".notebook-last-command")).toContainText(
    "-t 3 readable.mp4",
  );
  await page.reload();
  await expect(plan).toContainText("Planned cut · 0–2 s (2 s)");
  await expect(cell.locator(".notebook-last-command")).toContainText(
    "-t 3 readable.mp4",
  );

  // A known filename with replaced bytes must not inherit the fixture's duration.
  await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const r = indexedDB.open("video-lab-notebook", 1);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("files", "readwrite");
      const store = tx.objectStore("files");
      const get = store.get("bunny-short.mp4");
      get.onsuccess = () =>
        store.put({ ...get.result, blob: new Blob(["different media bytes"]) });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  });
  await page.reload();
  await expect(page.locator("[data-notebook-ready]")).toHaveAttribute(
    "data-notebook-ready",
    "true",
  );
  await expect(plan).toHaveCount(0);
});
