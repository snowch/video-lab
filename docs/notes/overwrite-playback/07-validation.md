# Validation at review commit

Copyright © 2026 Christopher Snow.

- Frozen baseline built site: both new regressions failed at the intended invariants (unchanged source URL replaced, same-name changed audio reused its old player).
- Fixed built site: `tests/overwrite-playback.spec.ts` passed eight cases across desktop/phone light/dark and Firefox, with two intentional duplicate-backend skips. It includes unchanged-source continuity, equal-size different-content replacement, native output inspection, actual nonzero signal, retired-node error isolation, and same-name 8000 → simulated failed 6000 → 8000 recovery.
- Chromium signal measurements use the actual HTML media element through a live WebAudio analyser. Firefox verifies decoded bytes offline plus metadata and lifecycle; live PCM output is unavailable in this host's missing audio sink. Earlier Firefox harness timeouts from starting that sink were diagnosed and removed from the final test method, not treated as product evidence.
- `npx tsc --noEmit` passed; `npm test` passed 30 files / 127 tests; focused formatting and `git diff --check` passed.
- Fresh reader, separate sceptic and final built checker completed with no blocking finding. The minor pre-existing “log above” wording issue is deferred; no learner-visible wording was changed.

`npm run check` is running the full CI-equivalent suite on the frozen source and final tests. Full local/hosted results will be recorded in the pull request before merge. No complete-green result is claimed prematurely. The source and test files are unchanged during this gate; final review documentation is formatted separately.

Exact physical-device silence at 6000 Hz was not reproduced here. The verified fix addresses content/resource/error lifecycle and same-name recovery; it does not make unsupported sample rates playable on every device. Durable investigation, implementation and review facts are recorded in this directory; detailed commands, screenshots, signal measurements and downloaded media are under `/workspace/scratch/overwrite-audio/`, `/workspace/scratch/overwrite-audio-reader/`, and `/workspace/scratch/overwrite-audio-checker/`.
