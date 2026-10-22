// Copyright © 2026 Christopher Snow
// Pure builders for the FFmpeg commands the lessons run in the browser worker.
// Unit-tested separately from worker media execution.

export interface FilmstripInput {
  readonly pattern: string;
  readonly framerate: number;
}

/** Encode a numbered picture sequence into a video-only MP4. */
export function buildVideoOnly(
  input: FilmstripInput,
  output: string,
): string[] {
  if (!(input.framerate > 0) || !Number.isFinite(input.framerate))
    throw new RangeError("Frame rate must be a positive number");
  if (!/^[%0-9a-zA-Z._-]+$/.test(input.pattern) || !input.pattern.includes("%"))
    throw new RangeError("Pattern must be a plain filename containing %");
  if (!/^[%0-9a-zA-Z._-]+$/.test(output))
    throw new RangeError("Output name must be a plain filename");
  return [
    "-y",
    "-framerate",
    String(input.framerate),
    "-i",
    input.pattern,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    output,
  ];
}

export interface MuxInput {
  readonly video: string;
  readonly audio: string;
  readonly output: string;
  readonly audioBitrate?: string;
}

/** Mux a video-only MP4 with a WAV into an audio+video MP4 (video copied, audio encoded AAC). */
export function buildMuxAudio(input: MuxInput): string[] {
  for (const name of [input.video, input.audio, input.output])
    if (!/^[%0-9a-zA-Z._-]+$/.test(name))
      throw new RangeError("Filenames must be plain names");
  return [
    "-y",
    "-i",
    input.video,
    "-i",
    input.audio,
    "-map",
    "0:v:0",
    "-map",
    "1:a:0",
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-b:a",
    input.audioBitrate ?? "64k",
    "-shortest",
    input.output,
  ];
}

export interface CutInput {
  readonly input: string;
  readonly start: number;
  readonly method: "copy" | "encode";
  readonly output: string;
}

/** Cut from `start` seconds to the end: stream copy or accurate trim-and-encode. */
export function buildCut(input: CutInput): string[] {
  if (!(input.start >= 0) || !Number.isFinite(input.start))
    throw new RangeError("Start must be a non-negative number");
  if (
    !/^[%0-9a-zA-Z._-]+$/.test(input.input) ||
    !/^[%0-9a-zA-Z._-]+$/.test(input.output)
  )
    throw new RangeError("Filenames must be plain names");
  const head = ["-y", "-ss", String(input.start), "-i", input.input];
  return input.method === "copy"
    ? [...head, "-c", "copy", input.output]
    : [...head, "-c:v", "libx264", "-pix_fmt", "yuv420p", input.output];
}

export interface CropScaleInput {
  readonly input: string;
  readonly crop: {
    readonly w: number;
    readonly h: number;
    readonly x: number;
    readonly y: number;
  };
  readonly scale: { readonly w: number; readonly h: number };
  readonly output: string;
}

/** Crop a region and scale it back up so small UI text stays readable. */
export function buildCropScale(input: CropScaleInput): string[] {
  const { crop, scale } = input;
  for (const n of [crop.w, crop.h, crop.x, crop.y, scale.w, scale.h])
    if (!Number.isInteger(n) || n < 0)
      throw new RangeError("Geometry must be non-negative integers");
  if (crop.w % 2 || crop.h % 2 || scale.w % 2 || scale.h % 2)
    throw new RangeError("Dimensions must be even for yuv420p");
  if (
    !/^[%0-9a-zA-Z._-]+$/.test(input.input) ||
    !/^[%0-9a-zA-Z._-]+$/.test(input.output)
  )
    throw new RangeError("Filenames must be plain names");
  return [
    "-y",
    "-i",
    input.input,
    "-vf",
    `crop=${crop.w}:${crop.h}:${crop.x}:${crop.y},scale=${scale.w}:${scale.h}`,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    input.output,
  ];
}

/** Probe a media file and print JSON to the log stream. */
export function buildProbe(file: string): string[] {
  if (!/^[%0-9a-zA-Z._-]+$/.test(file))
    throw new RangeError("Filename must be a plain name");
  return [
    "-v",
    "error",
    "-show_entries",
    "stream=index,codec_type,codec_name,width,height,sample_rate,channels,nb_frames,duration:format=format_name,duration,size",
    "-of",
    "json",
    file,
  ];
}

/** Extract the first video frame of a file as a PNG still. */
export function buildStill(input: string, output: string): string[] {
  if (!/^[%0-9a-zA-Z._-]+$/.test(input) || !/^[%0-9a-zA-Z._-]+$/.test(output))
    throw new RangeError("Filenames must be plain names");
  return ["-y", "-i", input, "-frames:v", "1", output];
}

/** Measure audio levels; the mean/max lines arrive on the log stream. */
export function buildVolumeDetect(input: string): string[] {
  if (!/^[%0-9a-zA-Z._-]+$/.test(input))
    throw new RangeError("Filename must be a plain name");
  return ["-i", input, "-af", "volumedetect", "-f", "null", "-"];
}

/** Parse mean/max volume (dB) from volumedetect log lines. */
export function parseVolume(
  log: readonly string[],
): { mean: number; max: number } | undefined {
  let mean: number | undefined, max: number | undefined;
  for (const line of log) {
    const m = /mean_volume:\s*(-?[\d.]+)\s*dB/.exec(line);
    if (m) mean = Number(m[1]);
    const x = /max_volume:\s*(-?[\d.]+)\s*dB/.exec(line);
    if (x) max = Number(x[1]);
  }
  return mean !== undefined && max !== undefined ? { mean, max } : undefined;
}

export interface ProbeStream {
  readonly index: number;
  readonly codecType: string;
  readonly codecName: string;
  readonly width?: number;
  readonly height?: number;
  readonly sampleRate?: number;
  readonly channels?: number;
  readonly nbFrames?: number;
  readonly duration?: number;
}
export interface ProbeResult {
  readonly formatName: string;
  readonly duration?: number;
  readonly size?: number;
  readonly streams: readonly ProbeStream[];
}

/** Reassemble ffprobe JSON printed across log lines and parse it. */
export function parseProbe(log: readonly string[]): ProbeResult | undefined {
  const text = log.join("\n");
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(text.slice(start, end + 1));
  } catch {
    return undefined;
  }
  if (!parsed || typeof parsed !== "object") return undefined;
  const p = parsed as {
    streams?: unknown;
    format?: { format_name?: string; duration?: string; size?: string };
  };
  if (!Array.isArray(p.streams) || !p.format) return undefined;
  const num = (v: unknown) =>
    typeof v === "string" && v !== "" ? Number(v) : undefined;
  const streams: ProbeStream[] = p.streams.map((s) => {
    const st = s as Record<string, unknown>;
    return {
      index: Number(st.index),
      codecType: String(st.codec_type),
      codecName: String(st.codec_name),
      width: num(st.width),
      height: num(st.height),
      sampleRate: num(st.sample_rate),
      channels: num(st.channels),
      nbFrames: num(st.nb_frames),
      duration: num(st.duration),
    };
  });
  return {
    formatName: String(p.format.format_name),
    duration: num(p.format.duration),
    size: num(p.format.size),
    streams,
  };
}
