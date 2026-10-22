// Copyright © 2026 Christopher Snow
// Generate the tiny deterministic synthetic tone WAV used by the file-building
// lesson. Clearly synthetic: a 440 Hz sine, not narration. Records provenance.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

mkdirSync("public/media/build", { recursive: true });
const out = "public/media/build/tone.wav";
execFileSync(
  "ffmpeg",
  [
    "-v",
    "error",
    "-y",
    "-f",
    "lavfi",
    "-i",
    "sine=frequency=440:sample_rate=8000:duration=3",
    "-c:a",
    "pcm_s16le",
    out,
  ],
  { stdio: "pipe" },
);
const bytes = readFileSync(out);
const record = {
  file: "media/build/tone.wav",
  description:
    "Synthetic 440 Hz sine tone, 3 seconds, 8000 Hz mono, 16-bit PCM. Clearly synthetic; not narration.",
  generated: new Date().toISOString(),
  command:
    "ffmpeg -f lavfi -i sine=frequency=440:sample_rate=8000:duration=3 -c:a pcm_s16le public/media/build/tone.wav",
  bytes: bytes.length,
  sha256: createHash("sha256").update(bytes).digest("hex"),
};
writeFileSync(
  "public/media/build/tone.provenance.json",
  JSON.stringify(record, null, 2) + "\n",
);
console.log(
  `tone.wav: ${bytes.length} bytes, sha256:${record.sha256.slice(0, 16)}…`,
);
