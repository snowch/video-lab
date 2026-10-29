// Copyright © 2026 Christopher Snow
import { useId, useState } from "react";
import {
  applyGain,
  fadeExample,
  fadeGain,
  frameInstants,
  illustrativeSignal,
  ticksToSeconds,
  timeFacts,
} from "./time-model";
import type { SignalPoint } from "./time-model";
import { timeText as t } from "./time.strings";
import "./time.css";

// SVGs carry geometry only. Their visible HTML labels and captions also provide
// the text equivalent, and retain the reader's text size at narrow widths.
function FrameRow({ rate, label }: { rate: number; label: string }) {
  return (
    <div className="time-frame-row">
      <p>{label}</p>
      <svg viewBox="0 0 720 54" aria-hidden="true">
        <path className="time-axis" d="M12 38H708 M12 32V44 M708 32V44" />
        {frameInstants(rate, 1).map((time) => (
          <circle
            key={time}
            cx={12 + time * 696}
            cy="20"
            r="5"
            className="time-point"
          />
        ))}
      </svg>
    </div>
  );
}

export function FrameRateDiagram() {
  return (
    <figure className="notebook-diagram time-diagram">
      <figcaption>{t.frameCaption}</figcaption>
      <FrameRow
        rate={timeFacts.frameRate}
        label={t.frameSource(timeFacts.frameRate)}
      />
      <FrameRow rate={12} label={t.frameReduced(12)} />
      <div className="time-endpoints">
        <span>{t.seconds(0)}</span>
        <span>{t.seconds(1)}</span>
      </div>
      <p>{t.frameNote}</p>
      <p className="time-source-note">{t.frameSourceNote(timeFacts.source)}</p>
    </figure>
  );
}

function TimestampDiagram() {
  const { ticksPerFrame, timeBase, frameRate } = timeFacts;
  return (
    <figure className="notebook-diagram time-diagram">
      <figcaption>{t.timestampCaption}</figcaption>
      <p>{t.timestampPicture}</p>
      <div className="time-endpoints">
        <span>{t.tickCount(0)}</span>
        <span>{t.tickCount(ticksPerFrame)}</span>
      </div>
      <svg className="time-clock" viewBox="0 0 640 56" aria-hidden="true">
        <path className="time-axis" d="M12 28H628 M12 14V42 M628 14V42" />
        <circle className="time-point" cx="12" cy="28" r="7" />
        <circle className="time-point" cx="628" cy="28" r="7" />
      </svg>
      <div className="time-endpoints">
        <span>{t.seconds(0)}</span>
        <span>
          {t.seconds(
            Number(ticksToSeconds(ticksPerFrame, timeBase).toFixed(6)),
          )}
        </span>
      </div>
      <p className="time-equation">
        <span>{t.tickCount(ticksPerFrame)}</span>
        <span aria-hidden="true">×</span>
        <span>{t.timeBase(timeBase)}</span>
      </p>
      <p>
        <strong>{t.timestampResult(ticksPerFrame, timeBase, frameRate)}</strong>
      </p>
      <p>{t.timestampNote}</p>
      <p className="time-source-note">
        {t.timestampSourceNote(timeFacts.source)}
      </p>
    </figure>
  );
}

function Waveform({ points }: { points: SignalPoint[] }) {
  const path = points
    .map(
      (point, i) =>
        `${i ? "L" : "M"}${12 + point.position * 616},${56 - point.value * 48}`,
    )
    .join(" ");
  return (
    <svg className="time-waveform" viewBox="0 0 640 112" aria-hidden="true">
      <path className="time-axis time-guide" d="M12 8H628 M12 104H628" />
      <path className="time-axis" d="M12 56H628" />
      <path className="time-signal" d={path} />
    </svg>
  );
}

function LevelDiagram() {
  const [gain, setGain] = useState(0.5);
  const id = useId();
  return (
    <figure className="notebook-diagram time-diagram">
      <figcaption>{t.levelCaption}</figcaption>
      <p>{t.levelAxis}</p>
      <div className="time-wave-row">
        <p>{t.levelBefore}</p>
        <Waveform points={illustrativeSignal} />
      </div>
      <div className="time-wave-row">
        <p>{t.levelAfter(gain)}</p>
        <Waveform points={applyGain(illustrativeSignal, gain)} />
      </div>
      <p>{t.levelTime}</p>
      <div className="time-gain-control">
        <label htmlFor={id}>
          {t.gainLabel}: <output htmlFor={id}>{gain}</output>
        </label>
        <input
          id={id}
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={gain}
          aria-valuetext={t.gainValue(gain)}
          onChange={(event) => setGain(Number(event.currentTarget.value))}
        />
      </div>
      <p>{t.levelNote}</p>
      <p className="time-source-note">
        {t.levelSourceNote(timeFacts.audioSampleRate)}
      </p>
    </figure>
  );
}

function FadeDiagram() {
  const { start, duration } = fadeExample;
  const total = timeFacts.duration;
  const x = (time: number) => 12 + (time / total) * 616;
  const y = (time: number) => 140 - fadeGain(time, start, duration) * 120;
  return (
    <figure className="notebook-diagram time-diagram">
      <figcaption>{t.fadeCaption}</figcaption>
      <p>{t.fadeAxis}</p>
      <div className="time-fade-plot">
        <div className="time-gain-axis" aria-hidden="true">
          <span>{t.fadeFull}</span>
          <span>{t.fadeSilent}</span>
        </div>
        <div>
          <svg className="time-fade" viewBox="0 0 640 160" aria-hidden="true">
            <path className="time-axis" d="M12 20V140H628" />
            <path
              className="time-axis time-guide"
              d={`M${x(start)} 20V140 M628 20V140`}
            />
            <path
              className="time-signal"
              d={`M${x(0)} ${y(0)} L${x(start)} ${y(start)} L${x(total)} ${y(total)}`}
            />
          </svg>
          <div className="time-fade-times">
            <span>{t.seconds(0)}</span>
            <span style={{ left: `${(start / total) * 100}%` }}>
              {t.seconds(start)}
            </span>
            <span>{t.seconds(total)}</span>
          </div>
        </div>
      </div>
      <p className="time-fade-labels">
        <span>{t.fadeStart(start)}</span>
        <span>{t.fadeDuration(duration)}</span>
      </p>
      <p>
        <code>{t.fadeCommand}</code>
      </p>
      <p>{t.fadeNote}</p>
    </figure>
  );
}

function SubtitleDiagram() {
  const { duration, captions } = timeFacts;
  const lastCueEnd = captions.cues.at(-1)!.end;
  return (
    <figure className="notebook-diagram time-diagram">
      <figcaption>{t.cueCaption}</figcaption>
      <p className="time-source-note">
        {t.cueSource(captions.path.split("/").at(-1)!)}
      </p>
      <div
        className="time-cue-labels"
        aria-hidden="true"
        style={{
          gridTemplateColumns: [
            ...captions.cues.map((cue) => `${cue.end - cue.start}fr`),
            `${duration - lastCueEnd}fr`,
          ].join(" "),
        }}
      >
        {captions.cues.map((cue) => (
          <span key={cue.index}>{t.cue(cue.index)}</span>
        ))}
        <span />
      </div>
      <div className="time-cue-track" aria-hidden="true">
        {captions.cues.map((cue) => (
          <span
            key={cue.index}
            className="time-cue-block"
            style={{
              left: `${(cue.start / duration) * 100}%`,
              width: `${((cue.end - cue.start) / duration) * 100}%`,
            }}
          />
        ))}
        <span
          className="time-cue-empty"
          style={{
            left: `${(lastCueEnd / duration) * 100}%`,
            width: `${((duration - lastCueEnd) / duration) * 100}%`,
          }}
        />
      </div>
      <div className="time-endpoints">
        <span>{t.seconds(0)}</span>
        <span>{t.seconds(duration)}</span>
      </div>
      <ol className="time-cue-list">
        {captions.cues.map((cue) => (
          <li key={cue.index}>
            <p>
              <strong>
                {t.cue(cue.index)} · {t.cueInterval(cue.start, cue.end)}
              </strong>
            </p>
            <p>{cue.text}</p>
          </li>
        ))}
      </ol>
      <p>
        {t.cueEmpty} · {t.cueInterval(lastCueEnd, duration)}
      </p>
      <p>{t.cueNote}</p>
    </figure>
  );
}

export function TimeDiagrams({ pageId }: { pageId: string }) {
  switch (pageId) {
    case "frames-time/timestamps":
      return <TimestampDiagram />;
    case "sound/level":
      return <LevelDiagram />;
    case "sound/fade":
      return <FadeDiagram />;
    case "text/subtitles":
      return <SubtitleDiagram />;
    default:
      return null;
  }
}
