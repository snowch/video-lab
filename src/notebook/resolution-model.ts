// Copyright © 2026 Christopher Snow
export const resolutionGrids = [
  { label: "480p", width: 854, height: 480 },
  { label: "720p", width: 1280, height: 720 },
  { label: "1080p", width: 1920, height: 1080 },
] as const;
export function resolutionGeometry(index: number) {
  const grid = resolutionGrids[index];
  if (!grid) throw new RangeError("Unknown resolution grid");
  return {
    ...grid,
    pixels: grid.width * grid.height,
    widthPercent: (grid.width / 1920) * 100,
    heightPercent: (grid.height / 1080) * 100,
  };
}
