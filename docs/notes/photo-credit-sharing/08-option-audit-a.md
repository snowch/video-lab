# Focused option-value audit: early chapters and image video

Copyright © 2026 Christopher Snow.

29 October 2026. Reviewed all teaching copy on the 13 pages below: concepts,
worked introductions/options, observations/explanations, practice, hints and
check limits. Audience: an experienced engineer learning media concepts. This is
a source audit and verified fact brief for a separate prose pass; no production
copy changes or built-page review were performed.

| Reviewed page | Result after considering the complete teaching context |
| --- | --- |
| `first-edit/shorten` | No retained gap: `-t 5` is five seconds; the changed three-second example reinforces duration. |
| `first-edit/start` | No retained gap: seconds, start versus duration, source versus output clocks, and placement after `-i` are explicit. |
| `inside-video/inspect` | No retained option gap: bare ffprobe has no flags; reading focuses on duration, types and codecs, not memorising every raw field. |
| `inside-video/streams` | No retained gap: `-an` and `-vn` explicitly take no value; output stream absence is distinguished from silence. |
| `frames-time/rate` | No retained gap: `-vf`, filter name/value, quotes and pictures per second are explained alongside the 48-frame calculation. |
| `frames-time/timestamps` | No retained gap: section/field syntax, comma-separated fields, ratios, seconds per tick and the worked tick conversion are explained. |
| `cut-join/copy` | No retained gap: `copy` is a special codec action and the omitted stream suffix applies to both selected streams here. |
| `cut-join/keyframes` | No retained gap: input/output `-ss` placement, requested duration and copying versus encoding have explicit consequences. |
| `cut-join/join` | No retained gap: zero-based input numbering, `v`/`a`, brackets, graph labels, `-map`, quotes and the three concat counts are already explained. |
| `image-video/hold` | Retain the Boolean-versus-count ambiguity in `-loop 1` below. Output duration and option placement are already explained. |
| `image-video/sequence` | No retained gap: `1/2` means half a picture per second, `%02d` expands to `01, 02, 03`, FFmpeg performs the expansion, consecutive numbering matters, and input/output rates have different roles. |
| `image-video/animation` | No retained gap: refers back to the numbered pattern and computes six drawings / three per second / 24 output frames per second. |
| `image-video/overlay` | No retained gap: input order, default `0:0`, pixel coordinate direction and `overlay=x:y` syntax are explicit. The last image persists by default, so no unexplained loop setting is hidden here. |

## Retained finding and verified facts

| Exact existing quote | Missing meaning and recommended direction | Verified evidence |
| --- | --- | --- |
| `-loop 1`: “Repeat the image input. Put this input option before the -i for the photograph it applies to.” | The learner can read `1` as a repeat count. State directly that this image-input option is an on/off switch: `1` enables looping, `0` disables it; `1` does not mean one repeat. Keep the existing explanation that input repeats until the output's `-t 5` limit stops writing. A short addition to this option's meaning is enough. | Pinned FFmpeg n5.1.4 `doc/demuxers.texi`, image2: “If set to 1, loop over the input. Default value is 0.” Pinned `libavformat/img2dec.c:614` declares `AV_OPT_TYPE_BOOL`, default 0, range 0–1. Lines 420–424 reset the image number to the first image whenever looping is enabled and the sequence ends; there is no repeat-count decrement. The recorded pinned WASM worked command produces five seconds / 125 frames at 25 fps. |

Primary sources:

- <https://github.com/FFmpeg/FFmpeg/blob/n5.1.4/doc/demuxers.texi#L422-L425>
  (existing scratch copy `/workspace/scratch/photo-credit/demuxers.texi`).
- <https://github.com/FFmpeg/FFmpeg/blob/n5.1.4/libavformat/img2dec.c#L420-L424>
  and <https://github.com/FFmpeg/FFmpeg/blob/n5.1.4/libavformat/img2dec.c#L614>
  (fetched successfully during this audit to
  `/workspace/scratch/photo-credit/img2dec.c`).
- `docs/notes/formats-images/commands-wasm.json`, record
  `image-video/hold:worked:0`: core reports FFmpeg 5.1.4; command
  `ffmpeg -loop 1 -i landscape.jpg -t 5 -pix_fmt yuv420p still.mp4`;
  `wasmProbe.report.streams[0]` gives `duration=5.000000`,
  `avg_frame_rate=25/1`, `nb_frames=125`; validation records full decoding.

Do not generalise this Boolean meaning to every FFmpeg option named `loop` or
`stream_loop`: this finding concerns the image2 input option used by this page.
No further changes are justified within these pages by this focused audit.
