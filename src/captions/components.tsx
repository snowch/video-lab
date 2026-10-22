// Copyright © 2026 Christopher Snow
import { useEffect, useMemo, useRef, useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import { buildBurnCaptions, buildProbe, parseProbe } from "../encode/commands";
import {
  createBrowserRunner,
  type JobState,
  type Runner,
} from "../encode/runner";
import { ca } from "./strings";

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
      {failed && <p role="alert">{ca.unavailable}</p>}
    </div>
  );
}

export function CaptionPlayers() {
  return (
    <div className="edit-boundaries">
      <Player file={ca.files.plain.file} label={ca.files.plain.label} />
      <Player file={ca.files.captioned.file} label={ca.files.captioned.label} />
    </div>
  );
}

interface Cue {
  readonly index: number;
  readonly text: string;
  readonly start: string;
  readonly end: string;
}

function parseSrt(text: string): Cue[] {
  const cues: Cue[] = [];
  const blocks = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n\r?\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  for (const block of blocks) {
    const lines = block.split(/\r?\n/);
    const timing =
      /^(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/.exec(
        lines[1] ?? "",
      );
    if (!timing) continue;
    cues.push({
      index: cues.length + 1,
      text: lines.slice(2).join(" "),
      start: timing[1]!.slice(0, 8),
      end: timing[2]!.slice(0, 8),
    });
  }
  return cues;
}

export function CaptionSource() {
  const [text, setText] = useState<string>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    fetchText(ca.srtFile)
      .then(setText)
      .catch(() => setFailed(true));
  }, []);
  const cues = useMemo(() => (text ? parseSrt(text) : []), [text]);
  return (
    <div className="recorder">
      {failed && <p role="alert">{ca.unavailable}</p>}
      {text !== undefined && (
        <>
          <pre className="encode-command" aria-label={ca.srtAlt}>
            {text}
          </pre>
          <table className="sound-levels">
            <caption>{ca.cuesLabel}</caption>
            <tbody>
              {cues.map((cue) => (
                <tr key={cue.index}>
                  <td>{ca.cueRow(cue.index, cue.text, cue.start, cue.end)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            className="button"
            href={asset(ca.srtFile)}
            download="captions.srt"
          >
            {ca.downloadSrt}
          </a>
        </>
      )}
    </div>
  );
}

interface BurnResult {
  readonly url: string;
  readonly bytes: number;
  readonly probe?: ReturnType<typeof parseProbe>;
  readonly command: string;
}

const FONT_FILE = "font.ttf";
const FONT_PATH = "fonts/DejaVuSans-Bold.ttf";

export function CaptionEditor() {
  const runnerRef = useRef<Runner | undefined>(undefined);
  const [state, setState] = useState<JobState>({ kind: "idle" });
  const [result, setResult] = useState<BurnResult | undefined>();
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
        fetchText(ca.srtFile),
        fetchBytes(FONT_PATH),
      ]);
      const args = buildBurnCaptions({
        input: "source.mp4",
        subtitles: "captions.srt",
        output: "captioned.mp4",
      });
      const outcome = await runner.run({
        label: ca.burn,
        write: {
          "source.mp4": source,
          "captions.srt": new TextEncoder().encode(srtText),
          [FONT_FILE]: font,
        },
        steps: [
          { type: "EXEC", args },
          { type: "FFPROBE", args: buildProbe("captioned.mp4") },
        ],
        read: ["captioned.mp4"],
        signal: controller.signal,
      });
      const bytes = outcome.files["captioned.mp4"];
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
  return (
    <div className="recorder">
      <div className="encode-controls">
        <button onClick={() => void run()} disabled={running}>
          {ca.burn}
        </button>
        {running && (
          <button onClick={() => runner.cancel()}>{ca.cancel}</button>
        )}
      </div>
      <p className="player-note" aria-live="polite">
        {state.kind === "idle" && ca.statusIdle}
        {state.kind === "loading" && ca.statusLoading}
        {state.kind === "running" && ca.statusRunning}
        {state.kind === "done" && ca.statusDone}
        {state.kind === "failed" && `${ca.statusFailed} ${state.message}`}
      </p>
      {result && (
        <div className="recorder-result">
          <pre className="encode-command">
            <span className="muted">{ca.commandLabel}: </span>
            {result.command}
          </pre>
          <p className="player-note">
            <span className="muted">{ca.writtenLabel}: </span>
            source.mp4, captions.srt, {FONT_FILE}
          </p>
          <video src={result.url} controls playsInline preload="metadata" />
          <dl className="encode-facts">
            <dt>{ca.size}</dt>
            <dd>
              {result.bytes} {ca.bytes}
            </dd>
            {result.probe?.duration !== undefined && (
              <>
                <dt>{ca.duration}</dt>
                <dd>{result.probe.duration} s</dd>
              </>
            )}
          </dl>
          <a className="button" href={result.url} download="captioned.mp4">
            {ca.download}
          </a>
        </div>
      )}
      {failed && (
        <p className="player-note" role="note">
          {ca.unavailable}
        </p>
      )}
      <p className="player-note">{ca.burnNote}</p>
      <p className="player-note">{ca.fontNote}</p>
    </div>
  );
}

export function CaptionSmall() {
  return (
    <div className="edit-boundaries">
      <Player file={ca.files.small.file} label={ca.files.small.label} />
      <Player file={ca.files.callout.file} label={ca.files.callout.label} />
      <Player file={ca.files.timed.file} label={ca.files.timed.label} />
    </div>
  );
}

export function CaptionReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "caption-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {ca.sections.reflection}
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
