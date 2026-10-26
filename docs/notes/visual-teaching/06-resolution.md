# Ranked fixes and integration

Copyright © 2026 Christopher Snow.

The separate reader and sceptic reviewed the first built candidate. Their
reports identify real teaching and rendering defects despite zero overflow.

1. R1, high: the excerpt selector mistook hexadecimal stream ID `0x1` for a
   dimensions token. Select the exact dimensions established by the source's
   measured metadata. A rendered-guide regression test requires the literal
   video excerpt to contain `854x480`, never the ID in that position. The real
   runtime log is unchanged plain text.
2. R2, medium: lay out copy and encoding as two vertical paths beside each other
   where space permits, then stack the paths on phones. No six-column prose
   labels. Give phone dependency captions full width and place file-beginning/
   file-end labels above/below vertical MP4 layouts. Keep readable font sizes.
3. R3, medium: introduce libx264 and CRF with lower/higher direction before the
   comparison figure. Replace the unnecessary new term packets with encoded
   data in the model. Exact command options and real logs remain unchanged.
4. Sceptic S2, medium: the timestamp figure now teaches the old practice answer.
   A separate prose pass changes practice to two picture intervals (first to
   third picture), requiring transfer from the worked single interval. The
   verified reference is 1024 ticks = 1/12 second; the final progressive hint
   contains the answer. Existing inspection command and truthful manual-check
   limits remain unchanged.
5. Sceptic S4, low: remove mobile stream-output arrows that could imply a serial
   path after the stream boxes stack. Labels and the explanation identify two
   separate commands using the same original.
6. R4, low: remove targeted concept/figure repetition on amplitude, fade,
   copying and faststart. Retain prerequisite definitions, fade start-plus-
   duration arithmetic, listening conditions and command-specific observations.
   Figures own their illustrated mechanism and its model limitations.

Additional author decisions: retain the existing first-cut/join/pixel-format
figures; use inline semantic strong/code styling only on authored teaching copy.
Do not parse learner commands or logs as markup. Use ordinary evidence links for
provided images instead of adding collapsed fixture-build command sections.
Whole native quality outputs are retained alongside lossless crops so reported
file sizes and source frames can be independently verified. The verifier checks
committed hashes and native semantics without demanding different encoder builds
produce byte-identical new encodes. All new assets join the existing offline
manifest automatically.

Separate implementation/evidence/prose agents used GPT-6.1 Sol Medium or High
according to task; reader, sceptic and checker are separate Sol High sessions.
No author declares their own work independently checked. Full quality results
and hosted verification are recorded after the final checker.

## Final checker follow-up

At 320px with doubled root text, the dependency model's six letters exceeded
their narrow boxes even though the overall figure nearly fitted. Reduce only
this narrow layout's gaps and arrowhead size, remove horizontal box padding,
and retain the same text size and dependency order. A browser assertion now
checks each actual glyph's bounds within its box at 320px/200% in every browser
project. The checker also identified an existing unexplained packets noun in
the keyframe command explanation; the separate prose agent replaced it with
data while leaving raw command/log text unchanged.

The first full gate was intentionally interrupted for these fixes: exit 130,
157 browser tests passed, 14 skipped, two interrupted and 167 not run. Its log
is `check-interrupted.log` in the external evidence directory. A fresh full
quality run covers the corrected source; no result from the partial run is
presented as a complete pass.

The checker also found fragmented captions in the retained 4:2:0 diagram at
narrow enlarged text. Because it belongs to the course's visual teaching, stack
its three component grids on phones while retaining all four Y samples and the
one U/one V samples. Desktop geometry and all explanatory claims remain intact.

A second partial full-gate run had two failed offline tests before it was stopped
for this final figure correction. A concurrently launched focused Playwright run
had deleted/rebuilt the shared `.media-work/status-release` fixtures and
`test-results` artifacts: the failures include missing trace files and an update
check against the temporarily unavailable release fixture. This was a test-run
coordination error, not treated as a product pass. Its log is
`check-colour-followup-interrupted.log`: exit 130, two failed, two interrupted,
99 passed, two skipped, 235 not run. The final full gate runs alone; do not launch
another Playwright test runner while it owns these shared temporary paths.
The independently passing narrow regression had two passes, but does not erase
the failures of that earlier full run.
