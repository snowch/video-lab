// Copyright © 2026 Christopher Snow
type Core = {
  ret: number;
  onAbort?: (reason: unknown) => void;
  exec?: (...args: string[]) => number;
  ffprobe?: (...args: string[]) => number;
};

/** For the pinned 0.12.10 core: exit_program saves ret immediately before abort(). */
export function installExitHandler(core: Core) {
  const previous = core.onAbort;
  let unexpectedAbort: WebAssembly.RuntimeError | undefined;
  core.onAbort = (reason) => {
    if (reason === "" && Number.isInteger(core.ret) && core.ret >= 0) {
      // Unwind the same WASM stack, before Emscripten prints an error or marks
      // the runtime aborted. Upstream exec catches this prefix and returns ret.
      // RuntimeError is intentional: Emscripten warns against foreign exceptions.
      throw new WebAssembly.RuntimeError("Aborted(FFmpeg command exit)");
    }
    // Actual faults still take Emscripten's original logging/abort path.
    unexpectedAbort = new WebAssembly.RuntimeError(
      `Aborted(${String(reason)})`,
    );
    previous?.(reason);
  };
  // The upstream bindings catch all aborts. Do not let their return sentinel
  // turn an actual runtime fault into a successful/validated command.
  for (const name of ["exec", "ffprobe"] as const) {
    const original = core[name];
    if (!original) continue;
    core[name] = (...args) => {
      unexpectedAbort = undefined;
      const status = original.apply(core, args);
      if (unexpectedAbort) throw unexpectedAbort;
      return status;
    };
  }
}
