# Verified facts for offline UI drafting

Copyright © 2026 Christopher Snow.

Audience: existing Video Lab learner, familiar with a browser and files. British English; concrete labels and short connected explanation. This is an app facility, not a new lesson or media term.

Checked implementation facts (`src/offline/worker.ts`, `range.ts`, build script, 12 passing range unit tests):
- Explicit download installs a browser service worker and saves every built app asset, including both currently available modules, every recording, frame still and bundled font.
- Current complete app has about 9 MB of uncompressed files; exact transfer size varies, and future app size may change. Avoid a hard-coded precise size claim.
- Ready is determined by checking that every manifest asset exists in browser Cache Storage. Interrupted download, HTTP failure, bad integrity or storage failure cannot produce ready.
- A range response is produced from a whole saved recording to allow seeking offline.
- Hash lesson routes can reload offline once ready.
- Challenges and notes already use browser localStorage; no account or cloud sync. Existing lesson states are unchanged.
- External GitHub/source links are outside the downloaded site and require internet.
- Browser storage can be cleared or evicted; private sessions are temporary. This is a saved copy in this browser on this device, not a permanent backup.
- Missing saved assets can be downloaded again. Initial download and updates need an internet connection; actual request failure, not navigator.onLine alone, decides success.
- Updates install a complete new copy; current lesson is not automatically interrupted. Learner can request reload when an update waits. Other open Video Lab tabs reload on controller change; work already saved by lesson controls remains localStorage.
- Unsupported browsers/storage errors must say offline saving is unavailable but leave the online app usable.

Please draft src/offline/strings.ts with `offline` export for: title, description, idle, downloading, ready, offlineReady, offlineMissing, checking, current, updateReady, failed, unsupported, download button, retry button, check button, reload button, limits. All visible messages in plain English. Avoid describing service workers, caches or integrity to learners. Status strings are full text; no technical placeholder text. Include a review note at docs/notes/offline/review/00-prose.md. Do not change implementation.
