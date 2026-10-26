# Files cleanup — release validation

Copyright © 2026 Christopher Snow.

Product commit: `6de4bb180bf5fad84636de86c0a0be892766755c` (follows initial ef7bfa8).

## Local validation

- `npx tsc --noEmit`: passed during integration.
- Focused browser suite on desktop-light, phone-dark and Firefox: first run
  34 passed, 16 skipped and one failed Firefox focus assertion. The defect and
  correction are recorded in 06-resolution. Follow-up: 38 passed, 16 skipped,
  exit 0 (1.1 minutes), including the added history-retention regression.
  A final small restored-form focus effect change was included in the subsequent
  checker build and complete gate.
- Before the hosted font follow-up, `npm run check`: exit 0; 110 unit tests in 25 files passed; 331 browser tests passed, 49 skipped (10.9 minutes), across desktop/phone light/dark Chromium and Firefox. This is the same formatting, typecheck,
  unit/media/model/build/browser gate used by CI. Only one Playwright CLI runner
  owned the shared test fixtures at a time.

- Wider-font regression after the correction: five projects passed (7.2 seconds).
- Final `npm run check` including that correction: exit 0; 110 unit tests in 25 files and 331 browser tests passed, 49 browser skips (10.8 minutes).

The independent built checker, including visual inspection, actual file actions,
restart/unload protection and offline checks, is recorded in 07-checker.md.

## Hosted validation

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40393580463): failed: 328 passed, 49 skipped, three narrow document-overflow failures; font-dependent cause and correction recorded in 06-resolution.
- [Pages build and deployment](https://github.com/snowch/video-lab/actions/runs/40393580217): cancelled while still installing native FFmpeg; no release published from this attempt.

Final corrected source:

- [Quality checks](https://github.com/snowch/video-lab/actions/runs/40397206974): success: 110 unit tests and 331 browser tests passed, 49 browser skips (17.7 minutes).
- [Pages build and deployment](https://github.com/snowch/video-lab/actions/runs/40397207016): success: 110 unit tests and 331 browser tests passed, 49 browser skips (19.1 minutes); deployment succeeded.

## Published app and saved-copy update

Published at `https://snowch.github.io/video-lab/`, source commit above and build
`c68adf54f17ad5bc311548183984b3b40292bd3fa512a5dd671bcefa803bc66a`.
The complete offline manifest is 50,889,133 bytes.

`node /workspace/scratch/files-cleanup/public.mjs FULL_SHA` exited 0. Six fresh
Chromium contexts covered desktop, tablet and phone (320–1440 pixels), light
and dark, all 24 lesson routes, published/embedded build identity, real source
loading, supplied image loading, aligned content and document overflow. Checked
one header Files utility on the overview and lessons, the quiet Your files
dialog, absence of source selection and irrelevant default controls, actual
8-second video preview, accessible row actions, Escape and focus restoration.
Phone checks also forced DejaVu Sans at 200% on the overview with Files open,
verifying the hosted correction of the previously failed font case. Saved and
inspected the enlarged public tablet Files screenshot.

`node /workspace/scratch/files-cleanup/public-update.mjs FULL_SHA` exited 0.
Used actual Check for updates → Update → Restart to update controls in the
existing saved public app, from build `4940c638…`. All nine existing file SHA-256
hashes and four complete saved cell records remained unchanged. Closed the
browser process, relaunched the profile offline, verified the new build and
opened the simplified Files dialog from the header. Actual video preview, row
menu access, modal Escape/focus restoration and lesson/index navigation worked
offline. Source and quality-diagram images also remained available. The final
snapshot of saved files/cells still matched the original.

These public checks used normal TLS through the configured proxy, real browser
storage and the production service worker. They are browser emulation checks,
not physical-device or installed-app-window certification. File-operation and
retained-draft behaviour has separate independent checker evidence in07.
A transient GitHub API503 during workflow polling resolved on the next poll;
it did not affect the completed success statuses or log verification.

Logs, scripts, screenshots and JSON evidence are outside the repository in
`/workspace/scratch/files-cleanup/`. Reader and sceptic initially used a temporary
repo-local scratch directory; it was moved to that external location before
commit. No unrelated learner-audit work was changed.
