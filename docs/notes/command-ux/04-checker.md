# Independent final prototype check

Copyright © 2026 Christopher Snow.

The separate `prototype_checker` agent checked the built page on 23 October 2026 and did not change implementation or copy. Final HTML SHA-256: `cc98a19bd476d0322dee7b90e5501c3f157c14ec347c086e1eb8c77aafe0f5eb` (225956 bytes). The served response, `dist/optional/command-workbench.html` and `public/optional/command-workbench.html` matched. No remaining blocker was found for sharing this isolated UX prototype.

## Ranked fixes verified

- **R1:** Replay source is available within Inspect and Trim, collapsed initially. It plays the actual selected original/import and retains its open state and chosen time across task navigation, command preview and mode changes. A learner can seek the source while choosing trim times without returning to source selection. Both imported and provided provenance remain explicit.
- **R2:** Keyboard activation of Preview run moves focus to `#result`; the next Tab reaches Show example report in Inspect. The former return to the page header did not recur. Mode changes and the explicit builder-replacement choice remain keyboard usable.
- **R3:** The recorded summary labels `Video: H264 · 960 × 540 pixels`, `Sound: AAC` and `File duration: 10 s`. The report is explicitly recorded evidence, not a new measurement, and imports do not receive these measurements.

## Additional findings and independent recheck

The checker reproduced a medium playback-state bug: replacing a source while its video was playing at seven seconds caused the newly imported file to start at seven seconds. A detached player's queued callback could restore the previous time after the source reset. The builder added source-identity and connected-element guards and captured the intended restore time. On the final build, twenty repeated replacements (ten each in Chromium and Firefox) started the new source at zero. Restart during inline playback also reset the next source to zero in both browsers.

The checker also reproduced a low command-preview issue: a typed command ending with a newline immediately appeared changed after Preview run, because stored trimmed text was compared with untrimmed editor text. The builder normalised both sides. The final build gives the correct unexecuted-custom-command disclosure for the same pasted command.

## Executed checks

Completed the source → Inspect → Trim flow in Chromium at 390 × 844 light and dark, 768 × 1024 light, and 1365 × 900 dark, plus Firefox at 390 × 844 dark. Each case exercised real playback, source download, mode changes, custom-command keep/replace/restore, manual draft retention through navigation and source replacement, actual import, source replay/seek, report display/wrapping, duration and sound changes, command download, theme switching and Restart. Buttons and disclosure summaries were at least 44 pixels high; no document-wide horizontal overflow or JavaScript page error occurred. Phone and desktop screenshots were visually inspected and saved in `evidence/`.

The provided source download was byte-equal to the committed original. A local import named `-learner's recording.mp4` produced a quoted relative source path; its imported-file state received no invented metadata. Duration four, removed sound and a new output filename appeared in the full native command. The downloaded `.sh` contained the exact manually edited command. Clipboard contents matched the visible command when permission was available; a rejected clipboard write gave manual-copy guidance rather than claiming success.

Typing `sample` produced guidance to use FFmpeg/ffprobe and app file controls. Unsupported custom commands were preserved without claimed execution or output. Preview results consistently disclosed simulation, and edited-video export/recording were disabled with explanations. Actual browser actions and absent FFmpeg execution remained distinguishable.

Opened the standalone `file://` HTML with Chromium's context offline, played its embedded practice video beyond the first frame and previewed the recorded report. No server or external asset was required for that flow.

## Evidence and limits

Independent scripts: `/workspace/scratch/command-ux/checker.mjs`, `checker-race.mjs` and `checker-copy.mjs`; final logs and results: `/workspace/scratch/command-ux/checker/`. Final matrix and all focused rechecks passed. Early harness corrections used the Sound select's stable selector because its wrapping label includes option text, and awaited the intentional animation-frame focus update; neither was an application defect.

This checks an interactive prototype, not a deployed replacement course or FFmpeg execution inside this HTML. Physical touchscreens, software keyboards and screen readers were not exercised. Repository-wide quality checks and public deployment are reported separately by the builder.
