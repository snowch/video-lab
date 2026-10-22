// Copyright © 2026 Christopher Snow
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import {
  buildVideoOnly,
  buildMuxAudio,
  buildProbe,
  parseProbe,
  type ProbeResult,
} from "../encode/commands";
import {
  createBrowserRunner,
  type JobState,
  type Runner,
} from "../encode/runner";
import { b } from "./strings";

const STILLS = [
  { file: "still-000.jpg", label: b.frameLabels[0]! },
  { file: "still-001.jpg", label: b.frameLabels[1]! },
  { file: "still-002.jpg", label: b.frameLabels[2]! },
  { file: "still-003.jpg", label: b.frameLabels[3]! },
];
const TONE = "tone.wav";
const PATTERN = "still-%03d.jpg";

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(asset(`build/${path}`));
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return new Uint8Array(await response.arrayBuffer());
}

interface BuiltFile {
  readonly name: string;
  readonly url: string;
  readonly bytes: number;
  readonly probe: ProbeResult;
  readonly commands: readonly string[];
}

function formatCommand(args: readonly string[]): string {
  return `ffmpeg ${args.join(" ")}`;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </>
  );
}

function probeFacts(probe: ProbeResult) {
  const video = probe.streams.find((s) => s.codecType === "video");
  const audio = probe.streams.find((s) => s.codecType === "audio");
  return (
    <>
      <Fact label={b.pictureCodec} value={video?.codecName ?? "—"} />
      <Fact
        label={b.resolution}
        value={
          video?.width && video.height
            ? `${video.width} × ${video.height}`
            : "—"
        }
      />
      <Fact
        label={b.pictures}
        value={video?.nbFrames !== undefined ? String(video.nbFrames) : "—"}
      />
      <Fact
        label={b.duration}
        value={probe.duration !== undefined ? `${probe.duration} s` : "—"}
      />
      {audio && (
        <>
          <Fact label={b.soundCodec} value={audio.codecName} />
          <Fact
            label={b.audioRate}
            value={audio.sampleRate ? `${audio.sampleRate} Hz` : "—"}
          />
          <Fact
            label={b.channels}
            value={audio.channels !== undefined ? String(audio.channels) : "—"}
          />
        </>
      )}
    </>
  );
}

function ResultView({ built }: { built: BuiltFile }) {
  return (
    <div className="recorder-result">
      <p className="player-note">
        <strong>{built.name}</strong> — {b.producedLabel}
      </p>
      {built.commands.map((command) => (
        <pre key={command} className="encode-command">
          <span className="muted">{b.commandLabel}: </span>
          {command}
        </pre>
      ))}
      <video src={built.url} controls playsInline preload="metadata" />
      <dl className="encode-facts">
        <Fact label={b.formatName} value={built.probe.formatName} />
        <Fact label={b.probeLabel} value={b.probeToolNote} />
        <Fact label={b.size} value={`${built.bytes} bytes`} />
        {probeFacts(built.probe)}
      </dl>
      <a className="button" href={built.url} download={built.name}>
        {b.download}
      </a>
    </div>
  );
}

export function Filmstrip() {
  return (
    <div className="filmstrip" role="img" aria-label={b.filmstripLabel}>
      {STILLS.map((still) => (
        <figure key={still.file}>
          <img
            src={asset(`build/${still.file}`)}
            alt={still.label}
            width="960"
            height="540"
            style={{ height: "auto" }}
          />
          <figcaption>{still.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

interface StageResult {
  readonly videoOnly: BuiltFile;
  readonly audioVideo?: BuiltFile;
}

export function BuildEncoder() {
  const runnerRef = useRef<Runner | undefined>(undefined);
  const [state, setState] = useState<JobState>({ kind: "idle" });
  const [rate, setRate] = useState<1 | 2>(1);
  const [stage, setStage] = useState<StageResult | undefined>();
  const [fallback, setFallback] = useState(false);
  const abortRef = useRef<AbortController | undefined>(undefined);
  const urlsRef = useRef<string[]>([]);

  const runner = useMemo(() => {
    if (!runnerRef.current) runnerRef.current = createBrowserRunner();
    return runnerRef.current;
  }, []);
  useEffect(() => {
    const unsubscribe = runner.subscribe(setState);
    return () => {
      unsubscribe();
      runner.dispose();
      for (const url of urlsRef.current) URL.revokeObjectURL(url);
    };
  }, [runner]);

  const revokeStage = (previous: StageResult | undefined) => {
    if (!previous) return;
    for (const file of [previous.videoOnly, previous.audioVideo]) {
      if (file) {
        const index = urlsRef.current.indexOf(file.url);
        if (index >= 0) urlsRef.current.splice(index, 1);
        URL.revokeObjectURL(file.url);
      }
    }
  };

  const track = (file: BuiltFile) => {
    urlsRef.current.push(file.url);
    return file;
  };

  const run = async (withAudio: boolean) => {
    revokeStage(stage);
    setStage(undefined);
    setFallback(false);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const write: Record<string, Uint8Array> = {};
      for (const still of STILLS)
        write[still.file] = await fetchBytes(still.file);
      write[TONE] = await fetchBytes(TONE);
      const encodeArgs = buildVideoOnly(
        { pattern: PATTERN, framerate: rate },
        "film.mp4",
      );
      const muxArgs = buildMuxAudio({
        video: "film.mp4",
        audio: TONE,
        output: "film-av.mp4",
      });
      const result = await runner.run({
        label: b.run,
        write,
        steps: [
          { type: "EXEC", args: encodeArgs },
          { type: "FFPROBE", args: buildProbe("film.mp4") },
          ...(withAudio
            ? [
                { type: "EXEC" as const, args: muxArgs },
                { type: "FFPROBE" as const, args: buildProbe("film-av.mp4") },
              ]
            : []),
        ],
        read: withAudio ? ["film.mp4", "film-av.mp4"] : ["film.mp4"],
        signal: controller.signal,
      });
      // The runner reports each EXEC/FFPROBE step's log separately; the probe
      // steps are the last step of the video-only stage and of the whole job
      // when audio is requested.
      const probeSteps = result.steps.filter((s) =>
        s.log.some((line) => line.includes('"streams"')),
      );
      const videoBytes = result.files["film.mp4"];
      if (!videoBytes) throw new Error("The run produced no video file");
      const probeVideo = parseProbe(probeSteps[0]?.log ?? result.log);
      if (!probeVideo)
        throw new Error("The probe produced no parseable result");
      const videoOnly = track({
        name: "film.mp4",
        url: URL.createObjectURL(
          new Blob([new Uint8Array(videoBytes)], { type: "video/mp4" }),
        ),
        bytes: videoBytes.length,
        probe: probeVideo,
        commands: [
          formatCommand(encodeArgs),
          formatCommand(buildProbe("film.mp4")),
        ],
      });
      let audioVideo: BuiltFile | undefined;
      if (withAudio) {
        const avBytes = result.files["film-av.mp4"];
        const probeAv = parseProbe(probeSteps[1]?.log ?? result.log);
        if (!avBytes || !probeAv)
          throw new Error("The mux run produced no parseable result");
        audioVideo = track({
          name: "film-av.mp4",
          url: URL.createObjectURL(
            new Blob([new Uint8Array(avBytes)], { type: "video/mp4" }),
          ),
          bytes: avBytes.length,
          probe: probeAv,
          commands: [
            formatCommand(encodeArgs),
            formatCommand(muxArgs),
            formatCommand(buildProbe("film-av.mp4")),
          ],
        });
      }
      setStage({ videoOnly, audioVideo });
    } catch (error) {
      if (error instanceof Error && error.message === "Cancelled") return;
      setFallback(true);
    }
  };

  const running = state.kind === "loading" || state.kind === "running";
  return (
    <div className="recorder">
      <div className="encode-controls">
        <label className="control-label">
          {b.rateLabel}
          <select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) as 1 | 2)}
            disabled={running}
          >
            <option value={1}>{b.rate1}</option>
            <option value={2}>{b.rate2}</option>
          </select>
        </label>
        <button onClick={() => void run(false)} disabled={running}>
          {b.run}
        </button>
        <button onClick={() => void run(true)} disabled={running}>
          {b.runMux}
        </button>
        {running && <button onClick={() => runner.cancel()}>{b.cancel}</button>}
      </div>
      <p className="player-note" aria-live="polite">
        {state.kind === "idle" && b.statusIdle}
        {state.kind === "loading" && b.statusLoading}
        {state.kind === "running" && `${b.statusRunning} ${state.label}`}
        {state.kind === "done" && b.statusDone}
        {state.kind === "failed" && `${b.statusFailed} ${state.message}`}
      </p>
      {stage && (
        <>
          <ResultView built={stage.videoOnly} />
          {stage.audioVideo && <ResultView built={stage.audioVideo} />}
        </>
      )}
      {fallback && (
        <div className="recorder-result">
          <p className="player-note" role="note">
            {b.fallbackNote}
          </p>
          <p>
            <a
              className="button"
              href={asset("build/fallback-video-only.mp4")}
              download="fallback-video-only.mp4"
            >
              {b.download} (video only, pre-generated)
            </a>{" "}
            <a
              className="button"
              href={asset("build/fallback-audio-video.mp4")}
              download="fallback-audio-video.mp4"
            >
              {b.download} (picture and sound, pre-generated)
            </a>
          </p>
        </div>
      )}
      <p className="player-note">{b.lazyNote}</p>
    </div>
  );
}

export function BuildFallback() {
  return (
    <div className="recorder">
      <p className="player-note" role="note">
        {b.fallbackNote}
      </p>
      <p className="player-note">{b.wasmNote}</p>
      <video
        src={asset("build/fallback-audio-video.mp4")}
        controls
        playsInline
        preload="metadata"
      />
      <dl className="encode-facts">
        <Fact
          label={b.videoOnly}
          value="fallback-video-only.mp4 — 35,738 bytes, 4 pictures, 4.0 s, H.264"
        />
        <Fact
          label={b.audioVideo}
          value="fallback-audio-video.mp4 — 41,323 bytes, H.264 + AAC, 3.0 s"
        />
      </dl>
      <p>
        <a
          className="button"
          href={asset("build/fallback-video-only.mp4")}
          download="fallback-video-only.mp4"
        >
          {b.download} (video only, pre-generated)
        </a>{" "}
        <a
          className="button"
          href={asset("build/fallback-audio-video.mp4")}
          download="fallback-audio-video.mp4"
        >
          {b.download} (picture and sound, pre-generated)
        </a>
      </p>
    </div>
  );
}

export function BuildReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "build-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {b.sections.reflection}
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
