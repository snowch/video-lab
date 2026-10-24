import { useRestartGuard } from "../app-status/safety";
// Copyright © 2026 Christopher Snow
import { useState } from "react";
import { assetURL } from "../journey/shared";
import type { Task } from "../cli/tasks";
import { keptRange, pictureSchedule } from "./model";
import fixture from "./fixtures.json";
import { teachingUI as text } from "./strings";
export function TeachingVisual({
  kind,
}: {
  kind: NonNullable<Task["visual"]>;
}) {
  const [start, setStart] = useState(2),
    [duration, setDuration] = useState(6),
    [rate, setRate] = useState(1),
    [version, setVersion] = useState(1),
    [revealed, setRevealed] = useState(false);
  const range = keptRange(start, duration, fixture.sourceDuration),
    schedule = pictureSchedule(rate),
    example = fixture.examples[version]!;
  if (kind === "story")
    return (
      <figure className="teaching-figure">
        <h3>{text.storyTitle}</h3>
        <ol className="story-model">
          {text.storyLabels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ol>
        <figcaption>{text.storyNote}</figcaption>
      </figure>
    );
  if (kind === "streams")
    return (
      <figure className="teaching-figure">
        <h3>{text.streamsTitle}</h3>
        <div className="container-model">
          <strong>{text.container}</strong>
          <div className="picture-stream">
            <span aria-hidden="true">▧ → ▧ → ▧</span>
            <span>{text.pictures}</span>
          </div>
          <p>{text.silent}</p>
        </div>
        <figcaption>{text.streamsNote}</figcaption>
      </figure>
    );
  if (kind === "compare")
    return (
      <figure className="teaching-figure">
        <h3>{text.compareTitle}</h3>
        <div
          className="course-actions"
          role="group"
          aria-label={text.compareTitle}
        >
          {fixture.examples.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={version === index}
              onClick={() => setVersion(index)}
            >
              {text.compareLabels[item.id as keyof typeof text.compareLabels]}
            </button>
          ))}
        </div>
        <video
          key={example.id}
          controls
          playsInline
          preload="metadata"
          src={assetURL(example.path)}
          aria-label={
            text.compareLabels[example.id as keyof typeof text.compareLabels]
          }
        />
        <p>
          {text.sourceRange}: {example.start}–{example.end} {text.seconds} ·{" "}
          {example.duration} {text.seconds}
        </p>
        <figcaption>
          {text.provided} {text.compareNote}
        </figcaption>
      </figure>
    );
  if (kind === "trim")
    return (
      <figure className="teaching-figure">
        <h3>{text.trimTitle}</h3>
        <label>
          {text.start}: {range.start} {text.seconds}
          <input
            aria-label={text.start}
            type="range"
            min="0"
            max={fixture.sourceDuration - 1}
            step="1"
            value={range.start}
            onChange={(e) => {
              const next = Number(e.target.value);
              setStart(next);
              setDuration(Math.min(duration, fixture.sourceDuration - next));
            }}
          />
        </label>
        <label>
          {text.duration}: {range.duration} {text.seconds}
          <input
            aria-label={text.duration}
            type="range"
            min="1"
            max={fixture.sourceDuration - range.start}
            step="1"
            value={range.duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </label>
        <div className="range-model" aria-hidden="true">
          <span
            style={{ marginLeft: range.left + "%", width: range.width + "%" }}
          />
        </div>
        <output aria-live="polite">
          {range.start} + {range.duration} = {range.end} {text.seconds}
        </output>
        <p>
          {text.sourceEnd}: {fixture.sourceDuration} {text.seconds}
        </p>
        <figcaption>{text.trimNote}</figcaption>
      </figure>
    );
  return (
    <figure className="teaching-figure">
      <h3>{text.rateTitle}</h3>
      <label>
        {text.rate}
        <select
          aria-label={text.rate}
          value={rate}
          onChange={(e) => {
            setRate(Number(e.target.value));
            setRevealed(false);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </label>
      <ol className="picture-schedule">
        {schedule.intervals.map((interval, index) => (
          <li key={index}>
            <img
              src={assetURL(`media/mousepad-frames/frame00${index}.jpg`)}
              alt={text.pictureLabels[index]}
              width="1280"
              height="720"
            />
            {revealed && (
              <span>
                {interval.start}–{interval.end} {text.seconds}
              </span>
            )}
          </li>
        ))}
      </ol>
      <p>{text.predictionNote}</p>
      {!revealed && (
        <button type="button" onClick={() => setRevealed(true)}>
          {text.showCalculation}
        </button>
      )}
      {revealed && (
        <output aria-live="polite">
          3 ÷ {rate} = {schedule.duration} {text.seconds}
        </output>
      )}
      <figcaption>{text.rateNote}</figcaption>
    </figure>
  );
}
export function PracticeGuide({
  practice,
  onCommand,
}: {
  practice: NonNullable<Task["practice"]>;
  onCommand: (command: string) => void;
}) {
  const [hint, setHint] = useState(0);
  return (
    <section className="practice-guide">
      <h3>{text.practiceTitle}</h3>
      <ul>
        {practice.criteria.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{practice.review}</p>
      <details>
        <summary>{text.hints}</summary>
        <ol>
          {practice.hints.slice(0, hint).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        {hint < practice.hints.length && (
          <button type="button" onClick={() => setHint(hint + 1)}>
            {text.nextHint} {hint + 1}
          </button>
        )}
      </details>
      {practice.solution && (
        <details>
          <summary>{text.solution}</summary>
          <pre>
            <code>{practice.solution}</code>
          </pre>
          <button type="button" onClick={() => onCommand(practice.solution!)}>
            {text.useSolution}
          </button>
        </details>
      )}
    </section>
  );
}
export function PracticeReview({
  task,
  chapter,
}: {
  task: Task;
  chapter: string;
}) {
  const key = `video-lab:review:${chapter}:${task.id}`;
  const [review, setReview] = useState(() => {
      try {
        return localStorage.getItem(key) ?? "";
      } catch {
        return "";
      }
    }),
    [saved, setSaved] = useState(true);
  useRestartGuard(() => saved);
  function update(value: string) {
    setReview(value);
    try {
      localStorage.setItem(key, value);
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }
  function download() {
    const url = URL.createObjectURL(
        new Blob([task.title + "\n\n" + text.selfReview + "\n\n" + review], {
          type: "text/plain;charset=utf-8",
        }),
      ),
      a = document.createElement("a");
    a.href = url;
    a.download = `chapter-${chapter}-${task.id}-review.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="practice-review">
      <h3>{text.reviewLabel}</h3>
      <p>{text.selfReview}</p>
      <label htmlFor="chapter-review">{task.practice?.review}</label>
      <textarea
        id="chapter-review"
        rows={4}
        value={review}
        onChange={(e) => update(e.target.value)}
      />
      {review && (
        <p aria-live="polite">
          {saved ? text.reviewSaved : text.reviewSession}
        </p>
      )}
      <button type="button" disabled={!review.trim()} onClick={download}>
        {text.reviewDownload}
      </button>
    </section>
  );
}
