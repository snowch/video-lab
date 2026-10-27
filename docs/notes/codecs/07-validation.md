# Validation and immediate main commit

Copyright © 2026 Christopher Snow.

The owner explicitly requested committing to main immediately on 27 October 2026. The codec appendix and clearer Chapter 2 introduction are independently reviewed in 03-reader, 04-sceptic and 06-checker, with no retained finding. Native comparison generation/provenance and actual WASM AAC capability evidence are recorded separately.

Passing checks: strict TypeScript, formatting of changed files/review notes, native comparison hash/metadata/full-decoding verification, production build, and focused Playwright tests on desktop-light, phone-dark and Firefox (6 passed, 3 configured skips). The focused cases cover actual playback, exclusivity, measured file labels, navigation, retained active commands/drafts and a new offline page playing all three supplied files. Independent reviewers additionally checked native keyboard/touch controls, downloads and responsive layouts.

The final `npm run check` passed formatting, copyright/platform checks, TypeScript, all 113 unit tests, native media verification (including the new codec assets) and build. Its browser matrix was interrupted by the execution environment restart during the phone-dark project. The saved log ends after test 346; no failure was reported before interruption. This is NOT a completed full-suite pass. Remaining browser cases and hosted CI results are pending at this immediate commit. Log: `/workspace/scratch/codecs/check.log`.

The owner then requested vertically resizable output panes. That implementation is a separate follow-up and is not included in this codec commit. The unrelated untracked learner-audit directory remains excluded. Main publication is explicitly authorised by the latest instruction; hosted CI/Pages must complete before claiming the change is deployed.
