# Notebook cleanup — independent built-page checker

Copyright © 2026 Christopher Snow.

Separate checker agent, 25 October 2026. Read `AGENTS.md` and cleanup records `01-plan.md` through `05-fixes.md`. No product edits made. Verified the current built preview at `http://127.0.0.1:4173/video-lab/`, rather than treating earlier review records as final-build proof. No remaining finding within this narrowed slice; R1 is resolved.

## Executed checks

`node /tmp/notebook-cleanup-checker/check.mjs` passed using standalone Playwright, outside the repository test runner. Fresh browser contexts covered Chromium at desktop 1440 × 1000 and phone 390 × 844 in both light and dark themes, plus Firefox desktop 1440 × 1000/light. Every context checked:

- Home displays the exact shortened note, “Run FFmpeg and ffprobe commands in your browser. Your files stay on this device.” The introductory archive sentence is absent. Home and the first lesson have no visible archive/earlier-work links in their chapter navigation; the actual phone Chapters dialog was opened. No horizontal document overflow occurred in these ten page states.
- Files → Earlier work reaches `#/earlier` and its existing archive heading. Back returns to `#/learn/first-edit/shorten` with Files closed.
- Earlier work is disabled during an unfinished New text file form and a dirty Edit text field. After saving, the button becomes available.
- A newly created `note.txt`, containing distinct checker text, survives Earlier work navigation, browser Back and a subsequent full reload. Its exact contents were read back from Files after both navigation and reload.
- Preserved direct bookmarks `#/earlier`, `#/capture`, `#/inspect/reference` and `#/edit/reference` render the archive, Choose your source video, What is a digital video?, and Cutting and joining respectively.

Visually inspected the checker screenshots of desktop light home and phone dark home with Chapters open. The short note reflows legibly, the archive card and promotion are absent, and chapter entries and the dialog Close control are readable. The note accurately describes the existing local FFmpeg/ffprobe execution; it does not claim permanent browser storage. The existing storage warning remains in Files.

Source inspection confirms the Earlier work button shares `blocked = w.busy || dirty || Boolean(form)`. The busy protection is source evidence; this pass did not simulate an in-flight file operation.

## Limits and transient evidence

This is a check of the seven-file cleanup, not a new audit of all lesson pages, media processing, offline updates, installation, accessibility or historical answer/evidence migration. Persistence checks used newly saved text in disposable browser contexts. Four preserved routes were exercised, not every bookmark. The coordinating author runs the required full repository check and deployment gate separately.

Script, five-context result JSON and screenshots are under `/tmp/notebook-cleanup-checker/` and are transient, not committed artifacts. Initial harness attempts inspected React output before it settled and used a broad textarea selector that matched a notebook cell; waiting for rendered headings and targeting the Files textarea corrected those harness errors. The final script exited successfully with all five contexts passing; no product change resulted from those attempts.
