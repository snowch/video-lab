// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import { samplePlanes } from "./format-model";
describe("conceptual sampling of a two-by-two picture group", () => {
  it.each([
    ["4:4:4", 2, 2, 4],
    ["4:2:2", 1, 2, 2],
    ["4:2:0", 1, 1, 1],
  ] as const)(
    "%s retains four luma samples and the specified colour grouping",
    (mode, columns, rows, count) => {
      const [y, u, v] = samplePlanes(mode);
      expect(y).toEqual({ component: "Y", columns: 2, rows: 2, count: 4 });
      expect(u).toEqual({ component: "U", columns, rows, count });
      expect(v).toEqual({ component: "V", columns, rows, count });
    },
  );
});
