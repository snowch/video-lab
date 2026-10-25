# Readability fixes

Copyright © 2026 Christopher Snow.

The first implementation removes outer source/cell/diagram borders, option row
rules and observation rules. Editable commands and raw results retain boundaries.
Prose is limited to 62 characters of measure; the first command has three short
option explanations. Shared layout changes apply to all notebook pages.

The reader's medium finding is accepted: after a run, the planned cut was separated
from the editor by the result. It now appears immediately before the editor, after
the optional builder. Run and actual raw results remain adjacent. Static join and
colour models stay with their explanatory notes, explicitly labelled as models.

The sceptic's phone finding is accepted: the join editor's fixed rows clipped the
complete command. It now fits its contents when command or available width changes.
The all-page browser check verifies that no command needs internal vertical
scrolling, including at 200% text. Manual textarea resizing remains available.

The live plan recognises only the introductory decimal-seconds trim syntax and
requires actual loaded bytes to match the supplied asset hash. It caps the selection
at the source end and disappears for unsupported commands, missing/replaced files,
invalid edits and starts beyond the source. Saved raw output continues to show the
last executed command when the editor changes. This model is not measured output.

The reader's low export option-density observation is also resolved: the separate
prose drafter moved component, plane and sampling definitions into connected concept
prose before the command and shortened the option row. No technical content,
command, task, model caveat or compatibility limitation was removed. Sceptic and
checker verified the built revision.

The checker identified a further low issue at 200% text: sticky phone navigation
occupied nearly half the viewport. Below 600px it now scrolls with the page; tablet
and desktop retain sticky navigation. The checker verified unobscured headings,
touch navigation/dialogs and both larger sizes. The all-page phone browser test
now checks that navigation cannot cover a scrolled-to heading at 200% text.

The initial full check was deliberately interrupted after the reviewers identified
the final two fixes: 82 unit tests passed, browser phase 24 passed, 2 interrupted,
274 did not run. That run is not a passing quality gate. The final complete gate
and independent final-build verification are recorded separately.

A second full check was stopped for these two final low-priority fixes: 82 unit
tests passed; browser phase 124 passed, 9 skipped, 2 interrupted, 165 did not run.
It is also not a green gate. Only the subsequent uninterrupted accepted run counts.
