# Terminal cue verification

Copyright © 2026 Christopher Snow.

23 October 2026. Five focused browser cases passed across desktop/phone light/dark and Firefox. The existing keyboard/layout test now checks visible right cue, absent initial left cue, right-button scrolling and output focus, far-right cue removal, previous-button recovery, exact output preservation, and hiding cues/fades while wrapping.

`npm run check` passed locally: formatting, copyright, synchronised-platform check, strict TypeScript, 75 unit tests, native media/fixture verification, production build/offline integrity and 125 browser cases (3.0 minutes). The display-only change introduces no media facts, dependencies or changes to command execution. Independent drafting, reader, sceptic, resolution and checker records remain separate. Deployment/live verification follows below.

Deployed implementation: `8e980b518c4e63206c399823f8620ebeff27b1fe`. The first push encountered a transient GitHub credential failure; the next push succeeded without changing credentials or implementation. [Quality checks](https://github.com/snowch/video-lab/actions/runs/39966083020) and [Pages](https://github.com/snowch/video-lab/actions/runs/39966082974) both completed successfully. Inspected completed logs record 75 unit tests and 125 browser tests passing in each full gate (3.5 / 4.8 minutes for browsers).

Live HTTPS checks in Chromium and Firefox at 390 × 844/dark confirmed the footer's exact deployed SHA/latest indicator, actual help output, conditional right/left cue controls, button scrolling and focus transfer, right cue removal at the end, left-button recovery, cue removal while wrapping, identical raw output text and no document overflow. Connections used normal proxy trust without TLS bypass. Physical touch swipes and screen readers were not tested.

This documentation-only closure records deployment outcomes without changing the deployed application SHA. The pre-existing untracked learner-audit directory remains untouched.
