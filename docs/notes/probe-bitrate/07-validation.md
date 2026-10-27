# Validation and release

Copyright © 2026 Christopher Snow.

Scope: Chapter 2's supplied ffprobe interpretation, the added Duration/bitrate row and associated paragraph layout/fact checks. No commands, raw-output pipeline, media bytes or storage protocols changed.

- `ffprobe -hide_banner public/media/notebook/bunny-short.mp4`: confirmed the displayed Duration and 352 kb/s line.
- Native JSON inspection of format duration/size/bit_rate and stream bitrates: 8 seconds, 352138 bytes, 352138 bits/s overall; video 280869 bits/s and audio 64095 bits/s. Saved in `/workspace/scratch/probe-bitrate/native-probe.json`.
- `ffprobe -hide_banner -h demuxer=mov` and FFmpeg n7.1.5 source inspection confirmed one reader name containing the format aliases; its extension list is longer, so the explanation avoids an exhaustive-support claim.
- `node scripts/visual-media.mjs`: exit 0, including the added source bitrate/size/duration assertions. Log: `native-check.log`.
- `npm run build`: exit 0. Log: `build.log`.
- Independent reader/sceptic/checker completed with no actionable defects; their separate records document actual built-page layouts, real WASM output, controls and native values. The checker's initial scratch banner assumption was corrected in its harness, not in the product.

Full local/hosted checks and publication results follow below. Scratch artifacts are under `/workspace/scratch/probe-bitrate/`.

## First full run and unchanged focused rerun

The first `npm run check` exited 1: formatting/types, 110 unit tests, native media/source verification and production build passed; browser results were 335 passed, 49 configured skips and one failure. Firefox `course.spec.ts:100` expected the older reference lab's status to say `Completed.` after a progressive hint, but received an empty status. This was outside the changed notebook guide; its raw-output tests passed. The original failure is not reclassified as success.

Preserved failure trace and error context: `/workspace/scratch/probe-bitrate/first-run-failure/`. Full log: `check.log`. No product/test change was made in response. The exact unchanged focused command `npx playwright test tests/course.spec.ts --project=firefox --grep 'incomplete or imported report'` passed (1 test, 10.5 seconds overall). This establishes that the failure did not reproduce in that run, not a proven root cause. Log: `reference-rerun.log`.

A separate checker investigates the preserved evidence in `08-test-investigation.md`; the full gate is rerun before publication.

## Final full local gate

The unchanged full `npm run check` rerun exited 0: 25 unit files / 110 unit tests passed; 336 browser tests passed and 49 were configured skips. Formatting, copyright, shared-platform integrity, strict types, all native/media/recorded command facts and production/offline build passed. The previously failing Firefox reference test passed within this full run (7.5 seconds). Log: `check-final.log`. This recovers the gate without a product or test workaround; it does not establish the initial failure's root cause.

Independent drafting, reader, sceptic, final built checker and failure investigation are recorded separately. Publication is authorised by the owner's explicit “Merge when done”.
