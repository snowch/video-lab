// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { toneCurve, toneModel, toneSamples } from "./tone-model";
import type { ToneFrequency } from "./tone-model";
import { sampleRateStrings as t } from "./sample-rate.strings";
import "./sample-rate.css";

const x = (time: number) => 12 + (time / toneModel.duration) * 616;
const y = (value: number) => 120 - value * 100;

export function ToneFrequencyDiagram() {
  const audio = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState<ToneFrequency | null>(null);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(
    () => () => {
      const context = audio.current;
      audio.current = null;
      if (context) void context.close().catch(() => undefined);
    },
    [],
  );

  async function play(frequency: ToneFrequency) {
    const previous = audio.current;
    audio.current = null;
    if (previous) void previous.close().catch(() => undefined);
    setFailed(false);
    setStarted(false);
    if (playing === frequency) {
      setPlaying(null);
      return;
    }
    let context: AudioContext | null = null;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      context = new AudioContext();
      audio.current = context;
      setPlaying(frequency);
      await Promise.race([
        context.resume(),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(
            () => reject(new Error("Audio did not start")),
            3000,
          );
        }),
      ]);
      if (audio.current !== context) return;
      const values = toneSamples(frequency, context.sampleRate);
      const buffer = context.createBuffer(1, values.length, context.sampleRate);
      buffer.copyToChannel(values, 0);
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.onended = () => {
        if (audio.current === context) {
          audio.current = null;
          setPlaying(null);
          void context!.close().catch(() => undefined);
        }
      };
      source.start();
      setStarted(true);
    } catch {
      // A retired play request must not replace a newer request's status.
      if (context && audio.current !== context) return;
      audio.current = null;
      if (context) void context.close().catch(() => undefined);
      setPlaying(null);
      setFailed(true);
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <figure className="notebook-diagram tone-frequency-diagram">
      <figcaption>{t.frequencyHeading}</figcaption>
      <p>{t.frequencyIntroduction}</p>
      <p>{t.valueExplanation}</p>
      <p>{t.cycleExplanation}</p>
      <p>{t.valueAxisLabel}</p>
      {toneModel.frequencies.map((frequency) => {
        const path = toneCurve(frequency)
          .map(({ time, value }, i) => `${i ? "L" : "M"}${x(time)},${y(value)}`)
          .join(" ");
        const cycleEnd = x(1 / frequency);
        return (
          <div className="tone-comparison" key={frequency}>
            <div className="tone-comparison-heading">
              <h3>{t.frequencyOption(frequency)}</h3>
              <button
                type="button"
                aria-pressed={playing === frequency}
                onClick={() => void play(frequency)}
              >
                {playing === frequency ? t.stopTone : t.playTone(frequency)}
              </button>
            </div>
            <div className="tone-cycle-scale" aria-hidden="true">
              <span
                style={{ width: `${100 / (frequency * toneModel.duration)}%` }}
              >
                {t.cycleLabel}
              </span>
            </div>
            <div className="sample-rate-plot">
              <div className="sample-rate-values" aria-hidden="true">
                {t.valueLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <svg
                viewBox="0 0 640 240"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <rect
                  className="tone-cycle-highlight"
                  x="12"
                  y="20"
                  width={cycleEnd - 12}
                  height="200"
                />
                <path
                  className="sample-rate-guide"
                  d="M12 20H628 M12 220H628 M320 20V220 M628 20V220"
                />
                <path className="sample-rate-axis" d="M12 20V220 M12 120H628" />
                <path
                  className="sample-rate-curve tone-frequency-curve"
                  d={path}
                />
              </svg>
              <div className="sample-rate-times">
                {t.frequencyTimeLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
            <p>
              {t.frequencySummary(frequency, frequency * toneModel.duration)}
            </p>
          </div>
        );
      })}
      <p>{t.frequencyInstruction}</p>
      <p className="sample-rate-source-note">{t.frequencyLimitation}</p>
      <p className="sample-rate-source-note">{t.playbackNote}</p>
      <p role="status">
        {failed
          ? t.playbackError
          : playing
            ? started
              ? t.playingTone(playing)
              : t.startingTone(playing)
            : ""}
      </p>
    </figure>
  );
}
