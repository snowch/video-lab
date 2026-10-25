// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

export default {
  title: "Read the file description",
  goal: "Distinguish the file format from the video and audio stored inside it.",
  concept: [
    "One video file can hold both pictures and sound. It keeps them in separate streams: a video stream contains pictures ordered through time, and an audio stream contains sound measurements ordered through time. A player uses their timing to play them together.",
    "The container is the file format that organises those streams. MP4 is a container. Each stream also has a codec: the method used to store its pictures or sound as encoded data and turn that data back into pictures or sound for playback. H.264 is a video codec; AAC is an audio codec. The .mp4 filename ending alone does not tell you which codecs are inside.",
    "A frame is one complete picture, made of pixels: individual picture locations. Frame rate counts pictures per second. Audio sample rate counts sound measurements per second, for each channel. These describe different things, even though both are rates.",
  ],
  worked: [
    {
      title: "Inspect without editing",
      introduction: [
        "ffprobe reads a media file and reports what it contains without creating an edited copy. Its summary includes the container, duration and a line for each stream.",
      ],
      options: [
        {
          flag: "ffprobe bunny-short.mp4",
          meaning:
            "Run the inspection tool on bunny-short.mp4. This command needs only the input filename; it has no flags or output filename.",
        },
      ],
      observe:
        "Find Input #0 and the two Stream lines below it. The video line reports h264, 854x480 and 24 fps. The audio line reports aac and 48000 Hz.",
      explanation: [
        "The Input line lists mov,mp4,m4a,3gp,3g2,mj2: related formats handled by the same reader. It does not mean this file contains six streams. This practice file uses the MP4 container.",
        "In Stream #0:0, the first number identifies the input file and the second identifies a stream within it. Here #0:0 is video and #0:1 is audio. Their positions identify these particular streams; the words Video and Audio tell you their types.",
        "854x480 means a picture is 854 pixels wide and 480 pixels high. The 24 fps describes the video. The 48000 Hz describes 48,000 audio samples per second per channel. The larger audio number does not mean the sound plays faster than the pictures.",
      ],
    },
  ],
  practice:
    "Inspect bunny-action.mp4 to make a compact file description: find its duration, count its streams, and identify the container and each stream's codec separately. Which properties match the worked example, and which differ? Use the output as evidence.",
  practiceObserve:
    "Read Duration as hours:minutes:seconds, then count the Stream lines. For each stream, identify its type and the codec immediately after Video or Audio. Keep these separate from the container description on the Input line.",
  hints: [
    "Inspection needs ffprobe and an input file, with no output file.",
    "Use bunny-action.mp4 as the input filename.",
    "The Duration line uses hours:minutes:seconds. Count only the lines beginning Stream.",
    "The Input line describes the container family. Read Video and Audio for each stream's codec.",
    "Run ffprobe bunny-action.mp4. Compare its Duration, Video and Audio lines with those from bunny-short.mp4; a different duration does not require different codecs.",
  ],
  checkLimit:
    "The check records that inspection ran. Manually match your description to the Duration, Video and Audio lines; the check does not assess your reading of them.",
} satisfies PageCopy;
