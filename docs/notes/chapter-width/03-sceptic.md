# Chapter width: independent sceptic review

Copyright © 2026 Christopher Snow.

A separate sceptic agent reviewed the reader's R1 finding, the CSS and actual built
pages on 4 November 2026. No implementation changes were made by this reviewer.

## R1 accepted

The chapter shell applies a prose measure to videos and command editors. In the
built candidate at 1365 CSS pixels, removing the cap gives the first chapter's
editor 1040 pixels while its concept paragraph remains 567.42 pixels. Reapplying
only the old shell rule in the browser restores the editor to 567.42 pixels.
This isolates the cause and supports the reader's proposed direction.

At 820 pixels the candidate editor is 780 pixels wide and concept text remains
567.42 pixels. At 390 pixels both are 358 pixels. Neither viewport has horizontal
page overflow. The shared `68rem` shell cap still bounds the desktop layout.
The proposal does not require increasing paragraph line length or changing mobile
gutters. No reader finding was rejected.

## S1 — medium: shared reference routes lose their prose measure

The initial candidate removes `.notebook-lesson`'s cap for every route using that
class, including the glossary and command reference. Their paragraphs lack the
chapter's separate prose-width selectors. At 1365 pixels, measured glossary-entry
and command-reference-entry paragraphs expand from 567.42 to 1040 pixels.
A screenshot of the actual built glossary confirms unusually long lines across
the full workspace; this is not merely a theoretical selector overlap.

Suggested correction: preserve the reference-page cap and apply the wider shell
only to chapter pages. If widening reference workspaces is intentional, add local
prose measures there before claiming all text line lengths are preserved.
This is the only additional issue found in the scoped review.

## Evidence and limits

Playwright Chromium evaluated the built first chapter, glossary and command
reference at `http://127.0.0.1:4173/video-lab/`. Fresh pages were used for each
route so the injected baseline comparison rule could not leak across routes.
Measurements are in `/workspace/scratch/chapter-width/sceptic-measurements.json`;
the visually inspected screenshot is `sceptic-glossary-wide.png` in that directory.
Phone/tablet probes independently checked chapter dimensions and overflow.
This pass does not certify processing controls, all reference content or the final
fix for S1; a separate checker should inspect the rebuilt final candidate.
