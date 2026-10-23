# Ranked prototype fixes

Copyright © 2026 Christopher Snow.

R1 medium, upheld: add collapsed Replay source directly beside the source filename in Inspect and Trim. It plays the actual selected source, labelled original/imported, never the proposed output. Preserve its open state and current time across command-card rendering so previewing a command does not force another source-selection journey. Reset playback when changing source.

R2 medium, upheld and fixed: retain a meaningful focused element across rendering; focus the preview result after Preview run. Keyboard navigation proceeds from the result instead of the page header. The sceptic independently confirmed this fix on the then-current build; the checker will recheck the final build.

R3 low, upheld: the separate drafter supplied Video, Sound, File duration and pixels labels. Render the compact badges from the recorded native report, with those roles. Report values remain measured only for the supplied original, and the report notice states that the prototype did not execute it.

The initial mobile downward scroll was not retained as a separate problem: timing fields → command → Preview run occupy about 388 pixels together and fit in a phone viewport once scrolled. Sound/output-name settings are collapsed initially; the complete command remains visible. No sticky control covers the on-screen keyboard or obscures code.

Builder checks also corrected native filename handling for a leading hyphen by using a relative path and preserved typed-command warnings after a source change. Apostrophes/spaces/shell metacharacters are POSIX-quoted. A downloaded command executed natively on a safely quoted imported name produced the requested four-second output. Source import, replay, download, command copying/download and actual FFmpeg execution remain explicitly distinct from the simulated prototype action.

The independent checker found two final issues. R4 medium: replacing a playing source could let a detached video's delayed timeupdate set the new video's position. Media callbacks now require the same source identity and a connected player, and restoration captures its intended time. Ten replacements each in Chromium and Firefox reset to zero, with restart also passing. R5 low: a pasted trailing newline was trimmed when saving the preview but not when comparing the current draft; both comparisons now trim outside whitespace consistently. The checker will verify both corrections on the final HTML before release.
