# Independent final checker — lesson alignment

Copyright © 2026 Christopher Snow.

This checker is a separate session from the builder, reader and sceptic. Reviewed
`01-plan.md`, `02-reader.md`, `03-sceptic.md` and `04-resolution.md`; inspected the
built preview at `http://127.0.0.1:4173/video-lab/` on 26 October 2026 after the
builder's readiness message. No product code, builds, commits or unrelated audit
files were changed by this checker.

## Built-page coverage

An independent Chromium Playwright script navigated every one of the 24 notebook
pages: first-edit/shorten, first-edit/start, inside-video/inspect,
inside-video/streams, frames-time/rate, frames-time/timestamps, cut-join/copy,
cut-join/keyframes, cut-join/join, framing/scale, framing/crop, framing/pad,
sound/level, sound/fade, text/title, text/subtitles, quality/quality,
quality/speed, export/format, export/faststart, export/verify, export/decode,
workflows/reuse and workflows/batch.

The matrix is desktop 1440 × 1000, tablet 820 × 900 and phone 390 × 844, each
in light/dark and at 100%/200% root font size: 288 page observations. Every
observation rendered the requested route, had zero document horizontal overflow,
kept the source loading action below its explanatory note at the source's left
edge, and gave the concept and command-cell containers equal widths. Visible
heading/tool boxes did not overlap. The phone's existing rule hides the repeated
tool badge. Normal desktop/tablet reading and editor widths are 567.42px; the
column centres correctly instead of stretching to the previous workbench width.

Captured full-page browser screenshots for all 24 pages in each normal-size
viewport/theme combination, plus the target inspection page in every enlarged
configuration. Inspected light/dark tablet contact sheets of all 24 page starts,
the complete tablet target page, desktop target, and detailed phone/enlarged
source, loaded result and Files views. These are visual browser captures as well
as geometry measurements.

## Findings and resolution

The initial final candidate resolves reader R1–R3 at normal size. Visual review
found an additional enlarged-phone problem that the overflow checks correctly
did not flag: the source's two grid columns leave only a few characters of width
for `bunny-short.mp4` next to **Practice source** at 390px and 200% text. The
filename becomes a tall column of fragments and the label centres halfway down
it. Reported this promptly to the builder with
`phone-dark-2-inside-video-inspect-top.png`; recommended stacking the label and
filename at phone width. The builder added a one-column source grid at the existing phone breakpoint.
After its rebuilt readiness message, reran the complete 288-observation matrix,
now checking every cell heading/tool pair as well as the first, and reran both
functional contexts. All passed.

A further `narrow-recheck.mjs` pass tested 320, 390 and 820px, each in both
themes with 200% text: six unloaded and loaded/multi-source source setups.
All had zero document overflow and correctly placed loading actions. At 320
and 390px, the filename occupies the full source width below its label; at
390px it fits one line and at 320px wraps naturally to two. The tablet source
retains its side-by-side label and filename. Inspected the resulting source
screenshots directly. The original visual regression is resolved.

No remaining actionable layout or representative-control issues were found.

## Functional interaction checks

`controls.mjs` passed independently in both tablet/light/100% and
phone/dark/200% contexts. Each context:

- Loaded practice files; selected `bunny-action.mp4` from the multiple source
  choices; confirmed its preview name; actually played source video and observed
  advancing playback time; hid and reopened replay.
- Switched to Command builder, changed its source filename, applied the command,
  switched back to Edit command, edited again, and ran real ffprobe. Waited for
  **Command completed** and confirmed raw output contained `Input #0`.
- Opened Files, confirmed focus entered the modal and stayed inside after eight
  Tab presses, selected and previewed `bunny-short.mp4`, dismissed with Escape,
  and confirmed focus returned to Files.
- Navigated to Course overview, confirmed its shell lacked the lesson's width
  class, navigated back, and confirmed the command draft persisted.
- Opened the first cut page, entered
  `ffmpeg -i bunny-short.mp4 -t 1 checker.mp4`, checked that builder represented
  the duration edit, switched back, ran real FFmpeg to completion, and played
  the resulting video with advancing playback time. The loaded/output page had
  no horizontal document overflow.

## Evidence and limits

Artifacts are outside the repository at
`/workspace/scratch/lesson-alignment/checker/`: `sweep.mjs`,
`measurements.json`, `sweep-result.json`, `controls.mjs`, `controls.log`,
`controls-result.json`, `initial-measurements.json`, `narrow-recheck.mjs`,
`narrow-recheck.json`, final source/loaded PNGs, full-page PNGs, detailed crop PNGs, and
`contact-light.jpg`/`contact-dark.jpg`. Commands run:

```sh
node /workspace/scratch/lesson-alignment/checker/sweep.mjs
node /workspace/scratch/lesson-alignment/checker/controls.mjs
node /workspace/scratch/lesson-alignment/checker/narrow-recheck.mjs
```

This is a CSS/layout and representative interaction review, not a new curriculum
or media-fact audit. It does not claim all 24 command examples were executed,
every screenshot was read at full resolution, native device testing, Firefox or
Safari testing, browser zoom testing, or a hosted deployment check. Enlarged
text uses a 200% root font size. The builder owns the full repository quality
gate and deployment verification; neither is claimed by this checker.
