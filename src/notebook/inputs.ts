// Copyright © 2026 Christopher Snow
import type { NotebookFile } from "./model";

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** image2 expands a numeric input pattern itself; this only stages its files. */
export function numberedInputMatches(pattern: string, name: string) {
  const token = /%(?:0([1-9][0-9]?))?d/.exec(pattern);
  if (!token || pattern.slice(token.index + token[0].length).includes("%"))
    return false;
  const prefix = pattern.slice(0, token.index);
  if (prefix.includes("%")) return false;
  const suffix = pattern.slice(token.index + token[0].length);
  const match = new RegExp(
    `^${escapeRegex(prefix)}([0-9]+)${escapeRegex(suffix)}$`,
  ).exec(name);
  if (!match) return false;
  const number = Number(match[1]);
  return (
    Number.isSafeInteger(number) &&
    String(number).padStart(Number(token[1] ?? 0), "0") === match[1]
  );
}

export function referencedInputs(
  args: string[],
  files: Record<string, NotebookFile>,
  output?: string,
  tool: "ffmpeg" | "ffprobe" = "ffmpeg",
) {
  const outputIndex = !output
    ? -1
    : tool === "ffprobe"
      ? args.findIndex((arg) => arg === "-o" || arg === "-output") + 1
      : args.length - 1;
  const inputArgs = args.filter((_, index) => index !== outputIndex);
  const patterns = args.flatMap((arg, i) =>
    arg === "-i" && args[i + 1] ? [args[i + 1]!] : [],
  );
  return Object.values(files).filter(
    (file) =>
      patterns.some((pattern) => numberedInputMatches(pattern, file.name)) ||
      inputArgs.some(
        (arg) =>
          arg === file.name ||
          arg.includes("=" + file.name) ||
          arg.includes("='" + file.name + "'") ||
          arg.includes('="' + file.name + '"') ||
          (arg.includes("fontsdir=fonts") && file.name.startsWith("fonts/")),
      ),
  );
}
