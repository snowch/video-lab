# Ranked offline-access fixes

Copyright © 2026 Christopher Snow.

Prepared 18 October 2026 from `02-sceptic.md`. Both reader findings are upheld at medium severity; neither alleges lost offline assets or saved work.

| Rank | Finding | Smallest accepted direction | Checker acceptance in the final built page |
| --- | --- | --- | --- |
| 1 | R1 — waiting update obscured by an operation notice | Clear an obsolete current result when a complete update arrives; retain the existing waiting/reload explanation even when a later operation fails. | A background update after “up to date” shows the update-ready explanation. If a newer install fails while an earlier complete update remains waiting, the failure and still-available update are both intelligible; Reload retains its multi-tab consequence explanation. |
| 2 | R2 — failure hides retained offline readiness | Recheck active-cache completeness after failure. Use the separately drafted retained-copy failure text only when the active copy is actually complete; name “Check for updates” for retry. Preserve cautious initial/incomplete-save feedback. | Failed update and disconnected check with a complete active copy visibly confirm offline availability; old-copy reload/media still work. If completeness has been lost, the same failure must not promise a usable complete copy. Initial failure never reports ready. |

Implementation status at review: the exact original R1 background-update sequence already passed my three current-build browser cases. The builder then reported wiring R2 and adding a persistent waiting explanation. Those later fixes require final independent checker verification; do not present the reader's pre-fix screenshot as current behaviour or my baseline tests as verification of later code.

No finding was rejected in full. Rejected claims/assumptions: generic failure does not establish corruption or loss; a ready data attribute alone is not sufficient evidence for a user-facing promise; a disconnected check with an already waiting worker did not independently reproduce the combined failure state. Use a genuinely failed newer installation while retaining the prior waiting worker to exercise that combination.

No other ranked product change emerged. Record the final checker's built-page observations and the builder's complete quality/deployment results separately. The sceptic's narrower browser and twelve-unit-test pass is not the full check.
