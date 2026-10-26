# Lesson alignment

Copyright © 2026 Christopher Snow.

The owner reported the tablet layout of Read the file description as broken.
The initial 820px browser measurement reproduces the screenshot: the lesson spans
780px, prose is 567.42px wide, and Load practice files starts at x603.42 beside
its instruction. The cell header distributes the title and tool across all 780px.
The source flex paragraph requests 100% basis but its 62ch maximum permits the
button onto the same flex line. This is shared by all 24 notebook pages.

Use a centred lesson column at the existing 62ch reading measure. Keep navigation,
source, explanation, editor, output and continuation aligned within it. Keep the
course overview's wider index and the Files dialog. Use explicit source rows so
the action follows the note regardless of available width. Keep a tool label
beside its title with safe wrapping. No learner-visible copy or executable logic
needs changing; preserve command cells, raw logs, files, notes and app updates.

Independent reader also reviews the unchanged labels against these facts; separate
sceptic verifies findings; separate checker inspects the final built layout and
controls. Review desktop, tablet, phone, light/dark and enlarged text, empty and
loaded source, builders and raw results. Run the repository's full quality gate,
then verify hosted deployment. This is a shared CSS/layout correction, not a
curriculum rewrite; no new technical claims or figures are introduced.
