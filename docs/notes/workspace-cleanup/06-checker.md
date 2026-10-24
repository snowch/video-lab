# Independent built-page checker

Copyright © 2026 Christopher Snow.

Checked the final built site on 24 October 2026 at `http://127.0.0.1:4173/video-lab/`. This checker did not author or edit application source. The checked course asset is `assets/course-BsKc8YqK.js`, SHA-256 `73d16847eab0d9d17b150a8202cd8f26af08bc73530a2edc4ba668daaad29450`.

## Rendered coverage

Chromium, 390 × 900 and 1365 × 900, light and dark: all five production routes and both controlled reference routes, 28 route/viewport/theme combinations. Every route's Files dialog was opened at 200% root font size; neither document nor dialog had horizontal overflow. Screenshots of source flow and dialogs in all four combinations are under `evidence/checker-*`; these were inspected as rendered pages, not inferred from component code.

Files opens with only Import and the actual saved file list/actions. The removed inventory and achievement actions are absent, including from the empty state. Files and Help contain no nested disclosures. Escape dismisses either dialog and restores its toolbar button's focus. Help initially focuses Close; native Tab navigation does not focus the inert background editor. Close remains visible and usable after scrolling an eight-note file list to its end at 200% font size on the 390-pixel viewport. Both Escape and the actual Close button were exercised.

Capture and Publish have no native command editor. Capture's actual source preview, download and continuation end its card; no general management or offline section follows. Supported browser recording controls, including shared sound, remain beside short recording guidance. Actual sample video replay/source context remains visible.

## Findings checked

| Finding | Actual final result |
| --- | --- |
| R1: unexplained comparisons promoted into production lessons | Resolved. No production route exposes the comparison toolbar action. Controlled reference routes retain it, and their flat dialog explicitly identifies separate source recordings, distinguishes the build-queue scene and credited film excerpt, and states these are not evidence of executing an exercise. |
| R2: duplicate inventory and unrelated history in Files | Resolved. Files contains neither View file inventory nor Earlier achievements. The reference context still provides earlier achievements with hints and notes. |
| R3: baseline-only readiness implies commands work offline | Resolved. Saved baseline state explicitly promises offline reading/playback and says commands also need tools below. After saving only the baseline, the same panel truthfully reports processing tools not saved. Both manifest-derived sizes appear; the larger tool download remains explicit. Installation text states installing an icon saves neither lessons nor tools. |

## Actual stateful actions

- Loaded the Mousepad practice source, ran actual bare `ffprobe mousepad-demo.mp4`, and observed native duration `00:00:12.00`.
- Preserved a custom `ffprobe -v error mousepad-demo.mp4` draft through Files, Help and reload.
- Saved baseline lessons, checked scoped ready text with tools still absent, then saved optional processing tools in the same panel. Set browser context offline, reloaded, and ran the actual bare probe successfully using saved tools.
- Imported `checker-source.mp4` through the real file chooser, observed source selection, switched back to `mousepad-demo.mp4`, deleted the imported file through Files, and confirmed it disappeared while the command remained usable.
- Created eight personal notes through reference controls and used the resulting long file list to verify sticky Close at 200% text.
- With the service-worker API absent, the app reports offline saving unavailable, exposes no processing-tools section/download button, and still loads the practice source online.
- No page exceptions occurred during the full route/theme/size survey.

Evidence and executable checker scripts: `/workspace/scratch/workspace-cleanup/checker.mjs`, `checker.json`, `checker-final-states.mjs`, `checker-unsupported-final.mjs`, `checker-final-states.json`. An initial harness assumption that every Tab must return directly to the only button was corrected for native dialog/browser-chrome focus behaviour; no application change was requested. One supplementary page load during active build work did not expose the expected panel; a fresh standalone retry verified the unsupported state above. Neither exploratory harness failure is represented as a completed check.

No outstanding blocking finding from this slice. This is a Chromium built-site check, not a claim of physical-device, Firefox, public deployment or whole-course prose validation; the builder runs the repository-wide quality gate separately.
