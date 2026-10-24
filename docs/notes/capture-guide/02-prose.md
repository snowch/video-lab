# Recording appendix — separate prose draft

Copyright © 2026 Christopher Snow.

Drafted from the verified `01-facts.md` brief and native command metadata. This drafting agent did not write the capture model, routing or page component. The application builder still edits for clarity and the built page still needs independent learner, sceptic and checker review.

## Naming and placement

The first lesson title is **Choose your source video**; its short navigation label remains **Get video** and its existing route is preserved. **Recording guide (optional)** leads to **Record your own screen**, an optional appendix rather than a required extra course step. **Back to source video** gives a clear return path. Source selection remains valid when learners adopt practice footage rather than making a capture.

## Progression and scope

The appendix begins with the purpose of a short recording and one method choice. The browser is the default method. The component should render only the selected method, so a learner is not asked to read desktop capture devices before using the ordinary browser recorder or mobile controls.

Browser instructions name the actual app actions, sharing permission, switching to the demonstration and returning to stop. Sound, duration, file-size and container differences are explained where they matter. They never describe an invented recording CLI command.

Native sections explicitly require an installed desktop FFmpeg and a desktop terminal. The build checks precede the system-specific capture example. Windows desktop scope, macOS screen enumeration and placeholder replacement, and X11 region/display requirements are explained with their commands. The macOS command remains labelled a template until the learner replaces `SCREEN_INDEX`; no camera/device index is guessed. Wayland users receive a viable browser/desktop-recorder direction rather than an unsupported universal command.

Common native flags receive short visible definitions instead of being treated as hidden boilerplate. These optional capture examples introduce more options than the main source lesson, so they should remain confined to this appendix. The instructions explicitly state five seconds without sound, preparation before running, deliberate longer durations when needed, a new output filename per attempt, and importing/replaying the resulting real file.

Phone/tablet instructions use the official Apple and Google workflows without promising identical controls on every device. They finish at the file chooser and imported replay, including exporting to Files when a browser cannot choose directly from Photos. No microphone or universal shared-audio support is promised.

## Implementation notes

All new learner-visible labels, paragraphs, ordered steps, common-option explanations, source-link labels and copy/accessibility feedback are in `src/capture/guide.strings.ts`. Native commands remain in `src/capture/native.ts`, so they can be reviewed and verified independently of prose. `copyTemplate` is intended for the macOS placeholder command; use `copy` for concrete commands and listing queries. A native command block should identify itself as terminal code and expose the horizontal-scroll hint if its text overflows.

No Windows/macOS execution claim is added to learner prose. The factual evidence record distinguishes source review from the actual Linux/X11 run. This draft does not claim physical-device verification, new capture capabilities or completion of built-site review.

## Linux session prerequisite follow-up

Added `linux.sessionTitle`, `sessionIntro` and `sessionResult` from the builder's verified systemd `pam_systemd.xml` brief. Before asking for FFmpeg device or encoder checks, Linux instructions now identify X11 and Wayland as desktop display systems and ask the learner to run the metadata-owned shell query from the intended desktop terminal. `x11` permits continuing to the X11-specific checks; `wayland` directs to browser or desktop-recorder capture and import. Blank or other values remain inconclusive and never imply X11. No missing environment value is treated as proof that capture is supported.
