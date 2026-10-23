// Copyright © 2026 Christopher Snow
/** POSIX-style argument quoting, without an operating-system shell. */
export function parseCommand(text: string): string[] {
  if (text.length > 12000) throw new Error("The command is too long.");
  const words: string[] = [];
  let word = "",
    quote = "",
    started = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (quote === "'") {
      if (c === quote) quote = "";
      else word += c;
    } else if (c === "\\" && quote !== "'") {
      const next = text[++i];
      if (next === undefined)
        throw new Error("Finish the escaped character after the backslash.");
      if (next !== "\n")
        word += quote === '"' && !'"\\$`'.includes(next) ? `\\${next}` : next;
      if (next !== "\n") started = true;
    } else if (quote) {
      if (c === quote) quote = "";
      else word += c;
    } else if (c === "'" || c === '"') {
      quote = c;
      started = true;
    } else if (/\s/.test(c)) {
      if (started) words.push(word);
      word = "";
      started = false;
    } else {
      if (/[|;&<>`$]/.test(c))
        throw new Error(
          "This workspace runs one command at a time. Shell pipes, redirection and expansion are unavailable.",
        );
      word += c;
      started = true;
    }
  }
  if (quote)
    throw new Error("Close the quoted argument before running the command.");
  if (started) words.push(word);
  if (words.length > 160)
    throw new Error("The command has too many arguments.");
  return words;
}
export function validFilename(name: string) {
  return (
    /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(name) &&
    name !== "inspection.json" &&
    !name.startsWith("cli-internal")
  );
}
export function toolPlan(words: string[]) {
  const [tool, ...args] = words;
  if (tool !== "ffmpeg" && tool !== "ffprobe")
    throw new Error("Choose ffmpeg or ffprobe.");
  if (!args.length)
    throw new Error(
      "Add arguments after the tool name. The lesson has a first command to try.",
    );
  if (args.some((a) => a.length > 4000))
    throw new Error("An argument exceeds the workspace limit.");
  if (tool === "ffprobe") {
    const format = args.findIndex(
      (a) => a === "-of" || a === "-print_format" || a === "-output_format",
    );
    if (format < 0 || args[format + 1] !== "json")
      throw new Error("Use -of json for ffprobe in this browser workspace.");
    const outputs = args.flatMap((arg, index) =>
      arg === "-o" || arg === "-output" ? [index] : [],
    );
    if (outputs.length > 1) throw new Error("Use one JSON report output.");
    const output = outputs.length ? args[outputs[0]! + 1] : undefined;
    if (
      outputs.length &&
      (!output ||
        !validFilename(output) ||
        !output.endsWith(".json") ||
        output.length > 68)
    )
      throw new Error(
        "Use -o with a simple JSON report filename of at most 68 characters.",
      );
    return { tool, args, output } as const;
  }
  if (
    args.length === 1 &&
    [
      "-version",
      "-h",
      "-help",
      "-formats",
      "-codecs",
      "-encoders",
      "-filters",
    ].includes(args[0]!)
  )
    return { tool, args } as const;
  const output = args.at(-1)!;
  if (output.length > 68)
    throw new Error(
      "Use an output filename of at most 68 characters, leaving room for its execution recipe filename.",
    );
  if (
    !validFilename(output) ||
    !/\.(mp4|webm|wav|mp3|ogg|png|jpg|gif)$/i.test(output)
  )
    throw new Error(
      "End the command with one output filename, such as demo.mp4. Folders and multiple outputs are outside this workspace.",
    );
  return { tool, args, output } as const;
}
