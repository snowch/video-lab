// Copyright © 2026 Christopher Snow
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
const work = resolve(".media-work");
mkdirSync(work, { recursive: true });
mkdirSync("public/media/frames", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 960, height: 540 },
  deviceScaleFactor: 1,
});
await page.goto(`file://${resolve("media-source/demo.html")}`);
for (let i = 0; i < 120; i++) {
  if (i === 48) await page.locator("#sort").click();
  await page.evaluate((i) => window.setCaptureFrame(i), i);
  await page.screenshot({
    path: `${work}/capture-${String(i).padStart(3, "0")}.png`,
  });
}
const chromiumVersion = browser.version();
await browser.close();
const args = [
  "-y",
  "-framerate",
  "12",
  "-i",
  `${work}/capture-%03d.png`,
  "-f",
  "lavfi",
  "-i",
  "sine=frequency=440:sample_rate=48000:duration=10",
  "-map",
  "0:v:0",
  "-map",
  "1:a:0",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "23",
  "-pix_fmt",
  "yuv420p",
  "-c:a",
  "aac",
  "-b:a",
  "64k",
  "-af",
  "volume=0.08",
  "-t",
  "10",
  "-movflags",
  "+faststart",
  "public/media/build-queue.mp4",
];
execFileSync("ffmpeg", args, { stdio: "pipe" });
execFileSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    "public/media/build-queue.mp4",
    "-map",
    "0:v:0",
    "-vsync",
    "0",
    "-q:v",
    "3",
    "-start_number",
    "0",
    "public/media/frames/%03d.jpg",
  ],
  { stdio: "pipe" },
);
const probeArgs = [
  "-v",
  "error",
  "-show_format",
  "-show_streams",
  "-show_frames",
  "-of",
  "json",
  "public/media/build-queue.mp4",
];
const raw = execFileSync("ffprobe", probeArgs, {
  maxBuffer: 20 * 1024 * 1024,
  encoding: "utf8",
});
writeFileSync("docs/notes/module-0/media/ffprobe.json", raw);
writeFileSync("public/media/ffprobe.json", raw);
const probe = JSON.parse(raw);
const fixture = {
  file: "build-queue.mp4",
  sha256: createHash("sha256")
    .update(readFileSync("public/media/build-queue.mp4"))
    .digest("hex"),
  duration: Number(probe.format.duration),
  format: probe.format.format_name,
  streams: probe.streams.map((s) => ({
    index: s.index,
    type: s.codec_type,
    codec: s.codec_name,
    timeBase: s.time_base,
    duration: Number(s.duration),
    ...(s.codec_type === "video"
      ? { width: s.width, height: s.height, rate: s.avg_frame_rate }
      : { sampleRate: Number(s.sample_rate), channels: s.channels }),
  })),
  frames: probe.frames
    .filter((f) => f.media_type === "video")
    .map((f, index) => ({
      index,
      pts: f.pts,
      time: Number(f.pts_time),
      duration: Number(f.duration_time ?? f.pkt_duration_time),
      image: `frames/${String(index).padStart(3, "0")}.jpg`,
    })),
  audio: probe.frames
    .filter((f) => f.media_type === "audio")
    .map((f) => ({
      pts: f.pts,
      time: Number(f.pts_time),
      samples: f.nb_samples,
    })),
  filmstrip: [0, 24, 48, 72, 96, 119],
};
writeFileSync(
  "src/media/fixture.json",
  JSON.stringify(fixture, null, 2) + "\n",
);
writeFileSync(
  "docs/notes/module-0/media/generation.json",
  JSON.stringify(
    {
      chromium: chromiumVersion,
      node: process.version,
      ffmpeg: execFileSync("ffmpeg", ["-version"], { encoding: "utf8" }).split(
        "\n",
      )[0],
      ffprobe: execFileSync("ffprobe", ["-version"], {
        encoding: "utf8",
      }).split("\n")[0],
      encodeCommand: ["ffmpeg", ...args],
      probeCommand: ["ffprobe", ...probeArgs],
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `${fixture.frames.length} captured video frames; ${fixture.audio.length} decoded audio frames; ${fixture.duration} s`,
);
