# Verified migration brief

Copyright © 2026 Christopher Snow.

The existing actual WASM runner, IndexedDB files, command parser, recipe provenance and reference graders are reused. Ordinary bare ffprobe produces its real Duration/Stream log. JSON remains explicitly requested for packet/frame fields, saved inspection reports and individual stream start timing; it is not a default media-summary presentation.

Production media is pinned by `scripts/verify-workbench.mjs`: Mousepad recording SHA-256 d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e; twelve seconds, 180 H.264 pictures, 15 fps, 1280×720, yuv420p, no audio. The original recording/provenance and reproducible control script remain under `media-source/mousepad/`.

Build stills are from original pictures 0, 90 and 150, source times 0, 6 and 10 seconds. JPEG byte hashes are pinned. Real decoded RGB RMS against source pictures is 1.814, 1.403 and 0.960 with native FFmpeg 7.1.5; the cross-version check uses a limit of 6 rather than requiring different JPEG encoders to produce identical bytes. Actual native three-picture H.264 outputs are 3 seconds at 1 fps and 1.5 seconds at 2 fps. The separate synthetic tone is unchanged. These stills do not show continuous action.

Production trim is `-ss 2 -t 6`, producing six seconds of silent video from this source. Join keeps [0,2) and [4,7), producing five seconds without audio. Browser tests download real outputs and run native ffprobe, then verify exact recipe commands and the source hash. The original source is kept.

Controlled reference sources and their hashes remain unchanged. Inspection checks the fixed ten-second 960×540 12fps H.264/AAC source, 120 video pictures and picture75 at PTS76800/timebase1/12288 =6.25 seconds. Cutting checks actual decoded picture order for [0,2)+[4,6), 48pictures/four seconds with H.264/AAC and reset clocks; reversed order and missing resets still fail measured criteria. Imported/provided files do not establish actual execution. Legacy routes, project migration and achievement storage keys remain unchanged.

Private legacy action identifiers in lesson data are rendered as ordinary buttons, never editable-shell instructions or `$` output. The typed editor accepts native tools only. Raw tool output and application feedback are separate. Command drafts survive route changes and reload; replacement/restoration is explicit. Source selection is explicit and persistent, with safe imported filename changes visible. App recording uses real browser sharing/MediaRecorder, not FFmpeg desktop capture. Optional shared sound is not microphone input.

Independent drafting used these facts before built review. Build sources remain original; shared platform files are untouched. Offline baseline includes the new small stills; the separately saved processing package remains optional. The fixed provided reference scene is labelled separately from the independent production practice source.
