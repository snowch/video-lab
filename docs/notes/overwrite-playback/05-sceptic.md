# Overwrite playback: independent sceptic

Copyright © 2026 Christopher Snow.

29 October 2026. Separate sceptic agent; no product edits. Read AGENTS.md, the plan, investigation, implementation and reader notes, the FilePreview diff, hashBlob and the browser regressions. Independently exercised the built site at port 4198 with real FFmpeg WASM processing and a retained Files player in another window. Scratch script and machine-readable observations: `/workspace/scratch/overwrite-audio-sceptic/review.mjs` and `evidence.json`.

## Adjudication

No blocking defect found in the proposed lifecycle fix. Its evidence supports preserving unchanged preview resources and isolating replacement-player state. It does not establish why the physical device cannot play the 6000 Hz file, or prove that this fix restores its speaker output.

**R1 retained as minor, pre-existing, deferred.** Independently ran `ffprobe missing.wav`. “ffprobe could not inspect that input. See its log above.” precedes the “Command output” block and its useful `missing.wav: No such file or directory` explanation. The direction is wrong. The reader's frozen-baseline artifact and unchanged processing-engine source corroborate that this predates the fix. Removing “above” is a reasonable separate copy correction; it is not necessary to repair playback resource ownership. No other reader finding warrants escalation.

## Direct challenge of the clarified sequence

Used the same filename, `sceptic.wav`, throughout:

1. Generated four seconds at 8000 Hz and played the retained Files preview. Maximum sampled RMS was 0.034360; the media clock advanced 0.626877 seconds.
2. Overwrote it at 6000 Hz. Chromium naturally decoded this output: RMS 0.033086 over 0.578945 seconds. This confirms that this environment does not reproduce the device's 6000 Hz failure.
3. Explicitly dispatched a synthetic `error` on the **current** 6000 Hz player. The preview disappeared and displayed the existing download fallback. This deliberately models player failure; it is not a naturally observed decode error.
4. Overwrote the same filename back to 8000 Hz. A new preview appeared and produced RMS 0.032513 over 0.607748 seconds. Synthetic errors dispatched on both retired players afterwards did not hide it.

Thus the return to previously used 8000 Hz bytes recovers from an intervening failed preview in this controlled test. This is stronger coverage of error-state reset than injecting an error only after an old node has already been retired. No page errors occurred.

## Resource and hash review

- SHA-256 hashes actual bytes, rather than trusting filename, size, MIME type or a fresh IndexedDB Blob identity. The existing WeakMap caches promises by immutable Blob; cloning a Blob correctly requires a new hash. The key also includes filename and effective MIME type. Equal-size changed output is therefore distinguished, and unchanged reads retain the old resource.
- The asynchronous effect's `live` guard excludes a superseded hash result. The old preview can remain visible while the incoming bytes are hashed; this is bounded local work under the existing 20 MiB file limit. No claim of synchronous replacement should be made.
- A changed key mounts new URL, error and text state. The first render waits for an object URL. Retired media events cannot update the new component's error state. The existing asynchronous text-read guard remains in place; image alternative text and unsupported-file feedback are unchanged. The reader's generated-image and editable-text checks corroborate those ordinary paths, although its Files text editor does not directly exercise FilePreview's `<pre>` branch.
- Layout cleanup captures the media element, pauses it, removes its `src` attribute and invokes `load()` before passive URL revocation. The independent revoke audit found only disconnected, paused old nodes with no `src` attribute and readyState 0 at revocation.

**Cleanup wording limitation:** Chromium can still expose the old `currentSrc` string at that instant, even after `load()` and decoder reset. My initial assertion that no retired node could retain `currentSrc` was too strict and failed on this observation. The corrected invariant checks stopped, detached media with no source attribute and readyState 0. Do not claim that `currentSrc` is necessarily blank before revocation; the earlier investigation's suggested check should be read with this qualification. This does not invalidate the product cleanup.

Identical bytes intentionally preserve the current preview, including any existing error state. This fix specifically restores ownership when the actual resource changes; it does not promise that regenerating identical bytes repairs every transient device/backend error. The clarified 8000 → 6000 → 8000 sequence does change resource identity twice and passes the explicit failure/recovery check above.

## Evidence limits and priority

The measured unchanged-source interruption, retained-node replacement and deterministic error poisoning justify this narrow fix independently of the unreproduced hardware symptom. Native probe/decoded-level artifacts from the investigation and reader support valid, non-silent saved bytes. WebAudio measurements establish decoded signal inside Chromium, not audible sound from a physical speaker. Phone emulation establishes layout and touch behaviour, not an Android decoder or audio backend. A synthetic error is evidence about state isolation and recovery only.

This sceptic pass did not run the full quality gate or claim independent Firefox audio-energy verification. Full checks and the separate built checker remain the integration gate. A Firefox AudioContext that cannot resume in a headless environment without an audio device would be a harness limitation; native decoded levels and advancing ordinary HTML playback must be reported distinctly from WebAudio signal measurement there.
