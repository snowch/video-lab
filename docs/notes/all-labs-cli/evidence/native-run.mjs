// Copyright © 2026 Christopher Snow
import { execFileSync } from "node:child_process";
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import {
  joinedCommand,
  inspectionCommand,
  pictureChecks,
  inspectChecks,
} from "../../../../src/cli/reference-model.ts";
import { parseCommand } from "../../../../src/cli/command.ts";
const cwd = process.env.VIDEO_LAB_FACTS_DIR;
if (!cwd)
  throw Error("Set VIDEO_LAB_FACTS_DIR to an empty existing output directory");
copyFileSync("public/media/build-queue.mp4", cwd + "/reference-inspect.mp4");
copyFileSync(
  "public/media/module-2/build-queue-cuts.mp4",
  cwd + "/reference-cuts.mp4",
);
const run = (line) => {
  const [bin, ...args] = parseCommand(line);
  return execFileSync(bin, ["-v", "error", ...args], {
    cwd,
    maxBuffer: 100 * 1024 * 1024,
  });
};
run(inspectionCommand);
const report = JSON.parse(readFileSync(cwd + "/inspect-report.json", "utf8"));
console.log("inspect", inspectChecks(report));
run(joinedCommand);
const rgb = (name) =>
  execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-i",
      name,
      "-map",
      "0:v:0",
      "-vsync",
      "0",
      "-vf",
      "scale=160:90:flags=area",
      "-pix_fmt",
      "rgb24",
      "-f",
      "rawvideo",
      "-",
    ],
    { cwd, maxBuffer: 100 * 1024 * 1024 },
  );
const source = rgb("reference-cuts.mp4");
console.log("correct", pictureChecks(rgb("joined-check.mp4"), source));
run(
  joinedCommand
    .replace("[v0][a0][v1][a1]concat", "[v1][a1][v0][a0]concat")
    .replace("joined-check.mp4", "reversed.mp4"),
);
console.log("reversed", pictureChecks(rgb("reversed.mp4"), source));
writeFileSync(
  cwd + "/facts.json",
  JSON.stringify(
    {
      inspect: inspectChecks(report),
      correct: pictureChecks(rgb("joined-check.mp4"), source),
      reversed: pictureChecks(rgb("reversed.mp4"), source),
    },
    null,
    2,
  ),
);
