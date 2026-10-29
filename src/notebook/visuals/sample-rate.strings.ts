// Copyright © 2026 Christopher Snow
// Drafted separately from docs/notes/sample-rate/02-facts.md.
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
  summary: (rate: number, count: number, spacingMs: number): string =>
    `${rate.toLocaleString("en-GB")} samples/s · ${count} samples in 2 ms · ${spacingMs} ms between samples.`,
  timeLabels: ["0 ms", "1 ms", "2 ms"] as const,
  valueLabels: ["+1", "0", "−1"] as const,
  rateOption: (rate: number): string => rate.toLocaleString("en-GB"),
};
