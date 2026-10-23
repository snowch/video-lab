# Deployment and public verification

Copyright © 2026 Christopher Snow.

Deployed implementation commit: [`5e20f8e833c39fc72a9a0c9aa11d5af6f0f7edad`](https://github.com/snowch/video-lab/commit/5e20f8e833c39fc72a9a0c9aa11d5af6f0f7edad), 23 October 2026. Reviewed main deployment was already authorised by the owner.

- [Pages workflow 40016146523](https://github.com/snowch/video-lab/actions/runs/40016146523): build and deploy succeeded. Build job `120628581151` includes the complete `npm run check`; deploy job `120631502273` published the artifact.
- [Quality workflow 40016146507](https://github.com/snowch/video-lab/actions/runs/40016146507): check job `120628580194` succeeded on the same commit.
- Local full gate passed 79 unit and 145 browser tests, plus formatting, typecheck, copyright, platform sync and native media verification. Independent built review and the final icon correction are documented in `04-checker.md` and `05-verification.md`.

Public URL: https://snowch.github.io/video-lab/optional/command-workbench.html

After deployment, fresh Chromium and Firefox sessions loaded that public URL through the configured trusted proxy. Both executed actual ffprobe against the new Mousepad source, then the default FFmpeg trim. Native ffprobe of each actual downloaded MP4 verified six seconds, 90 pictures and exactly one video stream (no audio). Each downloaded execution recipe carried the source SHA-256 `d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e`. Both pages showed the deployed commit and “Matches the published version”, loaded the corrected icon, had no page JavaScript errors and no document-wide overflow at 390 × 844 dark. Script, logs, screenshots and native JSON: `/workspace/scratch/live-workbench/public.mjs`, `public.log`, `public-*`.

Offline save/reload/actual execution was independently verified against the production build locally; the public pass specifically verifies deployment, real tools, exported bytes, recipe provenance, phone layout and release identity. No physical-device or universal-codec claim is made.

The new workbench is complete for the approved three-step slice. The original course/reference routes and fixed-fixture media remain available; this release does not claim to migrate the entire historical curriculum. The pre-existing untracked learner-audit directory was preserved.
