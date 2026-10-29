# Ranked visual-reference fixes

Copyright © 2026 Christopher Snow.

Separate learner and sceptic reviews supported two findings. R1 (medium) fixed first: replace unrelated gradient source/enlargement with a shared illustrative 4 × 4 colour grid. The outlined top-left 2 × 2 group supplies the exact colours displayed in the enlargement. A browser regression compares the actual rendered source and enlargement colours. Caption identifies the conceptual picture and selected group.

R2 (low): keep the definition of remuxing before the example; remove the repeated inherited definition. Retain unique extension/renaming and codec-change/encoding facts. Shorten the conceptual remux caption while retaining the compatible-stream and destination-playback qualifications.

Earlier builder integration corrected a draft alpha state label that hard-coded 0.5 despite a continuously adjustable control. Output now reports the actual value and a word-only state. The browser check covers 0, 1 and 0.95. A first targeted run caught the old draft before rebuild; the next run passed those controls but exposed a test selector matching unrelated app/file-manager details. Scope that assertion to details.format-details. These intermediate failures are recorded, not treated as final passes.

Independent final checker must inspect the rebuilt site, not this description, across phone/desktop and light/dark. Final results and full quality gate will be recorded in 07-validation.md and the PR.
