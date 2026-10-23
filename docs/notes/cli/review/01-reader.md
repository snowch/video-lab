# CLI-first labs — independent built learner review

Copyright © 2026 Christopher Snow.

23 October 2026. Preview: `http://127.0.0.1:4173/video-lab/`. Reviewed the new production path, home → Capture → Build → Inspect → Edit → Publish, in bundle `assets/index-DqywuBI3.js`, showing build `74e8fbf`. Read the homepage prerequisites first; did not read implementation, tests or builder resolutions before attempting the commands. This reviewer has reviewed earlier versions of the course; this is an independent first encounter with the new CLI path, evaluated against the stated terminal/browser/file prerequisites and zero assumed media knowledge.

## Outcome

The labs are genuinely command-led. I typed commands into the shared workspace and used Enter to execute them. Actual FFmpeg encoding, muxing, probing, trimming, joining and an independently changed edit succeeded. I downloaded the final six-second MP4 and its execution recipe. No GUI parameter forms were required; the reviewed Edit page contained no select, numeric-input or range-input controls. Native media playback controls remain appropriate for reviewing the result.

No blocking instructional gap emerged in the tested provided-source path. Two low-severity issues deserve correction or explanation. The newer optional reference/comparison builtins announced during review were not part of this loaded build and are not claimed as tested.

## Findings

### C1 — Low: Capture sends the learner below the instructions to a field that is above them

**Location:** Capture → Use the prompt, then record one action.

> “Type or paste one example into the Command field below …”

The primary workspace and Command field are now above this section. A new learner reading the examples can search in the wrong direction, especially on phone where the workspace is several screens away. Update the directional wording to match the visible arrangement, or use a position-independent reference.

**Counterevidence:** The workspace is prominent near the page top, its Command label is clear, and the introductory help instruction correctly names the field. This is a small navigation inconsistency, not an inaccessible lab.

### C2 — Low: a successful first FFmpeg run prints an unexplained “Aborted()” message

**Location:** Build → command output from the supplied video-only encode.

After encoder statistics, the visible log ends:

```text
Aborted()
Saved video.mp4
Execution recipe: video.mp4.recipe.json
Process exit status: 0
```

The separate status says “Command completed.” A terminal-familiar learner can reconcile exit zero and the saved file, but “Aborted()” normally signals failed or interrupted work. No explanation accompanies this contradictory-looking first processing result. Preserve genuine tool evidence while explaining the observed runtime/cleanup message if that is what it represents; do not simply claim the underlying diagnostic never occurred.

**Counterevidence:** A subsequent real ffprobe report confirms a valid three-second file, and playback is available. The ffprobe cleanup quirk already receives a specific explanation: “The ffprobe JSON report was validated. This pinned browser build returns -1 after cleanup; that is not a native success exit status.” The FFmpeg finding is therefore low severity, not evidence that its output was corrupt or the operation actually failed.

## Actual command trace

| Stage | Commands attempted and observed result |
| --- | --- |
| Capture | `help`, `capture`, `sample`, `ls`, `play capture.mp4`, `download capture.mp4`. Headless capture was unsupported; the error suggested retry, sample or import. Sample clearly described the supplied original and synthetic sound. The listed/downloaded source was 128,737 B. |
| Build | `fixtures`; the supplied `ffmpeg -framerate 1 … video.mp4`; real `ffprobe -v error -show_streams -show_format -of json video.mp4`. One video stream, 3.000000 s, 32,198 B. |
| Change | Typed the encoding command with rate 2 and a new output `faster.mp4`; probed it. Duration 1.500000 s, 27,543 B. |
| Mux | Typed the two-input mapping/copy/AAC command producing `demo.mp4`; `play demo.mp4`; probed it. Video and audio streams, both three seconds, 59,698 B. |
| Inspect | `ls`, then the supplied probe command against `capture.mp4`, not the filmstrip. H.264 video, AAC audio, 10.000000 s, 128,737 B. |
| Edit | Executed the taught four-second `cut.mp4` command and the quoted filter graph for `joined.mp4`. Probed joined: one video stream, no audio, 5.000000 s, 93,471 B, as the deliberately silent example describes. |
| Own variation | Changed the second range from [4,7) to [3,7), kept the first [0,2), and used `my-demo.mp4`. Probe: one video stream, 6.000000 s, 97,675 B. This changes the illustrated before/after edit to retain the source's change into the sorted state. |
| Publish | `ls`, `play my-demo.mp4`, `download my-demo.mp4`, `download my-demo.mp4.recipe.json`. Both downloads succeeded. Native replay advanced to 3.48 s of six seconds with no media error. |

The downloaded [recipe](evidence/reader-my-demo.recipe.json) records the typed command, exact filenames and hashes. Its all-workspace inventory is explicitly explained in Edit and Publish, including how to use the `-i` arguments to identify actual dependencies. [Output replay evidence](evidence/reader-cli-output.png).

## Why the instructions are sufficient for this path

- The homepage honestly establishes commands as the primary interface. The workspace is easy to find before the lesson examples. Browser builtins are explicitly distinguished from real FFmpeg/ffprobe and from an operating-system shell.
- Capture explains that it uses browser sharing, that shared audio is optional and does not mean microphone narration, and that exact filenames matter. Sample/import are clearly alternative sources.
- Build explains numbered-image patterns, frame rate, encoding, codec, container, colour-format flag, probe fields, the MP4 format-family string, stream mappings, copy versus encode, and `-shortest` before their examples. The rate-change exercise requires a real argument change and a fresh measurement.
- Inspect directs attention to particular JSON fields rather than requiring understanding of every raw report field. Missing duration is distinguished from zero; packet timing is an explicitly conditional investigation. Absence of audio is not automatically treated as an error.
- Edit explains the range durations, optional audio mapping, filter graph labels, quoting, clock reset, concat and intentional audio omission. The longer join command is demanding but its required pieces are taught. The learner is explicitly invited to change times and output name and inspect the result.
- Publish requires the actual selected output and source/recipe downloads, then human review. It does not mistake successful processing for an understandable demo or universal playback compatibility.

## Errors, keyboard and smaller screens

`play missing.mp4` produced: “File not found: missing.mp4. Run ls and use the exact workspace filename.” Repeating an existing output name without `-y` produced: “That output filename already exists. Choose another name to keep both versions, or add -y to explicitly replace it.” The status said previously saved files remain available. Both messages give a usable recovery path.

Enter execution, ArrowUp history recall and Shift+Enter continuation worked. I entered a two-line ffprobe command and ran it as one command. Viewed desktop 1440 × 1000 and phone 390 × 844 in light and dark. Command entry, run button, errors and lesson examples remained legible; long commands wrapped, and inspected phone document width was 390 pixels without horizontal overflow. [Phone join example](evidence/reader-cli-phone-example.png). Large raw logs require scrolling, but the lesson identifies the fields needed for the exercises; this alone is not an unsupported-knowledge finding.

## Limits

No real OS capture chooser was available in headless Chromium; successful screen capture, importing a file, physical touch typing, offline/core failure and browser compatibility were not certified by this reader pass. The source was supplied, but all reported processing results were generated by the commands I typed. Playback was checked in the lab preview, not on an external viewing device. No application code was edited. Concurrent later fixes and optional commands require separate sceptic/checker evidence.
