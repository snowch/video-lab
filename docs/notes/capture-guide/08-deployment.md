# Published recording guide and offline upgrade

Copyright © 2026 Christopher Snow.

Implementation `c29ec40af355533965176843bd24793cd5728898` was pushed to authorised `main` and published on 24 October 2026. Both workflows succeeded:

- [Quality checks, run 40079821661](https://github.com/snowch/video-lab/actions/runs/40079821661), job 120830846969: full repository gate, including 80 unit tests and 185 browser tests.
- [Deploy GitHub Pages, run 40079821672](https://github.com/snowch/video-lab/actions/runs/40079821672), build job 120830847267: its independent full gate also passed 80 unit tests and 185 browser tests, then Pages deployed successfully. Its browser run took 6.2 minutes.

## Actual public site

Chromium and trusted Firefox verified the real HTTPS site through the session proxy with certificate verification enabled. Both checked the source heading/document title **Choose your source video**, followed **Recording guide (optional)** to `#/appendix/recording`, checked all five methods and 200% text reflow, then returned to the saved source. The appendix has no numbered journey step, native editor or automatic processing-tool download. macOS keeps its explicitly labelled SCREEN_INDEX placeholder and Linux has the session decision before installation checks.

Actual clipboard copying succeeded in both browsers. Chromium was explicitly granted clipboard permission and the read-back bytes exactly matched the displayed Windows native command; Firefox also reported successful copying through its actual API. Independent built-site tests separately covered denial/manual-copy feedback. Both public browsers identified the exact implementation commit in the footer and confirmed it matched the published version. No page exceptions or `/encoder/` asset requests occurred.

Screenshots: `evidence/public-chromium-linux.png` and `public-firefox-linux.png`. Harness/log: `/workspace/scratch/capture-guide/public.mjs` and `public-live.log`, exit 0. The prior local rehearsal is recorded separately in 07-validation.md; it is not claimed as public evidence.

## Upgrade with baseline lessons only

Before publication, a fresh persistent Chromium profile on old public build `293dc2c` saved the actual Mousepad source, its byte hash, custom draft `ffprobe -v error mousepad-demo.mp4`, and baseline offline lessons. It deliberately did not save processing tools. Snapshot: `/workspace/scratch/capture-guide/public-before.json`.

After publication, the same profile used Check for updates / Reload to use update and reached `c29ec40`. Source and exact draft were preserved. Downloading the source before and after the upgrade yielded the same SHA-256 `d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e`. The new appendix, all selected methods and actual clipboard action worked. The browser then disconnected, reloaded the guide, selected phone/tablet instructions, returned to the renamed source lesson and checked the source bytes and custom draft again. No processing core was downloaded or required to read the appendix.

Evidence: `evidence/public-upgrade-linux.png` and `public-upgrade-offline.png`; harness/log: `/workspace/scratch/capture-guide/public.mjs verify` and `public-upgrade.log`, exit 0. This is a browser-profile/service-worker upgrade, not physical-device recording or an installed-app claim. Native Windows/macOS examples remain source-reviewed; the executed native Linux proof is documented in 01-facts.md.

A subsequent documentation-only closure commit uses `[skip ci]`; the published application remains build `c29ec40`. The unrelated pre-existing learner-audit directory was preserved and not committed.
