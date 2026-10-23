# Independent reader: all available labs use commands

Copyright © 2026 Christopher Snow.

Reviewed 23 October 2026 at `http://127.0.0.1:4173/video-lab/`. This is the fresh reader pass, not the separate sceptic or checker. I read the homepage prerequisites and the displayed reference instructions before attempting their commands; I did not consult implementation, tests, grading source or builder rationale. The assumed learner knows terminals, browsers and files, but has no prior media knowledge. My earlier production-path review is separate: this pass concentrates on the newly converted inspection and editing references.

The reviewed page loaded `assets/index-DvqCBhVH.js` and displayed build `7a00f6e`. Concurrent rebuilding means subsequent verification must identify the page it actually loaded.

## Ranked findings

### R1 — Low: the workspace limit calls reports and notes “media files”

While extending the join experiment and saving a reflection, the workspace said: “The workspace holds at most 12 media files plus 12 recipes. Download important work, then use rm to remove an unneeded file.” At that point the non-recipe files included `inspect-report.json` and `inspection-notes.txt`: ten actual media files plus those two occupied the twelve slots. Thus a learner counting only media would expect room for another output or note. The distinction matters naturally when following both references in their shared workspace.

The recovery advice was useful. Removing an unneeded generated sound file allowed the longer edit to complete; removing another expendable output allowed the editing note to be saved. Neither challenge was blocked permanently, and source files remained available. Suggested direction: describe the limit as working files and explicitly include reports and notes. The parent reports that this wording has since been changed; this first-use observation is retained for the separate checker, not claimed as a verified outstanding defect.

### R2 — Rejected by sceptic: the attempted failure anchor was not a valid legacy chapter link

Opening `#/module-2/failure` redirected to `#/edit/reference/failure` without locating the failure heading. This initially suggested a chapter-link issue. The separate sceptic established that the actual legacy anchor is `failureExperiment`, not `failure`, and independently verified both the legacy and canonical `failureExperiment` links at phone width. The inspection `#/module-0/investigation` link also worked in my run. My invented shortened anchor is not evidence of a broken historical bookmark. Reject this candidate; no fix is requested.

## First-use learning and execution evidence

No unsupported required media fact or pedagogical blocker emerged. The inspection opening clearly distinguishes its “known original recording” from the learner's project recording. Container, stream and codec precede the first report; stream selection precedes the video-only copy; picture numbering and presentation time precede extraction; samples, channels and audio blocks precede the sound measurements. The text explicitly prevents mistaking a combined audio/video report entry number for a video frame index. The challenge asks for an executed report, not a guessed form answer.

I typed and ran the displayed commands through the actual browser workspace:

- `reference inspect`, the original stream/format probe, video-only stream copy, and a confirming probe. The generated copy had one video stream and no audio stream.
- The full `-show_streams -show_format -show_frames` report saved with `-o inspect-report.json`, then `cat`; frame 75 extraction produced a real PNG; audio extraction produced a WAV. Audio-block and video-timestamp probes returned actual data. Frame 75 had PTS 76800 / 6.25 seconds, consistent with the teaching.
- Invalid stream `0:a:9` and unknown encoder `no_such_codec` produced native errors and status 1 rather than invented outputs. Subsequent valid commands worked.
- `check inspect inspect-report.json` passed all six checks, including source identity and the measured frame timing. All five hints, `solution inspect`, `note`, `cat` and `progress` worked.

The editing brief gives a clear before/after target: opening context followed by the result, keeping `[0,2)` then `[4,6)` with both picture and sound. It does not require the learner to infer that the omitted action must remain. Keyframes, stream-copy seeking, trimming, separate audio/video clock resets, graph labels and the paired concat order are explained before the corresponding command. These are long commands, especially on a phone, but the required mechanisms and output names are supplied. Making a prediction before running is explicitly different from having to know the result already.

Actual editing results were:

| Attempt | Observed output |
| --- | --- |
| Source probe | 10-second original, 120 video pictures |
| Stream-copy seek at 3 seconds | 3.030-second container; video 3 seconds / 36 pictures; audio 3.029333 seconds |
| Accurate `[3,5)` cut | 2 seconds, both streams, 24 video pictures |
| Reset-clock reference join | 4 seconds, both streams, 48 decoded pictures |
| Same join without either clock reset | 8 seconds, both streams, 96 decoded pictures |
| Reversed segment order | 4 seconds; six structural checks passed, decoded picture-order check failed |
| Extend the second segment through 8 seconds | 6 seconds, both streams, 72 video pictures |

`check edit joined-check.mp4` passed all seven checks. The reversed result failed for actual decoded picture sequence (`RGB RMS max=5.472`, limit below 2), despite having the correct duration and stream structure. This is meaningful artifact feedback rather than checking command spelling. The displayed no-reset observation is carefully limited to the named source and command; it asks the learner to measure their own result rather than promising eight seconds universally. All five editing hints, the full solution, an independently worded reflection note and `cat` worked.

`progress` displayed the newly passed report/edit separately from “Earlier answer-based reference achievements”. After the reversed output failed, the earlier successfully checked join remained the recorded success. This fresh context contained no historical achievements: I verified the separation in the interface, not migration of a seeded old installation.

## Interface and limits of this review

The workspace distinguishes browser convenience commands from FFmpeg/ffprobe and from an operating-system shell. Native error output is retained. The pinned FFmpeg build's successful cleanup `Aborted()` line has a nearby explanation that distinguishes status 0 from a real nonzero failure; I did not treat that already-explained line alone as a new blocker.

I inspected desktop and 390-pixel phone layouts in light and dark. Text and command examples remained readable, long commands wrapped, focus was visible, and the phone document width remained 390 pixels. The new reference tasks use the command input, not sliders, selectors or answer forms. Enter submitted the actual commands. The phone command graphs require substantial vertical reading, but retain the same explanatory substance. Screenshots retained here show the dark desktop clock explanation and the light phone version.

This is a browser-based learner execution and reading review, not the full automated suite, cross-browser certification, native FFmpeg re-verification, or a new audit of planned modules. I do not claim to have verified the parent's later quota fix. The old production-lab and reference-media audits are not silently substituted for this pass.
