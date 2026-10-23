# Deployment and public verification

Copyright © 2026 Christopher Snow.

Implementation commit [`3fe5a58450a3fa5347087243e91176befbce81e5`](https://github.com/snowch/video-lab/commit/3fe5a58450a3fa5347087243e91176befbce81e5) was deployed to the existing [workbench URL](https://snowch.github.io/video-lab/optional/command-workbench.html) on 23 October 2026 under the owner's standing reviewed-main authorisation.

- [Pages workflow 40021352414](https://github.com/snowch/video-lab/actions/runs/40021352414) succeeded: full quality gate/build job `120646418657`, deploy job `120649317409`.
- [Quality workflow 40021352478](https://github.com/snowch/video-lab/actions/runs/40021352478) succeeded: check job `120646416399` on the same final commit, including the terminal-following change.
- Local engine gate: 79 unit and 150 browser tests passed. The subsequent terminal-following change also passed typecheck/formatting and 20 targeted browser cases. Both CI workflows repeated the full gate for the exact final source.

Fresh public Chromium and Firefox sessions at phone width/dark theme ran the new default inspection. Actual native-looking Duration/Stream logs were directly visible and at their tail. Missing input correctly failed with the real log rather than accepting the ambiguous wrapper value. Explicitly typed JSON remained optional, visible and byte-equal to its report download. Real FFmpeg logs remained visible; downloaded MP4s were independently checked by native ffprobe as six seconds/90 frames with one video stream and no audio. Downloaded recipes identified the pinned Mousepad source hash. The deployed footer showed the correct implementation commit and latest-published status. No page JavaScript errors or document-wide overflow occurred, and the icon loaded. A separate fresh public browser check confirmed the initial command is exactly `ffprobe mousepad-demo.mp4`.

Public script and evidence: `/workspace/scratch/raw-output-public.mjs`, `raw-output-public.log`, `raw-output-public-{chromium,firefox}.png` and native exported-report JSON beside them. Local final check/evidence records are in `04-checker.md` and `05-verification.md`. Public verification did not repeat physical-device or screen-reader testing. Existing saved-work/reference media and the pre-existing untracked learner-audit directory were preserved.
