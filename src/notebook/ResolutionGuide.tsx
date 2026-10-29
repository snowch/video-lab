// Copyright © 2026 Christopher Snow
import { courseCopy } from "./copy";
import { useState } from "react";
import { InlineText } from "./InlineText";
import { resolutionGuide as g } from "./resolution.strings";
import { resolutionGrids, resolutionGeometry } from "./resolution-model";
import "./resolution.css";
function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((text) => (
        <p key={text}>
          <InlineText>{text}</InlineText>
        </p>
      ))}
    </>
  );
}
export function ResolutionGuide() {
  const [selected, setSelected] = useState(1);
  const current = resolutionGeometry(selected);
  return (
    <article className="resolution-guide">
      <header>
        <span className="eyebrow">{g.optional}</span>
        <h1>{g.title}</h1>
      </header>
      <Paragraphs items={g.intro} />
      <p>{g.diagramPDefinition}</p>
      <section>
        <h2>{g.choicesTitle}</h2>
        <dl className="resolution-choices">
          {g.choices.map((choice) => (
            <div key={choice.name}>
              <dt>{choice.name}</dt>
              <dd>
                <strong>{choice.dimensions}</strong>
                <p>{choice.use}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <figure
        className="resolution-figure"
        aria-labelledby="resolution-figure-title"
      >
        <h2 id="resolution-figure-title">{g.diagramTitle}</h2>
        <p>{g.diagramIntro}</p>
        <label>
          {g.diagramSelectLabel}
          <select
            value={selected}
            onChange={(event) => setSelected(Number(event.target.value))}
          >
            {resolutionGrids.map((grid, i) => (
              <option key={grid.label} value={i}>
                {grid.label} · {grid.width} × {grid.height}
              </option>
            ))}
          </select>
        </label>
        <svg
          viewBox="0 0 1920 1080"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect
            x="0"
            y="0"
            width={current.width}
            height={current.height}
            className="resolution-selected"
          />
          {[...resolutionGrids].reverse().map((grid) => (
            <rect
              key={grid.label}
              x="0"
              y="0"
              width={grid.width}
              height={grid.height}
              className="resolution-grid"
            />
          ))}
        </svg>
        <output aria-live="polite">
          {current.width} × {current.height} ·{" "}
          {g.diagramPixelCount(current.pixels)}
        </output>
        <ul className="resolution-outline-labels">
          {resolutionGrids.map((grid, i) => (
            <li key={grid.label}>
              {g.diagramOutlines[i]}: <strong>{grid.label}</strong> ·{" "}
              {grid.width} × {grid.height}
            </li>
          ))}
        </ul>
        <figcaption>{g.diagramCaveat}</figcaption>
      </figure>
      <section>
        <h2>{g.sourceTitle}</h2>
        <Paragraphs items={g.source} />
      </section>
      <section>
        <h2>{g.testTitle}</h2>
        <Paragraphs items={g.test} />
      </section>
      <section>
        <h2>{g.exerciseTitle}</h2>
        <Paragraphs items={g.exercise} />
        <a className="button" href="#/learn/framing/scale">
          {g.exerciseLink} →
        </a>
      </section>
      <nav aria-label={g.continueTitle}>
        <h2>{g.continueTitle}</h2>
        <ul>
          <li>
            <a href="#/learn/framing/crop">
              {courseCopy.pages["framing/crop"]!.title}
            </a>
          </li>
          <li>
            <a href="#/learn/framing/pad">
              {courseCopy.pages["framing/pad"]!.title}
            </a>
          </li>
          <li>
            <a href="#/learn/export/format">
              {courseCopy.pages["export/format"]!.title}
            </a>
          </li>
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
