// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import { CompletionStore, completionKey } from "./completion";
function fixture() {
  const values = new Map<string, string>();
  const storage = {
    getItem: (k: string) => values.get(k) ?? null,
    setItem: (k: string, v: string) => {
      values.set(k, v);
    },
  };
  return {
    values,
    storage,
    create: () => new CompletionStore(() => storage, ["a", "b"]),
  };
}
describe("manual completion", () => {
  it("restores only explicit marks and writes one page without changing unrelated work", () => {
    const f = fixture();
    f.values.set(completionKey("a"), "true");
    f.values.set(completionKey("b"), '{"done":true}');
    f.values.set("draft", "ffmpeg -i original.mp4 output.mp4");
    const s = f.create();
    expect([...s.get().completed]).toEqual(["a"]);
    s.set("b", true);
    s.set("a", false);
    s.set("unknown", true);
    expect([...f.create().get().completed]).toEqual(["b"]);
    expect(f.values.get("draft")).toContain("original.mp4");
    expect(f.values.has(completionKey("unknown"))).toBe(false);
  });
  it("keeps failed choices in memory and clears the warning after a successful retry", () => {
    const f = fixture();
    const s = f.create();
    f.storage.setItem = () => {
      throw Error("quota");
    };
    s.set("a", true);
    s.reconcile();
    expect(s.get().completed.has("a")).toBe(true);
    expect(s.get().unsaved.has("a")).toBe(true);
    f.storage.setItem = (k, v) => {
      f.values.set(k, v);
    };
    s.set("a", true);
    expect(s.get().unsaved.size).toBe(0);
  });
  it("reads current external state without losing other pages or trusting stale event values", () => {
    const f = fixture();
    const s = f.create();
    s.set("b", true);
    f.values.set(completionKey("a"), "true");
    s.reconcile({ key: completionKey("a"), newValue: "false" } as StorageEvent);
    expect([...s.get().completed].sort()).toEqual(["a", "b"]);
    f.values.clear();
    s.reconcile({ key: null } as StorageEvent);
    expect(s.get().completed.size).toBe(0);
  });
  it("works when storage access itself is blocked", () => {
    const s = new CompletionStore(() => {
      throw Error("blocked");
    }, ["a"]);
    s.set("a", true);
    expect(s.get().completed.has("a")).toBe(true);
    expect(s.get().unsaved.has("a")).toBe(true);
  });
});
