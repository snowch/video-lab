// Copyright © 2026 Christopher Snow
export const chapters = [
  "first-edit",
  "inside-video",
  "frames-time",
  "cut-join",
  "framing",
  "sound",
  "text",
  "quality",
  "export",
  "workflows",
] as const;
export type Chapter = (typeof chapters)[number];
export type Expectation = {
  duration?: number;
  width?: number;
  height?: number;
  rate?: number;
  audio?: boolean;
  video?: boolean;
  codec?: string;
  format?: string;
  probe?: boolean;
  decode?: boolean;
};
export type PageDefinition = {
  id: string;
  chapter: Chapter;
  slug: string;
  assets: string[];
  worked: string[];
  starter: string;
  solution: string;
  expected: Expectation;
  nativeScript?: string;
};
const short = "bunny-short.mp4";
function page(
  chapter: Chapter,
  slug: string,
  worked: string[],
  starter: string,
  solution: string,
  expected: Expectation,
  assets = [short],
): PageDefinition {
  return {
    id: `${chapter}/${slug}`,
    chapter,
    slug,
    worked,
    starter,
    solution,
    expected,
    assets,
  };
}
export const pages: PageDefinition[] = [
  page(
    "first-edit",
    "shorten",
    [`ffmpeg -i ${short} -t 5 first-cut.mp4`],
    `ffmpeg -i ${short} -t 5 practice-cut.mp4`,
    `ffmpeg -i ${short} -t 3 practice-cut.mp4`,
    { duration: 3, audio: true, video: true },
  ),
  page(
    "first-edit",
    "start",
    [`ffmpeg -i ${short} -ss 2 -t 4 later.mp4`],
    `ffmpeg -i ${short} -ss 2 -t 4 practice-start.mp4`,
    `ffmpeg -i ${short} -ss 1 -t 3 practice-start.mp4`,
    { duration: 3, audio: true, video: true },
  ),
  page(
    "inside-video",
    "inspect",
    [`ffprobe ${short}`],
    `ffprobe ${short}`,
    `ffprobe ${short}`,
    { probe: true },
  ),
  page(
    "inside-video",
    "streams",
    [`ffmpeg -i ${short} -an silent.mp4`, `ffmpeg -i ${short} -vn sound.wav`],
    `ffmpeg -i ${short} -t 4 practice-silent.mp4`,
    `ffmpeg -i ${short} -t 4 -an practice-silent.mp4`,
    { duration: 4, audio: false, video: true },
  ),
  page(
    "frames-time",
    "rate",
    [`ffmpeg -i ${short} -t 4 -vf "fps=12" paced.mp4`],
    `ffmpeg -i ${short} -t 4 -vf "fps=12" practice-rate.mp4`,
    `ffmpeg -i ${short} -t 4 -vf "fps=6" practice-rate.mp4`,
    { duration: 4, rate: 6, audio: true, video: true },
  ),
  page(
    "frames-time",
    "timestamps",
    [`ffprobe -show_entries frame=pts_time ${short}`],
    `ffprobe -show_entries stream=avg_frame_rate,time_base ${short}`,
    `ffprobe -show_entries stream=avg_frame_rate,time_base ${short}`,
    { probe: true },
  ),
  page(
    "cut-join",
    "copy",
    [`ffmpeg -i ${short} -c copy copied.mp4`],
    `ffmpeg -i ${short} -c copy practice-copy.mp4`,
    `ffmpeg -i ${short} -c copy practice-copy.mp4`,
    { duration: 8, audio: true, video: true, codec: "h264" },
  ),
  page(
    "cut-join",
    "keyframes",
    [
      `ffmpeg -ss 2 -i ${short} -t 3 -c copy rough.mp4`,
      `ffmpeg -i ${short} -ss 2 -t 3 exact.mp4`,
    ],
    `ffmpeg -i ${short} -ss 2 -t 3 practice-exact.mp4`,
    `ffmpeg -i ${short} -ss 2 -t 3 practice-exact.mp4`,
    { duration: 3, audio: true, video: true },
  ),
  page(
    "cut-join",
    "join",
    [
      `ffmpeg -i ${short} -i bunny-action.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" joined.mp4`,
    ],
    `ffmpeg -i ${short} -i bunny-action.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" practice-join.mp4`,
    `ffmpeg -i bunny-action.mp4 -i ${short} -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" practice-join.mp4`,
    { duration: 14, audio: true, video: true },
    [short, "bunny-action.mp4"],
  ),
  page(
    "framing",
    "scale",
    [`ffmpeg -i ${short} -vf "scale=640:-2" scaled.mp4`],
    `ffmpeg -i ${short} -vf "scale=640:-2" practice-scale.mp4`,
    `ffmpeg -i ${short} -vf "scale=320:-2" practice-scale.mp4`,
    { duration: 8, width: 320, height: 180, audio: true, video: true },
  ),
  page(
    "framing",
    "crop",
    [`ffmpeg -i ${short} -vf "crop=480:480" square.mp4`],
    `ffmpeg -i ${short} -vf "crop=480:480" practice-square.mp4`,
    `ffmpeg -i ${short} -vf "crop=360:360" practice-square.mp4`,
    { duration: 8, width: 360, height: 360, audio: true, video: true },
  ),
  page(
    "framing",
    "pad",
    [
      `ffmpeg -i ${short} -vf "scale=480:-2,pad=480:480:(ow-iw)/2:(oh-ih)/2" padded.mp4`,
    ],
    `ffmpeg -i ${short} -vf "scale=480:-2,pad=480:480:(ow-iw)/2:(oh-ih)/2" practice-pad.mp4`,
    `ffmpeg -i ${short} -vf "scale=360:-2,pad=360:360:(ow-iw)/2:(oh-ih)/2" practice-pad.mp4`,
    { duration: 8, width: 360, height: 360, audio: true, video: true },
  ),
  page(
    "sound",
    "level",
    [`ffmpeg -i ${short} -af "volume=0.5" quieter.mp4`],
    `ffmpeg -i ${short} -af "volume=0.5" practice-level.mp4`,
    `ffmpeg -i ${short} -af "volume=0.25" practice-level.mp4`,
    { duration: 8, audio: true, video: true },
  ),
  page(
    "sound",
    "fade",
    [`ffmpeg -i ${short} -af "afade=t=out:st=5:d=3" faded.mp4`],
    `ffmpeg -i ${short} -af "afade=t=out:st=5:d=3" practice-fade.mp4`,
    `ffmpeg -i ${short} -af "afade=t=out:st=4:d=4" practice-fade.mp4`,
    { duration: 8, audio: true, video: true },
  ),
  page(
    "text",
    "title",
    [
      `ffmpeg -i ${short} -vf "drawtext=fontfile=fonts/DejaVuSans.ttf:text=Hello:fontsize=32:fontcolor=white" titled.mp4`,
    ],
    `ffmpeg -i ${short} -vf "drawtext=fontfile=fonts/DejaVuSans.ttf:text=Hello:fontsize=32:fontcolor=white" practice-title.mp4`,
    `ffmpeg -i ${short} -vf "drawtext=fontfile=fonts/DejaVuSans.ttf:text=Bunny:fontsize=40:fontcolor=white" practice-title.mp4`,
    { duration: 8, audio: true, video: true },
    [short, "fonts/DejaVuSans.ttf"],
  ),
  page(
    "text",
    "subtitles",
    [
      `ffmpeg -i ${short} -vf "subtitles=captions.srt:fontsdir=fonts:force_style=Fontname=DejaVu Sans" subtitled.mp4`,
    ],
    `ffmpeg -i ${short} -vf "subtitles=captions.srt:fontsdir=fonts:force_style=Fontname=DejaVu Sans" practice-subtitles.mp4`,
    `ffmpeg -i ${short} -vf "subtitles=captions.srt:fontsdir=fonts:force_style=Fontname=DejaVu Sans" practice-subtitles.mp4`,
    { duration: 8, audio: true, video: true },
    [short, "captions.srt", "fonts/DejaVuSans.ttf"],
  ),
  page(
    "quality",
    "quality",
    [
      `ffmpeg -i ${short} -c:v libx264 -crf 18 quality-high.mp4`,
      `ffmpeg -i ${short} -c:v libx264 -crf 35 quality-small.mp4`,
    ],
    `ffmpeg -i ${short} -c:v libx264 -crf 35 practice-quality.mp4`,
    `ffmpeg -i ${short} -c:v libx264 -crf 26 practice-quality.mp4`,
    { duration: 8, audio: true, video: true, codec: "h264" },
  ),
  page(
    "quality",
    "speed",
    [`ffmpeg -i ${short} -c:v libx264 -crf 26 -preset ultrafast fast.mp4`],
    `ffmpeg -i ${short} -c:v libx264 -crf 26 -preset ultrafast practice-speed.mp4`,
    `ffmpeg -i ${short} -c:v libx264 -crf 26 -preset fast practice-speed.mp4`,
    { duration: 8, audio: true, video: true, codec: "h264" },
  ),
  page(
    "export",
    "format",
    [
      `ffmpeg -i ${short} -c:v libx264 -pix_fmt yuv420p -c:a aac compatible.mp4`,
    ],
    `ffmpeg -i ${short} -c:v libx264 -pix_fmt yuv420p -c:a aac practice-export.mp4`,
    `ffmpeg -i ${short} -t 4 -c:v libx264 -pix_fmt yuv420p -c:a aac practice-export.mp4`,
    { duration: 4, audio: true, video: true, codec: "h264", format: "mp4" },
  ),
  page(
    "export",
    "faststart",
    [`ffmpeg -i ${short} -c copy -movflags +faststart ready.mp4`],
    `ffmpeg -i ${short} -c copy -movflags +faststart practice-ready.mp4`,
    `ffmpeg -i ${short} -c copy -movflags +faststart practice-ready.mp4`,
    { duration: 8, audio: true, video: true, codec: "h264", format: "mp4" },
  ),
  page(
    "export",
    "verify",
    [`ffprobe -show_streams -show_format -of json ${short}`],
    `ffprobe -show_streams -show_format -of json ${short}`,
    `ffprobe -show_streams -show_format -of json ${short}`,
    { probe: true },
  ),
  page(
    "export",
    "decode",
    [`ffmpeg -xerror -i ${short} -f null -`],
    `ffmpeg -xerror -i ${short} -f null -`,
    `ffmpeg -xerror -i ${short} -f null -`,
    { decode: true },
  ),
  page(
    "workflows",
    "reuse",
    [`ffmpeg -i ${short} -t 3 -vf "scale=320:-2" previews/short.mp4`],
    `ffmpeg -i ${short} -t 3 -vf "scale=320:-2" previews/practice.mp4`,
    `ffmpeg -i bunny-action.mp4 -t 2 -vf "scale=320:-2" previews/practice.mp4`,
    { duration: 2, width: 320, height: 180, audio: true, video: true },
    [short, "bunny-action.mp4"],
  ),
  {
    ...page(
      "workflows",
      "batch",
      [`ffprobe ${short}`],
      `ffprobe bunny-action.mp4`,
      `ffprobe bunny-action.mp4`,
      { probe: true },
      [short, "bunny-action.mp4"],
    ),
    nativeScript:
      '#!/bin/sh\nset -eu\nmkdir -p exports\nfor input in ./*.mp4; do\n  [ -f "$input" ] || continue\n  name=${input##*/}\n  ffmpeg -n -i "$input" -t 5 -vf "scale=640:-2" "exports/${name%.*}-preview.mp4"\ndone\n',
  },
];
export function notebookRoute(hash: string) {
  const parts = hash.replace(/^#\/?/, "").split("/");
  if (!parts[0]) return { home: true as const };
  if (parts[0] !== "learn") return undefined;
  const chapter = chapters.includes(parts[1] as Chapter)
    ? (parts[1] as Chapter)
    : chapters[0];
  const list = pages.filter((p) => p.chapter === chapter);
  return {
    home: false as const,
    page: list.find((p) => p.slug === parts[2]) ?? list[0]!,
  };
}
export function pageHref(page: PageDefinition) {
  return `#/learn/${page.id}`;
}
