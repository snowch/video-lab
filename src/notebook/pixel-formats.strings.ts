// Copyright © 2026 Christopher Snow
export const pixelFormats = {
  title: "Pixel formats",
  linkLabel: "Pixel formats explained",
  intro: [
    "A pixel format describes how a picture stores its colour samples: which components, how many samples and how much precision each sample has. A video codec describes how video is encoded; a container organises encoded streams in a file.",
    "The output option `-pix_fmt yuv420p` requests 8-bit components with reduced colour sampling. Each sample uses eight bits to represent its value. The course uses it for practical H.264 delivery compatibility. Support still depends on the codec and destination.",
  ],
  samplingTitle: "How yuv420p stores a picture",
  sampling: [
    "Y is luma, a brightness-related component. U and V store colour differences. In 4:2:0 sampling, each 2 × 2 group has four Y samples but only one U and one V sample. This is a conceptual grouping, not a measurement of the photograph.",
    "In `yuv420p`, colour sampling is halved horizontally and vertically; the picture’s width and height stay unchanged. Fine coloured text and edges can soften. The p means planar: Y, U and V samples are stored in separate arrays. It does not mean progressive video.",
    "yuv420p has no alpha, the opacity information used for transparency. Converting an overlay to it before composition loses that transparency.",
  ],
  formats: [
    {
      name: "yuv422p",
      text: "8-bit planar components, with one U sample and one V sample per 2 × 1 Y samples: more vertical colour detail than yuv420p.",
    },
    {
      name: "yuv444p",
      text: "8-bit planar components, with one U sample and one V sample per Y sample. It can retain finer colour detail from the source, but the destination must support it.",
    },
    {
      name: "rgb24 / rgba",
      text: "Stores 8-bit red, green and blue values together at every pixel, without reducing their sampling resolution. rgba adds alpha for opacity.",
    },
    {
      name: "yuv420p10le",
      text: "The same 4:2:0 pattern with 10 bits per sample, allowing finer steps between values. The le suffix means the lower-order byte is stored first. Extra precision cannot restore detail already lost.",
    },
  ],
  conclusion: [
    "More samples or precision means more uncompressed picture data, not a guaranteed encoded file size or quality. Check FFmpeg’s output report: if a requested format is unsupported, FFmpeg may warn and choose another.",
  ],
  sources: [
    {
      label: "FFmpeg 5.1.4: pixel-format definitions",
      url: "https://github.com/FFmpeg/FFmpeg/blob/n5.1.4/libavutil/pixfmt.h",
    },
    {
      label: "FFmpeg: output pixel-format option",
      url: "https://ffmpeg.org/ffmpeg.html#Advanced-Video-options",
    },
  ],
} as const;
