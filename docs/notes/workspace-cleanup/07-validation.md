# Quality validation

Copyright © 2026 Christopher Snow.

Final `npm run check` exited 0 on 24 October 2026. It ran whole-repository Prettier, copyright checks, unchanged shared-platform hash verification, strict TypeScript, 80 unit tests across 16 files, all recorded-media/native command facts, the production build, and 180 Playwright tests across desktop light/dark, Pixel 7 phone light/dark and Firefox. All 180 passed in 4.6 minutes; none skipped or interrupted. Final log: `/workspace/scratch/cleanup-check-final.log`.

The added end-to-end regression checks Capture's clean ending, flat empty/retained Files, Escape and focus return, Help/draft preservation, enlarged-text dialog reflow and the single offline setup panel. Existing full tests still execute real native commands, media recordings, imports, recipe downloads, reference graders, cancellation, migration and offline updates. Tests follow actual public app controls; they do not invoke private action dispatchers.

Independent built reader, sceptic and checker records are 03–06. Checker final asset was `assets/course-BsKc8YqK.js`, SHA-256 `73d16847eab0d9d17b150a8202cd8f26af08bc73530a2edc4ba668daaad29450`. Separate Chromium and trusted Firefox rehearsal of the public verification harness passed source setup, Files, Help, focus/draft retention, raw probe, actual downloaded six-second/90-picture cut, playback, unified offline controls and 200% reflow.

## Exploratory runs and corrections

Earlier exploratory runs were not green gates. Initial desktop testing passed 32/36; obsolete expectations assumed Capture still had an editor, the encoder panel was a separate disclosure, and unsupported browsers had no encoder button. Those expectations and the unsupported action were corrected; an overly broad new assertion also counted the retained installation-instructions disclosure. Overlapping exploratory Playwright runs additionally collided over trace output; final testing ran one suite at a time.

A subsequent desktop run was interrupted after 22 passes, one failed and two interrupted cases (11 unrun) to fix the inventory adapter leaving its dialog open before direct navigation. A focused run then passed 11/12: the remaining assertion used a filename substring and also matched its intentionally retained recipe. The first full gate was interrupted after 29 browser passes, one failed, two interrupted and 148 unrun to correct that assertion to the exact media filename. Its preceding 80 unit tests and native/media checks had passed. No learner media or deletion policy was changed to satisfy this assertion.

The final complete gate above supersedes these partial runs. The only subsequent documentation edits are formatted separately. GitHub Actions deployment and actual public/old-profile upgrade results are recorded in 08-deployment.md after they complete.
