// Copyright © 2026 Christopher Snow
import { describe, it, expect } from "vitest";
import {
  buildVideoOnly,
  buildMuxAudio,
  buildCut,
  buildCropScale,
  buildProbe,
  buildStill,
  buildVolumeDetect,
  parseVolume,
  parseProbe,
} from "./commands";

describe("command builders", () => {
  it("builds the filmstrip video-only command", () => {
    expect(
      buildVideoOnly({ pattern: "still-%03d.jpg", framerate: 1 }, "film.mp4"),
    ).toEqual([
      "-y",
      "-framerate",
      "1",
      "-i",
      "still-%03d.jpg",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "film.mp4",
    ]);
  });
  it("rejects invalid filmstrip input", () => {
    expect(() =>
      buildVideoOnly({ pattern: "still-%03d.jpg", framerate: 0 }, "out.mp4"),
    ).toThrow(RangeError);
    expect(() =>
      buildVideoOnly({ pattern: "no-pattern.jpg", framerate: 1 }, "out.mp4"),
    ).toThrow(RangeError);
    expect(() =>
      buildVideoOnly(
        { pattern: "x-%03d.jpg; rm -rf /", framerate: 1 },
        "out.mp4",
      ),
    ).toThrow(RangeError);
    expect(() =>
      buildVideoOnly({ pattern: "x-%03d.jpg", framerate: 1 }, "out.mp4; x"),
    ).toThrow(RangeError);
  });
  it("builds the audio mux command", () => {
    expect(
      buildMuxAudio({ video: "film.mp4", audio: "tone.wav", output: "av.mp4" }),
    ).toEqual([
      "-y",
      "-i",
      "film.mp4",
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
      "-b:a",
      "64k",
      "-shortest",
      "av.mp4",
    ]);
  });
  it("builds copy and encode cuts from the same head", () => {
    const head = ["-y", "-ss", "0.5", "-i", "in.mp4"];
    expect(
      buildCut({
        input: "in.mp4",
        start: 0.5,
        method: "copy",
        output: "cut.mp4",
      }),
    ).toEqual([...head, "-c", "copy", "cut.mp4"]);
    expect(
      buildCut({
        input: "in.mp4",
        start: 0.5,
        method: "encode",
        output: "cut.mp4",
      }),
    ).toEqual([...head, "-c:v", "libx264", "-pix_fmt", "yuv420p", "cut.mp4"]);
    expect(() =>
      buildCut({ input: "in.mp4", start: -1, method: "copy", output: "x.mp4" }),
    ).toThrow(RangeError);
  });
  it("builds crop+scale and enforces even dimensions", () => {
    expect(
      buildCropScale({
        input: "in.mp4",
        crop: { w: 480, h: 270, x: 240, y: 135 },
        scale: { w: 960, h: 540 },
        output: "out.mp4",
      }),
    ).toContain("crop=480:270:240:135,scale=960:540");
    expect(() =>
      buildCropScale({
        input: "in.mp4",
        crop: { w: 481, h: 270, x: 0, y: 0 },
        scale: { w: 960, h: 540 },
        output: "o.mp4",
      }),
    ).toThrow(RangeError);
  });
  it("builds probe, still and volumedetect commands", () => {
    expect(buildProbe("film.mp4")).toEqual([
      "-v",
      "error",
      "-show_entries",
      "stream=index,codec_type,codec_name,width,height,sample_rate,channels,nb_frames,duration:format=format_name,duration,size",
      "-of",
      "json",
      "film.mp4",
    ]);
    expect(buildStill("in.mp4", "still.png")).toEqual([
      "-y",
      "-i",
      "in.mp4",
      "-frames:v",
      "1",
      "still.png",
    ]);
    expect(buildVolumeDetect("tone.wav")).toEqual([
      "-i",
      "tone.wav",
      "-af",
      "volumedetect",
      "-f",
      "null",
      "-",
    ]);
  });
});

describe("log parsers", () => {
  it("parses volumedetect output", () => {
    expect(
      parseVolume([
        "[Parsed_volumedetect_0 @ 0x1] n_samples: 8000",
        "[Parsed_volumedetect_0 @ 0x1] mean_volume: -21.1 dB",
        "[Parsed_volumedetect_0 @ 0x1] max_volume: -18.1 dB",
      ]),
    ).toEqual({ mean: -21.1, max: -18.1 });
    expect(parseVolume(["nothing here"])).toBeUndefined();
  });
  it("parses ffprobe JSON printed across log lines", () => {
    const json = JSON.stringify({
      streams: [
        {
          index: 0,
          codec_type: "video",
          codec_name: "h264",
          width: "960",
          height: "540",
          nb_frames: "4",
          duration: "4.000000",
        },
        {
          index: 1,
          codec_type: "audio",
          codec_name: "aac",
          sample_rate: "8000",
          channels: "1",
          duration: "3.000000",
        },
      ],
      format: {
        format_name: "mov,mp4,m4a,3gp,3g2,mj2",
        duration: "4.000000",
        size: "34473",
      },
    });
    const lines = json.split("\n");
    const result = parseProbe(["some preamble", ...lines, "trailing noise"]);
    expect(result).toBeDefined();
    expect(result!.formatName).toBe("mov,mp4,m4a,3gp,3g2,mj2");
    expect(result!.duration).toBe(4);
    expect(result!.size).toBe(34473);
    expect(result!.streams).toHaveLength(2);
    expect(result!.streams[0]).toMatchObject({
      index: 0,
      codecType: "video",
      codecName: "h264",
      width: 960,
      height: 540,
      nbFrames: 4,
    });
    expect(result!.streams[1]).toMatchObject({
      index: 1,
      codecType: "audio",
      codecName: "aac",
      sampleRate: 8000,
      channels: 1,
    });
  });
  it("returns undefined for unparseable probe output", () => {
    expect(parseProbe(["no json here"])).toBeUndefined();
    expect(parseProbe(["{ not json }"])).toBeUndefined();
    expect(parseProbe(['{"streams": "nope"}'])).toBeUndefined();
  });
});
