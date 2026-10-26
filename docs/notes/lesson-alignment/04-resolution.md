# Ranked resolution

Copyright © 2026 Christopher Snow.

1. R1, medium: replace the source's wrapping flex layout with explicit grid
   rows. Its name remains beside Practice source; notes, the load/replay action
   and preview each span the column. The button aligns left below the note.
   Filenames can wrap within their available space.
2. R2, medium: group the tool label beside its cell heading, align baselines and
   allow wrapping. Preserve the existing phone rule that hides the repeated
   tool label. Remove the heading's old bottom margin and put it on the header
   so the title and label are vertically aligned.
3. R3, medium: apply the existing 62ch prose measure to the lesson shell, centred
   with its existing padding. This aligns navigation, source, prose, editor,
   raw output and continuation. The overview retains its wider chapter index;
   the file dialog retains its independent width.

The fixes change only the notebook shell's conditional class and notebook CSS.
There are no copy, media, command-runner, database or service-worker changes.
The independent reader's copy pass and sceptic both recommend keeping current
labels and explanations. No new prose draft is necessary. No document overflow
was found in the baseline; do not present this as an overflow repair.

Reader, sceptic and checker are separate GPT-6.1 Sol Medium sessions, suitable
for this measured layout correction. The builder's first 820px capture shows a
567.42px column at x126.28; the load button now begins at that same x below its
note. This is builder evidence only; the independent final checker and full
quality gate are recorded separately.

## Checker finding C1

The independent checker found that the candidate's two-column source heading
squeezed the filename at 390px with 200% root text. The sceptic independently
measured a 50.92px-wide filename column, causing about eight lines, and confirmed
that stacking the source heading restored its usable width. The source grid now
uses one column at the existing 600px phone breakpoint. This keeps the filename
below its label and preserves full-width notes/actions/previews. The first full
quality run was intentionally interrupted (exit 130; 49 browser tests passed,
two interrupted, 274 not run); a new complete run covers this correction.
