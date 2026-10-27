# Explain the ffprobe reader list and bitrate

Copyright © 2026 Christopher Snow.

## Scope and audit

The owner approved explaining why ffprobe lists several container format names and asked whether `bitrate: 352 kb/s` is taught. A case-insensitive search for bitrate, bit rate and kilobit in authored `src` text found no explanation. The raw recorded native output includes bitrates, and Chapter 8 discusses bits/file size and CRF, but neither defines this field. Add the missing interpretation locally to Chapter 2 page 1's existing supplied-output guide. Keep all raw output and commands unchanged. No new activity, panel, setting or required codec option.

## Verified facts

- Existing fixture `public/media/notebook/bunny-short.mp4` is 352,138 bytes and 8 seconds. Its native `ffprobe -v error -show_entries format=duration,size,bit_rate:stream=codec_type,bit_rate -of json public/media/notebook/bunny-short.mp4` reports whole-file bit_rate 352138 bits/s, video 280869 bits/s and audio 64095 bits/s. Rerun 27 October 2026; machine record `/workspace/scratch/probe-bitrate/native-probe.json`.
- File bytes × 8 / duration = 352138 bits/s. The whole-file average includes video, sound and container information. Do not describe it as video bitrate or a constant per-second reading. A stream's bitrate refers to that stream.
- `ffprobe bunny-short.mp4` in `public/media/notebook` is already recorded in `src/notebook/visuals/media.json`, with exact native version, path and source identity. Its Duration line prints `bitrate: 352 kb/s`. That complete recorded line is already in the manifest, but the teaching guide currently omits it.
- The printed `kb/s` unit is decimal kilobits per second. 352 kb/s means approximately 352,000 bits/s; 8 bits make one byte, so this is approximately 44,000 bytes/s (44 decimal kB/s). It is an average data rate, not playback speed or a picture-quality score. Use approximate wording because the human-readable integer field omits fractional kb/s.
- FFmpeg n7.1.5 `libavformat/dump.c` prints context bit_rate divided by 1000 in the Duration summary; `avformat.h` documents the field as total stream bitrate in bits/s, computed from file size/duration when possible. Sources: https://github.com/FFmpeg/FFmpeg/blob/n7.1.5/libavformat/dump.c and https://github.com/FFmpeg/FFmpeg/blob/n7.1.5/libavformat/avformat.h . Local reviewed copies are in the scratch directory.
- `ffprobe -hide_banner -h demuxer=mov` identifies one reader named `mov,mp4,m4a,3gp,3g2,mj2`. `libavformat/mov.c` defines that reader name. It supports related formats, rather than reporting six contained streams. This name list is not a complete extension list (the help also lists other extensions), so avoid claiming it exhaustively enumerates everything supported.
- Source MP4 identity is pinned separately by its preparation command and ftyp brands; see `docs/notes/visual-teaching/02-facts.md`. `Input #0` is input index 0; separate Stream lines identify contained streams.

## Implementation and review plan

Keep the approved explanation's meaning, with concise wording drafted by a separate agent from these facts. Add a selected Duration/bitrate excerpt between the existing Input and Stream rows, omitting the unrelated start field with an ellipsis as the guide already does. Describe its eight-second duration and whole-file average beside that excerpt; preserve code emphasis for units/field names. Existing media verification will pin the displayed bitrate against native file metadata and bytes/duration. Extend existing guide checks rather than introducing a new UI framework.

Independent learner → sceptic → ranked fixes → built checker; full `npm run check`; reviewed main merge/publication per owner. Preserve unrelated untracked audit notes. Reviews and validation go in this directory.
