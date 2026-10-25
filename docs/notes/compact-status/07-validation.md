# Compact App status: final validation and deployment

Copyright © 2026 Christopher Snow.

Validated and deployed on 25 October 2026. Product commits are `b69fef8fdbd58f4df6fd87d4716c9fdf94ed147a` and the navigation/test follow-up `016bf026aef12aab63dfe84918c696fb5adfe3d4`. Independent review and the bounded follow-up are recorded in 01–06. The original failed full run and its fixes remain explicitly recorded in 05; they are not counted as acceptance.

## Required gate

Final `npm run check` completed with exit 0: formatting, copyright, synchronised platform, strict TypeScript, 85 unit tests across 21 files, native media/command verification, production/offline build, and **287 browser tests passed, 38 skipped** (10.2 minutes). The configured browser projects cover desktop and phone in both themes and Firefox. The skips are project-specific test coverage, not new exclusions. The full final log is `/workspace/scratch/compact-status/check-final.log`.

Both hosted workflows passed the same gate on the final source:

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40232084793): 85 unit tests; 287 browser tests passed, 38 skipped (11.8 minutes).
- [GitHub Pages deployment](https://github.com/snowch/video-lab/actions/runs/40232084730): 85 unit tests; 287 browser tests passed, 38 skipped (12.4 minutes); build and deployment succeeded.

The earlier `b69fef8` hosted workflows were cancelled before deployment when the first local full run exposed the disclosure-interaction failures. No green result is claimed for that run.

## Published app

The public release metadata and embedded running identity agree:

- Source: `016bf026aef12aab63dfe84918c696fb5adfe3d4`.
- Build: `16b6042692eafa9b73889a64c356389854a71556749e0777fc9c03f5d2128e55`.
- Complete offline download: 49,041,808 bytes.

Fresh public Chromium checks passed all 40 cases: main and optional workbench entries; light/dark; 1440×900, 768×1024, 390×844, 812×375 and 320×568; 100% and 200% root text size. Checks cover panel/viewport bounds, no document overflow, scrolling to the final installation sentence, Enter/Space, Escape and Close focus return, outside dismissal and nested confirmation Escape. Every case verifies the published source and embedded build. Closed phone/tablet screenshots were also visually inspected. These are browser viewport/enlarged-text checks, not physical-device or browser-zoom claims.

The first public matrix harness incorrectly fetched release metadata relative to the optional page, receiving its HTML 404. Its metadata URL was corrected to `/video-lab/release.json`, then the complete 40-case matrix passed; no product change was required. Evidence is in `/workspace/scratch/compact-status/public-layout.mjs`, `public/layout.json` and screenshots in `public/`.

## Existing saved app

A persistent public browser profile running build `2415dec11befe2ec2320ba2904cf67c4dd25139d9d875f7d2326a8a970d00ccb` used the actual Check for updates → Update → Restart to update actions. The new embedded build matched published metadata. All nine stored file SHA-256 hashes and all four complete cell records matched before and after the update.

The browser process was closed and reopened with networking disabled. The new compact header appeared, Saved offline was verified after cache checking, the source/build identity remained inside the opened panel, Escape restored summary focus, and page navigation worked offline. The same file hashes and cell records were unchanged after this relaunch. Evidence and exact hashes are in `/workspace/scratch/compact-status/public-update.json` and its script/log.

Review screenshots, traces and browser profiles remain external test artefacts. The unrelated `docs/notes/learner-audit-2026-10-18/` directory was not staged or altered. This final evidence-only commit does not change the deployed app's source identity.
