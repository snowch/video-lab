# Chapter width: independent learner review

Copyright © 2026 Christopher Snow.

Reviewed by a separate reader agent, 4 November 2026, before the width fix was built.
Used the built site at `http://127.0.0.1:4173/video-lab/`, Chromium, viewport widths
390, 820 and 1365 CSS pixels, each in light and dark themes. Compared the course
overview with `#/learn/first-edit/shorten`. Inspected screenshots of the complete
chapter in all six combinations. This is a baseline review, not post-fix approval.

## Finding R1 — medium: the workspace inherits the prose width

At 820 pixels the chapter's source video and command editor are 567.42 pixels wide,
while the overview content is 780 pixels wide. At 1365 pixels the chapter remains
567.42 pixels wide, while the overview content is 1040 pixels wide. Both themes
produce the same dimensions. The chapter shell itself is 607.42 pixels wide,
including its horizontal padding; this identifies the reviewed baseline.

The heading “Keep a shorter section”, source player and “Keep the opening five
seconds” editor occupy a narrow central strip with substantial empty gutters.
This makes the media harder to inspect and gives commands less space than the
viewport can provide. The source instructions and conceptual paragraphs are
comfortable to read at their current line length; that does not require the player
and editor to have the same width.

Suggested direction: widen the chapter workspace to use the course container,
while preserving the readable measure of explanatory paragraphs. Verify the result
on tablet as well as desktop, since the user's screenshot shows this discrepancy
before the desktop layout breakpoint.

## Checks and limits

At 390 pixels, both overview and chapter already use 358 pixels of content width,
with 16-pixel side gutters. There was no horizontal page overflow at any tested
size or theme. Phone controls wrap without hiding their labels. The existing
paragraph measure is readable; no additional prerequisite problem was identified
in the introductory text within this focused review.

Baseline measurements and screenshots are retained in the working environment at
`/workspace/scratch/chapter-width/reader-measurements.json` and
`/workspace/scratch/chapter-width/{home,lesson}-{390,820,1365}-{light,dark}.png`.
A separate interaction probe clicked “Replay source”, after which its original
`.notebook-source video` locator was absent and the probe timed out. No playback
or subsequent control-success claim is made from that incomplete probe. The
reader review therefore covers visible layout and controls, not every control
interaction. This review does not certify all course pages, processing results
or physical mobile-browser behaviour.
