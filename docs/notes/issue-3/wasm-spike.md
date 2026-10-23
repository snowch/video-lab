# Real browser media engine compatibility spike

Copyright © 2026 Christopher Snow.

Executed 23 October 2026 before learner-facing encoding prose. This is builder evidence, not an independent learner or final checker review.

## Pinned implementation and hosting

- `@ffmpeg/ffmpeg` 0.12.15, `@ffmpeg/core` 0.12.10, `@ffmpeg/util` 0.12.2, exact package-lock versions.
- Single-thread core: runtime identifies FFmpeg 5.1.4, Emscripten 3.1.40, `--disable-pthreads`, `--enable-gpl`, libx264 and AAC support. No SharedArrayBuffer or cross-origin isolation was used.
- Production Vite build of `src/processing/engine.ts`, base `/video-lab/`, output outside the main build during the spike. Vite emitted the wrapper chunk and its module worker; the worker successfully fetched the same-origin ESM core and WASM.
- Core paths: `/video-lab/encoder/0.12.10/ffmpeg-core.js` and `.wasm`. `scripts/prepare-encoder.mjs` copies unmodified package files after Vite builds, creates `encoder-manifest.json`, and adds source/licence notices. None of the large generated files is committed.
- JS: 111,804 bytes, SHA-256 `67a48f11645f85439f3fde4f2119042c16b374b910206b7a7a24f342e28dcae3`. WASM: 32,232,419 bytes, SHA-256 `9f57947a5bd530d8f00c5b3f2cb2a3492faa7e5d823315342d6a8656d0a6b7b7`. The build manifest is authoritative for exact hashes and the combined size including notices.

The baseline offline manifest must exclude `encoder/`; only explicit processing or the separate offline-encoder download requests these files. The lightweight manifest can be included in ordinary offline reading. Root integration is responsible for testing the actual complete app and public GitHub Pages paths.

## Actual encode, mux, playback and probe

A production-built browser engine was served at `http://127.0.0.1:4181/video-lab/`. Tested Playwright Chromium and Firefox on Linux, normal TLS/browser security settings. Source images were the existing original, verified `public/media/frames/000.jpg`, `048.jpg`, `072.jpg`, copied into the worker as frame000.jpg through frame002.jpg.

```text
ffmpeg -framerate 1 -i frame%03d.jpg -c:v libx264 -pix_fmt yuv420p -movflags +faststart video.mp4
ffmpeg -i video.mp4 -i tone.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -shortest -movflags +faststart demo.mp4
```

The spike generated an actual three-second mono PCM WAV at 48,000 samples/second: signed 16-bit little-endian samples of a quiet 440 Hz sine, amplitude 1000, a normal 44-byte WAV header. It is synthetic sound, not narration. The application uses its committed, reproducibly generated tone fixture instead of generating this spike WAV in the UI.

| Observed operation | Chromium | Firefox |
| --- | --- | --- |
| Three pictures at 1 fps | H.264, 960×540, 3 frames, 3.000000 s, 32,198 bytes | Same |
| Actual rerun at 2 fps | 1.500000 s, 27,543 bytes | Same |
| Actual audio mux/encode | H.264 + AAC, 3.000000 s, 59,728 bytes | Same |
| Output playback | `currentTime` advanced after real play | Same |
| Corrupt input encode | Rejected | Rejected |
| Corrupt/truncated input probe | Both rejected | Both rejected |
| Immediate cancellation during Blob read, then retry | AbortError; new inspection succeeds | Same |
| Real canvas MediaRecorder WebM | Actual VP8/Matroska-WebM probed | Same |

The produced audio+video MP4 had SHA-256 `97c4f4f37a552bf819e43caa601b05f55e81a22cb07f2a895a919bc4524cbfb9` in both browsers for this exact spike input and command. These sizes/hash are observations, not constants presented as predictions for arbitrary recordings or UI settings.

Native `ffprobe` 7.1.5-0+deb13u1 independently inspected the actual browser output bytes. It agreed with the WASM inspection on stream indexes/types/codecs, video dimensions, sample rate/channels, frame rates, time bases, durations, frame counts, format name and file size. Native command:

```sh
ffprobe -v error -show_streams -show_format -of json chromium-demo.mp4
ffprobe -v error -show_streams -show_format -of json firefox-demo.mp4
```

Spike scripts, logs, raw JSON and generated MP4s are under `/workspace/scratch/wasm-spike/`. The raw `run.mjs` creates input pictures/WAV, executes both commands, changes the frame rate, plays output, attempts corrupt/truncated inputs, cancels/retries, and records a real MediaRecorder WebM. It is diagnostic scratch evidence; enduring application checks exercise the same engine through the production UI.

## ffprobe compatibility finding

The pinned core **does include ffprobe**, despite the earlier redesign's assumption. Normal successful ffprobe cleanup leaves the wrapper's return sentinel at **-1**, even while it writes complete valid JSON. `ffprobe -version` returns 0. Repeated runs against known files and independently verified new output established this distinction; it is not treated as a general licence to ignore process failures.

The adapter accepts 0 or this pinned -1 sentinel only after reading and parsing the complete output, rejecting any `error` section, requiring a real format and at least one well-formed stream. Missing/malformed/empty probe output is an error. The probe requests `-show_error`. The encoder operation itself requires **exit status 0**, nonempty output bytes within the output limit, and a valid inspection of those actual output bytes. A failed job returns no result for the UI to display.

## Streaming WebM timing

MediaRecorder output may have no container duration. The engine requests actual packet stream index, PTS, DTS and duration fields as well as format/stream evidence. It never fills an invented `format.duration` value.

In this short spike, Chromium reported format duration 0.449528 s; Firefox omitted format duration, with video packet presentation times spanning 0 to 0.416 s and no final-packet hold duration. `durationEvidence` reports the available container duration, otherwise an observed video packet end (`packet-end`) or timestamp span (`packet-span`). The last case is a conservative observed extent, not proof of the unknown final hold or complete playback duration. The caller must label that basis. `measuredDuration` returns the same available numeric extent for conservative edit bounds.

## Limits, lifecycle and tests

Inputs total at most 32 MiB and twelve files; outputs at most 20 MiB; wall-clock processing is capped at 120 seconds. Only one operation runs at a time. Each operation owns a fresh worker and ends by terminating it, releasing virtual files and WASM memory. Writes copy the input buffer before the wrapper transfers it, preserving the shared learner artefact. Cancellation also works during asynchronous Blob reading; a cancelled operation cannot clear a later job's ownership. No fake progress percentage is calculated.

`npx vitest run src/processing/engine.test.ts` passes 12 tests: encoder nonzero exit rejection despite bytes, pinned-probe sentinel validation, malformed/error/empty evidence rejection, explicit probe failure rejection, early cancellation/clean retry, concurrent job exclusion/loading cancellation, and container/packet/missing-duration semantics. `npx tsc --noEmit` passed with the engine. Full production UI, offline, deployment and cross-browser tests remain root integration checkpoints; this spike does not claim a physical phone, actual desktop source picker or public deployment test.

## Source and licence record

`@ffmpeg/core` declares GPL-2.0-or-later; the wrapper and util declare MIT. Exact core source is release commit `71aa99d37c02a7b4c435275ca9ef50e612f6efa1` (7 January 2025), whose core package declares 0.12.10. It is not the old wrapper tag v0.12.10 (December 2023). The optional encoder files include original GPLv2/MIT texts and a SOURCE.md with the archive, build recipe, native FFmpeg version, dependency source references and `make prd` reproduction instructions. The release recipe includes some moving branch references, so no byte-for-byte future source rebuild is asserted. The unmodified npm bytes and integrity hashes are pinned separately.
