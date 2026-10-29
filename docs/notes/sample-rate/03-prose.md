# Chapter 3: paired definitions and audio sampling figure

Copyright © 2026 Christopher Snow.

Drafted separately from `/workspace/scratch/sample-rate/facts.md`, with the existing Chapter 3 copy and `src/notebook/visuals/time.strings.ts` as context. These are proposed strings, not product edits or a built-page review.

## Two headings and two concept paragraphs

Render in this order: Frame rate heading → first paragraph → existing frame-rate figure → Audio sample rate heading → second paragraph → new audio sampling figure. Keep the existing FFmpeg worked example, practice and all their supporting copy intact.

```ts
const conceptHeadings = ["Frame rate", "Audio sample rate"];

const concept = [
  "Frame rate is the number of video pictures presented per second, measured in frames per second (fps). At a constant 24 fps, each picture occupies 1/24 of a second. Showing fewer pictures across the same interval leaves larger jumps in movement; it need not shorten the scene.",
  "Audio sample rate is the number of signal values stored per second for each audio channel. A sample is one value at one instant; a channel is one sequence of sound values, such as the left or right side of stereo. The source’s `48000 Hz` means 48,000 samples per second in each channel. Here, hertz (Hz) means samples per second. This counts sound values rather than video pictures.",
];
```

## Proposed `sample-rate.strings.ts`

Render `valueExplanation` followed by `fixedModel` in one introductory paragraph before the graph and its vertical label. Keep all copy in visible HTML; `summary` is the single changing polite status. The figure’s SVG may then be `aria-hidden`, as in the existing figures. Use three text blocks: model introduction, instruction, limitation; keep the summary adjacent to the control. Remove samples-per-cycle from the summary interface to avoid an extra concept in the changing readout.

```ts
// Copyright © 2026 Christopher Snow
export const sampleRateStrings = {
  caption: "Sample-rate model: more measurements in the same time",
  rateLabel: "Samples per second",
  timeAxisLabel: "Time",
  valueAxisLabel: "Relative signal value",
  fixedModel:
    "The signal repeats 1,000 times per second. Two complete repeats, or cycles, fit in 2 milliseconds (2 ms = 0.002 seconds).",
  curveLegend: "Curve: invented signal",
  dotsLegend: "Dots: sample values",
  instruction:
    "Increase the rate: dots move closer together while the curve and its two cycles stay fixed. Samples start at 0 ms and stop before 2 ms.",
  limitation:
    "This invented one-channel signal is not the source recording. Lower rates keep the dots visible; they are not suggested export settings. The source has 48,000 samples/s per channel.",
  valueExplanation:
    "For example, a microphone converts sound into a changing electrical signal. Sampling records its value as a number at regular instants. Here, the curve’s height shows that value: positive or negative on opposite sides of a resting level, marked zero. Each dot is one sample.",
  summary: (
    rate: number,
    count: number,
    spacingMs: number,
  ): string =>
    `${rate.toLocaleString("en-GB")} samples/s · ${count} samples in 2 ms · ${spacingMs} ms between samples.`,
  timeLabels: ["0 ms", "1 ms", "2 ms"] as const,
  rateOption: (rate: number): string =>
    `${rate.toLocaleString("en-GB")} samples/s`,
};
```

The three options are 4,000, 8,000 and 16,000 samples/s; initialise to 8,000. Summary arguments are respectively `(4000, 8, 0.25)`, `(8000, 16, 0.125)` and `(16000, 32, 0.0625)`. Label the vertical scale +1, 0 and −1 if showing numerical ticks. Keep the curve fixed and draw the dots independently; the prose does not imply that joining dots reconstructs sound.

All graph substance has a visible text equivalent: signed vertical values and their meaning, fixed two-cycle/2-ms signal, dot meaning, selected rate/count/spacing, and interval boundaries. No playback, sound-quality comparison, extra exercise or unexplained amplitude terminology is introduced.

## R1 revision

Following the independent reader and sceptic finding, `valueExplanation` now gives a concrete microphone example before explaining signed model heights. The example describes recording without claiming that this invented curve was recorded. Zero denotes the model’s resting reference level, not proof of silence at an isolated instant. `fixedModel` remains unchanged. This is proposed copy only; no product files were edited by this drafter.
