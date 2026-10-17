// Copyright © 2026 Christopher Snow
import fixture from "./fixture.json" with { type: "json" };
export { fixture };
export type CutMethod = "copy" | "encode";
export type JoinOrder = "AB" | "BA";
export const cutStarts = [1, 3, 5] as const;
export const keyframes = fixture.source.frames.filter((f) => f.keyframe);
export const mediaUrl = (file: string) =>
  `${import.meta.env.BASE_URL}media/module-2/${file}`;
export function cutResult(start: number, method: CutMethod) {
  const result = fixture.results.find((r) => r.id === `${method}-${start}`);
  if (!result) throw new RangeError("Unsupported recorded cut");
  return result;
}
export function joinResult(order: JoinOrder, end: number) {
  const result = fixture.results.find((r) => r.id === `join-${order}-${end}`);
  if (!result) throw new RangeError("Unsupported recorded join");
  return result;
}
export type Result = ReturnType<typeof cutResult>;
export interface Clip {
  name: string;
  start: number;
  end: number;
}
export const clipsFor = (order: JoinOrder, end: number): Clip[] => {
  if (end !== 6 && end !== 8) throw new RangeError("Unsupported clip end");
  const a = { name: "A", start: 0, end: 2 },
    b = { name: "B", start: 4, end };
  return order === "AB" ? [a, b] : [b, a];
};
export function layout(clips: readonly Clip[]) {
  let cursor = 0;
  return clips.map((clip) => {
    if (
      !Number.isFinite(clip.start) ||
      !Number.isFinite(clip.end) ||
      clip.start < 0 ||
      clip.end <= clip.start ||
      clip.end > fixture.source.duration
    )
      throw new RangeError("Invalid source range");
    const outputStart = cursor;
    cursor += clip.end - clip.start;
    return { ...clip, outputStart, outputEnd: cursor };
  });
}
export function sourceAt(clips: readonly Clip[], outputTime: number) {
  if (!Number.isFinite(outputTime)) return null;
  const clip = layout(clips).find(
    (c) => outputTime >= c.outputStart && outputTime < c.outputEnd,
  );
  return clip
    ? { name: clip.name, time: clip.start + outputTime - clip.outputStart }
    : null;
}
export const videoFacts = (result: Result) =>
  result.streams.find((s) => s.type === "video")!;
export const sourceTime = (result: Result, outputFrame: number) =>
  fixture.source.frames[result.sourceFrames[outputFrame]!]!.time;
export const referenceAnswers = {
  method: "encode",
  order: "AB",
  reset: "yes",
  end: String(clipsFor("AB", 6)[1]!.end),
  duration: String(videoFacts(joinResult("AB", 6)).duration),
  join: String(layout(clipsFor("AB", 6))[1]!.outputStart),
};
