// Copyright © 2026 Christopher Snow
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import { buildReencode, buildProbe, parseProbe } from "../encode/commands";
import {
  createBrowserRunner,
  type JobState,
  type Runner,
} from "../encode/runner";
import { q } from "./strings";

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(asset(path));
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return new Uint8Array(await response.arrayBuffer());
}

function Player({ file, label }: { file: string; label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="edit-recording">
      <p>
        <strong>{label}</strong>
      </p>
      <video
        aria-label={label}
        controls
        playsInline
        preload="metadata"
        src={asset(file)}
        onError={() => setFailed(true)}
      />
      {failed && <p role="alert">{q.unavailable}</p>}
    </div>
  );
}

export function QualityPlayers() {
  return (
    <div className="edit-boundaries">
      <Player file={q.variants.crf18.file} label={q.variants.crf18.label} />
      <Player file={q.variants.crf23.file} label={q.variants.crf23.label} />
      <Player file={q.variants.crf35.file} label={q.variants.crf35.label} />
    </div>
  );
}

export function QualityStills() {
  const variants = [
    q.variants.crf18,
    q.variants.crf23,
    q.variants.crf35,
    q.variants.quarter,
  ];
  return (
    <>
      <div className="edit-boundaries quality-stills">
        {variants.map((v) => (
          <figure key={v.file} className="edit-boundary">
            <figcaption>{v.label}</figcaption>
            <img
              src={asset(v.still)}
              alt={q.stillAlt(v.label)}
              width={v.label.startsWith("480") ? 480 : 640}
              height={v.label.startsWith("480") ? 270 : 360}
              style={{ height: "auto" }}
            />
          </figure>
        ))}
      </div>
      <table className="sound-levels">
        <caption>{q.tableLabel}</caption>
        <thead>
          <tr>
            <th scope="col">{q.fileLabel}</th>
            <th scope="col">{q.size}</th>
            <th scope="col">{q.bitrate}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{q.fullFrame.label}</td>
            <td>
              {q.fullFrame.bytes} {q.bytes}
            </td>
            <td>
              {q.fullFrame.bitrate} {q.bitsPerSecond}
            </td>
          </tr>
          {variants.map((v) => (
            <tr key={v.file}>
              <td>{v.label}</td>
              <td>
                {v.bytes} {q.bytes}
              </td>
              <td>
                {v.bitrate} {q.bitsPerSecond}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface ReencodeResult {
  readonly url: string;
  readonly bytes: number;
  readonly bitrate?: number;
  readonly probe?: ReturnType<typeof parseProbe>;
  readonly command: string;
}

const DEFAULTS = { width: 640, height: 360, crf: 23 };

export function QualityEditor() {
  const runnerRef = useRef<Runner | undefined>(undefined);
  const [state, setState] = useState<JobState>({ kind: "idle" });
  const [settings, setSettings] = useState(DEFAULTS);
  const [result, setResult] = useState<ReencodeResult | undefined>();
  const [failed, setFailed] = useState(false);
  const abortRef = useRef<AbortController | undefined>(undefined);
  const urlRef = useRef<string | undefined>(undefined);

  const runner = useMemo(() => {
    if (!runnerRef.current) runnerRef.current = createBrowserRunner();
    return runnerRef.current;
  }, []);
  useEffect(() => {
    const unsubscribe = runner.subscribe(setState);
    return () => {
      unsubscribe();
      runner.dispose();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, [runner]);

  const update = (key: keyof typeof DEFAULTS, value: number) =>
    setSettings((s) => ({ ...s, [key]: value }));

  const run = async () => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = undefined;
    }
    setResult(undefined);
    setFailed(false);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const source = await fetchBytes("build-queue.mp4");
      const args = buildReencode({
        input: "source.mp4",
        width: settings.width,
        height: settings.height,
        crf: settings.crf,
        output: "reencoded.mp4",
      });
      const outcome = await runner.run({
        label: q.run,
        write: { "source.mp4": source },
        steps: [
          { type: "EXEC", args },
          { type: "FFPROBE", args: buildProbe("reencoded.mp4") },
        ],
        read: ["reencoded.mp4"],
        signal: controller.signal,
      });
      const bytes = outcome.files["reencoded.mp4"];
      if (!bytes) throw new Error("The run produced no file");
      const probe = parseProbe(
        outcome.steps.find((s) =>
          s.log.some((line) => line.includes('"streams"')),
        )?.log ?? outcome.log,
      );
      const url = URL.createObjectURL(
        new Blob([new Uint8Array(bytes)], { type: "video/mp4" }),
      );
      urlRef.current = url;
      setResult({
        url,
        bytes: bytes.length,
        bitrate:
          probe?.duration && probe.duration > 0
            ? Math.round((bytes.length * 8) / probe.duration)
            : undefined,
        probe,
        command: `ffmpeg ${args.join(" ")}`,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Cancelled") return;
      setFailed(true);
    }
  };

  const running = state.kind === "loading" || state.kind === "running";
  const even =
    settings.width % 2 === 0 &&
    settings.height % 2 === 0 &&
    settings.crf >= 0 &&
    settings.crf <= 51;
  return (
    <div className="recorder">
      <div className="field-grid">
        <label className="control-label">
          {q.width}
          <select
            value={settings.width}
            disabled={running}
            onChange={(e) => update("width", Number(e.target.value))}
          >
            {[480, 640, 960].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
        <label className="control-label">
          {q.height}
          <select
            value={settings.height}
            disabled={running}
            onChange={(e) => update("height", Number(e.target.value))}
          >
            {[270, 360, 540].map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>
        <label className="control-label">
          {q.crf}
          <input
            type="number"
            min={0}
            max={51}
            step={1}
            value={settings.crf}
            disabled={running}
            onChange={(e) => update("crf", Number(e.target.value))}
          />
        </label>
      </div>
      <p className="player-note">{q.crfNote}</p>
      <div className="encode-controls">
        <button onClick={() => void run()} disabled={running || !even}>
          {q.run}
        </button>
        {running && <button onClick={() => runner.cancel()}>{q.cancel}</button>}
      </div>
      <p className="player-note" aria-live="polite">
        {state.kind === "idle" && q.statusIdle}
        {state.kind === "loading" && q.statusLoading}
        {state.kind === "running" && q.statusRunning}
        {state.kind === "done" && q.statusDone}
        {state.kind === "failed" && `${q.statusFailed} ${state.message}`}
      </p>
      {result && (
        <div className="recorder-result">
          <pre className="encode-command">
            <span className="muted">{q.commandLabel}: </span>
            {result.command}
          </pre>
          <video src={result.url} controls playsInline preload="metadata" />
          <dl className="encode-facts">
            <dt>{q.size}</dt>
            <dd>
              {result.bytes} {q.bytes}
            </dd>
            {result.bitrate !== undefined && (
              <>
                <dt>{q.bitrate}</dt>
                <dd>
                  {result.bitrate} {q.bitsPerSecond}
                </dd>
              </>
            )}
            {result.probe && (
              <>
                <dt>{q.resolution}</dt>
                <dd>
                  {(() => {
                    const v = result.probe.streams.find(
                      (s) => s.codecType === "video",
                    );
                    return v?.width && v.height
                      ? `${v.width} × ${v.height}`
                      : "—";
                  })()}
                </dd>
                <dt>{q.duration}</dt>
                <dd>
                  {result.probe.duration !== undefined
                    ? `${result.probe.duration} s`
                    : "—"}
                </dd>
              </>
            )}
          </dl>
          <a className="button" href={result.url} download="reencoded.mp4">
            {q.download}
          </a>
        </div>
      )}
      {failed && (
        <p className="player-note" role="note">
          {q.unavailable}
        </p>
      )}
      <p className="player-note">{q.note}</p>
    </div>
  );
}

export function QuarterSize() {
  return (
    <Player file={q.variants.quarter.file} label={q.variants.quarter.label} />
  );
}

export function QualityReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "quality-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {q.sections.reflection}
        <textarea
          value={notes ?? ""}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <p className="player-note">
        Saved in this browser when storage is available. These notes are not
        graded.
      </p>
      <button onClick={() => setNotes("")}>Clear notes</button>
    </div>
  );
}
