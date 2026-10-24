# Independent sceptic — recording appendix

Copyright © 2026 Christopher Snow.

Reviewed the reader's report and reproduced its finding against the actual built page at `http://127.0.0.1:4173/video-lab/#/appendix/recording` on 24 October 2026. No application-source edits. Chromium at 390 × 900, light theme; all five method choices were inspected. The initially absent preview was started, then the complete actual-page survey passed. Script/observations: `/workspace/scratch/capture-guide/sceptic.mjs` and `sceptic.json`. Rendered evidence: `evidence/sceptic-linux-prerequisite.png`.

## Retained finding

**R1 · Medium · Linux session prerequisite is unexplained and arrives too late.** Retain. Selecting Linux shows installation guidance and the device/encoder checks before the first sentence establishing “This command is for an X11 desktop”. A later paragraph correctly sends Wayland users to the browser or a supported recorder, but the page offers no session-identification instruction. Actual rendered text offsets were installation 225, device-list heading 511, X11 condition 813 and Wayland alternative 1065; no `XDG_SESSION_TYPE` check or equivalent decision aid is present. An engineer can find `x11grab` in an installed binary and still be in a Wayland session. Ordinary terminal knowledge does not establish this display-system prerequisite.

Move the session decision before FFmpeg installation/device/encoder work. Give a concrete desktop-terminal check, explain what x11/wayland mean for this choice, and provide an inconclusive-result fallback. The new fact brief's standard `printf` query is suitable as a report of the desktop-provided `XDG_SESSION_TYPE`, with blank/other values explicitly inconclusive. It must not be described as proof of capture permission or as an independent detection of the whole display. Upstream systemd's checked `pam_systemd.xml` documents x11, wayland and other session types; DISPLAY/XWayland presence alone remains insufficient.

## Technical source checks and rejected concerns

- The guide explicitly sends native commands to an installed desktop terminal, not the course Command field, and says WASM cannot open those desktop devices. The browser method instead names browser controls. The capture controller actually calls `getDisplayMedia` and MediaRecorder, with a 15-second timer and 20 MiB bound. No invented browser recording command or silent microphone request was found.
- FFmpeg n7.1.5's checked `doc/indevs.texi` supports gdigrab's `desktop` form; AVFoundation's video:audio indices, device listing, `none` and `capture_cursor`; and x11grab's display/offset/region syntax. No new unsupported native syntax finding.
- macOS explicitly lists devices, warns that 0 can be a camera, says to replace SCREEN_INDEX with the listed screen index, and labels its copy action **Copy template**. The displayed command retains `SCREEN_INDEX:none`. Reject an interpretation that the guide silently selects a guessed screen/camera index or promises an unchanged runnable macOS template.
- The current Linux example clearly bounds capture to a 1280 × 720 upper-left region and warns that the region must fit. The Wayland warning is technically correct; R1 concerns the missing decision step, not removal of that qualification.
- Independently probed the existing actual Linux test file and checked its SHA-256 against the recorded result: five seconds, 75 pictures, H.264 yuv420p, 1280 × 720, 15/1 rate, one video stream/no audio, 11,979 B, hash `9e09466e80608f2068a90548c6f9fb5384e64607ce59ee989ad2392037960d37`. This corroborates the recorded virtual-Linux run, not Windows/macOS or physical-device execution.
- Keeping the native options in an optional, explicitly selected appendix avoids requiring their terminology in the first source lesson. No evidence justifies moving them into the main course or requiring every learner to record instead of using/importing a source.

No additional blocking finding from this reproduction. This sceptic pass does not repeat the reader's complete light/dark, desktop/phone, clipboard, offline or source/draft-retention checks, and does not claim a full test-suite run or native execution on Windows/macOS/mobile hardware. The final checker must inspect the rebuilt Linux decision and the resulting navigation/controls after the ranked fix.
