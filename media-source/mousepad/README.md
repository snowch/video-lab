# Mousepad Find and Replace recording

Copyright © 2026 Christopher Snow.

`public/media/mousepad-demo.mp4` is an original, silent recording of actual Mousepad 0.6.3 application pixels on a private X11 display. It does not show Video Lab or a simulated editor. `deployment.ini` is original fictional material. The two occurrences of `staging` are replaced with `production` using Mousepad's Find and Replace dialog. No personal data or external media is present.

Source SHA-256: `d2546b852aa4ac8f338615a79b507a0a5807d9af7ad8bf0cb8fdf1dfdec77b3e`. Recorded 23 October 2026. Original recording and fictional text: Copyright © 2026 Christopher Snow; no additional distribution licence is declared by this repository. Third-party application UI: Mousepad contributors, GPL-2.0-or-later; https://gitlab.xfce.org/apps/mousepad . Mousepad itself is not redistributed. Debian package version 0.6.3-1; `/usr/share/doc/mousepad/copyright` provides upstream notices. Xfwm4 supplies window decorations.

Capture environment: Xvfb display `:88`, 1280×720×24, Xfwm4 without compositor, Mousepad maximised. Set `org.xfce.mousepad.preferences.view use-default-monospace-font false`, `font-name 'Monospace 21'`, `show-line-numbers true`, and `org.xfce.mousepad.preferences.window path-in-title false`. Open the supplied source, enable Replace all in Document in Ctrl+R, then close the dialog before capture. Search fields begin empty when reopened. The action script opens Ctrl+R around 2.5s, types the two words, selects Replace All, closes the dialog and holds the result. The final result is visible by approximately 6s. Timing depends on the desktop; the committed recording is the evidence, not a promise of byte-identical regeneration.

`control.py` sends actual XTest input. `record.py` records the real display with native FFmpeg, using:

```
ffmpeg -hide_banner -y -f x11grab -framerate 15 -video_size 1280x720 -draw_mouse 1 -i :88.0+0,0 -t 12 -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart public/media/mousepad-demo.mp4
ffprobe -v error -show_streams -show_format -of json public/media/mousepad-demo.mp4
ffmpeg -v error -y -i public/media/mousepad-demo.mp4 -ss 2 -t 6 -map 0:v:0 -map '0:a?' -c:v libx264 -pix_fmt yuv420p -c:a aac /workspace/scratch/mousepad-capture/demo.mp4
ffprobe -v error -show_streams -show_format -of json /workspace/scratch/mousepad-capture/demo.mp4
```

Native FFmpeg and ffprobe: 7.1.5-0+deb13u1. Recorded JSON under `docs/notes/live-workbench/media/`. Source: one H.264/yuv420p video stream, 1280×720, 15fps, 180 frames, 12s, 74,303 bytes; no audio. Default trim: six seconds, 90 frames, one H.264 video stream, no audio. Optional audio mapping does not invent sound. Independently replay the real output to judge whether the six-second edit gives a viewer enough time.

## Build experiment stills

The course-wide workbench uses JPEGs extracted from this recording at source picture indexes 0, 90 and 150 (source times 0, 6 and 10 seconds at 15 pictures/second). `frame000.jpg` shows the initial configuration; the later pictures show the replacement result. These three stills do not reproduce continuous interaction. Their output holds are set by the learner's `-framerate`, independently of source timestamps.

Generated with FFmpeg 7.1.5:

```sh
ffmpeg -hide_banner -loglevel error -i public/media/mousepad-demo.mp4 -vf 'select=eq(n\,0)+eq(n\,90)+eq(n\,150)' -fps_mode vfr -start_number 0 public/media/mousepad-frames/frame%03d.jpg
```

The separate quiet synthetic tone remains the original generated `media/journey/tone.wav`; neither it nor the stills imply that the Mousepad recording contains audio.
