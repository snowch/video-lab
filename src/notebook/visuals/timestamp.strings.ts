// Copyright © 2026 Christopher Snow
// Separately drafted from the verified timestamp visual brief.
export const timestampText = {
  caption: "Picture times and clock ticks",
  overviewTitle: "One video timeline, two units",
  overviewNote:
    "Each marker is one of the source’s first four video pictures. Read its position as a timestamp in ticks or as the same presentation time in seconds.",
  picture: (index: number) => `Picture ${index}`,
  ticks: (value: number) => `${value} ticks`,
  seconds: (value: number) => `${value.toFixed(6)} s`,
  sourceNote: (file: string) =>
    `These picture timestamps were measured from ${file}, not your edited output. This source has regularly spaced pictures; other files can use different spacing, frame rates and time bases.`,
  intervalLabel: "Choose one picture interval",
  intervalChoice: (first: number, last: number) =>
    `Picture ${first} to picture ${last}`,
  zoomTitle: (first: number, last: number) =>
    `A closer look: picture ${first} to picture ${last}`,
  clockScale: (step: number) => `Clock marks every ${step} ticks`,
  clockNote:
    "Only the endpoints are picture times. The marks between them are calculated clock positions, not extra pictures. Each gap here contains 128 ticks; the diagram does not draw every tick.",
  difference: (start: number, end: number, delta: number) =>
    `${end} − ${start} = ${delta} ticks between the pictures`,
  intervalConversion: (ticks: number, base: string, seconds: number) =>
    `${ticks} ticks × ${base} second per tick = ${seconds.toFixed(6)} s (rounded)`,
  tickTitle: "A tick is much shorter than a picture interval",
  tickConversion: (base: string, seconds: number) =>
    `1 tick = ${base} second ≈ ${seconds.toFixed(6)} s`,
  tickNote:
    "The time base gives the duration of one clock tick. Many ticks pass between these picture times. Count the difference between timestamps, then multiply by seconds per tick to find the elapsed time.",
};
