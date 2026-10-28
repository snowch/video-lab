// Copyright © 2026 Christopher Snow
import { test, expect, type Page, type Locator } from "@playwright/test";
import { expectPracticeReady } from "./notebook-storage";
import { command } from "./cli-helpers";
import C from "../src/workbench/strings.json" with { type: "json" };

const height = (output: Locator) =>
  output.evaluate((el) => (el as HTMLElement).offsetHeight);

async function exercise(page: Page, output: Locator, handle: Locator) {
  const original = await output.textContent();
  expect(original).toContain("Video:");
  await expect(handle).toHaveAttribute(
    "aria-controls",
    (await output.getAttribute("id"))!,
  );
  await expect(handle).toHaveAccessibleDescription(/Arrow Up\/Down/);
  await handle.focus();
  await handle.press("Home");
  const minimum = await height(output);
  await handle.press("ArrowDown");
  await expect.poll(() => height(output)).toBe(minimum + 32);
  await handle.press("ArrowUp");
  await expect.poll(() => height(output)).toBe(minimum);
  await handle.press("PageDown");
  await expect.poll(() => height(output)).toBe(minimum + 128);
  await handle.press("PageUp");
  await expect.poll(() => height(output)).toBe(minimum);
  await handle.press("End");
  await expect.poll(() => height(output)).toBe(1200);
  await handle.press("ArrowDown");
  await expect.poll(() => height(output)).toBe(1200);
  await handle.press("Home");
  await handle.press("ArrowUp");
  await expect.poll(() => height(output)).toBe(minimum);
  await handle.scrollIntoViewIfNeeded();
  const box = (await handle.boundingBox())!;
  const x = box.x + box.width / 2,
    y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  // Leaving the handle horizontally still resizes until release.
  await page.mouse.move(2, y + 70, { steps: 5 });
  await page.mouse.up();
  await expect.poll(() => height(output)).toBe(minimum + 70);
  await page.mouse.move(x, y + 100);
  await expect.poll(() => height(output)).toBe(minimum + 70);
  await expect(output).toHaveText(original!);
  await expect(handle).toHaveAttribute("aria-valuenow", String(minimum + 70));
  await expect
    .poll(() => output.evaluate((el) => el.scrollWidth > el.clientWidth))
    .toBe(true);
  await output.evaluate((el) => {
    el.scrollLeft = 100;
    el.scrollTop = 60;
  });
  expect(await output.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  expect(await output.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  return minimum + 70;
}

async function notebook(page: Page) {
  await page.goto("./#/learn/inside-video/inspect");
  await expectPracticeReady(page);
  const cell = page.locator("[data-cell]").first();
  const run = async () => {
    await cell
      .getByRole("button", { name: "Run command", exact: true })
      .click();
    await expect(cell.locator('p[role="status"]').first()).toHaveText(
      "Command completed",
      { timeout: 60000 },
    );
  };
  await run();
  return {
    cell,
    run,
    output: cell.locator(".notebook-log pre"),
    handle: cell.getByRole("separator", { name: "Resize output" }),
  };
}

test("notebook output resizes without changing logs, wrapping, drafts or rerun height", async ({
  page,
}) => {
  test.setTimeout(90000);
  const { cell, run, output, handle } = await notebook(page);
  const size = await exercise(page, output, handle);
  const draft = await cell.locator("textarea").inputValue();
  const original = await output.textContent();
  await cell.getByRole("checkbox", { name: "Wrap output" }).check();
  await expect.poll(() => height(output)).toBe(size);
  await expect(output).toHaveText(original!);
  await cell.getByRole("checkbox", { name: "Wrap output" }).uncheck();
  await run();
  await expect.poll(() => height(output)).toBe(size);
  await expect(cell.locator("textarea")).toHaveValue(draft);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  await handle.scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(handle).toBeVisible();
});

test("reference workspace uses the same resizing and retains height on rerun", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto("./#/module-0");
  await command(page, "reference inspect");
  await command(page, "ffprobe reference-inspect.mp4");
  const output = page.locator("#cli-output");
  const handle = page.getByRole("separator", { name: "Resize output" });
  const size = await exercise(page, output, handle);
  await page.getByRole("button", { name: "Wrap lines", exact: true }).click();
  await expect.poll(() => height(output)).toBe(size);
  await command(page, "ffprobe reference-inspect.mp4");
  await expect.poll(() => height(output)).toBe(size);
});

test("optional workbench keeps output height while rerunning real ffprobe", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto("optional/command-workbench.html");
  await page
    .getByRole("button", { name: C.source.sample, exact: true })
    .click();
  await page.getByRole("button", { name: C.source.next + " →" }).click();
  const run = async () => {
    await page
      .getByRole("button", { name: C.live.run + " →", exact: true })
      .click();
    await expect(page.locator("main p.status")).toHaveText(C.live.finished, {
      timeout: 60000,
    });
  };
  await run();
  const output = page.getByLabel(C.live.logs, { exact: true });
  const handle = page.getByRole("separator", { name: "Resize output" });
  const size = await exercise(page, output, handle);
  await page.getByRole("button", { name: C.command.wrap, exact: true }).click();
  await expect.poll(() => height(output)).toBe(size);
  await run();
  await expect.poll(() => height(output)).toBe(size);
  await page
    .getByRole("button", { name: C.command.manual, exact: true })
    .click();
  await page
    .getByRole("textbox", { name: C.command.heading, exact: true })
    .fill(
      "ffprobe -v error -show_streams -show_format -of json mousepad-demo.mp4",
    );
  await run();
  const report = page.getByLabel(C.command.outputLabel, { exact: true });
  const reportHandle = report.locator("../..").getByRole("separator");
  await reportHandle.press("End");
  expect(JSON.parse((await report.textContent())!).streams[0].codec_name).toBe(
    "h264",
  );
  await run();
  await expect.poll(() => height(report)).toBe(1200);
  // Separate output/log regions retain separate sizes and target associations.
  expect(await report.getAttribute("id")).not.toBe(
    await output.getAttribute("id"),
  );
});

test("touch resize captures dragging, cancels cleanly and leaves page scrolling available", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium" || !test.info().project.use.isMobile,
    "Touch input is exercised in the phone Chromium projects.",
  );
  test.setTimeout(90000);
  const { output, handle } = await notebook(page);
  await handle.press("Home");
  await handle.scrollIntoViewIfNeeded();
  const session = await context.newCDPSession(page);
  const box = (await handle.boundingBox())!;
  const x = box.x + box.width / 2,
    y = box.y + box.height / 2;
  const before = await height(output);
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: 2, y: y + 70 }],
  });
  await expect.poll(() => height(output)).toBe(before + 70);
  await session.send("Input.dispatchTouchEvent", {
    type: "touchCancel",
    touchPoints: [],
  });
  await page.mouse.move(x, y + 100);
  await expect.poll(() => height(output)).toBe(before + 70);
  const scrollBefore = await page.evaluate(() => scrollY);
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 5, y: 500 }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: 5, y: 350 }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(scrollBefore);
  await expect.poll(() => height(output)).toBe(before + 70);
  await session.detach();
});
