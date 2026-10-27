# Give bitrate a purpose and connect the later lesson

Copyright © 2026 Christopher Snow.

## Request and scope

The owner approved both the MP4 evidence correction and a practical introduction to bitrate, and asked whether bitrate is covered later. Chapter 8 already teaches CRF and encoder effort but never calls the relationship to data rate bitrate. Revise Chapter 2’s guide and related exercise wording, then connect bitrate to Chapter 8’s existing equal-duration CRF comparison. No new controls, command flags, invented output or media. Preserve raw CLI results, files and routes.

## Facts checked before drafting

- The Input reader name `mov,mp4,m4a,3gp,3g2,mj2` names related formats supported by one reader; it does not uniquely establish this file’s MP4 identity. The fixture’s generation and brands establish MP4 separately. The filename is a clue, not proof. Sources: prior verified `docs/notes/probe-bitrate/01-plan-facts.md`, `docs/notes/visual-teaching/02-facts.md`, FFmpeg n7.1.5 `libavformat/mov.c` and `dump.c` (local copies in `/workspace/scratch/probe-bitrate/`). Exercises must not require learners to infer an exact container from this ambiguous reader list.
- Native ffprobe rerun on all three supplied files: `/workspace/scratch/bitrate-purpose/native.json`. Short source: 352138 bytes / 8 seconds; total bitrate 352138 bits/s; human summary 352 kb/s. This means approximately 352000 bits/s averaged over the file. Existing native verification pins this relationship and printed units.
- Average whole-file bitrate = file bytes × 8 / duration. For equal duration, higher average total bitrate means a larger file and more bytes to transfer/store. Sustained streaming generally needs more connection capacity at higher media rates; buffering, rate variation and transport overhead prevent treating the average as an exact minimum connection speed. No threshold recommendation needed here.
- Reducing compressed media data may lose picture/sound detail. Bitrate alone does not establish quality: source, codec and encoding settings matter. Re-encoding cannot recover source detail already lost.
- Existing eight-second CRF18 fixture: 685427 bytes / total bit_rate 685427. CRF35 fixture: 293763 bytes / total bit_rate 293763. Both H.264 video and AAC audio. These are recorded native examples, not a guarantee of exact browser output sizes. Equal duration makes their size and average total bitrate rankings identical.
- libx264 CRF is a quality-oriented setting, not a bitrate target. It allocates different data amounts to different content. Existing quality lesson and native commands already verify CRF18/35 with same source. Sources: `docs/notes/visual-teaching/02-facts.md`, `scripts/visual-media.mjs`, FFmpeg libx264 options at https://ffmpeg.org/ffmpeg-codecs.html#libx264_002c-libx264rgb and x264 help. Rerun `ffmpeg -hide_banner -h encoder=libx264` confirms `-crf` selects quality for constant-quality mode. A fresh request to the official documentation returned HTTP 503; the already-saved official `/workspace/scratch/codecs.txt` gives the same libx264 CRF definition. Do not introduce bitrate-target flags or a CBR/VBR lesson.

## Learning and implementation

Chapter 2 learner knows source/input/output, duration, container/stream/codec introduced on this page. Define bitrate through a useful consequence (size/download/streaming), keep average and units, defer stream-vs-total fine detail. Use the existing optional direct Chapter 8 link; label it to cover compression as well as codecs. Chapter 8 learner has earlier lessons; explain CRF’s relationship to average bitrate and use existing source/output replay and size comparison to decide whether reduced detail is worth the smaller file. Avoid adding a second exercise or a wall of duplicate prose. Command examples and measured diagram remain unchanged.

Separate prose agent, independent learner → sceptic → ranked fixes → built checker, full `npm run check`, then reviewed main publication as authorised. Notes in this directory. Preserve unrelated untracked learner-audit directory. Reuse existing fact checks and browser tests for this text-only change rather than tests mirroring prose.
