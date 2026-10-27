// Copyright © 2026 Christopher Snow
import { useRef, useState } from "react";
import { glossaryEntries, glossaryUI as g } from "./glossary.strings";
import { codecGuide } from "./codecs.strings";
import { courseCopy } from "./copy";
import { InlineText } from "./InlineText";
import "./glossary.css";

const alphabetical = [...glossaryEntries].sort((a, b) =>
  a.term.localeCompare(b.term, "en"),
);
export function Glossary() {
  const [query, setQuery] = useState("");
  const search = useRef<HTMLInputElement>(null);
  const match = query.trim().toLocaleLowerCase("en");
  const entries = alphabetical.filter((entry) =>
    [entry.term, ...(entry.aliases ?? [])].some((name) =>
      name.toLocaleLowerCase("en").includes(match),
    ),
  );
  return (
    <article className="glossary">
      <h1>{g.title}</h1>
      <p>{g.intro}</p>
      <p>
        <a href="#/appendix/codecs">{codecGuide.link}</a>
      </p>
      <div className="glossary-search">
        <label>
          {g.search}
          <input
            ref={search}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        {query && (
          <button
            onClick={() => {
              setQuery("");
              search.current?.focus();
            }}
          >
            {g.clear}
          </button>
        )}
      </div>
      <p role="status" className={entries.length ? "sr-only" : undefined}>
        {entries.length ? g.count(entries.length) : g.noResults}
      </p>
      <dl className="glossary-entries">
        {entries.map((entry) => (
          <div className="glossary-entry" key={entry.id}>
            <dt>
              <h2>{entry.term}</h2>
            </dt>
            <dd>
              <p>
                <InlineText>{entry.definition}</InlineText>
              </p>
              <p className="glossary-example">
                <InlineText>{entry.example}</InlineText>
              </p>
              <a href={`#/learn/${entry.lesson}`}>
                {g.lessonPrefix} {courseCopy.pages[entry.lesson]!.title}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
