# Verified media and visual model brief

Copyright © 2026 Christopher Snow.

This is the evidence brief for the separate prose and diagram authors. The
machine-readable record is `src/notebook/visuals/media.json`. Commands in that
record are argument arrays, executed with native tools from the repository root
unless `cwd` says otherwise. These figures are provided examples, independent of
the learner's editable cells.

## Source, rights and inspection

The controlled source is `public/media/notebook/bunny-short.mp4`: 352,138 bytes,
SHA-256 `b02849f31c6493657af16c54f17d0a8853da4a8de921c377d610775840f08144`.
Existing preparation, source/archive hashes and rights are recorded in
`docs/notes/notebook/media.json`. Big Buck Bunny is © 2008 Blender Foundation,
licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), with
attribution `© 2008 Blender Foundation | peach.blender.org`. Our examples extract,
resize, crop, pad and re-encode that already compressed excerpt; they do not imply
endorsement. The subtitle example is original teaching text, not dialogue.

Native evidence generation used:

```text
ffmpeg version 7.1.5-0+deb13u1 Copyright (c) 2000-2026 the FFmpeg developers
ffprobe version 7.1.5-0+deb13u1 Copyright (c) 2007-2026 the FFmpeg developers
```

Running `ffprobe bunny-short.mp4` inside `public/media/notebook` produced these
unaltered selected stderr lines. This is an excerpt, not the entire raw log:

```text
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'bunny-short.mp4':
  Duration: 00:00:08.00, start: 0.000000, bitrate: 352 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 854x480 [SAR 1:1 DAR 427:240], 280 kb/s, 24 fps, 24 tbr, 12288 tbn (default)
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 64 kb/s (default)
```

`mov,mp4,m4a,3gp,3g2,mj2` names the demuxer family; it alone does not establish a
particular container. MP4 identity here is additionally supported by the source's
`ftyp` box, `isom` major brand, `mp41` compatible brand and pinned MP4 preparation
command. The file contains video stream index 0 (H.264) and audio stream index 1
(AAC). Their codecs describe compressed data, not separate files. `0:1` means
stream index 1 in input 0. These stream indices are source facts, not universal
ordering rules.

The displayed picture dimensions are 854 × 480 pixels with square source pixels.
Video `avg_frame_rate` is `24/1`, video `time_base` is `1/12288`, audio sample rate
is 48,000 Hz, audio has two channels, and its time base is `1/48000`. A video frame
rate counts pictures per second; an audio sample rate counts samples per second
per channel. AAC packets/decoded audio frames contain blocks of samples; an audio
frame is not one sample or one video picture.

## Time and subtitles

The record's `timeline.command` selects video frames and requests `pts,pts_time`.
All 192 video PTS values were checked, not inferred from average frame rate.
They start at 0 and differ by 512 ticks. The first eight are:

| PTS ticks | Printed seconds |
| --- | --- |
| 0 | 0.000000 |
| 512 | 0.041667 |
| 1024 | 0.083333 |
| 1536 | 0.125000 |
| 2048 | 0.166667 |
| 2560 | 0.208333 |
| 3072 | 0.250000 |
| 3584 | 0.291667 |

Each tick is exactly `1/12288` second; `512 × 1/12288 = 1/24` second. Printed
seconds are rounded to six decimal places. This fixture has regular picture
spacing; average frame rate alone does not establish regularity for other media.
Keep any equally spaced timeline explicitly tied to this source or labelled as
a conceptual model. Timestamps need not start at zero in arbitrary media.

The verified `captions.srt` bytes supply two cues: 0–3 seconds, “A moment from Big
Buck Bunny”; 3–6 seconds, “Watch what changes”. No cue remains after 6 seconds.
Use start-inclusive/end-exclusive intervals in the teaching model, so the second
cue replaces the first at 3 seconds. The model is separate from any particular
renderer’s frame sampling. Burning subtitles makes visible letters part of the
output pixels; these two timing spans belong to the supplied example.

## Actual framing comparisons

All four lossless PNG examples begin with source picture 48 at timestamp 2
seconds, independently processed by the exact recorded commands:

| Key | Filter | Pixel dimensions |
| --- | --- | --- |
| `framing.images.source` | none | 854 × 480 |
| `framing.images.scale` | `scale=640:-2` | 640 × 360 |
| `framing.images.crop` | `crop=480:480` | 480 × 480 |
| `framing.images.pad` | `scale=480:-2,pad=480:480:(ow-iw)/2:(oh-ih)/2` | 480 × 480 |

Scaling keeps the scene's edges while reducing its pixel grid. The `-2` height
is derived proportionally and rounded to an even number. FFmpeg can adjust sample
aspect ratio by a very small amount to compensate for integer dimensions; these
figures show pixel grids. Crop removes left/right picture content. Its default
position is centred, subject to chroma alignment. Padding first scales the picture
to 480 × 270, then adds black bands inside the 480 × 480 output. Chroma alignment
can make opposite bands differ by two pixels, so do not label exact equal 105-pixel
bands or claim mathematically exact centring of the retained pixel rows.

These are genuine filtered source pictures, not schematic drawings or output from
the current cell. Asset paths, dimensions, SHA-256 and byte counts are in each image
object. Preserve relative scene extents when presenting different frame shapes;
an equal-sized CSS bounding box alone does not show actual pixel counts.

## Actual encoding comparison

The whole eight-second source was independently encoded with native libx264 at
CRF 18 and CRF 35. Both use preset `medium`, one encoding thread for repeatability,
and AAC audio. Only CRF and output filename differ. Exact commands are under
`quality.encodes[].command`; the committed MP4 outputs make byte counts and image
derivation independently verifiable:

| CRF | Whole MP4 bytes | File |
| --- | --- | --- |
| 18 | 685,427 | `public/media/visuals/quality-crf18.mp4` |
| 35 | 293,763 | `public/media/visuals/quality-crf35.mp4` |

The sizes count the entire MP4, including eight seconds of video, AAC sound and
container overhead. They are not PNG sizes, single-frame sizes, fixed CRF
guarantees or predictions of the browser encoder’s results. Encoder builds and
settings affect output. The high-quality re-encode is larger than the supplied
source and cannot recover source detail that was already lost.

Both PNG detail extracts use timestamp 2 seconds and exactly
`crop=256:192:350:96`. They show the same 256 × 192 source-pixel area around the
bunny’s eye, mouth and cheek. Images were visually inspected together: CRF 35
shows less precise eye/eyelid edges and surrounding fur. PNG adds no further
lossy compression. Show the two at equal pixel scale; do not stretch one
independently. The six PNGs total 826,827 bytes. The two MP4s total 979,190 bytes.

## Conceptual diagrams: claims and limits

Container/stream/codec figures model a container organising independently coded
streams; they are not a byte-accurate MP4 map. A stream-copy path models compressed
packets being remuxed without decoding/re-encoding; it does not promise arbitrary
frame-accurate cuts. Encoding models decode → filter → encode → mux. Dependency
arrows describe reference relationships between decoded pictures, not every real
H.264 GOP or packet order. Seek points and preceding references are source- and
operation-dependent.

An amplitude drawing is a conceptual waveform, not a plot of measured source
samples. A fade drawing models a gain envelope multiplying amplitude across time;
it does not measure perceived loudness. An MP4 faststart drawing models moving the
`moov` index ahead of the `mdat` media payload so a player can obtain needed index
information earlier. It is not a measured byte layout, a claim that all MP4s have
exactly those boxes, a guarantee of immediate playback, or re-encoding.

## Reproduction and verification

Run `node scripts/visual-media.mjs --generate` to regenerate both committed MP4s,
six PNGs and metadata with the installed native FFmpeg. Its command arrays record
all relevant arguments and output paths. Regeneration intentionally updates the
recorded native version and requires review of changed binary hashes/measurements.

Run `node scripts/visual-media.mjs` for the normal gate. It checks committed source
and asset hashes, MP4 whole-output byte counts and native stream/frame facts; it
re-extracts the PNG pictures and compares decoded pixels (mean absolute RGB error
below 1 allows native decoding/scaling rounding differences). It checks all 192
source video PTS, parses SRT cues and checks the existing licensing/preparation
record. It does not re-encode quality samples or replace recorded byte measurements
when CI uses a different native build. Raw ffprobe excerpts retain the recorded
version's unaltered lines; semantic source facts are verified on the current build.

The generation and default verification commands passed locally. These are media
checks, not an independent review of the built teaching pages.
