// Copyright © 2026 Christopher Snow
import { parseCommand, toolPlan, validFilename } from "../cli/command";
import type { Files } from "../cli/files";
export type Options = {
  start: string;
  duration: string;
  audio: string;
  output: string;
  streams: boolean;
  format: boolean;
};
export const defaults = (): Options => ({
  start: "0",
  duration: "6",
  audio: "keep",
  output: "demo.mp4",
  streams: false,
  format: false,
});
export function buildCommand(stage: number, name: string, o: Options) {
  if (stage === 1) return `ffprobe ${name}`;
  return `ffmpeg -i ${name}${Number(o.start) === 0 ? "" : ` -ss ${o.start}`} -t ${o.duration} ${o.output}`;
}
export function availableName(original: string, files: Files) {
  let name = original
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/^[^a-zA-Z0-9]+/, "")
    .slice(0, 60);
  if (!validFilename(name)) name = "imported-video.mp4";
  const dot = name.lastIndexOf("."),
    stem = dot > 0 ? name.slice(0, dot) : name,
    ext = dot > 0 ? name.slice(dot) : "";
  let candidate = name,
    n = 2;
  while (Object.hasOwn(files, candidate)) candidate = `${stem}-${n++}${ext}`;
  return candidate;
}
export function planRun(command: string, files: Files, source: string) {
  const plan = toolPlan(parseCommand(command));
  if (plan.output) {
    const inputs = plan.args.flatMap((arg, i) =>
      arg === "-i" ? [plan.args[i + 1]] : [],
    );
    if (plan.output === source || inputs.includes(plan.output))
      throw new Error(
        "Choose a different output filename to keep your source.",
      );
    if (
      Object.hasOwn(files, plan.output) &&
      !(plan.tool === "ffmpeg" && plan.args.includes("-y"))
    )
      throw new Error(
        "That output already exists. Choose a new name, or add -y to an FFmpeg command to replace it.",
      );
    if (
      Object.hasOwn(files, `${plan.output}.recipe.json`) &&
      !plan.args.includes("-y")
    )
      throw new Error(
        "An execution recipe already uses that name. Choose a new output name.",
      );
  }
  return plan;
}
