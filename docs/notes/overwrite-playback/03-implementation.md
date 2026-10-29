# Preview resource ownership

Copyright © 2026 Christopher Snow.

A preview now identifies its resource by the exact content hash, filename and effective media type. IndexedDB produces new Blob objects for unchanged stored bytes; their object identity alone cannot indicate a changed recording. Matching content keeps its existing URL, media element and playback position. Content changes, including equal-length replacements, create a new keyed preview and independent error state.

Each resource creates its own object URL and renders media only once that URL exists. Layout cleanup pauses and detaches its media element and calls load() to reset the old resource before passive cleanup revokes the URL. Browsers may clear the retired node’s currentSrc asynchronously; the guaranteed order is pause, remove src, load, then revoke. Events belonging to a retired media element cannot set the replacement's error state. Text, images and unsupported-file feedback remain ordinary existing previews. No learner-visible prose, labels or command semantics changed; no independent prose draft is needed for this implementation-only slice.

The new real-browser regressions fail against the unchanged build: inspecting a source changes its URL and same-name replacement retains its old audio element. They exercise exact source content through native FFmpeg/WASM, a retained Files preview in a second window, equal-byte-length changed content, stale retired-element error fault injection, decoded playback signal and duration/rate inspection. Actual non-silent WebAudio measurements are distinguished from subjective hearing. The injected late error is labelled as such; the exact reported physical-device silence remains unproven locally.

The learner clarified the exact sequence: 8000 Hz overwrites play; a 6000 Hz version fails to play; returning to 8000 Hz on the same filename remains silent until the filename changes. Regression coverage now includes 8000 → deliberately failed 6000 → identical 8000 content on the same filename. Desktop Chromium can decode 6000 naturally, so the error event is explicitly simulated rather than misrepresented as a natural codec failure.

In this Linux environment Firefox’s real-time AudioContext waited for an audio device. Its regression instead measures actual decoded bytes with OfflineAudioContext and verifies media metadata/lifecycle without starting the unavailable sink. Chromium measures live MediaElementSource signal energy. Neither is represented as subjective human listening.
