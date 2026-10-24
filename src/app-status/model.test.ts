// Copyright © 2026 Christopher Snow
import { expect, test } from "vitest";
import { releaseMetadata, ownedCache } from "./model";
test("release identity validates deployment metadata without deriving it from main", () => {
  const value = {
    commit: null,
    build: "a".repeat(64),
    version: "assets-v1",
    bytes: 123,
  };
  expect(releaseMetadata(value)).toEqual(value);
  for (const patch of [
    { build: "x" },
    { bytes: NaN },
    { commit: "main" },
    { version: "" },
  ])
    expect(() => releaseMetadata({ ...value, ...patch })).toThrow();
});
test("offline removal belongs to this base path and never to sibling apps", () => {
  expect(
    ownedCache(
      "video-lab-offline:/video-lab/:abc",
      "https://example.test/video-lab/",
    ),
  ).toBe(true);
  expect(
    ownedCache(
      "video-lab-offline:/sibling/:abc",
      "https://example.test/video-lab/",
    ),
  ).toBe(false);
  expect(ownedCache("notebooks", "https://example.test/video-lab/")).toBe(
    false,
  );
});
