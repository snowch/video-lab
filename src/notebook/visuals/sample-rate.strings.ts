// Copyright © 2026 Christopher Snow
// Drafted separately from docs/notes/tone-frequency/01-plan.md.
export const sampleRateStrings = {
  caption: "Tone frequency and sample rate",
  frequencyHeading: "1. Count cycles: tone frequency",
  valueExplanation:
    "A microphone converts sound into a changing electrical signal. Here, the curve’s height shows a relative signal value: positive above zero and negative below it. Zero marks the resting level. The height is not a loudness scale.",
  frequencyIntroduction:
    "A steady tone can be represented by a repeating wave. Its frequency counts complete repeats per second, measured in hertz (Hz). For these tones, more repeats per second means a higher pitch.",
  cycleExplanation:
    "One cycle is a complete repeat of the wave. The bracket starts where the curve passes upwards through zero and ends when it does that again.",
  cycleLabel: "One cycle",
  frequencyLabel: (frequency: number): string =>
    `${frequency.toLocaleString("en-GB")} Hz`,
  frequencyOption: (frequency: 500 | 1_000): string =>
    `${frequency.toLocaleString("en-GB")} Hz · ${frequency === 500 ? "lower pitch" : "higher pitch"}`,
  frequencySummary: (frequency: number, cycles: number): string =>
    `${cycles} cycles in 4 ms. This tone completes ${frequency.toLocaleString("en-GB")} cycles per second.`,
  frequencyTimeLabels: ["0 ms", "1 ms", "2 ms", "3 ms", "4 ms"] as const,
  frequencyInstruction:
    "Both plots cover the same 4 milliseconds (4 ms = 0.004 seconds) and reach the same height. The 1,000 Hz tone fits twice as many cycles into that time.",
  frequencyLimitation:
    "These are invented, single-frequency tones, not the practice recording. Real recordings can contain many frequencies and need not have one repeating shape.",
  playTone: (frequency: number): string =>
    `Play ${frequency.toLocaleString("en-GB")} Hz tone`,
  playingTone: (frequency: number): string =>
    `Playing ${frequency.toLocaleString("en-GB")} Hz tone.`,
  startingTone: (frequency: number): string =>
    `Starting ${frequency.toLocaleString("en-GB")} Hz tone…`,
  stopTone: "Stop tone",
  playbackNote:
    "Each button generates a one-second tone, with a short fade at each end. Playback lasts longer than the four-millisecond plot; it is not audio taken from the practice video. The sample-rate control below changes the diagram, not this playback.",
  playbackError:
    "Tone playback is unavailable in this browser. You can still compare the cycles in the plots.",
  samplingHeading: "2. Count measurements: sample rate",
  fixedModel:
    "Now zoom in from 4 ms to 2 ms and keep the 1,000 Hz tone fixed. Two complete cycles fit in this shorter interval (2 ms = 0.002 seconds).",
  samplingExplanation:
    "Sampling records the signal’s value as a number at regular instants. Each dot is one sample. Counting the dots counts measurements, not cycles.",
  rateDistinction:
    "Tone frequency counts cycles per second. Sample rate counts measurements per second in each channel. Both can be labelled Hz, so check which rate a number describes.",
  channelNote:
    "This model shows one channel. Stereo has two channels, each with its own sequence of values at the stated sample rate.",
  rateLabel: "Samples per second",
  timeAxisLabel: "Time",
  valueAxisLabel: "Relative signal value",
  curveLegend: "Curve: invented signal",
  dotsLegend: "Dots: sample values",
  instruction:
    "Increase the rate: dots move closer together while the curve and its two cycles stay fixed. Samples start at 0 ms and stop before 2 ms.",
  limitation:
    "These low sample rates make the dots easy to see; they are not suggested export settings. The practice source has 48,000 samples/s per channel.",
  summary: (rate: number, count: number, spacingMs: number): string =>
    `${rate.toLocaleString("en-GB")} samples/s · ${count} samples in 2 ms · ${spacingMs} ms between samples.`,
  timeLabels: ["0 ms", "1 ms", "2 ms"] as const,
  valueLabels: ["+1", "0", "−1"] as const,
  rateOption: (rate: number): string => rate.toLocaleString("en-GB"),
  reasoningHeading: "Predict a resample",
  reasoningQuestion:
    "A one-second, 500 Hz tone is resampled from 12,000 to 24,000 samples per second in each channel. What happens to its cycles and stored values?",
  reasoningPrompt: "Choose a prediction, then check it.",
  reasoningOptions: [
    {
      id: "correct",
      label:
        "500 cycles before and after; 12,000 then 24,000 values per channel.",
    },
    {
      id: "pitch",
      label: "500 then 1,000 cycles; 12,000 then 24,000 values per channel.",
    },
    {
      id: "unchanged",
      label:
        "500 cycles before and after; 12,000 values per channel before and after.",
    },
  ] as const,
  reasoningReveal: "Check prediction",
  reasoningFeedback: (choice: "correct" | "pitch" | "unchanged"): string =>
    ({
      correct:
        "Yes. The tone still completes 500 cycles in the same second. Each channel now stores 24,000 values instead of 12,000, describing the same tone at more closely spaced instants.",
      pitch:
        "1,000 cycles in one second would mean a higher-pitched tone. Resampling changes the measurements, not how quickly this tone repeats: it still completes 500 cycles. Each channel now stores 24,000 values instead of 12,000.",
      unchanged:
        "The 500 cycles stay the same, but the number of stored values changes. At 24,000 samples per second, each channel needs 24,000 values for this one-second interval, rather than 12,000.",
    })[choice],
};
