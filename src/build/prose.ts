// Copyright © 2026 Christopher Snow
import { b } from "./strings";

export const prose = {
  question:
    "You recorded a demo in the last lesson. But a video file is not captured whole: pictures and sound are compressed and placed into a file format. Where does such a file come from, and what exactly is inside the one you build?",
  motivation: `A video file is built, not found. Below are four real pictures from the course's original build-queue recording: the initial queue, the Sort action, the sorted result, and the result held on screen. A real encoder turns them into a playable video, and a real sound file becomes its audio.

Press **${b.run}** to run the encoder in your browser. It downloads the FFmpeg WebAssembly core (about 31 MB) only now, because you asked it to run. The produced file is real: you can play it and download it, and the probe values shown are measured from your run's output, not typed in.`,
  prediction: `Before you run it, predict three things about the video-only file you will build from four pictures at one picture per second: how many pictures it contains, its duration in seconds, and roughly how large it is in bytes.

A picture count and a duration are related but different facts: at one picture per second they happen to be equal. File size is content-dependent, so predict an order of magnitude (kilobytes, or megabytes), not an exact number.`,
  investigation: `After the run, the lesson shows what the run's own probe measured: the file format, the picture compression, the resolution, the picture count, the duration and the byte size. These are real measurements of the file this page produced.

Compare each measured value with your prediction. If a value surprises you, look at the command that produced it: the input pattern, the picture rate and the encoder settings are all visible.`,
  construction: `The video-only file has no sound. The second run muxes it with a three-second synthetic tone (a 440 Hz sine, clearly not narration) from \`tone.wav\`: the pictures are copied without re-encoding, and the sound is compressed as AAC. The probe then shows two parts: picture and sound.

Encoding turns pictures or sound into compressed data; muxing places those parts into a file format. Copying a part moves its data without changing it. These are different operations, and the two runs show both.`,
  failureExperiment: `The encoder needs WebAssembly, a worker and enough memory. Some browsers (older mobile browsers, or pages without the required APIs) cannot run it. Nothing fails silently: if the run fails, the lesson says so and offers the labelled pre-generated result of the same commands.

The pre-generated files are real outputs of those commands, made in advance with desktop FFmpeg. They are not your run, and the lesson labels them as pre-generated so no one mistakes them for a new build.`,
  explanation: `The encoder is FFmpeg 5.1.4 compiled to WebAssembly (ffmpeg.wasm), running in a worker inside this page. The command shown is the exact command it executed:

1. The input option \`-framerate 1\` reads the numbered pictures, one per second. (The option name contains the word \`frame\`; the term this lesson introduces is the picture rate, the number of pictures per second.)
2. \`-c:v libx264 -pix_fmt yuv420p\` compresses the pictures as H.264, a widely playable format.
3. \`-movflags +faststart\` places the index at the front of the MP4 so playback can start immediately.
4. The mux run copies the picture data (\`-c:v copy\`) and compresses the tone as AAC (\`-c:a aac\`).

The probe is FFmpeg's inspection tool. It runs in the same worker and prints JSON, which the page parses and shows. The exit code of this probe build is 1 even on success; the page trusts the parsed JSON, not the exit code.`,
  generalisation: `Building a file is reproducible: the same inputs and the same command produce the same structure, with byte sizes that vary only slightly with content. This is why a demo workflow can be written down as a recipe and run again.

The same encoder runs the cuts, crops, level measurements and quality comparisons in later lessons. Each of those lessons shows its exact command and its measured result the same way.`,
  challenge: `Predict the probe values for the video-only build at one picture per second: the picture count, the duration in seconds, your size estimate in bytes, and the sound format the muxed file will report. Run the encoder, then check your predictions against the measured values. Each field is checked separately.`,
  reflection: `What did building a file change about how you think about the recording you made? Write an optional note; it is not graded.`,
  modelVsReality: b.modelVsReality,
  modelNote: b.modelNote,
  challengeTask: `Run the encoder, then predict: the picture count, the duration in seconds and a size estimate in bytes for the video-only file, and the sound format in the muxed file.`,
  hints: [...b.hints] as readonly string[],
  originality: b.originality,
};
