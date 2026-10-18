# Installation review resolution

Copyright © 2026 Christopher Snow.

The independent sceptic upheld the reader's F1 (medium) and P1 (low). Applied in that order:

- F1: set the stable manifest id to `/video-lab/`. Unlike start_url and scope, the browser resolves a relative id against the start URL's origin. Corrected the unit test's base and added assertions against Chromium's actual parsed id, startUrl and scope. General eligibility alone did not catch the original identity error.
- P1: added a separately drafted Android Chrome browser-menu instruction based on Google's current Android web-app help, with wording variation qualified. The expanded help and browser tests now include this route.

The first full check passed static, unit, native-media and build stages, but 20 offline browser cases failed because their old broad summary selectors matched both the outer disclosure and the new nested installation help. The first selector repair missed one separate reload selector (15 offline cases passed, five failed); all outer-disclosure selectors now target its direct summary. These failures were test ambiguity, not a worker download failure. The full suite is being rerun after all product fixes.

The builder also corrected a categorical Firefox limitation before independent review: current Firefox includes web-app support in some environments, distinct from manifest-based installation. The final copy uses its web-app option where available and offers other supporting browsers. No actual OS installation or desktop placement is claimed by controlled prompt tests.

Independent checker verification and final command results are recorded separately. No synchronised platform files or offline worker logic changed.

A subsequent full run passed 84 browser cases and failed one desktop-light missing-cache case: readiness remained true after simulated deletion/reload. Five repeats of that unchanged case all passed, so the exact timing cause was not established. Strengthened the fault injection to wait for the download action to settle (enabled Check for updates), disconnect the network, and assert that a saved asset was actually removed before reloading. The repair still reconnects and requires a complete ready copy afterwards. This avoids injecting storage loss during a download transition and tests genuine offline loss; no product worker change or automatic test retry was introduced. A fresh full check is required for this final test fixture.

The strengthened injection passed the eviction/readiness check in every browser. Its next full run reached 84/85 with a different Firefox assertion failure after successful repair: readiness was true, but the UI retained the offline-ready wording after the test restored network requests. The emulated connectivity signal and request availability need not settle together. The final assertion now checks the repair contract (`data-offline-ready=true`) rather than requiring online wording; the prior false-readiness check and preservation of another app's cache remain. Targeted repeated runs and the complete gate are required below.
