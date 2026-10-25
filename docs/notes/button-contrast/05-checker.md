# Primary-button contrast: independent final checker

Copyright © 2026 Christopher Snow.

25 October 2026. This checker made no product edits. Read `AGENTS.md`, the verified facts, reader and sceptic reviews, the bounded implementation record and regression test. No new learner prose was introduced, so the separate drafting step is not applicable.

## Built-page verification

Ran `node /workspace/scratch/button-contrast/checker/check.mjs` against the existing built preview at `http://127.0.0.1:4173/video-lab/`; exit 0. Did not rebuild, stop the preview or rerun the full suite. The independent script uses fresh Chromium desktop 1365 × 1000 and phone 393 × 851 contexts in both light and dark themes.

All four contexts loaded practice files and executed the real command `ffmpeg -y -i bunny-short.mp4 -t 5 checker-cut.mp4`. Every execution reached “Command completed”. Immediately after completion, before moving the pointer, Run was enabled, still matched `:hover`, and retained the accent palette. Desktop used mouse click and phone used touch tap. During actual processing, Run had native disabled semantics, opacity 0.5, its original palette and `filter: none` even while hovered.

Enabled text contrast includes the brightness filter applied to foreground and background:

| Built control/state | Light | Dark |
| --- | ---: | ---: |
| Run hovered and immediately after completion | 5.81:1 | 9.02:1 |
| Run with keyboard focus, pointer away | 6.07:1 | 10.01:1 |
| Primary next-page anchor hovered | 5.81:1 | 9.02:1 |
| Secondary Edit command hovered | 5.63:1 | 6.62:1 |
| Archived inspection-reference Run hovered | 5.81:1 | 9.02:1 |

Tab navigation from the command editor reached Run with `:focus-visible`, a solid 3px accent outline and 4px offset in all contexts. The archived `#/inspect/reference` route was exercised through Load inspection source → Next step to its visible Run control; the initial hidden command is expected guided-task behaviour. Secondary hover retained its unfiltered soft background.

The optional workbench entry was separately inspected in desktop light and dark: its visible Use practice video primary control remains readable with its own hover styling (5.92:1 light, 8.38:1 dark). No optional-workbench product code changed. This is a bounded presentation check, not a repeat of its processing suite.

Inspected the checker’s desktop-light and phone-dark completion screenshots: labels remained visibly legible. Raw measurements, reproducible script, log and eight busy/completion screenshots are outside the repository in `/workspace/scratch/button-contrast/checker/`.

## Disposition

No blocker or further fix found. The reader’s no-blocker result and sceptic’s accepted findings agree with this independent built inspection. The enabled Run, primary anchor and archived command hover defect is resolved; disabled busy and keyboard focus behaviour remain correct. Physical mobile hardware and WebKit were not tested in this pass. The builder owns the separately running full `npm run check` result; this record does not claim it completed.
