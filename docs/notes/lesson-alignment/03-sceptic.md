# Independent sceptic — lesson alignment

Copyright © 2026 Christopher Snow.

Reviewed `01-plan.md`, the completed `02-reader.md`, the unchanged notebook CSS
from Git HEAD, the source setup markup and existing strings. Independently
inspected the original built page at
`http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect` before the builder
rebuilt it. This reviewer made no product edits and did not build or commit.

## Evidence and findings retained

Baseline screenshots and DOM measurements are in
`/workspace/scratch/lesson-alignment/sceptic/`: `baseline.mjs`, `baseline.json`,
`baseline-820-light.png`, `baseline-834-dark.png`, `baseline-1440-light.png` and
`baseline-390-light.png`. The browser was Chromium at 1000px viewport height.

- **R1 retained, medium, with the reader's breakpoint qualification.** At 820px,
  the source note is x20, width 567.42px, y390.50; its button is x603.42,
  width 180.89px, y380.50. Their vertical extents overlap because they occupy
  one flex row. At 834px the same arrangement occurs. The source container is
  wrapping flex; the note requests `flex-basis: 100%` but is capped by its
  `max-width: 62ch`. `causality.mjs` independently reapplied the unchanged HEAD
  notebook stylesheet and removed only the note's maximum width: its width
  became 780px and the button moved to x20, y427.67, below the note. This
  establishes the CSS interaction, rather than attributing it to the text or a
  malfunctioning control. Explicit rows are a justified correction.
- **R2 retained, medium.** At 820px, the heading ends at x221.38 and `ffprobe`
  begins at x739.34. At desktop the equivalent gap is still larger. The header
  uses `justify-content: space-between`. After the isolated source-note test,
  changing only that header alignment to `flex-start` moved the label from
  x739.34 to x237.38, leaving the expected 16px gap beside the title. Keeping
  the label beside the heading with wrapping is justified. At 390px the badge
  is hidden by the existing phone rule, so this particular visual defect does
  not apply there.
- **R3 retained, medium, as a consistency/proximity finding.** At 820px, prose
  is 567.42px wide and the editor is 780px; at 834px the editor is 794px; at
  desktop prose remains 567.42px while the editor reaches 1040px. Their left
  edges agree. At 390px both are 358px, so the mismatch disappears. The common
  notebook CSS and page wrapper support the reader's finding that the geometry
  is shared. A centred column at the existing reading measure is reasonable;
  final verification must still check long commands, builders and raw results
  in that narrower column.

The reader's wider 24-page survey is evidence from that separate reviewer; this
sceptic independently reproduced the target page at the four widths above,
not all 144 page/theme combinations.

## Claims rejected or narrowed

- No document-level horizontal overflow was reproduced at 820, 834, 1440 or
  390px. The complaint should not be described as a horizontally overflowing
  tablet page.
- The button is not on the note's right at every width. At 1440px, the note
  shares the source-name row and the button wraps below at the left; at 390px
  the note and button already occupy separate rows. The reader accurately
  qualifies this as sensitive to available width.
- The prose/editor mismatch is not an incorrectly aligned left edge. Nor does
  unequal width alone prove broken functionality; the supported complaint is
  inconsistent grouping and unnecessary separation in this lesson design.
- These baseline captures do not establish that all controls or processing
  commands work, and do not certify the final build. That remains the
  independent checker's task.

## Unchanged copy

Read the rendered lesson and source strings, including “Practice source”,
“Load the files for this page. Existing files are kept.”, “Load practice files”,
“Inspect without editing”, “Try it yourself” and “ffprobe”. Their wording is
consistent with the displayed setup and command. The layout defects supply no
reason to add new words or rewrite the lesson. Retain the reader's no-copy-change
recommendation. No new media claims or facts need drafting for this CSS slice.

## Candidate regression: enlarged phone source filename

The checker subsequently reported that the first candidate's two-column source
grid squeezed the filename at 390px with root text enlarged to 200%. Independently
reproduced this on the candidate built page in dark theme before its correction
was built. `candidate-phone.mjs`, `candidate-phone-200.json` and the source-region
screenshots in the same sceptic artifact directory record the result.

**Retain the finding, medium.** The source area is 326px wide; its grid columns
are 243.08px and 50.92px. The short name `bunny-short.mp4` becomes a 380px-tall
column at a 47.52px line height, approximately eight lines. The word “Practice
source” stays on one line beside its vertical centre. This is a candidate
regression caused by the auto-sized label column leaving too little space for
the filename; it is not corrected merely by allowing filename word breaks.
The checker's visual concern is supported, but a claim of nine or more lines
is unnecessary for the measured case.

An isolated browser override of the source grid to one `minmax(0, 1fr)` column
inside the existing maximum-600px media query gives the filename 326px and a
47.5px height: one line beneath its label. This directly supports the proposed
phone correction. No wording change is warranted. This verifies the causal
finding and proposed CSS behaviour, not the final rebuilt candidate; final
built-page acceptance remains with the independent checker.
