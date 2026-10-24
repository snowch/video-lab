# Independent learner review — source title and recording appendix

Copyright © 2026 Christopher Snow.

Reviewed the actual built application at `http://127.0.0.1:4173/video-lab/` on 24 October 2026. This reader did not author the prose, command metadata, component or routing and made no application-source changes. Perspective: an engineer with ordinary terminal/browser/file skills, without prior knowledge of the video topics. This is the affected-path review, not a renewed audit of the whole course.

## Rendered coverage

Chromium at 390 × 900 and 1365 × 900, light and dark: all five recording-method choices in each combination, 20 method/viewport/theme states. Also checked the overview's first card and optional-guide link, source heading and document title, the guide's independent document title, keyboard method selection, source preview and custom-command retention across the return path. No document overflow occurred at normal or 200% root font size; no page exception occurred. Useful representative rendered screenshots are under `evidence/reader-*`.

The first source lesson, course card and document title say **Choose your source video**. The existing source route still works. **Recording guide (optional)** and the appendix eyebrow make the page's optional role clear; it is not numbered as a sixth course step. Browser recording is the default, and only the chosen method appears. The guide does not add general management disclosures beneath the source lesson.

The browser instructions use visible app controls and explain the permission chooser, switching to the demonstration and returning to Stop recording. The limits, filename/format variation and distinction between shared-surface sound and microphone narration are stated. Phone/tablet instructions give a concrete device-recorder → saved video → Import file path, with Apple and Android references and the file-size bound.

Native methods explicitly require a desktop FFmpeg installation and terminal, and state that the browser build cannot open these desktop capture devices. The complete commands are visible; their common options are explained. The macOS path enumerates devices before recording, explicitly warns that index 0 could be a camera, leaves **SCREEN_INDEX** as a clearly labelled replacement in a **Copy template** block, and explains `:none` and cursor capture. The guide does not silently insert an invented device index or pretend the template can be run unchanged. Linux distinguishes a bounded X11 region from a whole Wayland desktop, though its initial platform decision needs the fix below.

## Stateful/control checks

- Loaded the practice video; stored a custom `ffprobe -v error mousepad-demo.mp4` draft in Inspect; visited the appendix through source selection; returned to the original named source preview and exact custom draft. Repeated for all four viewport/theme combinations.
- Used keyboard navigation on the method selector and keyboard ArrowRight scrolling inside the long Linux command. The command's horizontal-scroll hint is visible on the narrow screen; the document remains within its viewport.
- Used Chromium's actual clipboard API: the copied Linux text exactly matched the displayed native command, including `${DISPLAY}`. The macOS copy retained the explicit `SCREEN_INDEX:none` template rather than introducing a camera index. Simulated clipboard denial only for the failure branch and observed the manual-copy fallback.
- Saved only the baseline offline lessons, disconnected the browser context, reloaded the appendix, selected phone/tablet instructions and returned to the renamed source page. No encoder asset was requested; the appendix does not execute or download FFmpeg to display instructions.

Executable survey/actions and observations: `/workspace/scratch/capture-guide/reader.mjs`, `reader.json`, `reader-actions.mjs`, `reader-actions.json`. Screenshot `reader-offline-return.png` records the actual disconnected return state. These browser checks do not claim execution on Windows/macOS or physical-device recording.

## Finding for sceptic

### R1 · Medium — Linux asks the learner to identify an unstated prerequisite

After selecting **Linux · native FFmpeg**, the page first presents installation, device-list and encoder-list checks. Only below those steps does it say:

> This command is for an X11 desktop. Run it from a terminal in that graphical session, with access to its display.

and:

> For a Wayland desktop, use the browser's screen chooser or a desktop recorder that supports your system.

The warning correctly avoids claiming that XWayland or a DISPLAY variable guarantees whole-desktop capture. However, no instruction helps the learner determine whether their session is X11 or Wayland. Neither the stated ordinary terminal prerequisites nor the source lesson establishes this knowledge. A learner can complete the installation checks, find x11grab, and still not know whether the capture command is appropriate for their desktop.

Suggested direction: make the X11/Wayland decision the first Linux-specific step, provide a concrete way to identify the current session, and explain what to do when that check is inconclusive. Direct Wayland users to the browser/device-recorder alternative before the X11 installation/recording procedure. Preserve the accurate warning rather than treating DISPLAY presence as the test. Evidence: `reader-linux-390-light.png` and the recorded Linux page text in `reader.json`.

## Assessment

The rename resolves the misleading capture obligation and the optional method-specific appendix keeps native device details out of the main first lesson. Browser/mobile workflows, clipboard controls, reflow, offline reading and retained source/draft behaviour passed the checks above. R1 is the only retained reader finding; it concerns an assumed Linux platform prerequisite, not a request to expand the main course or invent a browser capture CLI.
