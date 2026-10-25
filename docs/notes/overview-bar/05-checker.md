# Overview bar: independent built-page checker

Copyright © 2026 Christopher Snow.

## Scope and result

Independent checker pass against the stable built preview at `http://127.0.0.1:4173/video-lab/`. Read `AGENTS.md`, the fact/copy brief, reader findings, sceptic adjudication and ranked resolution. This checker made no product edits, rebuilds or preview restarts. No blocker found for the overview-bar removal.

External evidence: `/workspace/scratch/overview-bar/checker/`. Commands were `node /workspace/scratch/overview-bar/checker/check.mjs`, `node /workspace/scratch/overview-bar/checker/persistence.mjs` and `node /workspace/scratch/overview-bar/checker/exceptional.mjs`. All final runs passed; their scripts, JSON, logs and screenshots are retained there.

## Independent observations

- The complete bounded Chromium matrix passed: desktop 1440 × 1000, tablet 768 × 1024 and phone 390 × 844; light/dark; 100%/200% root text size. These are twelve cases, each checking home and the first lesson. This is text enlargement, not a claim of native browser zoom or all devices.
- Home has no toolbar or Course overview self-link. Files remains alongside Start chapter 1 in the introduction's action group, wrapping vertically when enlarged text requires it. No home/lesson horizontal document overflow occurred. See `results.json` and the device/theme/text screenshots.
- Home and lesson Files open the existing named dialog and retain the storage explanation. Both Escape and clicking Close return focus to the initiating Files button in every matrix case. The visible focus ring is present in screenshots.
- Lesson Course overview/Files navigation has computed position `static` and moves upward with document scrolling. Real link navigation followed by browser Back and Forward restores the expected lesson/home routes in every case.
- Settled routine status remains a polite live status in the DOM, with a 1px absolute container rather than hidden display/visibility. The existing `.sr-only` rule uses overflow clipping and `clip-path: inset(50%)` (the older `clip` property correctly reports `auto`). A separate context delaying the real IndexedDB open-success callback confirmed the initial `Opening workspace` state is also clipped and live; see `loading-home.png` and `persistence-loading.json`. This verifies markup and computed presentation, not spoken screen-reader output.
- Imported `checker-retained.txt` through the actual home Files dialog. Its count/name remained available after entering the lesson, reloading, and returning home. Reading the stored Blob confirmed the exact original text. See `retained-files.png` and `persistence-loading.json`.
- In a separate context forcing IndexedDB to throw `SecurityError`, loaded real practice files and submitted `ffmpeg -stream_loop 1000 -i bunny-short.mp4 -t 1000 checker-cancel.mp4` from the first worked cell. After navigating to the actual home page, the unsafe-storage warning, Working, command return link and Cancel processing were visible together without document overflow. The link targeted the originating lesson and accepted keyboard focus. Focusing Cancel and pressing Enter produced the cancellation notice; Files remained accessible for recovery. See `unsafe-active-home.png`, `exceptional.json` and `exceptional.log`. This proves submitted-command state, navigation and cancellation, not completed FFmpeg execution or output-media facts.

## Finding disposition and limits

Independently viewed the phone 200% Files dialog: Files and Close wrap within words, matching R1. Full names and usable controls remain; the dialog can scroll. The unchanged dialog/header styles and reader/sceptic evidence support classifying this as inherited Low presentation debt, outside this narrow removal. No extra product change is required by this checker.

The matrix script's initial scrolling assertion incorrectly required the entire tall 200% phone navigation row to disappear after a fixed scroll distance. Corrected the external assertion to verify that the static row actually moves with scrolling; the final full matrix passed. No product failure was concealed or fixed by that correction.

This pass does not replace the full repository quality gate, cross-browser automated suite, deployed-site verification, saved-app/update tests or a complete assistive-technology audit. The builder records those separately.
