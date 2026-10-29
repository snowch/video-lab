# Integration, fixes and validation

Copyright © 2026 Christopher Snow.

Separate prose passes drafted the sharing notice and pixel-format reference from primary-source briefs. The builder integrated the reference as a section of the existing Media file formats appendix, with explicit option-note links and a focused section subroute. No new chapter, media, command or grading criterion was added. The public attribution and maintained source notes now carry the same conditional sharing guidance; historical review reports remain historical.

The independent reader found no actionable issues. The sceptic retained two minor wording refinements: explicitly say video codec in the video explanation, and one U sample and one V sample to avoid implying a combined sample. Both are applied. The final checker verifies the rebuilt page in `06-checker.md`.

Local validation completed:
- `npx prettier --check .`: passed.
- `npx tsc --noEmit`: passed.
- `npm test`: 116 tests across 27 files passed.
- `npm run build`: passed; offline bundle includes updated source attribution and reference text.
- `npx playwright test tests/formats-images.spec.ts -g 'pixel-format references'`: all 5 configured projects passed, 12.1s. The test verifies all 3 lesson links, edited draft persistence, keyboard activation, focused/visible heading on navigation and fresh reload, doubled-text overflow and no processing download merely reading.

The required full `npm run check` runs in GitHub CI before merge, including all native media validations and the full browser suite. Its final exact results and run links are recorded on the pull request. No full local run is claimed for this slice. Scratch evidence: `/workspace/scratch/photo-credit/`, with separate reader/sceptic/checker records.

## Follow-up option audit

While CI ran, the owner asked about `-loop 1` and other potentially unclear values. The superseded CI jobs were cancelled deliberately. Separate auditors read all 28 pages in full teaching context and checked pinned FFmpeg documentation/source. Four focused edits resulted; records 08–13 cover facts, rejected expansion, separate prose and fresh reader/sceptic/checker passes.

The builder kept horizontal/vertical direction explicit in the padding note and styled literal loop values/options as code. The new export reference is included in the same state/navigation test. After these changes, strict TypeScript and a new production/offline build passed; the expanded five-project browser test passed again in 12.3s, now exercising four lesson links. Existing commands, media and expected outputs remain unchanged. Final full CI results belong to the latest revision, not the intentionally cancelled earlier runs.
