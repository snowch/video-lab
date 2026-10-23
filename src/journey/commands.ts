// Copyright © 2026 Christopher Snow
import type { MediaJob, Probe } from "../processing/engine";
export type Range = { start: number; end: number };
export function videoCommand(rate: number) {
  if (rate !== 1 && rate !== 2) throw new Error("Invalid filmstrip frame rate");
  return [
    "-framerate",
    String(rate),
    "-i",
    "frame%03d.jpg",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "video.mp4",
  ];
}
export const muxCommand = [
  "-i",
  "video.mp4",
  "-i",
  "tone.wav",
  "-map",
  "0:v:0",
  "-map",
  "1:a:0",
  "-c:v",
  "copy",
  "-c:a",
  "aac",
  "-shortest",
  "-movflags",
  "+faststart",
  "demo.mp4",
];
export function editCommand(
  name: string,
  ranges: Range[],
  duration: number,
  audio: boolean,
) {
  if (
    !Number.isFinite(duration) ||
    duration <= 0 ||
    duration > 30 ||
    !ranges.length ||
    ranges.length > 2 ||
    ranges.some(
      ({ start, end }) =>
        !Number.isFinite(start) ||
        !Number.isFinite(end) ||
        start < 0 ||
        end <= start ||
        end - start < 0.2 ||
        end > duration,
    )
  )
    throw new Error("Invalid kept ranges");
  const filters: string[] = [];
  for (const [index, range] of ranges.entries()) {
    const trim = `start=${range.start}:end=${range.end}`;
    filters.push(
      `[0:v:0]fps=12,trim=${trim},setpts=PTS-STARTPTS,scale=w='trunc(min(1280,iw)/2)*2':h=-2[v${index}]`,
    );
    if (audio)
      filters.push(`[0:a:0]atrim=${trim},asetpts=PTS-STARTPTS[a${index}]`);
  }
  const inputs = ranges
    .map((_, index) => `[v${index}]${audio ? `[a${index}]` : ""}`)
    .join("");
  filters.push(
    `${inputs}concat=n=${ranges.length}:v=1:a=${audio ? 1 : 0}[v]${audio ? "[a]" : ""}`,
  );
  return [
    "-i",
    name,
    "-filter_complex",
    filters.join(";"),
    "-map",
    "[v]",
    ...(audio ? ["-map", "[a]", "-c:a", "aac"] : ["-an"]),
    "-c:v",
    "libx264",
    "-preset",
    "ultrafast",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-r",
    "12",
    "-movflags",
    "+faststart",
    "edited-demo.mp4",
  ];
}
export function sourceFilename(blob: Blob) {
  return blob.type.includes("webm") ? "capture.webm" : "capture.mp4";
}
export function commandText(args: string[]) {
  return ["ffmpeg", ...args]
    .map((argument) =>
      /^[a-zA-Z0-9_.,:+/%=-]+$/.test(argument)
        ? argument
        : `'${argument.replaceAll("'", "'\\''")}'`,
    )
    .join(" ");
}
export function hasAudio(probe: Probe) {
  return probe.streams.some((stream) => stream.codec_type === "audio");
}
export async function fetchedInput(
  path: string,
  name: string,
): Promise<MediaJob["inputs"][number]> {
  const response = await fetch(
    new URL(path, new URL(import.meta.env.BASE_URL, location.href)),
  );
  if (!response.ok) throw new Error("Could not read lesson media");
  return { name, data: new Uint8Array(await response.arrayBuffer()) };
}
