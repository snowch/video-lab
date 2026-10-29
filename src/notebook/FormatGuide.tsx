// Copyright © 2026 Christopher Snow
import { formatGuide as g } from "./formats.strings";
import { pixelFormats as pixels } from "./pixel-formats.strings";
import { codecGuide } from "./codecs.strings";
import { glossaryUI } from "./glossary.strings";
import { courseCopy } from "./copy";
import { InlineText } from "./InlineText";
import "./formats.css";

type FormatEntry = {
  readonly name: string;
  readonly extensions: string;
  readonly description: string;
  readonly use: string;
};

function Paragraphs({ items }: { items: readonly string[] }) {
  return items.map((text) => (
    <p key={text}>
      <InlineText>{text}</InlineText>
    </p>
  ));
}

function FormatSection({
  id,
  title,
  entries,
}: {
  id: string;
  title: string;
  entries: readonly FormatEntry[];
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <div className="format-cards">
        {entries.map((entry) => (
          <div className="format-card" key={entry.name}>
            <h3>{entry.name}</h3>
            <p className="format-extensions">
              <code>{entry.extensions}</code>
            </p>
            <p>
              <InlineText>{entry.description}</InlineText>
            </p>
            <p>
              <InlineText>{entry.use}</InlineText>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FormatGuide() {
  return (
    <article className="format-guide">
      <header>
        <span className="eyebrow">{g.optional}</span>
        <h1>{g.title}</h1>
        <Paragraphs items={g.intro} />
      </header>
      <section>
        <h2>{g.conceptsTitle}</h2>
        <dl className="format-concepts">
          {g.concepts.map((entry) => (
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
        <h2>{g.choosingTitle}</h2>
        <Paragraphs items={g.choosing} />
      </section>
      <section aria-labelledby="pixel-formats">
        <h2 id="pixel-formats" tabIndex={-1}>
          {pixels.title}
        </h2>
        <Paragraphs items={pixels.intro} />
        <h3>{pixels.samplingTitle}</h3>
        <Paragraphs items={pixels.sampling} />
        <dl className="format-concepts">
          {pixels.formats.map((entry) => (
            <div key={entry.name}>
              <dt>
                <code>{entry.name}</code>
              </dt>
              <dd>
                <InlineText>{entry.text}</InlineText>
              </dd>
            </div>
          ))}
        </dl>
        <Paragraphs items={pixels.conclusion} />
      </section>
      <FormatSection
        id="video-formats"
        title={g.videoTitle}
        entries={g.video}
      />
      <FormatSection
        id="audio-formats"
        title={g.audioTitle}
        entries={g.audio}
      />
      <FormatSection
        id="image-formats"
        title={g.imagesTitle}
        entries={g.images}
      />
      <section>
        <h2>{g.scopeTitle}</h2>
        <Paragraphs items={g.scope} />
      </section>
      <nav aria-label={g.continueTitle}>
        <h2>{g.continueTitle}</h2>
        <ul>
          <li>
            <a href="#/appendix/codecs">{codecGuide.link}</a>
          </li>
          <li>
            <a href="#/glossary">{glossaryUI.title}</a>
          </li>
          {["inside-video/inspect", "image-video/hold", "export/format"].map(
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
          {[...g.sources, ...pixels.sources].map((source) => (
            <li key={source.url}>
              <a href={source.url}>{source.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
