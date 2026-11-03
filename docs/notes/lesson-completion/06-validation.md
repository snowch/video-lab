# Validation and resolution

Copyright © 2026 Christopher Snow.

Facts/model and implementation: root. Separate copy: completion_copy (GPT-6.1-sol medium). Fresh built learner review: completion_reader (GPT-6.1-sol high). Separate sceptic: completion_sceptic (GPT-6.1-sol high). Final built checker: completion_checker (GPT-6.1-sol high), recorded separately in 05-checker.md.

Both accepted reader findings and the checker’s enlarged-text follow-up were fixed: scoped selectors override general form widths and block labels, and course index links use a wrapping title with a separate nonshrinking tick. Narrow chapter cards reduce indentation and give the title its available width, including at 200% text. The focused browser regression verifies native checkbox width and inline layout as well as behaviour. No command results, saved files, drafts, earlier achievements, route IDs, dependencies or synchronised platform files were changed.

Executed before final full gate:

- `npx vitest run src/notebook/completion.test.ts`: 4 passed (literal parsing, isolated keys, unknown IDs, failed storage/retry, external current values and blocked access).
- `npx tsc --noEmit`, production build, formatting and `git diff --check`: passed.
- `npx playwright test tests/lesson-completion.spec.ts`: 15 passed across desktop light/dark, phone light/dark and Firefox on the final built implementation. Covers keyboard/touch, mark/unmark, final page, index ticks, reload, navigation, cross-tab updates and failed storage with retained session state.

Two early full checks were intentionally stopped for the checkbox CSS conflict and the checker’s enlarged-index fix. Their partial logs are `check-before-css-fix.log` and `check-before-enlarged-fix.log`; neither is a completed gate. The fresh final `npm run check` writes `/workspace/scratch/lesson-completion/check.log`. Final full-suite and hosted results belong in the pull request, with exact totals and links; pending runs must not be reported as passed. Merge only after reviews and successful quality gates. Report deployment separately from merging.

Physical device and screen-reader testing are not claimed. Browser storage can be cleared; reading marks are local and are not certified exercise results. The save-failure note appears only when a write actually fails.
