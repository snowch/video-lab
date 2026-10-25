# Independent learner review: sound through repeatable work

Reviewed 25 October 2026 against the served build at `http://127.0.0.1:4173/video-lab/`, identity `ce8d694+b87e6fc`. Scope: all 12 pages from `sound/level` through `workflows/batch`, in exported course order. I read AGENTS.md and the page structure, then read the rendered pages; I did not read author decisions, other reviews or implementation prose sources before making these findings. No application source edits, build or shared tests were performed.

## Learner and method

Assumed learner: comfortable with files and a terminal, has completed the earlier notebook pages, including stream inspection, filters, stream copying, joins, scale/crop/pad; has no knowledge from later pages. New concepts such as signal amplitude, subtitle cues, CRF, presets and planar colour storage must therefore be introduced here. Knowing terminal basics does not imply knowing POSIX parameter expansion or native FFmpeg installation.

Used real Chromium through the repository's `@playwright/test` module. All 12 routes were opened at 1440 × 1000 and 390 × 844 in both themes: 48 full-page screenshots and text captures. `html[data-theme]` was checked for actual light/dark state, not inferred from the theme button's action label. Both themes rendered distinctly. No horizontal page overflow was detected in these states. I visually inspected the export diagram, phone subtitle layout, native-script layout and completed fade layout. Artifacts/scripts are under `/workspace/scratch/lesson-flow/reader-last/`.

Executed the worked fade command after loading its source. The real output reports `frame= 192 ... Lsize= 492kB time=00:00:08.00`; the player loaded the resulting eight-second video with `readyState: 4`. A second run at phone size also completed; playing its result advanced to `currentTime: 1.114475` with `paused: false`. The browser reports completion while explaining its `Aborted()` runtime message. I do not claim a subjective listening assessment from this automated browser session. Opened Files and selected `captions.srt`: the cue text editor and Save control are available. Opened the command builder on representative sound, subtitle, export and batch pages.

## Findings

### RLAST-1 — Medium: export explanations separate the editable command from its action on a phone

Evidence: the worked cell shows the command first, then `4:2:0 model · one group of four picture locations`, the diagram/caption, and the `.mp4`, `-c:v libx264`, `-c:a aac`, `-pix_fmt yuv420p` explanations before `Run command`. At 390 pixels wide, the bottom of the editor and the top of Run are **1265.84 CSS pixels apart**, more than one 844-pixel viewport. Subtitle explanations create a 720-pixel gap; fade creates a 456-pixel gap. Measurements are in `details.json`; see `phone-dark-export-format.png` and `phone-light-text-subtitles.png`.

Learner effect: I can understand the individual options, but cannot keep the edited command and its execution control in view together on the longest worked cells. Checking an edit against the explanation or rerunning after an observation requires repeated scrolling. The larger separation occurs on the page introducing several unfamiliar export terms at once.

Assumed knowledge: previous use of the editor and filters, but newly introduced pixel-format syntax. Suggested direction: retain the explanation and truthful diagram, while keeping the command/action relationship close and making the new concept available before or beside the point where it is used. Do not solve the distance by removing substantive explanations.

### RLAST-2 — Medium: the final verification practice mostly repeats its worked task

Evidence on `export/decode`: the worked goal is `Test the supplied eight-second clip` with `ffmpeg -xerror -i bunny-short.mp4 -f null -`. Practice asks `Verify bunny-short.mp4 again without creating a media file`; its starter is the identical complete command. The worked observation already supplies `192 video frames` and `time=00:00:08.00`; practice asks for the same stream selection and end time. `export/faststart` similarly repeats the same source/options, changing only the output name. These are visible in their saved text and screenshots.

Learner effect: running the practice again is valid rehearsal, but it gives little evidence that I can choose a verification command for my own output or distinguish a successful metadata read from a full decode. The course has just created several exports that could make this a meaningful transfer task. The next page moves on to command reuse, so this is a missed independent check at the end of verification.

Assumed knowledge: the immediately preceding worked command, plus files already produced earlier. Suggested direction: use a different existing result or require a delivery judgement supported by its actual log. Keep the explicit limits of automated checks. `export/verify` is less affected because practice adds codec/size extraction and a delivery record, although it still uses the same known report.

### RLAST-3 — Low: native batch handoff leaves the concrete launch step implicit

Evidence: `Run the script from that folder in a POSIX shell with FFmpeg installed` follows a complete shell script, and the action is `Download native script (.sh)`. The page explains `#!/bin/sh`, `set -eu`, the loop, quoting and parameter expansion, but gives no concrete invocation for the downloaded file and no quick prerequisite check. It also does not identify where to obtain native FFmpeg if it is absent.

Learner effect: the browser/native boundary is clear, and a shell-experienced learner can proceed. A learner who knows terminal commands but has not executed a downloaded shell script must supply the execution step and installation route independently. The explanatory detail about expansion is more complete than this handoff.

Assumed knowledge: ordinary terminal and file use, not executable permissions or native tool installation. Suggested direction: provide a short optional launch/check example using the actual download name, or point to a clearly identified native setup guide. This is not a blocker for the browser course, because the exercise is explicitly optional.

## What works and should be preserved

- Sound has a coherent prerequisite sequence: sample values → amplitude multiplier → fixed adjustment → time-varying fade. `Halving sample values does not mean a sound will seem exactly half as loud` prevents a plausible misconception. Both pages ask for a fixed playback volume and explain what stream-presence checks cannot prove.
- Font and subtitle setup is explicit before the commands. Title explains a font as letter shapes. Subtitles defines cue structure, timestamps, supplied text provenance and burned-in versus switchable tracks. `fontsdir=fonts` versus `force_style=Fontname=DejaVu Sans` is unusually useful: it explains making a font available versus selecting its internal family name. Files genuinely exposes an editable SRT and Save control.
- CRF precedes preset; the latter explicitly distinguishes processing speed from playback speed and warns that equal CRF does not guarantee identical visible quality. Quality practice changes a meaningful parameter and asks for size/detail comparison from the original source.
- Export explains container versus codec before pixel format. The diagram is legible in both sampled layouts, labels Y/U/V separately, states the 2 × 2 relationship and identifies itself as a model rather than measured video colours. `The source already uses these formats` prevents a false visual-change expectation. Its educational value should survive any layout revision.
- Faststart defines index placement and its limits, identifies the already-prepared source, supplies the exact log message to find, and says local replay cannot demonstrate a network benefit.
- Verification moves from readable structure to full decoding, explicitly distinguishes stream and format duration, and explains that successful decoding cannot judge intended content or destination compatibility.
- Reuse requires a genuinely different input, duration and path. It states that `previews` must exist and identifies browser workspace paths. Native batching clearly says loops and wildcards do not run in the notebook; the script is separate, fully visible, and explains output refusal and stop-on-error behaviour. The browser task honestly claims only browser inspection.

## Limits

This is a flow/learner review, not an FFmpeg reference audit or complete control regression suite. I did not run the optional native script, subjective sound comparisons, every graded practice, or native installation. Screenshots/text captures cover all 48 route/device/theme combinations; detailed interaction checks were targeted as described above. No author fixes are proposed as completed work.
