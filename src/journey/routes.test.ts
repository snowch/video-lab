// Copyright © 2026 Christopher Snow
import { expect, it } from "vitest";
import { routeFor } from "./routes";
it("keeps old lesson and section bookmarks unambiguous after renumbering", () => {
  expect(routeFor("#/module-0/challenge")).toMatchObject({
    step: "inspect",
    reference: true,
    section: "challenge",
    canonical: "#/inspect/reference/challenge",
  });
  expect(routeFor("#/module-2").canonical).toBe("#/edit/reference");
  expect(routeFor("#/capture")).toMatchObject({
    step: "capture",
    reference: false,
  });
  expect(routeFor("#/edit/reference/construction")).toMatchObject({
    step: "edit",
    reference: true,
    section: "construction",
  });
  expect(routeFor("#/unrecognised").step).toBeUndefined();
});
