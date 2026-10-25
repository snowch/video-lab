// Copyright © 2026 Christopher Snow
import { expect, test, vi } from "vitest";
import { installExitHandler } from "./core-exit";

test("a caught runtime fault is rejected even if a binding returns a success status", () => {
  const core: Parameters<typeof installExitHandler>[0] = {
    ret: 0,
    exec() {
      this.onAbort?.("out of memory");
      return this.ret;
    },
    ffprobe() {
      this.onAbort?.("out of memory");
      return -1;
    },
  };
  installExitHandler(core);
  expect(() => core.exec!()).toThrow("Aborted(out of memory)");
  expect(() => core.ffprobe!()).toThrow("Aborted(out of memory)");
});

test("normal exits unwind with their original success or failure status", () => {
  for (const ret of [0, 1, 255]) {
    const previous = vi.fn();
    const core = { ret, onAbort: previous };
    installExitHandler(core);
    expect(() => core.onAbort("")).toThrow(WebAssembly.RuntimeError);
    expect(core.ret).toBe(ret);
    expect(previous).not.toHaveBeenCalled();
  }
});

test("unexpected aborts and unrecorded statuses keep the original diagnostic path", () => {
  for (const [ret, reason] of [
    [-1, ""],
    [NaN, ""],
    [Infinity, ""],
    [0.5, ""],
    [0, "out of memory"],
    [0, undefined],
    [0, "native code called abort()"],
  ] as const) {
    const previous = vi.fn();
    const core = { ret, onAbort: previous };
    installExitHandler(core);
    core.onAbort(reason);
    expect(previous).toHaveBeenCalledExactlyOnceWith(reason);
    expect(core.ret).toBe(ret);
  }
});
