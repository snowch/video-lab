// Copyright © 2026 Christopher Snow
import { useEffect, useState } from "react";
import { parseCommand } from "./command";
import { progressiveUI as flow } from "./progressive.strings";
import { courseUI as ux } from "./course.strings";
export function quoteArgument(value: string) {
  return /^[a-zA-Z0-9._:/%?+=,-]+$/.test(value)
    ? value
    : `'${value.replaceAll("'", "'\\''")}'`;
}
export function NativeBuilder({
  command,
  onChange,
  template,
}: {
  command: string;
  onChange: (command: string) => void;
  template?: string;
}) {
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    try {
      const parsed = parseCommand(command);
      setWords(parsed[0] === "ffmpeg" || parsed[0] === "ffprobe" ? parsed : []);
    } catch {
      setWords([]);
    }
  }, [command]);
  const flags = (args: string[]) => args.filter((v) => /^-[a-zA-Z]/.test(v));
  let supported = true;
  if (template) {
    try {
      const baseline = parseCommand(template),
        allowed = flags(baseline),
        actual = flags(words);
      supported =
        words[0] === baseline[0] &&
        actual.every((flag, i) => flag === allowed[i]) &&
        actual.length === allowed.length;
    } catch {
      supported = false;
    }
  }
  const candidate = words.map(quoteArgument).join(" ");
  function fieldLabel(index: number) {
    const previous = words[index - 1];
    const known: Record<string, string> = {
      "-i": flow.input,
      "-t": flow.duration,
      "-ss": flow.start,
      "-framerate": flow.rate,
      "-c:v": flow.videoHandling,
      "-c:a": flow.audioHandling,
      "-pix_fmt": flow.colourStorage,
      "-map": flow.streamSelection,
      "-filter_complex": flow.filterGraph,
    };
    if (previous && known[previous]) return known[previous]!;
    if (
      previous?.startsWith("-") &&
      ![
        "-shortest",
        "-an",
        "-vn",
        "-sn",
        "-dn",
        "-y",
        "-n",
        "-hide_banner",
      ].includes(previous)
    )
      return previous;
    return words[0] === "ffprobe" ? flow.source : flow.outputFile;
  }
  return (
    <section className="native-builder" aria-label={ux.builder}>
      {(!supported || words[0] !== "ffprobe" || words.length > 2) && (
        <p>{supported ? flow.builderNote : flow.builderManual}</p>
      )}
      {!words.length && <p>{ux.builderError}</p>}
      {supported && (
        <>
          <div className="native-builder-fields">
            {words.map((value, index) =>
              index === 0 ||
              (value.startsWith("-") && !/^-\d/.test(value)) ? null : (
                <label key={index}>
                  {fieldLabel(index)}
                  <input
                    value={value}
                    inputMode={
                      ["-t", "-ss", "-framerate"].includes(
                        words[index - 1] ?? "",
                      )
                        ? "decimal"
                        : "text"
                    }
                    onChange={(e) =>
                      setWords((previous) =>
                        previous.map((word, i) =>
                          i === index ? e.target.value : word,
                        ),
                      )
                    }
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </label>
              ),
            )}
          </div>
          {candidate !== command && (
            <pre>
              <code>{candidate}</code>
            </pre>
          )}
          {candidate !== command && (
            <button
              type="button"
              disabled={!words.length}
              onClick={() => onChange(candidate)}
            >
              {ux.apply}
            </button>
          )}
        </>
      )}
    </section>
  );
}
