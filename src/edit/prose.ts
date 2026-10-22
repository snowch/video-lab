// Copyright © 2026 Christopher Snow
import { ed } from "./strings";

export const prose = {
  question:
    "You recorded a demo, but at playback size the interface text may be too small to read. What would you change so a viewer can actually follow the action?",
  motivation: `Play the original recording below at its full size, then imagine watching it in a small window or on a phone. The build-queue text is legible here, but a wide application window squeezed into a small player is not.

A demo fails before its content matters if the viewer cannot read it. This lesson is about one decision: what region of the picture the viewer needs, and how large that region appears at playback.`,
  prediction: `A **crop** selects a rectangular region of every picture. A **scale** changes the size of the picture. Cropping the centre of the recording and scaling that region back up to full size makes the kept region larger at the same display size — but only if the kept region contains the action.

Before you look at the result, predict: at the same display size, will the queue text be easier to read in the full frame or in the centre crop scaled to full size?`,
  investigation: `Two real outputs of the same source play below at the same display size: the full frame, and a version that cropped the centre half of the picture and scaled it back to 960 × 540. Both are real recordings made with desktop FFmpeg from the original; their commands are shown beside them.

Watch the queue text in each. The crop keeps only the centre region, so that region fills the player and its text is larger. What does the crop lose? The edges of the window — which a viewer does not need for this action.`,
  construction: `Run the same kind of crop yourself below. Choose the crop region and the output size, press **${ed.run}**, and the browser's real FFmpeg.wasm crops and scales the labelled original recording. The exact command runs in a worker, the produced MP4 plays in the page, and you can download it.

The default values reproduce the recorded comparison: crop the centre half (480 × 270 starting at 240, 135) and scale it back to 960 × 540.`,
  failureExperiment: `Scaling the whole picture down has the opposite effect: the same content, smaller. The recording scaled to 640 × 360 plays below. At that size the queue text is noticeably harder to read than in the full frame — and this is why a crop-then-zoom beats a plain scale-down for screen demos.

The failure is not hypothetical: many sharing tools scale a large recording down to fit a player, and the text is the first thing to suffer. (We give the shrinking budget its proper name in the compression lesson.)`,
  explanation:
    `The crop command runs as ` +
    "`-vf crop=W:H:X:Y,scale=W:H`" +
    `: crop keeps the rectangle of width W and height H whose top-left corner is at (X, Y) in every picture; scale then resizes that region to the output size. The two filters run in order on every picture.

Scaling up does not invent detail: it enlarges the pixels the crop kept. The text becomes readable because the kept region is shown larger, not because new information appeared. Cropping away unneeded picture is what buys the size.`,
  generalisation: `Two more recorded outputs show the other half of readability: a **callout** (a short drawn label pointing at the part of the action that matters) and **pacing** (how long the viewer gets to read). One callout stays on screen for the whole recording; the other appears only between 3 and 5 seconds, exactly while the Sort action runs. The pacing pair shows a held picture and a one-second crossfade between two moments.

Readability rules for screen demos:

- Record the smallest surface that shows the action, then crop further in editing if the window is wider than the action.
- Increase the application's zoom before recording when the text is small; a crop cannot recover text that was never legible.
- Show one action at a time; a callout (a short label pointing at the action) helps, but it cannot replace readable text.
- Give the viewer time to read the result before moving on; a crossfade hides a change, a hold shows it.
- Check the result at the size viewers will actually use, not only at full screen.`,
  challenge: `Decide which version a viewer can read at playback size — the full frame or the centre crop scaled to full size — and say why. Then run the crop yourself and check that the produced file matches your answer.`,
  reflection: `What is your readability rule for the next demo you record? Write an optional note; it is not graded.`,
  modelVsReality: ed.modelVsReality,
  modelNote: ed.modelNote,
  challengeTask: `Choose the version a viewer can read at playback size, say why, then run the crop and zoom and confirm the produced file.`,
  hints: [...ed.hints] as readonly string[],
  originality: ed.originality,
};
