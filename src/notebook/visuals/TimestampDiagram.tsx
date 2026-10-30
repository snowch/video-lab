// Copyright © 2026 Christopher Snow
import { useId, useState } from "react";
import { timeFacts } from "./time-model";
import {
  pictureInterval,
  timestampClock,
  timestampPictures,
} from "./timestamp-model";
import { timestampText as t } from "./timestamp.strings";

export function TimestampDiagram() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const interval = pictureInterval(selected);
  const first = timestampPictures[0]!;
  const last = timestampPictures.at(-1)!;
  const position = (ticks: number) =>
    (100 * (ticks - first.ticks)) / (last.ticks - first.ticks);
  return (
    <figure className="notebook-diagram time-diagram timestamp-diagram">
      <figcaption>{t.caption}</figcaption>
      <h3>{t.overviewTitle}</h3>
      <p>{t.overviewNote}</p>
      <div className="timestamp-timeline" aria-hidden="true">
        <div className="timestamp-track" />
        <div
          className="timestamp-selection"
          style={{
            left: `${position(interval.start.ticks)}%`,
            width: `${position(interval.end.ticks) - position(interval.start.ticks)}%`,
          }}
        />
        {timestampPictures.map((picture) => (
          <div
            className="timestamp-marker"
            key={picture.ticks}
            data-selected={
              picture.number === interval.start.number ||
              picture.number === interval.end.number
            }
            style={{ left: `${position(picture.ticks)}%` }}
          >
            <span>{picture.number}</span>
            <span className="timestamp-stem" />
          </div>
        ))}
      </div>
      <ol className="timestamp-picture-list">
        {timestampPictures.map((picture) => (
          <li
            key={picture.ticks}
            data-selected={
              picture.number === interval.start.number ||
              picture.number === interval.end.number
            }
          >
            <strong>{t.picture(picture.number)}</strong>
            <span>{t.ticks(picture.ticks)}</span>
            <span>{t.seconds(picture.seconds)}</span>
          </li>
        ))}
      </ol>
      <div className="timestamp-controls">
        <label htmlFor={`${id}-interval`}>{t.intervalLabel}</label>
        <select
          id={`${id}-interval`}
          value={selected}
          onChange={(event) => setSelected(Number(event.currentTarget.value))}
          aria-controls={`${id}-zoom`}
        >
          {timestampPictures.slice(0, -1).map((picture, index) => (
            <option value={index} key={picture.ticks}>
              {t.intervalChoice(
                picture.number,
                timestampPictures[index + 1]!.number,
              )}
            </option>
          ))}
        </select>
      </div>
      <section className="timestamp-zoom" id={`${id}-zoom`}>
        <h3>{t.zoomTitle(interval.start.number, interval.end.number)}</h3>
        <p>{t.clockScale(interval.clockStep)}</p>
        <div className="time-endpoints">
          <strong>{t.ticks(interval.start.ticks)}</strong>
          <strong>{t.ticks(interval.end.ticks)}</strong>
        </div>
        <svg viewBox="0 0 640 76" aria-hidden="true">
          <path className="time-axis" d="M12 46H628" />
          {interval.clockMarks.map((mark, index) => {
            const x = 12 + mark.position * 616;
            return index === 0 || index === interval.clockMarks.length - 1 ? (
              <g key={mark.ticks}>
                <rect
                  className="timestamp-picture-shape"
                  x={x - 10}
                  y="10"
                  width="20"
                  height="18"
                  rx="3"
                />
                <path className="time-axis" d={`M${x} 28V62`} />
              </g>
            ) : (
              <path
                key={mark.ticks}
                className="time-axis timestamp-clock-mark"
                d={`M${x} 38V54`}
              />
            );
          })}
        </svg>
        <div className="time-endpoints">
          <span>{t.seconds(interval.start.seconds)}</span>
          <span>{t.seconds(interval.end.seconds)}</span>
        </div>
        <p>{t.clockNote}</p>
        <div className="timestamp-calculation" aria-live="polite">
          <p>
            {t.difference(
              interval.start.ticks,
              interval.end.ticks,
              interval.ticks,
            )}
          </p>
          <p>
            <strong>
              {t.intervalConversion(
                interval.ticks,
                timestampClock.timeBase,
                interval.seconds,
              )}
            </strong>
          </p>
        </div>
      </section>
      <section className="timestamp-unit">
        <h3>{t.tickTitle}</h3>
        <p>
          <strong>
            {t.tickConversion(
              timestampClock.timeBase,
              timestampClock.secondsPerTick,
            )}
          </strong>
        </p>
        <p>{t.tickNote}</p>
      </section>
      <p className="time-source-note">{t.sourceNote(timeFacts.source)}</p>
    </figure>
  );
}
