# Verified image-to-video media facts

Copyright © 2026 Christopher Snow.

This is the native fact brief for independent lesson drafting. Measurements were obtained on 28 October 2026 with FFmpeg and ffprobe `7.1.5-0+deb13u1`. `native-commands.json` records executable argument arrays and decoded output facts. The subsequent `commands-wasm.json` record establishes execution of all eight exact commands in the pinned browser WASM adapter. This capability check is separate from execution through the integrated notebook UI, which still needs its own real browser checks.

## Sources and provenance

The 11 supplied images live in `public/media/images/`; `src/notebook/images-media.json` pins every file's byte count, SHA-256 hash, decoded dimensions and alpha counts.

- `landscape.jpg`: an actual photograph of Fronalpstock, Switzerland, by **Hannes Röst**, supplied at **640 × 360**. The photographer's [Wikimedia Commons upload](https://commons.wikimedia.org/wiki/File:Fronalpstock_big.jpg) identifies the author and offers CC BY-SA 3.0 and GFDL; this course selects **[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)**. The original 10,109 × 4,542 JPEG was centre-cropped/resized and re-encoded. The adapted photograph remains CC BY-SA 3.0. Credit the author, link source/licence, indicate the crop/resize and retain ShareAlike for adaptations, including videos made from it. Public attribution is also supplied beside the asset in `ATTRIBUTION.md`.
- `frame-01.png` … `frame-06.png`: six original **640 × 360** drawings of an orange ball above a fixed ground line. The ball centres, in filename order, are `(80,260)`, `(176,160)`, `(272,90)`, `(368,90)`, `(464,160)`, `(560,260)`. The six drawings suggest one arc; these are authored pictures, not a physics simulation or frames extracted from footage. Each source is fully opaque.
- `drawing-01.png` … `drawing-03.png`: three slideshow pictures, identical to animation frames **1, 3 and 6** in that order. All are **640 × 360**, fully opaque PNGs. The large changes make the three separate holds easy to recognise.
- `annotation.png`: an original **854 × 480** PNG with an orange arrow and ring. It has **406,107 fully transparent pixels and 3,813 opaque pixels**, with no intermediate alpha. Transparent pixels let the underlying footage show through. The visible drawing stays inside the canvas when moved 40 pixels right.
- `bunny-short.mp4`: the existing credited Big Buck Bunny practice excerpt, unchanged. Source hash is pinned in `native-commands.json`. It is 854 × 480, eight seconds, 24 frames/s, with stereo audio.

## Minimal commands and measured results

All commands below were executed exactly as displayed in a temporary directory holding the supplied inputs. The verification script adds no hidden encoding flags. The MP4s are verification outputs, removed after the check; the chapter creates its own real outputs when the learner runs the commands.

```sh
ffmpeg -loop 1 -i landscape.jpg -t 5 -pix_fmt yuv420p still.mp4
ffmpeg -loop 1 -i landscape.jpg -t 3 -pix_fmt yuv420p still-practice.mp4
ffmpeg -framerate 1/2 -i drawing-%02d.png -vf fps=24 -pix_fmt yuv420p slides.mp4
ffmpeg -framerate 1 -i drawing-%02d.png -vf fps=24 -pix_fmt yuv420p slides-practice.mp4
ffmpeg -framerate 3 -i frame-%02d.png -vf fps=24 -pix_fmt yuv420p animation.mp4
ffmpeg -framerate 6 -i frame-%02d.png -vf fps=24 -pix_fmt yuv420p animation-practice.mp4
ffmpeg -i bunny-short.mp4 -i annotation.png -filter_complex overlay annotated.mp4
ffmpeg -i bunny-short.mp4 -i annotation.png -filter_complex overlay=40:0 annotated-practice.mp4
```

| Output | Duration | Decoded frames | Frame rate | Decoded content |
| --- | ---: | ---: | ---: | --- |
| still.mp4 | 5 s | 125 | 25 fps | Same photograph throughout; no audio |
| still-practice.mp4 | 3 s | 75 | 25 fps | Same photograph throughout; no audio |
| slides.mp4 | 6 s | 144 | 24 fps | Three ordered pictures; 48 frames / 2 s each; no audio |
| slides-practice.mp4 | 3 s | 72 | 24 fps | Three ordered pictures; 24 frames / 1 s each; no audio |
| animation.mp4 | 2 s | 48 | 24 fps | Six ordered drawings; 8 frames / one-third second each; no audio |
| animation-practice.mp4 | 1 s | 24 | 24 fps | Six ordered drawings; 4 frames / one-sixth second each; no audio |
| annotated.mp4 | 8 s | 192 | 24 fps | Arrow/ring remain over footage; source audio retained through automatic selection and re-encoded to AAC |
| annotated-practice.mp4 | 8 s | 192 | 24 fps | Arrow/ring shifted 40 pixels right throughout; audio present |

The photograph, slideshow and animation outputs are 640 × 360 H.264 video. Overlay outputs are 854 × 480 H.264 video with stereo 48 kHz AAC. The native JPEG-based outputs report `yuvj420p`, despite the requested `-pix_fmt yuv420p`: the full-range JPEG colour-range metadata survives. Do not claim the probe must spell this `yuv420p` or that the command necessarily converts full to limited range. The PNG-based outputs report `yuv420p` on this build. Colour-range handling is not the learning goal here.

## Mechanisms supported by primary documentation

- [`image2` demuxer](https://ffmpeg.org/ffmpeg-formats.html#image2-1): image inputs default to **25 fps**; `-loop 1` repeats input; `-framerate` sets the image input rate. Input options precede the corresponding `-i`. The loop needs an output stopping condition: here `-t 5` stops the output after five seconds.
- The same documentation defines `%02d` as a sequential number padded to two digits. FFmpeg expands this pattern, not the browser or a shell. The supplied filenames are consecutive, beginning at 01, which is inside the default initial search range 0–4. Missing numbers can end a sequence. All supplied sequence images have matching dimensions, format and pixel format. A loose import of arbitrary pictures is not automatically a compatible sequence.
- [`fps` filter](https://ffmpeg.org/ffmpeg-filters.html#fps): `-vf fps=24` converts the timestamped input to 24 output frames/s by repeating/dropping frames. Here it repeats existing drawings. It does not draw intermediate motion. Input timing (`-framerate`) controls how long each source drawing lasts; output cadence (`fps=24`) controls how many output frames represent that time.
- [`overlay` filter](https://ffmpeg.org/ffmpeg-filters.html#overlay): two video inputs, the first below the second; default position `(0,0)`. `overlay=40:0` moves the overlay canvas right by 40 pixels with no vertical movement. The full-size canvas extends beyond the output on the right, but only transparent pixels are cropped in this fixture.
- [`framesync` options](https://ffmpeg.org/ffmpeg-filters.html#Options-for-filters-with-several-inputs-_0028framesync_0029): secondary input `eof_action=repeat` and `repeatlast=1` are defaults; the single PNG is held after its one frame ends, throughout the main video. No `-loop 1` is needed on this overlay input. `-filter_complex` supplies a filter graph with multiple inputs; `overlay` is the operation inside it.
- [`FFmpeg` stream selection](https://ffmpeg.org/ffmpeg.html#Stream-selection): this simple two-input overlay uses the filtered video and automatically selects the source audio. Both are re-encoded with defaults here; retaining audible content does not mean `-c:a copy` was requested.
- [`-pix_fmt`](https://ffmpeg.org/ffmpeg.html#Advanced-Video-options) requests the output pixel format. `yuv420p` requests a widely supported 4:2:0 planar representation; it does not specify the video codec or add audio. Give a short local explanation before first use, with any deeper colour discussion optional.

## Reproduction and validation

Download the original photograph to a scratch location; it is not an online runtime dependency:

```sh
curl -L --fail https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg -o /tmp/Fronalpstock_big.jpg
node scripts/image-media.mjs --generate /tmp/Fronalpstock_big.jpg
node scripts/image-media.mjs
```

Generation refuses a photograph whose original byte count or SHA-256 differs from the record. The exact photograph conversion is:

```sh
ffmpeg -v error -y -i /tmp/Fronalpstock_big.jpg -vf scale=640:360:force_original_aspect_ratio=increase,crop=640:360,setsar=1 -frames:v 1 -q:v 2 public/media/images/landscape.jpg
```

The Node script is the complete source for the original PNG drawings. It draws integer-coordinate shapes and writes RGBA PNG bytes using Node's built-in zlib; there is no font, SVG rasteriser, Python or external image-library dependency.

Default verification checks committed source hashes and decoded dimensions/alpha, reproduces every drawing byte-for-byte, runs all eight native commands and compares their measured results with the record. Each output undergoes `ffprobe -count_frames` and a complete error-checked decode. Pixel checks inspect **every decoded frame**: still-image stability (allowing tiny lossy-encoding changes); orange-ball centres and exact repeated-frame order for both sequences; visible orange annotation plus preservation of underlying footage in a transparent region for both overlay examples. The checks therefore establish more than duration metadata alone. Overlay crop decoding bounds memory while checking all 192 frames.

Executed successfully: generation, native verification and all eight exact commands in Chromium using the pinned `@ffmpeg/core` 0.12.10 adapter (reported FFmpeg 5.1.4). Each WASM output was saved, independently probed with native `ffprobe -count_frames`, and fully decoded with `ffmpeg -v error -xerror -i OUTPUT -f null -`. All dimensions, durations, frame rates, decoded counts and audio properties match the native records. Browser `ffprobe` returned its pinned `-1` sentinel with valid JSON; encode commands returned zero. WASM still-photo outputs report `yuv420p`, unlike native 7.1.5's `yuvj420p`; this is an observed version difference, not grounds to equate colour-range signalling.

The browser capability harness ran from `/workspace/scratch/formats-images/verify-wasm.mjs` against a local static fixture server and the distributed adapter. It did not use notebook UI controls. Offline inclusion, image preview/import and integrated lesson review remain separate builder checks.


## Photo-author and licence source capture

The successful source-page response was retained at `/tmp/video-lab-image-media/fronalpstock.html`, fetched from `https://commons.wikimedia.org/wiki/File:Fronalpstock_big.jpg` on 28 October 2026. Its SHA-256 is `a7568564191b7a291f75db056b3763736d4e2e596b30565f4f3f9f2c96958f9e`; the page identifies `wgCurRevisionId` and `wgRevisionId` as **1252720846**. This is a scratch capture, not a required distributed asset. The permanent revision URL is recorded in the manifest and attribution.

Small exact excerpts from that response:

- Author row: `<td id="fileinfotpl&#95;aut" class="fileinfo-paramfield" lang="en">Author</td>` followed by `<a href="/wiki/User:Hannes_R%C3%B6st" title="User:Hannes Röst">Hannes Röst</a>`.
- Licence declaration, with tags removed: “This file is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported license.” Its licence anchor is `//creativecommons.org/licenses/by-sa/3.0/deed.en`.

These excerpts identify the photographer and the selected licence directly; they do not infer authorship from the image filename or a third-party summary.

## Ubuntu CI portability check

A clean **Ubuntu 24.04** Docker container, using image digest `sha256:24737cef17f4e22b1977df7d9a05e77c4e28b7da5b8911f8d8ccda136bf3573c`, installed FFmpeg through `apt-get update` and `apt-get install -y ffmpeg`. The resulting version was **6.1.1-3ubuntu5**. The repository and the host **Node v24.19.0** binary were mounted read-only. This matches the Ubuntu/Node 24/apt-FFmpeg setup used by the CI workflows without changing CI or touching app tests.

The original strict record comparison failed after completing all image and decoded-pixel checks. Its only differences were `still` and `still-practice`: Ubuntu FFmpeg 6 reported **`yuv420p`** where the Debian FFmpeg 7 record reports **`yuvj420p`**. This confirms the compatibility issue with the actual Ubuntu toolchain rather than inferring it from the browser build.

The verifier now explicitly allows **only these two labels, only for those two still-photo outputs**. It preserves the actual native evidence and logs the observed values. Every other command/result property is still deeply compared, including frame counts, duration, dimensions, codec, audio properties, picture order and overlay/alpha evidence. The exception does not claim the two labels have identical colour-range signalling.

Executed after the change:

```sh
docker exec video-lab-images-ubuntu24 bash -lc 'node --version && ffmpeg -version | head -1 && node scripts/image-media.mjs'
node scripts/image-media.mjs
```

Both passed. Ubuntu FFmpeg 6 printed `still=yuv420p, still-practice=yuv420p`; host Debian FFmpeg 7 printed `still=yuvj420p, still-practice=yuvj420p`. Both completed all eight exact commands, complete decodes and every-frame content checks. Scratch logs are `/workspace/scratch/formats-images/ubuntu24-before.log`, `ubuntu24-after.log` and `debian13-after.log`.
