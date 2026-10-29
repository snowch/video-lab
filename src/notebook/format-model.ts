// Copyright © 2026 Christopher Snow
export const samplingModes = ["4:4:4", "4:2:2", "4:2:0"] as const;
export type SamplingMode = (typeof samplingModes)[number];
export function samplePlanes(mode: SamplingMode) {
  const columns = mode === "4:4:4" ? 2 : 1;
  const rows = mode === "4:2:0" ? 1 : 2;
  return [
    { component: "Y", columns: 2, rows: 2, count: 4 },
    { component: "U", columns, rows, count: columns * rows },
    { component: "V", columns, rows, count: columns * rows },
  ] as const;
}

// An illustrative picture; the marked top-left group is enlarged verbatim.
export const pictureColours = [
  ["#a7ccba", "#f4d39a", "#8bcbd4", "#8bcbd4"],
  ["#38644c", "#71964c", "#8bcbd4", "#8bcbd4"],
  ["#38644c", "#38644c", "#71964c", "#8bcbd4"],
  ["#38644c", "#38644c", "#38644c", "#71964c"],
] as const;
export const enlargedColours = pictureColours
  .slice(0, 2)
  .flatMap((row) => row.slice(0, 2));
