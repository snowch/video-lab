// Copyright © 2026 Christopher Snow
import original from "../media/fixture.json" with { type: "json" };
import cuts from "../module2/fixture.json" with { type: "json" };
export type ReferenceLab = "inspect" | "edit";
export const referenceSources = {
  inspect: {
    path: "media/build-queue.mp4",
    name: "reference-inspect.mp4",
    sha256: original.sha256,
  },
  edit: {
    path: "media/module-2/build-queue-cuts.mp4",
    name: "reference-cuts.mp4",
    sha256: cuts.source.sha256,
  },
} as const;
export const inspectionCommand =
  "ffprobe -v error -show_streams -show_format -show_frames -of json reference-inspect.mp4 -o inspect-report.json";
export const joinedCommand =
  'ffmpeg -i reference-cuts.mp4 -filter_complex "[0:v:0]trim=start=0:end=2,setpts=PTS-STARTPTS[v0];[0:a:0]atrim=start=0:end=2,asetpts=PTS-STARTPTS[a0];[0:v:0]trim=start=4:end=6,setpts=PTS-STARTPTS[v1];[0:a:0]atrim=start=4:end=6,asetpts=PTS-STARTPTS[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -preset ultrafast -pix_fmt yuv420p -r 12 -c:a aac -movflags +faststart joined-check.mp4';
export type CheckItem = { id: string; pass: boolean; actual: string };
export function inspectChecks(report: unknown): CheckItem[] {
  const p = report as {
    streams?: {
      index: number;
      codec_type: string;
      codec_name: string;
      time_base: string;
    }[];
    format?: { format_name?: string; duration?: string; filename?: string };
    frames?: {
      media_type?: string;
      pts?: number;
      pts_time?: string;
      best_effort_timestamp_time?: string;
    }[];
  };
  const streams = p?.streams ?? [],
    video = streams.find((s) => s.codec_type === "video"),
    audio = streams.find((s) => s.codec_type === "audio");
  const frames = (p?.frames ?? []).filter((f) => f.media_type === "video");
  const target = frames[75],
    time = Number(target?.pts_time ?? target?.best_effort_timestamp_time);
  return [
    {
      id: "source",
      pass: p?.format?.filename === referenceSources.inspect.name,
      actual: String(p?.format?.filename ?? "missing"),
    },
    {
      id: "container",
      pass: !!p?.format?.format_name?.split(",").includes("mp4"),
      actual: p?.format?.format_name ?? "missing",
    },
    {
      id: "video",
      pass:
        video?.index === 0 &&
        video?.codec_name === "h264" &&
        video?.time_base === "1/12288",
      actual: JSON.stringify(video ?? null),
    },
    {
      id: "audio",
      pass: audio?.index === 1 && audio?.codec_name === "aac",
      actual: JSON.stringify(audio ?? null),
    },
    {
      id: "frames",
      pass: frames.length === 120,
      actual: String(frames.length),
    },
    {
      id: "timestamp",
      pass: Math.abs(time - 6.25) < 0.000001 && target?.pts === 76800,
      actual: JSON.stringify(target ?? null),
    },
  ];
}
export const gridBytes = 160 * 90 * 3;
/** Compare actual decoded RGB frames, never an assumed command result. */
export function pictureChecks(output: Uint8Array, source: Uint8Array) {
  const expected = [
    ...Array.from({ length: 24 }, (_, i) => i),
    ...Array.from({ length: 24 }, (_, i) => 48 + i),
  ];
  const count = output.length / gridBytes;
  let maxRms = Infinity;
  if (count === 48 && source.length >= 72 * gridBytes) {
    maxRms = 0;
    for (let frame = 0; frame < 48; frame++) {
      let squared = 0;
      for (let p = 0; p < gridBytes; p++) {
        const d =
          output[frame * gridBytes + p]! -
          source[expected[frame]! * gridBytes + p]!;
        squared += d * d;
      }
      maxRms = Math.max(maxRms, Math.sqrt(squared / gridBytes));
    }
  }
  return { count, maxRms, pass: count === 48 && maxRms < 2 };
}
