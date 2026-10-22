// Copyright © 2026 Christopher Snow
import { ca } from "./strings";

export const prose = {
  question:
    "A viewer watching your demo on a phone, in a noisy room, or with the sound off, gets nothing from a silent screen. What should the picture itself say, and how do you put it there?",
  motivation: `The original recording plays below, then the same recording with three captions burned into the picture. Watch the bottom of the frame.

The captions are not decoration: each one names the action happening at that moment — show the queue, press Sort, and the result. A viewer who cannot hear the narration, or reads faster than it speaks, still follows the demo.`,
  prediction: `The caption source is shown in the next section. Before you read it, predict: where on the frame will the caption text sit, how large will it be relative to the picture, and will the third cue (the last 4 seconds) fit on one line?

The source recording is 960 × 540. The longest cue is "Payments is the longest build." — 28 characters.`,
  investigation: `The caption source is a real SRT file — the plain-text format every caption editor writes. It has three cues; each cue has an index, a start time and an end time in hours:minutes:seconds,milliseconds, and the text to show.

Cue 1 runs from 0 to 3 seconds ("Show the build queue before sorting."), cue 2 from 3 to 6 ("Press Sort once."), cue 3 from 6 to 10 ("Payments is the longest build."). Together they cover the whole 10-second recording with no gap: the viewer always has words for the current moment.

Two real encodes of the same source with the same captions play beside the source: one at the original 960 × 540, one scaled to 640 × 360. Both are real files; their commands are shown beside them.`,
  construction: `Burn the same captions into the recording yourself below. Press **${ca.burn}**, and the browser's real FFmpeg.wasm writes the caption source and a font into a worker, renders the captions onto the labelled original recording with the subtitles filter, and plays the produced MP4 in the page.

The exact command runs in a worker, the produced file plays below the command, and you can download it. Two more recorded outputs show overlays in the same family: a callout label that stays on screen for the whole recording, and one that appears only between 3 and 5 seconds — exactly while the Sort action runs.`,
  failureExperiment: `The captioned recording scaled to 640 × 360 plays below: same captions, smaller picture.

At 640 × 360 the caption text is small and hard to read — the caption was drawn at a fixed pixel size for the 960 × 540 frame, and scaling the picture down shrinks the caption with it. This is the same failure as shrinking any text (Module 4): the pixels that carry the words get smaller, and readability goes with them. A crop-and-zoom on the region that matters keeps the caption large; a plain scale-down does not.`,
  explanation:
    `There are two ways to put captions in a video, and they are different things:

1. A **caption track** is a separate, timed text stream inside the file. A player reads it and draws the text over the picture at playback time: the viewer can switch captions on or off, and some players restyle them. But a player that does not support caption tracks — many social previews, some embedded players — shows nothing at all.
2. **Burned-in** captions are drawn into the picture itself, pixel by pixel, before the file is finished. Every player shows them, because they are just picture. But they can never be switched off, resized or restyled, and they cost picture quality (the encoder must spend bits on the text).

The command runs as ` +
    "`-vf subtitles=captions.srt`" +
    `: the subtitles filter reads the SRT source and renders each cue's text onto the frames during its time window, using a font file the filter is given. The result is an ordinary video file whose captions are part of the picture.`,
  generalisation: `Habits for captioned demos:

- Write captions that name the action ("Press Sort once"), not the narration verbatim.
- Keep cues short: one line, a few seconds, covering the moment they describe.
- Cover the whole recording: no gaps where the viewer has no words.
- Choose the size for the smallest screen you expect: captions readable at 960 × 540 may fail at 640 × 360.
- Prefer a caption track when the platform supports it (YouTube, Vimeo); burn in when every viewer must see them (social previews, GIFs, silent autoplay).
- Keep overlays minimal: one callout, shown only while it matters — a label that stays forever stops being read.`,
  challenge: `Decide which captioned version a viewer can actually read — the 960 × 540 or the 640 × 360 one — and say why a caption track inside the file is not the same thing as burned-in captions. Then burn the captions into the recording yourself and play the result.`,
  reflection: `What is your caption rule for the next demo you share? Write an optional note; it is not graded.`,
  modelVsReality: ca.modelVsReality,
  modelNote: ca.modelNote,
  challengeTask: `Choose the captioned version a viewer can read, say what a caption track is that burned-in captions are not, then burn the captions yourself.`,
  hints: [...ca.hints] as readonly string[],
  originality: ca.originality,
};
