# Guided labs verification

Copyright © 2026 Christopher Snow.

23 October 2026. Focused desktop-light/phone-dark tests passed all 34 cases, including actual production media commands, both reference checks, navigation and the new guided task/import flow. Five new browser cases cover absent capture APIs, source-choice buttons that do not load files, short current-task help versus help all, real file import, actual filename use for help/replay/download, a native-verified ten-second source download, task navigation and desktop/phone placement.

The final `npm run check` passed after the help wording fix and prompt-local navigation placement: formatting, copyright, synchronised-platform check, strict TypeScript, 75 unit tests, native media/fixture verification, production build/offline integrity and 130 browser tests across desktop light/dark, phone light/dark and Firefox (3.0 minutes). Earlier complete runs informed review but do not substitute for this final build. No media fixtures, processing dependencies, saved-work schemas or shared platform files changed.

Reader R1 and the separate sceptic's acceptance/fix verification are recorded in 01–03. The final checker independently assesses the final built page; the builder's full gate is not independent review. Deployment and live results follow below.

Deployed implementation SHA: `75aa63489756aa7229cf2c66442abe6d8f679450`. GitHub [Pages](https://github.com/snowch/video-lab/actions/runs/39975444679) and [Quality checks](https://github.com/snowch/video-lab/actions/runs/39975444544) completed successfully. Their completed job logs were inspected: each full gate passed 75 unit tests and 130 browser tests (3.7 / 4.5 minutes for browsers).

Live HTTPS verification passed in Chromium and Firefox at 390 × 844/dark with normal proxy trust and no TLS bypass. Footer linked the exact deployed implementation and reported latest. Absent-API simulation selected useful source alternatives; changing paths did not load media. Contextual help remained short, help all included full limits, and a genuine imported source named live-source.mp4 appeared in task examples/help, visibly replayed, and downloaded as a native-verified ten-second file. Previous/Next were inside the workspace. All seven lab routes had current task panels and no horizontal document overflow. The legacy Module 0 challenge bookmark selected its canonical reference task; the imported source survived reload.

A persistent profile with the actual earlier offline CLI build and a saved capture.mp4 showed outdated, used explicit check/download/reload, and opened the new guided layout/latest indicator. Its original recording and pre-update storage marker remained. An actual ffprobe command still measured the original ten-second source. This was a real old-build update, not only a mocked version-string test.

This documentation-only closure records deployment outcomes without changing the deployed application SHA. The pre-existing untracked learner-audit directory remains untouched.
