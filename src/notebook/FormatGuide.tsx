// Copyright © 2026 Christopher Snow
import { formatGuide as g } from "./formats.strings";
import { pixelFormats as pixels } from "./pixel-formats.strings";
import { formatVisuals as v } from "./format-visuals.strings";
import {
  ContainerDiagram,
  RemuxDiagram,
  PurposeDiagram,
  PixelMagnifier,
  SamplingDiagram,
  AlphaDiagram,
} from "./FormatVisuals";
import type { FormatSection as ReferenceSection } from "./structure";
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
function ConceptDefinitions({ indices }: { indices: number[] }) {
  return (
    <dl className="format-concepts">
      {indices
        .map((i) => g.concepts[i]!)
        .map((entry) => (
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
  );
}
function PlaybackReference() {
  return (
    <p className="format-playback-reference">
      <a href="#/appendix/codecs/check-playback">{codecGuide.checkLink} →</a>
    </p>
  );
}
function ContainerGuide() {
  return (
    <>
      <p>{v.containerIntro}</p>
      <PlaybackReference />
      <ContainerDiagram />
      <p>{v.demuxerMuxer}</p>
      <section>
        <h2>{v.remuxTitle}</h2>
        <p>{v.remuxIntro}</p>
        <RemuxDiagram />
        <ConceptDefinitions indices={[2]} />
        <p>{v.encodingNote}</p>
      </section>
      <FormatSection
        id="video-formats"
        title={g.videoTitle}
        entries={g.video}
      />
    </>
  );
}
function PixelGuide() {
  return (
    <>
      <PixelMagnifier />
      <Paragraphs items={pixels.intro} />
      <PlaybackReference />
      <section>
        <h2>{v.samplingTitle}</h2>
        <p>
          <InlineText>{v.samplingIntro}</InlineText>
        </p>
        <SamplingDiagram />
        <p>{v.samplingConsequence}</p>
      </section>
      <section>
        <h2>{v.alphaTitle}</h2>
        <p>
          <InlineText>{v.alphaIntro}</InlineText>
        </p>
        <AlphaDiagram />
      </section>
      <details className="format-details">
        <summary>{v.detailsSummary}</summary>
        <Paragraphs items={[pixels.sampling[1]]} />
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
      </details>
    </>
  );
}
export function FormatGuide({ section }: { section?: ReferenceSection }) {
  const title =
    section === "pixel-formats"
      ? pixels.title
      : section === "video-containers"
        ? v.containerTitle
        : g.title;
  const references = [
    { href: "#/appendix/formats", title: g.title, section: undefined },
    {
      href: "#/appendix/formats/video-containers",
      title: v.containerTitle,
      section: "video-containers",
    },
    {
      href: "#/appendix/formats/pixel-formats",
      title: pixels.title,
      section: "pixel-formats",
    },
  ];
  return (
    <article className="format-guide">
      <header>
        <span className="eyebrow">{g.optional}</span>
        <h1 id={section} tabIndex={section ? -1 : undefined}>
          {title}
        </h1>
      </header>
      {section === "pixel-formats" ? (
        <PixelGuide />
      ) : section === "video-containers" ? (
        <ContainerGuide />
      ) : (
        <>
          <Paragraphs items={g.intro} />
          <PurposeDiagram />
          <section>
            <h2>{g.videoTitle}</h2>
            <p>{v.videoSignpost}</p>
            <a className="button" href="#/appendix/formats/video-containers">
              {v.videoReferenceLink} →
            </a>
          </section>
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
            <h2>{g.choosingTitle}</h2>
            <Paragraphs items={g.choosing} />
            <PlaybackReference />
          </section>
        </>
      )}
      <nav aria-label={v.referenceNavLabel}>
        <ul className="format-reference-links">
          {references
            .filter((ref) => ref.section !== section)
            .map((ref) => (
              <li key={ref.href}>
                <a href={ref.href}>{ref.title} →</a>
              </li>
            ))}
        </ul>
      </nav>
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
          {(section === "pixel-formats" ? pixels.sources : g.sources).map(
            (source) => (
              <li key={source.url}>
                <a href={source.url}>{source.label}</a>
              </li>
            ),
          )}
        </ul>
      </section>
    </article>
  );
}
