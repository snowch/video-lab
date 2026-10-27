# Independent built-page checker: demuxer definition

Copyright © 2026 Christopher Snow.

Checked 27 October 2026 by a separate checker agent that did not author or edit the product. Read `01-facts.md`, `03-reader.md`, `04-sceptic.md`, `05-resolution.md` and the single-paragraph source diff. Independently inspected the actual build at `http://127.0.0.1:4173/video-lab/#/learn/inside-video/inspect`.

Pass. No unresolved finding or requested fix.

The built paragraph exactly matches the approved source wording:

> ffprobe inspects a media file without changing it. It uses a demuxer: a container reader that identifies the streams inside the file and reads their data separately. For example, an MP4 demuxer can read the video and audio streams stored together in an MP4 file. FFprobe then reports format information, duration and a description of each stream.

The term **demuxer** is visibly emphasised. Stream, container and codec definitions precede this introduction on the actual page. The paragraph connects those definitions to the MP4 example and pending ffprobe report, without claiming separate output files or decoding.

Ran the focused standalone Node Playwright check successfully:

```sh
node /workspace/scratch/demuxer-definition/checker/check.mjs
```

The eight combinations of desktop 1440 × 1000 / touch-enabled phone 320 × 844, actual light/dark theme, and computed root text 16/32 px all had document width equal to viewport width. Saved paragraph screenshots were visually inspected across both devices and themes, including doubled text: readable wrapping, visible emphasis and no clipped prose. The editable command and Run control remain visible at each combination. The existing command is exactly `ffprobe bunny-short.mp4`; its textarea accepts focus and remains editable, and Run command is enabled and focusable. The narrow doubled-text screenshot also confirms the command and Run control remain usable.

The existing brands disclosure starts closed, opens and closes with Enter and Space, and toggles with pointer clicks. Phone taps also open and close it. No new control or processing change accompanies this paragraph.

Evidence: `/workspace/scratch/demuxer-definition/checker/` contains `check.mjs`, `results.json`, extracted page text, eight `paragraph-*.png` close-ups and eight `editor-*.png` screenshots. Results record the exact-paragraph comparison, measured viewport/document widths, computed root sizes, actual themes and control checks.

This proportional review covers the one approved paragraph and its immediate context. No product edits, commits, command execution, encodes, other lesson review, Playwright CLI suite or full quality gate were performed by this checker. The builder records its separate full gate and merge evidence.
