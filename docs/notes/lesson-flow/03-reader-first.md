# Independent learner review: first twelve notebook pages

Reviewed 25 October 2026 against the served production `dist`, at `http://127.0.0.1:4173/video-lab/`. No source edits or builds. I read AGENTS.md and the first twelve page definitions to establish routes, then reviewed rendered lessons without reading author decisions or other reviews. The parent confirmed that the intended new diagrams in this range are the two cut timelines and join connections; the later export diagram is outside this range. The first capture predates the final “Original example” caption clarification; subsequent controls captures and action runs use the clarified build.

## Learner assumptions and method

Assumed knowledge: files, terminal commands, ordinary arithmetic and earlier course pages, but no prior media concepts. Read all twelve pages in sequence: shorten, start, inspect, streams, rate, timestamps, copy, keyframes, join, scale, crop, pad.

Used real Playwright Chromium at 1440 × 1000 and 390 × 844 in light and dark. All 48 route/viewport/theme combinations were rendered, text captured and screenshotted. Actual `data-theme` was checked, rather than treating emulated OS preference as sufficient. Follow-up controls checks confirmed light document background `rgb(245, 247, 243)` and dark `rgb(16, 27, 30)`. No document-level horizontal overflow appeared. Wide commands wrap inside their cells; raw logs separately offer scrolling/wrapping.

Evidence and scripts are in `/workspace/scratch/lesson-flow/reader-first/`: `review.mjs`, `layout-report.json`, 48 page text/screenshot pairs, `actions.mjs`, `action-log.txt`, `controls.mjs`, `controls.json`, controls screenshots, and `page-record.json`. The first controls script attempt mistakenly toggled an already-open Notes section closed on the next route; the corrected run checks `open` and succeeded. Its explicit theme check also avoids capturing a theme change before React has applied it.

## Findings

### RF-1 — Medium: the editor and Run action are separated by more than a phone screen of explanation

Evidence: on the first worked join cell the reading order is command editor → “Original example connections · follow picture and sound through the join” → complete seven-part command explanation → “Shift+Enter runs this cell” → “Run command”. At 390 px the bottom of the editor and top of Run are separated by **1771 CSS pixels**, over two 844 px viewports. The first cut gap is **881 px**; the start page gap is **804 px**. Desktop join still has a **1151 px** gap. Measurements are in `controls.json`; see `controls-phone-dark-cut-join-join.png` and `controls-phone-light-first-edit-shorten.png`.

Learner consequence: the glossary is useful and close to the command, but a touch learner who changes a value must scroll away from that value to execute it. On the very first page the learner must pass an entire screen of material before reaching the first execution action. The keyboard shortcut is itself below that material. This weakens the intended focused command/result workflow, particularly on the syntactically hardest page.

Suggested direction: preserve the explanations and original-example figures while keeping an execution action immediately reachable from the editor; verify the resulting edit → run → observe sequence on a phone. This is a layout finding, not a request to delete the explanations.

### RF-2 — Low: two “Try it yourself” tasks repeat an already-complete worked solution

Evidence: copy asks “Create practice-copy.mp4 containing all eight seconds … keeping both video and sound through stream copying.” Its starter is already `ffmpeg -i bunny-short.mp4 -c copy practice-copy.mp4`, the worked command with a different output name. The keyframes task asks “Deliver practice-exact.mp4 containing source seconds 2 to 5 … Choose the approach that can discard decoded pictures before the start”. Its starter is already `ffmpeg -i bunny-short.mp4 -ss 2 -t 3 practice-exact.mp4`, again the preceding worked solution with a different filename. These values are visible in the actual editors and agree with the route definitions.

Learner consequence: pressing Run can fulfil both tasks without making the advertised choice. Manual log/playback verification still has learning value, and the technical-check limitations are stated honestly, so this is not a false-success claim. It is a weak independent application opportunity compared with the changed duration, start, frame rate, ordering and dimensions on neighbouring pages.

Suggested direction: give these tasks a small new constraint or a decision the learner must express, while retaining the manual verification that the checks cannot establish.

### RF-3 — Low: timestamp practice gives its full numerical answer before the learner records a calculation

Evidence: the task asks “Use the video values to calculate how many ticks fit into one 1/24-second picture interval.” Immediately below the cell, always visible, is “Dividing 1/24 by 1/12288 gives 512 ticks per picture interval.” The following check says “Manually verify the 512-tick calculation”. There is no answer entry associated with that question; Notes is only labelled “Your notes”.

Learner consequence: this can work as a second worked explanation, but its position under “Try it yourself” invites reading the answer before attempting the calculation. The timestamp distinction is a meaningful prerequisite for later editing; this is the first opportunity to test whether it has been understood.

Suggested direction: distinguish the attempt from the worked verification, for example by giving the learner an explicit place or instruction to record reasoning before revealing the calculation. A graded arithmetic field is not necessary.

## Checks that did not produce findings

- **Source action and real first execution:** clicked the first page's Load practice files. It changed into inline Replay source, with an actual eight-second video (`readyState=4`). Played it muted and observed time advancing to 0.44 s. Ran the original five-second command with Run command. The genuine FFmpeg log reported output video/audio and 120 video frames, status completed, and `first-cut.mp4` appeared with a replay player/download. The runtime's `Aborted()` line was separately and accurately qualified as status 0 rather than silently hidden. This review did not make an auditory quality judgment in headless Chromium.
- **Two sources for joining:** loading that page exposed both real source players, lasting eight and six seconds. The initial singular Practice source filename is incomplete before loading, but both sources are available for the actual comparison, so I did not raise a separate blocker.
- **Conceptual order:** duration and start precede metadata; streams/container/codec precede stream selection and copying; frame rate precedes time base; compression and dependencies precede copy cuts; scale precedes crop and pad. The join syntax is large, but the unfamiliar symbols and options are explained together before execution. No hidden media flags or prerequisite gap was found in this range.
- **Diagrams:** the two timeline figures and join graph are readable in both themes and widths. They are static explanatory figures, with no diagram controls to operate. The clarified “Original example” caption accurately keeps them attached to the fixed worked example when commands change. No overflow or false measurement claim found.
- **Command builder:** opened the builder on all three diagram-bearing pages in all four modes. Input/start/duration/graph/map/output fields remained usable. On phone/dark, changed first-cut duration to 6 and applied it; the editor became `ffmpeg -i bunny-short.mp4 -t 6 first-cut.mp4`. The static original-example figure did not pretend to measure that edit.
- **Notes:** expanded Notes, typed text, reloaded and confirmed persistence on all three diagram-bearing pages in all four modes. Download page record produced `shorten-notebook.json`, saved here as `page-record.json`, containing the note. The minimal label offers little reflection guidance, but this is optional free-form storage and I did not treat missing prompts as a defect on its own.
- **Prose repetition:** stream definitions and timing comparisons recur, but usually support the next operation. The substantive duplication concern is the independent practice identified in RF-2, not the repeated definitions.

## Limits

Only the first twelve pages were assessed; no export diagram review. Chromium only, no Safari/Firefox or real touch device. All first twelve pages received desktop/phone/light/dark visual review; source execution was performed on desktop and command-building on phone, not every media command in every combination. No full test suite or builds were run by this reviewer. This is a findings report, not a fixes/checker record.
