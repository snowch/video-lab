// Copyright © 2026 Christopher Snow
import { useId, useState } from "react";
import {
  sampleRateCurve,
  sampleRateModel,
  sampleSignal,
} from "./sample-rate-model";
import type { SampleRate } from "./sample-rate-model";
import { sampleRateStrings as t } from "./sample-rate.strings";
import "./sample-rate.css";

const x = (time: number) => 12 + (time / sampleRateModel.duration) * 616;
const y = (value: number) => 120 - value * 100;
const curvePath = sampleRateCurve
  .map(({ time, value }, i) => `${i ? "L" : "M"}${x(time)},${y(value)}`)
  .join(" ");

export function SampleRateDiagram() {
  const [rate, setRate] = useState<SampleRate>(sampleRateModel.initialRate);
  const id = useId();
  const { samples, spacing } = sampleSignal(rate);

  return (
    <figure className="notebook-diagram sample-rate-diagram">
      <figcaption>{t.caption}</figcaption>
      <p>
        {t.valueExplanation} {t.fixedModel}
      </p>
      <div className="sample-rate-control">
        <label htmlFor={id}>{t.rateLabel}</label>
        <select
          id={id}
          value={rate}
          onChange={(event) =>
            setRate(Number(event.currentTarget.value) as SampleRate)
          }
        >
          {sampleRateModel.rates.map((value) => (
            <option key={value} value={value}>
              {t.rateOption(value)}
            </option>
          ))}
        </select>
        <output htmlFor={id} aria-live="polite" aria-atomic="true">
          {t.summary(rate, samples.length, spacing * 1_000)}
        </output>
      </div>
      <p>{t.instruction}</p>
      <p>{t.valueAxisLabel}</p>
      <div className="sample-rate-plot">
        <div className="sample-rate-values" aria-hidden="true">
          {t.valueLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        {/* Geometry is hidden; the adjoining HTML explains the axes, fixed
              curve, sample values, interval and current count/spacing. */}
        <svg
          viewBox="0 0 640 240"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className="sample-rate-guide"
            d="M12 20H628 M12 220H628 M320 20V220 M628 20V220"
          />
          <path className="sample-rate-axis" d="M12 20V220 M12 120H628" />
          <path className="sample-rate-curve" d={curvePath} />
          {samples.map(({ time, value }, index) => (
            <g key={index}>
              <path
                className="sample-rate-stem"
                d={`M${x(time)} 120V${y(value)}`}
              />
              {/* A round, non-scaling stroke keeps the point circular and
                  legible when the plot's horizontal/vertical scales differ. */}
              <path
                className="sample-rate-dot"
                d={`M${x(time)} ${y(value)}h0`}
              />
            </g>
          ))}
        </svg>
        <div className="sample-rate-times">
          {t.timeLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
      <p className="sample-rate-time-label">{t.timeAxisLabel}</p>
      <ul className="sample-rate-legend">
        <li>
          <span className="sample-rate-curve-key" aria-hidden="true" />
          {t.curveLegend}
        </li>
        <li>
          <span className="sample-rate-dot-key" aria-hidden="true" />
          {t.dotsLegend}
        </li>
      </ul>
      <p className="sample-rate-source-note">{t.limitation}</p>
    </figure>
  );
}
