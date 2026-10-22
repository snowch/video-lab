// Copyright © 2026 Christopher Snow
import { p } from "./strings";

export const prose = {
  question:
    "You have recorded, cut, improved, compressed, captioned and verified. Can you hand the whole workflow to someone else as a recipe — and prove it produces a shareable file?",
  motivation: `A finished demo is two things: a **recipe** (the exact commands, in order) and a **verified file** (the measured proof that the recipe's output is shareable). Everything you have done in this course is one or the other.

The reference recipe below turns the labelled recording into a finished demo in three steps. Each step is one you have already run in an earlier module; each step's recorded output is a real file you can play, with its measured facts beside it.`,
  prediction: `Before you read the recipe's commands, predict what its finished file will measure. The source recording is 960 × 540, 10 seconds, 128737 bytes.

The recipe crops the centre half of the picture and scales it back to full size, burns the three captions into the picture, then re-encodes at 640 × 360 with the default quality. Predict: will the finished file be larger or smaller than the source, and why? Will the captions still be readable at 640 × 360?`,
  investigation: `Read the recipe step by step. Each step names its module, its exact command, and the measured facts of its recorded output.

Step 1 crops the centre half (480 × 270 starting at 240, 135) and scales it back to 960 × 540: the queue text fills the frame. Step 2 burns the caption source into that full-size picture: the captions are drawn at the same scale as the text. Step 3 re-encodes at 640 × 360, CRF 23: the finished file is 105834 bytes — smaller than the source, with video and audio streams, 10 seconds long.

The three recorded outputs play below: the crop, the captioned crop, and the finished file. Watch the queue text and the captions in the finished file.`,
  construction: `Run the recipe yourself below. Press **${p.run}**, and the browser's real FFmpeg.wasm executes the three steps in order on the labelled original recording — crop and zoom, caption burn, re-encode — then probes the produced file with a real ffprobe step and reports the measured facts.

The exact commands run in a worker, the produced MP4 plays in the page, and you can download it. Then complete the viewer-centred review: six checks, each answered from a measurement or a real playback of the file you just produced.`,
  failureExperiment: `The recipe's order is not arbitrary. Skip or reorder a step and the demo degrades in a specific way:

- **Re-encode first, crop after**: the crop happens on a 640 × 360 picture, so the region you keep is a quarter of the original pixels — the text is small again, exactly the Module 4 failure.
- **Burn captions after the re-encode**: the captions are drawn at 640 × 360 scale, so they shrink with the picture — exactly the Module 7 failure.
- **Burn captions before the crop**: the crop keeps the centre of the picture and discards the bottom edge — where the captions sit. The captions are cropped away entirely.

Each failure is the one you met in its own module. The recipe's order — crop, burn, re-encode — is the order that keeps every earlier win.`,
  explanation: `Two habits make a workflow a recipe instead of a memory:

1. **Reproducibility** means the same inputs and the same commands produce the same result. Every step here is one command with named inputs and a named output; run them in order and you get the same file. That is why the recipe can be written down, handed over, and run again — the build lesson's point, applied to the whole workflow.
2. **A viewer-centred review** means answering checks from the viewer's side, with measurements: does it play, does it have both streams, is the text readable at publish size, do the captions appear at the right moments, is the size reasonable, could a viewer follow it without narration. "I made it, so it is fine" is not a check; a probe fact is.

The recipe and the review are the deliverable. The file is just the recipe's output — and the review is what proves it.`,
  generalisation: `Your workflow, written down:

- **Capture** (Module 0): one visible action, five to fifteen seconds, pause on the result.
- **Understand** (Modules 1–2): know what the file contains before you edit it.
- **Edit** (Modules 3–5): cut to the action, keep the text readable, keep the sound clear.
- **Finish** (Modules 6–8): choose size and quality, add captions, export and verify with measurements.
- **Check assistance** (Module 9): treat assisted claims as claims; check them at their timestamps.
- **Publish** (this module): the recipe plus the verified file, reviewed from the viewer's side.

Write your own recipe the same way: one command per step, named inputs and outputs, in the order that keeps every win.`,
  challenge: `Assemble the recipe in the right order, say which check proves the produced file is shareable, run the recipe, and complete the viewer-centred review of your produced file.`,
  reflection: `What is your finished workflow, written down? Note your own recipe for the next demo; it is not graded.`,
  modelVsReality: p.modelVsReality,
  modelNote: p.modelNote,
  challengeTask: `Assemble the recipe steps in order, name the check that proves the file is shareable, run the recipe, and review the produced file.`,
  hints: [...p.hints] as readonly string[],
  originality: p.originality,
};
