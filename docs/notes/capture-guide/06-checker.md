# Independent built-page checker — recording appendix

Copyright © 2026 Christopher Snow.

Checked the actual final built site on 24 October 2026 at `http://127.0.0.1:4173/video-lab/`. This checker did not author or edit application source. Checked asset: `assets/course-DGIcTKYQ.js`, SHA-256 `642415600e1c82a8d4ea8c80f92b0318e5900afd8e7075d7b6aa616ad55ef55e`.

## Rendered coverage and naming

Chromium at 390 × 900 and 1365 × 900, light and dark. Inspected all five recording methods in each combination: 20 method/viewport/theme states. Normal and 200% root text size produced no document horizontal overflow. Actual source card, source heading and document title say **Choose your source video** while the bookmark remains `#/capture`. The overview and source lesson both expose **Recording guide (optional)**. Its **Optional appendix** label and absence of the numbered journey navigation keep it outside the required course path. Browser instructions are the default; native commands are not rendered on browser/mobile methods.

Rendered screenshots inspected: `evidence/checker-browser-390-light.png`, `checker-linux-390-light.png` and `checker-offline-mobile.png`. The browser path is a readable instruction page with a clear source return; the longer native reference remains confined to the explicitly selected desktop method.

## R1 checked against the final page

**Resolved.** Linux now begins by defining X11/Wayland as display systems, asks for the reported desktop session type using the standard shell query, and explains the result **before** installation/device/encoder checks. The actual rendered order places **Check your desktop session first** before **Check your installation** and the blank/other fallback before **List available capture devices**. Only `x11` proceeds to these X11 checks; `wayland` and inconclusive outputs have browser/desktop-recorder → import alternatives. DISPLAY or XWayland presence is not presented as proof of capture support.

Copied the actual session query from the page and independently executed the shared metadata command in Bash with desktop-provided values x11, wayland and empty. It printed respectively `x11\n`, `wayland\n` and `\n`. The prose describes a reported environment value, not automatic physical-display or permission detection.

## Controls and retained work

- Keyboard method selection worked. The long native command can be focused and scrolled right with ArrowRight on the narrow screen; a visible horizontal-scroll hint appears. The document itself stays within its viewport.
- Used Chromium's real clipboard API. Linux recording and session queries copied exactly as displayed, including shell expansion/format escapes. macOS copied the explicitly labelled `SCREEN_INDEX:none` template, with enumeration and replacement instructions and a camera-index warning before it. No guessed camera index or invented browser recording command is introduced.
- Simulated clipboard denial only for its failure branch and observed the manual-copy fallback.
- In all four size/theme combinations: selected the practice source, saved a custom `ffprobe -v error mousepad-demo.mp4` draft in Inspect, visited the guide and returned. The named source preview and exact draft remained. Source and guide document titles were correct after navigation.
- Saved the baseline lesson copy only, disconnected the browser context, reloaded the appendix, selected Linux and mobile instructions and returned to the renamed source lesson. No `/encoder/` asset was requested: reading the guide needs neither downloaded processing tools nor native command execution.
- No page exceptions were observed. Native text clearly says to run commands in an installed desktop terminal rather than the course Command field, and explains that WASM cannot open these desktop capture devices. Browser text uses actual app recording controls and states the sound/permission/time/file limits.

Script and observations: `/workspace/scratch/capture-guide/checker.mjs`, `checker.json` and `checker.log`. All checks completed on their first run against the final asset; no application changes were requested by this checker. The builder's full repository gate is separate.

No remaining blocking finding in this slice. This is Chromium built-page, clipboard and browser-offline verification; it does not claim Windows/macOS command execution, physical phone/tablet capture, Firefox coverage or a new full-course prose audit.
