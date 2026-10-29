// Copyright © 2026 Christopher Snow
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { recordingGuide as text } from "./guide.strings";
import { captureCommands } from "./native";

type Method = (typeof text.methods)[number]["id"];
function Steps({ steps }: { steps: readonly string[] }) {
  return (
    <ol>
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}
function TerminalExample({
  title,
  command,
  template = false,
}: {
  title: string;
  command: string;
  template?: boolean;
}) {
  const output = useRef<HTMLPreElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [feedback, setFeedback] = useState("");
  useEffect(() => setFeedback(""), [command]);
  useLayoutEffect(() => {
    const element = output.current;
    if (!element) return;
    const update = () =>
      setOverflow(element.scrollWidth > element.clientWidth + 1);
    const observer = new ResizeObserver(update);
    observer.observe(element);
    update();
    return () => observer.disconnect();
  }, [command]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setFeedback(text.copied);
    } catch {
      setFeedback(text.copyFailed);
    }
  }
  return (
    <section className="recording-command" aria-label={title}>
      <h3>{title}</h3>
      <pre
        ref={output}
        tabIndex={0}
        aria-label={`${text.commandRegion}: ${title}`}
      >
        <code>{command}</code>
      </pre>
      {overflow && <p className="muted">{text.scrollHint}</p>}
      <button type="button" onClick={() => void copy()}>
        {template ? text.copyTemplate : text.copy}
      </button>
      <p role="status">{feedback}</p>
    </section>
  );
}
export function RecordingGuide() {
  const [method, setMethod] = useState<Method | "">("");
  const native =
    method === "windows" || method === "macos" || method === "linux"
      ? text[method]
      : undefined;
  return (
    <div className="wrap journey-wrap">
      <a href="#/">← {text.back}</a>
      <article className="recording-guide">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <h2>{text.prepareTitle}</h2>
        <p>{text.prepare}</p>
        <div className="recording-method">
          <label htmlFor="recording-method">{text.methodLabel}</label>
          <select
            id="recording-method"
            value={method}
            aria-controls="recording-instructions"
            onChange={(event) => setMethod(event.target.value as Method | "")}
          >
            <option value="" disabled>
              {text.methodPlaceholder}
            </option>
            {text.methods.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <section
          className="recording-instructions"
          id="recording-instructions"
          hidden={!method}
          aria-labelledby={method ? "recording-method-title" : undefined}
        >
          {native &&
            (method === "windows" ||
              method === "macos" ||
              method === "linux") && (
              <>
                <h2 id="recording-method-title">{native.title}</h2>
                {method === "linux" && (
                  <>
                    <p>{text.linux.sessionIntro}</p>
                    <TerminalExample
                      title={text.linux.sessionTitle}
                      command={captureCommands.session}
                    />
                    <p>{text.linux.sessionResult}</p>
                    <p>{text.linux.wayland}</p>
                  </>
                )}
                <p>{text.native.location}</p>
                <p>
                  {text.native.install}{" "}
                  <a href={text.native.installHref}>
                    {text.native.installLink}
                  </a>
                </p>
                <h3>{text.native.checkTitle}</h3>
                <p>
                  {text.native.devicesNote} {native.input}
                </p>
                <TerminalExample
                  title={text.native.devicesTitle}
                  command={captureCommands.devices}
                />
                <p>{text.native.encodersNote}</p>
                <TerminalExample
                  title={text.native.encodersTitle}
                  command={captureCommands.encoders}
                />
                <h3>{text.native.recordTitle}</h3>
                <p>{native.setup}</p>
                {method === "linux" && (
                  <>
                    <p>{text.linux.region}</p>
                  </>
                )}
                {method === "macos" && (
                  <>
                    <p>{text.macos.listNote}</p>
                    <TerminalExample
                      title={text.macos.listTitle}
                      command={captureCommands.macDevices}
                    />
                    <p>{text.macos.replace}</p>
                  </>
                )}
                <p>{text.native.timing}</p>
                <p>{text.native.output}</p>
                <TerminalExample
                  key={method}
                  title={native.commandTitle}
                  command={captureCommands[method]}
                  template={method === "macos"}
                />
                <h3>{text.native.optionsTitle}</h3>
                <dl>
                  {text.native.options.map((option) => (
                    <div key={option.option}>
                      <dt>
                        <code>{option.option}</code>
                      </dt>
                      <dd>{option.explanation}</dd>
                    </div>
                  ))}
                </dl>
                <h3>{text.native.importTitle}</h3>
                <Steps steps={text.native.importSteps} />
                <a href={native.sourceHref}>{native.sourceTitle}</a>
              </>
            )}
          {method === "mobile" && (
            <>
              <h2 id="recording-method-title">{text.mobile.title}</h2>
              <p>{text.mobile.intro}</p>
              <h3>{text.mobile.appleTitle}</h3>
              <Steps steps={text.mobile.appleSteps} />
              <a href={text.mobile.appleHref}>{text.mobile.appleLink}</a>
              <h3>{text.mobile.androidTitle}</h3>
              <Steps steps={text.mobile.androidSteps} />
              <a href={text.mobile.androidHref}>{text.mobile.androidLink}</a>
              <p>{text.mobile.limitations}</p>
              <h3>{text.mobile.importTitle}</h3>
              <p>{text.mobile.importNote}</p>
            </>
          )}
        </section>
        <p>
          <a className="button" href="#/">
            {text.back}
          </a>
        </p>
        <p className="muted">{text.sourcesNote}</p>
      </article>
    </div>
  );
}
