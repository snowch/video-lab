// Copyright © 2026 Christopher Snow
import {
  clipsFor,
  cutResult,
  cutStarts,
  fixture,
  keyframes,
  referenceAnswers,
  sourceTime,
} from "./model";
import { m2 } from "./strings";

const requestedStart = cutStarts[1];
const copy = cutResult(requestedStart, "copy");
const a = clipsFor("AB", Number(referenceAnswers.end))[0]!;
const b = clipsFor("AB", Number(referenceAnswers.end))[1]!;

export const prose = {
  question:
    "How can you remove waiting from a software demo while keeping the opening context and the result? A cut must choose both the pictures to keep and where they belong in the finished recording.",
  motivation: `The sample recording, \`${fixture.source.file}\`, shows a build queue before and after Sort. It is a separately encoded version of the provided original build-queue recording, made for comparing cuts. Watch where the action happens, then decide which opening context and result you need. The sound is a quiet synthetic tone, not narration; listening is optional.

FFmpeg is a command-line tool for processing media. A command reads an input file and writes an output file: \`-i\` introduces an input filename; the final filename names the destination. This lesson selects recorded outputs made with FFmpeg. You do not need to install it or run commands.`,
  prediction: `A keyframe is a picture from which decoding can start independently. Other pictures can depend on earlier pictures. This sample was encoded with keyframes at ${keyframes.map((f) => f.time).join(", ")} seconds; the strip below marks them.

Stream copy transfers the stored, encoded data without reconstructing or re-encoding it. Predict the first source picture in the recorded stream-copy cut requested at ${requestedStart} seconds. Choose between the requested start and the preceding keyframe, then inspect the result.`,
  investigation: `Choose a requested start and compare Stream copy with Trim and encode. Each requested range includes its start and excludes its end. For example, [${requestedStart}, ${copy.end}) means keep from ${requestedStart} seconds up to, but not including, ${copy.end} seconds.

The player shows the selected recorded output. The first and last stills were extracted from that output and checked against source pictures. Source time identifies a picture in the original recording; output time identifies when it appears in the cut. Output timestamps are rewritten by the operation; they are not source timestamps. Compare both before judging whether the request was met.

Video stream duration and container duration answer different questions. The first measures how much picture playback the cut contains; the second covers the file, including audio timing. Read the first video presentation timestamp separately: audio and video can begin at slightly different output times.`,
  construction: `Clip A keeps source [${a.start}, ${a.end}); clip B begins at source ${b.start} seconds. Change their order and B's end to test whether the result remains understandable. Longer B gives viewers more time to read the sorted result.

The output timeline places clips consecutively. Each clip's output duration is its source end minus its source start. The next clip starts where the previous one ends. At the join, the second clip supplies the picture. Play the recorded result and compare the stills immediately before and after that join.`,
  failureExperiment: `Source time is useful for finding material, but it does not say where that material belongs in an edit. Test leaving A at source ${a.start}–${a.end} seconds and B at source ${b.start}–${b.end} seconds on the output axis. Then reset each clip's clock and place B after A.

The drawing compares those two arrangements mathematically. It shows why retaining source positions leaves a gap in this arrangement. It does not play a faulty export or predict how every incorrect FFmpeg command would behave.`,
  explanation: `The recorded copy requested at ${requestedStart} seconds begins with the source picture at ${sourceTime(copy, 0)} seconds. Input seeking moves the reading position in the source towards a requested time. In the displayed copy command, \`-ss\` appears before \`-i\`. For this request, FFmpeg seeks to the preceding keyframe and preserves the earlier encoded material when copying. Copy avoids another generation of encoding loss, but this result does not meet the requested first-picture boundary.

Trim and encode reconstructs the media, selects the requested range and encodes it again. The video filter \`trim\` selects pictures; \`atrim\` selects sound separately. These filters do not reset timestamps. \`setpts\` and \`asetpts\` subtract each clip's initial presentation timestamp so its clock starts at zero.

The \`concat\` filter places those clips one after another and joins their related video and audio streams together. These clips already have matching picture dimensions, frame rate and audio channel layout. The pipeline resets their clocks before joining. This is a hard cut: one clip follows another with no overlap. A transition that blends clips needs a different overlap and duration calculation.`,
  generalisation:
    "Inspect the output when you change the source or command. Other recordings have different keyframes, and stream-copy seeking can behave differently across commands, containers and players. The earlier pictures here are a measured result of this command, not a rule that all copies start early.\n\nThe accurate cuts here fall on existing picture boundaries. A request between pictures cannot create a source picture at that instant. Recordings with unequal picture intervals need their recorded timestamps; audio samples and packets, chunks of encoded sound data, also have their own boundaries. Before joining other sources, check their stream parameters rather than assuming they match. The concat filter used here is a different mechanism from FFmpeg's similarly named concat file reader.",
  challenge:
    "Use the cut comparison to choose an accurate method, then plan a join that keeps the opening context and shows the result. Each field is checked separately; revise any answer after reading its feedback.",
  reflection:
    "Compare the short and long result holds. How much time does your viewer need to read the result and connect it to the action? Note one change you would make for a demo with narration, where removing waiting also changes the sound. Your note is optional and ungraded.",
  challengeTask: `For the cut comparison, keep exactly source [${requestedStart}, ${requestedStart + 2}) without any earlier pictures. Choose the method that achieves this in the recorded outputs.

For the joined demo, show the opening context A, source [${a.start}, ${a.end}), before the sorted result. B starts at source ${b.start} seconds; keep ${b.end - b.start} seconds of it. Decide whether each clip's clock must be reset before the concat filter joins them. Choose the clip order and B's source end, then calculate the finished picture duration and the output time where B begins. Use a hard cut with no gap or overlap.`,
  hints: [
    `Set the cut experiment to ${requestedStart} seconds. Compare each method's first source picture with that requested start. Choose the method that meets the requested picture boundary.`,
    "The brief keeps opening context before the sorted result. Read the clip letters and source bounds in the join experiment.",
    "Resetting a clip's clock puts its first picture at zero before concatenation. The clock experiment shows why source positions cannot also be consecutive output positions here.",
    `Clip duration is end minus start. A lasts ${a.end - a.start} seconds; B lasts ${b.end - b.start} seconds. Add them for the output duration; B begins when A ends.`,
    `Reference: method ${m2.options[referenceAnswers.method as keyof typeof m2.options]}; order ${m2.options[referenceAnswers.order as keyof typeof m2.options]}; reset ${m2.options[referenceAnswers.reset as keyof typeof m2.options]}; B end ${referenceAnswers.end} seconds; duration ${referenceAnswers.duration} seconds; join ${referenceAnswers.join} seconds.`,
  ] as const,
  modelNote:
    "These players show recorded FFmpeg outputs. Changing a selector loads an existing file; the browser does not perform a new cut or join. Commands and native inspection evidence accompany each result. Decoded output stills establish the boundary pictures; seeking in a browser preview can be approximate.",
  clockNote:
    "This is an explanatory clock model. Segment lengths come from the stated source ranges. Source positions and reset-and-append positions are calculated on the drawing; neither mode is a rendered faulty export. The gap shown here is not a universal prediction of malformed concat commands.",
  modelVsReality:
    "The cut and join players, extracted stills and media measurements come from generated files checked with native FFmpeg tools. The clip-placement diagrams calculate source-to-output timing for the selected ranges. They assume consecutive hard cuts without overlap. Stream-copy start offsets and audio timing are reported from each actual output, separately from that calculation.",
};
