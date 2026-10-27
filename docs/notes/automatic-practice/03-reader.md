# Fresh learner review: automatic practice files

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by a separate reader agent which did not author or edit the product. First read the actual built `first-edit/shorten`, `inside-video/inspect`, `text/subtitles` and overview pages at `http://127.0.0.1:4173/video-lab/`; read the fact/copy notes afterwards.

## Finding

**R1 — Minor, transient redundant status.** During a deliberately held source-video fetch, the global chrome shows “Working” beneath “Course overview” while the source panel also says “Loading practice files…”. The contextual message already explains what is happening; the generic message adds a second status without more useful information. Normal fast page entry leaves neither message behind. Evidence: `/workspace/scratch/automatic-practice/reader/pending.txt` and `pending-phone-dark-200.png`. Suggested direction: let contextual practice-loading status carry this automatic operation. No extra confirmation or manual loading step is needed. This is not a flow blocker.

No other actionable reader finding in the reviewed slice.

## Built-page evidence

- Normal entry goes directly from “Practice source” to the source replay and lesson. The former “Load the files for this page. Existing files are kept” instruction and normal load button are absent. The first lesson already shows its playable eight-second source. Other pages offer “Replay source” without a setup step.
- Inside-video replay exposes distinct `bunny-short.mp4` and `bunny-action.mp4` source buttons. Switching to action selects its six-second video; switching back selects the eight-second source. Source playback advanced in both viewports. Phone replay and source selection also passed with touch taps.
- Subtitles opens with its video, `captions.srt` and supplied font available. “This example needs the video, captions.srt and fonts/DejaVuSans.ttf. Open captions.srt in Files…” is actionable without an intervening preparation task. Opened the cue file, changed and saved its second cue, visited another page and returned: the edited file remained intact. An authored practice command also remained intact.
- A held fetch shows “Loading practice files…” and disables Run. An aborted fetch produces “Could not load the practice files. Check your internet connection and try again.” beside “Retry loading”. Releasing the fault and choosing Retry restores source availability. After deliberately deleting a required source through Files, “A required practice file is missing. Load it again to continue.” and Retry appear; the source is not immediately recreated. Explicit retry restores it. Both messages identify the next action clearly.
- Overview offers “Download the two-minute practice video” as a real download link to `/video-lab/media/notebook/bunny.mp4`. It does not imply importing that clip into the notebook. Fresh overview requested its poster image but no practice video, subtitle/font assets or tools.
- Reading and replaying the three lessons requested only their required local practice assets; no FFmpeg/ffprobe core or WASM request occurred. The optional two-minute video was not prepared automatically. Ran the actual `ffprobe bunny-action.mp4` practice command once after automatic preparation; it completed and the raw log names that input. No media encode was repeated.

## Responsive and interaction checks

Standalone Node Playwright checked all four pages at desktop 1440 × 1000 and phone 390 × 844, actual `html[data-theme]` light/dark, root text 16/32 px (200%): 32 combinations. Document width equalled viewport width throughout. Reviewed source/replay controls, filename wrapping, multi-source buttons, error/retry copy and overview download placement remained readable and usable. The error state was also inspected on phone dark at 200% text.

Evidence: `/workspace/scratch/automatic-practice/reader/`. `matrix.json` stores actual theme/font/width measurements; `observations.json` records asset/tool requests and source switching; `recovery-result.json`, `actual-ffprobe-action.log`, `pending.txt`, `failure.txt`, `missing.txt` and `subtitles-files.txt` preserve focused behaviour evidence. Initial `*-first-read.txt` records precede reading the fact brief. `*-desktop/phone-light/dark-100/200.png` files cover the source panels and overview.

Commands: `node /workspace/scratch/automatic-practice/reader/read.mjs`, `node /workspace/scratch/automatic-practice/reader/review.mjs`, and `node /workspace/scratch/automatic-practice/reader/recovery.mjs`. Supporting `controls.mjs` and `overview-requests.mjs` inspected the real controls and separated the overview poster request from practice assets. No product source edits, commits, Playwright CLI invocation or full-suite run by this reader.

## Addendum: final source-copy sweep

Copyright © 2026 Christopher Snow.

Fresh built read of the rebuilt empty Files dialog from overview, `text/title` and `workflows/reuse` found no additional issue. The empty-state message now says “Practice videos appear when you open a lesson, or you can import your own files.” This describes automatic availability and preserves the separate import option. The title source note identifies `fonts/DejaVuSans.ttf` as the supplied file that “provides the letter shapes used to draw the title”, without a loading task. Reuse says “In Files, use New folder to create previews before running the commands on this page.” That is a real output-folder action; neither note implies manually loading the supplied media.

Checked all three contexts on desktop/phone, actual light/dark and root text 16/32 px: 24 combinations passed without document horizontal overflow. Text reflows readably. At phone 200%, the empty-files paragraph is below the first dialog viewport and remains available by the dialog’s ordinary vertical scrolling. No new action or confirmation is needed to prepare practice files.

Evidence: `node /workspace/scratch/automatic-practice/reader/final-copy.mjs`, `final-copy-matrix.json`, `final-*-desktop/phone.txt` and `final-*.png` in the same reader artifact directory. This addendum reviews the three copy contexts only; the previously retained R1 is left for the final checker’s verification of its separate fix. No source changes, CLI test suite or commit by this reader.
