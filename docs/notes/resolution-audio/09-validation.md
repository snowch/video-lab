# Validation at review commit

Copyright © 2026 Christopher Snow.

- `npx tsc --noEmit`: passed on the final source.
- `npm test`: 30 files and 127 tests passed on the final source.
- `npx prettier --check` over changed source, tests, scripts and notes: passed.
- `node scripts/verify-notebook.mjs`: 11 chapters, 29 complete concept pages and 62 executed native commands verified. New audio evidence includes three actual native and three actual pinned WASM execution records; rates/durations/channels are explicitly checked, not inferred from command spelling.
- `npx playwright test tests/sample-rate.spec.ts`: initial integrated build, 12 passed and 3 intentional skips across five projects.
- Final built `tests/sample-rate.spec.ts` plus `tests/resolution.spec.ts`, using a separate stable preview: 17 passed, 3 intentional skips. This includes actual wrong-rate failure/correct-rate acceptance, downloaded native probes, draft navigation, fixed sampling model, resolution geometry/labels, no processing-tool downloads during reading, and 320px/doubled-text reflow.
- Separate reader, sceptic and final built checker completed. The only accepted finding, missing persistent resolution-outline identities, is resolved. The final checker independently executed the audio work on Chromium phone and Firefox desktop; no remaining blocker was found.

`npm run check` is running the complete CI-equivalent gate, including all old/reference routes, offline/install/update flows and the five-project browser suite. Formatting, copyright, platform sync, strict typecheck, all unit/fixture/lesson/evidence verification and production build passed before its browser phase. The final two changes after that build were a separately reviewed definition of p notation and the resolution outline legend; their final built targeted checks and independent checker passed. The full hosted gate on the final commit must pass before merge. Final local/hosted counts and public deployment confirmation will be recorded in the pull request rather than claimed prematurely here.

Evidence: `/workspace/scratch/resolution-audio/`, `/workspace/scratch/resolution-audio-reader/`, and `/workspace/scratch/resolution-audio-checker/`. Durable actual command evidence is committed in `docs/notes/notebook/commands.json` and `commands-wasm.json`; original fixture provenance remains in the existing notebook media record. Local preview startup and a concurrent-dist replacement produced transient tool failures, which were retested against a stable build and explicitly excluded from product findings.
