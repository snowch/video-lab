// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset } from "../media/model";
import { cap } from "./strings";
import {
  detectSupport,
  pickMimeType,
  describeError,
  extensionFor,
  sourceLabel,
  trackReport,
} from "../encode/capture";

interface Recording {
  readonly blob: Blob;
  readonly mimeType: string;
  readonly url: string;
  readonly seconds: number;
  readonly report: { video: string[]; audio: string[] };
  readonly width?: number;
  readonly height?: number;
}

export function Recorder() {
  const support = detectSupport(navigator, globalThis.MediaRecorder);
  const supported =
    support.displayMedia && support.secureContext && support.mediaRecorder;
  const [state, setState] = useState<
    "idle" | "requesting" | "recording" | "stopped" | "error" | "fallback"
  >("idle");
  const [error, setError] = useState("");
  const [recording, setRecording] = useState<Recording | undefined>();
  const [elapsed, setElapsed] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedRef = useRef(0);
  const timerRef = useRef<number | undefined>(undefined);

  const stopAll = () => {
    for (const track of streamRef.current?.getTracks() ?? []) track.stop();
    streamRef.current = null;
    if (recorderRef.current && recorderRef.current.state !== "inactive")
      recorderRef.current.stop();
    recorderRef.current = null;
    clearInterval(timerRef.current);
  };
  useEffect(() => stopAll, []);
  useEffect(() => {
    return () => {
      if (recording) URL.revokeObjectURL(recording.url);
    };
  }, [recording]);

  const begin = (stream: MediaStream) => {
    streamRef.current = stream;
    const mimeType =
      pickMimeType((m) => MediaRecorder.isTypeSupported(m)) ?? "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType });
    recorderRef.current = recorder;
    chunksRef.current = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const seconds = (Date.now() - startedRef.current) / 1000;
      const settings = stream.getVideoTracks()[0]?.getSettings() ?? {};
      setRecording({
        blob,
        mimeType,
        url: URL.createObjectURL(blob),
        seconds,
        report: trackReport(stream),
        width: settings.width,
        height: settings.height,
      });
      setState("stopped");
      stopAll();
    };
    // The user can stop sharing from the browser UI; react to that.
    stream.getVideoTracks()[0]?.addEventListener("ended", () => {
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        setError(cap.ended);
        recorderRef.current.onstop = null;
        recorderRef.current.stop();
        stopAll();
        setState("error");
      }
    });
    startedRef.current = Date.now();
    setElapsed(0);
    timerRef.current = window.setInterval(
      () => setElapsed((Date.now() - startedRef.current) / 1000),
      200,
    );
    recorder.start(1000);
    setState("recording");
  };

  const start = async () => {
    setError("");
    setState("requesting");
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      begin(stream);
    } catch (e) {
      setError(describeError(e));
      setState("error");
    }
  };
  const stop = () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive")
      recorderRef.current.stop();
  };
  const reset = () => {
    if (recording) URL.revokeObjectURL(recording.url);
    setRecording(undefined);
    setState("idle");
    setError("");
  };
  const useFallback = () => {
    stopAll();
    setState("fallback");
  };

  const activeUrl =
    state === "fallback" ? asset("build-queue.mp4") : recording?.url;

  return (
    <div className="recorder">
      {!supported && (
        <p className="player-note" role="note">
          {cap.unsupported}
        </p>
      )}
      <div className="recorder-controls">
        <button
          onClick={start}
          disabled={
            !supported || state === "requesting" || state === "recording"
          }
        >
          {state === "requesting" ? cap.requesting : cap.start}
        </button>
        <button onClick={stop} disabled={state !== "recording"}>
          {cap.stop}
        </button>
        <button
          onClick={reset}
          disabled={state === "idle" || state === "requesting"}
        >
          {cap.reRecord}
        </button>
        {supported && (state === "idle" || state === "error") && (
          <button onClick={useFallback}>{cap.useFallback}</button>
        )}
      </div>
      <p className="player-note" aria-live="polite">
        {cap.state}: {state === "idle" && cap.stateIdle}
        {state === "requesting" && cap.stateRequesting}
        {state === "recording" &&
          `${cap.stateRecording} — ${elapsed.toFixed(1)} s`}
        {state === "stopped" && cap.stateStopped}
        {state === "error" && error}
        {state === "fallback" && cap.fallbackActive}
      </p>
      {activeUrl && (
        <div className="recorder-result">
          <video src={activeUrl} controls playsInline preload="metadata" />
          {recording && (
            <>
              <dl className="recorder-facts">
                <dt>{cap.container}</dt>
                <dd>
                  {sourceLabel(recording.mimeType)} (
                  {extensionFor(recording.mimeType)}) —{" "}
                  <span className="muted">{cap.mimeNote}</span>
                </dd>
                <dt>{cap.resolution}</dt>
                <dd>
                  {recording.width && recording.height
                    ? `${recording.width} × ${recording.height} pixels`
                    : "Reported by the track after capture"}
                </dd>
                <dt>{cap.duration}</dt>
                <dd>
                  {recording.seconds.toFixed(1)} s (measured by this page)
                </dd>
                <dt>{cap.tracks}</dt>
                <dd>
                  {cap.audioIncluded}:{" "}
                  {recording.report.audio.length > 0
                    ? cap.audioYes
                    : cap.audioNo}
                  {recording.report.video.length > 0 && (
                    <>
                      <br />
                      {recording.report.video.join(", ")}
                    </>
                  )}
                </dd>
              </dl>
              <a
                className="button"
                href={recording.url}
                download={`my-demo.${extensionFor(recording.mimeType)}`}
              >
                {cap.download}
              </a>
            </>
          )}
          {state === "fallback" && (
            <p className="player-note" role="note">
              {cap.fallbackNote}{" "}
              <a
                className="button"
                href={asset("build-queue.mp4")}
                download="build-queue-original.mp4"
              >
                {cap.download}
              </a>
            </p>
          )}
        </div>
      )}
      <p className="player-note">{cap.privacy}</p>
    </div>
  );
}

export function CapturePipeline() {
  const steps = [
    "Visible app",
    "Display / window / tab you select",
    "Browser recorder (getDisplayMedia + MediaRecorder)",
    "Real output file (usually WebM)",
    "Playback of that file",
  ];
  return (
    <div className="pipeline" role="img" aria-label={steps.join(" → ")}>
      <ol>
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export function CaptureFallback() {
  return (
    <div className="recorder">
      <p className="player-note" role="note">
        {cap.fallbackNote}
      </p>
      <video
        src={asset("build-queue.mp4")}
        controls
        playsInline
        preload="metadata"
      />
      <p>
        <a
          className="button"
          href={asset("build-queue.mp4")}
          download="build-queue-original.mp4"
        >
          {cap.download}
        </a>
      </p>
    </div>
  );
}

export function CaptureReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "capture-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {cap.sections.reflection}
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
