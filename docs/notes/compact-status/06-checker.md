# Compact App status: independent built-page checker

Copyright © 2026 Christopher Snow.

Checked on 25 October 2026 by a separate agent who made no product fixes, did not rebuild the app and did not stop the preview. Read `AGENTS.md` and records `01-facts.md` through `04-sceptic.md`, then tested the built site at `http://127.0.0.1:4173/video-lab/`. Both the main entry and `optional/command-workbench.html` were checked. All four retained findings are resolved in the final build; no introduced blocker was found in this bounded review. The builder remains responsible for the full required quality suite.

## Final layout and interaction coverage

The final Chromium matrix contains 40 cases: both entries, light/dark, 1440×900 desktop, 768×1024 tablet, 390×844 phone, 812×375 short landscape and 320×568 narrow phone, each at 100% and 200% root font size. This is enlarged-text testing, not browser zoom or a physical-device claim. Each case checks document width, panel bounds, scrolling to the final installation sentence, Enter/Space opening, Escape with summary focus restored, explicit Close with summary focus restored, outside pointer dismissal, and Escape from the nested removal confirmation retaining the outer panel and returning focus to Remove offline copy. All 40 final cases passed. Representative screenshots were also visually inspected for readable layout and light/dark treatment.

External evidence is retained at `/workspace/scratch/compact-status/checker/`: `layout.mjs`, final `layout.json`, screenshots, `recheck320.mjs` and `recheck320.json`. These files are review artefacts, not product assets.

## Resolution of retained findings

- **R1 resolved.** Every final panel lies inside its viewport, including wrapped uncertain/offline badges, short screens and enlarged text. The panel can scroll to the final installation words. At 320×568/200%, both panels are x=32, y=248, width=256, bottom=560. The final installation sentence ends at y=494.97 in main and y=526.98 in optional, within the visible scroll region. A genuine cancelled download at phone/200% also kept the final words visible and its panel inside the viewport.
- **R2 resolved.** The main 1440×900/200% summary is approximately 652×78.39 instead of the former narrow 169.89×299.22 column. At 320×568/200%, the final main header gives the brand and theme control readable rows; its summary is within the 320px viewport and the document width is 320px. A checker-discovered intermediate theme-button overflow, followed by a one-character brand column, was reported to the builder and corrected before the final matrix. Enlarged narrow text still needs several badge rows; the screenshot confirms ordinary readable words rather than crushed side columns.
- **R3 resolved.** Both optional panel edges remain inside the viewport. At 1440×900/200%, the panel is x=128, width=1280, right=1408; there is no clipped negative left edge.
- **R4 resolved.** Both entries now measure 32px for the status title, panel paragraphs and action labels at 200% root text, with 25.6px badges. The final matrix includes the resulting larger optional panel content.

## Actual state and offline checks

`states.mjs` / `states.json` record genuine download, cancellation, resume and completed save in both entries. The badge moves through Saving offline copy → Offline copy incomplete → Saved offline, while the release badge remains Up to date. Cancellation leaves resumable controls and the full existing explanation. After completion, switching the browser offline preserves Saved offline and changes only the release badge to Cannot check for updates.

`reload.mjs` / `reload.json` independently repeat a complete download and offline reload on a stable build for both entries. On reload, the initial Not saved offline state settles to Saved offline after cache verification, with `data-offline-ready=true`, while release checking remains Cannot check for updates. One earlier repeated-download attempt overlapped a rebuild and timed out; it is excluded from the successful stable-build evidence rather than treated as a product result.

`retry.mjs` / `retry.json` abort the real release metadata request, observe Couldn’t check for updates with Not saved offline, restore requests and use Retry. Both entries return to Up to date while saved availability remains separate. Simulated absence of the caches API produces Offline unavailable, with no download/removal actions and an independent successful release check. Error/unsupported probes also retain viewport-contained panels and reachable installation guidance at 320×568/200%.

## Limits

This checker used headless Chromium. The builder's browser suite supplies Firefox coverage. No claim is made here about native installation prompts, mobile browser chrome or a virtual keyboard, browser zoom, screen-reader announcements, a second genuine deployed release, guarded multiwindow activation, or every corrupt-cache/removal path. Actual complete saves, cancellation/resume, offline reload and failed release-check retry were exercised; full engine/worker regression tests remain required. No hooks, workers, user files, stored achievements or synchronised platform files were edited by this checker.
