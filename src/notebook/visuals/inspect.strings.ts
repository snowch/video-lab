// Copyright © 2026 Christopher Snow
export const inspectCopy = {
  structureTitle: "Inside the supplied file",
  container: "MP4 container",
  video: "Video stream",
  audio: "Audio stream",
  codec: "Codec",
  structureNote:
    "The supplied bunny-short.mp4 holds these two streams. This model groups them by type; their boxes do not show positions within the file.",
  guideTitle: "Read the supplied ffprobe example",
  guideNote:
    "Selected native ffprobe fields from bunny-short.mp4; ellipses mark omissions. This guide always describes the supplied source. Your command produces its own raw output.",
  inputMeaning:
    "`Input #0` identifies the first input file. FFprobe uses one reader for MP4 and related formats, including MOV and 3GP, and prints that reader’s format names here. This file is an MP4; its video and audio appear on the separate `Stream` lines below.",
  durationMeaning: [
    "`Duration` is eight seconds. The whole-file **bitrate** includes video, sound and container information. `kb/s` means kilobits per second: `352 kb/s` is about 352,000 bits per second of playback, or 44,000 bytes per second (eight bits make one byte).",
    "This is an average across the file, so individual seconds can contain different amounts of data. A bitrate on a `Stream` line describes only that stream. Bitrate does not measure playback speed.",
  ],
  videoMeaning:
    "`#0:0` means input 0, stream 0. `Video` identifies its type and `h264` its codec. `854x480` gives width and height in pixels; `24 fps` gives pictures per second.",
  audioMeaning:
    "`#0:1` means input 0, stream 1. `Audio` identifies its type and `aac` its codec. `48000 Hz` gives the audio sample rate; Frames and time explains this separately from picture rate.",
  dimensions: "The source picture",
  wide: "pixels wide",
  high: "pixels high",
  dimensionAlt:
    "A frame from bunny-short.mp4 showing its full rectangular picture.",
  splitTitle: "Choose a stream for each new file",
  splitNote:
    "Each command reads the same source and writes a separate file. The source keeps both streams.",
  videoOnly: "Video only",
  audioOnly: "Audio only",
};
