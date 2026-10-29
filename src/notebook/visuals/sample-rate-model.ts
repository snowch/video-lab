// Copyright © 2026 Christopher Snow

// An explanatory mono signal, not values extracted from the course media.
export const sampleRateModel = {
  toneFrequency: 1_000,
  duration: 0.002,
  amplitude: 0.8,
  rates: [4_000, 8_000, 16_000],
  initialRate: 8_000,
} as const;

export type SampleRate = (typeof sampleRateModel.rates)[number];
export type AudioSamplePoint = { time: number; value: number };

export function signalValueAt(time: number): number {
  return (
    sampleRateModel.amplitude *
    Math.sin(2 * Math.PI * sampleRateModel.toneFrequency * time)
  );
}

// The curve includes its right endpoint. Its drawing resolution never depends
// on the chosen sample rate: it illustrates the original analytic signal.
export const sampleRateCurve: readonly AudioSamplePoint[] = Array.from(
  { length: 257 },
  (_, i) => {
    const time = (i / 256) * sampleRateModel.duration;
    return { time, value: signalValueAt(time) };
  },
);

export function sampleSignal(rate: SampleRate) {
  if (!sampleRateModel.rates.includes(rate))
    throw new RangeError("Expected one of the model's three sample rates");

  // Sample instants cover [0, 2 ms): include zero, exclude the right endpoint.
  const samples: AudioSamplePoint[] = Array.from(
    { length: rate * sampleRateModel.duration },
    (_, index) => {
      const time = index / rate;
      return { time, value: signalValueAt(time) };
    },
  );
  return {
    samples,
    spacing: 1 / rate,
    samplesPerCycle: rate / sampleRateModel.toneFrequency,
  };
}
