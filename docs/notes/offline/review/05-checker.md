# Independent checker — final offline build

Copyright © 2026 Christopher Snow.

Checked 18 October 2026 by the independent gpt-6.1-sol checker with high reasoning effort. I did not author offline support, its copy, the reader/sceptic findings or their fixes. I read `AGENTS.md`, `docs/notes/offline-plan.md` and the reader report while waiting; I started final browser verification only after the builder declared the fixed build ready. Before this verdict I also read `02-sceptic.md`, `03-ranked-fixes.md` and `04-resolution.md`. I inspected the actual production preview and separate real HTTP origins serving those same final built files. I changed no product source.

## Mandatory finding decisions

### R1 — Accepted as resolved

On the final built page, a no-change check first displayed “Your saved copy is up to date.” I then supplied a changed worker release and triggered browser registration update detection independently of the panel button. The complete waiting update replaced that old notice with the update-ready explanation, including “Other open Video Lab tabs will reload too”. The obsolete current notice did not remain beside Reload.

I also tested the supported combined state from the sceptic: keep one complete update waiting, offer a newer worker whose required image returns HTTP 503, then check again. The visible status reports the unsuccessful operation and retained active offline copy. A separate visible paragraph still explains the complete waiting update, its Reload action and its effect on other tabs. Both Check for updates and Reload to use update remain available. This passed in Chromium desktop/light, Chromium phone/dark and Firefox desktop/light.

I activated complete waiting updates twice in each of those three cases. Both open lesson tabs emitted main-frame navigation events, their separately saved notes remained, and both lessons subsequently played media while disconnected. This directly supports the multi-tab consequence described by the final text.

### R2 — Accepted as resolved

A failed newer installation with a complete active copy now says: “Your saved copy remains available offline. The update check or download did not finish.” It names Check for updates as the retry action. Readiness remained true; disconnected reload and actual source playback confirmed that this was a usable retained copy, not merely a flag. A disconnected check after the failed installation, with no waiting update, likewise displayed the retained-copy failure text on the real HTTP fixtures.

The opposite cases remain cautious. A first save blocked by an unavailable image did not report ready. A second attempt returning wrong image contents also failed; a valid retry completed the download. Deleting a saved file made readiness false after reload, and downloading again repaired it. Finally, I deleted a file from an active copy before a failed operation: the failure rechecked completeness, set readiness false, offered Retry download and did **not** promise that a complete copy remained available offline.

The additional no-copy wording was also observed in a fresh browser that had never saved a copy: after disconnection it said “No complete offline copy is available in this browser”, without implying that an earlier copy had been lost.

## Independent normal-use coverage

Production preview: `http://127.0.0.1:4173/video-lab/`.

| Browser | Viewport | Theme | Completed checks |
| --- | --- | --- | --- |
| Chromium 156.0.8078.4 | 1440 × 1000 | light | Complete save; disconnected reload/new tab; both lessons/work; all ten Module 2 output variants; all-manifest offline hashes |
| Chromium 156.0.8078.4 | 1440 × 1000 | dark | Same save/reload/work checks; representative copy, encode and join playback |
| Chromium 156.0.8078.4 | 390 × 844, touch enabled | light | Same as desktop dark |
| Chromium 156.0.8078.4 | 390 × 844, touch enabled | dark | Same as desktop dark |
| Firefox 157.0 | 1440 × 1000 | light | Same as desktop light, including all ten outputs and all-manifest offline hashes |

In all five contexts I opened the disclosure and activated the initial download with Enter, observed settled ready/current states, disconnected, and checked the connection-change status and an actual page reload. Module 0's partial answer and reflection note survived; its recorded-frame inspector and native recording still worked. Module 2's source played after seeking, as did the selected cut/join outputs. A six-field challenge passed while offline, and its completion and separate reflection note survived another offline reload. A new disconnected tab opened Module 0, recovered its note and played the recording.

An explicit offline range request in every context returned HTTP 206, exactly 100 bytes, and `Content-Range: bytes 100-199/128737`. Playback checks sought to 0.7 seconds and awaited advancement beyond 0.82 seconds before pausing. All tested cut boundary images loaded successfully.

In the first complete sweep, Chromium and Firefox desktop/light fetched and independently hashed all **165** manifest assets while the browser context was disconnected; every response matched its build-time SHA-256. A separate filesystem inventory verified that these are all built distribution assets apart from the generated coordination files `sw.js` and `offline-manifest.json`. After the narrow network-confirmation fix below, I repeated the filesystem inventory and every recorded size/hash check against the refreshed build: the current manifest still contains **165 assets**, now totalling **8,956,332 bytes**. This distinguishes the earlier complete offline-fetch sweep from the refreshed distribution verification.

All five normal runs had no uncaught page errors and no horizontal overflow: document width equalled the 1440/390-pixel viewport. A simulated unsupported service-worker environment retained the online Module 2 page, explained that offline saving was unavailable and offered no saving controls.

## Independent update/failure coverage

A separate checker-written Node HTTP server served the final `dist/` files with `Cache-Control: no-store`. It changed the worker version for staged releases and could return 503 or incorrect contents for one required image. Service-worker requests therefore used a real origin, not Playwright route mocks. The complete state sequence passed in Chromium desktop/light, Chromium phone/dark and Firefox desktop/light:

- Failed initial save, integrity-rejected content, valid retry, missing-file detection and repair.
- Failed update with complete active copy; disconnected reload/playback; disconnected check without a waiting update.
- Complete waiting update and explicit activation; saved notes and navigation in both open tabs.
- Current check followed by a separately detected complete background update.
- A genuinely failed newer installation while the prior complete update remains waiting, retaining both failure/readiness information and the multi-tab Reload explanation.
- Activation while disconnected, offline playback in both updated tabs, preservation of an unrelated cache, and no false retained-completeness promise after a later cached-file deletion.

No uncaught page errors or horizontal overflow occurred in these three completed state runs. The lifecycle fixture changes the worker version while keeping app assets unchanged; it establishes update/status/activation behaviour, not compatibility between arbitrary future lesson schemas.

## Final visual evidence

I visually inspected these final built-page panel screenshots:

- [Desktop light, ready while offline](images/05-checker-desktop-light-offline.png)
- [Phone dark, ready while offline](images/05-checker-phone-dark-offline.png)
- [Desktop light, failed newer install with a waiting update](images/05-checker-desktop-light-waiting-failed-check.png)
- [Phone dark, same combined state](images/05-checker-phone-dark-waiting-failed-check.png)

The complete explanations and controls wrap readably, including both status paragraphs and both actions in the combined state. Status meaning is given in text. These captures show settled states, not the earlier reader's pre-fix screenshots.

## Commands, attribution and limits

Independent checker commands:

```sh
node /workspace/scratch/offline-checker-normal.mjs
node /workspace/scratch/offline-checker-states.mjs
node /workspace/scratch/offline-checker-support.mjs
```

All three final scripts exited 0. Structured observations are `/workspace/scratch/offline-checker-normal-results.json` and `/workspace/scratch/offline-checker-state-results.json`; the support script printed the complete inventory/hash and unsupported/fresh-disconnected results. I read the existing offline browser fixture to understand staged-worker testing, but wrote and executed the separate scenarios above.

The first normal-preview check exposed a browser call returning an up-to-date result while disconnected. I recorded that observation but initially did not rank its status-truthfulness consequence; the builder correctly identified that remaining issue and added the narrow network-confirmation fix verified below. The earlier combined-state evidence above remains the changed newer worker with an actual required-asset 503, matching the sceptic's supported reproduction. It does not rely on assuming that the original browser `update()` call itself must reject while disconnected.

I inspected `06-validation.md`, `/workspace/scratch/offline/update-final.log` and `/workspace/scratch/offline/final-check.log`. The builder's corrected update regression records five passing browser projects. Before this report closed, the builder reported final `npm run check` exit 0 with 26 unit tests, native media verification, build and 70 browser cases; I reread the final log tail, which confirms “70 passed (1.4m)”. That full quality execution belongs to the builder. I did not run or claim it as my own, and did not infer its success from the earlier full check.

Limits: headless Chromium/Firefox with browser network emulation, not a physical disconnection, physical phone or screen reader. Phone contexts were touch-enabled; the checker exercised keyboard disclosure/download plus normal automation clicks, not an exhaustive touch-only/keyboard-only audit. Media used the native element's play/seek API; audible quality, native fullscreen/menus and downloads were not checked. I did not restart a persistent browser profile, exhaust real storage quota, force browser-managed eviction, repeat every range edge case, test Safari/WebKit or verify public deployment. The reader/sceptic's separately recorded coverage remains theirs.

Both ranked fixes are accepted on the final built page. No additional substantive product regression or independent-review blocker emerged. Public delivery remains the builder's responsibility.

## Follow-up — require a real network check before reporting current

After the complete sweep, the builder added a non-cached request for `sw.js` with an HTTP-success requirement before calling registration `update()`. This addresses the disconnected “up to date” result noted above. I checked the refreshed production build independently, without repeating the earlier whole-lesson/media sweep.

In both Chromium 156.0.8078.4 and Firefox 157.0 at 1440 × 1000/light:

- On the actual preview origin, I saved a complete copy and successfully checked it online. After disconnection, Check for updates now displayed the retained-copy failure message, kept readiness true and never reported up to date. Reconnecting and checking again returned the valid up-to-date message.
- On a real HTTP fixture serving the refreshed build, I saved a copy and made a complete newer update wait. Check while disconnected now displayed the retained-copy failure message **and** the full waiting-update/multi-tab explanation and Reload action. Reconnecting and checking again restored the normal waiting-ready status.
- With that complete update still waiting, an actual HTTP 503 for `sw.js` also produced the retained-copy failure plus the waiting explanation. Restoring HTTP success made the subsequent check succeed. This verifies the response-success requirement rather than only a rejected network promise.

All four browser/waiting combinations passed with no uncaught page errors. The new guard deliberately changes the disconnected-check outcome from the earlier browser-dependent no-op; the prior dissent concerns the original implementation, not this checked behaviour. I visually inspected the refreshed [disconnected check with a waiting update](images/05-checker-desktop-light-disconnected-check-waiting.png), which retains both explanations and actions.

Executed:

```sh
node /workspace/scratch/offline-checker-network-check.mjs
node /workspace/scratch/offline-checker-support.mjs
```

Both exited 0. `/workspace/scratch/offline-checker-network-results.json` records the actual disconnected, reconnected and HTTP-failure statuses. The support script reconfirmed the refreshed 165-file/8,956,332-byte manifest, every local asset hash/size, the fresh-disconnected message and unsupported-browser controls. I inspected the new source's 10-second abort bound but did not independently inject a stalled request to time that bound.

This focused follow-up accepts the network-confirmation fix; no remaining blocker was found. The builder is rerunning the full quality entry point in `/workspace/scratch/offline/network-confirmed-check.log`; that run and its eventual delivery result remain separately attributed.
