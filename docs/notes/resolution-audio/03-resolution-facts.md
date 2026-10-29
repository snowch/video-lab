# Verified fact brief: Choosing a video resolution

Copyright © 2026 Christopher Snow.

Research date: 29 October 2026. Builder-facing facts and constraints only; this is not a learner prose draft. Read `/workspace/video-lab/AGENTS.md` and the current entries of `docs/plan.md`. No product files edited.

## Scope and practical judgement

- Resolution describes frame dimensions in pixels. Specify width × height to avoid ambiguous portrait/landscape labels. For the common square-pixel 16:9 landscape sizes: 720p = 1280 × 720, 1080p = 1920 × 1080, UHD/2160p = 3840 × 2160. Here “4K” means UHD 3840 × 2160, rather than cinema 4096-wide formats.
- Editorial recommendation, not a universal destination requirement: with sufficiently detailed source material, begin at 1920 × 1080 for ordinary landscape delivery. Consider 1280 × 720 for a small player or a tighter delivery/processing budget when the required detail remains readable. These are starting choices to test, not automatic upgrades for the course fixture.
- For portrait-first delivery, 1080 × 1920 is a practical 9:16 starting frame size if the receiving application/service accepts it and the source/framing supports it. Verify that destination’s current rules; do not frame this as a universal Shorts/social-media requirement.
- Preserve a low-resolution source at its useful dimensions unless a destination actually requires different dimensions. Upscaling calculates additional pixels from existing samples; it cannot recover scene detail that was never present in the source. A larger frame does not establish better picture information.
- Decide from the receiving application’s actual accepted dimensions/aspect ratios, then the intended viewing size and source detail. Test a short export in that actual application/player and device. Check small text, captions, faces and important edges at the intended viewing size. Phone-sized display versus full-screen desktop can alter whether loss of detail matters; no fixed resolution guarantees legibility.
- Aspect ratio is the width-to-height shape for square pixels; technical display ratio can also depend on pixel aspect ratio. A differently shaped destination requires an explicit framing decision: crop removes parts of the picture; padding preserves the whole picture inside a larger canvas; stretching distorts shapes. Reframe/crop with the subject and captions in view. Do not silently recommend stretching to fit.
- Destination-specific nuance: YouTube adapts its player to portrait and square uploads and specifically advises against baking padding or black bars into the file. Padding is therefore an explanation of a possible framing operation, not a general YouTube recommendation.
- 3840 × 2160 has 8,294,400 pixels per frame; 1920 × 1080 has 2,073,600. UHD has four times the pixel count, twice each dimension. This increases the image data to process/store before compression, but does not prove four times encoding time, bitrate or compressed file size. Choose it when source detail and delivery/viewing needs justify the extra work, not as a universal default.
- Resolution alone does not determine file size. Duration, codec/encoder, compression settings and picture content, frame rate, audio and container overhead also matter. Measured example below even has a 640-wide default re-encode larger than its 854-wide source. Do not generalise its byte counts across native/WASM versions.

## Primary sources, retrieved successfully

1. [FFmpeg scale filter](https://ffmpeg.org/ffmpeg-filters.html#scale). “Scale (resize) the input video, using the libswscale library.” The `-n` rule states that the filter will “make sure that the calculated dimension is divisible by n and adjust the value if necessary.” Thus `scale=640:-2` sets width 640 and calculates a proportional even height, useful for common 4:2:0 encoders. The documentation also says: “The scale filter forces the output display aspect ratio to be the same of the input, by changing the output sample aspect ratio.” Do not claim all such outputs have square pixels. The current online docs include newer options: avoid introducing `reset_sar` without checking the pinned course WASM version.
2. [YouTube video resolution and aspect ratios](https://support.google.com/youtube/answer/6375112?hl=en). Lists “1080p (HD): 1920x1080”, “720p (HD): 1280x720” and “2160p (4K): 3840x2160”. It states “For best results, avoid adding padding or black bars directly to your video.” It also explicitly describes 9:16 vertical uploads. These are evidence of this destination’s formats and behaviour, not a prescription for every receiving app.
3. [YouTube recommended upload encoding settings](https://support.google.com/youtube/answer/1722171?hl=en). “When uploading other aspect ratios such as vertical or square, the player automatically adapts itself to the size of the video.” Its separate bitrate recommendations for resolution and frame-rate classes support treating bitrate as an additional decision; do not turn the upload recommendations into universal file-size requirements.

HTML snapshots and extracted text are saved beside this brief as `ffmpeg-filters.*`, `youtube-aspect.*`, and `youtube-encoding.*`. Source pages remain the citations.

## Actual course source and native evidence

Source: `/workspace/video-lab/public/media/notebook/bunny-short.mp4`, credited Big Buck Bunny excerpt with existing course provenance. Reuse that provenance/credit; do not describe this supplied file as an HD original. Independently measured source SHA-256: `b02849f31c6493657af16c54f17d0a8853da4a8de921c377d610775840f08144`.

Native versions used: FFmpeg and ffprobe `7.1.5-0+deb13u1`. This is separate from browser WASM FFmpeg 5.1.4. Exact probe commands, output, hashes and versions are in `resolution-native-evidence.json` beside this file. Both derived files decoded fully with `ffmpeg -v error -i FILE -f null -`, exit 0 with no diagnostic output.

| File | Stored dimensions | Video rate | Video duration / frames | SAR | Display ratio | Container bytes |
| --- | --- | --- | --- | --- | --- | --- |
| Supplied `bunny-short.mp4` | 854 × 480 | 24/1 fps | 8.000000 s / 192 | 1:1 | 427:240 | 352,138 |
| Native `resolution-640.mp4` | 640 × 360 | 24/1 fps | 8.000000 s / 192 | 1281:1280 | 427:240 | 466,183 |
| Native `resolution-320.mp4` | 320 × 180 | 24/1 fps | 8.000000 s / 192 | 1281:1280 | 427:240 | 262,987 |

All contain H.264 video and AAC audio. All measured container and audio durations are also 8.000000 s. 854 × 480 is the source’s exact stored grid and is only approximately 16:9 at SAR 1:1. Its display ratio is 427:240; scale preserves that using the tiny SAR adjustment shown above.

Commands executed, with absolute input/output paths in the actual run:

```sh
ffmpeg -y -i /workspace/video-lab/public/media/notebook/bunny-short.mp4 -vf scale=640:-2 /workspace/scratch/resolution-audio/resolution-640.mp4
ffmpeg -y -i /workspace/video-lab/public/media/notebook/bunny-short.mp4 -vf scale=320:-2 /workspace/scratch/resolution-audio/resolution-320.mp4
```

The proposed browser exercise is the same genuine existing scale operation with workspace filenames: `ffmpeg -i bunny-short.mp4 -vf "scale=640:-2" resolution-640.mp4` and then `ffmpeg -i bunny-short.mp4 -vf "scale=320:-2" resolution-320.mp4`. Explain `-vf`, `scale`, width and the even-height `-2` where commands appear. Existing notebook scale=640:-2 has recorded native and WASM evidence in `docs/notes/notebook/commands.json` and `commands-wasm.json`; the new 320-wide command still needs an actual pinned WASM run if used in a live cell. Replaying these two real outputs at the same display width is a valid comparison of downscaling this source; it cannot demonstrate 720p/1080p/4K original detail. Invite observation rather than promise a specific visible artefact.

## Truthful explanatory visual proposal

Use a clearly labelled calculated frame-size model: selectable 1280 × 720, 1920 × 1080, 3840 × 2160 landscape rectangles and 1080 × 1920 portrait. Compute aspect ratio, pixel count (`width * height`) and the ratio to 1080p from the dimensions. Give 720p 921,600 pixels (4/9 of 1080p), 1080p and portrait 2,073,600, UHD 8,294,400 (4×). Use nested proportional outlines or dimension bars, visible text and accessible values. Do not fill them with progressively sharper invented versions of the 480-line fixture or imply CSS layout pixels are media pixels. If normalised to fit the page, state this is a dimension model, not a display-size measurement or processed-image result.

Separately show the actual source/640/320 previews, labelled with recorded dimensions and provenance or learner-generated results as appropriate. A comparison can let the learner choose actual playback size, with note that the page/player scales previews to fit. Preserve the distinction between a calculated grid-size visual and measured processing output.
