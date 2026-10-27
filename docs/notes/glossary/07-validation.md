# Glossary validation and publication

Copyright © 2026 Christopher Snow.

The owner explicitly requested the glossary and merge when done. This slice adds 32 alphabetically arranged definitions with examples, name/alias search and actual lesson links. Course-index and footer links open the reference inside the existing notebook workspace. Reading does not prepare media or processing tools; the glossary belongs to the existing offline bundle.

## Independent workflow

The verified brief, separate prose draft, fresh built learner review, sceptic adjudication, ranked resolution and independent built checker are recorded in `01-facts.md` through `06-checker.md`. The one retained minor finding, Audio sample rate's indirect lesson destination, was corrected to `frames-time/rate` and independently followed online and offline. No unresolved finding remains.

## Checks

On 27 October 2026, the final frozen product source passed:

- `npm run check` — exit 0. Includes repository formatting, copyright, synchronised-platform check, strict TypeScript, 26 unit-test files / 113 tests, all native recorded-media/reference/teaching/notebook verification scripts, production/offline build and the complete Playwright matrix.
- Browser result: **381 passed, 64 configured skips, no failures**, 17.3 minutes. Projects: desktop light/dark, phone light/dark and Firefox. No retry was configured or required. The glossary cases passed search/discovery/reflow on all five projects, active real command/draft preservation on Chromium and Firefox, and cold offline access on Chromium. Independent reviewer probes also exercised offline access and preserved files.
- Earlier focused run: `npx playwright test tests/glossary.spec.ts --project=desktop-light --project=phone-dark --project=firefox` — 6 passed, 3 configured skips. The subsequent full run includes the final aliases and corrected lesson destination.
- `git diff --check` passed. Late review/validation notes receive a separate formatting check after the full gate; no product changes followed that gate.

The full gate log is `/workspace/scratch/glossary/check.log`; reviewer evidence directories are recorded in their notes. The production offline manifest contains 210 files. Existing optional-tool storage and update protection remain intact.

## Publication boundary

The reviewed change is committed directly to main under the owner's standing merge authorisation. Hosted quality and Pages workflows run after push; local success does not claim that hosted deployment has finished. The unrelated untracked `docs/notes/learner-audit-2026-10-18/` directory is preserved and excluded from this commit.
