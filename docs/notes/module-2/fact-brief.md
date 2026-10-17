# Verified Module 2 fact brief

Copyright © 2026 Christopher Snow.

Verified 17 October 2026 before prose: `node scripts/module2-media.mjs --generate` completed, checking the source, ten real outputs, all recorded timestamps/audio blocks, every decoded video picture's correspondence with its source and 28 stills. `npx vitest run src/module2/model.test.ts` passed four tests. No browser rendering or listening claim is made by these checks.

## Media and measurements

The original Module 0 build queue clicks Sort at source 4 seconds and puts the longest build first. `build-queue-cuts.mp4` is a separately encoded derivative, not an upload. It is ten seconds, 120 pictures at 12 fps, H.264 video and AAC mono 48 kHz audio containing the existing quiet synthetic tone, not narration. New encoding fixes keyframes at 0, 2, 4, 6 and 8 seconds, disables scene-cut keyframes and B pictures. Those positions are recorded in fixture.source.frames. Picture timestamps use 1/12288 second ticks; audio uses 1/48000. Do not suggest every recording uses this spacing.

A keyframe here is an independently decodable picture from which decoding can start; pictures between these points can depend on earlier pictures. Stream copy transfers encoded packets without decoding/filtering/re-encoding them. It is fast and avoids a generation of encoding loss, but does not guarantee the requested first picture for this command. Encoding reconstructs and encodes pictures after trimming; accuracy here is to an existing picture boundary, not an arbitrary subframe instant. Audio is trimmed separately with atrim. Native sample boundaries and AAC packet boundaries differ from picture boundaries.

Cut requests are [1,3), [3,5), [5,7); start included, end excluded. Each requests two seconds. For each, the copy command uses input `-ss`, `-t 2`, maps video+audio, `-c copy`, and `-avoid_negative_ts make_zero`. Decoded copy results contain 36 pictures starting at source 0/2/4 respectively: one second early, three seconds of picture duration. Exact results use trim/atrim, setpts/asetpts, encode, explicit 12 fps CFR output: 24 pictures starting at source 1/3/5, two seconds of picture duration. Every selected source boundary is an existing picture. Source end exclusion means the last exact picture starts 1/12 second before requested end.

Copy container durations are 3.008, 3.029333, 3.029333 seconds; video start PTS are 0, 0.016032, 0.01001 seconds. Show actual first PTS and container duration in evidence; do not conflate them with picture span. Copies preserve an earlier audio packet as well, so start offsets vary. Exact output streams and containers are two seconds. The raw video PTS has been normalised by the operation; it is not the source timestamp. First and last stills are extracted from actual outputs and mapped to source pictures by native pixel verification.

## Joining

Clip A is source [0,2). Clip B is [4,6) or [4,8). Both have matching dimensions, frame rate and channel layout because they come from the same source. The filter pipeline trims video and audio separately, subtracts each clip's initial PTS to start at zero, concatenates both streams together, then encodes. `concat` means place clips one after another. No dissolve/overlap occurs: this is a hard cut. A transition would require a different overlap/duration model.

Four actual outputs exist: AB with short/long B lasts 4/6 seconds and joins at output 2; BA lasts 4/6 seconds and joins at output 2/4 respectively. Source first/last pictures and both join-side pictures are measured and stored. The source-to-output timeline is deterministic: segment output duration = end − start, next start = previous end. At the exact join the second clip owns the picture; output end is excluded.

Failure experiment must be explicitly an explanatory clock model, not a fake render: for A=[0,2), B=[4,6), leaving source positions on an output axis shows A at 0–2 and B at 4–6, a two-second gap. Rebasing and placing consecutively shows A at 0–2, B at 2–4. This is not a prediction of every malformed concat command or a playable broken output.

Final challenge brief after independent review: choose the method that actually meets the demonstrated [3,5) cut without earlier pictures, then plan a join that puts opening context A before a two-second result hold B starting at source 4, without gap/overlap. Learners derive B's source end and decide the reset operation. The cut-method choice is explicitly about the non-keyframe cut comparison; A/B's keyframe-aligned video bounds alone would not rule out stream copy. Six answers: method encode, order AB, reset yes, end 6, duration 4, join 2. Model.referenceAnswers derives numeric answers from clips and measured output. All are available in interactives/visible brief. Five hints should progress from where to inspect to complete reference.

## Teaching and technical boundaries

Module 1 remains planned; briefly introduce FFmpeg as a command-line media tool, `-i` as input, output filename as destination, copy versus encode. The lesson runs no FFmpeg in browser. Selector changes choose already generated outputs; matching command/evidence is optional to inspect, not required terminal work. Browser video seeking is approximate; decoded stills establish first/last/join pictures. All controls need labels and useful fallback if media fails. No narration is present and no listening is required.

Primary sources fetched and checked today: https://ffmpeg.org/ffmpeg.html#Main-options (`-ss` preserves pre-seek material with stream copy); https://ffmpeg.org/ffmpeg-filters.html#trim and #atrim (trim does not reset timestamps), #setpts_002c-asetpts, #concat (segments start at zero, related streams concatenated together, dimensions explicitly compatible); https://ffmpeg.org/ffmpeg-formats.html#concat (concat demuxer separate mechanism, compatible streams/time bases, do not conflate with filter). No general concat demuxer exercise is implemented. All factual numbers must come from fixture/model, not copied constants in widgets.
