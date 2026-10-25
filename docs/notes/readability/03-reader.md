# Independent learner review

Copyright © 2026 Christopher Snow.

Reviewed the built app at `http://127.0.0.1:4173/video-lab/`, independently of the author’s claims. Evidence lives in `/workspace/scratch/readability/reader/`. No product edits were made by this reviewer.

## Coverage and method

Rendered `first-edit/shorten`, `first-edit/start`, `cut-join/join`, `export/format` and `workflows/batch` at phone 390×844, tablet 820×1180 and desktop 1440×1000, in light and actual dark themes (30 initial full-page screenshots, `matrix.json`). Inspected the screenshots visually, including full-size representative pages and contact sheets. Repeated the matrix after the prose and option-column update. All these pages fit their viewport without page-level horizontal overflow. Dark screenshots have the actual dark surface, text and control palette.

On the latest available build, loaded real practice media, changed the first worked shorten command to `ffmpeg -i bunny-short.mp4 -t 4 reader-cut.mp4`, ran it and observed the actual four-second file, raw FFmpeg output and replay. On start, used the touch builder to change `-ss` from 2 to 3 and apply it; the full command and plan changed to 3–7 s (4 s). Then edited to `ffmpeg -i bunny-short.mp4 -ss 3 -t 3 reader-start.mp4` and successfully ran with Shift+Enter. Copy command returned exactly that command to the clipboard. The raw log horizontally scrolled from 0 to 200; Wrap output reduced scrollWidth from 5975 to the 778-pixel viewport. Reload restored the edited command, log and output file. An unsupported `-vf scale=160:90` command hid the plan. Screenshots `phone-ran.png`, `final-tablet-dark-run.png`, `final-tablet-dark-restored.png` and `final-tablet-dark-edited.png` show these states; `finish.log` records control results.

## Findings

1. **Medium — live plan becomes distant after running.** On a completed phone run, “Planned cut · 0–4 s (4 s)” appears after the raw log, runtime note, output video and download. The tablet screenshot similarly puts “Planned cut · 3–6 s (3 s)” below the entire result. When changing the next cut, its immediate visual feedback is roughly a viewport or more from the editor. This assumes the learner remembers the plan and scrolls to inspect every change. Smallest direction: place the slim plan immediately before the editor, after the optional builder. Preserve the uninterrupted editor → Run → raw-result path. Evidence: `phone-ran.png`, `final-tablet-dark-run.png`.

2. **Low, residual editorial — export’s picture-storage option remains dense.** The `-pix_fmt yuv420p` meaning begins “Choose 8-bit planar YUV 4:2:0: Y is luma…” and continues through components, plane dimensions and sampling. It is accurate-looking prose with several new concepts in one option row, requiring the learner to hold luma, colour differences, planes and two-axis sampling together. The adjacent figure helps; this is not a layout blocker or a request to remove the explanation. Smallest direction in a later editorial slice: introduce the component/plane distinction once in the concept prose and let the option row state the command’s concrete choice. Evidence: `phone-light-export-format.png`, `desktop-light-export-format.png`.

## Builder response

The parent accepted finding 1 and reports moving the live trim plan before the editor. This reader records the original observed finding; the independent checker must verify the final built placement. The parent also reports a separate sceptic finding and fix for long commands clipped in the phone editor; this reader does not claim to have verified that final fix.

## Positive conclusions and limits

The removed notebook boxes and rules visibly reduce distraction. Editable commands and raw logs remain clearly bounded. Prose has a comfortable width at desktop and clean single-column flow on phone. The first two pages now explain the concrete operation before teaching additional encoding concepts, distinguish output time from source time, and define input/output. Their basic option labels are short and clear. No explanatory prose separates Run from the actual raw-output panel. Original example notes are explicitly marked when the command changes, so their original values are not presented as a description of the edited command.

Long join, export and native batch pages still require substantial scrolling because they teach more material. The shared styling does not itself demonstrate a teaching defect. The batch page explicitly distinguishes a native POSIX shell from the browser notebook, and its code block remains bounded. This review is representative, not a claim that all published pages or every media command have received a complete teaching or factual audit. No full quality gate was run by this reader.
