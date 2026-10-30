# Integration and validation record

Copyright © 2026 Christopher Snow.

## Final change

The optional command reference at `#/appendix/commands` indexes 53 entries, including 34 literal CLI option forms (33 existing forms plus the newly requested `-h`), taught filters and their parameters, filename syntax and native-terminal examples. It links from the existing reference card. Search and purpose filters use URL query state so lesson navigation, Back and reload retain the lookup. A genuine notebook command cell runs `ffmpeg -h`, uses the same persistent raw output and resize controls as lessons, and has a correct active-command return link. Browsing the reference does not prepare media or fetch processing tools; running help fetches tools when needed.

The owner's later visual request replaces the timestamp lesson's two endpoints with four recorded picture positions, a selectable adjacent interval, calculated clock subdivisions and tick-to-second conversions. The independent exercise now covers the first through sixth pictures, avoiding an answer already visible in the first-four-picture diagram. Commands, expected inspection evidence and saved cell IDs are unchanged.

## Separate passes and resolutions

- Facts/model: `options_facts`, GPT-6.1-sol high; source inventory, official documentation and native tool help. Timestamp model/tests preceded view and separate copy.
- Prose: `options_prose`, GPT-6.1-sol medium; verified briefs and existing page titles. Root integrated and edited the implementation.
- Reader: `options_reader`, GPT-6.1-sol high, actual desktop/phone light/dark pages and controls; baseline and extension addendum in `04-reader.md`.
- Sceptic: `options_sceptic`, GPT-6.1-sol high; official/native evidence and actual built pages; `05-sceptic.md` records accepted findings, rejected printf defect and low-severity search-placement tradeoff.
- Checker: `options_checker`, GPT-6.1-sol high, independently verifies the final built site and fixes in `06-checker.md`.

Resolved: ambiguous native-only heading, unexplained subtitle-style acronym, search reset on Back, and timestamp practice answer exposure. The requested help editor remains above search so search/count/results stay adjacent; the reader's low-priority concern that search starts below the first phone viewport is retained explicitly rather than claimed fixed.

The checker also found that the self-help entry reached the right route but left the command box above the viewport. The final link now focuses and scrolls to the actual editor while retaining lookup state; modified clicks retain ordinary link behaviour. A regression covers focus, visible heading and retained search across all five browser projects. The earlier full gate was deliberately stopped for this fix; the final `check.log` belongs to a fresh full run on the corrected code.

## Executed focused checks

- `npx tsc --noEmit`: passed.
- `npx vitest run src/notebook/command-reference.test.ts`: 4 passed; covers current lesson options, filters, teaching destinations and search behaviour.
- Timestamp model plus existing time-model tests: 8 passed; measured PTS and calculated clock positions verified.
- `npx playwright test tests/command-reference.spec.ts`: 11 passed, 4 intentional skips. Search/navigation/help run in all five projects; the additional cold-offline case runs once in desktop Chromium. The raw help log persists across reload and runs cold offline after the full app download.
- New timestamp browser test: 5 passed across desktop/phone light/dark and Firefox. Verifies changing intervals, absolute versus elapsed timestamps, clock marks, preserved command draft and 320px/200% text reflow.
- `npx prettier --check .`, `git diff --check`, production build: passed before full-suite execution.

Early focused failures after adding the help cell were test-selector ambiguity between its Ready status and the search result status, not a failed help run. The final focused selector addresses the search's own status; all final focused cases passed.

## Full quality and merge gate

Run `npm run check`, identical to CI, for formatting, copyright, unchanged shared platform, strict types, unit tests, recorded media, schema/reference checks, build and the complete browser suite. Root's local log is `/workspace/scratch/command-reference/check.log`. The pull request for branch `codex/command-option-reference` records its final exit status and exact totals, together with hosted quality-run links. Merge requires successful completion of this gate and the independent checker; focused tests alone do not authorise a green-build claim. Deployment status and published release identity are reported separately from successful merge.

Physical-device and screen-reader testing are not claimed. Real native capture hardware was not used; those entries rest on the official device documentation and the existing course guide.
