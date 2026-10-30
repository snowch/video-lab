// Copyright © 2026 Christopher Snow
import type { CommandReferenceGroup } from "./command-reference";
import { courseCopy } from "./copy";

export const commandReferenceUI = {
  title: "Command option reference",
  intro:
    "Look up the syntax taught in the current lessons and optional guides. Examples beginning with a tool name are full commands; other examples are fragments. Follow each lesson link for the full command and explanation.",
  scope:
    "This appendix is for lookup whenever you need it. Search by option, filter or purpose. Native capture and batch examples require an installed tool and a terminal; browser command cells do not run shell scripts.",
  helpTitle: "Ask the installed browser tool for help",
  helpIntro:
    "Run ffmpeg -h to print this browser build’s general command help. It reads no media and creates no output file. The result below is the tool’s actual log; the searchable entries explain the options used in this course.",
  helpCommand: "ffmpeg -h",
  search: "Search syntax or purpose",
  category: "Purpose",
  all: "All purposes",
  clear: "Clear search and purpose",
  count: (n: number) => `${n} ${n === 1 ? "entry" : "entries"} found`,
  noResults: "No entries match. Try a shorter search or choose all purposes.",
  sourcesTitle: "Tool documentation",
  sourcesIntro:
    "These official references explain the wider syntax. Available encoders, filters and devices depend on the build; native capture devices are separate from the browser tools.",
  sources: [
    {
      label: "FFmpeg commands and option placement",
      url: "https://ffmpeg.org/ffmpeg.html#Description",
    },
    {
      label: "ffprobe report options",
      url: "https://ffmpeg.org/ffprobe.html#Main-options",
    },
    {
      label: "FFmpeg filter syntax and filters",
      url: "https://ffmpeg.org/ffmpeg-filters.html#Filtergraph-syntax",
    },
    {
      label: "FFmpeg formats and image sequences",
      url: "https://ffmpeg.org/ffmpeg-formats.html#image2",
    },
    {
      label: "FFmpeg encoder options",
      url: "https://ffmpeg.org/ffmpeg-codecs.html",
    },
    {
      label: "Native capture devices",
      url: "https://ffmpeg.org/ffmpeg-devices.html",
    },
    {
      label: "POSIX shell language",
      url: "https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html",
    },
  ],
};

export const commandReferenceGroups: readonly CommandReferenceGroup[] = [
  {
    id: "command-files",
    title: "Tools, files and placement",
    entries: [
      {
        id: "help",
        name: "-h",
        options: ["-h"],
        summary: "Print general help from the FFmpeg build you are running.",
        example: "ffmpeg -h",
        detail:
          "No input or output filename is needed. Run the help cell on this page to read the installed browser tool’s actual output. Its list includes options beyond the course reference.",
        href: "#/appendix/commands",
        link: "Command help cell",
        aliases: ["help", "options", "documentation", "build"],
      },
      {
        id: "ffmpeg",
        name: "ffmpeg",
        summary: "Process media and write an output file.",
        example: "ffmpeg -i bunny-short.mp4 -ss 2 -t 4 later.mp4",
        detail:
          "The tool name comes first. Input options precede their own -i; output options precede the output path. Global options govern the command and usually belong near the tool name. Here bunny-short.mp4 is the input, later.mp4 is the output, and four seconds are kept from second two. Options apply to the next file unless they are global, and per-file settings reset between files.",
        href: "#/learn/first-edit/start",
        link: courseCopy.pages["first-edit/start"]!.title,
        aliases: ["command structure", "placement", "argument", "global"],
      },
      {
        id: "ffprobe",
        name: "ffprobe",
        summary: "Inspect a file without writing a media output.",
        example: "ffprobe bunny-short.mp4",
        detail:
          "The filename is a positional input: ffprobe does not need -i or an output filename here. Its report options go before the input. FFmpeg and ffprobe have different options and purposes.",
        href: "#/learn/inside-video/inspect",
        link: courseCopy.pages["inside-video/inspect"]!.title,
        aliases: ["metadata", "tool", "information"],
      },
      {
        id: "input",
        name: "-i",
        options: ["-i"],
        summary: "Introduce an input file or native capture source.",
        example: "-i bunny-short.mp4",
        detail:
          "The next argument names the input. Repeat -i for another source; inputs are numbered 0, 1 and so on in their command order. Options for a particular input go before its -i.",
        href: "#/learn/first-edit/shorten",
        link: courseCopy.pages["first-edit/shorten"]!.title,
        aliases: ["read", "source"],
      },
      {
        id: "filenames",
        name: "Input and output paths",
        summary:
          "Use actual file names; the final output path is not an option.",
        example: "previews/short.mp4",
        detail:
          "A path can include a folder. Other taught files include landscape.jpg, captions.srt and fonts/DejaVuSans.ttf. Use the corresponding files in the browser workspace. An output suffix such as .mp4, .wav or .m4a lets FFmpeg choose a container writer; renaming an existing file does not convert its content.",
        href: "#/learn/workflows/reuse",
        link: courseCopy.pages["workflows/reuse"]!.title,
        aliases: ["filename", "folder", "extension", "muxer", "container"],
      },
      {
        id: "quotes",
        name: '"…"',
        summary: "Keep a filename or filtergraph together as one argument.",
        example:
          '-vf "subtitles=captions.srt:fontsdir=fonts:force_style=Fontname=DejaVu Sans"',
        detail:
          "Quotes keep the space in DejaVu Sans inside the filter argument. Parsing removes the quotes; they are not part of the filename or value. Browser cells support argument quoting, but do not execute shell variables, loops, pipes, redirection or wildcard expansion.",
        href: "#/learn/text/subtitles",
        link: courseCopy.pages["text/subtitles"]!.title,
        aliases: ["quotes", "spaces", "argument", "shell"],
      },
      {
        id: "overwrite",
        name: "-y",
        options: ["-y"],
        summary: "Allow an existing output file to be overwritten.",
        example: "-y",
        detail:
          "This is a global option; put it near ffmpeg. After a filename collision the browser offers to add it and rerun. Choose a fresh output name if you want to retain the existing file. Overwriting replaces that output.",
        href: "#/learn/workflows/reuse",
        link: courseCopy.pages["workflows/reuse"]!.title,
        aliases: ["replace", "collision", "existing file"],
      },
    ],
  },
  {
    id: "time-input",
    title: "Duration, seeking and input pace",
    entries: [
      {
        id: "duration",
        name: "-t",
        options: ["-t"],
        summary: "Limit how long the output lasts.",
        example: "-t 5",
        detail:
          "The lessons place this output option before the output filename. Five means five seconds of duration, not source end time. It cannot extend a shorter source. This command option is separate from t=out inside an afade filter.",
        href: "#/learn/first-edit/shorten",
        link: courseCopy.pages["first-edit/shorten"]!.title,
        aliases: ["trim", "length", "seconds"],
      },
      {
        id: "seek",
        name: "-ss",
        options: ["-ss"],
        summary: "Choose where processing starts; placement affects seeking.",
        example: "ffmpeg -i bunny-short.mp4 -ss 2 -t 4 later.mp4",
        detail:
          "After the input, -ss decodes and discards up to the requested timestamp. Before -i, it seeks to an available seek point: transcoding normally discards the extra segment, while stream copying can preserve it. Copying can therefore affect the opening and duration. Neither placement gives arbitrary sub-frame precision.",
        href: "#/learn/cut-join/keyframes",
        link: courseCopy.pages["cut-join/keyframes"]!.title,
        aliases: ["start", "timestamp", "accuracy", "seek"],
      },
      {
        id: "loop",
        name: "-loop 1",
        options: ["-loop"],
        summary: "Keep supplying a still image as input.",
        example: "-loop 1 -i landscape.jpg -t 5",
        detail:
          "For this still-image input, 1 turns looping on; it is not a repeat count. Put it before the image's -i. The output duration limit supplies a finite endpoint. This does not change a player's replay setting.",
        href: "#/learn/image-video/hold",
        link: courseCopy.pages["image-video/hold"]!.title,
        aliases: ["photo", "repeat", "Boolean"],
      },
      {
        id: "framerate",
        name: "-framerate",
        options: ["-framerate"],
        summary:
          "Set the input pace of an image sequence or supported capture device.",
        example: "-framerate 1/2 -i drawing-%02d.png",
        detail:
          "Place it before that input's -i. Here 1/2 means one new image every two seconds; the lessons also use 1, 3 and 6. Native capture requests 15 pictures per second. This input setting is separate from the output fps filter.",
        href: "#/learn/image-video/sequence",
        link: courseCopy.pages["image-video/sequence"]!.title,
        aliases: ["slideshow", "animation", "frame rate"],
      },
      {
        id: "image-pattern",
        name: "%02d",
        summary: "Read numbered images through FFmpeg's image2 pattern.",
        example: "drawing-%02d.png\nframe-%02d.png",
        detail:
          "The integer has at least two digits, with leading zeros: drawing-01.png, drawing-02.png and so on. Keep the pattern in the command. FFmpeg expands it; it is neither a shell wildcard nor a placeholder for you to replace with one filename.",
        href: "#/learn/image-video/sequence",
        link: courseCopy.pages["image-video/sequence"]!.title,
        aliases: ["pattern", "percent", "filename", "numbered", "animation"],
      },
    ],
  },
  {
    id: "streams-encoding",
    title: "Streams, encoding and output format",
    entries: [
      {
        id: "disable-streams",
        name: "-an / -vn",
        options: ["-an", "-vn"],
        summary: "Leave audio or video out of the output.",
        example: "-an\n-vn",
        detail:
          "In the taught output position, -an disables audio and -vn disables video. Put the chosen option before the output filename. These options can also have input scope in other FFmpeg commands.",
        href: "#/learn/inside-video/streams",
        link: courseCopy.pages["inside-video/streams"]!.title,
        aliases: ["silent", "extract audio", "remove"],
      },
      {
        id: "stream-labels",
        name: ":v, :a, [0:v], [v]",
        summary: "Identify stream types and connect filter inputs and outputs.",
        example: '[0:v][0:a][1:v][1:a]\n-map "[v]" -map "[a]"',
        detail:
          "Video uses v and audio uses a. In -c:v and -c:a these are stream specifiers. In a filtergraph, [0:v] links video from input 0; [1:a] links audio from input 1. The labels [v] and [a] name filter outputs, which -map then selects. Brackets belong to filter syntax.",
        href: "#/learn/cut-join/join",
        link: courseCopy.pages["cut-join/join"]!.title,
        aliases: [
          "brackets",
          "selector",
          "indices",
          "zero",
          "stream specifiers",
        ],
      },
      {
        id: "map",
        name: "-map",
        options: ["-map"],
        summary: "Select streams for an output.",
        example: '-map "[v]" -map "[a]"',
        detail:
          "These two options select the labelled video and audio outputs from the join filtergraph. Put them before the output filename. Mapping chooses content; it does not choose an encoder.",
        href: "#/learn/cut-join/join",
        link: courseCopy.pages["cut-join/join"]!.title,
        aliases: ["selection", "labels"],
      },
      {
        id: "copy",
        name: "-c copy",
        options: ["-c"],
        summary: "Copy selected encoded streams without re-encoding.",
        example: "-c copy",
        detail:
          "Use before the output filename. Without a stream-type suffix this applies to all matching selected output streams; it does not automatically select every input stream. You cannot filter the same streams while copying their encoded packets.",
        href: "#/learn/cut-join/copy",
        link: courseCopy.pages["cut-join/copy"]!.title,
        aliases: ["codec", "lossless", "packets", "stream copy"],
      },
      {
        id: "video-codec",
        name: "-c:v libx264",
        options: ["-c:v"],
        summary: "Choose the H.264 video encoder used in the lessons.",
        example: "-c:v libx264",
        detail:
          "This output setting selects libx264 for video. Put it before the output filename. When omitted, the selected output format and available build determine the default encoder. Codec selection itself does not select streams.",
        href: "#/learn/quality/quality",
        link: courseCopy.pages["quality/quality"]!.title,
        aliases: ["encode", "compression", "H.264"],
      },
      {
        id: "audio-codec",
        name: "-c:a",
        options: ["-c:a"],
        summary: "Choose an audio encoder.",
        example: "-c:a aac\n-c:a pcm_s16le",
        detail:
          "Put before the output filename. The export lesson uses AAC; the native codec guide uses pcm_s16le for 16-bit signed little-endian PCM in reference.wav. These values choose audio coding, not a container or stream selection.",
        href: "#/learn/export/format",
        link: courseCopy.pages["export/format"]!.title,
        aliases: ["sound", "codec", "PCM"],
      },
      {
        id: "crf",
        name: "-crf",
        options: ["-crf"],
        summary: "Set libx264's constant quality control.",
        example: "-c:v libx264 -crf 18",
        detail:
          "This output encoder setting uses lower values to retain more detail, generally with more bits. The lesson compares 18 and 35, then tries 26. It does not promise an exact bitrate or file size.",
        href: "#/learn/quality/quality",
        link: courseCopy.pages["quality/quality"]!.title,
        aliases: ["compression", "detail", "size"],
      },
      {
        id: "preset",
        name: "-preset",
        options: ["-preset"],
        summary: "Choose libx264's encoding effort and compression trade-off.",
        example: "-c:v libx264 -crf 26 -preset ultrafast",
        detail:
          "Put this encoder setting before the output filename. The lesson also uses fast. Presets affect encoding work, not playback speed; a fixed speed or size ranking is not guaranteed for every source and browser.",
        href: "#/learn/quality/speed",
        link: courseCopy.pages["quality/speed"]!.title,
        aliases: ["effort", "performance"],
      },
      {
        id: "pixel-format",
        name: "-pix_fmt yuv420p",
        options: ["-pix_fmt"],
        summary: "Request the output picture's pixel representation.",
        example: "-pix_fmt yuv420p",
        detail:
          "Place before the output filename. yuv420p uses 8-bit planar luma and colour-difference samples with 4:2:0 colour sampling. In these libx264 examples width and height must be even. This is not a codec, container or universal playback guarantee.",
        href: "#/learn/export/format",
        link: courseCopy.pages["export/format"]!.title,
        aliases: ["colour", "chroma", "pixel format", "compatibility"],
      },
      {
        id: "sample-rate",
        name: "-ar",
        options: ["-ar"],
        summary: "Set the output audio sample rate in hertz.",
        example: "-vn -ar 24000",
        detail:
          "The lesson also uses 16000. Put this output setting before the filename. Resampling changes samples per second while preserving playback pace; it does not set bitrate. The selected encoder must support the requested sample rate.",
        href: "#/learn/frames-time/samples",
        link: courseCopy.pages["frames-time/samples"]!.title,
        aliases: ["Hz", "resample", "sound", "sample rate"],
      },
      {
        id: "faststart",
        name: "-movflags +faststart",
        options: ["-movflags"],
        summary: "Move the MP4 index metadata to the beginning of the file.",
        example: "-c copy -movflags +faststart",
        detail:
          "This output MOV/MP4-family setting performs a second pass; the plus sign adds the flag. It can aid progressive delivery, but does not re-encode or guarantee smooth playback or faster networking.",
        href: "#/learn/export/faststart",
        link: courseCopy.pages["export/faststart"]!.title,
        aliases: ["moov", "index", "download", "metadata"],
      },
    ],
  },
  {
    id: "filters",
    title: "Picture, sound and text filters",
    intro:
      "A filtergraph describes processing steps and how they connect. An option introduces the graph; filter names and their arguments live inside it. Colons separate arguments, commas chain filters, and brackets link streams. Filtered streams need re-encoding.",
    entries: [
      {
        id: "vf",
        name: "-vf",
        options: ["-vf"],
        summary: "Apply a simple video filtergraph.",
        example: '-vf "fps=12"',
        detail:
          "Put before the output filename. The next argument describes the processing. fps is a filter name and 12 is its value; neither is another command option.",
        href: "#/learn/frames-time/rate",
        link: courseCopy.pages["frames-time/rate"]!.title,
        aliases: ["video filter", "graph"],
      },
      {
        id: "af",
        name: "-af",
        options: ["-af"],
        summary: "Apply a simple audio filtergraph.",
        example: '-af "volume=0.5"',
        detail:
          "Put before the output filename. The next argument names the sound processing and its parameters. volume=0.5 belongs inside the graph, not among the command options.",
        href: "#/learn/sound/level",
        link: courseCopy.pages["sound/level"]!.title,
        aliases: ["audio filter", "graph"],
      },
      {
        id: "complex",
        name: "-filter_complex",
        options: ["-filter_complex"],
        summary:
          "Describe processing that can connect several inputs or outputs.",
        example: "-filter_complex overlay",
        detail:
          "This is a global graph option, not a per-file video setting. The overlay example combines the first picture with the second image. The join lesson uses labelled video and audio links and maps the resulting outputs.",
        href: "#/learn/image-video/overlay",
        link: courseCopy.pages["image-video/overlay"]!.title,
        aliases: ["multiple", "combine", "graph"],
      },
      {
        id: "fps",
        name: "fps",
        summary:
          "Drop or duplicate pictures to produce a constant output rate.",
        example: "fps=12",
        detail:
          "Used inside -vf. The lessons use 6, 12 and 24 pictures per second. This does not simply speed up or slow down playback. For sequences, input -framerate sets the pace of new images; fps=24 repeats them for regular output cadence.",
        href: "#/learn/frames-time/rate",
        link: courseCopy.pages["frames-time/rate"]!.title,
        aliases: ["frame rate", "cadence"],
      },
      {
        id: "scale",
        name: "scale",
        summary: "Resize the picture to a width and height.",
        example: "scale=640:-2",
        detail:
          "Used inside -vf; arguments are width:height. Here the width is 640, and -2 calculates height from the input proportions while making it divisible by two. It is a numeric filter value, not an option. Rounding can slightly alter proportions. The lessons also use widths 320, 480 and 360. Enlarging cannot recover missing detail.",
        href: "#/learn/framing/scale",
        link: courseCopy.pages["framing/scale"]!.title,
        aliases: ["resolution", "aspect ratio", "negative", "dimensions"],
      },
      {
        id: "crop",
        name: "crop",
        summary: "Remove picture edges to keep a smaller area.",
        example: "crop=480:480",
        detail:
          "Used inside -vf; arguments give output width:height. Without x and y positions the crop is centred. The practice uses 360:360. Cropping does not shrink the whole source into a square.",
        href: "#/learn/framing/crop",
        link: courseCopy.pages["framing/crop"]!.title,
        aliases: ["square", "centre", "edges"],
      },
      {
        id: "pad",
        name: "pad",
        summary: "Place the picture inside a larger canvas.",
        example: "scale=480:-2,pad=480:480:(ow-iw)/2:(oh-ih)/2",
        detail:
          "Used inside -vf. The comma runs scale then pad. Padding arguments are width:height:x:y. ow/oh are canvas dimensions; iw/ih are the already-scaled input dimensions. Half each difference centres the picture. The default pad colour is black; the canvas must fit the input. Practice uses 360 in place of 480.",
        href: "#/learn/framing/pad",
        link: courseCopy.pages["framing/pad"]!.title,
        aliases: ["borders", "letterbox", "comma", "expression", "centre"],
      },
      {
        id: "overlay",
        name: "overlay",
        summary: "Place a second image over the main picture.",
        example: "overlay\noverlay=40:0",
        detail:
          "Used inside -filter_complex with two video inputs: main picture, then overlay. Default x/y positions are 0:0. Here 40:0 moves the overlay 40 pixels right and zero down. PNG alpha supplies transparency.",
        href: "#/learn/image-video/overlay",
        link: courseCopy.pages["image-video/overlay"]!.title,
        aliases: ["transparent", "coordinates", "annotation"],
      },
      {
        id: "concat",
        name: "concat",
        summary: "Join the supplied video-and-audio segments in order.",
        example: "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]",
        detail:
          "Used inside -filter_complex. n=2 means two segments; v=1 and a=1 mean one video and one audio output. Each segment supplies matching video/audio in the shown order. Segments must start at timestamp zero and have corresponding stream counts and compatible parameters, including matching video dimensions. The supplied fixtures meet these conditions. Map [v] and [a] to the output. Swapping input order changes the join order.",
        href: "#/learn/cut-join/join",
        link: courseCopy.pages["cut-join/join"]!.title,
        aliases: ["concatenate", "merge", "brackets", "labels"],
      },
      {
        id: "volume",
        name: "volume",
        summary: "Multiply audio sample amplitudes.",
        example: "volume=0.5",
        detail:
          "Used inside -af. The lesson uses 0.5 and 0.25 to reduce sample levels. A factor of 0.5 does not mean half as loud, and this does not set device volume. Values above 1 amplify and can clip.",
        href: "#/learn/sound/level",
        link: courseCopy.pages["sound/level"]!.title,
        aliases: ["quieter", "amplitude", "gain"],
      },
      {
        id: "afade",
        name: "afade",
        summary: "Fade sound out over a specified interval.",
        example: "afade=t=out:st=5:d=3",
        detail:
          "Used inside -af. Colons separate named filter arguments: t=out selects fade-out, st=5 starts at second five, d=3 lasts three seconds. In the eight-second example this reaches the end. Practice uses st=4:d=4. These parameters are filter syntax; t=out is separate from the command option -t.",
        href: "#/learn/sound/fade",
        link: courseCopy.pages["sound/fade"]!.title,
        aliases: ["fade out", "start", "duration", "colon"],
      },
      {
        id: "drawtext",
        name: "drawtext",
        summary: "Render text into the picture pixels.",
        example:
          "drawtext=fontfile=fonts/DejaVuSans.ttf:text=Hello:fontsize=32:fontcolor=white",
        detail:
          "Used inside -vf. fontfile names the required font file; text supplies the words, fontsize sets pixel size, and fontcolor sets colour. Colons separate these arguments. Practice changes text to Bunny and size to 40. Arbitrary punctuation needs additional FFmpeg escaping beyond these simple examples.",
        href: "#/learn/text/title",
        link: courseCopy.pages["text/title"]!.title,
        aliases: ["font", "caption", "burn in", "colon"],
      },
      {
        id: "subtitles",
        name: "subtitles",
        summary: "Burn subtitle text into the picture.",
        example:
          '"subtitles=captions.srt:fontsdir=fonts:force_style=Fontname=DejaVu Sans"',
        detail:
          "Used inside -vf. The first argument names the subtitle file. fontsdir adds a font search directory; force_style overrides the subtitle style; here it chooses the font. Quotes retain the space in DejaVu Sans. The subtitle/font files and a build with this filter are required. The result is picture pixels, not a switchable subtitle track.",
        href: "#/learn/text/subtitles",
        link: courseCopy.pages["text/subtitles"]!.title,
        aliases: ["SRT", "fonts", "captions", "burn in"],
      },
    ],
  },
  {
    id: "inspect-check",
    title: "Reports and decode checks",
    entries: [
      {
        id: "show-entries",
        name: "-show_entries",
        options: ["-show_entries"],
        summary: "Ask ffprobe for selected report sections and fields.",
        example:
          "ffprobe -show_entries frame=pts_time bunny-short.mp4\nffprobe -show_entries stream=avg_frame_rate,time_base bunny-short.mp4",
        detail:
          "Place before the input filename. The equals sign separates a section from its fields, and commas separate field names. These are report selections, not extra command options. Frame reports can contain both decoded audio and video frames.",
        href: "#/learn/frames-time/timestamps",
        link: courseCopy.pages["frames-time/timestamps"]!.title,
        aliases: [
          "pts_time",
          "avg_frame_rate",
          "time_base",
          "comma",
          "metadata",
        ],
      },
      {
        id: "show-streams",
        name: "-show_streams",
        options: ["-show_streams"],
        summary: "Print ffprobe's stream information.",
        example: "ffprobe -show_streams -show_format -of json bunny-short.mp4",
        detail:
          "Put before the input filename. This reports the streams already in the file; it does not select streams for an FFmpeg output.",
        href: "#/learn/export/verify",
        link: courseCopy.pages["export/verify"]!.title,
        aliases: ["inspect", "metadata"],
      },
      {
        id: "show-format",
        name: "-show_format",
        options: ["-show_format"],
        summary: "Print ffprobe's container and whole-file information.",
        example: "-show_format",
        detail:
          "Use before ffprobe's input filename. This requests a report section, not a format to encode or write.",
        href: "#/learn/export/verify",
        link: courseCopy.pages["export/verify"]!.title,
        aliases: ["container", "metadata", "inspect"],
      },
      {
        id: "json",
        name: "-of json",
        options: ["-of"],
        summary: "Write ffprobe's report as structured JSON text.",
        example: "-of json",
        detail:
          "Put before ffprobe's input filename. json selects the report writer; it is not an encoded video format.",
        href: "#/learn/export/verify",
        link: courseCopy.pages["export/verify"]!.title,
        aliases: ["output format", "structured", "report"],
      },
      {
        id: "xerror",
        name: "-xerror",
        options: ["-xerror"],
        summary: "Stop processing when FFmpeg encounters an error.",
        example: "ffmpeg -xerror -i bunny-short.mp4 -f null -",
        detail:
          "This global option belongs near the tool name. A decode check can reveal processing errors; success does not establish suitable content, every possible defect's absence or compatibility with a receiving device.",
        href: "#/learn/export/decode",
        link: courseCopy.pages["export/decode"]!.title,
        aliases: ["validate", "failure", "error"],
      },
      {
        id: "format",
        name: "-f",
        options: ["-f"],
        summary: "Explicitly select a format; input/output placement matters.",
        example: "-f null -",
        detail:
          "Here this output setting selects the null muxer, which discards processed output. The final dash is an output URL/stdout convention, not another option or a playable file. Before -i, -f can select an input format or a native capture device such as gdigrab, avfoundation or x11grab.",
        href: "#/learn/export/decode",
        link: courseCopy.pages["export/decode"]!.title,
        aliases: ["stdout", "dash", "null", "muxer", "device"],
      },
    ],
  },
  {
    id: "native",
    title: "Native terminal examples",
    intro:
      "The linked guides use an installed FFmpeg and a native terminal for these examples. Capture devices and shell scripts require that environment; some media options also work in the browser tools.",
    entries: [
      {
        id: "encoders",
        name: "-encoders",
        options: ["-encoders"],
        summary: "List encoders available in the installed build.",
        example: "ffmpeg -encoders",
        detail:
          "No input or output file is needed. The native preparation recipes depend on the listed encoder support; another build can have a different list.",
        href: "#/appendix/codecs",
        link: "Codec reference",
        aliases: ["capabilities", "build", "available"],
      },
      {
        id: "bitrate",
        name: "-b:a",
        options: ["-b:a"],
        summary: "Set an audio bitrate target in the native AAC recipe.",
        example: "ffmpeg -i reference.wav -c:a aac -b:a 32k aac-32.m4a",
        detail:
          "This output setting precedes the filename. k means decimal thousands of bits per second; the comparison also uses 128k. Encoder behaviour and container information prevent an exact whole-file size or bitrate guarantee.",
        href: "#/appendix/codecs",
        link: "Codec reference",
        aliases: ["audio compression", "AAC", "kilobits"],
      },
      {
        id: "devices",
        name: "-devices",
        options: ["-devices"],
        summary: "List supported input/output devices in the native build.",
        example: "ffmpeg -devices",
        detail:
          "This lists device interfaces, not physical cameras or monitors. Check that the installed build supports the interface used by your recording guide.",
        href: "#/appendix/recording",
        link: "Recording guide",
        aliases: ["capture", "capabilities"],
      },
      {
        id: "capture-formats",
        name: "gdigrab / avfoundation / x11grab",
        summary: "Select the native recording input for the relevant platform.",
        example: "-f gdigrab\n-f avfoundation\n-f x11grab",
        detail:
          "Use -f before that input's -i. gdigrab is the Windows desktop input; avfoundation is the macOS device input; x11grab requires an actual X11 Linux session. These names are values of -f, not standalone command options.",
        href: "#/appendix/recording",
        link: "Recording guide",
        aliases: ["Windows", "macOS", "Linux", "screen", "capture"],
      },
      {
        id: "list-devices",
        name: "-list_devices true",
        options: ["-list_devices"],
        summary: "List actual AVFoundation video and audio inputs on macOS.",
        example: 'ffmpeg -f avfoundation -list_devices true -i ""',
        detail:
          "The option belongs before -i. The empty quoted input is intentional and this command does not record an output. Some builds report an input-opening error after printing the list.",
        href: "#/appendix/recording",
        link: "Recording guide",
        aliases: ["enumerate", "camera", "screen index", "macOS"],
      },
      {
        id: "capture-cursor",
        name: "-capture_cursor 1",
        options: ["-capture_cursor"],
        summary: "Include the pointer in AVFoundation screen capture.",
        example: '-capture_cursor 1 -i "SCREEN_INDEX:none"',
        detail:
          "For AVFoundation, 1 turns cursor capture on. Put this input option before its -i. Replace SCREEN_INDEX with the screen's actual listed index; 0 may be a camera. The :none part selects no audio input. Windows desktop is a literal input name, not an index placeholder.",
        href: "#/appendix/recording",
        link: "Recording guide",
        aliases: ["pointer", "macOS", "placeholder"],
      },
      {
        id: "video-size",
        name: "-video_size",
        options: ["-video_size"],
        summary: "Choose the dimensions of an X11 input region.",
        example: '-video_size 1280x720 -i "${DISPLAY}+0,0"',
        detail:
          "Put before the x11grab input's -i; the region must fit the display. +0,0 in the input URL supplies the upper-left offset. This is capture size, not output scaling, and this comma is separate from filter chaining.",
        href: "#/appendix/recording",
        link: "Recording guide",
        aliases: ["Linux", "region", "offset", "dimensions"],
      },
      {
        id: "linux-session",
        name: "$XDG_SESSION_TYPE / ${DISPLAY}",
        summary:
          "Read native Linux shell variables before choosing screen capture.",
        example: "printf '%s\\n' \"$XDG_SESSION_TYPE\"",
        detail:
          "printf is a shell utility, not FFmpeg. Continue with x11grab only after identifying an actual X11 desktop session. DISPLAY supplies the X display address; an XWayland DISPLAY alone does not prove full Wayland capture works. For Wayland, use a compatible device recorder and import the result.",
        href: "#/appendix/recording",
        link: "Recording guide",
        aliases: ["variable", "shell", "Linux", "Wayland", "X11"],
      },
      {
        id: "even-capture",
        name: "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        summary: "Round captured picture dimensions down to even numbers.",
        example: "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        detail:
          "Used inside -vf in native recording. iw and ih are input width and height; trunc rounds towards zero. With positive dimensions each result is even and may be one pixel smaller. These are filter expressions, not shell arithmetic; exact proportions are not guaranteed.",
        href: "#/appendix/recording",
        link: "Recording guide",
        aliases: ["expression", "width", "height", "even", "capture"],
      },
      {
        id: "no-overwrite",
        name: "-n",
        options: ["-n"],
        summary: "Refuse to overwrite an existing output file.",
        example:
          'ffmpeg -n -i "$input" -t 5 -vf "scale=640:-2" "exports/${name%.*}-preview.mp4"',
        detail:
          "This global option goes near ffmpeg. The example belongs to the native shell script: its variables are supplied by the loop. An existing output causes refusal, and the script's set -e then stops the script.",
        href: "#/learn/workflows/batch",
        link: courseCopy.pages["workflows/batch"]!.title,
        aliases: ["existing", "overwrite", "safe", "shell"],
      },
      {
        id: "native-shell",
        name: "Native shell batch syntax",
        summary:
          "Apply the taught command to files in a native POSIX shell loop.",
        example: "for input in ./*.mp4; do",
        detail:
          'The linked script supplies the complete loop through done. #!/bin/sh selects the interpreter; set -eu enables its failure and unset-variable checks; mkdir -p exports creates the output folder if needed. [ -f "$input" ] || continue skips non-files. Quoted $input preserves spaces. name=${input##*/} removes the directory prefix; ${name%.*} removes the final extension. These variables, wildcard and shell/utility options are not FFmpeg options or browser syntax.',
        href: "#/learn/workflows/batch",
        link: courseCopy.pages["workflows/batch"]!.title,
        aliases: [
          "script",
          "shell",
          "loop",
          "wildcard",
          "variable",
          "percent",
          "mkdir",
          "set",
          "-e",
          "-u",
          "-p",
        ],
      },
    ],
  },
];
