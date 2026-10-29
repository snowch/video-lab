# Independent sceptic: option clarifications

Copyright © 2026 Christopher Snow.

29 October 2026. Separate sceptic agent. Reviewed `08`/`09` audit evidence, `10-option-prose.md`, `11-option-reader.md`, the four implementation deltas and their built text. No production edits or commit. This review covers the four changes and new export reference, not a second all-28-page audit. Earlier credit/pixel-section reviews remain applicable.

## Retained findings and reader dispositions

The reader requested no fixes. Independently retain all four assessments:

| Change | Primary support and disposition |
| --- | --- |
| Image input `-loop 1`: on/off, not a repeat count | Pinned FFmpeg n5.1.4 `doc/demuxers.texi:424–425` says 1 loops, default 0. `libavformat/img2dec.c:614` declares a Boolean with range 0–1; lines 420–424 reset to the first image when the sequence ends, without decrementing a repeat count. The built note correctly limits this meaning to “this image input”, retains placement before `-i` and names the worked `-t 5` stopping condition. Retain. |
| Export `-pix_fmt yuv420p`: “Request” plus the existing reference | n5.1.4 `doc/ffmpeg.texi:968–976` documents warning and encoder-supported fallback when a selected format cannot be used. “Request” is accurate; the existing page concept supplies the component detail. The reference reaches the approved existing appendix section. Retain. |
| Pad x/y: pixel offsets from canvas top-left, horizontal then vertical | n5.1.4 `doc/filters.texi:17888–17891` defines x/y offsets relative to output top/left. Its lines 17975–17979 describe `pad=640:480:0:40` as input top-left at column 0, row 40. The built note gives the coordinate origin and order before interpreting the unchanged centring formula. Retain. |
| CRF 18: numeric libx264 scale, not 18% quality | n5.1.4 `doc/encoders.texi:2553–2554` defines the constant-quality control. `libavcodec/libx264.c:696–698` passes the supplied value directly to `f_rf_constant`; line 1110 exposes a float. The new sentence makes no percentage, fixed-size or universal encoder-range claim, and the page already explains lower/higher values. Retain. |

Sources inspected directly in `/workspace/scratch/photo-credit/{demuxers.texi,img2dec.c,ffmpeg.texi}` and `/workspace/scratch/option-audit-b/{filters.texi,encoders.texi,libx264.c}`. These are the pinned official FFmpeg source copies identified in `08`/`09`, not a fabricated processing result.

Rejected further expansion: do not generalise image2's Boolean to `stream_loop` or every option named loop; no new repeat-count taxonomy is needed. Do not repeat the complete pixel-format explanation in export, add a general coordinate tutorial, or introduce CRF ranges/percentage conversions. Those additions do not resolve another retained finding in this bounded scope. No justified new finding remains.

## Independent built check

Standalone Playwright API: `node /workspace/scratch/photo-credit/option-sceptic/check.mjs` — passed. Evidence: `/workspace/scratch/photo-credit/option-sceptic/results.json`.

Desktop 1366 × 900 light and phone 390 × 844 dark each showed all four revised notes without horizontal page overflow. The new export link reached `#/appendix/formats/pixel-formats` and focused its H2; Back preserved separately edited worked and practice commands in both layouts. No page errors or FFmpeg core/encoder/WASM requests. The reader independently covered all four light/dark/desktop/phone combinations, keyboard activation and screenshot legibility; no conflicting evidence found.

An initial harness selected every textarea, including a hidden notes field; corrected it to the two visible command editors before the successful run. No app defect resulted. No encodes were run because commands, media and grading did not change. Independent checker and required quality checks remain separate.
