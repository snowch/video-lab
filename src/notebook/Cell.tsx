// Copyright © 2026 Christopher Snow
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { NativeBuilder, quoteArgument } from "../cli/NativeBuilder";
import { parseCommand } from "../cli/command";
import { useNotebook, downloadBlob } from "./Workspace";
import { hashBlob } from "./model";
import { FilePreview } from "./FileManager";
import type { Expectation } from "./structure";
import { n } from "./ui.strings";
import type { WorkedCopy } from "./copy-types";
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
}) {
  const w = useNotebook(),
    record = w.cells[id] ?? { id, command: initial };
  const [builder, setBuilder] = useState(false),
    [wrap, setWrap] = useState(false),
    [stale, setStale] = useState(false),
    [outputMatches, setOutputMatches] = useState(false),
    [checks, setChecks] = useState<string[]>([]),
    [checkGood, setCheckGood] = useState(false),
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
  const text = running ? w.liveLog : (last?.log ?? "");
  function edit(command: string) {
    w.edit(id, { command });
    setChecks([]);
    setCheckGood(false);
  }
  useEffect(() => {
    let live = true;
    void (async () => {
      if (!last) {
        setStale(false);
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
          record.command !== last.command ||
          inputs.some((x) => !x) ||
          (Boolean(last.output) && !matches);
        if (changed) {
          setChecks([]);
          setCheckGood(false);
        }
        setStale(changed);
        setOutputMatches(matches);
      }
    })();
    return () => {
      live = false;
    };
  }, [last, record.command, w.files]);
  useEffect(() => {
    setChecks([]);
    setCheckGood(false);
  }, [last, record.command]);
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
      <header>
        <h2 id={`${id}-title`}>{title}</h2>
        <span className="notebook-cell-tool">
          {record.command.trim().split(/\s/)[0] || "ffmpeg"}
        </span>
      </header>
      {(teaching?.introduction ?? introduction)?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <div className="notebook-cell-mode">
        <button aria-pressed={!builder} onClick={() => setBuilder(false)}>
          {n.editor}
        </button>
        <button aria-pressed={builder} onClick={() => setBuilder(true)}>
          {n.builder}
        </button>
      </div>
      {builder && <NativeBuilder command={record.command} onChange={edit} />}
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
            if (!w.busy && w.ready) void w.run(id, record.command);
          }
        }}
      />
      <p className="notebook-shortcut">{n.shortcut}</p>
      <div className="notebook-cell-actions">
        <button
          className="primary"
          disabled={w.busy || !w.ready || !record.command.trim()}
          onClick={() => void w.run(id, record.command)}
        >
          {n.run}
        </button>
        {running && <button onClick={w.cancel}>{n.cancel}</button>}
        <button onClick={() => void copy()}>{n.copy}</button>
        <button onClick={downloadCommand}>{n.downloadCommand}</button>
      </div>
      <p role="status" aria-live="polite">
        {running
          ? n.running
          : last?.error
            ? n.failed
            : stale
              ? n.stale
              : last
                ? n.done
                : notice || n.ready}
      </p>
      {notice && last && <p role="status">{notice}</p>}
      {last && record.command !== last.command && (
        <div className="notebook-last-command">
          <strong>{n.last}</strong>
          <pre tabIndex={0}>{last.command}</pre>
        </div>
      )}
      {last?.error && !running && (
        <p className="notebook-error" role="alert">
          {last.error}
        </p>
      )}
      {last?.error === n.overwrite &&
        last.command === record.command &&
        !running && (
          <button
            disabled={w.busy}
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
            className={wrap ? "wrap" : ""}
            ref={pre}
            onScroll={edges}
            tabIndex={0}
            aria-label={`${n.output}: ${title}`}
          >
            {text || "—"}
          </pre>
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
            <h4>{last.output}</h4>
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
                <dd>{o.meaning}</dd>
              </div>
            ))}
          </dl>
          {teaching?.prediction && (
            <p className="notebook-think">{teaching.prediction}</p>
          )}
        </div>
      )}
      {(teaching || observe) && (
        <div className="notebook-observation">
          <p>{teaching?.observe ?? observe}</p>
          {teaching?.explanation?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
      {expected && (
        <section className="notebook-check">
          <h4>{n.technical}</h4>
          <p>{limit}</p>
          <button
            disabled={w.busy || !last || Boolean(last.error) || stale}
            onClick={() =>
              void w
                .check(record, expected)
                .then((result) => {
                  setChecks(result);
                  setCheckGood(result.every((c) => !c.startsWith("✗")));
                })
                .catch((e) => {
                  setChecks([e instanceof Error ? e.message : String(e)]);
                  setCheckGood(false);
                })
            }
          >
            {n.check}
          </button>
          {checks.length > 0 && (
            <div role="status" aria-live="polite">
              <ul>
                {checks.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              {checkGood && !stale && <p>{n.passed}</p>}
            </div>
          )}
        </section>
      )}
    </section>
  );
}
