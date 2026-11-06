# Separate drafting: tone frequency and sample rate

Copyright © 2026 Christopher Snow.

A separate drafting agent read the verified model and learning brief in
`01-plan.md`, the existing sample-rate strings/model/component, and the surrounding
audio-sampling page. Only `src/notebook/visuals/sample-rate.strings.ts` was edited.
Existing exported keys remain available; new keys supply the two-stage explanation,
optional playback and fresh prediction check.

The first stage explains signed relative height, explicitly separates it from a
loudness scale, and defines a cycle using the visible bracket's two upward zero
crossings. Equal-height 500 Hz and 1,000 Hz plots share a four-millisecond window.
Frequency summaries receive their frequency and cycle count from the model.
Playback wording identifies a generated one-second tone with fades, distinct from
the short drawing and Bunny footage. It does not claim equal perceived loudness,
playback at the plotted amplitude, or a selected sampling rate for playback.

The second stage explicitly changes the window from four to two milliseconds and
holds the 1,000 Hz tone fixed. Dots are measurements rather than cycles. The text
separates the two uses of Hz, states per-channel counting and explains stereo as
two such sequences. The existing page retains the explanation of high-frequency
detail loss and why sample rate is not a simple quality slider; the visual does
not add Nyquist, reconstruction, bit depth or other deferred topics.

The builder will place the separate fresh check after the page's existing
resampling paragraph, so its essential definition is read before the question.
The check changes both the tone and sample-rate pair: 500 Hz,
12,000 to 24,000 measurements per channel over one second. Three predictions
separate the intended rule from changing pitch or leaving the measurement count
unchanged. Each response has specific feedback. The wording makes no achievement,
progress or demonstrated-understanding claim.

The drafter checked the sentences against the brief and surrounding prerequisites.
No model, UI structure, tests or builds were changed or run. Builder review,
execution checks and independent learner review remain separate stages; this note
is a drafting record, not an independent review of the resulting interface.
