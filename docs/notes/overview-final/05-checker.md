# Overview controls: independent final checker

Copyright © 2026 Christopher Snow.

## Scope and result

Independent checker of the stable built preview at `http://127.0.0.1:4173/video-lab/`, after reading `AGENTS.md`, this slice's fact brief, reader and sceptic records. No product edit, rebuild or preview restart by this checker. No blocker found in the requested removal or the focus fix.

External scripts, logs, JSON and screenshots: `/workspace/scratch/overview-final/checker/`. Final executions of `matrix.mjs`, `recovery.mjs` and `plain-files.mjs` passed.

## Built-page evidence

- Twelve independent Chromium cases: desktop 1440 × 1000, tablet 768 × 1024 and phone 390 × 844, each light/dark and 100%/200% root text size. These are text-enlargement checks, not native browser zoom or an exhaustive device audit.
- Home has no Files button, toolbar or routine saved message anywhere in body text, including clipped DOM output. Idle workspace status is empty. Home and first lesson have no horizontal document overflow in this matrix. Lesson navigation remains static.
- On lessons, both Escape and Close return focus to the Files opener in every case. The contextual storage explanation remains visible in the actual Files dialog.
- Home → Start → Files → browser Back keeps the modal open over home. Closing with either Escape or Close now focuses Start chapter 1 in every case. Browser Forward restores the lesson. This independently verifies resolution of reader/sceptic R1.
- A separate real-file probe imports `checker-final.txt` through lesson Files and edits it. After browser Back with unsaved dialog text, Escape shows the unsaved-changes confirmation; Cancel preserves the exact edited text. Saving in normal storage, closing, reloading home, entering the lesson again and downloading returns the exact revised bytes. The close focuses home Start, and subsequent ordinary lesson close focuses Files.
- In a separate context forcing IndexedDB to throw `SecurityError`, the same unsaved Back/Escape/Cancel sequence preserves the edited text. Explicitly choosing Discard closes and focuses home Start; the original in-memory imported file remains downloadable through lesson Files with its original bytes. The actual failed-save warning remains visible on home. This does not claim unsafe work persists after browser closure or that a failing durable save succeeds.

See `matrix.json`, `recovery.json`, the twelve `*-home.png` screenshots, `durable-recovery.png`, `unsafe-recovery.png` and the actual `durable-download.txt` / `unsafe-download.txt` artifacts. Representative phone dark 200% home was visually inspected.

## Source and test review

The focus fix adds a home Start ref and falls back to it only when the lesson Files ref is absent. It preserves the existing FileManager close path and dirty-work confirmation. The routine `n.saved` string and its render branch are deleted; transient loading/working/saving, independent unsafe-storage warning and active-command navigation/cancellation remain in source.

`tests/notebook-storage.ts` polls the actual IndexedDB `cells` record by ID, resolves after the read transaction completes and checks the expected stored fields. The command and notes tests now wait for durable command/review values rather than a removed saved-status label. Existing reload/value assertions remain. This preserves the persistence guarantee rather than weakening it to an empty-status check. The course-index regression also checks the new Back/modal/home-Start focus case.

Initial external probe iterations were corrected to await the asynchronous native dialog close event and initial Blob text load, and to distinguish a normal durable save from intentionally unavailable storage. Final evidence is from the successful corrected scripts; no product changes were needed by this checker.

## Limits

This bounded pass does not replace the full quality gate, deployed/saved-app/update checks, all-browser testing or spoken assistive-technology testing. Background command/cancellation and simultaneous unsafe warning were independently exercised in the preceding overview-bar checker; this follow-up retains those branches unchanged.

## Final plain-Files label follow-up

The owner subsequently requested removal of the lesson file count as well. After the builder completed that new build, independently checked tablet dark 768 × 1024 at 100% text and phone light 390 × 844 at 200% text. Lesson button is exactly Files before and after a real import; home still has no Files button or routine saved message. The actual imported file downloads with exact unchanged bytes, ordinary Close focuses lesson Files, and browser Back with the modal open followed by Escape focuses home Start. See `plain-files.json`, `plain-files.log`, `plain-files.mjs` and the two `*-plain-files.png` screenshots. No blocker found. The earlier twelve-case matrix and dirty-work probes were against the immediately preceding build; this final build received the bounded label/focus/download follow-up rather than a claimed repeat of that matrix.
