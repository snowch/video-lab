# Runtime exit adapter — separate prose pass

Copyright © 2026 Christopher Snow.

Date: 25 October 2026. Drafted by a separate agent from the verified facts in `01-investigation.md`, the builder's implementation brief, and the current `src/processing/core-exit.ts` and `scripts/prepare-encoder.mjs`. This is a prose pass, not independent browser verification.

## Facts used

The pinned native FFmpeg exit path records its actual status before intentionally aborting to unwind execution. The adapter intercepts only the empty reason with a recorded nonnegative integer status before the misleading runtime diagnostic is printed. Nonzero status remains nonzero. Unexpected aborts retain the original diagnostic and propagate as failures; tool stderr is not filtered. Vendor JS/WASM bytes remain unchanged.

Ordinary ffprobe completion does not take that abort path. Its JavaScript binding ignores the native return value, leaving -1; independent JSON/error validation remains necessary. The adapter does not claim to repair that contract.

## Changes

- Replaced `runtimeFfmpeg` and `runtimeProbe` with short historical saved-run notes inviting a rerun. Neither note declares that the saved output failed. The builder controls their legacy-only selection; current runs must not display them.
- Removed the decode page's claim that the current runtime prints Aborted() on successful commands. Retained the need to inspect stream selection, processing duration, completion status and errors, plus the existing viewing/listening and compatibility limits.
- Added the separate adapter's source, exact generated build path, integrity records, narrow termination mechanism and version dependency to `SOURCE.md`, preserving vendor provenance and licence references.

## Validation and limits

Reviewed the changed text against the investigation and current adapter/build implementation. Formatting was checked on these four files. Engine, record migration, tests, browser-worker behaviour and built-site reader/sceptic/checker review belong to the parent implementation workflow. No claim of independent runtime verification is made here.
