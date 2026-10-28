# Codec continuation navigation — CI correction and independent review

Copyright © 2026 Christopher Snow.

28 October 2026. The owner merged PR 9 as `35a3c07` while its checks were pending. Quality run `40771791866` then reported 425 passing browser cases, 90 configured skips and five failures, all in the first codec-guide test at its old line 71. The correction changes only `tests/codecs.spec.ts`; it does not repair or alter an application route.

## Cause and correction

The formats slice adds a legitimate formats-reference link before the existing lesson links in the codec guide's continuation navigation. The old test used `.getByRole("link").first()`, then assumed its destination was a notebook lesson and waited for `.notebook-source` readiness. The first link now correctly reaches `#/appendix/formats`. That reference page has its own heading/content and intentionally has no notebook source, so the old readiness assertion waits for an element that should not exist.

The corrected test explicitly visits the formats link and checks its authored title, goes Back and checks the codec title, then selects the existing `#/learn/inside-video/inspect` lesson by href. It asserts that exact URL and the existing practice-ready condition. Original media, responsive-reading, listening, lesson backlink, browser Back, glossary and contextual-guide assertions remain. No assertion is removed to conceal a broken route; coverage now distinguishes the two real destinations instead of assuming their order. No retry, sleep, timeout increase, learner copy or product change is involved.

## Independent built verification

A separate checker inspected the final diff and actual built app on an independently started preview at port 4183. Ran standalone browser code, without building or invoking Playwright CLI/global setup:

```sh
node /workspace/scratch/formats-images/ci-navigation/check.mjs
```

Both Chromium and Firefox passed at 393 × 851, dark theme and root font-size 200%:

- Inspected the actual continuation links and followed the old positional first link. It reached the formats URL, showed “Media file formats” and had exactly zero `.notebook-source` elements. This establishes the old assertion's incorrect page-type assumption without a needless timeout.
- Went Back, selected the explicitly named formats link, verified its heading and went Back to the codec guide.
- Selected the inspection lesson's explicit href, verified its URL, waited for its real practice source to become ready, checked its codec-guide backlink, then used Back to return to the codec guide.

Thus neither destination nor Back navigation is broken in these checks. The reviewed correction uses the appropriate page-specific assertions. No independent review finding or further fix is requested. External script, observed hrefs/headings and screenshots are under `/workspace/scratch/formats-images/ci-navigation/`. No product/test edits or commits were made by this checker.

## Focused result and remaining gate

The builder separately ran:

```sh
npx playwright test tests/codecs.spec.ts --grep 'codec appendix links'
```

All five configured projects passed in 12.7 seconds. The checker inspected the result log at `/workspace/scratch/formats-images/codec-navigation-fix.log`; this is the builder's focused execution, not reclassified as the checker's independent run.

The five reported CI failures share the same obsolete positional navigation assumption. This focused correction and the independent two-engine check establish that cause and validate the fix; they do not declare a complete green suite or deployed release. A fresh full quality workflow and successful deployment of the correction remain the delivery gates. The checker did not repeat the unaffected audio encodes, full course, offline/update or physical-device/accessibility checks.
