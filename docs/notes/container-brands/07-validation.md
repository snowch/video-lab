# Validation and publication

Copyright © 2026 Christopher Snow.

## Local checks

`npm run check` exited 0 on 27 October 2026. Log: `/workspace/scratch/container-brands/check.log`.

- Formatting, copyright, unchanged platform, strict TypeScript: passed.
- 25 unit files / 110 tests: passed.
- Native media and all 51 notebook reference commands: passed.
- Native visual verification additionally compares the two recorded Metadata lines with actual source tags. The supplied media assets and their hashes are unchanged.
- Production build and offline bundle: passed.
- Browser suite: 336 passed, 49 configured skips; 16.2 minutes. No full-gate failure or rerun.

The existing responsive visual test now checks the disclosure’s initially closed state, Enter/Space and pointer/touch operation, exact registry destination and expanded reflow. Existing byte-for-byte live-log checks remain intact. No network dependency on the registry is introduced.

Independent drafting, learner review, technical sceptic adjudication and built checking are recorded in 02–06. The builder additionally inspected the final 320px phone disclosure screenshot. No post-review product edits or unresolved findings. Reviews distinguish an already-loaded offline explanation from fresh cold offline installation; the full existing browser suite covers complete offline saving/upgrades separately.

Unrelated untracked `docs/notes/learner-audit-2026-10-18/` is excluded. The owner’s standing reviewed-main authorisation applies. Hosted and live verification results follow after publication.

## Hosted checks and publication

Product commit `39a0648f9903d613c9ae5216d6ec0def8fcc9170` was pushed to `main`. [Pages run 40490937542](https://github.com/snowch/video-lab/actions/runs/40490937542) passed the full `npm run check` gate and deployed successfully on 27 October 2026: 25 unit files / 110 tests, 336 browser tests passed and 49 configured skips (17.4 minutes). No rerun was needed. Logs and result are retained in `/workspace/scratch/container-brands/pages.log` and `pages-result.json`.

The separate [Quality run 40490937589](https://github.com/snowch/video-lab/actions/runs/40490937589) remained in progress installing FFmpeg when release verification finished. Its test gate has not run and is not claimed as passed. The successful Pages workflow independently ran the complete required gate; the Quality workflow was not cancelled or bypassed.

Public verification ran with `node /workspace/scratch/container-brands/public.mjs 39a0648f9903d613c9ae5216d6ec0def8fcc9170` and exited 0. All four fresh desktop/phone, light/dark contexts loaded that exact published commit and build `cd6fb4a81379167f22dbd8da8b7fc381230f778831999f2def0686011b00ff6d`. Checks covered the closed disclosure, keyboard and touch/pointer opening, recorded metadata, the official registry destination, the explicit distinction between `isom` and `mp41`, Chapter 9 navigation and muxing copy, Back navigation, and normal/200% text reflow without document overflow. Desktop light additionally ran actual WASM ffprobe and verified raw metadata output. Results, screenshots and script are under `/workspace/scratch/container-brands/`.

The owner’s registry screenshots confirmed that `isom` is described as the ISO Base Media File Format family, while `mp41` identifies MP4 version 1. The reviewed copy already makes precisely this distinction, so no additional product edit was made in response.
