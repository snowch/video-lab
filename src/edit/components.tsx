// Copyright © 2026 Christopher Snow
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import { buildCropScale, buildProbe, parseProbe } from "../encode/commands";
import {
  createBrowserRunner,
  type JobState,
  type Runner,
} from "../encode/runner";
import { ed } from "./strings";

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
      {failed && <p role="alert">{ed.unavailable}</p>}
    </div>
  );
}

export function ReadabilitySource() {
  return <Player file={ed.fullFrameFile} label={ed.fullFrame} />;
}

export function ReadabilityComparison() {
  return (
    <div className="edit-boundaries">
      <Player file={ed.fullFrameFile} label={ed.fullFrame} />
      <Player file={ed.croppedFile} label={ed.cropped} />
    </div>
  );
}

export function ScaledDown() {
  return <Player file={ed.scaledDownFile} label={ed.scaledDownCaption} />;
}

export function Callouts() {
  return (
    <div className="edit-boundaries">
      <Player file={ed.calloutFile} label={ed.calloutCaption} />
      <Player file={ed.timedCalloutFile} label={ed.timedCalloutCaption} />
    </div>
  );
}

export function Pacing() {
  return (
    <div className="edit-boundaries">
      <Player file={ed.zoomPanFile} label={ed.zoomPanCaption} />
      <Player file={ed.crossfadeFile} label={ed.crossfadeCaption} />
    </div>
  );
}

interface CropResult {
  readonly url: string;
  readonly bytes: number;
  readonly probe?: ReturnType<typeof parseProbe>;
  readonly command: string;
}

const DEFAULTS = { w: 480, h: 270, x: 240, y: 135, outW: 960, outH: 540 };

export function CropEditor() {
  const runnerRef = useRef<Runner | undefined>(undefined);
  const [state, setState] = useState<JobState>({ kind: "idle" });
  const [geometry, setGeometry] = useState(DEFAULTS);
  const [result, setResult] = useState<CropResult | undefined>();
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
    setGeometry((g) => ({ ...g, [key]: value }));

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
      const args = buildCropScale({
        input: "source.mp4",
        crop: {
          w: geometry.w,
          h: geometry.h,
          x: geometry.x,
          y: geometry.y,
        },
        scale: { w: geometry.outW, h: geometry.outH },
        output: "cropped.mp4",
      });
      const outcome = await runner.run({
        label: ed.run,
        write: { "source.mp4": source },
        steps: [
          { type: "EXEC", args },
          { type: "FFPROBE", args: buildProbe("cropped.mp4") },
        ],
        read: ["cropped.mp4"],
        signal: controller.signal,
      });
      const bytes = outcome.files["cropped.mp4"];
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
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Cancelled") return;
      setFailed(true);
    }
  };

  const running = state.kind === "loading" || state.kind === "running";
  const even =
    geometry.w % 2 === 0 &&
    geometry.h % 2 === 0 &&
    geometry.outW % 2 === 0 &&
    geometry.outH % 2 === 0;
  return (
    <div className="recorder">
      <div className="field-grid">
        <label className="control-label">
          {ed.width}
          <input
            type="number"
            min={2}
            max={960}
            step={2}
            value={geometry.w}
            disabled={running}
            onChange={(e) => update("w", Number(e.target.value))}
          />
        </label>
        <label className="control-label">
          {ed.height}
          <input
            type="number"
            min={2}
            max={540}
            step={2}
            value={geometry.h}
            disabled={running}
            onChange={(e) => update("h", Number(e.target.value))}
          />
        </label>
        <label className="control-label">
          {ed.x}
          <input
            type="number"
            min={0}
            max={960}
            step={2}
            value={geometry.x}
            disabled={running}
            onChange={(e) => update("x", Number(e.target.value))}
          />
        </label>
        <label className="control-label">
          {ed.y}
          <input
            type="number"
            min={0}
            max={540}
            step={2}
            value={geometry.y}
            disabled={running}
            onChange={(e) => update("y", Number(e.target.value))}
          />
        </label>
        <label className="control-label">
          {ed.outWidth}
          <input
            type="number"
            min={2}
            max={1920}
            step={2}
            value={geometry.outW}
            disabled={running}
            onChange={(e) => update("outW", Number(e.target.value))}
          />
        </label>
        <label className="control-label">
          {ed.outHeight}
          <input
            type="number"
            min={2}
            max={1080}
            step={2}
            value={geometry.outH}
            disabled={running}
            onChange={(e) => update("outH", Number(e.target.value))}
          />
        </label>
      </div>
      <p className="player-note">{ed.evenNote}</p>
      <div className="encode-controls">
        <button onClick={() => void run()} disabled={running || !even}>
          {ed.run}
        </button>
        {running && (
          <button onClick={() => runner.cancel()}>{ed.cancel}</button>
        )}
      </div>
      <p className="player-note" aria-live="polite">
        {state.kind === "idle" && ed.statusIdle}
        {state.kind === "loading" && ed.statusLoading}
        {state.kind === "running" && ed.statusRunning}
        {state.kind === "done" && ed.statusDone}
        {state.kind === "failed" && `${ed.statusFailed} ${state.message}`}
      </p>
      {result && (
        <div className="recorder-result">
          <pre className="encode-command">
            <span className="muted">{ed.commandLabel}: </span>
            {result.command}
          </pre>
          <video src={result.url} controls playsInline preload="metadata" />
          <dl className="encode-facts">
            <dt>{ed.size}</dt>
            <dd>{result.bytes} bytes</dd>
            {result.probe && (
              <>
                <dt>{ed.resolution}</dt>
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
                <dt>{ed.duration}</dt>
                <dd>
                  {result.probe.duration !== undefined
                    ? `${result.probe.duration} s`
                    : "—"}
                </dd>
              </>
            )}
          </dl>
          <a className="button" href={result.url} download="cropped.mp4">
            {ed.download}
          </a>
        </div>
      )}
      {failed && (
        <p className="player-note" role="note">
          {ed.unavailable}
        </p>
      )}
      <p className="player-note">{ed.note}</p>
    </div>
  );
}

export function EditReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "edit-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {ed.sections.reflection}
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
