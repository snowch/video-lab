# Ranked resolution

Copyright © 2026 Christopher Snow.

23 October 2026. Scope: running commit and published-version footer.

1. **R1, medium — accepted and fixed.** The original mismatch hint assumed every visitor had saved the offline copy and could see Check for updates. The separate prose drafter changed the hint to distinguish saved offline copies (Check for updates → Reload to use update) from ordinary online use (refresh while connected). No unrelated offline download is required. The reader's quoted original instruction remains in the evidence record; the revised build is subject to the independent checker.

The separate sceptic upheld R1 and verified the corrected conditional instruction in the rebuilt page; see [02-sceptic.md](02-sceptic.md). No additional application changes were required by the reader review. The footer continues to compare full deployed commits, preserve the page without reloading it, and show uncertainty when offline or unable to fetch valid release metadata.

The expanded offline browser test initially failed in Firefox automation: after an offline reload, context.setOffline(false) restored navigator.onLine and real fetches but emitted no online event. A diagnostic confirmed focus triggered a fresh check. The regression now explicitly dispatches the standard online event after emulated reconnection to test the listener deterministically. Production also rechecks on focus, visible-tab return and its visible/online 60-second interval. No claim of testing physical network reconnection is made.

The first full gate passed 54 unit tests and all non-browser checks, but failed the cancellation browser case in all five projects (110 other browser cases passed): its page-wide `getByRole("status")` now matched both the processing message and the new footer. Scoped that existing assertion to the main lesson region. This preserves the meaningful cancellation assertion while allowing the independent footer live status. Application code did not change; the full gate is rerun after this test correction.
