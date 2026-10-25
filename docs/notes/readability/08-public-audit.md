# Independent audit after merge and deployment

Copyright © 2026 Christopher Snow.

Audited all 24 notebook pages on the public app at
<https://snowch.github.io/video-lab/> after the readability product changes were
merged into main and deployed. This checker made no product edits and did not
write the reviewed changes.

## Published identity and method

The public `release.json` reported commit
`2bb123add2a21a7a5ded80dc2db51a042275e01a`, build
`96625ec3e81d10bd634e05f62bfa628fd47ce2c0945c9d8f146b428dc7a8f3ce`
and 49,037,513 bytes. Every page case additionally asserted that the app's embedded
`.app-status[data-running-build]` equalled that release build. These checks cover
the running app, not just a newly fetched metadata file. Fresh Chromium contexts
used the inherited HTTPS proxy with normal TLS verification. No stale-bundle
reload or TLS bypass was needed. An earlier readiness-only release fetch returned
the previous commit; no audit of that older app was counted.

Evidence lives in `/workspace/scratch/readability/public-audit/`. Exact commands:

- `node /workspace/scratch/readability/public-audit/audit.mjs`
- `node /workspace/scratch/readability/public-audit/controls.mjs`
- `python /workspace/scratch/readability/public-audit/sheets.py`

The audit visited the course's 24 pages in learner order at phone 390×844 and
desktop 1440×1000, in actual light and dark themes: 96 cases. Each case captures a
full-page screenshot, checks complete command height and page overflow, and checks
previous/next destinations against the course sequence. The requested and actual
themes matched in every case. There were no horizontal page overflows, vertically
clipped command editors or uncaught page errors. The compact committed record is
`08-public-matrix.json`; the larger scratch matrix preserves actual commands and
titles. All 16 screenshot contact sheets were visually inspected, covering every
page in both layouts and themes; long join and the completed real-run cell also
received individual image inspection.

While deployment was pending, after main merge, this checker had read the actual
rendered local lesson copy for every page in order. Those files are explicitly
named `local-01-rendered.txt` through `local-24-rendered.txt`. The public audit
then extracted its own 24 rendered texts. All matched that read copy after
removing only the standalone ffmpeg/ffprobe badges hidden by the phone layout;
`copy-comparison.json` records the comparison. This distinguishes the earlier
local reading from the subsequent public visual and content verification.

## Findings across the course

No blocking shared readability or substance regression was found. Explanations
remain unboxed, option rows use whitespace rather than ruled tables, and editable
commands remain visibly bounded. Desktop prose retains a readable line length;
phone options stack into one column. Long commands, including the join graph,
subtitle rendering, padding expression and native script, remain within their
page. Longer pages retain explanations and independent practice rather than
losing substance to shorten the scroll.

The following content was read in order and verified present in the public
rendered copy and screenshots:

| Pages | Retained teaching and observation |
| --- | --- |
| first-edit/shorten; first-edit/start | Input/output, duration versus start, source versus output clock, changed-duration practice and playback limits. |
| inside-video/inspect; inside-video/streams | Container/codec/stream distinctions, reading actual stream lines, no audio versus silent audio, separate picture/sound outputs. |
| frames-time/rate; frames-time/timestamps | Picture count versus pace, dropped/repeated frames, time-base ticks, rounded timestamps and audio/video clock distinction. |
| cut-join/copy; cut-join/keyframes; cut-join/join | Copy versus encode, decoding dependencies and uncertain player opening, graph labels/mapping, matching-source assumptions and actual audio-end caveat. |
| framing/scale; framing/crop; framing/pad | Stored versus displayed dimensions, pixel aspect ratio, crop versus resize, filter order and centring expressions. |
| sound/level; sound/fade | Sample amplitude versus perceived loudness, fixed-volume comparisons, fade start/duration and limits of stream-presence checks. |
| text/title; text/subtitles | Permanent picture text, font file/family distinction, cue timing, editable source text and deliberate replay checks. |
| quality/quality; quality/speed | Quality target versus exact size, original-source comparisons, preset effort versus playback rate and environment-dependent processing measurements. |
| export/format; export/faststart; export/verify; export/decode | Components/planes before the shortened option row, labelled sample-count model, index relocation versus local playback, stream/file JSON fields and full decode versus readable headers. |
| workflows/reuse; workflows/batch | Browser workspace versus device paths, stale-result separation, explicit folder setup, native POSIX shell separated from browser FFmpeg and explained loop/overwrite behaviour. |

These observations concern preserved teaching and readable rendering. They do not
claim to independently rederive every unchanged media fact or establish that
length alone makes a lesson effective.

## Actual public interaction and processing

A separate fresh touch-enabled dark phone context asserted the same published
identity and ran the real browser engine. Loading practice files showed the
0–5-second plan. The touch builder changed the duration to three seconds and
applied it to the actual command. Shift+Enter then executed
`ffmpeg -i bunny-short.mp4 -t 3 public-checker.mp4`; it completed with genuine
FFmpeg raw output. Replay reported a three-second duration and advanced to
0.82 seconds with `paused=false` and `readyState=4`.

The completed-run screenshot and DOM order show optional builder → current live
plan → complete editor → actions/Run → raw log → replay → original example
notes. No explanatory paragraph separates Run from raw output. Editing to a new
two-second command immediately changed the plan while “Last executed command”
still identified the three-second result. Reload restored that distinct draft,
plan, old raw log and generated media. Unsupported filtering, missing input and
invalid quoting each removed the plan.

Files opened by touch and listed the generated result. Keyboard Enter opened
Chapters; Escape closed both dialogs. Actual next and previous clicks moved
between the first two lessons. The full matrix additionally checked every page's
navigation destinations. `controls.log`, `controls.json`, `real-run.png` and
`restored-stale.png` preserve this evidence.

## Verdict and limits

The owner's requested post-merge public check of all 24 notebook pages is
complete. No further product fix is required by this audit. The prior live-plan
placement, phone command clipping, enlarged-phone toolbar and export option-row
findings remain resolved; their focused checks are recorded in `06-checker.md`.

This public audit did not rerun all 51 unchanged media commands, native batch
execution, audio audibility, every individual control on every route, Firefox,
or the complete offline/update suite. The parent independently owns the complete
quality gate and the warm-profile saved-app upgrade/offline checks. The public
matrix and one actual WASM run do not substitute for those separate results.
