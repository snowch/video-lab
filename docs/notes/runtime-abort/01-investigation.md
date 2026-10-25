# Pinned FFmpeg shutdown investigation

Copyright © 2026 Christopher Snow.

Date: 25 October 2026. Investigation only; browser verification and implementation review are separate passes.

## Finding

The successful command `ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4` ends in an intentional upstream `abort()` used to unwind from the native FFmpeg entry point. The native source saves its actual exit status before calling `abort()`. The published JavaScript binding catches that exception and returns the saved status. Its stderr filter, however, recognises the assertion-build diagnostic `Aborted(native code called abort())`, whereas the production build emits `Aborted()`. This is a mismatch in the pinned runtime glue, not evidence that a zero-status encode failed.

This explanation must not be generalised to every abort: the same runtime can emit `Aborted()` for a genuine native abort before any exit status has been recorded.

## Exact source and binary evidence

The core is **@ffmpeg/core 0.12.10**, from release commit **71aa99d37c02a7b4c435275ca9ef50e612f6efa1**, not the older wrapper tag with the same version number. See the existing provenance in `src/processing/licences/SOURCE.md`.

- [Native `exit_program`, lines 94–115](https://github.com/ffmpegwasm/ffmpeg.wasm/blob/71aa99d37c02a7b4c435275ca9ef50e612f6efa1/src/fftools/cmdutils.c#L94-L115): runs the cleanup callback, assigns `Module.ret = ret` with `EM_ASM`, then immediately calls `abort()`. The source comment explicitly describes exception-based termination as intentional.
- [FFmpeg entry point, lines 4599–4664](https://github.com/ffmpegwasm/ffmpeg.wasm/blob/71aa99d37c02a7b4c435275ca9ef50e612f6efa1/src/fftools/ffmpeg.c#L4599-L4664): ends with `exit_program(received_nb_signals ? 255 : main_return_code)`. Error paths call the same function with nonzero status.
- [Binding `printErr`, `exec` and `ffprobe`, lines 50–76](https://github.com/ffmpegwasm/ffmpeg.wasm/blob/71aa99d37c02a7b4c435275ca9ef50e612f6efa1/src/bind/ffmpeg/bind.js#L50-L76): filters only the longer assertion-build message; catches exceptions whose message starts with `Aborted`; returns `Module.ret`.
- [Emscripten 3.1.40 `abort` library function, lines 365–370](https://github.com/emscripten-core/emscripten/blob/5c27e79dd0a9c4e27ef2326841698cdd4f6b5784/src/library.js#L365-L370): assertion builds use `abort('native code called abort()')`; production builds use `abort('')`. The 3.1.40 tag resolves to commit **5c27e79dd0a9c4e27ef2326841698cdd4f6b5784**.
- [Emscripten runtime abort, lines 432–469](https://github.com/emscripten-core/emscripten/blob/5c27e79dd0a9c4e27ef2326841698cdd4f6b5784/src/preamble.js#L432-L469): invokes `Module.onAbort(what)` before printing `Aborted(...)`, setting `ABORT`, or throwing `WebAssembly.RuntimeError`. Its comment recommends that exception type to avoid treating it as a foreign exception with destructor handling.
- [Published package archive](https://registry.npmjs.org/@ffmpeg/core/-/core-0.12.10.tgz). The installed ESM file contains `function _abort(){abort("")}` and the same `onAbort` ordering. Its JS is 111,804 bytes, SHA-256 `67a48f11645f85439f3fde4f2119042c16b374b910206b7a7a24f342e28dcae3`. Its WASM is 32,232,419 bytes, SHA-256 `9f57947a5bd530d8f00c5b3f2cb2a3492faa7e5d823315342d6a8656d0a6b7b7`.

The installed @ffmpeg/ffmpeg 0.12.15 worker sets the command timeout, calls `core.exec` or `core.ffprobe`, reads `core.ret`, and then calls `core.reset()`. The reset sets `ret` and timeout to `-1`. Application code in `src/processing/engine.ts` already rejects nonzero FFmpeg status and requires nonempty output bytes when an output is requested.

## Separate ffprobe defect

Ordinary ffprobe completion does **not** use the intentional abort. [Its entry point ends with `return ret < 0`, lines 4216–4227](https://github.com/ffmpegwasm/ffmpeg.wasm/blob/71aa99d37c02a7b4c435275ca9ef50e612f6efa1/src/fftools/ffprobe.c#L4216-L4227). The JavaScript binding calls `_ffprobe(...)` without assigning that C return value to `Module.ret`. Consequently ordinary successful inspection and missing-input inspection both leave `Module.ret` at `-1`. Certain early exit options can still use `exit_program`.

The existing comment describing `-1` as following normal ffprobe cleanup can be made precise: it is an ignored C return value. Preserve the application's independent JSON/error validation; accepting `-1` alone would hide real failures. Repairing the ffprobe return contract is a separate change and is unnecessary to remove the encoding shutdown diagnostic.

## Bounded recommendation

Use a small local ESM factory adapter around the **unmodified** published core. After awaiting `createFFmpegCore(options)`, install a narrow `core.onAbort` handler. It should intercept only `reason === ""` with a recorded integer `core.ret >= 0`, then throw `new WebAssembly.RuntimeError("Aborted(FFmpeg exit)")`. The existing binding recognises and catches that exception, returning the actual recorded status. Delegate every other case to any pre-existing hook and allow the normal abort implementation to continue.

The recorded status is the discriminator: the pinned native `exit_program` writes it immediately before the intentional abort, and the upstream worker resets it between invocations. A nonzero recorded status remains nonzero and the application still rejects the command. An unexpected native abort during cleanup, before the assignment, retains `-1` and the genuine runtime diagnostic.

This adapts an identified termination mechanism before its misleading runtime diagnostic is produced. It does not inspect or suppress CLI log messages: real FFmpeg stderr containing the literal string `Aborted()` still passes through the original logger unchanged. No regular expression over learner output is needed. No custom WASM compilation is required.

Point `engine.load`'s `coreURL` at the adapter and continue passing the explicit original `wasmURL`. Include the adapter in the encoder integrity/offline manifest. Keep the original JS/WASM byte copies, package provenance and licences truthful; describe the additional application adapter separately. Retain the zero-status/output-byte gates and ffprobe validation. The UI can then remove the general explanation that successful commands may end with `Aborted()`.

This depends on the pinned binding and Emscripten callback ordering. Cover that contract with a focused adapter test and verify the real built worker; a future core upgrade must recheck it. Test an unexpected abort with `ret === -1`, nonempty reasons, and arbitrary genuine CLI stderr, as well as ordinary success and nonzero native exits.

## Executed core experiment

Executed the installed ESM factory and WASM directly in Node with `wasmBinary` supplied and a worker `self.location` shim. This is actual WASM execution, but is **not** a browser-worker/UI test. Fixture: `public/media/notebook/bunny-short.mp4`. Both versions ran the same arguments in sequence, with `core.reset()` between commands. The adapter prototype used the `onAbort` rule above; it did not replace the logger or mutate core source.

| Command/case | Original result | Adapter prototype result |
| --- | --- | --- |
| `ffmpeg -y -i bunny-short.mp4 -t 5 first-cut.mp4` | Status 0; 297,302 output bytes; final `Aborted()` stderr | Status 0; 297,302 output bytes; encoding statistics preserved; no runtime shutdown diagnostic |
| `ffmpeg -i missing.mp4 out.mp4` | Status 1; missing-file stderr and final `Aborted()` | Status 1; missing-file stderr preserved; no runtime shutdown diagnostic |
| `ffprobe -v error -show_format -of json bunny-short.mp4 -o valid.json` | Status -1; complete JSON, no abort | Same status and JSON; hook not called |
| `ffprobe -v error -show_error -of json missing.mp4 -o missing.json` | Status -1; missing-file stderr and JSON `error` | Same status, stderr and JSON error; hook not called |
| `ffmpeg -version` | Status 0; genuine version stdout and final `Aborted()` | Status 0; version stdout preserved; no runtime shutdown diagnostic |
| Direct `core._abort()` immediately after reset | Not required for baseline | Status remains -1; original `Aborted()` stderr and `WebAssembly.RuntimeError` preserved |

The normal and error encode cases show why status alone must continue to govern command success: both deliberately unwind through `abort()`, but their saved statuses differ. The direct unexpected-abort case shows why globally hiding the short stderr string would be incorrect.

Research commands used `gh api` to read the exact upstream commit, `node` to inspect the installed generated glue, and a temporary direct-core harness at `/tmp/video-lab-abort-source/reproduce.mjs`. No course product code was edited during this investigation. Real browser reproduction and final implementation verification are still required by the parent task.
