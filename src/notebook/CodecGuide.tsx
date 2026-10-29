// Copyright © 2026 Christopher Snow
import { useRef, useState } from "react";
import { codecGuide as g } from "./codecs.strings";
import { formatGuide } from "./formats.strings";
import media from "./codecs-media.json";
import { InlineText } from "./InlineText";
import { courseCopy } from "./copy";
import "./codecs.css";
function Paragraphs({ items }: { items: readonly string[] }) {
  return items.map((text) => (
    <p key={text}>
      <InlineText>{text}</InlineText>
    </p>
  ));
}
export function CodecGuide() {
  const players = useRef<(HTMLAudioElement | null)[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  return (
    <article className="codec-guide">
      <span className="eyebrow">{g.optional}</span>
      <h1>{g.title}</h1>
      <Paragraphs items={g.intro} />
      <section className="codec-start" aria-labelledby="codec-start-title">
        <h2 id="codec-start-title">{g.startTitle}</h2>
        <Paragraphs items={g.startBody} />
        <a className="button primary" href="#/learn/export/format">
          {g.startLink} →
        </a>
      </section>
      <section aria-labelledby="check-playback">
        <h2 id="check-playback" tabIndex={-1}>
          {g.checkTitle}
        </h2>
        <ol className="codec-check-steps">
          {g.checkSteps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <p>
                <InlineText>{step.text}</InlineText>
              </p>
            </li>
          ))}
        </ol>
        <p>{g.checkLimit}</p>
      </section>
      <section>
        <h2>{g.choosingTitle}</h2>
        <Paragraphs items={g.choosing} />
      </section>
      <section>
        <h2>{g.videoTitle}</h2>
        <dl>
          {g.video.map((entry) => (
            <div key={entry.name}>
              <dt>
                <strong>{entry.name}</strong>
              </dt>
              <dd>
                <InlineText>{entry.text}</InlineText>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h2>{g.compressionTitle}</h2>
        <Paragraphs items={g.compression} />
      </section>
      <section>
        <h2>{g.audioTitle}</h2>
        <dl>
          {g.audio.map((entry) => (
            <div key={entry.name}>
              <dt>
                <strong>{entry.name}</strong>
              </dt>
              <dd>
                <InlineText>{entry.text}</InlineText>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h2>{g.listeningTitle}</h2>
        <Paragraphs items={g.listening} />
        {media.files.map((file, index) => {
          const track = g.tracks[index]!;
          const url = import.meta.env.BASE_URL + "media/codecs/" + file.name;
          return (
            <figure className="codec-track" key={file.name}>
              <figcaption id={`codec-track-${index}`}>
                <strong>{track.title}</strong>
                <p>
                  <InlineText>{track.note}</InlineText>
                </p>
                <p>
                  {g.size(file.bytes)} ·{" "}
                  {g.metadata(file.duration, file.sampleRate, file.channels)}
                </p>
              </figcaption>
              <audio
                ref={(element) => {
                  players.current[index] = element;
                }}
                controls
                preload="none"
                aria-labelledby={`codec-track-${index}`}
                src={url}
                onPlay={() =>
                  players.current.forEach((player, other) => {
                    if (other !== index) player?.pause();
                  })
                }
                onError={() =>
                  setErrors((current) =>
                    current.includes(file.name)
                      ? current
                      : [...current, file.name],
                  )
                }
              />
              {errors.includes(file.name) && (
                <p role="status">{g.playbackError}</p>
              )}
              <a href={url} download={file.name}>
                {g.download} {file.name}
              </a>
            </figure>
          );
        })}
      </section>
      <section>
        <h2>{g.recipeTitle}</h2>
        <Paragraphs items={g.recipeIntro} />
        <pre>
          <code>
            {media.commands
              .map((command) =>
                command
                  .map((part) =>
                    part
                      .replace("public/media/notebook/", "")
                      .replace("public/media/codecs/", ""),
                  )
                  .join(" "),
              )
              .join("\n")}
          </code>
        </pre>
        <Paragraphs items={g.recipeNotes} />
      </section>
      <nav aria-label={g.continueTitle}>
        <h2>{g.continueTitle}</h2>
        <ul>
          <li>
            <a href="#/appendix/formats">{formatGuide.link}</a>
          </li>
          {["inside-video/inspect", "quality/quality", "export/format"].map(
            (id) => (
              <li key={id}>
                <a href={`#/learn/${id}`}>{courseCopy.pages[id]!.title}</a>
              </li>
            ),
          )}
        </ul>
      </nav>
      <section>
        <h2>{g.sourcesTitle}</h2>
        <ul>
          {g.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url}>{source.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
