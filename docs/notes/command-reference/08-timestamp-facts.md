# Timestamp visual: verified facts and implementation plan

Copyright © 2026 Christopher Snow.

## Need and audience

The owner requested more visual explanation at `#/learn/frames-time/timestamps`. The earlier diagram contained two picture dots from 0 to 512 ticks, a conversion equation and a brief caption. The replacement must connect several actual picture timestamps, the interval between pictures and the much smaller clock tick. Reader prerequisites: picture/frame, frame rate and seconds from earlier pages; do not assume the reader already distinguishes an absolute timestamp from an elapsed interval.

## Verified source measurements

`src/notebook/visuals/media.json`, `timeline`, records native ffprobe output from `public/media/notebook/bunny-short.mp4`. The source's video time base is `1/12288` second per tick; the video rate is `24/1`; all 192 source pictures were checked in the recorded preparation and its adjacent video timestamps differ by 512 ticks. The metadata retains the first eight recorded frames.

This visual uses the first four **recorded** frames, not times inferred from average frame rate:

| One-based picture number | Recorded PTS (ticks) | Recorded printed seconds |
| --- | --- | --- |
| 1 | 0 | 0.000000 |
| 2 | 512 | 0.041667 |
| 3 | 1024 | 0.083333 |
| 4 | 1536 | 0.125000 |

Rechecked with installed native FFprobe 7.1.5 using `ffprobe -v error -select_streams v:0 -show_frames -show_entries frame=pts,pts_time -of csv=p=0 public/media/notebook/bunny-short.mp4`; the first four rows match the table. FFprobe also prints side data after the first row; this is not another picture. The visual calculates exact seconds from each integer PTS and the time base, then rounds to six decimals for display, matching the recorded decimal values.

For each of three selectable adjacent pairs, elapsed ticks = end PTS − start PTS = 512. Elapsed seconds = 512 × 1/12288 = 1/24 ≈ 0.041667. One clock tick = 1/12288 ≈ 0.000081 second, much shorter than a picture interval. An absolute end timestamp is not the elapsed duration of an interval whose start is nonzero. Other files may use other time bases/rates or irregular picture spacing; a stream average alone cannot establish equal picture spacing.

Sources: https://ffmpeg.org/ffprobe.html#Main-options (frame reporting); https://ffmpeg.org/ffmpeg-utils.html#Time-duration; the committed source metadata and `docs/notes/visual-teaching/time-facts.md`/existing time-model verification. These are source-example facts, not measurements of a learner's output. The native metadata recording command's `-select_streams`, `-show_frames`, `-v`, and CSV output are investigator details, not additions to the taught-option inventory.

## Visual model and interaction

1. A common horizontal timeline positions four numbered picture markers according to their recorded PTS. A matching numbered card for each picture gives the absolute tick timestamp and its seconds conversion. No invented thumbnails or media stills.
2. A native labelled select chooses an adjacent interval: pictures 1→2, 2→3 or 3→4. The chosen overview segment and its endpoint cards are highlighted by geometry/borders as well as colour. Native select supplies keyboard and touch interaction; there is no new gesture-only control.
3. A second, enlarged axis shows the selected interval. Its only picture markers are the two endpoints. Three intermediate **clock** marks divide the selected interval into four 128-tick gaps, calculated from the measured endpoint difference. The caption explicitly distinguishes these calculated clock positions from recorded pictures and states that not every tick is drawn. Endpoints give actual absolute ticks and seconds; the equation subtracts the chosen absolute PTS values before converting their difference.
4. A separate one-tick conversion shows why a tick differs from a frame interval. Do not add a first-to-third 1024-tick solution equation; the independent practice asks the learner to work out a two-interval span.
5. HTML labels and source timestamp cards are the visual's text equivalent. The geometric timeline/SVG is hidden from assistive technology to avoid duplicate announcements; native select labels/control relationship and a polite live calculation announce selected interval changes. Text remains normal HTML size, cards change to two columns on narrow screens and one column when enlarged text needs the space, and everything wraps inside the figure.

## Model before prose and ownership

Added `src/notebook/visuals/timestamp-model.ts` and `timestamp-model.test.ts` first. Tests pin measured PTS values/rounded seconds, verify each selected pair's absolute endpoints/difference/conversion and quarter clock positions, and reject invalid interval indices. `npx vitest run src/notebook/visuals/timestamp-model.test.ts` passed 3 tests before the component was built.

Separate drafter `/root/options_prose` owns new `src/notebook/visuals/timestamp.strings.ts`, exporting `timestampText` with schema: caption, overviewTitle, overviewNote, picture(index), ticks(value), seconds(value), sourceNote(file), intervalLabel, intervalChoice(first,last), zoomTitle(first,last), clockScale(step), clockNote, difference(start,end,delta), intervalConversion(ticks,base,seconds), tickTitle, tickConversion(base,seconds), tickNote. Builder owns model/view/CSS/tests and edits prose only for verified accuracy/clarity.

New view `TimestampDiagram.tsx` replaces the old private timestamp figure in `TimeDiagrams.tsx`; shared time.css owns responsive/themed styles. No command-reference application files, source media, notebook task commands, grading or answer persistence were changed for the visual. Root will run full checks and arrange independent built-site review after these changes; this note does not claim independent validation.

## Builder verification

- `npx tsc --noEmit`: passed after implementation.
- `npx vitest run src/notebook/visuals/time-model.test.ts src/notebook/visuals/timestamp-model.test.ts`: 8 tests passed across 2 files.
- Focused new test in `tests/visual-teaching.spec.ts`: passed all five projects (desktop/phone light/dark, Firefox), using a temporary Playwright config pointed at the dev server on port 4204. It verifies the four source cards, keyboard selection of the last pair, absolute 1024/1536 endpoint ticks, elapsed 512 ticks/0.041667 seconds, selected borders, three intermediate clock marks, preservation of the existing command draft, 44-pixel selector and no horizontal overflow at 320 pixels with 200% text.
- Own dev screenshots inspected at desktop light, phone dark and 320-pixel enlarged text. Narrow cards now become a single column, retaining complete timestamp values. These are builder checks, not independent reviews of the built app. The root session is responsible for final built-site review/full checks.

## Independent practice separation after sceptic review

The new four-picture overview exposes the timestamp of the original practice's third picture. Even without its own two-interval equation, that timestamp makes the earlier first-to-third answer directly visible. The justified fix moves independent practice to the source's **first to sixth picture**, beyond the four shown in the diagram. No automatic grading changes: this lesson still checks only successful probe execution and asks the reader to verify their calculation.

Rechecked with `ffprobe -v error -select_streams v:0 -show_frames -show_entries frame=pts,pts_time -of json public/media/notebook/bunny-short.mp4`. Native sixth frame: `pts=2560`, `pts_time=0.208333`, matching `media.timeline.frames[5]`. First picture PTS is zero. Thus first→sixth spans five consecutive picture intervals: 5/24 second ≈ 0.208333 second; (5/24) ÷ (1/12288) = 2560 ticks. Multiplying back gives 2560 × 1/12288 = 5/24 second. The sixth picture is not shown in the new visual; do not add its PTS or solved interval to visible practice observation. Progressive hints may supply the final worked calculation, consistent with the existing exercise contract. Separate drafter updates only practice, practiceObserve and hints in `frames-time-timestamps.ts`; worked content, commands and automatic expectations remain unchanged.
