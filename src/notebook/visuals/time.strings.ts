// Copyright © 2026 Christopher Snow
// Figure copy drafted separately from the verified time-facts.md brief.
export const timeText = {
  frameCaption: "Frame-rate model: fewer pictures in the same second",
  frameSource: (rate: number) => `${rate} pictures per second · source rate`,
  frameReduced: (rate: number) => `${rate} pictures per second · example rate`,
  frameNote:
    "Each dot marks a picture’s presentation time. Fewer pictures leave larger gaps within the same second.",
  frameSourceNote: (file: string) =>
    `The upper row models the rate recorded for ${file}; the lower models 12 pictures per second. Neither row measures your edited output.`,
  timestampCaption: "Source clock: convert ticks to seconds",
  timestampNote:
    "Multiply a timestamp’s tick count by the time base to find its time in seconds.",
  tickCount: (ticks: number) => `${ticks} ticks`,
  seconds: (seconds: number) => `${seconds} s`,
  timeBase: (base: string) => `${base} second per tick`,
  timestampResult: (ticks: number, base: string, rate: number) =>
    `${ticks} × ${base} s = 1/${rate} s ≈ ${(1 / rate).toFixed(6)} s`,
  timestampSourceNote: (file: string) =>
    `One recorded video picture interval from ${file}. A tick is a clock unit, distinct from a picture.`,
  timestampPicture: "Picture presentation times",
  levelCaption: "Amplitude model: scale values and keep their timing",
  levelBefore: "Before · multiplier 1",
  levelAfter: (gain: number) => `After · multiplier ${gain}`,
  levelAxis: "Relative amplitude · same scale in both rows",
  levelTime: "Time moves left to right; both rows cover the same interval.",
  gainLabel: "Amplitude multiplier",
  gainValue: (gain: number) => `${gain} times the original sample value`,
  levelNote:
    "This invented signal models multiplication. Adjust the multiplier: heights change while sample positions stay fixed. Half the amplitude does not mean half the perceived loudness.",
  levelSourceNote: (rate: number) =>
    `The supplied source has ${rate.toLocaleString("en-GB")} samples per second per channel. This model uses fewer points to make the operation visible.`,
  fadeCaption: "Fade model: the multiplier changes through time",
  fadeAxis: "Amplitude multiplier",
  fadeFull: "1",
  fadeSilent: "0",
  fadeStart: (start: number) => `Fade starts at ${start} s`,
  fadeDuration: (duration: number) => `Fade lasts ${duration} s`,
  fadeNote:
    "The multiplier stays at 1 until second 5, then falls linearly to 0 at second 8. This models gain; the sound’s waveform and perceived loudness can vary. The clip still lasts eight seconds.",
  fadeCommand: "afade=t=out:st=5:d=3",
  cueCaption: "Supplied subtitle cues on the source timeline",
  cue: (index: number) => `Cue ${index}`,
  cueInterval: (start: number, end: number) => `${start}–${end} s`,
  cueSource: (file: string) => `Example file: ${file}`,
  cueEmpty: "No cue",
  cueNote:
    "Cue 2 replaces cue 1 at second 3 and ends at second 6. The source continues to second 8. This shows the supplied cue file; editing it changes your next render, rather than this figure.",
};
