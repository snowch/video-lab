# Validation and delivery

Copyright © 2026 Christopher Snow.

## Reviewed scope

The shared notebook cell and layout, introductory cut model, first two lessons and
export option explanation changed. Commands, media, exercise expectations, file
formats, saved records, offline protocols and the synchronised platform did not.
The plan deliberately covers only recognised simple trims with hash-verified
supplied input; other commands still run normally without a planned-cut diagram.

Separate drafting, reader, sceptic and final checker used GPT-6.1 Sol at medium
effort. Their records identify the actual coverage and follow-up verification.
The final checker accepted the final enlarged-phone toolbar and export revisions.

Committed evidence includes the 144-state local layout matrix and representative
screenshots. The matrix records the first final layout; the subsequent toolbar and
export follow-ups are documented separately in the checker record. Do not mistake
earlier screenshots for a check of the final changed toolbar.

## Focused checks

- `npx tsc --noEmit`: passed.
- `npx vitest run src/notebook/cut-plan.test.ts`: 2 passed.
- Initial `npx playwright test tests/notebook.spec.ts --project=desktop-light`:
  8 passed (22.7s).
- After live-plan placement and full-command sizing,
  `npx playwright test tests/notebook.spec.ts --project=phone-light --project=firefox`:
  7 passed, 9 deliberate project skips (31.2s).
- Final enlarged-phone heading check,
  `npx playwright test tests/notebook.spec.ts --project=phone-light --grep 'outline and every'`:
  1 passed (9.0s), covering every notebook page at 200% root text.

The two interrupted full runs and their counts are recorded in `05-fixes.md`; neither
is reported as a pass. Scratch logs are under `/workspace/scratch/readability/`.

## Final complete gate

`npm run check` completed with exit status 0 (`check-accepted.log`):
82 unit tests across 20 files; all recorded media/schema/platform/command checks;
production build; 269 browser tests passed and 31 deliberate project skips (9.7m).
The browser suite includes the new planned-cut/real-result/changed-source test and
all-page full-command and enlarged-phone-heading checks. No product files changed
after this accepted gate started. Evidence JSON added while it ran was subsequently
checked separately with Prettier; the complete final formatting check also passed.

## Delivery

The complete local gate passed. This change is approved for main by the standing
owner authorisation and independent checker. Actions deployment and the requested
published all-page audit are the next verification steps; their results will be
recorded after this source commit is published.
