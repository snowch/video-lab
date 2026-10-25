# Primary-button contrast — bounded fix

Copyright © 2026 Christopher Snow.

Scope: fix the existing primary-action hover colours shared by notebook commands, chapter continuation links and archived labs. The defect and verified colour evidence are in 01. This is a presentation-only change with no new or altered learner-visible prose, so a separate prose draft is not applicable. Existing labels, command behaviour, files and saved records remain unchanged.

Generic hover now excludes disabled controls. An explicit primary hover rule retains the accent background and original contrasting label, with the same modest brightness feedback already used by the optional workbench. The existing keyboard focus outline and disabled opacity remain in place. The optional entry owns its separate stylesheet and needs no product change.

The new actual-browser regression first failed against the previous built page at the hover contrast assertion. After the fix, all five projects passed: Chromium desktop and phone light/dark plus Firefox. The test checks at least 4.5:1 text contrast before hover, during hover, after the real five-second command completes by tap or click, with focus and on the primary continuation link. It accounts for the applied brightness filter. Full gate and separate reader/sceptic/checker results follow.

No unrelated learner-audit notes or runtime-abort evidence were modified. Generated review artifacts live outside the repository in `/workspace/scratch/button-contrast/`.
