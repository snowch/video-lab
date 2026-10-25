// Copyright © 2026 Christopher Snow
import { parseCommand, toolPlan } from "../cli/command";

/** A source-time selection model for the introductory trim grammar, not a probe. */
export function plannedCut(command: string) {
  try {
    const words = parseCommand(command);
    toolPlan(words, true);
    const args = words.slice(1);
    if (words[0] !== "ffmpeg") return null;
    if (args[0] === "-y") args.shift();
    if (args.shift() !== "-i") return null;
    const input = args.shift()!;
    const number = (value: string | undefined) =>
      value && /^\d+(?:\.\d+)?$/.test(value) ? Number(value) : NaN;
    let start = 0;
    if (args[0] === "-ss") {
      args.shift();
      start = number(args.shift());
    }
    if (args.shift() !== "-t") return null;
    const duration = number(args.shift());
    if (
      args.length !== 1 ||
      !args[0]!.endsWith(".mp4") ||
      args[0] === input ||
      !Number.isFinite(start) ||
      !Number.isFinite(duration) ||
      start < 0 ||
      duration <= 0
    )
      return null;
    return { input, start, duration };
  } catch {
    return null;
  }
}

export function cutInterval(start: number, duration: number, total: number) {
  if (start >= total || total <= 0) return null;
  const end = Math.min(total, start + duration);
  return { start, end, duration: end - start, total };
}
