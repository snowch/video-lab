# Validation — browser recording removal

Copyright © 2026 Christopher Snow.

`npm run check` completed successfully against the final implementation: formatting, copyright, synchronised platform, strict type checking, 73 unit tests across 15 files, recorded-media and course checks, production build, and 185 browser tests across desktop/phone light/dark and Firefox. The seven unit tests for the deleted recording controller were retired with that controller; the browser recording test was replaced with removal and retained-file compatibility coverage.

The focused command `npx playwright test tests/journey.spec.ts tests/recording-guide.spec.ts --project=desktop-light` also passed all 8 tests. A separate Chromium and Firefox rehearsal tested source selection, optional entry, all four guide methods, neutral initial selection and 200% reflow against the built site. No recording controls, capture API calls or page exceptions occurred.

Logs are retained in `/workspace/scratch/remove-browser-recording/check-final.log`, `targeted.log` and `public-local.log`. Reader, sceptic and checker records describe their distinct coverage. Public deployment and a saved-copy upgrade require the separate deployment record.
