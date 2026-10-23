# Optional native capture: commands and verification

Copyright © 2026 Christopher Snow.

Verified 23 October 2026. These commands run in a terminal on the learner's own computer with a native FFmpeg build. Browser screen recording uses getDisplayMedia and MediaRecorder instead. ffmpeg.wasm processes supplied media bytes; it does not obtain desktop capture devices.

## Before running a command

Use `ffmpeg -devices` to check that the capture input for the operating system is present, and `ffmpeg -encoders` to check for libx264. Availability is build-specific. Make the application text readable, close unrelated windows and notifications, and inspect the region to avoid recording sensitive information. The examples record five seconds of picture only: `-an` disables audio, including microphone narration. Audio devices and permissions need a separate deliberate choice.

The native capture input is selected by `-f` and `-i`; `-framerate 15` requests fifteen pictures per second; `-t 5` limits output to five seconds. The scale expression rounds each dimension down to an even number for yuv420p, without promising improved detail. libx264 encodes the pictures; the .mp4 destination selects the MP4 file format. Use distinct output names to preserve previous recordings.

## Windows: gdigrab

```sh
ffmpeg -f gdigrab -framerate 15 -draw_mouse 1 -i desktop -t 5 -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -movflags +faststart demo-windows.mp4
```

This selects the Windows desktop. gdigrab also supports `title=WINDOW_TITLE` as an input to select a named window, but the learner must use the actual title and quote an argument containing spaces. `-draw_mouse 1` requests the pointer. Desktop size, multi-monitor placement, display scaling and input availability can affect the result; replay it and check that the intended app is readable.

**Evidence:** input name forms, desktop/window semantics, framerate and draw_mouse options checked against FFmpeg's authoritative gdigrab documentation. No Windows session was available, so no Windows execution or permission behaviour is claimed.

## macOS: enumerate AVFoundation devices first

```sh
ffmpeg -f avfoundation -list_devices true -i ""
```

Read the video-device list and find the screen entry. Do not assume a screen is device 0: that may be a camera. The following command uses **2 only as an example**; replace it with the listed screen index.

```sh
ffmpeg -f avfoundation -framerate 15 -capture_cursor 1 -i "2:none" -t 5 -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -movflags +faststart demo-macos.mp4
```

The input string is video-device:audio-device. `none` explicitly requests no audio device. macOS may require screen-recording permission for the terminal or capturing application; follow its system prompt/settings. The exact screen index and supported capture behaviour depend on the machine. Listing devices is an enumeration command and may exit after printing the list without creating a file.

**Evidence:** AVFoundation device enumeration, index/name syntax, `none`, framerate and capture_cursor checked against the authoritative input-device documentation. No macOS session was available; these are documented command forms, not executed macOS results.

## Linux with X11: capture an explicitly sized region

```sh
ffmpeg -f x11grab -framerate 15 -video_size 1280x720 -i "${DISPLAY}+0,0" -t 5 -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -movflags +faststart demo-linux.mp4
```

Run this from the intended graphical X11 session, with DISPLAY set by that session. It selects a 1280×720 region starting at the display's upper-left corner; adjust the dimensions/offsets to the actual screen and place the app within that region. The region must fit. FFmpeg must have x11grab support and access to that X server.

**Wayland:** x11grab targets an X11 display. The presence of XWayland or a DISPLAY variable does not guarantee capture of the complete Wayland desktop. Use the browser's consent-based screen chooser or a desktop recorder such as OBS through the system's supported portal/PipeWire path, then inspect the resulting recording. Do not present an x11grab command as a universal Wayland solution or infer that ffmpeg.wasm can use PipeWire capture devices.

## Actual Linux/X11 execution evidence

The managed Linux environment had native FFmpeg/ffprobe 7.1.5-0+deb13u1 and x11grab support, but no installed Xvfb command. Debian's xvfb 21.1.16-1.3+deb13u4 package was downloaded and extracted into `/workspace/scratch/native-capture/runtime`, without installing system packages or changing permissions. Existing libraries sufficed.

Started a virtual X11 server with a 1280×720, 24-bit display at :87, launched headful Playwright Chromium on it, and opened the actual original build-queue scene at the built course's `/video-lab/demo.html`. FFmpeg captured that display through x11grab while the test clicked Sort in the visible browser. The command had the same capture/encoding settings above, with explicit `-i :87.0+0,0` and a scratch output filename. The test added `-y` only for its disposable scratch file.

**Observed result:** FFmpeg exit 0; actual MP4 with H.264 video, 1280×720, 15/1 frame rate, 75 frames, 5.000000-second duration, 44,529 bytes and no audio stream. SHA-256: `6c6d49042609d7151ee8ba5ba4ef4ab508f9f7c588201ff086871712e54677ed`. The bytes were independently inspected with:

```sh
ffprobe -v error -show_entries format=duration,size:stream=index,codec_type,codec_name,width,height,r_frame_rate,nb_frames -of json native-x11.mp4
```

This is real capture of a virtual X11 desktop containing an actual browser application. It does not establish performance or permissions on a physical desktop. FFmpeg log, source-view screenshot, test script and actual MP4 are under `/workspace/scratch/native-capture/`.

## Additional actual browser capture evidence

Used the production preview's actual Capture page in headful Chromium on the same virtual display. Clicked **Start screen recording**, which called the genuine browser getDisplayMedia API and MediaRecorder. The test retained references to returned tracks only to inspect their lifecycle; it supplied no fake stream or canvas replacement. Chromium's test flag automatically selected the virtual monitor in its chooser, so this does not test a human's manual source selection or permission decision.

The returned track was live, 1280×720 at a reported 12 fps, with `displaySurface=monitor` and the requested audio choice false. After two seconds, clicked **Stop recording**; every returned track reached `ended`. The actual resulting WebM replay advanced and its download link saved 138,591 bytes. Recorder MIME was `video/webm;codecs=vp9`; independent native ffprobe identified VP9, 1280×720, with no container duration field. SHA-256 of this observed recording: `e1a328b8e7cfe7cea683629e05fa98d8b5e12cc6fe785b41a678305558a39818`.

That missing duration reinforces the need for the application's explicitly labelled observed-packet timing fallback. The observed bytes/hash are evidence of this run, not expected constants for arbitrary captures. Browser log, screenshot, test script and downloaded WebM are in the same scratch directory. This adds actual API/lifecycle/playback evidence beyond synthetic controller tests; it does not claim physical-device, microphone or system-audio coverage.

## Sources and limitations

- FFmpeg native devices: https://ffmpeg.org/ffmpeg-devices.html#gdigrab, https://ffmpeg.org/ffmpeg-devices.html#avfoundation, https://ffmpeg.org/ffmpeg-devices.html#x11grab.
- Authoritative versioned source used when the documentation website returned HTTP 503: https://github.com/FFmpeg/FFmpeg/blob/n7.1.5/doc/indevs.texi. The checked source is retained at `/workspace/scratch/ffmpeg-indevs.texi`.
- Browser capture API: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia.

Only native Linux/X11 and the managed Chromium virtual-display run above were executed. Windows/macOS command forms received source review only. These optional references do not replace the lesson's first-class browser capture or honestly labelled provided-recording path.
