# Independent technical sceptic review: glossary

Copyright © 2026 Christopher Snow.

Reviewed 27 October 2026 by a separate sceptic agent. No product edits, commits, CLI tests, full quality-gate rerun or encode by this reviewer.

## Technical review

Read all 32 definitions and examples in `glossary.strings.ts`, the renderer/CSS, notebook/main route changes, `01-facts.md`, the related reviewed lesson copy and `visuals/media.json`. Independently read all built glossary text, retained in `/workspace/scratch/glossary/sceptic/built-text.txt`. No factual defect found in the definitions or examples.

| Concepts checked | Evidence and adjudication |
| --- | --- |
| Container, codec, stream, audio channel | MP4 is distinguished from H.264/AAC; the stereo channels belong to one audio stream. Native source metadata confirms one video stream and one two-channel audio stream. No container/codec/channel conflation. |
| Demuxer, muxer, decoding, encoding, filter, stream copy | The roles remain distinct. Demuxing reads encoded streams; decoding reconstructs pictures/samples; filtering processes decoded media; encoding represents it using a codec; muxing writes streams into a container. Stream copy bypasses decoding/encoding and may change container layout/metadata. A muxer need not have multiple streams. These agree with the official FFmpeg detailed description and reviewed lessons. |
| Brand, metadata | Brands are declarations, not conformance checks. `isom` is explicitly not unique to MP4, and `mp41` declares MP4 version 1 compatibility. The file's native tags agree. Metadata does not establish visible/audible results. MP4RA was independently checked in the preceding container-brands slice on the same date. |
| Bitrate | Bits are distinguished from bytes. At equal duration, higher average whole-file bitrate means a larger file; quality is not guaranteed. Native bitrate is 352138 bits/s, consistent with the displayed rounded `352 kb/s` and “about 352,000”. No processing-speed claim. |
| Amplitude, audio sample rate | `volume=0.5` multiplies sample values rather than promising half perceived loudness. Native source audio is 48000 samples/s per channel; the definition distinguishes this from pictures/s. |
| Frame, frame rate, dimensions, pixel, pixel format | The supplied video is 854 × 480 and regular 24 fps in the verified timeline. Average fps alone is correctly said not to establish regular spacing. Stored dimensions do not measure perceived quality or display size. The yuv420p example describes decoded component storage separately from codec/container. FFprobe's audio-frame use is distinguished from a video picture. |
| Timestamp, presentation timestamp, time base | The recorded video clock is 1/12288 second per tick with 512 ticks per picture. Initial PTS values 0, 512 and 1024 and tick 1024 at about 0.083333 seconds match the verified timeline. A timestamp tick is not equated with one picture. |
| Duration, keyframe | Seconds 2 to 5 span three seconds. The keyframe example refers to the actual reviewed source-second-2 cut comparison. Copied cuts are correctly described as potentially retaining earlier material for dependencies, not promising that every player visibly starts early. |
| CRF, preset, lossy compression | CRF is scoped to libx264's quality-oriented control with a general lower-value tendency, not fixed bitrate/file size. The lesson really compares 18 and 35 from the same source. Preset changes encoding effort, not playback rate; the lesson uses ultrafast/fast with CRF 26 and does not promise identical quality. Re-encoding does not restore discarded detail. |
| Cropping, scaling, padding | The recorded examples and reviewed lessons support the central 480 × 480 crop, 640 × 360 stored scaling result and full-view square with black padding. Cropping is separated from resizing, and stored grid size from player enlargement. No new measured outcome is invented. |
| Subtitle | The actual supplied SRT contains two cues, with its second cue from 3 to 6 seconds. Burned-in text becomes picture pixels; separate subtitle switching is not promised. |

Fresh native metadata check:

```sh
ffprobe -v error -show_entries stream=index,codec_name,codec_type,width,height,avg_frame_rate,time_base,sample_rate,channels:format=duration,bit_rate:format_tags=major_brand,compatible_brands -of json public/media/notebook/bunny-short.mp4
```

Also read the actual SRT and verified framing/quality/timeline records. Official [FFmpeg detailed description](https://ffmpeg.org/ffmpeg.html#Detailed-description) and [ffprobe manual](https://ffmpeg.org/ffprobe.html) were fetched successfully for this review; saved HTML is in the sceptic artifact directory. No new performance or visual-quality guarantee was found.

## Independent built checks

Standalone Node Playwright probes used `http://127.0.0.1:4173/video-lab/#/glossary`:

- The direct route displayed 32 alphabetical entries. Term/alias lookup handled case and surrounding spaces; fps, Hz, PTS, CRF and demultiplexing found their expected entries. No-result feedback and Clear search worked, with focus returning to the search field. Names/aliases, rather than arbitrary definition text, drive search.
- At phone width 390 in dark mode with doubled text, the page and a filtered definition reflowed without horizontal overflow. Visually inspected the saved screenshot. Reading/searching made no practice-video, subtitle, font or processing-tool requests; there were no lesson cells to execute or auto-prepare.
- A real `ffprobe bunny-short.mp4` was paused during tool loading, then the footer opened the glossary. Processing/cancel controls stayed available. After release, the probe finished successfully; Back restored the command and raw H.264 output, Forward reopened the glossary, and a glossary lesson link opened the intended route. The notebook provider remains mounted across these routes, consistent with preserved files/drafts/active commands.
- On the final alias build, all seven added lookups passed: `sample_rate`, `kbps`, `major brand`, `compatible brands`, `isom`, `mp41` and `avg_frame_rate`. The `isom` result retained the explicit warning that it does not uniquely identify MP4.
- After explicit Download for offline use completed, a new page opened the glossary with networking disabled. Its 32 entries and `isom` lookup worked, and the Brand lesson link opened/prepared its lesson offline. No HTTP failure occurred during this stable-build save.

Commands and evidence:

```sh
node /workspace/scratch/glossary/sceptic/review.mjs
node /workspace/scratch/glossary/sceptic/final.mjs
```

The first script passed the direct/search and active-command scenarios, then its offline save reported incomplete while the preview was being rebuilt for the added aliases. That result is retained in `results.json` and is not claimed as a pass. A fresh isolated save on the frozen alias build passed, recorded with the final aliases and cold offline navigation in `final-results.json`. The incomplete attempt was not reproduced on the stable build and is not retained as a product defect. This review does not claim a full browser/project matrix; the builder runs the full gate separately.

## Reader adjudication

Read the completed `03-reader.md`. Retain **R1, minor: indirect Audio sample rate lesson destination**. Independently read both built lesson pages: `inside-video/inspect` identifies the 48000 Hz field but says Frames and time explains it separately; `frames-time/rate` directly explains sound measurements per second per channel and distinguishes them from pictures. The glossary promises a lesson that explains the concept in use, so the direct explanation is the better target. Change only this entry's lesson ID to `frames-time/rate`; its definition and example are correct.

No other reader finding requires retention or rejection. Its clarity, responsive, search, keyboard/touch, discovery and workspace observations agree with the independently reviewed implementation and focused built probes.

The builder changed only this entry's lesson target for R1. Independently verified the final rebuilt glossary: searching `sample_rate` yields Audio sample rate with `href="#/learn/frames-time/rate"` and label “Learn more: Count pictures through time”. Following it opens that actual lesson and its explanation of 48,000 samples per second per channel, distinct from pictures. Evidence: `target-results.json` in the sceptic artifact directory. The definitions and aliases were unchanged by this correction.

**Disposition: R1 retained, corrected and independently verified in the built app. No unresolved technical or reader finding remains in this focused review.** The separate final checker and builder's full gate remain separate validation records.
