// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { disk, checkFiles, mimeFor } from "../cli/files";
import type { Files, WorkspaceFile } from "../cli/files";
import { cancelProcessing, inspectMedia, runTool } from "../processing/engine";
import { CaptureController } from "../capture/controller";
import type { CaptureState } from "../capture/controller";
import { OfflineAccess } from "../offline/OfflineAccess";
import { ReleaseStatus } from "../release/ReleaseStatus";
import { EncoderOffline, assetURL } from "../journey/shared";
import { availableName, buildCommand, defaults, planRun } from "./model";
import type { Options } from "./model";
import C from "./strings.json";
import "./style.css";

type Result = {
  command: string;
  tool: string;
  code: number;
  text?: string;
  file?: WorkspaceFile;
  recipe?: WorkspaceFile;
};
type Draft = {
  mode: "builder" | "manual";
  text: string;
  restored: string;
  result?: Result;
};
const initialDraft = (): Draft => ({ mode: "builder", text: "", restored: "" });
const storageKey = "video-lab-workbench-v1";
function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
function useBlob(blob?: Blob) {
  const [url, setURL] = useState("");
  useEffect(() => {
    if (!blob) {
      setURL("");
      return;
    }
    const next = URL.createObjectURL(blob);
    setURL(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  return url;
}
function Playback({ file }: { file: WorkspaceFile }) {
  const url = useBlob(file.blob),
    [failed, setFailed] = useState(false);
  if (file.blob.type.startsWith("image/"))
    return <img src={url} alt={file.name} />;
  return (
    <>
      <video
        src={url}
        controls
        playsInline
        preload="metadata"
        aria-label={file.name}
        onError={() => setFailed(true)}
      />
      {failed && <p role="alert">{C.source.playbackError}</p>}
    </>
  );
}
function Output({ text }: { text: string }) {
  const ref = useRef<HTMLPreElement>(null),
    [wrap, setWrap] = useState(false),
    [more, setMore] = useState(false);
  const measure = () => {
    const el = ref.current;
    if (el)
      setMore(!wrap && el.scrollWidth - el.scrollLeft - el.clientWidth > 2);
  };
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [text, wrap]);
  return (
    <>
      <div className="output-frame" data-overflow={more}>
        <pre
          ref={ref}
          className={wrap ? "wrapped" : ""}
          tabIndex={0}
          onScroll={measure}
          aria-label={C.command.outputLabel}
        >
          {text}
        </pre>
      </div>
      <div className="output-controls">
        <button onClick={() => setWrap(!wrap)} aria-pressed={wrap}>
          {C.command.wrap}
        </button>
        {more && (
          <button
            onClick={() =>
              ref.current?.scrollBy({ left: ref.current.clientWidth * 0.8 })
            }
          >
            {C.command.more}
          </button>
        )}
      </div>
    </>
  );
}
function ReportSummary({ text }: { text: string }) {
  try {
    const report = JSON.parse(text);
    return (
      <div className="metrics">
        {Array.isArray(report.streams) &&
          report.streams.map((stream: Record<string, unknown>, i: number) => (
            <span className="metric" key={i}>
              {stream.codec_type === "video"
                ? C.inspect.video
                : stream.codec_type === "audio"
                  ? C.inspect.audio
                  : String(stream.codec_type ?? "")}
              : {String(stream.codec_name ?? "")}
              {typeof stream.width === "number" &&
              typeof stream.height === "number"
                ? ` · ${stream.width} × ${stream.height} ${C.inspect.pixels}`
                : ""}
            </span>
          ))}
        {report.format?.duration !== undefined &&
          Number.isFinite(Number(report.format.duration)) && (
            <span className="metric">
              {C.inspect.duration}: {Number(report.format.duration)}{" "}
              {C.command.seconds}
            </span>
          )}
      </div>
    );
  } catch {
    return null;
  }
}
function App() {
  const [files, setFiles] = useState<Files>({}),
    [sourceName, setSourceName] = useState(""),
    [stage, setStage] = useState(0),
    [ready, setReady] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({
      1: initialDraft(),
      2: initialDraft(),
    }),
    [options, setOptions] = useState(defaults),
    [switching, setSwitching] = useState(false);
  const [theme, setTheme] = useState(
    matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );
  const [status, setStatus] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [saving, setSaving] = useState(false),
    [logs, setLogs] = useState(""),
    [remove, setRemove] = useState("");
  const [capture, setCapture] = useState<CaptureState>("idle");
  const controller = useRef<CaptureController | null>(null),
    generation = useRef(0),
    activeMedia = useRef(false),
    locked = useRef(false),
    savingRef = useRef(false),
    picker = useRef<HTMLInputElement>(null),
    resultRef = useRef<HTMLDivElement>(null),
    heading = useRef<HTMLHeadingElement>(null),
    commandRef = useRef<HTMLTextAreaElement>(null);
  const source = files[sourceName],
    d = drafts[stage] ?? initialDraft(),
    built = buildCommand(stage, source?.name ?? "mousepad-demo.mp4", options),
    command = d.mode === "manual" ? d.text : built;
  const patchDraft = (patch: Partial<Draft>) =>
    setDrafts((old) => ({ ...old, [stage]: { ...old[stage]!, ...patch } }));
  const changeOption = <K extends keyof Options>(key: K, value: Options[K]) => {
    setOptions((old) => ({ ...old, [key]: value }));
    setError("");
  };
  const fail = (err: unknown) =>
    setError(
      err instanceof Error
        ? err.message.replace("See its log above.", C.live.logHint)
        : String(err),
    );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    let alive = true;
    void disk<WorkspaceFile[]>("readonly", (s) => s.getAll())
      .then((saved) => {
        if (!alive) return;
        const restored = Object.fromEntries(saved.map((f) => [f.name, f]));
        setFiles(restored);
        try {
          const state = JSON.parse(localStorage.getItem(storageKey) ?? "null");
          if (state) {
            if (restored[state.sourceName]) setSourceName(state.sourceName);
            if (
              state.options &&
              Object.keys(defaults()).every(
                (k) =>
                  typeof state.options[k] ===
                  typeof defaults()[k as keyof Options],
              )
            )
              setOptions(state.options);
            if (
              state.drafts &&
              [1, 2].every(
                (n) =>
                  ["builder", "manual"].includes(state.drafts[n]?.mode) &&
                  typeof state.drafts[n]?.text === "string" &&
                  typeof state.drafts[n]?.restored === "string",
              )
            )
              setDrafts(state.drafts);
          }
        } catch {
          /* Ignore only damaged optional drafts; media remains in IndexedDB. */
        }
      })
      .catch(() => {
        if (alive) setError(C.live.storageFailed);
      })
      .finally(() => {
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
      generation.current++;
      cancelProcessing();
      controller.current?.destroy();
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          sourceName,
          options,
          drafts: Object.fromEntries(
            Object.entries(drafts).map(([k, v]) => [
              k,
              { mode: v.mode, text: v.text, restored: v.restored },
            ]),
          ),
        }),
      );
    } catch {
      setError(C.live.storageFailed);
    }
  }, [ready, sourceName, options, drafts]);
  useEffect(() => {
    const guard = (event: BeforeUnloadEvent) => {
      if (locked.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    addEventListener("beforeunload", guard);
    return () => removeEventListener("beforeunload", guard);
  }, []);
  useEffect(() => {
    const navigate = () => {
      if (activeMedia.current && !savingRef.current) cancel();
      const next = ["#source", "#inspect", "#trim"].indexOf(location.hash);
      setStage(next > 0 && source ? next : 0);
      setSwitching(false);
    };
    navigate();
    addEventListener("hashchange", navigate);
    return () => removeEventListener("hashchange", navigate);
  }, [!!source]);
  function go(next: number) {
    if (busy) return;
    location.hash = ["source", "inspect", "trim"][next]!;
    setStage(next);
    setSwitching(false);
    setError("");
    setStatus("");
    requestAnimationFrame(() => {
      heading.current?.focus();
      scrollTo(0, 0);
    });
  }
  async function save(add: WorkspaceFile[]) {
    const next = {
      ...files,
      ...Object.fromEntries(add.map((f) => [f.name, f])),
    };
    checkFiles(next);
    await disk("readwrite", (store) => {
      for (const f of add.slice(0, -1)) store.put(f);
      return store.put(add.at(-1)!);
    });
    setFiles(next);
  }
  function select(file: WorkspaceFile) {
    setSourceName(file.name);
    setDrafts((old) => ({
      1: { ...old[1]!, result: undefined },
      2: { ...old[2]!, result: undefined },
    }));
    setStatus(C.actions.sourceChanged);
  }
  async function setup(operation: () => Promise<void>) {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      await operation();
    } catch (err) {
      fail(err);
    } finally {
      activeMedia.current = false;
      locked.current = false;
      setBusy(false);
    }
  }
  async function practice() {
    await setup(async () => {
      const existing = files["mousepad-demo.mp4"];
      if (existing?.origin === "provided") {
        select(existing);
        return;
      }
      const response = await fetch(assetURL("media/mousepad-demo.mp4"));
      if (!response.ok) throw new Error(C.live.loadFailed);
      const file: WorkspaceFile = {
        name: availableName("mousepad-demo.mp4", files),
        blob: await response.blob(),
        origin: "provided",
      };
      await save([file]);
      select(file);
      setStatus(C.source.loaded);
    });
  }
  async function importFile(file?: File) {
    if (!file) return;
    await setup(async () => {
      if (
        !file.type.startsWith("video/") ||
        !file.size ||
        file.size > 20 * 1024 * 1024
      )
        throw new Error(C.command.invalidImport);
      const name = availableName(file.name, files);
      const entry: WorkspaceFile = { name, blob: file, origin: "imported" };
      await save([entry]);
      select(entry);
      setStatus(
        name === file.name
          ? C.source.importedReady
          : C.live.importRenamed
              .replace("{original}", file.name)
              .replace("{name}", name),
      );
    });
  }
  function record() {
    if (locked.current) return;
    activeMedia.current = true;
    locked.current = true;
    setBusy(true);
    setError("");
    controller.current?.destroy();
    controller.current = new CaptureController({
      state: setCapture,
      error: (err) => {
        activeMedia.current = false;
        locked.current = false;
        setBusy(false);
        setError(
          `${C.live.captureFailed} ${err instanceof Error ? err.message : ""}`,
        );
      },
      complete: (result) => {
        void (async () => {
          try {
            const name = availableName(
                result.mime.includes("mp4")
                  ? "recording.mp4"
                  : "recording.webm",
                files,
              ),
              file: WorkspaceFile = {
                name,
                blob: result.blob,
                origin: "captured",
              };
            await save([file]);
            select(file);
            setStatus(C.source.importedReady);
          } catch (err) {
            fail(err);
          } finally {
            activeMedia.current = false;
            locked.current = false;
            setBusy(false);
          }
        })();
      },
    });
    void controller.current.start(false);
  }
  function cancel() {
    if (savingRef.current) return;
    activeMedia.current = false;
    generation.current++;
    cancelProcessing();
    controller.current?.destroy();
    controller.current = null;
    setCapture("idle");
    locked.current = false;
    setBusy(false);
    setStatus(C.live.cancelled);
    requestAnimationFrame(() => commandRef.current?.focus());
  }
  async function run() {
    if (locked.current) return;
    setError("");
    setStatus("");
    let plan: ReturnType<typeof planRun>;
    try {
      if (!source) throw new Error(C.command.selectSource);
      if (!command.trim()) throw new Error(C.command.empty);
      if (d.mode === "builder") {
        if (stage === 1 && !options.streams && !options.format)
          throw new Error(C.command.chooseReport);
        if (stage === 2) {
          if (
            !options.start ||
            !options.duration ||
            !Number.isFinite(+options.start) ||
            +options.start < 0 ||
            !Number.isFinite(+options.duration) ||
            +options.duration <= 0
          )
            throw new Error(C.command.invalidTime);
          if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}\.mp4$/.test(options.output))
            throw new Error(C.command.invalidOutput);
        }
      }
      plan = planRun(command, files, source.name);
    } catch (err) {
      fail(err);
      return;
    }
    activeMedia.current = true;
    const id = ++generation.current,
      value = command.trim(),
      runStage = stage,
      snapshot = Object.values(files).filter((f) => f.origin !== "recipe");
    locked.current = true;
    setBusy(true);
    setLogs("");
    patchDraft({ result: undefined });
    setStatus(C.live.running);
    const active = () => generation.current === id;
    try {
      const inputs = await Promise.all(
        snapshot.map(async (f) => ({
          name: f.name,
          data: new Uint8Array(await f.blob.arrayBuffer()),
        })),
      );
      if (!active()) return;
      const result = await runTool({ ...plan, inputs }, (line) => {
        if (active()) setLogs((old) => (old + "\n" + line).slice(-60000));
      });
      if (!active()) return;
      const completed: Result = {
        command: value,
        tool: plan.tool,
        code: result.code,
        text: result.text,
      };
      if (plan.output) {
        const blob = result.bytes
          ? new Blob([result.bytes], { type: mimeFor(plan.output) })
          : new Blob([result.text!], { type: "application/json" });
        if (result.bytes) {
          const probe = await inspectMedia(blob);
          if (!active()) return;
          if (!probe.streams.length || !probe.packets?.length)
            throw new Error(C.live.emptyOutput);
        }
        const hashes = await Promise.all(
          inputs.map(async (f) => ({
            name: f.name,
            sha256: Array.from(
              new Uint8Array(await crypto.subtle.digest("SHA-256", f.data)),
            )
              .map((b) => b.toString(16).padStart(2, "0"))
              .join(""),
          })),
        );
        if (!active()) return;
        const evidence = { tool: plan.tool, args: plan.args, inputs: hashes };
        completed.file = {
          name: plan.output,
          blob,
          origin: plan.tool === "ffprobe" ? "report" : "generated",
          command: value,
          evidence,
        };
        completed.recipe = {
          name: `${plan.output}.recipe.json`,
          origin: "recipe",
          blob: new Blob(
            [
              JSON.stringify(
                {
                  command: value,
                  ...evidence,
                  created: new Date().toISOString(),
                },
                null,
                2,
              ),
            ],
            { type: "application/json" },
          ),
        };
        savingRef.current = true;
        setSaving(true);
        setStatus(C.live.saving);
        await save([completed.file, completed.recipe]);
        if (!active()) return;
      }
      setDrafts((old) => ({
        ...old,
        [runStage]: { ...old[runStage]!, result: completed },
      }));
      setStatus(C.live.finished);
      requestAnimationFrame(() => {
        resultRef.current?.focus({ preventScroll: true });
        resultRef.current?.scrollIntoView({ block: "nearest" });
      });
    } catch (err) {
      if (active()) {
        fail(err);
        setStatus(C.live.failed);
      }
    } finally {
      if (active()) {
        savingRef.current = false;
        setSaving(false);
        activeMedia.current = false;
        locked.current = false;
        setBusy(false);
      }
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setStatus(C.command.copied);
    } catch {
      commandRef.current?.focus();
      commandRef.current?.select();
      setStatus(C.command.copyFailed);
    }
  }
  const provided =
    source?.origin === "provided" &&
    /^mousepad-demo(?:-\d+)?\.mp4$/.test(source.name);
  const lesson = stage === 1 ? C.inspect : C.trim;
  const result = d.result,
    stale = result && result.command !== command.trim();
  const canCapture =
    !!navigator.mediaDevices?.getDisplayMedia &&
    typeof MediaRecorder !== "undefined";
  return (
    <>
      <a className="skip" href="#lesson">
        {C.actions.skip}
      </a>
      <header>
        <div className="topbar">
          <a className="brand" href={assetURL("")}>
            <span className="mark" aria-hidden="true">
              ▶
            </span>
            {C.brand}
          </a>
          <button
            className="quiet"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? C.actions.light : C.actions.dark}
          </button>
        </div>
      </header>
      <main>
        <nav aria-label={C.stepsLabel}>
          <ol className="steps">
            {C.steps.map((name, i) => (
              <li key={name}>
                <button
                  disabled={busy || !ready || (i > 0 && !source)}
                  aria-current={stage === i ? "step" : undefined}
                  onClick={() => go(i)}
                >
                  <span className="step-number">{i + 1}</span>
                  {name}
                </button>
              </li>
            ))}
          </ol>
        </nav>
        {!ready ? (
          <p role="status">{C.live.loading}</p>
        ) : stage === 0 ? (
          <>
            <div className="eyebrow">
              {C.step} 1 {C.of} 3 · {C.title}
            </div>
            <h1 id="lesson" ref={heading} tabIndex={-1}>
              {C.source.heading}
            </h1>
            <p className="intro">{C.source.intro}</p>
            <div className="source-layout">
              <div>
                <fieldset disabled={busy}>
                  <div className="source-options">
                    <div className="source-option">
                      <button
                        className="primary"
                        onClick={() => void practice()}
                      >
                        {C.source.sample}
                      </button>
                      <small>{C.source.sampleNote}</small>
                    </div>
                    <div className="source-option">
                      <button onClick={() => picker.current?.click()}>
                        {C.source.import}
                      </button>
                      <small>{C.source.importNote}</small>
                    </div>
                    <div className="source-option">
                      <button
                        onClick={record}
                        disabled={!canCapture}
                        aria-describedby="record-note"
                      >
                        {C.source.record}
                      </button>
                      <small id="record-note">
                        {canCapture
                          ? C.live.captureNote
                          : C.live.captureUnavailable}
                      </small>
                    </div>
                  </div>
                </fieldset>
                {capture !== "idle" && (
                  <div className="row">
                    <p role="status">
                      {capture === "requesting"
                        ? C.live.requestCapture
                        : C.live.capturing}
                    </p>
                    <button
                      onClick={() => controller.current?.stop()}
                      disabled={capture !== "recording"}
                    >
                      {C.live.stop}
                    </button>
                    <button onClick={cancel}>{C.live.cancel}</button>
                  </div>
                )}
                <p className="privacy">{C.source.privacy}</p>
              </div>
              <section className="source-preview" aria-label={C.source.chosen}>
                {source ? (
                  <>
                    <Playback key={source.name} file={source} />
                    <div className="source-caption">
                      <h2>
                        <code>{source.name}</code>
                      </h2>
                      <small>
                        {provided ? C.source.provided : C.live[source.origin]} ·{" "}
                        {source.blob.size.toLocaleString()} {C.files.bytes}
                      </small>
                      <p>
                        {provided ? C.source.watch : C.source.watchImported}
                      </p>
                      <p className="help-note">{C.live.replayTip}</p>
                      <button
                        className="quiet"
                        onClick={() => download(source.blob, source.name)}
                      >
                        {C.source.download}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty">{C.source.empty}</div>
                )}
              </section>
            </div>
            <div className="next-row">
              <span />
              <button
                className="primary"
                disabled={!source || busy}
                onClick={() => go(1)}
              >
                {C.source.next} →
              </button>
            </div>
          </>
        ) : (
          <div className="layout">
            <section>
              <div className="eyebrow">
                {C.step} {stage + 1} {C.of} 3 · {C.steps[stage]}
              </div>
              <h1 ref={heading} id="lesson" tabIndex={-1}>
                {lesson.heading}
              </h1>
              <p className="intro">
                {stage === 2 && !provided ? C.trim.importTask : lesson.intro}
              </p>
              <div className="source-chip">
                <div>
                  <small>{C.files.source}</small>
                  <code>{source?.name}</code>
                </div>
                <button className="quiet" disabled={busy} onClick={() => go(0)}>
                  {C.source.change}
                </button>
              </div>
              <details className="source-replay">
                <summary>{C.files.replay}</summary>
                <p className="help-note">{C.live.replayTip}</p>
                {source && <Playback key={source.name} file={source} />}
              </details>
              <details className="lesson-details">
                <summary>{C.flags.heading}</summary>
                {(stage === 1
                  ? ["probeStreams", "probeFormat", "probeJson"]
                  : [
                      "input",
                      "start",
                      "duration",
                      "mapVideo",
                      "mapAudio",
                      "encode",
                      "pixels",
                    ]
                ).map((k) => (
                  <p key={k}>{C.flags[k as keyof typeof C.flags]}</p>
                ))}
                <p>{stage === 1 ? C.inspect.predict : C.trim.predict}</p>
              </details>
            </section>
            <section className="card" aria-labelledby="command-heading">
              <div className="card-head">
                <h2 id="command-heading">{C.command.heading}</h2>
                <span className="tag">
                  {stage === 1 ? "ffprobe" : "ffmpeg"}
                </span>
              </div>
              <fieldset disabled={busy}>
                <div
                  className="segmented"
                  role="group"
                  aria-label={C.command.heading}
                >
                  <button
                    aria-pressed={d.mode === "builder"}
                    onClick={() => {
                      if (d.mode === "manual" && d.text !== built)
                        setSwitching(true);
                      else patchDraft({ mode: "builder" });
                    }}
                  >
                    {C.command.builder}
                  </button>
                  <button
                    aria-pressed={d.mode === "manual"}
                    onClick={() => {
                      if (d.mode !== "manual")
                        patchDraft({ mode: "manual", text: built });
                      setSwitching(false);
                      requestAnimationFrame(() => commandRef.current?.focus());
                    }}
                  >
                    {C.command.manual}
                  </button>
                </div>
                {switching && (
                  <div className="warning" role="alert">
                    {C.command.customWarning}
                    <div className="row">
                      <button
                        onClick={() => {
                          setSwitching(false);
                          requestAnimationFrame(() =>
                            commandRef.current?.focus(),
                          );
                        }}
                      >
                        {C.command.keepEditing}
                      </button>
                      <button
                        onClick={() => {
                          patchDraft({ mode: "builder", restored: d.text });
                          setSwitching(false);
                          requestAnimationFrame(() =>
                            commandRef.current?.focus(),
                          );
                        }}
                      >
                        {C.command.replace}
                      </button>
                    </div>
                  </div>
                )}
                {d.mode === "builder" ? (
                  <div className="builder">
                    {stage === 1 ? (
                      <>
                        <label className="check wide">
                          <input
                            type="checkbox"
                            checked={options.streams}
                            onChange={(e) =>
                              changeOption("streams", e.target.checked)
                            }
                          />
                          {C.command.streams}
                        </label>
                        <label className="check wide">
                          <input
                            type="checkbox"
                            checked={options.format}
                            onChange={(e) =>
                              changeOption("format", e.target.checked)
                            }
                          />
                          {C.command.format}
                        </label>
                        <small className="wide">{C.command.json}</small>
                      </>
                    ) : (
                      <>
                        <label>
                          {C.command.start}
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            inputMode="decimal"
                            value={options.start}
                            onChange={(e) =>
                              changeOption("start", e.target.value)
                            }
                          />
                          <small>{C.command.seconds}</small>
                        </label>
                        <label>
                          {C.command.duration}
                          <input
                            type="number"
                            min="0.1"
                            step="0.5"
                            inputMode="decimal"
                            value={options.duration}
                            onChange={(e) =>
                              changeOption("duration", e.target.value)
                            }
                          />
                          <small>{C.command.seconds}</small>
                        </label>
                        <details className="wide output-settings">
                          <summary>{C.command.outputSettings}</summary>
                          <label>
                            {C.command.audio}
                            <select
                              value={options.audio}
                              onChange={(e) =>
                                changeOption("audio", e.target.value)
                              }
                            >
                              <option value="keep">
                                {C.command.keepAudio}
                              </option>
                              <option value="remove">
                                {C.command.removeAudio}
                              </option>
                            </select>
                          </label>
                          <label>
                            {C.command.output}
                            <input
                              value={options.output}
                              onChange={(e) =>
                                changeOption("output", e.target.value)
                              }
                              autoCapitalize="off"
                              autoComplete="off"
                              spellCheck={false}
                            />
                            <small>{C.command.outputHint}</small>
                          </label>
                        </details>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="help-note">{C.command.manualNote}</p>
                )}
                <label className="command-label" htmlFor="command">
                  {C.command.heading}
                  <span>FFmpeg / ffprobe</span>
                </label>
                <textarea
                  id="command"
                  aria-label={C.command.heading}
                  ref={commandRef}
                  rows={stage === 1 ? 3 : 4}
                  value={command}
                  readOnly={d.mode === "builder"}
                  onChange={(e) => {
                    patchDraft({ text: e.target.value });
                    setError("");
                  }}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck={false}
                />
                <div className="command-tools">
                  <button className="quiet" onClick={() => void copy()}>
                    {C.command.copy}
                  </button>
                  {d.restored && (
                    <button
                      className="quiet"
                      onClick={() => {
                        patchDraft({ mode: "manual", text: d.restored });
                        setSwitching(false);
                        setStatus(C.command.typedRestored);
                        requestAnimationFrame(() =>
                          commandRef.current?.focus(),
                        );
                      }}
                    >
                      {C.command.restoreTyped}
                    </button>
                  )}
                </div>
                <button className="primary" onClick={() => void run()}>
                  {C.live.run} →
                </button>
              </fieldset>
              {busy && (
                <button disabled={saving} onClick={cancel}>
                  {C.live.cancel}
                </button>
              )}
              <p className="error" role="alert">
                {error}
              </p>
              <p className="status" role="status">
                {status}
              </p>
              <div
                ref={resultRef}
                tabIndex={-1}
                className={result ? "result" : ""}
              >
                {result && (
                  <>
                    {stale && <p className="warning">{C.live.stale}</p>}
                    <h3>{C.live.result}</h3>
                    <details>
                      <summary>{C.live.outputCommand}</summary>
                      <pre>{result.command}</pre>
                    </details>
                    {result.code === -1 && (
                      <p className="help-note">{C.live.probeCleanup}</p>
                    )}
                    {result.text && (
                      <>
                        <ReportSummary text={result.text} />
                        <details>
                          <summary>{C.command.rawOutput}</summary>
                          <Output text={result.text} />
                        </details>
                      </>
                    )}{" "}
                    {result.file && (
                      <>
                        <code>{result.file.name}</code>
                        {result.file.origin === "generated" && (
                          <>
                            <Playback file={result.file} />
                            <p>{C.trim.review}</p>
                          </>
                        )}
                        <div className="row">
                          <button
                            onClick={() =>
                              download(result.file!.blob, result.file!.name)
                            }
                          >
                            {result.file.origin === "report"
                              ? C.live.downloadReport
                              : C.trim.export}
                          </button>
                          {result.recipe && (
                            <button
                              onClick={() =>
                                download(
                                  result.recipe!.blob,
                                  result.recipe!.name,
                                )
                              }
                            >
                              {C.live.downloadRecipe}
                            </button>
                          )}
                        </div>
                      </>
                    )}
                    {!result.file && result.text && (
                      <button
                        onClick={() =>
                          download(
                            new Blob([result.text!], {
                              type: "application/json",
                            }),
                            "report.json",
                          )
                        }
                      >
                        {C.live.downloadReport}
                      </button>
                    )}
                  </>
                )}
              </div>
              {logs && (
                <details className="lesson-details">
                  <summary>{C.live.logs}</summary>
                  {result && (
                    <p>
                      {C.live.exitStatus}: {result.code}
                    </p>
                  )}
                  {result?.tool === "ffmpeg" &&
                    result.code === 0 &&
                    logs.split("\n").includes("Aborted()") && (
                      <p>{C.live.encodingCleanup}</p>
                    )}
                  <Output text={logs} />
                </details>
              )}
              <p className="help-note">{C.live.firstRun}</p>
              <div className="next-row">
                <button
                  className="quiet"
                  disabled={busy}
                  onClick={() => go(stage - 1)}
                >
                  ← {C.actions.back}
                </button>
                {stage === 1 ? (
                  <button disabled={busy} onClick={() => go(2)}>
                    {C.inspect.next} →
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      download(
                        new Blob(
                          [
                            "#!/bin/sh\n# " +
                              C.copyright +
                              "\n" +
                              command +
                              "\n",
                          ],
                          { type: "text/plain" },
                        ),
                        "video-lab-command.sh",
                      )
                    }
                  >
                    {C.command.download}
                  </button>
                )}
              </div>
              <p className="boundary">{C.command.nativeBoundary}</p>
              <details className="lesson-details">
                <summary>{C.live.limitsTitle}</summary>
                <p>{C.command.browserBoundary}</p>
                <p>{C.live.limits}</p>
                <p>{C.live.toolLimit}</p>
              </details>
            </section>
          </div>
        )}
        {stage === 0 && (
          <>
            <p className="error" role="alert">
              {error}
            </p>
            <p className="status" role="status">
              {status}
            </p>
          </>
        )}
        <input
          ref={picker}
          type="file"
          accept="video/*"
          hidden
          aria-label={C.source.import}
          onChange={(e) => {
            void importFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <details className="lesson-details">
          <summary>
            {C.files.heading} · {Object.keys(files).length}
          </summary>
          {Object.values(files).map((file) => (
            <div className="file-row" key={file.name}>
              <code>{file.name}</code>
              <small>
                {file.blob.size.toLocaleString()} {C.files.bytes}
              </small>
              {file.blob.type.startsWith("video/") && (
                <button
                  disabled={busy}
                  onClick={() => {
                    select(file);
                    go(0);
                  }}
                >
                  {C.live.useSource}
                </button>
              )}
              <button onClick={() => download(file.blob, file.name)}>
                {C.files.download}
              </button>
              <button disabled={busy} onClick={() => setRemove(file.name)}>
                {C.live.remove}
              </button>
              {remove === file.name && (
                <div className="warning" role="alert">
                  <p>{C.live.removeConfirm.replace("{name}", file.name)}</p>
                  <button
                    onClick={() =>
                      void setup(async () => {
                        await disk("readwrite", (s) => s.delete(file.name));
                        setFiles((old) => {
                          const next = { ...old };
                          delete next[file.name];
                          return next;
                        });
                        if (sourceName === file.name) {
                          setSourceName("");
                          go(0);
                        }
                        setRemove("");
                      })
                    }
                  >
                    {C.live.remove}
                  </button>
                  <button onClick={() => setRemove("")}>
                    {C.live.keepFile}
                  </button>
                </div>
              )}
            </div>
          ))}
        </details>
      </main>
      <footer className="workbench-footer">
        <span>{C.copyright}</span>
        <div>
          <a href={assetURL("")}>{C.live.course}</a>
        </div>
        <div className="shared-controls">
          <OfflineAccess />
          <EncoderOffline />
          <ReleaseStatus />
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("app")!).render(<App />);
