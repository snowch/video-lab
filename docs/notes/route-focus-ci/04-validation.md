# Validation

Copyright © 2026 Christopher Snow.

- Regression before the fix: `npx playwright test tests/codecs.spec.ts -g 'delayed animation' --project desktop-dark` fails because the container heading takes focus from the link when held animation frames are released.
- Corrected build: `npm run build` passed.
- Repeated targeted checks: `npx playwright test tests/codecs.spec.ts -g 'delayed animation|format references reach' --repeat-each 5` passed all 50 cases across desktop light/dark, phone light/dark and Firefox.
- Independent built checker: see `03-checker.md`; all four viewport/theme cases passed, including keyboard/touch activation, Back/reload, old section URLs and held animation frames.
- Full `npm run check` and hosted CI results will be recorded in the pull request before merge. The suite retains zero retries and all existing assertions.

This repair changes route timing and adds a regression only. There are no new learner-visible strings, media changes or shared-platform edits.
