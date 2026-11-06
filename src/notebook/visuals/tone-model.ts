// Copyright © 2026 Christopher Snow
import type { AudioSamplePoint } from "./sample-rate-model";

export const toneModel = {
  frequencies: [500, 1_000],
  duration: 0.004,
  amplitude: 0.8,
  playbackDuration: 1,
  playbackAmplitude: 0.12,
  fadeDuration: 0.02,
} as const;
export type ToneFrequency = (typeof toneModel.frequencies)[number];

export function toneCurve(frequency: ToneFrequency): AudioSamplePoint[] {
  return Array.from({ length: 513 }, (_, i) => {
    const time = (i / 512) * toneModel.duration;
    return {
      time,
      value: toneModel.amplitude * Math.sin(2 * Math.PI * frequency * time),
    };
  });
}

// Synthesis uses the browser's actual sample rate; graph points are not audio.
export function toneSamples(frequency: ToneFrequency, sampleRate: number) {
  if (!Number.isFinite(sampleRate) || sampleRate < 8_000)
    throw new RangeError(
      "Tone playback requires a sample rate of at least 8000",
    );
  const length = Math.round(sampleRate * toneModel.playbackDuration);
  return Float32Array.from({ length }, (_, i) => {
    const time = i / sampleRate;
    const envelope = Math.min(
      1,
      time / toneModel.fadeDuration,
      (length - 1 - i) / sampleRate / toneModel.fadeDuration,
    );
    return (
      toneModel.playbackAmplitude *
      envelope *
      Math.sin(2 * Math.PI * frequency * time)
    );
  });
}
