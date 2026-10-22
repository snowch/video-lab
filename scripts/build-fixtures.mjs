// Copyright © 2026 Christopher Snow
// Pre-generate the labelled fallback results for the file-building lesson:
// a video-only MP4 from the filmstrip stills, and an audio+video MP4 with the
// synthetic tone muxed in. These are visibly identified precomputed results,
// used only when the browser cannot run the WASM encoder. Provenance and
// SHA-256 are recorded beside the files.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const run = (args) => execFileSync("ffmpeg", args, { stdio: "pipe" });
const hash = (file) =>
  createHash("sha256").update(readFileSync(file)).digest("hex");
const probe = (file) =>
  JSON.parse(
    execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "stream=index,codec_type,codec_name,width,height,sample_rate,channels,nb_frames,duration:format=format_name,duration,size",
        "-of",
        "json",
        file,
      ],
      { maxBuffer: 64 * 1024 * 1024 },
    ).toString(),
  );

const dir = "public/media/build";
const videoOnly = dir + "/fallback-video-only.mp4";
const audioVideo = dir + "/fallback-audio-video.mp4";
run([
  "-y",
  "-framerate",
  "1",
  "-i",
  dir + "/still-%03d.jpg",
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  videoOnly,
]);
run([
  "-y",
  "-i",
  videoOnly,
  "-i",
  dir + "/tone.wav",
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
  audioVideo,
]);

const record = {
  description:
    "Precomputed lesson results shown only when the browser cannot run the in-browser encoder. The lesson always labels these as pre-generated, never as the learner's run.",
  generated: new Date().toISOString(),
  commands: {
    videoOnly:
      "ffmpeg -framerate 1 -i public/media/build/still-%03d.jpg -c:v libx264 -pix_fmt yuv420p -movflags +faststart public/media/build/fallback-video-only.mp4",
    audioVideo:
      "ffmpeg -i public/media/build/fallback-video-only.mp4 -i public/media/build/tone.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 64k -shortest public/media/build/fallback-audio-video.mp4",
  },
  files: {},
};
for (const name of ["fallback-video-only.mp4", "fallback-audio-video.mp4"]) {
  const file = dir + "/" + name;
  record.files[name] = {
    bytes: readFileSync(file).length,
    sha256: hash(file),
    probe: probe(file),
  };
}
writeFileSync(
  dir + "/fallback.provenance.json",
  JSON.stringify(record, null, 2) + "\n",
);
for (const [name, f] of Object.entries(record.files))
  console.log(
    name +
      ": " +
      f.bytes +
      " bytes, sha256:" +
      f.sha256.slice(0, 16) +
      "…, streams: " +
      f.probe.streams.map((s) => s.codec_name).join("+"),
  );
