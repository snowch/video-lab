// Copyright © 2026 Christopher Snow
import { sd } from "./strings";

export const prose = {
  question:
    "You can read the picture, but can a viewer hear what matters? A demo with unintelligible sound fails the same way a demo with unreadable text does. What would you change in the sound, and how would you know you had changed it?",
  motivation: `Five real sound files play below. They are all the same three-second synthetic tone (a 440 Hz sine, clearly not narration) at different treatments: the original, at 5% volume, at 50% volume, at 200% volume, and band-limited like a telephone line.

Listen to each one. Two of them fail: one is almost inaudible, and one is loud but distorted. The other three are usable, and one of those needs no treatment at all. Sound quality is not a matter of opinion here: each file has a measured level, and the next sections show you how to read it.`,
  prediction: `Before you measure anything, predict the mean level of each file in decibels (dB). A louder sound has a higher (less negative) dB value; silence is negative infinity.

A useful rule of thumb: narration that peaks near 0 dB is too close to the digital ceiling and will clip when the speaker gets louder; narration around ${"-"}27 dB mean is clearly audible without distortion. Predict which of the five files lands where, then check your predictions against real measurements.`,
  investigation: `The table below shows a real measurement of each file, made by running FFmpeg's \`volumedetect\` filter in this browser on the actual bytes. The mean level is the average loudness over the whole file; the maximum level is the loudest instant. Both are in decibels, where 0 dB is the loudest a digital file can hold.

Compare each measured pair with your prediction. The 5% file measures around ${"-"}47 dB mean: almost silent. The 50% file measures around ${"-"}27 dB: clearly audible. The 200% file measures around ${"-"}15 dB mean but its maximum is near ${"-"}12 dB and the waveform is clipped: the peaks were cut off at the ceiling, which is the distortion you hear.`,
  construction: `Press **${sd.measure}** below to run the measurement yourself. The browser's real FFmpeg.wasm measures the labelled original recording (${sd.quietAudioLabel.toLowerCase()}) and reports its mean and maximum level. The command runs in a worker; nothing is estimated.

The recording's own sound is the 5% tone muxed under the picture: its measured level is around ${"-"}47 dB, nearly silent. That is a real capture problem a viewer would hear as "no sound", and it is exactly what a level measurement exists to catch.`,
  failureExperiment: `The 200% file plays below: the same tone pushed past the digital ceiling. Real file, real measurement. Its maximum level sits near the ceiling and the waveform is flat-topped where the peaks were cut off: that is clipping, and it is audible as harsh distortion.

The failure is not hypothetical: gain-staging mistakes (a microphone too close, an input turned up too far, two loud sources mixed) all push a recording into the ceiling. Once the peaks are clipped, no filter can restore them; the recording has to be made again at a lower level.`,
  explanation: `The measurement is FFmpeg's \`volumedetect\` filter: it decodes the sound and reports the mean and maximum sample level in decibels. 0 dB is the digital ceiling; every real sound is below it, so levels are negative numbers. A higher (less negative) number is louder.

Three treatments appear in the files above:

1. **Volume** scales the level directly. 5% is ${"-"}20 dB quieter than the original; 200% is louder until the peaks hit the ceiling and clip.
2. **Clipping** happens when a scaled level exceeds 0 dB: the peaks are cut flat. The measured maximum stops rising at the ceiling while the mean keeps climbing, and the sound distorts.
3. **Band-limiting** removes the high and low frequencies (here, below 200 Hz and above 3400 Hz, like a telephone line). The level barely changes, but the sound thins out: consonants in speech live in exactly that removed range, which is why a band-limited voice sounds distant and hard to understand even at a healthy level.

The lesson from all three: a level number alone does not say a sound is good. The 50% file and the band-limited file can measure similarly, but only one is pleasant to listen to. Measure first, then listen, then decide.`,
  generalisation: `Sound habits for screen demos:

- Measure before you record again: a level reading tells you in seconds what re-recording takes minutes to test.
- Keep narration peaks well below 0 dB (a maximum around ${"-"}12 dB leaves headroom) so louder passages do not clip.
- A quiet recording is fixable in editing (raise the level); a clipped recording is not (re-record it).
- Band-limited sound (a phone-line filter, a bad headset, a compressed upload) loses speech consonants even at a healthy level; check the spectrum, not only the meter.
- Two sounds at once (the ${sd.files.mixed.label.toLowerCase()}) compete: viewers follow one voice at a time. Duck or remove music under narration.
- Check the sound on the device viewers will actually use, not only on your studio headphones.`,
  challenge: `Listen to the five files and read their measured levels, then decide: which sound can a listener understand, and what treatment does it need? Choose the clear version and its treatment, then run the measurement yourself and check.`,
  reflection: `What is your sound rule for the next demo you record? Write an optional note; it is not graded.`,
  modelVsReality: sd.modelVsReality,
  modelNote: sd.modelNote,
  challengeTask: `Choose the version a listener can understand and its treatment, then run the level measurement and confirm the produced numbers.`,
  hints: [...sd.hints] as readonly string[],
  originality: sd.originality,
};
