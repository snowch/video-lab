// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";
import { pixelFormats } from "../pixel-formats.strings";

const copy: PageCopy = {
  codecGuide: true,
  title: "Choose an export format",
  goal: "Make an MP4 with explicit choices for its video, sound and picture storage.",
  concept: [
    "A video file packages picture and sound streams in a container. The container describes how those streams fit into one file so a player can find and play them. MP4 is one container format.",
    "Each stream also has a codec: the rules used to represent its picture or sound data. H.264 is a video codec; AAC is an audio codec. A player needs to understand both the container and the codecs inside it. The filename ending alone does not tell you which codecs a file contains.",
    "Within a decoded picture, the pixel format describes how picture components are represented. YUV separates luma (Y), a brightness-related component, from two colour-difference components (U and V). Each component can occupy its own plane, or array of samples; this is called planar storage.",
    "In yuv420p, each sample uses 8 bits and the p marks planar storage. Its 4:2:0 sampling gives each colour component half as many samples across and half as many down as Y. This reduces colour data while retaining finer brightness detail that helps define edges. It does not set picture dimensions or frame rate.",
  ],
  worked: [
    {
      title: "Export MP4 with H.264 video and AAC sound",
      introduction: [
        "Make a new version of the eight-second source. The command chooses a container, an encoder for each stream and a pixel format for the video.",
      ],
      options: [
        {
          flag: ".mp4",
          meaning:
            "The ending of compatible.mp4 selects the MP4 output container. It packages the encoded streams in one file.",
        },
        {
          flag: "-c:v libx264",
          meaning:
            "Use the libx264 encoder to write H.264 video. The :v suffix applies this codec choice to video.",
        },
        {
          flag: "-c:a aac",
          meaning:
            "Use the AAC encoder for sound. The :a suffix applies this codec choice to audio.",
        },
        {
          flag: "-pix_fmt yuv420p",
          meaning: "Request `yuv420p` for the output pictures.",
          reference: {
            href: "#/appendix/formats/pixel-formats",
            label: pixelFormats.linkLabel,
          },
        },
      ],
      observe:
        "Find the output section of the log: it should name MP4, h264 video with yuv420p, and aac audio. Replay compatible.mp4 and listen to its sound.",
      explanation: [
        "The libx264 and AAC encoders produce the encoded video and sound streams. A **muxer** writes streams into a container; this packaging step is called **muxing**. Here, the `.mp4` ending selects the MP4 muxer to package those streams in compatible.mp4.",
        "The source already uses these formats, so this example need not look different. The command makes the choices explicit for the new file. Colour subsampling can soften fine coloured edges; this encode is not a comparison that isolates that effect.",
        "This combination is widely supported. Playback here confirms that this browser can play this file; test the actual destination player before delivering an export.",
      ],
    },
  ],
  practice:
    "Create practice-export.mp4 containing the first four seconds of bunny-short.mp4. Keep H.264 video through libx264, yuv420p picture storage and AAC sound in an MP4 container. Duration and export format are separate choices: retain the format options while adding the duration limit.",
  practiceObserve:
    "Check the output log for all three format choices, then replay the four-second file with sound. Confirm that it starts at the source's beginning and ends at the intended point.",
  hints: [
    "Start from bunny-short.mp4 and keep both picture and sound.",
    "Keep the explicit video encoder, pixel format and audio encoder from the example.",
    "Use the .mp4 ending for the requested container.",
    "Add the familiar output duration limit before the output filename.",
    "Add -t 4 and save the result as practice-export.mp4.",
  ],
  checkLimit:
    "The check verifies four seconds, video and audio, H.264 and MP4. Confirm yuv420p and AAC in the output log; replay with sound and test your destination player separately.",
};

export default copy;
