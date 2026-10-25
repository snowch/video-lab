# Independent final-build checker

Copyright © 2026 Christopher Snow.

This checker did not write the product changes. Reviewed the built app served at
`http://127.0.0.1:4173/video-lab/`, whose App status showed
`4702f41+dd4055a`, after reading the plan, prose, reader, sceptic and fixes records.
No product files or commits were changed by this reviewer.

## Verdict

The two ranked blocking findings are resolved in this build. The live plan stays
immediately above the editor after runs and restoration; the entire long join
command is visible on phone, including after a desktop-to-phone width change.
Command → Run → raw output remains contiguous. No blocking regression was found
within the coverage below. This is pre-merge verification, not the requested
post-merge published-site audit or a substitute for the full quality gate.

## Built evidence

Evidence and scripts are in `/workspace/scratch/readability/checker/`.
Commands executed from the repository:

- `node /workspace/scratch/readability/checker/check.mjs`
- `node /workspace/scratch/readability/checker/extra.mjs`
- `node /workspace/scratch/readability/checker/text.mjs`

`matrix.json` records all 24 notebook routes at 390×844, 820×1180 and
1440×1000 in light and dark: 144 combinations. Every actual `data-theme` matched
its requested theme; computed backgrounds were recorded. No page had horizontal
overflow. Every textarea's complete command fitted its client height. Thirty
full-page screenshots cover the first two pages, long join, export format and
native batch workflow in every size/theme. Representative phone images,
tablet/desktop contact sheet and full desktop opening were visually inspected.
Explanation is unboxed, options lack row rules, editors/logs retain boundaries,
and the first two pages retain a comfortable reading measure and clear input,
output, duration and start explanations. Long join and format teaching remains
substantial but displays in a readable single column on phone. The native workflow
explicitly distinguishes its terminal exercise from notebook commands.

`check.log`, `phone-dark-run.png` and `phone-dark-restored.png` establish:

- No plan before source loading; loading the real practice file shows 0–5 s.
- Editing to `-ss 6 -t 5` shows 6–8 s (2 s). Missing input, stream-copy option,
  malformed quoting and a start at the source end hide the plan.
- Shift+Enter actually ran `ffmpeg -i bunny-short.mp4 -t 3 checker-cut.mp4`.
  It completed with genuine FFmpeg 5.1.4 raw output and a three-second video.
- Editing to a new two-second command immediately updated the plan while
  “Last executed command” continued identifying the three-second result.
  Reload restored the draft, two-second plan, old command, raw log and video.
- DOM order and the run screenshot show the plan before the editor, actions
  before the raw log, then runtime feedback/replay and original example notes.
  No explanatory block separates Run and raw output.

`extra.log`, `phone-resized-join.png` and `phone-keyboard-run.png` establish:

- Desktop-to-phone resize gave the long join editor equal client/scroll heights
  of 164 pixels, exposing the complete filter graph and both map flags.
- Keyboard Enter opened/applied the start builder; editing its start to 1 produced
  `ffmpeg -i bunny-short.mp4 -ss 1 -t 4 later.mp4` and a 1–5 s plan.
- That actual command ran through Shift+Enter. Replay advanced to 0.80 seconds
  of a four-second output with `paused=false` and `readyState=4`.
- Replacing the stored `bunny-short.mp4` bytes and reloading removed the plan;
  the filename alone did not confer verified duration.

The touch-enabled phone context separately opened the builder and applied start
3 by tapping. Its command and plan changed to 3–7 s (4 s); see
`phone-builder.png`. The five representative routes also received 200% root text
(32px) at phone width. None had page overflow or clipped commands; the long join
editor grew to 803 pixels for its full command. This is text enlargement, not a
claim of tested browser zoom or OS magnification.

## Residual observations and limits

The reader/sceptic's low export option-density observation remains valid and does
not block these layout fixes. No export prose rewrite is claimed.

One additional low layout issue appears with 200% text at 390px: the sticky
notebook toolbar wraps to about 406px tall and covers a heading when that heading
is scrolled to the top (`text-heading.png`). All content remains reachable by
adjusting scroll, with no horizontal overflow or command clipping, but persistent
navigation occupies almost half the viewport. A later accessibility/layout pass
should consider releasing this toolbar from sticky positioning at that size.
This is recorded rather than silently treating the overflow matrix as complete
accessibility certification.

The checker did not rerun the complete `npm run check`, every command on all 24
pages, every control, Firefox, audio audibility, offline/update behaviour or a full
factual/editorial audit. Reader control evidence and sceptic source review remain
separate evidence. The parent owns the final complete gate and the published
all-page audit after merge.

## Final follow-up: both low observations resolved

The parent accepted both residuals and rebuilt. This checker then ran
`node /workspace/scratch/readability/checker/toolbar.mjs` and
`node /workspace/scratch/readability/checker/export-final.mjs` against the rebuilt
preview. These follow-up results supersede the unresolved observations above.

At 390px and 200% text, the toolbar now computes to `position: static`; the
heading remains fully visible when scrolled into view (`text-heading-fixed.png`).
Touch Chapters and Files opened their dialogs, Escape closed them, and Course
overview navigated successfully. The toolbar retains `sticky` at 820 and 1440px.
`toolbar.log` records the actual geometry and controls. The enlarged phone
navigation concern is resolved.

The export page was rendered and visually re-inspected at phone and tablet in
actual light and dark, with four screenshots `final-*-export.png` and
`export-final.log`. All four have no page overflow and complete editor contents.
The concepts now introduce luma, colour differences, planar storage and yuv420p
sampling before the worked command. The option row says only “Store the output
pictures as yuv420p.” The labelled sample-count model remains intact, with its
measurement limitation visible. The dense option-row finding is resolved without
discarding the concepts or hiding them in a collapsed control.

No further blocker was found in these bounded follow-up checks. This checker
supports freezing these reviewed product changes and running the final complete
quality gate. This statement does not claim that gate has passed or that the
post-merge published-page audit has happened.
