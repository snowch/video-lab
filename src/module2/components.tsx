// Copyright © 2026 Christopher Snow
import { useEffect, useMemo, useRef, useState } from "react";
import { useStored, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import { buildCut, buildProbe, parseProbe } from "../encode/commands";
import {
  createBrowserRunner,
  type JobState,
  type Runner,
} from "../encode/runner";
import { m2 } from "./strings";
import {
  fixture,
  cutStarts,
  keyframes,
  mediaUrl,
  cutResult,
  joinResult,
  clipsFor,
  layout,
  sourceTime,
  videoFacts,
  type Result,
  type CutMethod,
  type JoinOrder,
} from "./model";
import generation from "../../docs/notes/module-2/media/generation.json";
const seconds = (value: number) => `${Number(value.toFixed(6))} ${m2.seconds}`;
function Recording({ file, label }: { file: string; label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="edit-recording">
      <p>
        <strong>{label}</strong> <code>{file}</code>
      </p>
      <video
        key={file}
        aria-label={label}
        controls
        playsInline
        muted
        preload="metadata"
        src={mediaUrl(file)}
        onError={() => setFailed(true)}
      />
      {failed && <p role="alert">{m2.mediaError}</p>}
      <a href={mediaUrl(file)} download>
        {m2.download}
      </a>
    </div>
  );
}
function Evidence({ file }: { file: string }) {
  const command = generation.commands.find(
    (c) => c.at(-1) === `public/media/module-2/${file}`,
  )!;
  const rendered = command
    .map((arg) => {
      const text = arg.replaceAll("public/media/module-2/", "");
      return /^[a-zA-Z0-9_./:+-]+$/.test(text)
        ? text
        : `'${text.replaceAll("'", "'\\''")}'`;
    })
    .join(" ");
  return (
    <details className="edit-evidence">
      <summary>{m2.command}</summary>
      <p>{m2.commandNote}</p>
      <pre>{rendered}</pre>
      <a href={mediaUrl("evidence.json")}>{m2.evidence}</a>
    </details>
  );
}
function Keyframes({ start }: { start?: number }) {
  const preceding =
    start === undefined
      ? undefined
      : keyframes.findLast((f) => f.time <= start)?.time;
  return (
    <div className="edit-keyframes">
      <h3>{m2.keyframes}</h3>
      <ol>
        {keyframes.map((f) => (
          <li key={f.pts} className={preceding === f.time ? "is-selected" : ""}>
            {seconds(f.time)}
          </li>
        ))}
      </ol>
    </div>
  );
}
export function CutSource() {
  return (
    <>
      <Recording file={fixture.source.file} label={m2.sourceTitle} />
      <Evidence file={fixture.source.file} />
    </>
  );
}
export function CutPrediction() {
  const [choice, setChoice] = useState(""),
    [feedback, setFeedback] = useState("");
  const request = 3,
    result = cutResult(request, "copy");
  return (
    <div>
      <Keyframes start={request} />
      <fieldset>
        <legend>{m2.predictionQuestion}</legend>
        {[
          ["request", `${m2.requestedStartOption}: ${seconds(request)}`],
          [
            "keyframe",
            `${m2.keyframeOption}: ${seconds(sourceTime(result, 0))}`,
          ],
        ].map(([value, label]) => (
          <label className="choice" key={value}>
            <input
              type="radio"
              name="cut-prediction"
              value={value}
              checked={choice === value}
              onChange={() => {
                setChoice(value!);
                setFeedback("");
              }}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <button
        onClick={() =>
          setFeedback(
            !choice
              ? m2.predictionMissing
              : choice === "keyframe"
                ? m2.predictionRight
                : m2.predictionWrong,
          )
        }
      >
        {m2.checkPrediction}
      </button>
      {feedback && (
        <p role="status" className="feedback">
          {feedback}
        </p>
      )}
    </div>
  );
}
function BoundaryPicture({
  result,
  position,
  label,
}: {
  result: Result;
  position: number;
  label: string;
}) {
  const still = result.stills[position]!;
  return (
    <figure className="edit-boundary">
      <figcaption>{label}</figcaption>
      <img
        src={mediaUrl(still.image)}
        width="960"
        height="540"
        alt={`${m2.pictureAlt}; ${m2.sourceTime} ${seconds(sourceTime(result, still.index))}`}
      />
      <dl>
        <dt>{m2.sourceTime}</dt>
        <dd>{seconds(sourceTime(result, still.index))}</dd>
        <dt>{m2.outputTime}</dt>
        <dd>{seconds(result.frames[still.index]!.time)}</dd>
      </dl>
    </figure>
  );
}
export function CutExplorer() {
  const [start, setStart] = useState(3),
    [method, setMethod] = useState<CutMethod>("copy");
  const result = cutResult(start, method),
    video = videoFacts(result),
    audio = result.streams.find((s) => s.type === "audio")!;
  return (
    <div>
      <div className="field-grid">
        <label>
          {m2.start}
          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
          >
            {cutStarts.map((t) => (
              <option key={t} value={t}>
                {seconds(t)}
              </option>
            ))}
          </select>
        </label>
        <label>
          {m2.method}
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as CutMethod)}
          >
            <option value="copy">{m2.options.copy}</option>
            <option value="encode">{m2.options.encode}</option>
          </select>
        </label>
      </div>
      <Keyframes start={start} />
      <p className="edit-summary" role="status">
        {m2.requestedRange}: [{start}, {start + 2}) {m2.seconds} ·{" "}
        {m2.firstPicture}: {m2.sourceTime} {seconds(sourceTime(result, 0))} ·{" "}
        {m2.pictureDuration}: {seconds(video.duration)}
      </p>
      <Recording key={result.id} file={result.file} label={m2.outputTitle} />
      <div className="edit-boundaries">
        <BoundaryPicture result={result} position={0} label={m2.firstPicture} />
        <BoundaryPicture result={result} position={1} label={m2.lastPicture} />
      </div>
      <p className="player-note">{m2.boundaryNote}</p>
      <dl className="edit-facts">
        <dt>{m2.pictureCount}</dt>
        <dd>{result.frames.length}</dd>
        <dt>{m2.pictureDuration}</dt>
        <dd>{seconds(video.duration)}</dd>
        <dt>{m2.containerDuration}</dt>
        <dd>{seconds(result.duration)}</dd>
        <dt>{m2.firstPts}</dt>
        <dd>{seconds(result.frames[0]!.time)}</dd>
        <dt>{m2.audioStart}</dt>
        <dd>{seconds(audio.start)}</dd>
      </dl>
      <Evidence file={result.file} />
    </div>
  );
}
interface Segment {
  name: string;
  start: number;
  end: number;
}
function Timeline({
  label,
  segments,
  total,
}: {
  label: string;
  segments: Segment[];
  total: number;
}) {
  const description = segments
    .map((s) => `${s.name}: ${seconds(s.start)} → ${seconds(s.end)}`)
    .join("; ");
  return (
    <div className="edit-timeline">
      <h3>{label}</h3>
      <div
        className="edit-track"
        role="img"
        aria-label={`${label}: ${description}`}
      >
        {segments.map((s) => (
          <span
            key={s.name}
            className={s.name === "A" ? "clip-a" : "clip-b"}
            style={{
              left: `${(s.start / total) * 100}%`,
              width: `${((s.end - s.start) / total) * 100}%`,
            }}
          >
            {s.name}
          </span>
        ))}
      </div>
      <div className="edit-scale">
        <span>{seconds(0)}</span>
        <span>{seconds(total)}</span>
      </div>
      <p>{description}</p>
    </div>
  );
}
export function JoinExplorer() {
  const [order, setOrder] = useState<JoinOrder>("AB"),
    [end, setEnd] = useState(6);
  const clips = clipsFor(order, end),
    segments = layout(clips),
    result = joinResult(order, end),
    duration = videoFacts(result).duration;
  return (
    <div>
      <div className="field-grid">
        <label>
          {m2.order}
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as JoinOrder)}
          >
            {(["AB", "BA"] as const).map((o) => (
              <option key={o} value={o}>
                {m2.options[o]}
              </option>
            ))}
          </select>
        </label>
        <label>
          {m2.bEnd}
          <select value={end} onChange={(e) => setEnd(Number(e.target.value))}>
            {[6, 8].map((e) => (
              <option key={e} value={e}>
                {seconds(e)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Timeline
        label={m2.sourceTimeline}
        segments={clipsFor("AB", end)}
        total={fixture.source.duration}
      />
      <Timeline
        label={m2.outputTimeline}
        segments={segments.map((s) => ({
          name: s.name,
          start: s.outputStart,
          end: s.outputEnd,
        }))}
        total={duration}
      />
      <p className="player-note">{m2.timelineNote}</p>
      <p role="status" className="edit-summary">
        {m2.duration}: {seconds(duration)} · {m2.joinTime}:{" "}
        {seconds(segments[1]!.outputStart)} · {m2.hardCut}
      </p>
      <Recording key={result.id} file={result.file} label={m2.outputTitle} />
      <div className="edit-boundaries">
        <BoundaryPicture result={result} position={1} label={m2.beforeJoin} />
        <BoundaryPicture result={result} position={2} label={m2.afterJoin} />
      </div>
      <Evidence file={result.file} />
    </div>
  );
}
export function ClockExperiment() {
  const [reset, setReset] = useState(false),
    clips = clipsFor("AB", 6);
  const segments = reset
    ? layout(clips).map((c) => ({
        name: c.name,
        start: c.outputStart,
        end: c.outputEnd,
      }))
    : clips;
  const gap = segments[1]!.start - segments[0]!.end;
  return (
    <div>
      <label>
        {m2.clockMode}
        <select
          value={reset ? "reset" : "keep"}
          onChange={(e) => setReset(e.target.value === "reset")}
        >
          <option value="keep">{m2.keepClock}</option>
          <option value="reset">{m2.resetClock}</option>
        </select>
      </label>
      <Timeline
        label={m2.clockResult}
        segments={segments}
        total={segments.at(-1)!.end}
      />
      <p role="status" className="edit-summary">
        {m2.gap}: {seconds(gap)}
      </p>
    </div>
  );
}
export function EditReflection({ store }: InteractiveProps) {
  const stored = useStored(store),
    note = stored.slots["reflection"];
  return (
    <div>
      <label>
        {m2.reflectionLabel}
        <textarea
          value={typeof note === "string" ? note : ""}
          onChange={(e) => store.setSlot("reflection", e.target.value)}
        />
      </label>
      <p className="player-note">{m2.reflectionSaved}</p>
      <button onClick={() => store.setSlot("reflection", "")}>
        {m2.clearNotes}
      </button>
    </div>
  );
}

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(asset(path));
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return new Uint8Array(await response.arrayBuffer());
}

interface CutFile {
  readonly name: string;
  readonly url: string;
  readonly bytes: number;
  readonly probe?: ReturnType<typeof parseProbe>;
}

/**
 * Cut your own recording: run a real trim-and-encode cut of the course's
 * original build-queue MP4 in the browser's FFmpeg.wasm, then play, probe and
 * download the result. The learner's own capture from Module 0 cannot be
 * read from storage here (it never leaves the recorder), so the lesson cuts
 * the labelled original recording; the command and the probe are real.
 */
export function OwnCut() {
  const runnerRef = useRef<Runner | undefined>(undefined);
  const [state, setState] = useState<JobState>({ kind: "idle" });
  const [start, setStart] = useState(2);
  const [result, setResult] = useState<CutFile | undefined>();
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
      const source = await fetchBytes("build-queue.mp4");
      const args = buildCut({
        input: "source.mp4",
        start,
        method: "encode",
        output: "my-cut.mp4",
      });
      const probeArgs = buildProbe("my-cut.mp4");
      const outcome = await runner.run({
        label: m2.ownCutRunning,
        write: { "source.mp4": source },
        steps: [
          { type: "EXEC", args },
          { type: "FFPROBE", args: probeArgs },
        ],
        read: ["my-cut.mp4"],
        signal: controller.signal,
      });
      const bytes = outcome.files["my-cut.mp4"];
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
        name: "my-cut.mp4",
        url,
        bytes: bytes.length,
        probe,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Cancelled") return;
      setFailed(true);
    }
  };

  const running = state.kind === "loading" || state.kind === "running";
  return (
    <div className="recorder">
      <div className="encode-controls">
        <label className="control-label">
          {m2.ownCutStart}
          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            disabled={running}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
              <option key={value} value={value}>
                {value} s
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => void run()} disabled={running}>
          {m2.ownCutRun}
        </button>
        {running && (
          <button onClick={() => runner.cancel()}>{m2.ownCutCancel}</button>
        )}
      </div>
      <p className="player-note" aria-live="polite">
        {state.kind === "idle" && m2.ownCutIdle}
        {state.kind === "loading" && m2.ownCutLoading}
        {state.kind === "running" && m2.ownCutRunning}
        {state.kind === "done" && m2.ownCutDone}
        {state.kind === "failed" && `${m2.ownCutFailed} ${state.message}`}
      </p>
      {result && (
        <div className="recorder-result">
          <pre className="encode-command">
            <span className="muted">{m2.ownCutCommand}: </span>
            {`ffmpeg ${buildCut({ input: "source.mp4", start, method: "encode", output: "my-cut.mp4" }).join(" ")}`}
          </pre>
          <video src={result.url} controls playsInline preload="metadata" />
          <dl className="encode-facts">
            <dt>{m2.ownCutSize}</dt>
            <dd>{result.bytes} bytes</dd>
            {result.probe && (
              <>
                <dt>{m2.ownCutDuration}</dt>
                <dd>
                  {result.probe.duration !== undefined
                    ? `${result.probe.duration} s`
                    : "—"}
                </dd>
                <dt>{m2.ownCutPictures}</dt>
                <dd>
                  {result.probe.streams.find((s) => s.codecType === "video")
                    ?.nbFrames ?? "—"}
                </dd>
              </>
            )}
          </dl>
          <a className="button" href={result.url} download={result.name}>
            {m2.ownCutDownload}
          </a>
        </div>
      )}
      {failed && (
        <p className="player-note" role="note">
          {m2.ownCutUnavailable}
        </p>
      )}
      <p className="player-note">{m2.ownCutNote}</p>
    </div>
  );
}
