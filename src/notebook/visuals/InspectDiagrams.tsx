// Copyright © 2026 Christopher Snow
import media from "./media.json";
import { InlineText } from "../InlineText";
import { inspectCopy as t } from "./inspect.strings";
import "./inspect.css";
const video = media.source.streams.find((s) => s.type === "video")!;
const audio = media.source.streams.find((s) => s.type === "audio")!;

export function InspectDiagram({ pageId }: { pageId: string }) {
  if (pageId !== "inside-video/inspect" && pageId !== "inside-video/streams")
    return null;
  return (
    <figure className="notebook-diagram visual-structure" data-visual="streams">
      <figcaption>
        {pageId.endsWith("/inspect") ? t.structureTitle : t.splitTitle}
      </figcaption>
      <div className="visual-container">
        <strong>
          <code>bunny-short.mp4</code> · {t.container}
        </strong>
        <div className="visual-streams">
          <div>
            <strong>{t.video}</strong>
            <code>Stream #0:{video.index}</code>
            <span>
              {t.codec}: <code>{video.codec}</code>
            </span>
          </div>
          <div>
            <strong>{t.audio}</strong>
            <code>Stream #0:{audio.index}</code>
            <span>
              {t.codec}: <code>{audio.codec}</code>
            </span>
          </div>
        </div>
      </div>
      {pageId.endsWith("/streams") ? (
        <>
          <div className="visual-streams visual-stream-outputs">
            <div>
              <span className="visual-source-arrow" aria-hidden="true">
                ↓
              </span>
              <code>-an → silent.mp4</code>
              <strong>{t.videoOnly}</strong>
            </div>
            <div>
              <span className="visual-source-arrow" aria-hidden="true">
                ↓
              </span>
              <code>-vn → sound.wav</code>
              <strong>{t.audioOnly}</strong>
            </div>
          </div>
          <p>{t.splitNote}</p>
        </>
      ) : (
        <p>{t.structureNote}</p>
      )}
    </figure>
  );
}

// The guide quotes substrings from a recorded native run. It never parses or
// rewrites live tool output, nor changes when the learner edits a command.
export function ProbeGuide() {
  const line = (kind: string) =>
    media.probe.lines.find((l) => l.includes(kind))!;
  const part = (text: string, pattern: RegExp) => {
    const match = text.match(pattern);
    if (!match) throw new Error("Recorded probe excerpt is missing a field");
    return match[0];
  };
  const duration = line("Duration:"),
    v = line("Video:"),
    a = line("Audio:");
  const rows: [string, string | string[]][] = [
    [line("Input #0"), t.inputMeaning],
    [
      [
        part(duration, /Duration: [\d:.]+/),
        part(duration, /bitrate: \d+ kb\/s/),
      ].join(" … "),
      t.durationMeaning,
    ],
    [
      [
        part(v, /Stream #\d+:\d+/),
        part(v, /Video: \w+/),
        part(v, new RegExp(`\\b${video.width}x${video.height}\\b`)),
        part(v, /\b[\d.]+ fps\b/),
      ].join(" … "),
      t.videoMeaning,
    ],
    [
      [
        part(a, /Stream #\d+:\d+/),
        part(a, /Audio: \w+/),
        part(a, /\b\d+ Hz\b/),
      ].join(" … "),
      t.audioMeaning,
    ],
  ];
  const source = media.framing.images.source;
  return (
    <figure className="notebook-diagram visual-probe" data-visual="probe-guide">
      <figcaption>{t.guideTitle}</figcaption>
      <p>{t.guideNote}</p>
      <dl className="visual-probe-lines">
        {rows.map(([quote, meaning], i) => (
          <div key={i}>
            <dt>
              <code>{quote}</code>
            </dt>
            <dd>
              {(Array.isArray(meaning) ? meaning : [meaning]).map((text, j) => (
                <p key={j}>
                  <InlineText>{text}</InlineText>
                </p>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      <div className="visual-dimensions">
        <strong>
          {t.dimensions}: {video.width} {t.wide} × {video.height} {t.high}
        </strong>
        <img
          src={import.meta.env.BASE_URL + source.path}
          width={source.width}
          height={source.height}
          alt={t.dimensionAlt}
          loading="lazy"
        />
      </div>
    </figure>
  );
}
