# Public deployment — one offline download

Copyright © 2026 Christopher Snow.

Reviewed implementation `8b2f42266670d29491f5425211879172df2edafb` is deployed at <https://snowch.github.io/video-lab/>. [Quality checks](https://github.com/snowch/video-lab/actions/runs/40110320820) and [Deploy GitHub Pages](https://github.com/snowch/video-lab/actions/runs/40110320859) both succeeded. Decoded completed job logs 120920489626 and 120920489865 show 73 unit tests across 15 files and 190 browser tests passing in each workflow. Public browser checks verified the exact running commit, using the configured proxy with normal TLS verification.

Fresh public Chromium and Firefox contexts confirmed no encoder-asset request before the explicit offline action, no separate tool-download panel/button, and the combined size **41.85 MB · 41,849,693 B**, matching the public manifest sum. One Download for offline use activation reached complete readiness. Disconnected and reloaded, ran actual bare WASM ffprobe against the practice source, then actual FFmpeg to produce a one-second MP4. Downloaded bytes were independently checked with native ffprobe for duration and a video stream. The optional working entry also loaded and executed its probe offline. No page exceptions occurred. Screenshots: `evidence/public-live-*`.

## Saved-copy upgrade

Before publication, saved a persistent public Chromium profile on release `e4f56289bd8a6e372aa0e6992fd37dde3ba0a329`. It held a lesson-only offline copy, a real imported older browser-created WebM with its stored origin set to `captured` to model historical provenance, and exact custom draft `ffprobe -v error earlier-browser.webm`. This is compatibility evidence using existing recorded bytes; no new browser capture was performed or offered.

The actual Check for updates and Reload to use update controls activated the new release. The WebM download retained SHA-256 `e1a328b8e7cfe7cea683629e05fa98d8b5e12cc6fe785b41a678305558a39818`, and the custom draft survived unchanged. The new UI correctly marked the lesson-only copy incomplete. Its same single Download for offline use action completed both packages. After disconnecting and reloading, actual WASM ffprobe identified the retained source as VP9, actual FFmpeg encoded a one-second MP4 which passed native ffprobe inspection, and the original source downloaded unchanged offline. The optional working entry also probed its practice source offline. No cache deletion, storage migration or forced worker activation was used to pass the upgrade. Screenshot: `evidence/public-upgrade-chromium.png`.

Reproduction and logs: `/workspace/scratch/unified-offline/public.mjs`, `seed.mjs`, `public-before.json`, `public-seed.log`, `public-live.log` and `public-upgrade.log`. All final public runs completed successfully; no final public retry was needed. The separate earlier local rehearsal selector corrections and interrupted pre-fix gate are recorded in 05-fixes and 07-validation.
