// Copyright © 2026 Christopher Snow
import type { CourseCopy } from "./copy-types";

export const courseCopy: CourseCopy = {
  title: "Video Lab: Editing with FFmpeg",
  intro:
    "Learn video editing by reading, changing and running real FFmpeg commands. Each short page introduces one idea, keeps its result beside the command and gives you a separate task to try. Start with the supplied short Big Buck Bunny clips; the two-minute excerpt is also available. No media knowledge is assumed. Earlier lessons remain available as an archive with their existing work.",
  chapters: {
    "first-edit": {
      title: "Your first edit",
      summary: "Choose a kept duration, then its starting point.",
    },
    "inside-video": {
      title: "Inside a video file",
      summary: "Separate the container from its picture and sound streams.",
    },
    "frames-time": {
      title: "Frames and time",
      summary: "Distinguish picture cadence, timestamps and clock units.",
    },
    "cut-join": {
      title: "Cuts and joins",
      summary:
        "Understand copying, picture dependencies and connected timelines.",
    },
    framing: {
      title: "Picture framing",
      summary: "Resize, crop or pad with a deliberate field of view.",
    },
    sound: {
      title: "Sound",
      summary: "Change sample amplitude and its shape through time.",
    },
    text: {
      title: "Titles and subtitles",
      summary: "Render lettering from a font or timed text file.",
    },
    quality: {
      title: "Compression choices",
      summary: "Compare quality targets and encoder effort using real outputs.",
    },
    export: {
      title: "Export and verification",
      summary: "Choose formats, organise metadata, inspect and decode.",
    },
    workflows: {
      title: "Repeatable work",
      summary:
        "Reuse browser commands and understand a separate native batch script.",
    },
  },
  pages: {
    "first-edit/shorten": {
      title: "Keep a shorter section",
      goal: "Make a five-second video from an eight-second source.",
      concept: [
        "A video file stores timed pictures and usually sound. Editing its duration means choosing which part of that timeline to keep. The supplied bunny-short.mp4 lasts eight seconds; it includes the original film sound. Load the practice files, then replay the source before making a cut.",
        "FFmpeg reads media and writes a new file. In the cell, -i introduces the input filename. The output option -t 5 limits the new file to five seconds. The last filename names the output; its .mp4 ending selects an MP4 container, the package holding picture and sound. The source stays available.",
        "This command lets FFmpeg choose encoders: programs that compress pictures and sound for storage. It decodes the input into pictures and sound samples, keeps the requested interval, then encodes the result. You will choose those encoders explicitly later. Read the complete command before running it. The cell runs FFmpeg directly in your browser; Files handles imports and downloads.",
      ],
      prediction:
        "Which part of the source will remain, and will its action run faster?",
      reveal:
        "The output keeps the opening five seconds at its original pace. Shorter duration does not mean faster playback.",
      workedLabels: ["Keep the opening five seconds"],
      options: [
        {
          flag: "-i bunny-short.mp4",
          meaning: "Read this input file.",
        },
        {
          flag: "-t 5",
          meaning: "Write up to five seconds of output.",
        },
        {
          flag: "first-cut.mp4",
          meaning: "Create this MP4 output file.",
        },
      ],
      change:
        "Change 5 to 4 and use a new output filename. Predict which ending you will lose.",
      practice:
        "Create practice-cut.mp4 containing the opening three seconds, with picture and sound.",
      review:
        "Replay the source and your result. Describe what disappears at the ending and whether playback pace changes.",
      hints: [
        "Identify the source and the separate output filename.",
        "The duration is controlled by an output option.",
        "Keep the input unchanged; change the number after -t.",
        "The target duration is three seconds, measured from the opening.",
        "Use -t 3 and name the result practice-cut.mp4; the reference command shows the complete line.",
      ],
      checkLimit:
        "Checks verify a three-second output with video and audio. They do not identify the chosen pictures or judge the cut.",
    },
    "first-edit/start": {
      title: "Choose where the cut begins",
      goal: "Keep four seconds starting two seconds into the source.",
      concept: [
        "A duration answers “how much?”. A start position answers “from where?”. Both use seconds here. The interval beginning at second 2 and lasting 4 seconds ends at second 6; it does not end at second 4. Think of a half-open interval on a timeline: keep the start, then stop when the requested duration has elapsed.",
        "The new option -ss 2 seeks to second 2. Its position matters: here it follows -i bunny-short.mp4, so it is an output-side seek. FFmpeg decodes the input and discards earlier material before encoding the kept section. The familiar -t 4 then limits the output to four seconds. later.mp4 names the new file.",
        "Input-side seeking, with -ss before -i, behaves differently when copying compressed video. We will examine that when introducing keyframes. For now, keep the option order shown so you can reason about the decoded interval. Replay both files and compare the first visible action, rather than inferring the start from duration alone.",
      ],
      prediction: "Will later.mp4 contain source seconds 2–4 or 2–6?",
      reveal:
        "It contains the four-second interval beginning at second 2: source seconds 2–6.",
      workedLabels: ["Start at second 2"],
      options: [
        {
          flag: "-ss 2",
          meaning: "After the input, discard material before second 2.",
        },
        {
          flag: "-t 4",
          meaning: "Keep four seconds after that start.",
        },
      ],
      change:
        "Keep -t 4 and change only -ss 2 to -ss 1, using another output name. Compare the opening.",
      practice:
        "Create practice-start.mp4 starting at second 1 and lasting three seconds, with picture and sound.",
      review:
        "Describe how you distinguished a changed start from a changed duration. Check both the opening and ending.",
      hints: [
        "Separate start position from duration.",
        "Keep -ss after the input for this exercise.",
        "The target begins one second into the source.",
        "Set the kept duration independently to three seconds.",
        "Use -ss 1 -t 3 after the input and keep the practice output name.",
      ],
      checkLimit:
        "Checks verify duration and stream presence. They cannot establish that you chose source second 1; compare the replay yourself.",
    },
    "inside-video/inspect": {
      title: "Read the file description",
      goal: "Identify the container, video stream and audio stream.",
      concept: [
        "A filename ending tells you how a file is named, not everything it contains. A container organises one or more streams: independently timed sequences such as video pictures or audio samples. A codec is the method used to encode one stream. MP4 is a container; H.264 is a video codec and AAC is an audio codec.",
        "ffprobe inspects media without producing an edited copy. Its simplest command is the tool name followed by the input filename, with no flags. Read the raw output for the input description and the Stream lines. Stream indices identify entries within the file; they are not chapter numbers or filenames.",
        "The supplied short clip has an H.264 video stream at 854 × 480 pixels and 24 frames per second, plus AAC sound sampled at 48,000 samples per second. A pixel is one picture location; a frame is one complete picture. Audio samples measure a waveform through time. These rates describe different streams, so 24 and 48,000 are not competing frame rates. Later pages request selected structured fields when a task needs them.",
      ],
      prediction:
        "How many streams will you find? Which line describes pictures?",
      reveal:
        "There are two streams: video and audio. The video line reports H.264 and its picture dimensions; the audio line reports AAC and its sample rate.",
      workedLabels: ["Inspect without editing"],
      options: [
        {
          flag: "ffprobe bunny-short.mp4",
          meaning:
            "Inspect this file; no output filename or encoding option is required.",
        },
      ],
      change:
        "Use Files to load the two-minute bunny.mp4, then change only the inspected filename. Compare duration and codec names.",
      practice:
        "Run ffprobe on bunny-short.mp4. Identify its two stream types, video dimensions and duration in your review.",
      review:
        "Write the container, video codec and audio codec separately. Explain why the .mp4 name alone cannot answer all three.",
      hints: [
        "This task inspects rather than creates a file.",
        "The simplest ffprobe command takes a filename.",
        "Find the input/container description before reading Stream lines.",
        "Read the video line for dimensions and the audio line for its codec.",
        "Run ffprobe bunny-short.mp4, then write the properties you actually see.",
      ],
      checkLimit:
        "The check records successful inspection. It cannot assess whether you interpreted the output correctly; your review supplies that evidence.",
    },
    "inside-video/streams": {
      title: "Choose picture or sound",
      goal: "Make a silent video and a separate sound file.",
      concept: [
        "Picture and sound share a container but remain separate streams. Removing sound need not remove pictures, and extracting sound need not preserve pictures. This distinction is useful when preparing a silent loop or processing a soundtrack separately.",
        "The first command adds -an, meaning disable audio in the output. Its MP4 still contains video. The second adds -vn, meaning disable video, and writes sound.wav. WAV is an audio container; FFmpeg chooses an audio encoder suitable for it. Neither switch changes the original source. With no -t, each command processes the full eight-second input.",
        "The files also illustrate why replay is part of inspection. A video with an audio stream can contain silence; a file with no audio stream cannot contain a soundtrack at all. A stream check answers the second question. Listening answers whether retained audio is useful. The independent task combines this selection with a duration you already know how to set.",
      ],
      prediction:
        "Which output will have no video stream, and which will have no audio stream?",
      reveal:
        "silent.mp4 has video without audio. sound.wav has audio without video. Both derive from the same input.",
      workedLabels: ["Remove the audio stream", "Keep only the sound"],
      options: [
        {
          flag: "-an",
          meaning: "Disable audio output.",
        },
        {
          flag: "-vn",
          meaning: "Disable video output.",
        },
        {
          flag: "sound.wav",
          meaning: "Write an audio-only WAV container.",
        },
      ],
      change:
        "In the first command, replace -an with -vn and choose a .wav output name. Compare the resulting stream list.",
      practice:
        "Create practice-silent.mp4 lasting four seconds with video and no audio stream.",
      review:
        "Use inspection as well as replay. Explain the difference between an absent audio stream and an audio stream whose samples are silent.",
      hints: [
        "Start from the supplied video input.",
        "The target keeps pictures but removes sound.",
        "Choose the switch that disables audio.",
        "Combine that switch with a four-second duration.",
        "Keep -t 4 and add -an before practice-silent.mp4.",
      ],
      checkLimit:
        "Checks verify four seconds, video present and audio absent. They do not judge which visual content you retained.",
    },
    "frames-time/rate": {
      title: "Count pictures through time",
      goal: "Change picture cadence without changing duration.",
      concept: [
        "A frame is one picture in a timed sequence. Frame rate measures pictures presented per second. This source presents 24 frames each second. Reducing that rate can make motion less smooth; it does not inherently shorten the story or speed up the sound.",
        "The new -vf option supplies a video filter: an operation on decoded pictures. The quoted expression fps=12 asks the fps filter to create a 12-frames-per-second timeline, dropping or duplicating pictures as necessary. Quotes keep the expression together as one command argument. -t 4 still keeps four seconds, so the nominal picture count is 4 × 12 = 48.",
        "Filters require decoded pictures and therefore cannot be combined with video stream copying. FFmpeg encodes the filtered pictures into the output. The audio follows the same four-second interval without receiving this video filter. Frame rate is a sampling choice: once you discard an intermediate picture, merely raising the rate again cannot recover its original detail.",
      ],
      prediction:
        "Will four seconds at 12 frames per second play for two seconds or four?",
      reveal:
        "It still plays for four seconds. The output has fewer distinct presentation opportunities each second.",
      workedLabels: ["Resample to 12 frames per second"],
      options: [
        {
          flag: '-vf "fps=12"',
          meaning: "Apply a video filter that produces 12 frames per second.",
        },
        {
          flag: "-t 4",
          meaning: "Keep four seconds, independently of picture cadence.",
        },
      ],
      change:
        "Change fps=12 to fps=24 and use a new filename. Compare motion over the same interval.",
      practice:
        "Create practice-rate.mp4 lasting four seconds at 6 frames per second, retaining sound.",
      review:
        "Compare the same movement at 24, 12 and 6 frames per second. Describe cadence separately from duration.",
      hints: [
        "Keep the four-second interval unchanged.",
        "The video filter controls cadence.",
        "The target is six pictures per second.",
        "Change the number inside fps=12; keep sound enabled.",
        "Use fps=6 with -t 4 and the practice output filename.",
      ],
      checkLimit:
        "Checks verify duration, frame rate and both streams. They do not grade perceived smoothness.",
    },
    "frames-time/timestamps": {
      title: "Locate each picture in time",
      goal: "Read picture timestamps and the units used to store them.",
      concept: [
        "A frame rate summarises cadence. A timestamp locates an individual picture on a timeline. Files can have uneven picture spacing, so a reported average rate alone does not prove that every interval is equal.",
        "ffprobe -show_entries requests selected information. frame=pts_time means “for frames, show their presentation timestamp in seconds”. The equals sign separates the section name from the requested field. A presentation timestamp says when to display a picture; stored decoding order can differ because compressed pictures may depend on other pictures.",
        "The independent cell uses stream=avg_frame_rate,time_base: request two stream fields separated by a comma. avg_frame_rate is a rational average such as 24/1. time_base is the duration of one stored timestamp tick, also a fraction of a second; it is not the frame interval. A video time base of 1/12288 allows 512 ticks per 1/24-second picture interval. Expect rounding in decimal timestamp text. Audio uses its own clock, so inspect the stream type before comparing fractions.",
      ],
      prediction:
        "Will the first few video presentation timestamps differ by roughly 1/24 second?",
      reveal:
        "For this constant-rate source, successive video pictures are about 0.041667 seconds apart. Audio frames also appear in frame output; do not mistake them for pictures.",
      workedLabels: ["Read presentation timestamps"],
      options: [
        {
          flag: "-show_entries frame=pts_time",
          meaning:
            "Request frame presentation timestamps expressed in seconds.",
        },
        {
          flag: "-show_entries stream=avg_frame_rate,time_base",
          meaning:
            "Request two stream-level fields; the comma separates their names.",
        },
      ],
      change:
        "Request frame=media_type,pts_time instead. Use media_type to distinguish video pictures from audio frames.",
      practice:
        "Run the supplied stream-field inspection on bunny-short.mp4. Explain the video average frame rate and time base in your review.",
      review:
        "Explain why 1/12288 seconds per tick does not mean 12,288 displayed pictures per second.",
      hints: [
        "No new output media file is needed.",
        "Use ffprobe with a selected stream section.",
        "Two field names follow stream= and are separated by a comma.",
        "Read avg_frame_rate as a ratio and time_base as seconds per tick.",
        "The practice cell already requests the two fields; run it and interpret the video values.",
      ],
      checkLimit:
        "Checks verify inspection ran. They do not evaluate your interpretation or prove constant frame spacing from an average alone.",
    },
    "cut-join/copy": {
      title: "Copy compressed streams",
      goal: "Repackage existing picture and sound without encoding them again.",
      concept: [
        "An encoder creates compressed media; a decoder reconstructs pictures or sound from it. Stream copying skips both transformations for the selected streams. FFmpeg transfers their compressed packets into a new container. A packet carries encoded stream data and timing information; it is not necessarily a complete independently decodable picture.",
        "The option -c selects a codec action for output streams. The special value copy means copy encoded data instead of choosing an encoder. Here -c copy applies to both the video and audio. The input and output are MP4, so the existing H.264 and AAC streams fit the destination container.",
        "This operation avoids another lossy encoding generation, but it does not promise a byte-identical file: container metadata and layout may change. It also cannot apply picture or sound filters, which require decoded values. Arbitrary cuts are a further complication because compressed pictures can depend on pictures outside the requested interval. Copy the complete clip first; the next page investigates that boundary.",
      ],
      prediction:
        "Will copying the streams change picture dimensions or convert H.264 to another codec?",
      reveal:
        "The streams keep their codecs and picture dimensions. The new container file need not have identical bytes.",
      workedLabels: ["Copy both encoded streams"],
      options: [
        {
          flag: "-c copy",
          meaning:
            "Copy selected encoded streams without decoding and encoding them.",
        },
      ],
      change:
        "Remove -c copy and write to another output. Compare codec information and file sizes without assuming one must be smaller.",
      practice:
        "Create practice-copy.mp4 by stream-copying all eight seconds of the supplied short clip, keeping video and sound.",
      review:
        "Explain which work stream copying avoids and why filters would require a different path.",
      hints: [
        "The target keeps the full source duration.",
        "Choose a codec action rather than a video filter.",
        "One option can apply to both streams.",
        "The special action is copy.",
        "Use -c copy before practice-copy.mp4.",
      ],
      checkLimit:
        "Checks verify duration, stream presence and H.264 video. Those properties do not prove that encoded packets were copied; inspect your executed command too.",
    },
    "cut-join/keyframes": {
      title: "Cut across picture dependencies",
      goal: "Compare a copied seek with a decoded cut.",
      concept: [
        "Compressed video often stores changes relative to other pictures. A keyframe provides a usable starting point for decoding, although exact random-access rules depend on the codec and file. A requested second need not coincide with such a point.",
        "The first command puts -ss 2 before -i: seek within the input, then use -c copy to copy packets for roughly the requested interval. A seek can land at an earlier usable boundary; copied timing and player behaviour can expose retained material or shifted starts. Do not assume that naming second 2 guarantees the first visible picture is exactly from second 2.",
        "The second command puts -ss 2 after -i and omits -c copy. FFmpeg decodes and discards earlier material, then encodes three seconds into exact.mp4. The options are familiar; their order and the encoding path are the experiment. Compare the start visually and inspect duration. No particular mismatch is guaranteed for every source or player, and a matching duration alone cannot prove an accurate start.",
      ],
      prediction:
        "Which approach can discard decoded pictures before the requested start?",
      reveal:
        "The second command can discard decoded pictures and re-encode the kept interval. Inspect both real results; stream-copy boundary behaviour depends on the source.",
      workedLabels: ["Seek and stream-copy", "Decode, discard and encode"],
      options: [
        {
          flag: "-ss 2 before -i",
          meaning:
            "Seek in the input before processing; stream copying may retain boundary-dependent material.",
        },
        {
          flag: "-ss 2 after -i",
          meaning:
            "Discard decoded material before the requested output start.",
        },
        {
          flag: "-c copy",
          meaning:
            "Keep encoded packets, including their dependency constraints.",
        },
      ],
      change:
        "Move -ss in the first command after -i, retaining -c copy and a new filename. Observe rather than assume the boundary result.",
      practice:
        "Create practice-exact.mp4 by decoding and encoding the three-second interval starting at source second 2.",
      review:
        "Compare openings, not only durations. Explain what a keyframe permits and why a duration check cannot locate the first picture.",
      hints: [
        "Keep the requested start and duration separate.",
        "Use the path that decodes pictures.",
        "Do not use stream copying for the target.",
        "Place the start option after the input.",
        "Use output-side -ss 2 with -t 3 and no -c copy.",
      ],
      checkLimit:
        "Checks verify three seconds and both streams. They cannot prove the source start or distinguish copied from encoded content.",
    },
    "cut-join/join": {
      title: "Join two timelines",
      goal: "Place the six-second action clip after the eight-second short clip.",
      concept: [
        "Joining means making one timeline from consecutive segments. These supplied clips have matching picture dimensions, frame rate and audio layout, and start their timelines at zero. Those conditions let this example focus on ordering. Arbitrary imported files may need resizing, audio conversion or timestamp resetting first.",
        "Two -i options create input 0 and input 1 in command order. -filter_complex supplies a filter graph that can connect several streams. In the quoted graph, [0:v] and [0:a] select video and audio from input 0; [1:v] and [1:a] do the same for input 1. Brackets name connections. The concat filter receives each segment’s video then audio.",
        "concat=n=2:v=1:a=1 means two segments, one video output and one audio output. Colons separate the filter’s settings. [v][a] name its two outputs. Each -map selects one named output for the file; the quoted bracket labels are graph links, not filenames. The resulting timeline lasts 8 + 6 = 14 seconds. Encoding creates a continuous output from decoded segments.",
      ],
      prediction: "Where should the second clip begin on the joined timeline?",
      reveal:
        "It begins after the first eight seconds. The resulting duration is fourteen seconds.",
      workedLabels: ["Connect two clips in sequence"],
      options: [
        {
          flag: "-filter_complex",
          meaning: "Define a graph connecting multiple streams.",
        },
        {
          flag: "[0:v][0:a][1:v][1:a]",
          meaning: "Supply each input’s video and audio in segment order.",
        },
        {
          flag: "concat=n=2:v=1:a=1[v][a]",
          meaning: "Join two segments and name one video and one audio output.",
        },
        {
          flag: '-map "[v]" -map "[a]"',
          meaning: "Write both named graph outputs.",
        },
      ],
      change:
        "Swap only the two input filenames, keeping graph indices unchanged. Predict which segment now opens the output.",
      practice:
        "Create practice-join.mp4 with bunny-action.mp4 first, then bunny-short.mp4. Keep picture and sound throughout the fourteen-second output.",
      review:
        "Replay across the join. Describe how input order and bracket connections determine sequence.",
      hints: [
        "The target reverses the worked segment order.",
        "Input numbers follow the order of -i arguments.",
        "The graph already consumes input 0 before input 1.",
        "Swap the filenames rather than rewriting all graph labels.",
        "Put bunny-action.mp4 first and bunny-short.mp4 second; retain the concat graph and both maps.",
      ],
      checkLimit:
        "Checks verify fourteen seconds and both streams. They cannot grade segment order, the join’s appearance or sound continuity.",
    },
    "framing/scale": {
      title: "Resize the picture",
      goal: "Reduce picture dimensions while keeping its proportions.",
      concept: [
        "A picture is a rectangular grid of pixels. Width and height count grid locations, not physical centimetres on a screen. Resizing computes a new grid from the old one. It can reduce detail; enlarging later does not recreate information that was discarded.",
        "The -vf option introduces the scale video filter. In scale=640:-2, the first value sets width to 640 pixels. The colon separates width from height. The special height -2 asks FFmpeg to derive a proportional height and make it divisible by two, which suits common video encoders. It is not a negative physical height.",
        "This source is 854 × 480, slightly different from an exact 16:9 grid. FFmpeg may adjust the sample aspect ratio, the intended shape of each pixel, to preserve the displayed proportions after integer rounding. Distinguish stored dimensions from display shape. Here a width of 320 produces 320 × 180 stored pixels. The command retains the eight-second timeline and sound; it changes picture geometry rather than playback duration.",
      ],
      prediction: "Will a width of 640 preserve the original 480-pixel height?",
      reveal:
        "No. The derived height changes with width; -2 keeps the result proportional and even.",
      workedLabels: ["Resize to a 640-pixel width"],
      options: [
        {
          flag: '-vf "scale=640:-2"',
          meaning: "Set width to 640 and derive an even proportional height.",
        },
      ],
      change:
        "Change only the width to 320 and choose a new filename. Compare the measured dimensions before judging detail.",
      practice:
        "Create practice-scale.mp4 at 320 × 180 pixels, keeping eight seconds and sound.",
      review:
        "Explain how automatic height differs from forcing both dimensions independently. Inspect the stored width and height.",
      hints: [
        "Use a picture filter, not a duration option.",
        "Keep the proportional-height placeholder.",
        "The target width is 320.",
        "The supplied source and -2 yield an even height of 180.",
        "Use scale=320:-2 and keep the practice filename.",
      ],
      checkLimit:
        "Checks verify stored dimensions, duration and stream presence. They do not grade visual detail or display behaviour in every player.",
    },
    "framing/crop": {
      title: "Keep a smaller field of view",
      goal: "Cut a square out of the picture without shrinking its contents.",
      concept: [
        "Cropping discards picture area outside a rectangle. Scaling resamples the whole image; cropping keeps a subset of its pixel grid. A subject can therefore appear larger within the remaining frame even though you have not added detail.",
        "The crop filter uses width:height as its first two values. crop=480:480 keeps a 480-pixel square from the 854 × 480 source. With no horizontal or vertical offset supplied, the filter centres the rectangle. The original full height fits, while material on the left and right is discarded. -vf applies that operation to every decoded picture.",
        "A centre crop is a geometric default, not a judgement about the subject. An object near the edge may disappear, and motion can carry a subject outside the retained rectangle. Replay the entire result before accepting the framing. The timeline and audio remain eight seconds. Use a smaller square in practice so you can observe that the field of view changes even though the duration does not.",
      ],
      prediction:
        "Does the square contain the whole original picture squeezed narrower?",
      reveal:
        "No. It removes picture area. Objects in the retained region keep their pixel scale.",
      workedLabels: ["Keep the central 480-pixel square"],
      options: [
        {
          flag: '-vf "crop=480:480"',
          meaning: "Keep a centred rectangle 480 pixels wide and 480 high.",
        },
      ],
      change:
        "Reduce only the crop width to 360, retaining height 480 and a new filename. Predict which edges are removed.",
      practice:
        "Create practice-square.mp4 with a centred 360 × 360 crop, keeping all eight seconds and sound.",
      review:
        "Compare the outer edges of the source and result. Describe a framing consequence that dimensions alone cannot reveal.",
      hints: [
        "The task removes picture area rather than resizing the whole view.",
        "Use crop with two size values.",
        "Both target dimensions are 360.",
        "Omitted offsets centre the crop automatically.",
        "Use crop=360:360 and retain the practice output name.",
      ],
      checkLimit:
        "Checks verify a 360 × 360 video with the original duration and an audio stream. They cannot judge whether the subject remains visible.",
    },
    "framing/pad": {
      title: "Fit the whole view inside a square",
      goal: "Add empty picture area instead of cutting away the edges.",
      concept: [
        "Padding enlarges the canvas around an image. It adds pixels outside the existing picture rather than stretching its contents. To fit a wide source in a square, first scale the whole picture to the square’s width, then add space above and below it.",
        "The -vf expression contains two filters separated by a comma. Filter chains run left to right. scale=480:-2 derives an even proportional height. pad=480:480:(ow-iw)/2:(oh-ih)/2 then sets the output canvas width and height, followed by the picture’s horizontal and vertical position.",
        "Within the pad expressions, ow and oh mean output width and height; iw and ih mean the incoming picture width and height. Subtracting the incoming size from the canvas size gives the spare space. Dividing by two centres the picture. Parentheses group arithmetic, colons separate arguments, and the surrounding quotes keep the complete chain in one command argument. The default padding colour is black. Padding preserves the field of view, while the smaller scaled image can still lose fine detail.",
      ],
      prediction:
        "Will this square show more of the original field of view than a square crop?",
      reveal:
        "Yes. It retains the full view at a smaller size and fills the remaining canvas with black padding.",
      workedLabels: ["Scale, then centre on a square canvas"],
      options: [
        {
          flag: ",",
          meaning: "Chain filters in execution order.",
        },
        {
          flag: "pad=480:480:x:y",
          meaning: "Set canvas size, then picture position.",
        },
        {
          flag: "(ow-iw)/2:(oh-ih)/2",
          meaning: "Centre the incoming picture in the output canvas.",
        },
      ],
      change:
        "Change only the final vertical position from (oh-ih)/2 to 0, using another output. Predict where the empty space moves.",
      practice:
        "Create practice-pad.mp4 with the full view centred inside a 360 × 360 canvas, keeping eight seconds and sound.",
      review:
        "Explain why the source edges survive here but disappear in a square crop. Inspect the full result.",
      hints: [
        "The task needs two filters in sequence.",
        "Scale the whole view before adding the canvas.",
        "Change the scale width and both canvas dimensions to 360.",
        "Keep -2 and the centring expressions unchanged.",
        "Use scale=360:-2,pad=360:360:(ow-iw)/2:(oh-ih)/2.",
      ],
      checkLimit:
        "Checks verify canvas dimensions, duration and streams. They cannot establish that the full view was retained or correctly centred.",
    },
    "sound/level": {
      title: "Change signal level",
      goal: "Reduce the soundtrack’s sample amplitudes.",
      concept: [
        "Digital sound is a sequence of sample values describing a waveform. A level adjustment multiplies those values. It changes signal amplitude, which influences perceived loudness, but playback volume, listening conditions and the sound itself also affect what you hear.",
        "The -af option applies an audio filter. volume=0.5 multiplies each audio sample by one half. It does not mean “exactly half as loud”. Picture dimensions and timing are unaffected by this audio filter, although the command uses the usual encoding path to create a new file.",
        "Listen with a comfortable device volume and keep that device setting fixed when comparing versions. This lets the comparison focus on the media change. A file can contain a valid audio stream while being inaudible, so checking stream presence alone cannot verify this exercise’s gain. Similarly, multiplying quiet audio upward does not guarantee a clean result: sufficiently large values can exceed the representable range and distort. Begin with reductions and compare the same passage.",
      ],
      prediction: "Will volume=0.5 remove the audio stream?",
      reveal:
        "No. The output retains audio with lower sample amplitudes. Perceived loudness is for you to compare.",
      workedLabels: ["Multiply audio samples by one half"],
      options: [
        {
          flag: '-af "volume=0.5"',
          meaning: "Apply an audio filter with an amplitude multiplier of 0.5.",
        },
      ],
      change:
        "Change only 0.5 to 1 and use another filename. Compare at a fixed device volume.",
      practice:
        "Create practice-level.mp4 with volume=0.25, retaining the eight-second picture and soundtrack.",
      review:
        "Compare the same passage and state the multiplier you used. Keep a subjective listening judgement separate from stream presence.",
      hints: [
        "Keep the video and full duration.",
        "Choose an audio filter rather than -an.",
        "The target changes sample amplitude.",
        "One quarter is written as 0.25.",
        'Use -af "volume=0.25" before the practice output name.',
      ],
      checkLimit:
        "Checks verify eight seconds and both streams. They cannot measure whether you used the requested gain or grade audibility; inspect the command and listen.",
    },
    "sound/fade": {
      title: "Fade towards silence",
      goal: "Reduce audio gradually over the ending.",
      concept: [
        "A constant gain changes the whole soundtrack by one multiplier. A fade changes that multiplier through time. A fade-out moves towards silence over a chosen interval, making its start and duration independent decisions.",
        "The audio filter afade accepts named settings separated by colons. t=out chooses a fade-out. st=5 begins it at second 5 of the processed audio timeline. d=3 makes it last three seconds. On this eight-second source, the fade therefore reaches its endpoint at second 8. -af sends this expression to the audio filter system; video receives no picture filter.",
        "A fade does not shorten the file or delete the audio stream. It changes sample values towards the end. Listening is necessary to judge whether its timing serves the material. A fade may hide part of a musical phrase, and a technically valid file cannot tell you whether that choice works. Keep the source and output at the same device volume so your comparison is meaningful.",
      ],
      prediction:
        "Does a fade starting at second 5 for three seconds make a three-second file?",
      reveal:
        "No. The file remains eight seconds; its audio level falls over seconds 5–8.",
      workedLabels: ["Fade out over the final three seconds"],
      options: [
        {
          flag: "afade=t=out:st=5:d=3",
          meaning:
            "Fade audio out, starting at second 5 and lasting 3 seconds.",
        },
        {
          flag: "st and d",
          meaning: "Start time and fade duration, expressed in seconds.",
        },
      ],
      change:
        "Change only st=5 to st=4, keeping d=3 and a new output name. Predict when silence is reached.",
      practice:
        "Create practice-fade.mp4 with a fade-out starting at second 4 and lasting four seconds, keeping the eight-second video.",
      review:
        "Describe where the fade begins and ends. Explain why a duration measurement cannot confirm the audible shape.",
      hints: [
        "The target still lasts eight seconds.",
        "Keep the fade type as out.",
        "The fade must begin at second 4.",
        "It must continue for four seconds to reach the ending.",
        "Use afade=t=out:st=4:d=4 in the audio filter.",
      ],
      checkLimit:
        "Checks verify duration and video/audio presence. They cannot establish fade timing or whether the soundtrack fades audibly.",
    },
    "text/title": {
      title: "Render a title into pictures",
      goal: "Add visible lettering using a supplied font.",
      concept: [
        "Burning text into video means drawing letters into the picture pixels. The text becomes part of every encoded picture where the filter draws it. A player cannot switch it off as a separate subtitle track.",
        "The drawtext video filter needs both lettering instructions and a font, the file that describes letter shapes. fontfile=fonts/DejaVuSans.ttf selects the supplied DejaVu Sans file in the fonts folder. text=Hello supplies the literal word. fontsize=32 sets its size in pixels and fontcolor=white selects its colour. Colons separate the named settings. The filter’s default position is at the upper-left; this first example leaves placement unchanged.",
        "The full quoted expression is one argument to -vf. Keep this exercise’s title to a single word: punctuation such as colons and quotes needs additional filter escaping. The Files view contains real virtual paths; the font must be loaded before execution. DejaVu has its own licence, linked with the course credits. Replay against both bright and dark backgrounds: successful rendering does not prove good readability.",
      ],
      prediction:
        "Can a player hide this title without changing the video pictures?",
      reveal: "No. The lettering is encoded into the video pixels.",
      workedLabels: ["Draw a one-word title"],
      options: [
        {
          flag: "fontfile=fonts/DejaVuSans.ttf",
          meaning: "Choose the supplied font file.",
        },
        {
          flag: "text=Hello",
          meaning: "Draw this literal word.",
        },
        {
          flag: "fontsize=32:fontcolor=white",
          meaning: "Set size in pixels and colour.",
        },
      ],
      change:
        "Change only fontsize=32 to fontsize=40, using another output. Compare how much picture area it occupies.",
      practice:
        "Create practice-title.mp4 displaying Bunny in white at size 40 using the supplied font. Keep eight seconds and sound.",
      review:
        "Check the actual word, size and readability throughout the replay. Explain how this differs from a selectable text track.",
      hints: [
        "Load the video and supplied font.",
        "Use the drawtext video filter.",
        "Keep the font path and white colour.",
        "Change the text to Bunny and size to 40.",
        "Use text=Bunny:fontsize=40 with the existing fontfile and fontcolor settings.",
      ],
      checkLimit:
        "Checks verify duration and stream presence. They cannot read the title, measure its rendered size or grade legibility.",
    },
    "text/subtitles": {
      title: "Time text with a subtitle file",
      goal: "Render separate timed cues over the video.",
      concept: [
        "A subtitle file separates text and timing from the video command. The supplied captions.srt is a plain-text SubRip file: each cue has a sequence number, a start and end time, then one or more text lines. SRT times use hours:minutes:seconds,milliseconds with an arrow between start and end. A blank line separates cues.",
        "The video filter subtitles=captions.srt reads the cues and draws lettering during their intervals. Colons separate its settings. This build renders subtitles through libass, a subtitle-rendering library. The lettering becomes part of the picture pixels; this command does not create a selectable subtitle stream.",
        "fontsdir=fonts makes the supplied font folder available. force_style supplies a subtitle-style override: Fontname=DejaVu Sans selects the supplied font’s internal family name, rather than its .ttf filename. The complete filter stays inside double quotes, including the space in DejaVu Sans. Loading a folder alone does not select its font. Do not assume this browser build can fall back to fonts installed on your device.",
        "The example cue text is original instructional material, not a transcription of Big Buck Bunny dialogue. Open captions.srt in Files to inspect the timing before running. Editing a cue changes the next rendered result, not a video you already encoded. The command can stay identical while the input text changes, so rerun it and review the new output. Keep a download of text you want to retain.",
      ],
      prediction:
        "If a cue ends at second 3, should its lettering remain visible at second 5?",
      reveal:
        "No. Its interval controls visibility; other cues may still appear at that time.",
      workedLabels: ["Render the timed example cues"],
      options: [
        {
          flag: "subtitles=captions.srt",
          meaning:
            "Read timed cues from this SRT file and burn them into pictures.",
        },
        {
          flag: "fontsdir=fonts",
          meaning:
            "Make fonts in this folder available to the subtitle renderer.",
        },
        {
          flag: "force_style=Fontname=DejaVu Sans",
          meaning:
            "Select the supplied DejaVu Sans family for subtitle lettering.",
        },
      ],
      change:
        "Edit only one cue’s text in Files, leaving its timestamps unchanged. Save, rerun to a new output and compare.",
      practice:
        "Render captions.srt into practice-subtitles.mp4 using the supplied fonts folder and explicitly selecting DejaVu Sans. Keep eight seconds and sound; inspect the visible cue text and timing yourself.",
      review:
        "Confirm that letters are visible during a cue and disappear afterwards. Describe its start and end, and explain why changing the SRT file requires rendering again.",
      hints: [
        "Load the video, captions and font.",
        "Inspect the text file before rendering.",
        "Use a video filter so the cues become picture pixels; make the supplied font available.",
        "Pass captions.srt to subtitles, fonts to fontsdir, and select the DejaVu Sans family with force_style.",
        "Keep the complete filter quoted so DejaVu Sans stays within one argument; the reference shows all three filter settings.",
      ],
      checkLimit:
        "Checks verify duration and stream presence. They cannot establish that lettering was rendered, read subtitles, confirm edits or assess cue timing and readability. Replay the cue intervals yourself.",
    },
    "quality/quality": {
      title: "Choose an encoding quality setting",
      goal: "Compare two H.264 encodes with different quality targets.",
      concept: [
        "Lossy compression reduces storage by discarding information that an encoder estimates can be represented less precisely. An encoder balances the resulting distortion against the number of bits it writes. Re-encoding cannot restore detail already lost in the source.",
        "The output option -c:v selects the video encoder; the :v suffix restricts this choice to video. libx264 is an H.264 encoder. Its -crf setting selects constant-rate-factor mode: a quality-oriented control rather than a fixed file size. Lower values generally retain more detail and require more bits; higher values allow more loss. The two examples use 18 and 35 while keeping the source and other settings the same.",
        "File size and visible differences depend on the material and encoder build. Run both commands, inspect the actual files and compare the same moving and detailed areas. Do not treat either filename as a measured result. Small browser previews can hide differences; downloading allows closer comparison in a suitable player. The task asks for an intermediate setting, not a promise about its exact size.",
      ],
      prediction: "Which CRF value asks libx264 to preserve more detail?",
      reveal:
        "18 requests higher quality than 35. Measure the resulting sizes and inspect the real pictures rather than assuming a fixed ratio.",
      workedLabels: ["Encode with CRF 18", "Encode with CRF 35"],
      options: [
        {
          flag: "-c:v libx264",
          meaning: "Encode video with the libx264 H.264 encoder.",
        },
        {
          flag: "-crf 18 / -crf 35",
          meaning:
            "Choose a quality-oriented target; lower values retain more detail in general.",
        },
      ],
      change:
        "Keep CRF 18 and change only it to 26 in a new output. Compare its size and pictures with both worked results.",
      practice:
        "Create practice-quality.mp4 using libx264 with CRF 26, keeping eight seconds and sound.",
      review:
        "Record actual sizes if you compare them. Explain why a quality setting does not specify an exact byte budget.",
      hints: [
        "Use the same source to make the comparison meaningful.",
        "Select the H.264 video encoder explicitly.",
        "The requested mode is controlled by -crf.",
        "Choose the intermediate value 26.",
        "Use -c:v libx264 -crf 26 before the practice output.",
      ],
      checkLimit:
        "Checks verify duration, streams and H.264 video. They cannot recover the CRF setting from those properties or grade visual quality.",
    },
    "quality/speed": {
      title: "Choose encoder effort",
      goal: "Separate a quality target from an encoder’s search effort.",
      concept: [
        "An encoder can spend more computation searching for compact ways to represent a picture. A preset groups many search and compression decisions. It controls encoding effort; it does not set playback speed or change the source timeline.",
        "With libx264, -preset ultrafast chooses a low-effort preset. -crf 26 remains the quality-oriented setting introduced earlier. Other presets, such as fast, spend effort differently and can achieve different sizes and visible results at the same CRF. Equal CRF is not a guarantee of identical distortion across presets.",
        "Browser processing uses WebAssembly and depends on the device, memory pressure, browser and input. A native command measurement is not a prediction of your browser’s time. Compare actual runs if you want timing evidence, and describe the environment. A single run does not establish a reliable benchmark. Here the learning goal is choosing the independent preset control while retaining the same content, duration and quality mode.",
      ],
      prediction: "Does ultrafast mean the output plays faster than normal?",
      reveal:
        "No. It describes encoder effort. The eight-second output retains its playback timeline.",
      workedLabels: ["Encode with a low-effort preset"],
      options: [
        {
          flag: "-preset ultrafast",
          meaning: "Choose libx264’s ultrafast encoding preset.",
        },
        {
          flag: "-crf 26",
          meaning:
            "Keep the quality-oriented control fixed while comparing presets.",
        },
      ],
      change:
        "Change only ultrafast to fast and use a new filename. Compare actual results without predicting a universal time ratio.",
      practice:
        "Create practice-speed.mp4 with libx264, CRF 26 and the fast preset, retaining eight seconds and sound.",
      review:
        "Explain which control changes encoder effort and which selects the quality-oriented target. Describe only measured differences.",
      hints: [
        "Keep duration and input unchanged.",
        "The encoder remains libx264.",
        "Keep CRF at 26.",
        "Change the preset name to fast.",
        "Use -c:v libx264 -crf 26 -preset fast for the practice output.",
      ],
      checkLimit:
        "Checks verify duration, streams and H.264 video. They cannot prove the preset or CRF used, or certify processing performance.",
    },
    "export/format": {
      title: "Make explicit export choices",
      goal: "Choose the container, codecs and pixel storage format.",
      concept: [
        "Export choices operate at different layers. The container packages streams; each codec encodes a stream; the pixel format describes how decoded picture components are represented. A familiar filename ending cannot specify all three.",
        "The output ending .mp4 selects MP4. -c:v libx264 selects H.264 video, and -c:a aac selects AAC audio; the :a suffix restricts that encoder choice to audio. -pix_fmt yuv420p selects planar YUV 4:2:0 pixel storage. Y describes brightness-related information, while U and V describe colour differences. In 4:2:0, colour is stored at half the horizontal and vertical resolution of brightness; “p” means the components use separate planes.",
        "This combination is commonly supported, but a successful encode does not guarantee playback on every device. Profiles, levels, dimensions and players can impose further requirements. Colour subsampling may affect fine coloured edges; do not confuse it with frame rate or picture size. The practice task adds a familiar four-second duration while retaining the explicit choices. Replay locally and test the actual destination player when exporting your own work.",
      ],
      prediction: "Does yuv420p mean 420 pixels wide or 420 frames per second?",
      reveal:
        "Neither. It describes the relationship between brightness and colour component grids.",
      workedLabels: ["Choose MP4, H.264, AAC and yuv420p"],
      options: [
        {
          flag: "-c:v libx264",
          meaning: "Use H.264 video encoding.",
        },
        {
          flag: "-pix_fmt yuv420p",
          meaning: "Store separate brightness and subsampled colour planes.",
        },
        {
          flag: "-c:a aac",
          meaning: "Use AAC audio encoding.",
        },
        {
          flag: ".mp4",
          meaning: "Choose the MP4 output container.",
        },
      ],
      change:
        "Change only -t by adding -t 4, using a new filename. Check that format choices and duration answer different questions.",
      practice:
        "Create practice-export.mp4 lasting four seconds, with libx264 video, yuv420p pixels and AAC sound in MP4.",
      review:
        "Name each export layer separately. Record whether this browser replays the output, without generalising to all players.",
      hints: [
        "Keep both streams and the MP4 output name.",
        "Retain the explicit video encoder.",
        "Retain yuv420p and the AAC audio encoder.",
        "Add a four-second output duration.",
        "Use -t 4 with the three existing encoding choices.",
      ],
      checkLimit:
        "Checks verify duration, video/audio presence, H.264 and MP4. They do not certify yuv420p, AAC or compatibility with every destination; inspect output fields and test the player.",
    },
    "export/faststart": {
      title: "Move MP4 indexing information",
      goal: "Prepare an MP4 layout suited to progressive download.",
      concept: [
        "An MP4 contains encoded media and metadata describing where samples are stored and when to play them. Players need that indexing information to interpret the media. If it is at the end of a file, some delivery paths must fetch that region before playback can begin.",
        "The MP4 output option -movflags +faststart requests a second pass that moves this metadata towards the beginning. The plus sign enables the faststart flag. -c copy keeps the existing encoded streams, so this example changes container organisation rather than recompressing pictures and sound.",
        "This is not a universal instant-play switch. A server’s range-request support, network conditions, player buffering and the rest of the file still matter. Local replay may show no obvious difference because the whole file is already available. The operation also does not shrink the video timeline. Use the executed command as evidence of the requested layout change, and distinguish that request from a measured network-startup improvement.",
      ],
      prediction:
        "Will moving the index change the eight-second duration or picture codec?",
      reveal:
        "No. The command copies the media streams while rearranging MP4 metadata.",
      workedLabels: ["Request front-loaded MP4 metadata"],
      options: [
        {
          flag: "-movflags +faststart",
          meaning:
            "Move MP4 indexing metadata towards the beginning during output finalisation.",
        },
        {
          flag: "-c copy",
          meaning: "Keep the encoded video and audio unchanged.",
        },
      ],
      change:
        "Remove only -movflags +faststart and use another output. Compare ordinary probe results; note which properties do not expose metadata placement.",
      practice:
        "Create practice-ready.mp4 by copying the supplied streams with +faststart enabled. Keep eight seconds and sound.",
      review:
        "Explain why local replay and duration do not demonstrate faster network startup. Identify the command option that requests layout preparation.",
      hints: [
        "The target uses the existing encoded streams.",
        "Keep the output container as MP4.",
        "The change concerns container metadata placement.",
        "Enable the faststart MOV/MP4 flag.",
        "Combine -c copy with -movflags +faststart before the practice filename.",
      ],
      checkLimit:
        "Checks verify duration, streams, H.264 and MP4. They do not inspect MP4 box order or measure startup speed.",
    },
    "export/verify": {
      title: "Inspect an export as structured data",
      goal: "Separate stream properties from container properties.",
      concept: [
        "Inspection becomes easier to compare when the tool reports named fields. JSON is a structured text format with objects, arrays and values. It makes an inspection result easier to read programmatically; it does not make the media more valid by itself.",
        "ffprobe -show_streams requests per-stream details, such as codec, dimensions and audio sample rate. -show_format requests container-level information, including overall duration and size. -of json selects JSON output formatting. There is still only one input filename and no edited output file.",
        "Find the video object inside streams before reading width or height. Find the audio object before reading sample_rate. The format object describes the packaged file. Stream and container duration can differ slightly because their boundaries and reporting units differ. Rational rates and numeric-looking strings are common: interpret their units rather than assuming every JSON value is a plain number. A readable header is useful evidence, but it does not prove that every encoded frame can be decoded.",
      ],
      prediction:
        "Where will you find picture dimensions: the format object or a video stream object?",
      reveal:
        "They belong to the video stream object. The format object describes the container as a whole.",
      workedLabels: ["Request structured stream and container details"],
      options: [
        {
          flag: "-show_streams",
          meaning: "Include details of each media stream.",
        },
        {
          flag: "-show_format",
          meaning: "Include container-level details.",
        },
        {
          flag: "-of json",
          meaning: "Format the inspection report as JSON.",
        },
      ],
      change:
        "Remove only -show_format and run again. Identify which information disappears while stream details remain.",
      practice:
        "Inspect bunny-short.mp4 using JSON with both stream and container details. Record video dimensions, audio sample rate and container duration.",
      review:
        "Distinguish the location and units of each recorded property. State what this inspection leaves untested.",
      hints: [
        "Use ffprobe, not an encoding command.",
        "Request both streams and format sections.",
        "Select the JSON output formatter.",
        "Look for codec_type before interpreting stream fields.",
        "Run the supplied inspection and read width/height, sample_rate and format.duration.",
      ],
      checkLimit:
        "Checks record successful inspection. They cannot grade your interpretation or establish complete decodeability.",
    },
    "export/decode": {
      title: "Decode the whole file",
      goal: "Test the media beyond its headers.",
      concept: [
        "A probe can read headers and describe streams without reconstructing every picture and sound sample. A fuller verification asks a decoder to process the entire file. This can expose damaged data or unsupported coding that a header inspection misses.",
        "The command uses ffmpeg rather than ffprobe. -xerror asks FFmpeg to stop on an error. -i selects the input. -f null chooses the null output format, which discards processed output instead of storing a playable file. The final - supplies the output destination syntax; with this null format there is no downloadable result. It is part of the FFmpeg command, not a shell pipe.",
        "Let the run finish and read its actual log and completion status. Warnings and errors have different meanings; do not infer success merely from the final line looking familiar. Decoding here tests this installed WebAssembly build against this file. It cannot guarantee another player supports the same features, that the content is correct, or that a soundtrack sounds good. Combine it with inspection and replay when preparing an export.",
      ],
      prediction: "Will this command create a new MP4 for you to replay?",
      reveal:
        "No. It decodes and discards the output; the evidence is the completed run and its log.",
      workedLabels: ["Decode and discard all output"],
      options: [
        {
          flag: "-xerror",
          meaning: "Stop processing when FFmpeg encounters an error.",
        },
        {
          flag: "-f null",
          meaning: "Choose a null output that discards processed media.",
        },
        {
          flag: "-",
          meaning:
            "Supply the output destination; this is not a pipe or another program.",
        },
      ],
      change:
        "Load bunny-action.mp4 and change only the input filename. Run the same decode test and compare actual logs.",
      practice:
        "Run a full decode of bunny-short.mp4 with -xerror and null output. Read the log before recording your review.",
      review:
        "Explain what decoding tests beyond metadata inspection and name one property it still cannot judge.",
      hints: [
        "Use FFmpeg to process the streams.",
        "The goal is verification, so no stored output is required.",
        "Request stopping on errors.",
        "Use the null format and its trailing output destination.",
        "Combine the error-stop option, input and null output; the separate reference shows the complete line.",
      ],
      checkLimit:
        "The check records that a decoding command completed. Confirm the intended streams and full duration in its command and log; the check cannot certify those, content quality or another player’s compatibility.",
    },
    "workflows/reuse": {
      title: "Reuse a command deliberately",
      goal: "Adapt a known transformation to another input.",
      concept: [
        "A reusable command separates stable processing choices from task-specific values. Here the stable choice is a 320-pixel-wide proportional preview. Input, duration and output name vary between jobs. Reuse is safest when you can explain every retained argument.",
        'The worked command combines familiar options: -i selects the source, -t 3 keeps three seconds, and -vf "scale=320:-2" creates an even proportional height. previews/short.mp4 is a relative virtual path. The slash selects a folder in the notebook’s file workspace; it does not access a folder on your operating system. Create previews with New folder in Files before writing there.',
        "The browser passes one media command directly to a real tool. It does not expand filename wildcards, run loops or create shell pipelines. File operations belong in Files. Commands, files and recorded results also have different lifetimes: changing an input after a run makes its old result stale. Read the last executed command and rerun after edits before relying on a check. Download important work because browser storage can be cleared.",
      ],
      prediction:
        "Which pieces must change to make a two-second preview of the action clip?",
      reveal:
        "Change the input, duration and output name; keep the scaling expression.",
      workedLabels: ["Write a preview into a folder"],
      options: [
        {
          flag: "previews/short.mp4",
          meaning:
            "Write inside the previews virtual folder; create it in Files first.",
        },
        {
          flag: '-t 3 -vf "scale=320:-2"',
          meaning:
            "Combine an output duration with the previously introduced resize filter.",
        },
      ],
      change:
        "Change only the output name within previews and rerun. Confirm that the first preview remains available.",
      practice:
        "Create previews/practice.mp4 from bunny-action.mp4: two seconds, 320 × 180 pixels, retaining sound.",
      review:
        "List what you reused and what you changed. Explain why an earlier run becomes stale when an input or command changes.",
      hints: [
        "Load both clips and create the previews folder.",
        "Reuse the proportional scaling expression.",
        "Choose bunny-action.mp4 as the input.",
        "Set duration to two seconds and retain the practice path.",
        "Use the action input with -t 2 and scale=320:-2, writing previews/practice.mp4.",
      ],
      checkLimit:
        "Checks verify duration, stored dimensions and streams. They cannot prove which source content you selected or that your workflow is reusable.",
    },
    "workflows/batch": {
      title: "Move repetition to a native shell",
      goal: "Distinguish browser commands from an installed batch workflow.",
      concept: [
        "A native shell can repeat a media command across files. This browser notebook runs individual FFmpeg and ffprobe commands; it has no shell kernel. The script below is plain text to copy or download and run in your own installed POSIX shell with FFmpeg available.",
        "First inspect each supplied clip in a normal browser cell. The worked ffprobe command reads the short clip. The independent command reads the action clip. Their different durations make it clear that each command receives one specific file; the browser does not turn a wildcard into a list.",
        "For the native exercise, put downloaded MP4 sources in a dedicated local folder and review the script before running it. It writes previews into exports and does not replace existing outputs. You choose whether to run it; the website cannot inspect your terminal or certify those native results. The copied script is a starting workflow, not a promise that arbitrary source files have matching streams or that every output will suit your intended use.",
      ],
      prediction:
        "Where does the loop execute: in a browser cell or in your installed shell?",
      reveal:
        "Only in your installed shell. The browser can inspect individual files and provide script text for download.",
      workedLabels: ["Inspect one browser file"],
      options: [
        {
          flag: "ffprobe bunny-short.mp4",
          meaning:
            "Inspect one explicit file in the browser; no loop is executed.",
        },
      ],
      change:
        "Change only the ffprobe input to bunny-action.mp4. Compare its six-second duration with the eight-second short clip.",
      practice:
        "Run ffprobe on bunny-action.mp4 in the browser. Optionally download the native script and run it separately; native execution is not checked here.",
      review:
        "Explain which work occurs in the browser and which requires an installed shell. If you ran the script, record your own terminal evidence.",
      hints: [
        "The checked task is a browser inspection.",
        "It needs no shell syntax or generated output file.",
        "Choose the six-second action clip.",
        "Pass that filename directly to ffprobe.",
        "Inspect the action filename with ffprobe; the separate reference provides the complete browser command.",
      ],
      checkLimit:
        "The check records browser inspection only. It cannot run, observe or grade the native script.",
      nativeExplanation: [
        "#!/bin/sh selects a POSIX shell when the downloaded script is executed as a program. set -e stops on a failed command; set -u treats an unset variable as an error. mkdir -p exports creates the output folder if needed. These are shell commands, not FFmpeg options.",
        'for input in ./*.mp4; do starts a loop over MP4 names in the current folder. [ -f "$input" ] tests whether the entry is a regular file; || continue skips it otherwise, including an unmatched literal pattern. Double quotes keep a filename containing spaces together. done ends the loop.',
        "name=${input##*/} removes the longest prefix ending in /, leaving a filename. ${name%.*} removes its final extension. These are shell parameter expansions. They construct a distinct exports/...-preview.mp4 path for each source.",
        "The FFmpeg line uses -n to refuse replacement of an existing output, -i to read the current source, -t 5 to keep up to five seconds, and the familiar scale=640:-2 filter. A shorter source remains shorter. With set -e, an existing-output refusal or another failure stops the script; review the terminal log before retrying.",
      ],
    },
  },
};
