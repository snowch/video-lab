# Independent checker — app identity, installation and icon

Copyright © 2026 Christopher Snow.

Checked 18 October 2026 by the independent gpt-6.1-sol checker with high reasoning effort. I did not author installation support, its copy, the reader/sceptic findings or the fixes. I read `AGENTS.md`, `docs/notes/install-plan.md`, `01-reader.md`, `02-sceptic.md` and `03-resolution.md`, and independently inspected the actual production preview at `http://127.0.0.1:4173/video-lab/`. This check concerns the installation slice and its offline boundary, not another whole-course review. I changed no product source and attempted no OS installation.

## Finding decisions

### F1 — Accepted as resolved

The actual manifest link is `/video-lab/manifest.webmanifest`, whose response supplies `id: "/video-lab/"`. More importantly, Chromium's actual `Page.getAppManifest` response in each of the four desktop/phone theme cases returned:

```text
id:       http://127.0.0.1:4173/video-lab/
startUrl: http://127.0.0.1:4173/video-lab/
scope:    http://127.0.0.1:4173/video-lab/
errors:   []
```

This verifies the browser's parsed identity on the scoped real origin; it does not infer identity from a unit-test URL base or from general eligibility. After a separate complete offline download, Chromium's `Page.getInstallabilityErrors` also returned an empty list in all four cases. The launch/scope remain within the course path, and manifest icon paths resolve within that same deployment.

Eligibility and a correctly parsed identity do not establish that an app has been installed or that any desktop icon has been placed.

### P1 — Accepted as resolved

Expanded built-page help now includes: “Chrome on Android: open More beside the address bar, then choose Install and create shortcut > Install. Follow the on-screen instructions. Menu wording can vary by version.” I verified that full text was visible in all five contexts below, alongside the separate computer, Mac, Apple mobile and Firefox routes.

The Android route matches the source-based direction retained by the sceptic and the Google Chrome Android reference recorded in `docs/sources.md`. Its browser/platform scope and version qualification are explicit. This is verification of the rendered fallback and its documented source basis, not physical Android menu testing.

## Independent interaction and offline checks

| Browser | Viewport | Theme | Completed coverage |
| --- | --- | --- | --- |
| Chromium 156.0.8078.4 | 1440 × 1000 | light | Parsed manifest/eligibility, icons, controlled lifecycle, fallback, offline boundary |
| Chromium 156.0.8078.4 | 1440 × 1000 | dark | Same |
| Chromium 156.0.8078.4 | 390 × 844, touch enabled | light | Same |
| Chromium 156.0.8078.4 | 390 × 844, touch enabled | dark | Same |
| Firefox 157.0 | 1440 × 1000 | light | Icons, controlled lifecycle, fallback and offline boundary; no Chromium-protocol claim |

In every context:

- The initial app-specific Install button was absent. Both the outer disclosure and nested browser help opened with Enter. The visible help contained all five platform/browser entries and the explicit separate-download reminder.
- A controlled `beforeinstallprompt` event exposed Install Video Lab and was prevented by the handler. Enter activated it. While its choice was pending, the button was disabled and the visible status asked the user to complete or dismiss the browser prompt.
- Resolving that synthetic choice as dismissed produced cancellation guidance, removed the consumed button and retained manual help. A new controlled prompt error produced the browser-instructions fallback. A new controlled accepted choice said the request was accepted and directed the user to check the browser/device; it did not itself claim completed icon placement.
- A subsequent controlled `appinstalled` event showed the installed/app-window status and removed installation controls. A separate context simulating `navigator.standalone` also showed that status without offering installation again.
- Both synthetic acceptance and the installed event left `data-offline-ready="false"`. The reminder still told the learner to download separately and wait for readiness. After explicitly downloading, readiness became true; following network disconnection and reload, the manifest and all three manifest icons remained available and decoded with their correct dimensions.

All five cases reported zero uncaught page errors and no horizontal overflow: document width matched the 1440/390-pixel viewport. These lifecycle events and standalone signals are deliberately synthetic. They establish event handling and truthful UI states, not actual browser/OS installation or a physical device's icon placement.

## Icons and appearance

The actual normal 192/512 PNGs, maskable 512 PNG, Apple 180 PNG and 32-pixel favicon all decoded to their stated dimensions in each context. I read the original SVG and reproduction script and visually inspected the 32-pixel, normal 512 and maskable 512 files. The teal background, orange mark and white play symbol remain recognisable. The source geometry's central mark fits inside the stated maskable safe circle; I do not infer actual OS masking or Dock/taskbar rendering from that geometry.

I visually inspected these settled built-page captures, including the Android route, keyboard focus ring and separate offline reminder:

- [Desktop-light expanded help](images/04-checker-desktop-light-help.png)
- [Phone-dark expanded help](images/04-checker-phone-dark-help.png)

The text and actions wrap readably at phone width. The other layout/theme cases received the same visible-text and overflow checks without additional retained screenshots.

## Executed evidence and quality-gate status

```sh
node /workspace/scratch/install-checker.mjs
```

The checker-written script exited 0 after all five cases. `/workspace/scratch/install-checker-results.json` records the actual parsed manifest values, Chromium eligibility, image dimensions, offline manifest/icon responses, prompt states, widths and page errors. I read the existing install browser tests to understand the controlled event contract, then executed the independent page script above.

The first full-check log I inspected ended with **84 passing browser cases and one failure**, not a green full suite. The failing desktop-light offline repair test expected readiness false after deleting a cached file and reloading, but received true at the then-current `tests/offline.spec.ts:247`. I notified the builder immediately and held the quality gate open while they investigated. That initial result did not establish a green release, despite this focused installation check finding no product defect. The investigation and final successful rerun are recorded below. I did not rerun or claim the builder's full suite as my execution.

## Limits and focused verdict

No actual OS installation/uninstallation, real browser prompt acceptance, shortcut creation, icon placement or installed-app persistence was attempted. No physical Android/iOS device, Mac Safari, Windows Firefox, screen reader or native OS mask/splash screen was tested. Synthetic support in Firefox does not claim that this Linux Firefox offers a real manifest-based install flow. Offline checks here cover the new metadata/icons and explicit readiness boundary, not a repetition of all media, update or storage-repair scenarios.

Both installation findings are accepted on the built page, with no additional substantive installation regression found. The full-suite investigation and final gate closure are recorded below.

## Quality-gate follow-up and closure

The initial 84/85 result above is retained as history, not the final gate status. The builder reran the unchanged failing cache-repair case five times; `/workspace/scratch/install-repair-investigation.log` records five passes. This did not prove the exact cause of the earlier timing result.

I independently inspected the subsequent fixture changes in `tests/offline.spec.ts`. The test now waits until the download action has settled, disconnects the network, asserts that cache deletion actually removed an asset, reloads and requires readiness false. It then reconnects and repairs the copy while preserving the unrelated-cache assertion. This strengthens the missing-storage setup without weakening the detection requirement or changing product worker behaviour.

A later full run passed the missing-file check in all projects but had a Firefox repair assertion mismatch: the copy was ready, while its visible wording still reflected offline connectivity. The final fixture asserts the repair's actual completeness contract, `data-offline-ready="true"`, rather than requiring online wording after browser network emulation. The false-after-deletion and unrelated-cache assertions remain. The builder attributed the wording difference to an emulated connectivity-signal lag; I did not independently prove a product timing cause. No product code or automatic retry configuration was changed for these test adjustments.

I inspected `/workspace/scratch/install-repair-final.log`, which records **15 passed (18.5s)** for three repetitions in all five browser projects. I then reread the completed `/workspace/scratch/install-check-final.log`: it records **27 passing unit tests**, both native media verifications, production build and **85 passed (1.5m)** browser cases. The builder reported `npm run check` exit 0. These are the builder's executions, not checks I ran myself, and the final green result is established by the completed final log rather than inferred from targeted repetitions.

The required quality gate is now closed. The focused independent install verdict remains accepted, with no outstanding review blocker. Public deployment and actual device installation remain outside this checker's claim.
