// Copyright © 2026 Christopher Snow
// Generate the original media for the editing modules (4-8). Every file derives
// from the verified build-queue recording (public/media/build-queue.mp4), the
// original extracted frames (public/media/frames/) or the synthetic tone
// (public/media/build/tone.wav). All files are original to this course; no
// third-party media is used. Provenance, sizes, SHA-256 and measured audio
// levels are recorded beside the files in public/media/edit/provenance.json.
// Without --generate the script verifies the committed files against the record.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const root = "public/media/edit/";
const manifest = root + "provenance.json";
const generate = process.argv.includes("--generate");
const runFfmpeg = (args, opts = {}) =>
  execFileSync("ffmpeg", args, { maxBuffer: 250 * 1024 * 1024, ...opts });
const runFfprobe = (args, opts = {}) =>
  execFileSync("ffprobe", args, { maxBuffer: 250 * 1024 * 1024, ...opts });
const hash = (file) =>
  createHash("sha256").update(readFileSync(file)).digest("hex");
const FONT = "/tmp/libs/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";

function probe(file) {
  const p = JSON.parse(
    runFfprobe([
      "-v",
      "error",
      "-show_entries",
      "stream=index,codec_type,codec_name,width,height,sample_rate,channels:format=format_name,duration,size",
      "-of",
      "json",
      file,
    ]).toString(),
  );
  return {
    duration: Number(p.format.duration),
    size: Number(p.format.size),
    streams: p.streams.map((s) => ({
      type: s.codec_type,
      codec: s.codec_name,
      ...(s.codec_type === "video"
        ? { width: s.width, height: s.height }
        : { sampleRate: Number(s.sample_rate), channels: s.channels }),
    })),
  };
}

function volume(file) {
  // volumedetect reports on stderr, and this FFmpeg build exits non-zero from
  // the null muxer even on success; spawnSync keeps both streams either way.
  const result = spawnSync(
    "ffmpeg",
    ["-hide_banner", "-i", file, "-af", "volumedetect", "-f", "null", "-"],
    { encoding: "utf8" },
  );
  const log = String(result.stdout ?? "") + String(result.stderr ?? "");
  const mean = /mean_volume:\s*(-?[\d.]+)\s*dB/.exec(log);
  const max = /max_volume:\s*(-?[\d.]+)\s*dB/.exec(log);
  if (!mean || !max)
    throw new Error(`volumedetect produced no levels for ${file}`);
  return { mean: Number(mean[1]), max: Number(max[1]) };
}

const x264 = ["-c:v", "libx264", "-pix_fmt", "yuv420p"];
const commands = [];
function encode(args) {
  commands.push(["ffmpeg", "-y", ...args]);
  runFfmpeg(["-v", "error", "-y", ...args]);
}

const record = {
  description:
    "Original media for the editing modules (4-8): every file derives from the verified build-queue recording (public/media/build-queue.mp4), the original extracted frames (public/media/frames/) or the synthetic tone (public/media/build/tone.wav). All files are original to this course; no third-party media is used.",
  generated: "2026-10-22T01:10:00.000Z",
  ffmpeg: runFfmpeg(["-version"]).toString().split("\n")[0],
  files: {},
};
function add(name, command, note, extra = {}) {
  const file = root + name;
  record.files[name] = {
    command,
    note,
    bytes: readFileSync(file).length,
    sha256: hash(file),
    ...(name.endsWith(".wav") || name.endsWith(".mp4") ? probe(file) : {}),
    ...(name.endsWith(".wav") ? { volume: volume(file) } : {}),
    ...extra,
  };
}

if (generate) {
  mkdirSync(root, { recursive: true });
  const src = "public/media/build-queue.mp4";
  // Module 4: readability. Crop the centre half and scale it back up.
  encode([
    "-i",
    src,
    "-vf",
    "crop=480:270:240:135,scale=960:540:flags=lanczos",
    ...x264,
    root + "cropped-zoom.mp4",
  ]);
  // A plain scale-down of the whole picture (the contrast case).
  encode([
    "-i",
    src,
    "-vf",
    "scale=640:360",
    ...x264,
    root + "half-size-crf23.mp4",
  ]);
  // Callouts: persistent and timed, drawn with the sandbox's DejaVu Sans.
  const drawtext =
    `drawtext=fontfile=${FONT}:text='Build queue - sorted by duration'` +
    `:fontcolor=white:fontsize=28:x=20:y=20:box=1:boxcolor=black@0.6:boxborderw=8`;
  encode(["-i", src, "-vf", drawtext, ...x264, root + "callout.mp4"]);
  encode([
    "-i",
    src,
    "-vf",
    `${drawtext}:enable='between(t,3,5)'`,
    ...x264,
    root + "timed-callout.mp4",
  ]);
  // Module 4/3 transition aids: a zoom-pan hold and a crossfade between stills.
  encode([
    "-loop",
    "1",
    "-t",
    "6",
    "-i",
    "public/media/frames/048.jpg",
    ...x264,
    "-r",
    "30",
    root + "zoom-pan.mp4",
  ]);
  encode([
    "-loop",
    "1",
    "-t",
    "6",
    "-i",
    "public/media/frames/000.jpg",
    "-loop",
    "1",
    "-t",
    "6",
    "-i",
    "public/media/frames/072.jpg",
    "-filter_complex",
    "xfade=transition=fade:duration=1:offset=5",
    ...x264,
    "-r",
    "30",
    root + "crossfade.mp4",
  ]);
  // Module 7: captions. The SRT source, then burned-in versions at two sizes.
  const srt =
    "1\n00:00:00,000 --> 00:00:03,000\nShow the build queue before sorting.\n\n" +
    "2\n00:00:03,000 --> 00:00:06,000\nPress Sort once.\n\n" +
    "3\n00:00:06,000 --> 00:00:10,000\nPayments is the longest build.\n";
  writeFileSync(root + "captions.srt", srt);
  encode([
    "-i",
    src,
    "-vf",
    `subtitles=${root + "captions.srt"}`,
    ...x264,
    root + "captioned.mp4",
  ]);
  encode([
    "-i",
    src,
    "-vf",
    `subtitles=${root + "captions.srt"}:force_style='Fontsize=18'`,
    "-s",
    "640x360",
    ...x264,
    root + "captioned-small.mp4",
  ]);
  // Module 6: compression. Same source, three CRF values at half size, plus a
  // quarter-size at the default CRF to separate resolution from quality setting.
  for (const crf of [18, 23, 35])
    encode([
      "-i",
      src,
      "-vf",
      "scale=640:360",
      ...x264,
      "-crf",
      String(crf),
      root + `half-size-crf${crf}.mp4`,
    ]);
  encode([
    "-i",
    src,
    "-vf",
    "scale=480:270",
    ...x264,
    "-crf",
    "23",
    root + "quarter-size-crf23.mp4",
  ]);
  // Module 5: sound. Treatments of the synthetic tone, all clearly synthetic.
  const tone = "public/media/build/tone.wav";
  encode(["-i", tone, "-af", "volume=0.05", root + "quiet-tone.wav"]);
  encode(["-i", tone, "-af", "volume=0.5", root + "loud-tone.wav"]);
  encode(["-i", tone, "-af", "volume=2.0", root + "over-tone.wav"]);
  encode([
    "-i",
    tone,
    "-af",
    "highpass=f=200,lowpass=f=3400",
    root + "band-tone.wav",
  ]);
  encode([
    "-f",
    "lavfi",
    "-i",
    "sine=frequency=440:sample_rate=44100:duration=6",
    "-f",
    "lavfi",
    "-i",
    "sine=frequency=660:sample_rate=44100:duration=6",
    "-filter_complex",
    "amix=inputs=2:duration=first",
    "-c:a",
    "pcm_s16le",
    root + "mixed-tone.wav",
  ]);
  // The recording with the 5% tone as its sound: picture unchanged, sound nearly silent.
  encode([
    "-i",
    src,
    "-i",
    root + "quiet-tone.wav",
    "-map",
    "0:v:0",
    "-map",
    "1:a:0",
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-shortest",
    root + "quiet-audio.mp4",
  ]);
  // Module 8: verification. A candidate that plays but has no audio stream:
  // stream-copied video only, the classic "I exported it wrong" file.
  encode(["-i", src, "-map", "0:v:0", "-c", "copy", root + "video-only.mp4"]);
  // Module 10: the final project's reference recipe, run step by step on the
  // source: crop-and-zoom (Module 4), caption burn (Module 7), re-encode at
  // 640x360 CRF 23 (Module 6). Each step's output is kept as a real file.
  encode([
    "-i",
    src,
    "-vf",
    "crop=480:270:240:135,scale=960:540:flags=lanczos",
    ...x264,
    root + "recipe-step1-crop.mp4",
  ]);
  encode([
    "-i",
    root + "recipe-step1-crop.mp4",
    "-vf",
    `subtitles=${root + "captions.srt"}`,
    ...x264,
    root + "recipe-step2-captioned.mp4",
  ]);
  encode([
    "-i",
    root + "recipe-step2-captioned.mp4",
    "-vf",
    "scale=640:360",
    ...x264,
    "-crf",
    "23",
    root + "recipe-step3-final.mp4",
  ]);
  // Comparison stills at 6 s (the sorted result), one per encoded variant, so
  // the quality lessons can show real rendered pictures side by side.
  mkdirSync(root + "stills", { recursive: true });
  for (const name of [
    "half-size-crf18",
    "half-size-crf23",
    "half-size-crf35",
    "quarter-size-crf23",
    "cropped-zoom",
    "captioned",
    "captioned-small",
  ])
    encode([
      "-ss",
      "6",
      "-i",
      root + name + ".mp4",
      "-frames:v",
      "1",
      "-q:v",
      "2",
      root + "stills/" + name + ".jpg",
    ]);
}

// Record (or verify) every file. The SRT is text; the rest are media.
const expected = {
  "cropped-zoom.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "crop=480:270:240:135,scale=960:540:flags=lanczos",
    ...x264,
    "edit/cropped-zoom.mp4",
  ],
  "half-size-crf23.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "scale=640:360",
    ...x264,
    "edit/half-size-crf23.mp4",
  ],
  "callout.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    `drawtext=fontfile=DejaVuSans-Bold.ttf:text='Build queue - sorted by duration':fontcolor=white:fontsize=28:x=20:y=20:box=1:boxcolor=black@0.6:boxborderw=8`,
    ...x264,
    "edit/callout.mp4",
  ],
  "timed-callout.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "drawtext=...:enable='between(t,3,5)'",
    ...x264,
    "edit/timed-callout.mp4",
  ],
  "crossfade.mp4": [
    "-loop",
    "1",
    "-t",
    "6",
    "-i",
    "frames/000.jpg",
    "-loop",
    "1",
    "-t",
    "6",
    "-i",
    "frames/072.jpg",
    "-filter_complex",
    "xfade=transition=fade:duration=1:offset=5",
    ...x264,
    "-r",
    "30",
    "edit/crossfade.mp4",
  ],
  "zoom-pan.mp4": [
    "-loop",
    "1",
    "-t",
    "6",
    "-i",
    "frames/048.jpg",
    ...x264,
    "-r",
    "30",
    "edit/zoom-pan.mp4",
  ],
  "captioned.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "subtitles=captions.srt",
    ...x264,
    "edit/captioned.mp4",
  ],
  "captioned-small.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "subtitles=captions.srt:force_style='Fontsize=18'",
    "-s",
    "640x360",
    ...x264,
    "edit/captioned-small.mp4",
  ],
  "half-size-crf18.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "scale=640:360",
    ...x264,
    "-crf",
    "18",
    "edit/half-size-crf18.mp4",
  ],
  "half-size-crf35.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "scale=640:360",
    ...x264,
    "-crf",
    "35",
    "edit/half-size-crf35.mp4",
  ],
  "quarter-size-crf23.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "scale=480:270",
    ...x264,
    "-crf",
    "23",
    "edit/quarter-size-crf23.mp4",
  ],
  "quiet-tone.wav": [
    "-i",
    "build/tone.wav",
    "-af",
    "volume=0.05",
    "edit/quiet-tone.wav",
  ],
  "loud-tone.wav": [
    "-i",
    "build/tone.wav",
    "-af",
    "volume=0.5",
    "edit/loud-tone.wav",
  ],
  "over-tone.wav": [
    "-i",
    "build/tone.wav",
    "-af",
    "volume=2.0",
    "edit/over-tone.wav",
  ],
  "band-tone.wav": [
    "-i",
    "build/tone.wav",
    "-af",
    "highpass=f=200,lowpass=f=3400",
    "edit/band-tone.wav",
  ],
  "mixed-tone.wav": [
    "-f",
    "lavfi",
    "-i",
    "sine=frequency=440:sample_rate=44100:duration=6",
    "-f",
    "lavfi",
    "-i",
    "sine=frequency=660:sample_rate=44100:duration=6",
    "-filter_complex",
    "amix=inputs=2:duration=first",
    "-c:a",
    "pcm_s16le",
    "edit/mixed-tone.wav",
  ],
  "quiet-audio.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-i",
    "edit/quiet-tone.wav",
    "-map",
    "0:v:0",
    "-map",
    "1:a:0",
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-shortest",
    "edit/quiet-audio.mp4",
  ],
  "video-only.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-map",
    "0:v:0",
    "-c",
    "copy",
    "edit/video-only.mp4",
  ],
  "recipe-step1-crop.mp4": [
    "-i",
    "public/media/build-queue.mp4",
    "-vf",
    "crop=480:270:240:135,scale=960:540:flags=lanczos",
    ...x264,
    "edit/recipe-step1-crop.mp4",
  ],
  "recipe-step2-captioned.mp4": [
    "-i",
    "edit/recipe-step1-crop.mp4",
    "-vf",
    "subtitles=captions.srt",
    ...x264,
    "edit/recipe-step2-captioned.mp4",
  ],
  "recipe-step3-final.mp4": [
    "-i",
    "edit/recipe-step2-captioned.mp4",
    "-vf",
    "scale=640:360",
    ...x264,
    "-crf",
    "23",
    "edit/recipe-step3-final.mp4",
  ],
};
const notes = {
  "cropped-zoom.mp4":
    "Crops the centre half of the picture and scales it back to 960x540: the Module 4 readability example.",
  "half-size-crf23.mp4":
    "640x360 at CRF 23 (FFmpeg's default quality): also the Module 4 plain scale-down contrast.",
  "callout.mp4":
    "A persistent callout drawn with DejaVu Sans (SIL OFL 1.1, bundled with the sandbox FFmpeg build).",
  "timed-callout.mp4": "A callout that appears only between 3 and 5 seconds.",
  "crossfade.mp4": "A one-second fade between two original extracted frames.",
  "zoom-pan.mp4": "The Sort-action frame held for six seconds.",
  "captioned.mp4":
    "The three-line caption track burned into the picture at full size.",
  "captioned-small.mp4":
    "The same captions at 640x360: caption text that was readable at 960x540 becomes hard to read when the picture is scaled down.",
  "half-size-crf18.mp4": "640x360 at CRF 18 (high quality).",
  "half-size-crf35.mp4": "640x360 at CRF 35 (heavily compressed).",
  "quarter-size-crf23.mp4":
    "480x270 at CRF 23: same quality setting, smaller picture.",
  "quiet-tone.wav": "The synthetic tone at 5% volume: almost inaudible.",
  "loud-tone.wav": "The synthetic tone at 50% volume.",
  "over-tone.wav": "The synthetic tone at 200% volume: clipped and distorted.",
  "band-tone.wav": "The synthetic tone band-limited like a telephone line.",
  "mixed-tone.wav": "Two synthetic tones mixed: two sounds at once.",
  "quiet-audio.mp4":
    "The recording with the 5% tone as its sound: picture unchanged, sound nearly silent.",
  "video-only.mp4":
    "The recording's video stream copied without the audio stream: plays fine, but a stream probe shows no audio. The Module 8 broken candidate.",
  "recipe-step1-crop.mp4":
    "Module 10 reference recipe, step 1: crop the centre half and scale it back to 960x540 (Module 4).",
  "recipe-step2-captioned.mp4":
    "Module 10 reference recipe, step 2: burn the caption source into the cropped picture (Module 7).",
  "recipe-step3-final.mp4":
    "Module 10 reference recipe, step 3: re-encode at 640x360 CRF 23 (Module 6). The finished demo.",
};

const stillNotes = {
  "half-size-crf18": "Still at 6 s: 640x360 at CRF 18 (high quality).",
  "half-size-crf23": "Still at 6 s: 640x360 at CRF 23 (default quality).",
  "half-size-crf35": "Still at 6 s: 640x360 at CRF 35 (heavily compressed).",
  "quarter-size-crf23": "Still at 6 s: 480x270 at CRF 23.",
  "cropped-zoom": "Still at 6 s: the centre crop scaled to 960x540.",
  captioned:
    "Still at 6 s: the recording with the caption burned in at full size.",
  "captioned-small":
    "Still at 6 s: the same caption at 640x360, small and hard to read.",
};

if (generate) {
  for (const [name, args] of Object.entries(expected))
    add(name, ["ffmpeg", "-y", ...args].join(" "), notes[name]);
  add(
    "captions.srt",
    "authored directly; burned into captioned.mp4 and captioned-small.mp4 with the subtitles filter",
    "The caption source used for captioned.mp4 and captioned-small.mp4. Three cues covering the whole 10-second recording.",
    { cues: 3 },
  );
  for (const [name, note] of Object.entries(stillNotes))
    add(
      `stills/${name}.jpg`,
      `ffmpeg -y -ss 6 -i edit/${name}.mp4 -frames:v 1 -q:v 2 edit/stills/${name}.jpg`,
      note,
      { stillAt: "6 s" },
    );
  record.generated = new Date().toISOString();
  writeFileSync(manifest, JSON.stringify(record, null, 2) + "\n");
} else {
  const committed = JSON.parse(readFileSync(manifest, "utf8"));
  for (const [name, entry] of Object.entries(committed.files)) {
    const file = root + name;
    assert.equal(readFileSync(file).length, entry.bytes, name + " bytes");
    assert.equal(hash(file), entry.sha256, name + " sha256");
    if (name.endsWith(".mp4") || name.endsWith(".wav")) {
      const actual = probe(file);
      assert.equal(actual.duration, entry.duration, name + " duration");
      assert.equal(
        actual.size,
        entry.bytes,
        name + " probed size matches recorded bytes",
      );
      assert.deepEqual(actual.streams, entry.streams, name + " streams");
    }
    if (name.endsWith(".jpg")) {
      // The comparison still must exist, decode, and match the recorded size.
      const p = JSON.parse(
        runFfprobe([
          "-v",
          "error",
          "-show_entries",
          "stream=width,height",
          "-of",
          "json",
          file,
        ]).toString(),
      );
      assert.ok(p.streams[0].width > 0, name + " decodes with a width");
    }
    if (name.endsWith(".wav")) {
      const actual = volume(file);
      assert.ok(
        Math.abs(actual.mean - entry.volume.mean) < 0.05,
        `${name} mean volume ${actual.mean} vs ${entry.volume.mean}`,
      );
      assert.ok(
        Math.abs(actual.max - entry.volume.max) < 0.05,
        `${name} max volume ${actual.max} vs ${entry.volume.max}`,
      );
    }
  }
  // The burned-in captions must actually cover the whole recording: three
  // cues whose union spans the 10-second source without a gap.
  const srt = readFileSync(root + "captions.srt", "utf8");
  const cues = [
    ...srt.matchAll(
      /(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/g,
    ),
  ].map((m) => {
    const toSeconds = (h, mi, s, ms) =>
      Number(h) * 3600 + Number(mi) * 60 + Number(s) + Number(ms) / 1000;
    return {
      start: toSeconds(m[1], m[2], m[3], m[4]),
      end: toSeconds(m[5], m[6], m[7], m[8]),
    };
  });
  assert.equal(cues.length, 3, "caption cue count");
  assert.ok(cues[0].start === 0, "first cue starts at 0");
  for (let i = 1; i < cues.length; i++)
    assert.ok(
      cues[i].start === cues[i - 1].end,
      `cue ${i + 1} starts where cue ${i} ended`,
    );
  const source = probe("public/media/build-queue.mp4");
  assert.ok(
    cues[cues.length - 1].end >= source.duration - 0.01,
    "last cue covers the end of the source",
  );
  console.log(
    `edit media verified: ${Object.keys(committed.files).length} files, captions cover 0-${cues[cues.length - 1].end}s of the ${source.duration}s source`,
  );
}
