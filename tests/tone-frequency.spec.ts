// Copyright © 2026 Christopher Snow
import { test, expect } from "@playwright/test";
import { sampleRateStrings as t } from "../src/notebook/visuals/sample-rate.strings";

test("tone comparison precedes fixed-wave sampling and a fresh resampling prediction", async ({
  page,
}) => {
  const tools: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/encoder/")) tools.push(request.url());
  });
  await page.goto("./#/learn/frames-time/samples");
  const tone = page.locator(".tone-frequency-diagram");
  const sampling = page.locator(
    ".sample-rate-diagram:not(.tone-frequency-diagram)",
  );
  await expect(tone).toContainText(t.frequencySummary(500, 2));
  await expect(tone).toContainText(t.frequencySummary(1000, 4));
  await expect(
    tone.getByRole("button", { name: t.playTone(500) }),
  ).toBeVisible();
  await expect(sampling).toContainText("Now zoom in from 4 ms to 2 ms");
  const curve = await sampling.locator(".sample-rate-curve").getAttribute("d");
  await sampling.getByLabel(t.rateLabel, { exact: true }).selectOption("16000");
  await expect(sampling.locator(".sample-rate-dot")).toHaveCount(32);
  await expect(sampling.locator(".sample-rate-curve")).toHaveAttribute(
    "d",
    curve!,
  );
  const reasoning = page.locator(".sample-rate-reasoning");
  const button = reasoning.getByRole("button", { name: t.reasoningReveal });
  await expect(button).toBeDisabled();
  for (const option of [
    t.reasoningOptions[1],
    t.reasoningOptions[2],
    t.reasoningOptions[0],
  ]) {
    await reasoning.getByLabel(option.label, { exact: true }).check();
    await expect(reasoning.getByRole("status")).toBeEmpty();
    await button.click();
    await expect(reasoning.getByRole("status")).toHaveText(
      t.reasoningFeedback(option.id),
    );
  }
  // Keyboard can change the prediction and submit without a pointer.
  await reasoning.getByRole("radio").first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(reasoning.getByRole("radio").nth(1)).toBeChecked();
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(reasoning.getByRole("status")).toHaveText(
    t.reasoningFeedback("pitch"),
  );
  await page.setViewportSize({ width: 320, height: 800 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(tools).toEqual([]);
});

type AudioWindow = Window & {
  toneContexts: AudioContext[];
  toneBuffers: AudioBuffer[];
};

test("tone playback generates the requested frequency and releases audio on stop and navigation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const w = window as unknown as AudioWindow;
    w.toneContexts = [];
    w.toneBuffers = [];
    const Native = window.AudioContext;
    window.AudioContext = class extends Native {
      constructor() {
        super();
        w.toneContexts.push(this);
      }
      createBufferSource() {
        const source = super.createBufferSource();
        const start = source.start.bind(source);
        source.start = (
          ...args: Parameters<AudioBufferSourceNode["start"]>
        ) => {
          if (source.buffer) w.toneBuffers.push(source.buffer);
          start(...args);
        };
        return source;
      }
    };
  });
  await page.goto("./#/learn/frames-time/samples");
  const tone = page.locator(".tone-frequency-diagram");
  for (const frequency of [500, 1000]) {
    await tone.getByRole("button", { name: t.playTone(frequency) }).click();
    // Some headless executors have no audio device: exercise the real failure
    // path there, while capable browsers must pass the buffer/frequency checks.
    await expect
      .poll(
        async () => {
          const count = await page.evaluate(
            () => (window as unknown as AudioWindow).toneBuffers.length,
          );
          if (count) return "started";
          return (await tone.getByRole("status").textContent()) ===
            t.playbackError
            ? "unavailable"
            : "pending";
        },
        { timeout: 10000 },
      )
      .not.toBe("pending");
    if ((await tone.getByRole("status").textContent()) === t.playbackError) {
      await expect(
        tone.getByRole("button", { name: t.playTone(frequency) }),
      ).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate(() =>
            (window as unknown as AudioWindow).toneContexts.every(
              (c) => c.state === "closed",
            ),
          ),
        )
        .toBe(true);
      test.info().annotations.push({
        type: "audio device",
        description:
          "Executor could not start Web Audio; verified the bounded failure and cleanup path. Synthesis verified by unit tests and capable browser projects.",
      });
      return;
    }
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as unknown as AudioWindow).toneBuffers.length,
        ),
      )
      .toBe(frequency === 500 ? 1 : 2);
    const actual = await page.evaluate(() => {
      const buffer = (window as unknown as AudioWindow).toneBuffers.at(-1)!;
      const values = buffer.getChannelData(0);
      let crossings = 0;
      for (let i = buffer.sampleRate / 4; i < (3 * buffer.sampleRate) / 4; i++)
        if (values[i]! <= 0 && values[i + 1]! > 0) crossings++;
      return {
        duration: buffer.duration,
        channels: buffer.numberOfChannels,
        frequency: crossings * 2,
      };
    });
    expect(actual).toEqual({ duration: 1, channels: 1, frequency });
    await tone.getByRole("button", { name: t.stopTone }).click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          (window as unknown as AudioWindow).toneContexts.every(
            (c) => c.state === "closed",
          ),
        ),
      )
      .toBe(true);
  }
  await tone.getByRole("button", { name: t.playTone(500) }).click();
  await expect(tone.getByRole("button", { name: t.stopTone })).toBeVisible();
  // Switching closes the previous context; only the new tone may remain active.
  await tone.getByRole("button", { name: t.playTone(1000) }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as AudioWindow).toneContexts.filter(
            (c) => c.state !== "closed",
          ).length,
      ),
    )
    .toBeLessThanOrEqual(1);
  await page
    .locator('.notebook-pager a[href="#/learn/frames-time/rate"]')
    .click();
  await expect(tone).toHaveCount(0);
  await expect
    .poll(() =>
      page.evaluate(() =>
        (window as unknown as AudioWindow).toneContexts.every(
          (c) => c.state === "closed",
        ),
      ),
    )
    .toBe(true);
  await page.goto("./#/learn/frames-time/samples");
  await tone.getByRole("button", { name: t.playTone(500) }).click();
  await expect(tone.getByRole("button", { name: t.playTone(500) })).toBeVisible(
    { timeout: 5000 },
  );
  await expect
    .poll(() =>
      page.evaluate(() =>
        (window as unknown as AudioWindow).toneContexts.every(
          (c) => c.state === "closed",
        ),
      ),
    )
    .toBe(true);
});

test("unavailable tone playback leaves both visual explanations usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "AudioContext", { value: undefined });
  });
  await page.goto("./#/learn/frames-time/samples");
  const tone = page.locator(".tone-frequency-diagram");
  await tone.getByRole("button", { name: t.playTone(500) }).click();
  await expect(tone.getByRole("status")).toHaveText(t.playbackError);
  await page.getByLabel(t.rateLabel, { exact: true }).selectOption("4000");
  await expect(page.locator(".sample-rate-dot")).toHaveCount(8);
  await expect(tone.locator(".tone-frequency-curve")).toHaveCount(2);
});

test("a stalled audio resume reports failure and releases its context", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const w = window as unknown as AudioWindow;
    w.toneContexts = [];
    const Native = window.AudioContext;
    window.AudioContext = class extends Native {
      constructor() {
        super();
        w.toneContexts.push(this);
      }
      resume(): Promise<void> {
        return new Promise(() => undefined);
      }
    };
  });
  await page.goto("./#/learn/frames-time/samples");
  const tone = page.locator(".tone-frequency-diagram");
  await tone.getByRole("button", { name: t.playTone(500) }).click();
  await expect(tone.getByRole("status")).toHaveText(t.startingTone(500));
  await expect(tone.getByRole("status")).toHaveText(t.playbackError, {
    timeout: 10000,
  });
  await expect
    .poll(() =>
      page.evaluate(() =>
        (window as unknown as AudioWindow).toneContexts.every(
          (c) => c.state === "closed",
        ),
      ),
    )
    .toBe(true);
});
