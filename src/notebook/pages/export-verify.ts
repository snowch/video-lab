// Copyright © 2026 Christopher Snow
import type { PageCopy } from "../copy-types";

const page: PageCopy = {
  title: "Inspect an export as structured data",
  goal: "Find picture, sound and whole-file properties in a structured inspection report.",
  concept: [
    "An export has properties at two levels. Each stream describes one kind of media, such as pictures or sound. The container packages those streams into one file, so its properties describe the file as a whole.",
    "JSON is a text format that groups named values into objects and lists of objects. An ffprobe report can put each stream in a streams list and whole-file properties in a format object. These names make it easier to compare files or read their properties in a program.",
  ],
  worked: [
    {
      title: "Request stream and whole-file details",
      introduction: [
        "Use the known practice clip to learn the report's structure. This command inspects bunny-short.mp4 without changing it or creating an output file.",
      ],
      options: [
        {
          flag: "-show_streams",
          meaning:
            "Include an object for each media stream in the streams list.",
        },
        {
          flag: "-show_format",
          meaning:
            "Include the format object with whole-file properties, such as duration and size.",
        },
        {
          flag: "-of json",
          meaning: "Select JSON as the output format for the report.",
        },
      ],
      observe:
        "In streams, find codec_type: video and its width and height fields. Find codec_type: audio and its sample_rate field. Then find duration inside format.",
      explanation: [
        "The video dimensions are 854 × 480 pixels. The audio sample rate is 48000 samples per second, and format.duration is 8.000000 seconds. Some numeric values are quoted strings; their field names still determine their meaning and units.",
        "Stream duration belongs to one stream; format.duration belongs to the packaged file. They are equal here, but can differ slightly when streams end at different times or use different timing units.",
        "A readable report establishes that ffprobe could inspect the file's structure. It does not establish that every frame decodes correctly or that the pictures and sound are suitable for delivery.",
      ],
    },
  ],
  practice:
    "Inspect bunny-action.mp4 with both stream and whole-file details in JSON. Make a short delivery record: video codec and dimensions, audio codec and sample rate, file duration and size in bytes. Compare its duration and size with bunny-short.mp4 from the worked example.",
  practiceObserve:
    "Use codec_type to identify the video and audio objects before recording their properties. Take duration and size from format in both reports, keeping seconds and bytes with the values. Which clip is shorter, and which file is smaller? Keep the field's location with each recorded value so another person can find it.",
  hints: [
    "Use ffprobe to inspect the file without creating another media file.",
    "Keep the worked command's report options, but change its input filename to bunny-action.mp4.",
    "The command needs -show_streams -show_format -of json before bunny-action.mp4.",
    "Find codec_name, width and height in the video stream; codec_name and sample_rate in the audio stream. Compare duration and size in the two format objects.",
    "Run ffprobe -show_streams -show_format -of json bunny-action.mp4. Record format.duration in seconds and format.size in bytes, then compare those fields with the worked report for bunny-short.mp4.",
  ],
  checkLimit:
    "The check records an inspection result. Review the field values yourself, then replay the whole clip with sound to check picture quality, audio and their alignment.",
};

export default page;
