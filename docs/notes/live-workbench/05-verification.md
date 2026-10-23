# Verification

Copyright © 2026 Christopher Snow.

23 October 2026, native FFmpeg/ffprobe 7.1.5-0+deb13u1, Node 24. This record concerns the working three-step entry, not migration of the historical curriculum.

- Native media capture, source hash and probe: `scripts/verify-workbench.mjs` passes. The exact source is 74,303 bytes, SHA-256 `d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e`, twelve seconds/180 frames/15fps, one H.264 video stream and no audio. Native default trim is six seconds/90 frames, silent. Separate reader and checker also downloaded actual WASM exports and verified them with native ffprobe.
- Model verification: four new tests cover authentic argument composition, explicit overwrite versus protected inputs, rejection of invented commands/shell syntax, and explicit collision-safe import names.
- Focused browser verification: fifteen tests passed across desktop/phone light/dark and Firefox. They execute actual probe and encoding, verify the downloaded MP4 and exact source-hashed recipe, preserve manual drafts through reload, exercise source protection and missing-input recovery, cancel/retry, import renaming, replay seek retention and true offline reload/execution with deliberately saved tools.
- Independent reader and sceptic upheld the ended-operation status issue and small-screen enlargement guidance. Both were fixed. The revised focused desktop run passed three tests, including failed status/log hint and keyboard-focus assertions.
- `npm run check` passed: formatting, copyright, unchanged shared-platform sync, strict typecheck, **79 unit tests in 15 files**, all native media verification scripts, production/offline build, and **145 browser tests in 3.5 minutes**. Log: `/workspace/scratch/live-full-check.log`.
- After that gate, corrected the new entry's favicon reference to the already existing `icons/video-lab.svg`, then rebuilt and checked formatting. This static path correction does not change the reviewed workbench JS (`workbench-IG0K6rpb.js`, SHA-256 `f5f5bf3bdd446d4436aa94d8bcfb372f16c21aafe0ee6ff85a90c89e9571fdd0`). The independent checker verifies the final HTML/icon response. CI repeats the full gate on the deployment commit.

The full suite continues to cover existing course routes, original reference evidence, capture lifecycle, offline updates, installation and release freshness. No real physical phone, screen reader or arbitrary native FFmpeg installation is claimed by these automated browser checks. Core size and supported features remain those of the existing pinned browser build.

Reviewed deployment and public verification are recorded separately in `06-deployment.md` after completion.
