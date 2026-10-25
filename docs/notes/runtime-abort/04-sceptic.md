# Runtime exit adapter — technical sceptic

Copyright © 2026 Christopher Snow.

Date: 25 October 2026. This reviewer investigated the upstream fault mechanism but did not write the product implementation. Reviewed the current working diff, `src/processing/core-exit.ts`, its unit tests, the real-browser regression tests, build/offline manifests and notebook saved-run selection. The parent runs the full quality gate separately.

## Technical decision

No blocking technical defect found in the reviewed implementation.

The empty abort reason and recorded nonnegative integer status are justified by the exact pinned native `exit_program` implementation: cleanup runs first; then `Module.ret` is assigned; then the intentional `abort()` happens immediately. The original wrapper resets `ret` to `-1` between commands. Thus this check recognises the native exit mechanism, including nonzero command failures, rather than guessing from stderr text. The adapter executes before the original runtime writes its shutdown diagnostic. Original JS/WASM hashes are pinned at build time, so silently changing this mechanism through a dependency upgrade fails the build.

The implementation adds a useful guard beyond the initial investigation recommendation. It records an unexpected abort and wraps the original synchronous `exec`/`ffprobe` functions; if their broad upstream catch swallows that fault, the wrapper throws it again. This protects the ffprobe path even if a readable report was written before a genuine abort. When the original entry point itself throws, that exception also propagates. CLI log strings are never inspected or filtered. Failed FFmpeg commands retain their native nonzero status and real stderr; normal ffprobe's separate `-1`/JSON validation contract is unchanged.

The `onAbort` rule relies on the upstream worker's reset contract and the pinned glue. It is appropriate for this application path; it is not a generic abort classifier for arbitrary direct calls on a core left with a previous command's status.

## Offline, provenance and saved work

`prepare-encoder.mjs` copies the vendor JS and WASM unchanged, transpiles the reviewed local adapter, and manifests all three runtime assets plus licences/provenance. A fresh invocation to `/tmp/video-lab-sceptic-encoder` succeeded. Recomputed every listed size and SHA-256 and the aggregate byte total: all matched. The generated adapter imports the adjacent original JS; the engine passes the original WASM URL explicitly.

`build-offline.mjs` includes the complete encoder manifest when deriving the release version. `src/offline/worker.ts` iterates that manifest to verify and save every file. Although the shared vendor cache name still uses version `0.12.10`, readiness checks require the adapter's expected hash and size, and save/repair fetches missing or different bytes. The engine's known-offline preflight now checks all three runtime files. These changes preserve the explicit download model and previous vendor cache reuse; they do not add an automatic tool download while reading.

New notebook runs carry `runtime: "exit-adapter-v1"`. The historical note requires an untagged, error-free saved record, the appropriate prior status and an exact bare `Aborted()` line. Existing logs and bytes are not rewritten. The display gate does not alter completion status, command execution or raw log rendering. The revised decode lesson appropriately asks learners to examine status and processing output without teaching the obsolete runtime diagnostic as current behaviour.

## Independent execution evidence

Ran actual raw core and the freshly generated application adapter in Node using the original WASM bytes, a worker `self.location` shim and `public/media/notebook/bunny-short.mp4`. Both factories received the same command arguments and input bytes. This is direct real-WASM execution, not a second browser/UI review.

Each output was inspected with native `ffprobe -v error -show_streams -show_format -of json FILE`, then completely decoded with `ffmpeg -v error -xerror -i FILE -f null -`. Native version: FFmpeg/ffprobe **7.1.5-0+deb13u1**. All six native probes and full decodes succeeded. Every pair has identical output SHA-256, status 0 and media metadata. Only the raw core emitted the bare runtime shutdown diagnostic.

| Arguments after `ffmpeg` | Bytes | Native duration | Streams | Raw and adapter SHA-256 |
| --- | --- | --- | --- | --- |
| `-y -i bunny-short.mp4 -t 5 result.mp4` | 297,302 | 5.000000 s | H.264 854 × 480; AAC | `4ecf1f3f52c8e817ee3f01cb4d5d7694f10caf66627552cb531b356190855556` |
| `-y -i bunny-short.mp4 -t 2 -c copy result.mp4` | 84,329 | 2.083333 s | H.264 854 × 480; AAC | `3aea15aa7a60dbcfb359ba48562c7bfb750f9c1c992f3cf77ca8880f6a2fe83e` |
| `-y -i bunny-short.mp4 -t 1 -an -vf scale=160:-2 result.mp4` | 8,433 | 1.000000 s | H.264 160 × 90 | `ffb8d68caf4d2e8110901f5cd36bceffacc6db8d8831e7a1174d438e5b99db63` |

The copy case's duration is measured, not assumed to equal its requested cutoff. The identical hashes establish that handling the exit hook did not change these encoded media bytes; they do not promise deterministic output across different core versions.

Temporary independent harness and machine-readable evidence: `/tmp/video-lab-abort-source/sceptic.mjs` and `/tmp/video-lab-abort-source/sceptic-results.jsonl`. `01-investigation.md` records separate actual-core success/nonzero/unexpected-abort evidence and exact upstream source links.

Also independently injected a fault through the freshly generated adapter: replaced the native `_ffprobe` entry point with a function that writes a valid JSON report and then calls the actual `core._abort()`. The report remained readable, but `core.ffprobe()` rejected with `RuntimeError: Aborted()`, status remained -1, and genuine `Aborted()` stderr remained. A preceding direct `core.printErr("Aborted()")` likewise reached the logger unchanged. The focused command `npx vitest run src/processing/core-exit.test.ts` passed one file and all three tests.

## Reader findings

Read the completed independent `03-reader.md`. It establishes no blocking or lower-severity change-specific findings, so there are no proposed reader fixes to accept or reject. Its observed clean command output, preserved genuine error messages, five-second decoded media, legacy-only note and revised decode guidance agree with the source investigation and this review's independent runtime evidence. The reader's six viewport/theme checks add built-site UI evidence; this technical review does not relabel those checks as its own browser execution.

The reader states its limits explicitly, including the lack of audible listening, broader keyboard checks, Firefox and offline/update review. Those limits do not invalidate the reported observations. The parent full quality gate and independent checker remain separate requirements.

## Final source removal check

Reviewed the later removal of the optional workbench's `encodingCleanup` paragraph/key and the old CLI's `sawBareAbort`/`cleanupNotice` path. The workbench still displays its genuine raw results and the distinct ffprobe -1 explanation. The CLI still forwards every callback line to `raw(line)` and retains status-based success/failure handling. Its removed cleanup diagnostic was immediately overwritten by the following unconditional `setDiagnostic`, so deleting that detection does not remove useful error handling.

A source search for `Aborted(` and normal-abort/cleanup wording across `src` finds no remaining learner-facing claim that the current runtime normally prints an abort diagnostic after success. Remaining occurrences are the adapter/test mechanisms and the explicitly historical notebook note with its exact-line legacy gate. The retained ffprobe -1 notes describe a separate unresolved return-value contract and should remain. The final `SOURCE.md` wording correctly attributes saving the native status to `exit_program`, rather than to the application adapter.

These final removals introduce no technical blocker and do not filter or rewrite requested tool output. This pass is a source check; the fresh built-site checker and full quality results belong in their own records.
