# Validation and release

Copyright © 2026 Christopher Snow.

Scope: optional codec cross-references on Chapter 2 page 1, plus the verified shared notebook navigation correction. No media command, fixture, storage schema, encoder or offline protocol changed.

- Initial `npm run build`: passed.
- First `npm run check`: intentionally stopped when independent reader/sceptic confirmed the navigation defect; unit/content/media/build checks passed, browser suite incomplete. Log: `/workspace/scratch/codec-links/check-before-navigation-fix.log`.
- Build after navigation correction: passed.
- First focused `npx playwright test tests/course-index.spec.ts`: 6 passed, 4 failed on a test-only exact-zero scroll expectation. Headings were fully visible and main focused; native Chromium focus placed main at Y87/131. The test now checks the meaningful visible-heading/focus requirement. Log: `navigation.log`.
- Final focused same command: 10 passed in 11.1 seconds, covering Chromium desktop/phone light/dark and Firefox. Log: `navigation-final.log`.
- Independent reader and sceptic accepted navigation finding R1; shared guard fixes its cause. Separate checker record: `06-checker.md`.

Full gate and release results are recorded below when complete. Scratch logs and screenshots are under `/workspace/scratch/codec-links/`.

## Final local gate

`npm run check` completed with exit 0 after the navigation fix: 25 unit files / 110 unit tests passed; 336 browser tests passed and 49 were intentionally skipped by their project conditions. Formatting, copyright, shared-platform integrity, strict types, native media and recorded-command verification, all notebook pages, visual facts and the production/offline build passed. Log: `check-final.log`.

No scoped blocker remains after the independent built checker. The final source is authorised for reviewed direct-main publication. Hosted workflow and public-site verification follow publication.
