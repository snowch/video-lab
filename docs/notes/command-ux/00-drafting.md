# Separate prototype prose draft

Copyright © 2026 Christopher Snow.

The separate `prototype_drafter` agent drafted `copy.json` from the builder's verified fact brief on 23 October 2026. This is prose for a proposed interaction, not approval of its eventual implementation.

The supplied original is `public/media/build-queue.mp4`. The builder ran native ffprobe and reported H.264 video, AAC audio, 960 × 540 pictures, ten seconds of container duration and 128,737 bytes. The video shows the original build queue's Sort action, with a quiet synthetic tone. The builder also executed the proposed two-second start/six-second duration command with native FFmpeg and verified a six-second H.264/AAC output. That evidence supports the worked example; it does not establish measurements for an imported file or an edited command.

The draft separates browser file controls from FFmpeg/ffprobe syntax. It never teaches `sample`, `capture`, `play`, `download` or similar app-specific words as commands. The proposed builder labels controls with the real options, leaves the complete command visible, permits direct editing and explicitly describes replacement when the builder cannot preserve an edit.

The always-visible prototype notice and result notes identify simulated execution. Source import and replay may be real browser operations; inspection reports are recorded evidence for the supplied original only. Edited-video export remains visibly unavailable. A downloaded shell file contains command text only. All measurements for imported sources remain unavailable until real execution is implemented.

The builder may select the subset of strings required by the actual controls. Labels must match implemented behaviour: do not say a command was copied if the clipboard operation failed, claim edits are preserved if switching modes replaces them, or expose a result as though Preview run measured it. A real source import invalidates any previously shown source-specific report. Manual edits invalidate any inference about proposed output settings unless parsed and supported.

Both sentence and explanation passes were applied. Independent built-page learner, sceptic and checker reviews remain for the builder to arrange.

## Renderer wording pass

The drafter read `prototype.html` and `build.mjs` after the builder's first implementation. Added messages for empty/oversized/non-video imports, a supplied-source trim range beyond ten seconds, and an inspection request with neither report section selected. The direct-edit warning now describes the actual behaviour: the builder does not parse manual changes, even when their options could be represented by its controls. It therefore offers replacement with its current values rather than falsely identifying the edit as unsupported syntax.

The recorded probe is embedded from native ffprobe output and remains labelled as a recorded example; imported files receive no measured report. Proposed trim results state that no command ran and no edited video exists. The output name is kept distinct from the source in builder validation. The full command and shell-file download use the actual selected filename, including POSIX quoting of apostrophes. These observations concern the source implementation; they are not substitutes for the independent built-page interaction tests.

Two implementation wording recommendations were returned: use `source.watchImported` in the source-selection caption instead of the later trim task, and display `actions.sourceChanged` when a new source leaves a manually edited command naming the previous file. A preserved manual command must remain the learner's choice, but the stale input filename should be visible before attempting to use it.

The subsequent reader pass identified unexplained result badges. Added the labels Video, Sound, File duration and pixels so the recorded values identify what they describe. These labels do not assert additional measurements. The builder's disclosure label “Sound and output filename” matches its two controls and passed the prose check. Reusing “Replay source” for a disclosure beside Inspect and Trim also accurately names the proposed real source player; the player must remain distinct from a proposed edited output.
