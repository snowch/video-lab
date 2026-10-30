// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import {
  commandReferenceGroups,
  commandReferenceUI as r,
} from "./command-reference.strings";
import { filterCommandReference } from "./command-reference";
import { InlineText } from "./InlineText";
import { CommandCell } from "./Cell";
import "./command-reference.css";

function readSearch() {
  const params = new URLSearchParams(location.hash.split("?")[1] ?? "");
  const category = params.get("purpose") ?? "";
  return {
    query: params.get("q") ?? "",
    category: commandReferenceGroups.some((group) => group.id === category)
      ? category
      : "",
  };
}
export function CommandReference() {
  const help = useRef<HTMLDivElement>(null);
  const [{ query, category }, setSearch] = useState(readSearch);
  useEffect(() => {
    const restore = () => setSearch(readSearch());
    addEventListener("hashchange", restore);
    return () => removeEventListener("hashchange", restore);
  }, []);
  function changeSearch(query: string, category: string) {
    setSearch({ query, category });
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("purpose", category);
    const suffix = params.size ? `?${params}` : "";
    history.replaceState(null, "", `#/appendix/commands${suffix}`);
  }
  const search = useRef<HTMLInputElement>(null);
  const groups = filterCommandReference(
    commandReferenceGroups,
    query,
    category,
  );
  const count = groups.reduce(
    (total, group) => total + group.entries.length,
    0,
  );
  return (
    <article className="command-reference">
      <h1>{r.title}</h1>
      <p>
        <InlineText>{r.intro}</InlineText>
      </p>
      <p>
        <InlineText>{r.scope}</InlineText>
      </p>
      <div ref={help}>
        <CommandCell
          id="appendix/commands:help"
          initial={r.helpCommand}
          title={r.helpTitle}
          introduction={[r.helpIntro]}
        />
      </div>
      <div className="command-reference-search">
        <label>
          {r.search}
          <input
            ref={search}
            type="search"
            value={query}
            onChange={(event) => changeSearch(event.target.value, category)}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <label>
          {r.category}
          <select
            value={category}
            onChange={(event) => changeSearch(query, event.target.value)}
          >
            <option value="">{r.all}</option>
            {commandReferenceGroups.map((group) => (
              <option value={group.id} key={group.id}>
                {group.title}
              </option>
            ))}
          </select>
        </label>
        {(query || category) && (
          <button
            onClick={() => {
              changeSearch("", "");
              search.current?.focus();
            }}
          >
            {r.clear}
          </button>
        )}
      </div>
      <p role="status">{count ? r.count(count) : r.noResults}</p>
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`reference-${group.id}`}>
          <h2 id={`reference-${group.id}`}>{group.title}</h2>
          {group.intro && (
            <p>
              <InlineText>{group.intro}</InlineText>
            </p>
          )}
          <dl>
            {group.entries.map((entry) => (
              <div className="command-reference-entry" key={entry.id}>
                <dt>
                  <h3>
                    <code>{entry.name}</code>
                  </h3>
                </dt>
                <dd>
                  <p>
                    <InlineText>{entry.summary}</InlineText>
                  </p>
                  <pre>
                    <code>{entry.example}</code>
                  </pre>
                  <p>
                    <InlineText>{entry.detail}</InlineText>
                  </p>
                  <a
                    href={entry.href}
                    onClick={(event) => {
                      if (
                        entry.href !== "#/appendix/commands" ||
                        event.metaKey ||
                        event.ctrlKey ||
                        event.shiftKey ||
                        event.altKey
                      )
                        return;
                      event.preventDefault();
                      help.current
                        ?.querySelector("textarea")
                        ?.focus({ preventScroll: true });
                      help.current?.scrollIntoView({ block: "start" });
                    }}
                  >
                    {entry.link} →
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      <section>
        <h2>{r.sourcesTitle}</h2>
        <p>{r.sourcesIntro}</p>
        <ul>
          {r.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url}>{source.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
