// Copyright © 2026 Christopher Snow
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
const dir = "public/media/journey";
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const probe = (path) =>
  JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-show_format", "-show_streams", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
if (process.argv.includes("--generate")) {
  await mkdir(dir, { recursive: true });
  const count = 48000 * 3;
  const wav = Buffer.alloc(44 + count * 2);
  wav.write("RIFF");
  wav.writeUInt32LE(wav.length - 8, 4);
  wav.write("WAVEfmt ", 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(48000, 24);
  wav.writeUInt32LE(96000, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(count * 2, 40);
  for (let i = 0; i < count; i++)
    wav.writeInt16LE(
      Math.round(1800 * Math.sin((2 * Math.PI * 440 * i) / 48000)),
      44 + i * 2,
    );
  await writeFile(`${dir}/tone.wav`, wav);
  await mkdir(".media-work/journey", { recursive: true });
  for (const [index, source] of ["000", "048", "072"].entries())
    await copyFile(
      `public/media/frames/${source}.jpg`,
      `.media-work/journey/frame${String(index).padStart(3, "0")}.jpg`,
    );
  const commands = [
    [
      "-y",
      "-framerate",
      "1",
      "-i",
      ".media-work/journey/frame%03d.jpg",
      "-frames:v",
      "3",
      "-vf",
      "scale=640:360",
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      "-crf",
      "23",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      `${dir}/video-only.mp4`,
    ],
    [
      "-y",
      "-i",
      `${dir}/video-only.mp4`,
      "-i",
      `${dir}/tone.wav`,
      "-map",
      "0:v:0",
      "-map",
      "1:a:0",
      "-c:v",
      "copy",
      "-c:a",
      "aac",
      "-shortest",
      `${dir}/with-audio.mp4`,
    ],
    [
      "-y",
      "-i",
      "public/media/build-queue.mp4",
      "-filter_complex",
      "[0:v]trim=start=0:end=2,setpts=PTS-STARTPTS[v0];[0:a]atrim=start=0:end=2,asetpts=PTS-STARTPTS[a0];[0:v]trim=start=3:end=7,setpts=PTS-STARTPTS[v1];[0:a]atrim=start=3:end=7,asetpts=PTS-STARTPTS[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]",
      "-map",
      "[v]",
      "-map",
      "[a]",
      "-c:v",
      "libx264",
      "-preset",
      "ultrafast",
      "-crf",
      "23",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-movflags",
      "+faststart",
      `${dir}/edited-demo.mp4`,
    ],
  ];
  for (const args of commands) execFileSync("ffmpeg", ["-v", "error", ...args]);
  const files = {};
  for (const name of [
    "tone.wav",
    "video-only.mp4",
    "with-audio.mp4",
    "edited-demo.mp4",
  ]) {
    const data = await readFile(`${dir}/${name}`);
    files[name] = {
      bytes: data.length,
      sha256: sha(data),
      probe: probe(`${dir}/${name}`),
    };
  }
  await writeFile(
    `${dir}/evidence.json`,
    JSON.stringify(
      {
        copyright: "Copyright © 2026 Christopher Snow",
        source:
          "Original build-queue browser scene and original 440 Hz synthetic tone. Provided examples, not user-generated results.",
        version: execFileSync("ffmpeg", ["-version"], {
          encoding: "utf8",
        }).split("\n")[0],
        commands,
        files,
      },
      null,
      2,
    ) + "\n",
  );
}
const evidence = JSON.parse(await readFile(`${dir}/evidence.json`, "utf8"));
for (const [name, expected] of Object.entries(evidence.files)) {
  const data = await readFile(`${dir}/${name}`);
  if (sha(data) !== expected.sha256)
    throw new Error(`Fixture hash changed: ${name}`);
  const actual = probe(`${dir}/${name}`);
  const expectedDuration = name === "edited-demo.mp4" ? 6 : 3;
  if (Math.abs(Number(actual.format.duration) - expectedDuration) > 0.08)
    throw new Error(`Fixture does not match taught duration: ${name}`);
  if (
    name.endsWith(".mp4") &&
    actual.streams.length !== (name === "video-only.mp4" ? 1 : 2)
  )
    throw new Error(`Fixture stream count changed: ${name}`);
  if (
    JSON.stringify(
      actual.streams.map((s) => [
        s.codec_type,
        s.codec_name,
        s.width,
        s.height,
      ]),
    ) !==
    JSON.stringify(
      expected.probe.streams.map((s) => [
        s.codec_type,
        s.codec_name,
        s.width,
        s.height,
      ]),
    )
  )
    throw new Error(`Fixture stream facts changed: ${name}`);
}
console.log(
  "Verified original filmstrip/audio/edit fixtures against hashes and native ffprobe.",
);

const sample = JSON.parse(
  await readFile("docs/notes/issue-3/media/big-buck-bunny.json", "utf8"),
);
const samplePath = "public/optional/big-buck-bunny-5s.mp4";
const sampleBytes = await readFile(samplePath);
const sampleProbe = probe(samplePath);
if (
  sampleBytes.length !== sample.bytes ||
  sha(sampleBytes) !== sample.sha256 ||
  Math.abs(Number(sampleProbe.format.duration) - 5) > 0.08 ||
  sampleProbe.streams.map((s) => s.codec_name).join(",") !== "h264,aac" ||
  sampleProbe.streams[0].width !== 320 ||
  sampleProbe.streams[0].height !== 180
)
  throw new Error(
    "Optional sample differs from pinned provenance and taught facts",
  );
console.log(
  "Verified optional licensed excerpt against provenance hash and native ffprobe.",
);
