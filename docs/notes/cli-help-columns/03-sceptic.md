# Independent sceptic review: command help columns

Copyright © 2026 Christopher Snow.

Reviewed on 5 November 2026 by a separate agent who did not change the
implementation. Read the plan, reader report and CSS diff, then inspected the
built site at `http://127.0.0.1:4173/video-lab/`. No rebuild or full quality check
was run in this review.

## Reader outcome accepted

The change now matches the requested CLI-help arrangement at tablet and desktop
widths: one semantic parameter/description pair per row, syntax in a single left
column and its explanation alongside in a consistent right column. Removing the
old wrapping flex layout prevents several whole pairs from sharing one row.
The definition-list markup, command order and learner-facing wording are unchanged.

The pictured frame-rate lesson is a useful direct check: its input, duration,
frame-rate filter and output filename form four rows. The filter explanation
occupies multiple lines on the right without displacing its parameter or making
the output filename an adjacent card. The reader's no-blocker assessment is
supported by the actual built page, not only the selector change.

## Challenges checked

Independently probed frame rate, padding and joining at 390, 600, 601, 820 and
1365 CSS pixels with normal and 200% root text size: 30 combinations. The 601-pixel
cases used dark mode; the other cases used light mode. The 600/601 pair explicitly
checks both sides of the responsive breakpoint.

Every probe had no document or parameter-row overflow, no overlap between rows,
and consistent description-column positions. Above 600 pixels, each term and its
description begin at the same vertical position. At 600 pixels and below, each
description begins below its own term. The seven joining entries remain in order;
long filter expressions wrap within their syntax column instead of pushing the
right column out of alignment.

Visually inspected independent native crops of the frame-rate list at 820 pixels,
the padding list at 601 pixels with 200% text in dark mode, and the joining list at
390 pixels with 200% text. Enlarged long syntax needs several lines near the
breakpoint, and the long padding explanation requires substantial vertical space.
This is a predictable cost of enlarged text; the full syntax and explanation
remain visible and their pairing is clear. No additional layout fix is required
for this request.

## Phone qualification

The implementation deliberately stacks each pair on phones. It therefore should
not be described as two columns at every size. This is a reasonable responsive
interpretation of the owner's intent: preserving two narrow columns at 390 pixels,
especially with enlarged text, would reduce the description to very short lines.
The implementation retains one pair after another and does not restore the
previous multi-pair grouping. The reader's recommendation to keep this exception
is accepted.

No reader finding was rejected and no additional actionable issue was found.

## Evidence and limits

Independent script, measurements and screenshots are in
`/workspace/scratch/cli-help-columns/sceptic/`. `measurements.json` includes each
row's term, description and bounding boxes. The screenshot names are
`frames-time-rate-820-100.png`, `framing-pad-601-200.png` and
`cut-join-join-390-200.png`.

This review covers the CSS change's visual arrangement and reflow in Chromium.
It does not claim a new technical-content audit, assistive-technology certification,
physical-device testing or verification of FFmpeg execution. The separate checker
and full repository quality gate provide the remaining verification.
