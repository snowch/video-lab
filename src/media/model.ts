// Copyright © 2026 Christopher Snow
import fixture from "./fixture.json" with { type: "json" };
export { fixture };
export const videoStream = fixture.streams.find((s) => s.type === "video")!;
export const audioStream = fixture.streams.find((s) => s.type === "audio")!;
export const frames = fixture.frames;
export const frameCount = frames.length;
export const targetTime = 6.25;
export function frameAt(time: number) {
  if (!Number.isFinite(time)) throw new RangeError("Time must be finite");
  const t = Math.max(0, Math.min(fixture.duration, time));
  // Upper bound on measured presentation times, not time × nominal frame rate.
  let low = 0,
    high = frames.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (frames[mid]!.time <= t) low = mid + 1;
    else high = mid;
  }
  return frames[Math.max(0, low - 1)]!;
}
export function audioBlockAt(time: number) {
  return fixture.audio.findLast((a) => a.time <= time) ?? fixture.audio[0]!;
}
export function framesIn(start: number, end: number) {
  return frames.filter((f) => f.time >= start && f.time < end);
}
export const referenceAnswers = {
  video: String(videoStream.index),
  audio: String(audioStream.index),
  container: "mp4",
  codec: videoStream.codec,
  frame: String(frameAt(targetTime).index),
  timestamp: String(frameAt(targetTime).time),
};
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}media/${path}`;
