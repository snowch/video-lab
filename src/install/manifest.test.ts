// Copyright © 2026 Christopher Snow
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
it("defines a stable scoped app with correctly sized install icons", () => {
  const manifest = JSON.parse(
    readFileSync("public/manifest.webmanifest", "utf8"),
  );
  const base = new URL(
    "https://snowch.github.io/video-lab/manifest.webmanifest",
  );
  expect(new URL(manifest.id, base.origin).href).toBe(
    "https://snowch.github.io/video-lab/",
  );
  for (const key of ["start_url", "scope"])
    expect(new URL(manifest[key], base).href).toBe(
      "https://snowch.github.io/video-lab/",
    );
  expect(manifest.display).toBe("standalone");
  for (const size of [192, 512]) {
    const icon = manifest.icons.find(
      (i: { sizes: string; purpose: string }) =>
        i.sizes === `${size}x${size}` && i.purpose === "any",
    );
    expect(icon).toBeDefined();
  }
  expect(
    manifest.icons.some((i: { purpose: string }) => i.purpose === "maskable"),
  ).toBe(true);
  for (const icon of manifest.icons) {
    const png = readFileSync(`public/${icon.src}`);
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`).toBe(icon.sizes);
  }
  for (const size of [32, 180]) {
    const png = readFileSync(`public/icons/icon-${size}.png`);
    expect(png.readUInt32BE(16)).toBe(size);
    expect(png.readUInt32BE(20)).toBe(size);
  }
});
