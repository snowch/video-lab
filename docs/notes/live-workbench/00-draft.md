# Separate live-workbench prose draft

Copyright © 2026 Christopher Snow.

The separate `prototype_drafter` agent adapted the approved prototype strings into `src/workbench/strings.json` from the builder's verified fact brief. Existing keys remain available for renderer compatibility; the `live` group supplies execution, file, capture, storage and download labels. This work changes prose only.

## Verified facts and changed teaching example

The source is an original screen recording of Mousepad 0.6.3, an independent text editor, demonstrating Find and Replace on a fictional configuration file. It is not a recording of Video Lab. The builder supplied the recording provenance and native trim evidence. The drafter independently ran:

```sh
ffprobe -v error -show_entries format=duration,size:stream=codec_name,codec_type,width,height,pix_fmt,r_frame_rate,nb_frames -of json public/media/mousepad-demo.mp4
```

The report identifies one H.264 video stream, 1280 × 720 pictures, `yuv420p`, 15 frames per second, 180 frames, twelve seconds of container duration and 74,303 bytes. There is no audio stream. Accordingly, the Inspect prediction now asks which streams silent media should contain; no prose promises a synthetic tone, AAC stream or ten-second duration. The optional audio map is explained as preserving sound only when an audio stream exists.

The builder's native command uses `-ss 2 -t 6` after the input, maps the first video stream and any existing audio, and encodes to a new MP4. The text treats the six-second cut as an experiment to replay and assess, not a guaranteed editorial success. Changing the duration should prompt comparison with the actual output.

## Runtime and interface boundaries

All prototype/simulation claims were removed from the live strings. The legacy `prototype` key now labels the working command lab; legacy preview/result keys describe actual execution and saved output. Generated video, JSON and recipes are described as available only after a successful run. A changed command or source leaves the earlier result labelled as belonging to the earlier run.

File selection, browser recording, playback, downloads, deletion and cancellation are app controls. Learners enter FFmpeg or ffprobe commands, with the same command visible in builder and typed modes. The browser workspace is not a shell. Its JSON-only probe, unsupported pipes/redirection/expansion and build-specific codec/device limits remain explicit in the relevant detail text.

The first-run message distinguishes the optional processing download from saved lessons. Storage text uses the existing limits: 12 working files plus 12 recipes, 32 MiB total, 20 MiB per file, and a 120-second operation limit. Browser storage can be removed, so the prose directs users to download important work. Storage failures avoid implying persistence. Import rename feedback names both the original file and the workspace name without suggesting the device's original has changed.

Browser capture requests a shared surface, with no sound in this interface. It is distinct from FFmpeg desktop capture. It stops after fifteen seconds or on the learner's Finish recording action; Cancel discards the active recording. Capability and permission failures direct the learner to import or the practice video.

## Model error wording review

The drafter read `src/workbench/model.ts` without editing it. Its source/output conflict error correctly requests a different output name. Its existing-output error offers a new name or `-y` specifically in an FFmpeg command, rather than suggesting ffprobe supports that overwrite switch. Its recipe collision error correctly requests a new output name. These messages are concise and state a recovery action. The builder should keep these words in the same final prose review if validation behaviour changes.

The existing argument parser and media engine may supply additional error messages. The built-page reader and checker still need to verify that the renderer displays them with useful context, that successful ffprobe cleanup is not mistaken for a native success status, and that aborted/failed operations never expose an incomplete output as downloadable.

## Editorial pass

Both sentence and explanation passes were applied. British English and direct labels are retained. Values for the provided recording do not describe imported sources. The current interface must use the strings only when the matching state is true; in particular, do not show Finished or export-ready text merely because a run was requested. Independent built learner, sceptic and checker reviews remain required.
