// Copyright © 2026 Christopher Snow
import { useEffect, useState } from "react";
import { parseCommand } from "./command";
import { courseUI as ux } from "./course.strings";
export function quoteArgument(value: string) {
  return /^[a-zA-Z0-9._:/%?+=,-]+$/.test(value)
    ? value
    : `'${value.replaceAll("'", "'\\''")}'`;
}
export function NativeBuilder({
  command,
  onChange,
}: {
  command: string;
  onChange: (command: string) => void;
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
  return (
    <section className="native-builder" aria-label={ux.builder}>
      <p>{ux.builderIntro}</p>
      {!words.length && <p>{ux.builderError}</p>}
      {words.map((value, index) =>
        value.startsWith("-") && !/^-\d/.test(value) ? (
          <code key={index}>{value}</code>
        ) : (
          <label key={index}>
            {index === 0
              ? ux.tool
              : words[index - 1]?.startsWith("-")
                ? words[index - 1]
                : `${ux.argument} ${index}`}
            <input
              value={value}
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
      <pre>
        <code>{words.map(quoteArgument).join(" ")}</code>
      </pre>
      <button
        type="button"
        disabled={!words.length}
        onClick={() => onChange(words.map(quoteArgument).join(" "))}
      >
        {ux.apply}
      </button>
    </section>
  );
}
