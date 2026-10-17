# Follow-up review — identify the sample before prediction

Copyright © 2026 Christopher Snow.

## Independent focused finding

Reviewed 17 October 2026 by the earlier independent sceptic, without editing course prose. This is a narrow follow-up to the user's report, “This file contains a ... what file?” It does not reopen the full lesson review.

**FR1 — Upheld narrowly, low severity: the provided sample is not concretely introduced before the prediction.**

On the current built page, Motivation starts “This 10-second recording shows a build queue.” Prediction then says “This file contains a video stream and a synthetic audio stream” and asks about muting “the player”. The interactive question also refers to “this preview”. The sample's filename and the player have not appeared at that reading position; the player first appears in the following Investigation section. The source in `src/content/module0.prose.ts` matches that ordering. A fresh Playwright inspection at 390 × 844 confirmed no filename or player in the preceding Question/Motivation sections, and no upload control anywhere on the lesson.

The preceding description does give “this file” a plausible grammatical antecedent: the build-queue recording. Reject the stronger claim that there is no context at all, that the stream facts are incorrect, or that answering the prediction requires a hidden media fact. The prediction explicitly supplies the stream facts. The surviving problem is orientation: the page has not clearly established that the course provides a particular sample, or told the reader where that sample can be played. This matches the user's confusion and warrants a local copy fix.

**Direction:** Introduce the recording as the provided sample in Motivation, using the existing `fixture.file` value to identify it. Point forward to its player using the actual rendered Investigation heading, “Inspect pictures and timestamps”, or an equally unambiguous section reference. Name the same sample in Prediction so that “file”, “recording” and the forthcoming player have one explicit referent. Retain the tone disclosure and the visible facts that make the prediction answerable. No upload flow, media change or new control is needed.

The proposed fix addresses the finding if those references appear before the prediction is attempted. Verification should read the rebuilt page in order and confirm that a learner can identify the supplied sample and locate its player, without assuming they have supplied a file. This reviewer has not verified an applied fix.

Evidence: current local production build at `http://127.0.0.1:4173/video-lab/#/module-0`, Chromium via Playwright; rendered Question, Motivation, Prediction and Investigation text; corresponding prose source. Temporary screenshot: `/workspace/scratch/sceptic-file-reference.png`. No full quality-suite rerun was required for this read-only finding review.
