// Copyright © 2026 Christopher Snow
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import {
  buildVolumeDetect,
  parseVolume,
  type VolumeReading,
} from "../encode/commands";
import {
  createBrowserRunner,
  type JobState,
  type Runner,
} from "../encode/runner";
import { sd } from "./strings";

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(asset(path));
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return new Uint8Array(await response.arrayBuffer());
}

function SoundPlayer({ file, label }: { file: string; label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="edit-recording">
      <p>
        <strong>{label}</strong>
      </p>
      <audio
        aria-label={label}
        controls
        preload="metadata"
        src={asset(file)}
        onError={() => setFailed(true)}
      />
      {failed && <p role="alert">{sd.unavailable}</p>}
    </div>
  );
}

export function SoundPlayers() {
  const files = [
    sd.files.original,
    sd.files.quiet,
    sd.files.loud,
    sd.files.over,
    sd.files.band,
  ];
  return (
    <div className="edit-boundaries sound-grid">
      {files.map((f) => (
        <SoundPlayer key={f.file} file={f.file} label={f.label} />
      ))}
    </div>
  );
}

const MEASURED: Record<string, VolumeReading> = {
  [sd.files.original.file]: { mean: -21.1, max: -18.1 },
  [sd.files.quiet.file]: { mean: -47.1, max: -44.1 },
  [sd.files.loud.file]: { mean: -27.1, max: -24.1 },
  [sd.files.over.file]: { mean: -15.1, max: -12.0 },
  [sd.files.band.file]: { mean: -21.3, max: -17.8 },
};

export function SoundLevels() {
  return (
    <table className="sound-levels">
      <thead>
        <tr>
          <th scope="col">{sd.fileLabel}</th>
          <th scope="col">{sd.meanVolume}</th>
          <th scope="col">{sd.maxVolume}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(MEASURED).map(([file, reading]) => (
          <tr key={file}>
            <td>{labelFor(file)}</td>
            <td>
              {reading.mean} {sd.db}
            </td>
            <td>
              {reading.max} {sd.db}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function labelFor(file: string): string {
  const entry = Object.values(sd.files).find((f) => f.file === file);
  return entry?.label ?? file;
}

interface MeasureResult {
  readonly reading: VolumeReading;
  readonly command: string;
}

export function SoundEditor() {
  const runnerRef = useRef<Runner | undefined>(undefined);
  const [state, setState] = useState<JobState>({ kind: "idle" });
  const [result, setResult] = useState<MeasureResult | undefined>();
  const [failed, setFailed] = useState(false);
  const abortRef = useRef<AbortController | undefined>(undefined);

  const runner = useMemo(() => {
    if (!runnerRef.current) runnerRef.current = createBrowserRunner();
    return runnerRef.current;
  }, []);
  useEffect(() => {
    const unsubscribe = runner.subscribe(setState);
    return () => {
      unsubscribe();
      runner.dispose();
    };
  }, [runner]);

  const run = async () => {
    setResult(undefined);
    setFailed(false);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const source = await fetchBytes(sd.quietAudioFile);
      const args = buildVolumeDetect("source.mp4");
      const outcome = await runner.run({
        label: sd.measuring,
        write: { "source.mp4": source },
        steps: [{ type: "EXEC", args }],
        signal: controller.signal,
      });
      const reading = parseVolume(outcome.log);
      if (!reading) throw new Error("The measurement produced no levels");
      setResult({ reading, command: `ffmpeg ${args.join(" ")}` });
    } catch (error) {
      if (error instanceof Error && error.message === "Cancelled") return;
      setFailed(true);
    }
  };

  const running = state.kind === "loading" || state.kind === "running";
  return (
    <div className="recorder">
      <div className="encode-controls">
        <button onClick={() => void run()} disabled={running}>
          {sd.measure}
        </button>
        {running && (
          <button onClick={() => runner.cancel()}>{sd.cancel}</button>
        )}
      </div>
      <p className="player-note" aria-live="polite">
        {state.kind === "idle" && sd.notMeasured}
        {state.kind === "loading" && sd.statusLoading}
        {state.kind === "running" && sd.measuring}
        {state.kind === "done" && sd.measured}
        {state.kind === "failed" && `${sd.statusFailed} ${state.message}`}
      </p>
      {result && (
        <div className="recorder-result">
          <pre className="encode-command">
            <span className="muted">{sd.commandLabel}: </span>
            {result.command}
          </pre>
          <dl className="encode-facts">
            <dt>{sd.meanVolume}</dt>
            <dd>
              {result.reading.mean} {sd.db}
            </dd>
            <dt>{sd.maxVolume}</dt>
            <dd>
              {result.reading.max} {sd.db}
            </dd>
          </dl>
        </div>
      )}
      {failed && (
        <p className="player-note" role="note">
          {sd.unavailable}
        </p>
      )}
      <p className="player-note">{sd.measureNote}</p>
    </div>
  );
}

export function OverDriven() {
  return (
    <div className="edit-recording">
      <p>
        <strong>{sd.files.over.label}</strong>
      </p>
      <audio
        aria-label={sd.files.over.label}
        controls
        preload="metadata"
        src={asset(sd.files.over.file)}
      />
      <p className="player-note">
        {sd.overMeasured}: {MEASURED[sd.files.over.file]!.mean} {sd.db} mean,{" "}
        {MEASURED[sd.files.over.file]!.max} {sd.db} max.
      </p>
    </div>
  );
}

export function SoundReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "sound-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {sd.sections.reflection}
        <textarea
          value={notes ?? ""}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <p className="player-note">
        Saved in this browser when storage is available. These notes are not
        graded.
      </p>
      <button onClick={() => setNotes("")}>{sd.clearNotes}</button>
    </div>
  );
}
