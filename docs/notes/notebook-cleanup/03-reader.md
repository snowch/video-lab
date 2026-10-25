# Notebook cleanup — fresh reader

Copyright © 2026 Christopher Snow.

Independent reader agent, 25 October 2026. Read `AGENTS.md`, `01-plan.md` and `02-prose.md`, then exercised the built Vite preview at `http://127.0.0.1:4173/video-lab/`. No product fixes made. This is a narrow review of the changed navigation and homepage wording, not a new review of all notebook lessons.

## Finding R1 — low: introductory archive promotion remains

The inspected homepage introduction still said: “Earlier lessons remain available as an archive with their existing work.” This survives removal of the archive card and chapter links, and continues to advertise the archive on the overview. A learner also receives no direction there to its new Files location. Suggested direction: remove that remaining promotional sentence to complete the requested overview cleanup. This was observed on the initial built preview and reported to the author; a separate sceptic should judge the finding, and the final checker should verify the resulting build. Do not treat this record as proof of the author's subsequent correction.

## Actual coverage

Standalone Node Playwright script `/tmp/notebook-cleanup-reader/read.mjs`, Chromium, fresh browser contexts at desktop 1440 × 1000 and phone 390 × 844, with the app in light and dark themes:

- Inspected home and first lesson `#/learn/first-edit/shorten` in all four size/theme combinations. Desktop chapter sidebar and opened phone Chapters dialog contained the ten numbered chapters and recording appendix, with no archive/earlier-work links. Home had no archive card or link. No horizontal document overflow in the eight page states.
- Files → Earlier work reached `#/earlier`, showing “Earlier lessons and reference labs (archive)”, in all four combinations. Browser Back returned to the first lesson with the Files dialog closed.
- Starting a New text file form disabled Earlier work in all four combinations. Saving `note.txt`, selecting it and entering unsaved text into Edit text also disabled Earlier work in all four combinations. No route bypass was observed through that button.
- Direct preserved bookmarks `#/earlier`, `#/capture`, `#/inspect/reference` and `#/edit/reference` rendered their corresponding existing headings.
- Inspected screenshots of desktop dark home, phone light home with Chapters open and phone dark first lesson with Chapters open. The changed short note (“Run FFmpeg and ffprobe commands in your browser. Your files stay on this device.”) reflowed clearly; chapter entries were readable and the dialog had a usable Close control. Automated screenshots exist for all eight states under `/tmp/notebook-cleanup-reader/`.

No further finding arose from these controls. No unfamiliar technical knowledge is required to understand the new homepage note or “Earlier work” label. The Files storage notice still explains that browser storage can be cleared.

## Limits

This pass did not run media processing, simulate an in-flight file operation, seed historical answer/evidence databases, test every preserved bookmark or prove data migration. It did not run the full repository check. Existing files were created only in disposable review browser contexts. The menu-opening script initially attempted to click the underlying Chapters button to close its modal; that harness error was corrected to the dialog's actual Close button and is not a product finding. Broader persistence and busy-state guarantees need the existing tests and final required checks. Screenshots and script in `/tmp` are transient evidence, not committed artifacts.

## Addendum — explain the practice film

A fresh built-page read at 390 × 844 in the light theme checked the revised introduction: “Start with the supplied short practice clips from Big Buck Bunny, an animated short film. A two-minute excerpt is also available.” This now explains what the title names and why it appears: the supplied practice clips come from that film. A new learner does not need prior knowledge of Big Buck Bunny. The following sentence clearly identifies the longer practice option. Screenshot `/tmp/notebook-cleanup-reader/intro-clarified-phone.png` shows readable wrapping with no clipping, and the document has no horizontal overflow. The introductory archive sentence is absent in this build. No finding from this narrow follow-up; no product edits or full checks performed.
