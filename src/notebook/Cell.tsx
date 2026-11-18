// Copyright © 2026 Christopher Snow
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { OutputResize } from "../components/OutputResize";
import { NativeBuilder, quoteArgument } from "../cli/NativeBuilder";
import { parseCommand } from "../cli/command";
import { useNotebook, downloadBlob } from "./Workspace";
import { hashBlob, type CellRecord } from "./model";
import { FilePreview } from "./FileManager";
import type { Expectation } from "./structure";
import { n } from "./ui.strings";
import type { WorkedCopy } from "./copy-types";
import { InlineText } from "./InlineText";
export function CommandCell({
  id,
  initial,
  title,
  expected,
  limit,
  teaching,
  observe,
  options,
  introduction,
  illustration,
  preview,
  preparing = false,
}: {
  id: string;
  initial: string;
  title: string;
  expected?: Expectation;
  limit?: string;
  teaching?: WorkedCopy;
  observe?: string;
  options?: WorkedCopy["options"];
  introduction?: string[];
  illustration?: ReactNode;
  preview?: (command: string) => ReactNode;
  preparing?: boolean;
}) {
  const outputId = useId();
  const w = useNotebook(),
    record = w.cells[id] ?? { id, command: initial };
  const [builder, setBuilder] = useState(false),
    [wrap, setWrap] = useState(false),
    [filesChanged, setFilesChanged] = useState(false),
    [outputMatches, setOutputMatches] = useState(false),
    [checked, setChecked] = useState<{
      record: CellRecord;
      messages?: string[];
      error?: string;
    }>(),
    [notice, setNotice] = useState(""),
    [right, setRight] = useState(false),
    [left, setLeft] = useState(false);
  const pre = useRef<HTMLPreElement>(null),
    editor = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = editor.current;
    if (!el) return;
    function fit() {
      el!.style.height = "auto";
      el!.style.height = `${el!.scrollHeight + el!.offsetHeight - el!.clientHeight}px`;
    }
    fit();
    let width = el.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => {
      const next = el.getBoundingClientRect().width;
      if (next !== width) {
        width = next;
        fit();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [record.command]);
  const running = w.active?.id === id;
  const last = record.last;
  const draftChanged = Boolean(last && record.command !== last.command);
  const stale = draftChanged || filesChanged;
  const currentCheck =
    !stale && checked?.record === record ? checked : undefined;
  const mismatch = currentCheck?.messages?.some((message) =>
    message.startsWith("✗"),
  );
  const text = running ? w.liveLog : (last?.log ?? "");
  const status = running
    ? n.running
    : last?.error === n.cancelled
      ? draftChanged
        ? n.cancelledEarlier
        : n.cancelled
      : last?.error && draftChanged
        ? n.failedEarlier
        : last?.error
          ? n.failed
          : stale
            ? n.stale
            : last
              ? n.done
              : "";
  function edit(command: string) {
    w.edit(id, { command });
  }
  useEffect(() => {
    let live = true;
    void (async () => {
      if (!last) {
        setFilesChanged(false);
        setOutputMatches(false);
        return;
      }
      const inputs = await Promise.all(
        last.inputs.map(async (f) =>
          Boolean(
            w.files[f.name] &&
            (await hashBlob(w.files[f.name]!.blob)) === f.sha256,
          ),
        ),
      );
      const output = last.output ? w.files[last.output] : undefined;
      const matches = Boolean(
        output && (await hashBlob(output.blob)) === last.outputHash,
      );
      if (live) {
        const changed =
          inputs.some((x) => !x) || (Boolean(last.output) && !matches);
        if (changed) setChecked(undefined);
        setFilesChanged(changed);
        setOutputMatches(matches);
      }
    })();
    return () => {
      live = false;
    };
  }, [last, w.files]);
  function edges() {
    const el = pre.current;
    if (el) {
      setRight(!wrap && el.scrollWidth - el.clientWidth - el.scrollLeft > 2);
      setLeft(!wrap && el.scrollLeft > 2);
    }
  }
  useEffect(() => {
    edges();
    const obs = new ResizeObserver(edges);
    if (pre.current) obs.observe(pre.current);
    return () => obs.disconnect();
  }, [text, wrap]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        parseCommand(record.command).map(quoteArgument).join(" "),
      );
      setNotice(n.copied);
    } catch {
      setNotice(n.copyFailed);
      editor.current?.focus();
      editor.current?.select();
    }
  }
  function downloadCommand() {
    try {
      const command = parseCommand(record.command).map(quoteArgument).join(" ");
      downloadBlob(
        "command.sh",
        new Blob(["#!/bin/sh\n" + command + "\n"], {
          type: "text/x-shellscript",
        }),
      );
    } catch (e) {
      setNotice(e instanceof Error ? e.message : String(e));
    }
  }
  return (
    <section
      className="notebook-cell"
      aria-labelledby={`${id}-title`}
      data-cell={id}
      data-stale={stale}
    >
      <h2 id={`${id}-title`}>{title}</h2>
      {(teaching?.introduction ?? introduction)?.map((p, i) => (
        <p key={i}>
          <InlineText>{p}</InlineText>
        </p>
      ))}
      {preview?.(record.command)}
      <label className="sr-only" htmlFor={`${id}-command`}>
        {n.command}: {title}
      </label>
      <textarea
        ref={editor}
        id={`${id}-command`}
        value={record.command}
        onChange={(e) => edit(e.target.value)}
        rows={record.command.length > 110 ? 4 : 3}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            (e.shiftKey || e.ctrlKey) &&
            !e.nativeEvent.isComposing
          ) {
            e.preventDefault();
            if (!preparing && !w.busy && w.ready)
              void w.run(id, record.command);
          }
        }}
      />
      <p className="notebook-shortcut">{n.shortcut}</p>
      <div className="notebook-cell-actions">
        <button
          className="primary"
          disabled={preparing || w.busy || !w.ready || !record.command.trim()}
          onClick={() => void w.run(id, record.command)}
        >
          {n.run}
        </button>
        {running && <button onClick={w.cancel}>{n.cancel}</button>}
      </div>
      <details
        className="notebook-command-tools"
        onToggle={(event) => {
          if (event.currentTarget.open) setBuilder(true);
        }}
      >
        <summary>{n.commandTools}</summary>
        {builder && <NativeBuilder command={record.command} onChange={edit} />}
        <div className="notebook-cell-actions">
          <button onClick={() => void copy()}>{n.copy}</button>
          <button onClick={downloadCommand}>{n.downloadCommand}</button>
        </div>
      </details>
      <p className="notebook-run-status" role="status">
        {status}
      </p>
      {notice && <p role="status">{notice}</p>}
      {last && draftChanged && !running && (
        <details className="notebook-last-command">
          <summary>{n.last}</summary>
          <pre tabIndex={0}>{last.command}</pre>
        </details>
      )}
      {last?.error &&
        last.error !== n.cancelled &&
        !running &&
        (draftChanged ? (
          <details className="notebook-error">
            <summary>{n.previousError}</summary>
            <p>{last.error}</p>
          </details>
        ) : (
          <p className="notebook-error" role="alert">
            {last.error}
          </p>
        ))}
      {last?.error === n.overwrite &&
        last.command === record.command &&
        !running && (
          <button
            disabled={preparing || w.busy || !w.ready}
            onClick={() => {
              const command = record.command.replace(/^(\s*ffmpeg\b)/, "$1 -y");
              edit(command);
              void w.run(id, command);
            }}
          >
            {n.replace}
          </button>
        )}
      {(running || last) && (
        <div
          className={`notebook-log${right ? " more-right" : ""}${left ? " more-left" : ""}`}
        >
          <div className="notebook-log-tools">
            <strong>{n.output}</strong>
            <label>
              <input
                type="checkbox"
                checked={wrap}
                onChange={(e) => setWrap(e.target.checked)}
              />
              {n.wrap}
            </label>
          </div>
          <pre
            id={outputId}
            className={wrap ? "wrap" : ""}
            ref={pre}
            onScroll={edges}
            tabIndex={0}
            aria-label={`${n.output}: ${title}`}
          >
            {text || "—"}
          </pre>
          <OutputResize target={pre} controls={outputId} />
          {last?.truncated && <p>{n.truncated}</p>}
          {(left || right) && (
            <div className="notebook-scroll-tools">
              {left && (
                <button
                  aria-label="Scroll output left"
                  onClick={() => pre.current?.scrollBy({ left: -200 })}
                >
                  ←
                </button>
              )}
              <span>{n.sideways}</span>
              {right && (
                <button
                  aria-label="Scroll output right"
                  onClick={() => pre.current?.scrollBy({ left: 200 })}
                >
                  →
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {!running &&
        last &&
        !last.runtime &&
        !last.error &&
        last.log.split(/\r?\n/).includes("Aborted()") &&
        (last.command.trim().startsWith("ffprobe")
          ? last.code === -1
          : last.code === 0) && (
          <p className="notebook-runtime-note">
            {last.command.trim().startsWith("ffprobe")
              ? n.runtimeProbe
              : n.runtimeFfmpeg}
          </p>
        )}
      {!running &&
        last?.output &&
        (outputMatches && w.files[last.output] ? (
          <div className="notebook-cell-result">
            <h3>{last.output}</h3>
            <FilePreview file={w.files[last.output]!} />
            <button
              onClick={() =>
                downloadBlob(last.output!, w.files[last.output!]!.blob)
              }
            >
              {n.download} {last.output}
            </button>
          </div>
        ) : (
          <p>{n.previousOutput}</p>
        ))}
      {illustration}
      {(teaching || options) && (
        <div className="notebook-command-guide">
          {record.command !== initial && (
            <p className="notebook-guide-label">{n.exampleOptions}</p>
          )}
          <dl className="notebook-options">
            {(teaching?.options ?? options ?? []).map((o, i) => (
              <div key={i}>
                <dt>
                  <code>{o.flag}</code>
                </dt>
                <dd>
                  <InlineText>{o.meaning}</InlineText>
                  {o.reference && (
                    <>
                      {" "}
                      <a href={o.reference.href}>{o.reference.label}</a>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {teaching?.prediction && (
            <p className="notebook-think">
              <InlineText>{teaching.prediction}</InlineText>
            </p>
          )}
        </div>
      )}
      {(teaching || observe) && (
        <div className="notebook-observation">
          <p>
            <InlineText>{teaching?.observe ?? observe ?? ""}</InlineText>
          </p>
          {teaching?.explanation?.map((p, i) => (
            <p key={i}>
              <InlineText>{p}</InlineText>
            </p>
          ))}
        </div>
      )}
      {expected && (
        <section className="notebook-check">
          <h3>{n.technical}</h3>
          <p>
            <InlineText>{limit ?? ""}</InlineText>
          </p>
          <button
            disabled={w.busy || !last || Boolean(last.error) || stale}
            onClick={() => {
              setChecked({ record });
              void w
                .check(record, expected)
                .then((messages) => {
                  setChecked({ record, messages });
                })
                .catch((e) => {
                  setChecked({
                    record,
                    error: e instanceof Error ? e.message : String(e),
                  });
                });
            }}
          >
            {n.check}
          </button>
          <div role="status">
            {currentCheck &&
              (currentCheck.error ? (
                <p>{currentCheck.error}</p>
              ) : currentCheck.messages ? (
                <>
                  <ul>
                    {currentCheck.messages.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                  {mismatch ? (
                    <p>{n.checkMismatch}</p>
                  ) : (
                    !expected.probe && !expected.decode && <p>{n.passed}</p>
                  )}
                </>
              ) : (
                <p>{n.checking}</p>
              ))}
          </div>
        </section>
      )}
    </section>
  );
}
