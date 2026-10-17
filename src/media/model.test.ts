// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  fixture,
  frames,
  frameAt,
  framesIn,
  audioBlockAt,
  referenceAnswers,
} from "./model";
describe("measured media and explanatory timeline", () => {
  it("pins the facts used in the lesson", () => {
    expect(fixture.duration).toBe(10);
    expect(frames).toHaveLength(120);
    expect(fixture.streams.map((s) => [s.index, s.type, s.codec])).toEqual([
      [0, "video", "h264"],
      [1, "audio", "aac"],
    ]);
    expect(fixture.streams[0]).toMatchObject({
      width: 960,
      height: 540,
      rate: "12/1",
      timeBase: "1/12288",
    });
    expect(fixture.streams[1]).toMatchObject({
      sampleRate: 48000,
      channels: 1,
    });
    expect(referenceAnswers).toEqual({
      video: "0",
      audio: "1",
      container: "mp4",
      codec: "h264",
      frame: "75",
      timestamp: "6.25",
    });
  });
  it("uses timestamps at boundaries and clamps to the last presented picture", () => {
    expect(frameAt(-1).index).toBe(0);
    expect(frameAt(0).index).toBe(0);
    expect(frameAt(frames[1]!.time - 0.000001).index).toBe(0);
    expect(frameAt(frames[1]!.time).index).toBe(1);
    expect(frameAt(10).index).toBe(119);
    expect(frameAt(100).index).toBe(119);
    expect(() => frameAt(NaN)).toThrow();
  });
  it("distinguishes frames, samples and decoded audio blocks", () => {
    expect(framesIn(0, 1)).toHaveLength(12);
    expect(audioBlockAt(1).samples).toBe(1024);
    expect(audioBlockAt(1).time).not.toBe(frameAt(1).time);
    expect(fixture.audio.length).toBeGreaterThan(frames.length);
  });
  it("all measured timestamps are ordered and the stills cover the timeline", () => {
    frames.forEach((f, i) => {
      expect(f.index).toBe(i);
      expect(f.image).toBe(`frames/${String(i).padStart(3, "0")}.jpg`);
      if (i) expect(f.time).toBeGreaterThan(frames[i - 1]!.time);
    });
  });
});
