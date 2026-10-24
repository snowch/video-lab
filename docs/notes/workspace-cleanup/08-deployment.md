# Published deployment and upgrade verification

Copyright © 2026 Christopher Snow.

Implementation `293dc2c3d72c5ba735017a3395c275ef5eb1134f` was pushed to authorised `main` on 24 October 2026. Both GitHub workflows completed successfully:

- [Quality checks, run 40077433550](https://github.com/snowch/video-lab/actions/runs/40077433550), job 120823739708. Decoded job logs confirm 80 unit tests and 180 browser tests passed; browser run 6.0 minutes.
- [Deploy GitHub Pages, run 40077433619](https://github.com/snowch/video-lab/actions/runs/40077433619), build job 120823739950. Its independent full check also passed 80 unit and 180 browser tests; browser run 7.7 minutes. The subsequent Pages deploy succeeded.

## Public site

Actual HTTPS browser verification on `https://snowch.github.io/video-lab/` passed in Chromium and trusted Firefox through the session proxy, with TLS verification enabled. Both verified:

- Clean Capture ending with no generic management/native-editor/offline stack; actual source preview and continuation.
- Flat Files empty/retained states, no redundant inventory/achievements, Escape/focus return and an actual output download.
- Actual raw bare ffprobe output for the twelve-second source; Help/draft preservation; no production comparison action.
- Real browser FFmpeg six-second output, downloaded and independently probed as 90 pictures, then played in the browser.
- One global offline panel with the optional tools and baseline relationship; 200% text without document/dialog overflow.
- Footer identifies implementation `293dc2c` and matches the published version; no page exceptions.

Public screenshots: `evidence/public-chromium-source.png` and `evidence/public-firefox-source.png`. Harness and final logs: `/workspace/scratch/workspace-cleanup/public.mjs` and `public-live.log`. Its prior local rehearsal also passed both browsers; no rehearsal image is labelled public evidence.

## Old saved-copy upgrade

Before publication, a fresh persistent Chromium profile was seeded on actual old public build `74891ca`: source, an actually encoded one-second `upgrade-cut.mp4`, matching recipe, custom draft `ffprobe -v error mousepad-demo.mp4`, baseline lessons and optional processing tools. The snapshot is `/workspace/scratch/workspace-cleanup/public-before.json`.

After publication, the same profile used the app's update/check/reload path and reached build `293dc2c`. Source, output, recipe and exact draft were retained; the old output played. The browser context then went offline, reloaded the new application, and actually ran bare ffprobe with its saved processing tools. Native output reported the expected twelve-second source. Evidence: `evidence/public-upgrade-offline.png`; harness/log: `/workspace/scratch/workspace-cleanup/public-upgrade.mjs` and `public-upgrade.log`, exit 0.

This is browser-profile/service-worker verification, not a claim about physical installation or every real device. No storage schema, media fixture, engine or synchronised platform migration was introduced. A following documentation-only closure commit uses `[skip ci]`; the published application build remains `293dc2c`.
