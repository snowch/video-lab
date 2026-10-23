# Integrated verification

Copyright © 2026 Christopher Snow.

23 October 2026. `npm run check` passed locally: formatting, copyright, synchronised-platform check, strict TypeScript, 75 unit tests, native fixture/hash/picture verification, Module 2 and production media verification, production build/offline integrity and 125 Playwright cases across desktop light/dark, phone light/dark and Firefox (3.1 minutes for browser tests).

Before the full gate, a focused run passed 95 cases and failed five copies of one migration test. That fixture seeded an old project after visiting the new reference CLI had already marked migration complete. Removing the migration marker when constructing the simulated old installation corrected the test; all five migration cases and the complete final suite then passed. No application migration was changed to accommodate an invalid fixture.

Independent review records and the final checker are recorded separately; this builder's gate is not independent review. Deployment and live verification results follow when completed.

A separate actual-browser offline exercise saved the baseline and additional tools, disabled the context network, then reloaded. Both reference sources loaded offline; actual WASM saved the full ffprobe report and passed inspection, encoded the audio/video concat and passed decoded-picture checks, and retained checked progress after another offline reload. This script initially used the wrong string namespace, a closed tools disclosure and the wrong test attribute locator; correcting those harness mistakes yielded the complete pass without application changes.

The committed native evidence script was reproduced from the repository root with a fresh temporary output directory. It completed successfully and reproduced correct-join RMS 0.5173159003362846 and reversed-join RMS 5.471916940159089. No sample or synchronised platform files changed.

Reviewed implementation commit: `b985e63c89d44844d6d34f4070cad5f374c61061`. GitHub [Quality checks run 39959516426](https://github.com/snowch/video-lab/actions/runs/39959516426) passed the same full gate, including 75 unit tests and 125 browser tests (3.3 minutes for browsers). Completed job logs were inspected, rather than inferring success from the local run.

[Pages run 39959516366](https://github.com/snowch/video-lab/actions/runs/39959516366) first spent over four minutes downloading a single 9 MB dependency from Ubuntu's mirror while the other workflow completed. The builder cancelled and retried that deployment attempt on a fresh runner. This was not an application/test failure or an approval rejection. The retry passed dependency setup and runs the full gate again before deployment; final outcome is recorded below.

Pages attempt 2 completed successfully and deployed the reviewed commit. Its completed build logs independently record 75 unit tests and 125 browser tests passing (4.8 minutes for browsers). Both the separate Quality checks workflow and the Pages quality gate are green for this implementation SHA.

Live HTTPS checks at `https://snowch.github.io/video-lab/` passed in Chromium and Firefox, using the normal proxy/system or imported CA trust without TLS bypass. Both old Module 0 and Module 2 challenge links opened the command references. The footer linked the exact deployed SHA `b985e63c89d44844d6d34f4070cad5f374c61061` and reported latest. In each browser, actual WASM wrote and checked the full probe report, encoded and checked the audio/video join, and downloaded it. Native ffprobe confirmed the downloaded join's H.264/AAC streams, four seconds and 48 video pictures. Notes and checked progress survived reload; phone-dark pages had no old parameter forms or horizontal document overflow.

An actual persistent profile prepared against the previous deployed production-CLI version retained its old offline baseline and saved `capture.mp4`. After deployment it showed outdated, downloaded the update through the explicit update control and reloaded to the all-labs CLI/latest indicator. The saved recording and a pre-update storage marker survived, and a real probe of that recording returned its original ten-second metadata. This is a real old-build-to-new-build update, not a simulated version-string test.

Documentation-only closure records these results after deployment; it does not change the deployed app SHA. The pre-existing untracked `docs/notes/learner-audit-2026-10-18/` remains untouched.
