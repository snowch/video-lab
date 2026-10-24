# Source naming and optional recording appendix

Copyright © 2026 Christopher Snow.

## Plan and verified facts

Rename the first available lesson to **Choose your source video**, including course card, visible title and document title. Preserve `#/capture`, source/file storage, drafts and all other routes. Keep Get video as its short navigation label. An optional `#/appendix/recording` page is linked near source selection and from the course overview; it is not another course step. Its default method is browser recording. A method selector reveals only the chosen browser/native OS/mobile instructions. Returning to the source page must retain saved media and command drafts.

Native command metadata is implemented in `src/capture/native.ts` before prose. These commands run in an installed desktop FFmpeg terminal, not the WASM Command field. Browser sharing uses getDisplayMedia/MediaRecorder, requests permission, and is a separate API from FFmpeg desktop input devices. WASM cannot obtain the native gdigrab/AVFoundation/x11grab desktop devices. Browser Record screen has no sound by default; shared-sound recording requests selected-surface audio, never a microphone, and the browser may supply none. Stop recording keeps actual MP4/WebM bytes; the lab stops automatically at 15 seconds and rejects files over 20 MiB. Browser recording availability varies; mobile users should use device recording and import, or use practice media.

Before any capture: plan initial state, one visible action and a readable result, make text readable, close unrelated notifications/windows and exclude sensitive content. Native examples record five seconds without sound, so the learner must be ready to perform the action promptly and leave a result hold. They can increase the duration deliberately, keeping the imported recording within the 20 MiB file limit. Native commands refuse implicit overwrite; choose a new output filename. They produce files on the computer, which must then be imported into Get video. Replaying the source is a separate check of clarity, not proof that the editor's work is complete.

### Native command verification

Native FFmpeg/ffprobe 7.1.5-0+deb13u1. Actual Linux X11 test captured a real independent Mousepad editor on a 1280×720 virtual X server at :97 with the exact displayed Linux arguments, substituting the active display and a scratch destination. FFmpeg exit 0, H.264 yuv420p, 1280×720, 15 fps, 75 pictures, 5.000000 seconds, one video stream/no audio, 11,979 B. SHA-256 `9e09466e80608f2068a90548c6f9fb5384e64607ce59ee989ad2392037960d37`. This is virtual-display evidence, not physical Windows/macOS/device validation. The first decoded picture was inspected and showed Mousepad, not the course. Exact command, ffprobe, logs and reproducible script are in `/workspace/scratch/capture-guide/`; recorded result and script are copied into this note directory.

- `-f` chooses a capture input device: gdigrab on Windows, avfoundation on macOS, x11grab on X11 Linux.
- `-framerate 15` requests 15 captured pictures per second; it is an input setting here.
- `-i desktop` is the Windows whole-desktop source. gdigrab can instead capture an actual named window with `title=...`, but no second advanced command is needed in this appendix.
- macOS must enumerate video devices with `ffmpeg -f avfoundation -list_devices true -i ""`. Find the screen, not a camera. `SCREEN_INDEX` in the recording template is a placeholder to replace with that listed screen index. Do not choose an invented index 0 or 2 by default. `:none` requests no audio input. `-capture_cursor 1` includes the pointer. macOS requires the system's screen-recording permission for the capturing app/terminal; permission can require a terminal restart. The listing prints devices and does not record a file; some builds then report an input-opening error.
- Linux uses the current graphical X11 shell's DISPLAY variable, a 1280×720 upper-left region, and must have access to that display and a region that fits. `${DISPLAY}` is ordinary shell expansion in the native terminal, not supported syntax in the app Command field. Wayland/XWayland/DISPLAY presence does not guarantee full-desktop X11 capture; use a desktop recorder or the browser chooser for Wayland. No universal PipeWire command is claimed.
- `-t 5` is five seconds of output; `-an` omits sound. No native example requests a microphone.
- The scale filter rounds width/height down to even values for yuv420p; quotes keep the expression one argument. It does not improve image detail.
- `-c:v libx264` encodes video as H.264; `-pix_fmt yuv420p` uses a broadly supported picture-colour format; the final `.mp4` filename chooses an MP4 container. Teach these terms briefly where shown, do not hide flags as boilerplate. Native FFmpeg builds differ: `ffmpeg -devices` must include the chosen input, `ffmpeg -encoders` must include libx264. Link official FFmpeg download page, do not assume installed tools.

Windows/macOS forms received authoritative source review only, not execution. FFmpeg n7.1.5 `doc/indevs.texi` fetched 200 and inspected, including gdigrab, AVFoundation indices/none/cursor and X11 region/display syntax. Source: https://github.com/FFmpeg/FFmpeg/blob/n7.1.5/doc/indevs.texi and https://ffmpeg.org/ffmpeg-devices.html . Native encoding claims are additionally verified by the actual Linux encode and existing recorded-media gate.

### Phone/tablet source review

Apple https://support.apple.com/en-us/102653 fetched 200: Control Centre Record button (add if absent), countdown, record task, stop via recording indicator or Control Centre, resulting video in Photos. Some apps disallow recording audio/video. Avoid implying every Apple device has identical gestures.

Google https://support.google.com/android/answer/9075928?hl=en fetched 200: supported Android devices use Quick Settings → Screen record (may need Edit/add tile), choose recording/audio/touches then Start, stop from screen-recorder notification, find video in Photos/Movies. Manufacturer/version wording varies. Audio choice is deliberate; neither universal system-audio nor microphone support is promised. Keep mobile subsection concise and link manufacturer docs. The saved recording must be accessible to this browser's Import file chooser; save/export it to device Files if it is not offered from Photos.

### Browser documentation

https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia fetched 200 and reviewed: user-initiated permission chooser, varying support and audio availability, no direct native desktop devices. Existing controller and full browser tests exercise actual bytes/lifecycle, cancellation, absent support and track release. The new guide does not invent a CLI recording command or run native examples in WASM.

Separate prose, independent built reader → sceptic → ranked fixes → checker, full `npm run check`, reviewed main deployment and public/offline route checks are required. Scope is documentation and navigation, not a new capture engine.

## Linux session-identification clarification

The fresh reader found that an ordinary terminal user may not know whether their Linux desktop uses X11 or Wayland. Upstream systemd `man/pam_systemd.xml` was fetched 200 and checked at https://github.com/systemd/systemd/blob/main/man/pam_systemd.xml: XDG_SESSION_TYPE identifies the session, with possible values including x11, wayland, tty, unspecified, mir and web. It can also be absent; the managed shell used for this work returns an empty value. The ordinary native shell command `printf '%s\n' "$XDG_SESSION_TYPE"` prints that value; it does not independently detect or certify capture permission. Only an x11 value permits proceeding to this X11 example; wayland/blank/other values lead to browser/desktop recording and import rather than guessing from DISPLAY. This decision must precede FFmpeg installation/device/encoder checks. The command is standard shell syntax in the desktop terminal, not a browser workspace convenience.
