# Independent final built checker

Copyright © 2026 Christopher Snow.

Checked 27 October 2026 against the actual built preview at
`http://127.0.0.1:4173/video-lab/`. This checker did not draft, edit or fix the
product. I read `01-facts.md`, `03-reader.md`, `04-sceptic.md` and
`05-resolution.md`, then independently inspected the built Chapter 2 and
Chapter 8 routes. No product defect or ranked fix remains in this slice.

## Built content and navigation

- Chapter 2 explicitly says the shared reader-name list does not identify the
  exact container, then supplies the practice file's MP4 provenance separately.
  Its practice asks for duration, stream count, types and codecs, and repeats
  that the reader list does not establish the exact container by itself.
- The bitrate passage defines the whole-file quantity, decimal kb/s and averaging,
  then gives its practical consequences: equal-duration file size, storage and
  downloading, and the qualified connection-capacity consequence for streaming.
  It states possible compression loss and why higher bitrate alone does not
  establish quality. This agrees with the verified fact brief and the reader and
  sceptic's accepted findings.
- The actual optional “Chapter 8: Choose an encoding quality setting” link was
  clicked on both desktop and phone and reached `#/learn/quality/quality`.
- Chapter 8 states that CRF targets quality rather than bitrate or exact size.
  The existing equal-duration comparison now explains why file-size order also
  orders average whole-file bitrate. Independent practice asks for a real CRF 26
  file and an editorial choice based on detail and size. The supplied native
  examples remain identified separately from the learner's actual results.

## Viewports, themes and enlarged text

Ran standalone Node Playwright directly, without invoking the Playwright CLI or
repeating the parent's full quality gate:

```sh
node /workspace/scratch/bitrate-purpose/checker/check.mjs
node /workspace/scratch/bitrate-purpose/checker/focus.mjs
```

Both commands exited 0. Artifacts are in
`/workspace/scratch/bitrate-purpose/checker/`.

`matrix.json` records both routes at desktop 1440 × 1000 and phone 390 × 844,
light and dark, with root font size 16 px and 32 px (200% enlarged-text reflow).
All sixteen document widths equal the viewport width. Actual `data-theme` values
were checked, rather than relying on emulated colour preference. Sixteen full-page
screenshots and four rendered-text snapshots accompany the measurements.

I visually inspected desktop light Chapter 2, desktop dark Chapter 8, phone dark
Chapter 2 at 200%, and phone light Chapter 8 at 200%. The page reflows, the
comparison images stack on phone, and command text and controls remain within
the page. The two `*-phone-dark-200-context.png` viewport screenshots separately
show readable, unclipped enlarged bitrate explanation and size/rate connection.
The 200% check enlarges the root text; it does not claim a separate browser-chrome
zoom assessment.

The first harness attempt used an overbroad negative regular expression for the
exercise and matched its correct explanatory sentence about container ambiguity.
After narrowing that assertion to an actual request to identify/name a container,
the complete harness passed. This was a checker-harness error, not a product
finding; no product was edited.

## Completed actual practice and technical check

In a fresh browser workspace I loaded the practice files and executed:

```sh
ffmpeg -i bunny-short.mp4 -c:v libx264 -crf 26 practice-quality.mp4
```

The actual cell reached “Command completed”; `crf26.log` records the CRF 26.0
encoder setting and final `Lsize`. I then clicked Check result and waited for
its completed result, rather than capturing the intermediate Working state.
`quality-check.txt` records:

```text
✓ Duration close to 8 seconds (actual 8.000000)
✓ Contains an audio stream
✓ Contains video
✓ Video codec h264

The checked properties match. Review the actual output; replay media when available.
```

`quality-completed.txt` and `quality-check-completed.png` preserve the rendered
completed state. This resolves the reader/sceptic observation limit concerning
the earlier Working snapshot. Technical grading is explicitly limited on the
page: it does not assess the chosen CRF, perceived detail or listening quality.
This checker makes no subjective playback/listening claim and did not repeat
all encodes already run by the independent reader and sceptic.

The parent's full `npm run check` remains separately recorded; this focused
built-site verification does not substitute for that gate. No product files
were changed by the checker and no commit was made.
