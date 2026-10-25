# Overview controls: final independent sceptic

Copyright © 2026 Christopher Snow.

## Method and evidence

Read `AGENTS.md`, this slice's `01-facts-and-copy.md`, the product diff, and the reader's completed `02-reader.md`, matrix evidence and focus finding. Tested the existing built preview at `http://127.0.0.1:4173/video-lab/` independently in Chromium at phone 390 × 844. No product files, build or preview process were changed. External executable evidence is `/workspace/scratch/overview-final/sceptic/`: `check.mjs`, `results.json`, `back-check.mjs`, `back-results.json` and screenshots.

The final requested scope removes home Files and the routine saved message. Transient Opening workspace retains its previous visually clipped behaviour by the builder's stated scope decision; it is not the removed saved-status claim.

## Reader finding adjudication

**R1 — Low, retained; navigation while Files is open loses useful return focus.** Independently reproduced home → Start chapter 1 → Files → browser Back → Escape. The dialog remains open over home after Back. Escape closes it, but the former Files opener no longer exists: focus lands on BODY and the next Tab reaches the footer's Source and evidence link. See `back-results.json` and `back-close.png`. This is real, affects a particular navigation sequence and does not trap the keyboard or lose work. It is nonblocking for removal of the home controls. Suggested follow-up: choose a useful home target when the dialog's original opener has disappeared. Ordinary close on a lesson still returns focus to Files.

No reader finding is rejected. No blocking finding was identified.

## Independent retained-function checks

- Imported `saved-review.txt` containing `independent saved work` through lesson Files, closed it, reloaded to establish durable persistence, and returned to home. Home has zero Files buttons and no saved-status text anywhere in the notebook shell, including clipped output.
- Entered the first lesson again through Start chapter 1, opened Files and downloaded `saved-review.txt`. Its actual downloaded bytes matched the original text. The retained dialog storage explanation is present, and closing restores focus to lesson Files.
- In a separate browser context, forced IndexedDB access to throw `SecurityError`, imported the same text file and returned home. The actual failed-save warning remained visible while Files remained absent.
- Entered the lesson through Start chapter 1 in that unsafe-storage session and downloaded the unchanged in-memory file. The contextual storage note remained present; closing again restored focus to lesson Files. This verifies recovery in the current session and does not claim unsafe work survives browser closure.

Both normal and unsafe cases passed; see `results.json`, `saved-home.png` and `unsafe-home.png`. The reader's broader desktop/phone/theme/enlarged-text matrix remains reader evidence; this sceptic did not claim to repeat the entire matrix. Background processing and simultaneous unsafe-warning controls were independently exercised in the preceding `overview-bar/03-sceptic.md` pass; their implementation is unchanged in this follow-up diff.
