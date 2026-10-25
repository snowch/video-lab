# Compact header App status — implementation and ranked fixes

Copyright © 2026 Christopher Snow.

The requested reference is Assembly Lab's header disclosure. Research and separately drafted badge text are in 01 and 02. Both Video Lab entries now mount one compact App status inside the header. The closed control has separate update and offline badges. Version inside the panel retains the embedded source link and deterministic build suffix. Existing full explanations and update/download/install/removal actions remain inside. The main header uses brand, status and theme controls; Course overview remains in the notebook toolbar and brand link, and Source and evidence remains in the footer.

The update/offline hooks, worker protocols, cache verification, participant guards, user storage and synchronised platform are unchanged. Presentation labels expose current transfer, paused and failure states without replacing full error explanations. Closing the disclosure does not cancel background work. Explicit Close, Later and Escape return focus to the summary; outside pointer dismissal leaves focus with the clicked target. Escape in the native removal confirmation closes that dialog first and preserves the outer panel.

## Review resolution

The independent reader and sceptic retained four medium presentation findings. Applied each before acceptance:

1. R1: replace the fixed height subtraction with actual header/visual-viewport measurements. A fixed panel has viewport-relative horizontal bounds and a measured top/max-height, updated on header resize, viewport changes and scrolling. Enlarged headers leave useful panel space; the final installation paragraph is reachable.
2. R2: remove duplicate main-header links so the enlarged desktop status does not collapse into a narrow tall column. Main phone layout wraps brand/theme naturally before the status row. The checker found an intermediate 320px theme overflow and then a crushed brand column; the final wrapping layout resolves both.
3. R3: anchor the panel to the viewport, rather than the optional entry's narrower centred header. Its edges remain inside the screen.
4. R4: give the shared control a local rem-based font and inheriting paragraph/code/action sizes. Both entries enlarge consistently without rewriting the optional workbench's unrelated typography.

The final independent checker verified all four fixes in 40 built-page cases and exercised genuine save/cancel/resume, offline reload and failed-check Retry. The initial reviewed findings and evidence limitations are retained, not replaced by only successful results.

## Regression checks

A new actual-browser test covers both entries, compact closed identity, independent offline state, keyboard opening, close/Escape/outside dismissal, nested confirmation focus, panel bounds, 200% root text and 320px header reflow. It passed all five Chromium/Firefox projects after the final changes. Firefox reports 43.999996px for an exact 44px target; the test rounds geometry to two decimal places for that threshold. Its initial outside-click target was covered by the opened panel; corrected the harness to click actual header padding outside the disclosure. These test corrections do not relax panel-state assertions.

Existing running-identity assertions now inspect the Version element rather than expecting code in the summary. The App status contract documents the new placement. Earlier focused release uncertainty and coordinated notebook-restart tests passed; the full repository gate and published checks are recorded separately. Generated artefacts are outside the repository under `/workspace/scratch/compact-status/`; unrelated learner-audit notes remain untouched.

## Full-suite follow-up

The first full local gate was **not green**: 267 browser tests passed, 38 were skipped and 20 failed (the same four cases across five projects). Its complete log is retained as `/workspace/scratch/compact-status/check-accepted.log`; the filename predates the result and does not mean acceptance. Traces are retained under `initial-failures/`. Early progress updates based only on the log tail missed earlier failures; the builder corrected that report when inspecting the complete failure list. Hosted runs for `b69fef8` were cancelled before deployment.

Three older offline scenarios attempted lesson actions behind an open floating status panel, or tried to download again after an outside action had closed it. They now explicitly use Close App status when returning to the lesson and reopen the panel before downloading. All existing real-asset, offline, removal, sibling-storage, two-window activation and retained-work assertions remain. The workspace-tools test now selects the actual summary, rather than matching its former exact text without the disclosure arrow. No forced clicks or skipped assertions were added.

Hash navigation also retained the open panel. The component now dismisses it on `hashchange`, including browser navigation, without moving focus back to the header. The listener is removed on unmount. The compact-status regression covers navigation dismissal in both entries, and the independent checker was asked to verify this bounded product/test follow-up before the final full gate.

The focused cross-browser rerun passed 14 of 15 cases and exposed one further Firefox-only hit-test obstruction at the end of the two-build scenario: it opened App status to inspect offline readiness and then clicked Files behind it. An explicit Close before reading the retained note fixed that final scenario; the targeted Firefox rerun passed (1 test, 27.2s). No readiness, preserved-data or coordinated-restart assertion was changed. The full suite must still pass on the final source.
