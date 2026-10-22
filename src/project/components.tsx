// Copyright © 2026 Christopher Snow
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import { buildProbe, parseProbe, type ProbeResult } from "../encode/commands";
import {
  createBrowserRunner,
  type JobState,
  type Runner,
} from "../encode/runner";
import { recipeJobSteps, recipeSteps } from "./recipe";
import { p } from "./strings";

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(asset(path));
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return new Uint8Array(await response.arrayBuffer());
}

async function fetchText(path: string): Promise<string> {
  const response = await fetch(asset(path));
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.text();
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
      {failed && <p role="alert">{p.unavailable}</p>}
    </div>
  );
}

export function RecipeView() {
  return (
    <div className="recorder">
      <p className="player-note">
        <strong>{p.recipeLabel}</strong>
      </p>
      {recipeSteps.map((step) => (
        <div key={step.n} className="edit-boundary">
          <p>
            <strong>{p.stepLabel(step.n, step.name)}</strong> ({step.module})
          </p>
          <p>{step.why}</p>
          <pre className="encode-command">{step.command}</pre>
          <p className="player-note">Recorded output: {step.recordedFacts}</p>
          <Player file={step.recordedFile} label={`Step ${step.n} output`} />
        </div>
      ))}
      <p className="player-note">{p.recipeNote}</p>
    </div>
  );
}

interface RecipeResult {
  readonly url: string;
  readonly bytes: number;
  readonly probe?: ProbeResult;
  readonly commands: readonly string[];
}

const FONT_FILE = "font.ttf";
const FONT_PATH = "fonts/DejaVuSans-Bold.ttf";

export function RecipeRunner() {
  const runnerRef = useRef<Runner | undefined>(undefined);
  const [state, setState] = useState<JobState>({ kind: "idle" });
  const [result, setResult] = useState<RecipeResult | undefined>();
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
      const [source, srtText, font] = await Promise.all([
        fetchBytes("build-queue.mp4"),
        fetchText("edit/captions.srt"),
        fetchBytes(FONT_PATH),
      ]);
      const outcome = await runner.run({
        label: p.run,
        write: {
          "source.mp4": source,
          "captions.srt": new TextEncoder().encode(srtText),
          [FONT_FILE]: font,
        },
        steps: recipeJobSteps(),
        read: ["final.mp4"],
        signal: controller.signal,
      });
      const bytes = outcome.files["final.mp4"];
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
        commands: recipeSteps.map((s) => `ffmpeg ${s.args.join(" ")}`),
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Cancelled") return;
      setFailed(true);
    }
  };

  const running = state.kind === "loading" || state.kind === "running";
  const videoStream = result?.probe?.streams.find(
    (s) => s.codecType === "video",
  );
  const audioStream = result?.probe?.streams.find(
    (s) => s.codecType === "audio",
  );
  return (
    <div className="recorder">
      <div className="encode-controls">
        <button onClick={() => void run()} disabled={running}>
          {p.run}
        </button>
        {running && <button onClick={() => runner.cancel()}>{p.cancel}</button>}
      </div>
      <p className="player-note" aria-live="polite">
        {state.kind === "idle" && p.statusIdle}
        {state.kind === "loading" && p.statusLoading}
        {state.kind === "running" && p.statusRunning}
        {state.kind === "done" && p.statusDone}
        {state.kind === "failed" && `${p.statusFailed} ${state.message}`}
      </p>
      {result && (
        <div className="recorder-result">
          <p className="muted">{p.commandLabel}:</p>
          {result.commands.map((command) => (
            <pre key={command} className="encode-command">
              {command}
            </pre>
          ))}
          <video src={result.url} controls playsInline preload="metadata" />
          <dl className="encode-facts">
            <dt>{p.size}</dt>
            <dd>
              {result.bytes} {p.bytes}
            </dd>
            {result.probe?.duration !== undefined && (
              <>
                <dt>{p.duration}</dt>
                <dd>{result.probe.duration} s</dd>
              </>
            )}
            {videoStream?.width && videoStream.height && (
              <>
                <dt>{p.resolution}</dt>
                <dd>
                  {videoStream.width} × {videoStream.height}
                </dd>
              </>
            )}
            <dt>{p.streams}</dt>
            <dd>
              {result.probe
                ? result.probe.streams
                    .map((s) =>
                      s.codecType === "video"
                        ? `Video: ${s.codecName} ${s.width ?? "?"} × ${s.height ?? "?"}`
                        : s.codecType === "audio"
                          ? `Audio: ${s.codecName} ${s.sampleRate ?? "?"} Hz × ${s.channels ?? "?"} ch`
                          : `${s.codecType}: ${s.codecName}`,
                    )
                    .map((line) => <div key={line}>{line}</div>)
                : "—"}
            </dd>
          </dl>
          <a className="button" href={result.url} download="final.mp4">
            {p.download}
          </a>
        </div>
      )}
      {failed && (
        <p className="player-note" role="note">
          {p.unavailable}
        </p>
      )}
      <p className="player-note">{p.note}</p>
    </div>
  );
}

export function ViewerReview({ store }: InteractiveProps) {
  const [answers, setAnswers] = useSlot<Record<string, string>>(
    store,
    "viewer-review",
  );
  const set = (i: number, value: string) =>
    setAnswers({ ...(answers ?? {}), [`check-${i}`]: value });
  return (
    <div className="recorder">
      <p className="player-note">
        <strong>{p.reviewLabel}</strong>
      </p>
      <p className="player-note">{p.reviewIntro}</p>
      <div className="field-grid">
        {p.reviewChecks.map((check, i) => (
          <fieldset key={i} className="edit-boundary">
            <legend>
              {p.checkAnswer(i)}: {check}
            </legend>
            <label className="control-label">
              <input
                type="radio"
                name={`review-${i}`}
                checked={answers?.[`check-${i}`] === "yes"}
                onChange={() => set(i, "yes")}
              />
              {p.checkYes}
            </label>
            <label className="control-label">
              <input
                type="radio"
                name={`review-${i}`}
                checked={answers?.[`check-${i}`] === "no"}
                onChange={() => set(i, "no")}
              />
              {p.checkNo}
            </label>
          </fieldset>
        ))}
      </div>
      <p className="player-note">
        Saved in this browser when storage is available. These answers are not
        graded.
      </p>
      <button onClick={() => setAnswers({})}>Clear answers</button>
    </div>
  );
}

export function ProjectReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "project-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {p.sections.reflection}
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
