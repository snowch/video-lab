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
