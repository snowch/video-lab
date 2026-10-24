# Public deployment — browser recording removal

Copyright © 2026 Christopher Snow.

Implementation commit `e4f56289bd8a6e372aa0e6992fd37dde3ba0a329` was reviewed, pushed to main and deployed at <https://snowch.github.io/video-lab/> on 24 October 2026. Both [Quality checks](https://github.com/snowch/video-lab/actions/runs/40100764660) and [Deploy GitHub Pages](https://github.com/snowch/video-lab/actions/runs/40100764612) succeeded. Decoded completed job logs (120892253025 and 120892253257) independently show 73 unit tests across 15 files and 185 browser tests passing in each workflow.

Fresh public Chromium and Firefox contexts verified the exact running commit, production practice source and optional workbench, absence of recording controls, neutral four-method guide, all device selections and 200% reflow. Capture APIs were replaced with throwing traps; no page exceptions or capture calls occurred. Screenshots are under `evidence/public-*`.

## Saved-copy upgrade

Before publishing, seeded a persistent public Chromium profile on release `c29ec40af355533965176843bd24793cd5728898`: imported the genuine older browser-created VP9 WebM, changed only its stored origin to `captured` to model historical provenance, saved the exact custom draft `ffprobe -v error earlier-browser.webm`, and downloaded baseline lessons without processing tools. This was a real import of existing bytes, not new browser recording or a supplied course sample.

The first post-deployment update check did not expose Reload within the harness's 120-second polling limit. That run failed and is not counted as passing. A subsequent diagnostic Check for updates exposed the ready update; rerunning the same upgrade harness then passed through the actual Reload to use update control. No app changes, cache deletion or forced worker activation were used to make it pass; the cause of the first delay was not established.

After activation, verified the exact published commit, unchanged custom draft, actual playback and download of the older recording, and identical SHA-256 `e1a328b8e7cfe7cea683629e05fa98d8b5e12cc6fe785b41a678305558a39818`. Disconnected and reloaded the saved source, downloaded the same bytes offline, opened phone/tablet guide instructions offline, then reconnected and ran actual bare WASM `ffprobe earlier-browser.webm`; raw output identified VP9. Both source entry points still lacked browser recording controls. The public browser checks use the configured proxy with normal TLS verification.

Harness and logs: `/workspace/scratch/remove-browser-recording/public.mjs`, `public-before.json`, `public-live.log`, `public-upgrade.log` (initial timeout), `diagnose.log`, and `public-upgrade-retry.log` (passing completed upgrade). Native Windows/macOS recording was not physically executed as part of this removal slice. Previous native-device command evidence remains unchanged.
