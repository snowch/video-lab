// Copyright © 2026 Christopher Snow
export type GlossaryEntry = {
  id: string;
  term: string;
  definition: string;
  example: string;
  lesson: string;
  aliases?: string[];
};

export const glossaryEntries: readonly GlossaryEntry[] = [
  {
    id: "alpha",
    term: "Alpha channel",
    definition:
      "Per-pixel opacity information. Zero alpha is fully transparent, maximum alpha is fully opaque, and intermediate values make partially transparent pixels when compositing.",
    example:
      "The supplied annotation PNG has transparent pixels around its orange arrow and ring, allowing the video underneath to show through.",
    lesson: "image-video/overlay",
    aliases: ["alpha", "opacity", "transparency"],
  },
  {
    id: "amplitude",
    term: "Amplitude",
    definition:
      "The size of the values describing an audio signal. Reducing amplitude usually makes sound quieter, but perceived loudness also depends on listening conditions.",
    example:
      "`volume=0.5` multiplies each audio sample by one half; it does not promise half the perceived loudness.",
    lesson: "sound/level",
    aliases: ["audio amplitude", "signal level", "volume"],
  },
  {
    id: "audio-channel",
    term: "Audio channel",
    definition:
      "A separate signal within an audio stream. A stream can contain more than one channel.",
    example:
      "The supplied source has stereo sound: left and right channels within one audio stream.",
    lesson: "inside-video/inspect",
    aliases: ["channel", "stereo"],
  },
  {
    id: "audio-sample-rate",
    term: "Audio sample rate",
    definition:
      "The number of audio measurements per second in each channel, expressed in hertz (Hz). This counts sound measurements, whereas video frame rate counts pictures.",
    example:
      "The supplied source's `48000 Hz` means 48,000 audio measurements per second per channel.",
    lesson: "frames-time/rate",
    aliases: ["sample rate", "sampling rate", "sample_rate", "Hz", "hertz"],
  },
  {
    id: "bitrate",
    term: "Bitrate",
    definition:
      "The amount of data per second of playback, measured in bits rather than bytes. Higher average whole-file bitrate means a larger file at the same duration; it does not guarantee better quality.",
    example:
      "The supplied ffprobe summary reports `352 kb/s`: about 352,000 bits per second across the whole file.",
    lesson: "quality/quality",
    aliases: ["bit rate", "kb/s", "kbps", "kilobits per second"],
  },
  {
    id: "brand",
    term: "Brand",
    definition:
      "A four-character code declaring a file's compatibility with a specification. The major brand is the primary declaration; compatible brands list further declarations, without verifying conformance.",
    example:
      "The source declares `isom`, the ISO Base Media File Format family, and `mp41`, MP4 version 1 compatibility; `isom` alone does not uniquely identify MP4.",
    lesson: "inside-video/inspect",
    aliases: [
      "file brand",
      "major_brand",
      "compatible_brands",
      "major brand",
      "compatible brands",
      "isom",
      "mp41",
    ],
  },
  {
    id: "codec",
    term: "Codec",
    definition:
      "The rules for encoding and decoding a stream's pictures or sound. A codec describes the stream's representation, while a container organises streams in a file.",
    example:
      "The supplied MP4 contains H.264 video and AAC audio: two codecs inside one container.",
    lesson: "inside-video/inspect",
    aliases: ["H.264", "h264", "AAC"],
  },
  {
    id: "constant-rate-factor",
    term: "Constant rate factor (CRF)",
    definition:
      "Libx264's quality-oriented control: lower values generally preserve more detail and use more bits. CRF sets a quality target, not a fixed bitrate or file size.",
    example:
      "The quality lesson compares `-crf 18` with `-crf 35`, using the same original source for both encodes.",
    lesson: "quality/quality",
    aliases: ["CRF", "quality target"],
  },
  {
    id: "container",
    term: "Container",
    definition:
      "A file format that organises streams so a player can find and play them. The container and the codecs inside it are separate choices.",
    example:
      "MP4 is the supplied file's container; H.264 and AAC describe its video and audio codecs.",
    lesson: "inside-video/inspect",
    aliases: ["file format", "MP4"],
  },
  {
    id: "cropping",
    term: "Cropping",
    definition:
      "Keeping a rectangular region of each picture and discarding the surrounding area. Cropping changes the field of view without resizing the retained objects in pixels.",
    example:
      "`crop=480:480` keeps a centred square from the supplied 854 × 480 picture.",
    lesson: "framing/crop",
    aliases: ["crop", "field of view"],
  },
  {
    id: "decoding",
    term: "Decoding",
    definition:
      "Reconstructing pictures or audio samples from an encoded stream. Reading the container is a separate task performed by a demuxer.",
    example:
      "To resize H.264 video, FFmpeg decodes its pictures before applying the scale filter.",
    lesson: "cut-join/copy",
    aliases: ["decoder", "decode"],
  },
  {
    id: "demuxer",
    term: "Demuxer",
    definition:
      "A container reader that identifies streams and reads their data separately. Demuxing does not itself decode the data or require separate output files.",
    example:
      "FFprobe uses a shared demuxer for MP4 and related formats to inspect the supplied video and audio streams.",
    lesson: "inside-video/inspect",
    aliases: ["demuxing", "demultiplexing", "container reader"],
  },
  {
    id: "dimensions",
    term: "Dimensions",
    definition:
      "The width and height of a picture's stored pixel grid. These counts do not measure perceived quality or the size at which a player displays the picture.",
    example:
      "`854x480` in the supplied video description means 854 pixels across and 480 down.",
    lesson: "framing/scale",
    aliases: ["resolution", "width", "height", "picture dimensions"],
  },
  {
    id: "duration",
    term: "Duration",
    definition:
      "How long a file or selected section plays. A section's duration is distinct from its end position in the source.",
    example:
      "The interval from source second 2 to second 5 lasts three seconds.",
    lesson: "first-edit/start",
    aliases: ["playback length", "length"],
  },
  {
    id: "encoding",
    term: "Encoding",
    definition:
      "Representing pictures or audio samples as data using a codec. Encoding can involve compression; encoding again cannot recover detail already lost.",
    example:
      "`-c:v libx264` selects an encoder that represents the output video using H.264.",
    lesson: "cut-join/copy",
    aliases: ["encoder", "encode", "re-encoding", "libx264"],
  },
  {
    id: "filter",
    term: "Filter",
    definition:
      "An operation that processes decoded pictures or audio samples. Applying a picture or audio filter requires decoding rather than stream copying that stream.",
    example:
      "The `scale` video filter changes picture dimensions; the `volume` audio filter changes sample amplitudes.",
    lesson: "framing/scale",
    aliases: ["video filter", "audio filter"],
  },
  {
    id: "frame",
    term: "Frame",
    definition:
      "In video, one picture made from a grid of pixels. FFprobe also uses the word for decoded blocks of audio, so check which stream an entry describes.",
    example:
      "Each video frame in the supplied source has a grid of 854 × 480 pixels.",
    lesson: "inside-video/inspect",
    aliases: ["video frame", "picture"],
  },
  {
    id: "frame-rate",
    term: "Frame rate",
    definition:
      "The number of video pictures per second, commonly written as fps. An average rate alone does not establish equal spacing between every picture.",
    example:
      "The supplied source has regularly spaced pictures at `24 fps`; its picture intervals last 1/24 second.",
    lesson: "frames-time/rate",
    aliases: ["fps", "frames per second", "picture rate", "avg_frame_rate"],
  },
  {
    id: "image-sequence",
    term: "Image sequence",
    definition:
      "Ordered still-image files treated as successive video frames. The input frame rate supplies their timing; the filenames alone do not specify a playback duration.",
    example:
      "Six supplied drawings read at 3 pictures per second occupy two seconds. The numbered pattern frame-%02d.png selects their filename order.",
    lesson: "image-video/animation",
    aliases: ["numbered images", "image2"],
  },
  {
    id: "keyframe",
    term: "Keyframe",
    definition:
      "A picture that provides a decoding starting point. Other pictures can depend on earlier ones, so a copied cut may retain material before the requested start.",
    example:
      "The keyframe lesson compares copying a cut at source second 2 with decoding and rebuilding its beginning.",
    lesson: "cut-join/keyframes",
    aliases: ["key frame", "picture dependencies"],
  },
  {
    id: "lossy-compression",
    term: "Lossy compression",
    definition:
      "Reducing the data needed by representing some picture or sound detail less precisely. A later encode cannot restore detail removed by an earlier one.",
    example:
      "The CRF comparison starts both encodes from the original practice clip, avoiding an extra generation of loss between them.",
    lesson: "quality/quality",
    aliases: ["compression", "lossy"],
  },
  {
    id: "metadata",
    term: "Metadata",
    definition:
      "Information describing media rather than its picture or sound content. Metadata can help identify properties, but cannot establish how the result looks or sounds.",
    example:
      "FFprobe reports duration and brand fields; replay is still needed to judge the edited picture and sound.",
    lesson: "export/verify",
  },
  {
    id: "muxer",
    term: "Muxer",
    definition:
      "A writer that packages streams in a container; this step is called muxing. It can package a single stream and does not itself encode pictures or sound.",
    example:
      "In the export example, libx264 and AAC encode the streams, then the MP4 muxer packages them in `compatible.mp4`.",
    lesson: "export/format",
    aliases: ["muxing", "multiplexing", "container writer"],
  },
  {
    id: "padding",
    term: "Padding",
    definition:
      "Adding canvas around a picture to make a larger output frame. The added area becomes part of the saved video.",
    example:
      "The padding lesson centres the resized full view in a square, with black bands above and below it.",
    lesson: "framing/pad",
    aliases: ["pad", "canvas", "black bands"],
  },
  {
    id: "pixel",
    term: "Pixel",
    definition:
      "One location in a picture's grid. Picture dimensions count the grid's columns and rows.",
    example: "The supplied picture is 854 pixels wide and 480 pixels high.",
    lesson: "inside-video/inspect",
    aliases: ["picture element"],
  },
  {
    id: "pixel-format",
    term: "Pixel format",
    definition:
      "How the values describing a decoded picture are stored. Pixel format is separate from the codec, container and picture dimensions.",
    example:
      "The export example selects `yuv420p`, which stores colour at a lower resolution than brightness.",
    lesson: "export/format",
    aliases: ["yuv420p", "picture storage"],
  },
  {
    id: "preset",
    term: "Preset",
    definition:
      "A group of encoder settings controlling encoding effort, rather than playback speed. Equal CRF across presets does not guarantee identical visible quality.",
    example:
      "The speed lesson compares libx264's `ultrafast` and `fast` presets while keeping CRF at 26.",
    lesson: "quality/speed",
    aliases: ["encoding preset", "encoding effort", "ultrafast"],
  },
  {
    id: "presentation-timestamp",
    term: "Presentation timestamp",
    definition:
      "The time when a picture or audio block should be presented. Stored timestamp ticks can be converted to seconds using the stream's time base.",
    example:
      "In the supplied video, the picture at tick 1024 has a presentation time of about 0.083333 seconds.",
    lesson: "frames-time/timestamps",
    aliases: ["PTS", "pts_time", "display time"],
  },
  {
    id: "raster",
    term: "Raster image",
    definition:
      "A picture stored as a grid of pixels. Displaying the grid at a larger size cannot create missing source detail.",
    example:
      "The supplied JPEG photograph and PNG drawings each have a 640 × 360 pixel grid.",
    lesson: "image-video/hold",
    aliases: ["raster", "bitmap"],
  },
  {
    id: "scaling",
    term: "Scaling",
    definition:
      "Calculating a new pixel grid to change picture dimensions. Reducing the grid can remove fine detail that later enlargement cannot recover.",
    example:
      "`scale=640:-2` resizes the supplied picture to 640 × 360 stored pixels.",
    lesson: "framing/scale",
    aliases: ["scale", "resize", "resizing"],
  },
  {
    id: "stream",
    term: "Stream",
    definition:
      "A sequence of media data within a container, such as video pictures or audio. Timing information lets a player present different streams together.",
    example:
      "The supplied MP4 has one video stream and one audio stream; its stereo channels belong to that audio stream.",
    lesson: "inside-video/inspect",
    aliases: ["video stream", "audio stream"],
  },
  {
    id: "stream-copy",
    term: "Stream copy",
    definition:
      "Transferring encoded stream data into an output file without decoding and encoding it again. The new file's container layout and metadata can still change.",
    example:
      "`-c copy` copies both selected streams in the lesson; the log's stream-mapping lines end in `(copy)`.",
    lesson: "cut-join/copy",
    aliases: ["stream copying", "copy compressed streams"],
  },
  {
    id: "subtitle",
    term: "Subtitle",
    definition:
      "Text associated with playback times; a cue pairs text with a start and end time. Burned-in subtitles become picture pixels that viewers cannot switch off separately.",
    example:
      "The supplied `captions.srt` has two cues; its second cue runs from 3 to 6 seconds.",
    lesson: "text/subtitles",
    aliases: [
      "subtitles",
      "subtitle cue",
      "SRT",
      "SubRip",
      "burned-in subtitles",
    ],
  },
  {
    id: "time-base",
    term: "Time base",
    definition:
      "The duration in seconds of one stored timestamp tick. A tick is a clock unit and need not equal one video frame interval.",
    example:
      "The source video's `1/12288` time base means each tick lasts 1/12288 second; its picture intervals span 512 ticks.",
    lesson: "frames-time/timestamps",
    aliases: ["time_base", "tick", "timestamp tick"],
  },
  {
    id: "timestamp",
    term: "Timestamp",
    definition:
      "A value locating media on a timeline. A presentation timestamp specifies when media should be displayed or played.",
    example:
      "The supplied video's presentation timestamps begin at 0, 512 and 1024 ticks, each interpreted using its video time base.",
    lesson: "frames-time/timestamps",
    aliases: ["time stamp", "timeline position"],
  },
  {
    id: "vector",
    term: "Vector graphic",
    definition:
      "A graphic described using shapes, lines and curves with their appearance. Rendering produces pixels at the chosen output size; a document can also include raster images.",
    example:
      "An SVG logo can describe scalable shapes, but an embedded photograph still has its original pixel grid.",
    lesson: "image-video/overlay",
    aliases: ["vector", "SVG"],
  },
];

export const glossaryUI = {
  title: "Glossary",
  intro:
    "Find a media term, read an example, or open the lesson that explains it in use. Search by name or a common abbreviation, such as fps or CRF.",
  search: "Find a term",
  clear: "Clear search",
  noResults:
    "No matching terms. Try another name or abbreviation, or clear the search to see every term.",
  lessonPrefix: "Learn more:",
  count: (count: number) => `${count} ${count === 1 ? "term" : "terms"}`,
} as const;
