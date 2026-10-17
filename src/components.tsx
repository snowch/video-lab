// Copyright © 2026 Christopher Snow
import { useRef, useState } from "react";
import type {
  ChallengeEditorProps,
  InteractiveProps,
} from "@platform/lesson-runtime";
import { useStored } from "@platform/lesson-runtime";
import {
  fixture,
  frames,
  frameAt,
  audioBlockAt,
  framesIn,
  videoStream,
  audioStream,
  asset,
} from "./media/model";
import { ui } from "./content/ui.strings";
const seconds = (n: number) =>
  `${n.toFixed(6).replace(/0+$/, "").replace(/\.$/, "")} ${ui.seconds}`;
export function Explorer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0),
    [clock, setClock] = useState(0),
    [playing, setPlaying] = useState(false),
    [muted, setMuted] = useState(true),
    [error, setError] = useState("");
  const frame = frames[index]!;
  const select = (i: number) => {
    const next = frames[Math.max(0, Math.min(frames.length - 1, i))]!;
    setIndex(next.index);
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = next.time;
    }
  };
  const playback = async () => {
    if (!ref.current) return;
    if (ref.current.paused) {
      try {
        await ref.current.play();
        setError("");
      } catch {
        setError(ui.playError);
      }
    } else ref.current.pause();
  };
  return (
    <div className="explorer">
      <video
        ref={ref}
        src={asset(fixture.file)}
        poster={asset(frames[0]!.image)}
        controls
        playsInline
        muted={muted}
        preload="metadata"
        onError={() => setError(ui.previewError)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={() => setMuted(ref.current?.muted ?? true)}
        onTimeUpdate={() => {
          const t = ref.current?.currentTime ?? 0;
          setClock(t);
          if (ref.current && !ref.current.paused) setIndex(frameAt(t).index);
        }}
      />
      {error && (
        <p role="alert" className="preview-error">
          {error}
        </p>
      )}
      <p className="player-note">{ui.playerNote}</p>
      <div className="explorer-tools">
        <button onClick={() => void playback()}>
          {playing ? ui.pause : ui.play}
        </button>
        <button aria-pressed={muted} onClick={() => setMuted(!muted)}>
          {muted ? ui.unmute : ui.mute}
        </button>
        <output>
          {ui.browserTime}: {clock.toFixed(2)} {ui.seconds}
        </output>
      </div>
      <label className="range-label" htmlFor="frame-cursor">
        {ui.frameSlider}: {index}
      </label>
      <input
        id="frame-cursor"
        type="range"
        min="0"
        max={frames.length - 1}
        step="1"
        value={index}
        onChange={(e) => select(Number(e.target.value))}
      />
      <div className="explorer-tools">
        <button onClick={() => select(index - 1)} disabled={index === 0}>
          {ui.previous}
        </button>
        <button
          onClick={() => select(index + 1)}
          disabled={index === frames.length - 1}
        >
          {ui.next}
        </button>
        <output data-testid="frame-time">{seconds(frame.time)}</output>
      </div>
      <div className="inspection-grid">
        <div>
          <h3>{ui.referenceTitle}</h3>
          <img
            data-testid="reference-frame"
            src={asset(frame.image)}
            alt={`${ui.frameAlt}, ${ui.index} ${index}, ${seconds(frame.time)}`}
            width="960"
            height="540"
            style={{ height: "auto" }}
          />
        </div>
        <div className="readout">
          <dl>
            <dt>{ui.index}</dt>
            <dd>{index}</dd>
            <dt>{ui.time}</dt>
            <dd>{seconds(frame.time)}</dd>
            <dt>{ui.ticks}</dt>
            <dd>{frame.pts}</dd>
            <dt>{ui.timeBase}</dt>
            <dd>{videoStream.timeBase}</dd>
            <dt>{ui.resolution}</dt>
            <dd>
              {videoStream.width} × {videoStream.height}
            </dd>
            <dt>{ui.rate}</dt>
            <dd>{videoStream.rate}</dd>
          </dl>
        </div>
      </div>
      <p className="player-note">{ui.previewNote}</p>
      <div className="filmstrip" aria-label={ui.filmstrip}>
        {fixture.filmstrip.map((i) => (
          <button
            key={i}
            aria-label={`${ui.frameSlider} ${i}`}
            onClick={() => select(i)}
          >
            <img src={asset(frames[i]!.image)} alt="" loading="lazy" />
            {seconds(frames[i]!.time)}
          </button>
        ))}
      </div>
      <details>
        <summary>{ui.evidence}</summary>
        <p>{ui.evidenceNote}</p>
        <pre>
          ffprobe -v error -show_format -show_streams -show_frames -of json
          build-queue.mp4
        </pre>
        <p>
          <a href={`${import.meta.env.BASE_URL}media/ffprobe.json`}>
            {ui.evidenceLink}
          </a>
        </p>
        <p>
          <a href="https://github.com/snowch/video-lab/blob/codex/issue-1-module-0/docs/notes/module-0/media/README.md">
            {ui.provenance}
          </a>
        </p>
        <a href={asset(fixture.file)} download>
          {ui.download}
        </a>
      </details>
    </div>
  );
}
export function Streams() {
  const [selected, setSelected] = useState("video"),
    [start, setStart] = useState(0);
  const stream = selected === "video" ? videoStream : audioStream;
  return (
    <div>
      <div className="container-box">
        <div className="container-title">
          <span>{ui.container}</span>
          <code>{fixture.file}</code>
        </div>
        <div className="stream-tree">
          {fixture.streams.map((s) => (
            <div className="stream-branch" key={s.index}>
              <h3>
                {s.type === "video" ? ui.video : ui.audio} {s.index}
              </h3>
              <p>
                {ui.codec}: <strong>{s.codec}</strong>
              </p>
              {s.type === "video" ? (
                <div className="timestamp-track" aria-hidden="true">
                  {frames.slice(0, 5).map((f) => (
                    <span key={f.index} />
                  ))}
                </div>
              ) : (
                <div className="audio-track" aria-hidden="true" />
              )}
              <p>{s.type === "video" ? ui.videoFrames : ui.audioSamples}</p>
              <div className="timeline-label">
                {s.type === "video"
                  ? frames
                      .slice(0, 3)
                      .map((f) => seconds(f.time))
                      .join(" → ")
                  : `${audioStream.sampleRate} / s · ${audioStream.channels} ${ui.channels}`}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="player-note">{ui.diagramNote}</p>
      <div className="field-grid">
        <label>
          {ui.selectStream}
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="video">{ui.video}</option>
            <option value="audio">{ui.audio}</option>
          </select>
        </label>
        <label>
          {ui.interval}
          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
          >
            {Array.from({ length: fixture.duration }, (_, i) => (
              <option key={i} value={i}>
                {seconds(i)} → {seconds(i + 1)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="player-note">{ui.intervalNote}</p>
      <div className="readout" role="status">
        <dl>
          <dt>{ui.streamIndex}</dt>
          <dd>{stream.index}</dd>
          <dt>{ui.codec}</dt>
          <dd>{stream.codec}</dd>
          <dt>{selected === "video" ? ui.framesIn : ui.samplesIn}</dt>
          <dd>
            {selected === "video"
              ? framesIn(start, start + 1).length
              : audioStream.sampleRate}
          </dd>
          <dt>{ui.timeBase}</dt>
          <dd>{stream.timeBase}</dd>
        </dl>
      </div>
    </div>
  );
}
export function Prediction() {
  const [choice, setChoice] = useState(""),
    [feedback, setFeedback] = useState("");
  return (
    <div>
      <fieldset>
        <legend>{ui.predictionQuestion}</legend>
        {[
          ["yes", ui.predictionYes],
          ["no", ui.predictionNo],
        ].map(([value, label]) => (
          <label className="choice" key={value}>
            <input
              type="radio"
              name="prediction"
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
              ? ui.predictionMissing
              : choice === "no"
                ? ui.predictionRight
                : ui.predictionWrong,
          )
        }
      >
        {ui.checkPrediction}
      </button>
      {feedback && (
        <p role="status" className="feedback">
          {feedback}
        </p>
      )}
    </div>
  );
}
export function Failure() {
  const [time, setTime] = useState(1),
    [tested, setTested] = useState(false);
  const frame = frameAt(time),
    block = audioBlockAt(time);
  return (
    <div>
      <p>{ui.failureClaim}</p>
      <label className="range-label" htmlFor="failure-time">
        {ui.failureTime}: {time.toFixed(2)}
      </label>
      <input
        id="failure-time"
        type="range"
        min="0"
        max="9"
        step="0.25"
        value={time}
        onChange={(e) => {
          setTime(Number(e.target.value));
          setTested(false);
        }}
      />
      <button onClick={() => setTested(true)}>{ui.testAssumption}</button>
      {tested && (
        <div className="experiment-result" role="status">
          <p>{ui.failureResult}</p>
          <div className="readout">
            <dl>
              <dt>{ui.index}</dt>
              <dd>{frame.index}</dd>
              <dt>{ui.samplePosition}</dt>
              <dd>{Math.floor(time * audioStream.sampleRate!)}</dd>
              <dt>{ui.videoAt}</dt>
              <dd>{seconds(frame.time)}</dd>
              <dt>{ui.audioAt}</dt>
              <dd>{seconds(block.time)}</dd>
              <dt>{ui.samplesPerBlock}</dt>
              <dd>{block.samples}</dd>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
export function Editor({
  challenge,
  artifact,
  onChange,
}: ChallengeEditorProps) {
  return (
    <div>
      <div className="field-grid">
        {challenge.fields.map((field) => (
          <label key={field.id}>
            {field.label}
            {field.kind === "choice" ? (
              <select
                value={artifact.answers?.[field.id] ?? ""}
                onChange={(e) =>
                  onChange({
                    ...artifact,
                    answers: {
                      ...artifact.answers,
                      [field.id]: e.target.value,
                    },
                  })
                }
              >
                <option value="">{ui.choose}</option>
                {field.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                inputMode="decimal"
                min={field.min}
                max={field.max}
                step={field.step}
                value={artifact.answers?.[field.id] ?? ""}
                onChange={(e) =>
                  onChange({
                    ...artifact,
                    answers: {
                      ...artifact.answers,
                      [field.id]: e.target.value,
                    },
                  })
                }
              />
            )}
          </label>
        ))}
      </div>
      <p>
        <a href="#/module-0/investigation">{ui.inspectAgain}</a>
      </p>
    </div>
  );
}
export function Reflection({ store }: InteractiveProps) {
  const stored = useStored(store);
  const notes = stored.slots["reflection"];
  return (
    <div className="reflection">
      <label className="control-label">
        {ui.reflectionLabel}
        <textarea
          value={typeof notes === "string" ? notes : ""}
          onChange={(e) => store.setSlot("reflection", e.target.value)}
        />
      </label>
      <p className="player-note">{ui.reflectionSaved}</p>
      <button onClick={() => store.setSlot("reflection", "")}>
        {ui.clearNotes}
      </button>
    </div>
  );
}
