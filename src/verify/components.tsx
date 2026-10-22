// Copyright © 2026 Christopher Snow
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import {
  buildReencode,
  buildProbe,
  parseProbe,
  type ProbeResult,
} from "../encode/commands";
import {
  createBrowserRunner,
  type JobState,
  type Runner,
} from "../encode/runner";
import { v } from "./strings";

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
      {failed && <p role="alert">{v.unavailable}</p>}
    </div>
  );
}

export function CandidatePlayers() {
  return (
    <div className="edit-boundaries">
      <Player file={v.candidates.plain.file} label={v.candidates.plain.label} />
      <Player
        file={v.candidates.captioned.file}
        label={v.candidates.captioned.label}
      />
      <Player file={v.candidates.half.file} label={v.candidates.half.label} />
    </div>
  );
}

function streamSummary(probe: ProbeResult): string[] {
  return probe.streams.map((s) =>
    s.codecType === "video"
      ? v.streamRow(
          v.video,
          `${s.codecName} ${s.width ?? "?"} × ${s.height ?? "?"}`,
        )
      : s.codecType === "audio"
        ? v.streamRow(
            v.audio,
            `${s.codecName} ${s.sampleRate ?? "?"} Hz × ${s.channels ?? "?"} ch`,
          )
        : v.streamRow(s.codecType, s.codecName),
  );
}

const RECORDED_PROBES: Record<
  string,
  { streams: string[]; duration: number; bytes: number }
> = {
  [v.candidates.plain.file]: {
    streams: ["Video: h264 960 × 540", "Audio: aac 48000 Hz × 1 ch"],
    duration: 10.0,
    bytes: v.candidates.plain.bytes,
  },
  [v.candidates.captioned.file]: {
    streams: ["Video: h264 960 × 540", "Audio: aac 48000 Hz × 1 ch"],
    duration: v.candidates.captioned.duration,
    bytes: v.candidates.captioned.bytes,
  },
  [v.candidates.half.file]: {
    streams: ["Video: h264 640 × 360", "Audio: aac 48000 Hz × 1 ch"],
    duration: v.candidates.half.duration,
    bytes: v.candidates.half.bytes,
  },
};

export function CandidateProbes() {
  const rows = [v.candidates.plain, v.candidates.captioned, v.candidates.half];
  return (
    <table className="sound-levels">
      <caption>{v.tableLabel}</caption>
      <thead>
        <tr>
          <th scope="col">{v.fileLabel}</th>
          <th scope="col">{v.streams}</th>
          <th scope="col">{v.duration}</th>
          <th scope="col">{v.size}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((c) => {
          const probe = RECORDED_PROBES[c.file]!;
          return (
            <tr key={c.file}>
              <td>{c.label}</td>
              <td>
                {probe.streams.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </td>
              <td>{probe.duration} s</td>
              <td>
                {probe.bytes} {v.bytes}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

interface ExportResult {
  readonly url: string;
  readonly bytes: number;
  readonly probe?: ProbeResult;
  readonly command: string;
  readonly probeCommand: string;
}

const DEFAULTS = { width: 960, height: 540, crf: 23 };

export function ExportEditor() {
  const runnerRef = useRef<Runner | undefined>(undefined);
  const [state, setState] = useState<JobState>({ kind: "idle" });
  const [settings, setSettings] = useState(DEFAULTS);
  const [result, setResult] = useState<ExportResult | undefined>();
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
        output: "export.mp4",
      });
      const probeArgs = buildProbe("export.mp4");
      const outcome = await runner.run({
        label: v.export,
        write: { "source.mp4": source },
        steps: [
          { type: "EXEC", args },
          { type: "FFPROBE", args: probeArgs },
        ],
        read: ["export.mp4"],
        signal: controller.signal,
      });
      const bytes = outcome.files["export.mp4"];
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
        probe,
        command: `ffmpeg ${args.join(" ")}`,
        probeCommand: `ffprobe ${probeArgs.join(" ")}`,
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
  const videoStream = result?.probe?.streams.find(
    (s) => s.codecType === "video",
  );
  const audioStream = result?.probe?.streams.find(
    (s) => s.codecType === "audio",
  );
  return (
    <div className="recorder">
      <div className="field-grid">
        <label className="control-label">
          {v.width}
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
          {v.height}
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
          {v.crf}
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
      <div className="encode-controls">
        <button onClick={() => void run()} disabled={running || !even}>
          {v.export}
        </button>
        {running && <button onClick={() => runner.cancel()}>{v.cancel}</button>}
      </div>
      <p className="player-note" aria-live="polite">
        {state.kind === "idle" && v.statusIdle}
        {state.kind === "loading" && v.statusLoading}
        {state.kind === "running" && v.statusRunning}
        {state.kind === "done" && v.statusDone}
        {state.kind === "failed" && `${v.statusFailed} ${state.message}`}
      </p>
      {result && (
        <div className="recorder-result">
          <pre className="encode-command">
            <span className="muted">{v.commandLabel}: </span>
            {result.command}
          </pre>
          <pre className="encode-command">
            <span className="muted">{v.probeCommandLabel}: </span>
            {result.probeCommand}
          </pre>
          <video src={result.url} controls playsInline preload="metadata" />
          <dl className="encode-facts">
            <dt>{v.size}</dt>
            <dd>
              {result.bytes} {v.bytes}
            </dd>
            {result.probe && (
              <>
                <dt>{v.duration}</dt>
                <dd>
                  {result.probe.duration !== undefined
                    ? `${result.probe.duration} s`
                    : "—"}
                </dd>
              </>
            )}
            {videoStream && videoStream.width && videoStream.height && (
              <>
                <dt>{v.resolution}</dt>
                <dd>
                  {videoStream.width} × {videoStream.height}
                </dd>
              </>
            )}
            <dt>{v.streams}</dt>
            <dd>
              {result.probe
                ? streamSummary(result.probe).map((s) => <div key={s}>{s}</div>)
                : v.noStream}
            </dd>
            <dt>{v.audio}</dt>
            <dd>
              {audioStream
                ? `${audioStream.codecName} ${audioStream.sampleRate ?? "?"} Hz × ${audioStream.channels ?? "?"} ch`
                : v.noStream}
            </dd>
          </dl>
          <a className="button" href={result.url} download="export.mp4">
            {v.download}
          </a>
        </div>
      )}
      {failed && (
        <p className="player-note" role="note">
          {v.unavailable}
        </p>
      )}
      <p className="player-note">{v.note}</p>
    </div>
  );
}

export function BrokenCandidate() {
  return (
    <div className="edit-boundaries">
      <Player file={v.brokenFile} label={v.brokenLabel} />
      <table className="sound-levels">
        <caption>{v.tableLabel}</caption>
        <tbody>
          <tr>
            <td>{v.brokenLabel}</td>
            <td>{v.streamRow(v.video, "h264 960 × 540")}</td>
            <td>10 s</td>
            <td>44659 {v.bytes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function VerifyReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "verify-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {v.sections.reflection}
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
