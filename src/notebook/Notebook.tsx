// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { chapters, pages, pageHref, type PageDefinition } from "./structure";
import { courseCopy } from "./copy";
import { n } from "./ui.strings";
import { NotebookWorkspace, useNotebook, downloadBlob } from "./Workspace";
import { CommandCell } from "./Cell";
import { ExampleDiagram } from "./ExampleDiagram";
import { FileManager, FilePreview } from "./FileManager";
import "./style.css";
const creditUrl =
  "https://github.com/snowch/video-lab/blob/main/docs/notes/notebook/media.json";
function ChapterLinks({
  page,
  onNavigate,
}: {
  page?: PageDefinition;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label={n.chapters}>
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter}>
            <a
              href={pageHref(pages.find((p) => p.chapter === chapter)!)}
              onClick={onNavigate}
              aria-current={page?.chapter === chapter ? "step" : undefined}
            >
              <span>{index + 1}</span>
              {courseCopy.chapters[chapter].title}
            </a>
            {page?.chapter === chapter && (
              <ol className="notebook-page-links">
                {pages
                  .filter((p) => p.chapter === chapter)
                  .map((p) => (
                    <li key={p.id}>
                      <a
                        href={pageHref(p)}
                        onClick={onNavigate}
                        aria-current={p.id === page.id ? "page" : undefined}
                      >
                        {courseCopy.pages[p.id]!.title}
                      </a>
                    </li>
                  ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
      <a
        className="notebook-earlier"
        href="#/appendix/recording"
        onClick={onNavigate}
      >
        Recording your own source
      </a>
    </nav>
  );
}
function Credits() {
  return (
    <p className="notebook-credit">
      {n.credits} <a href={creditUrl}>{n.creditLink}</a> ·{" "}
      <a href={import.meta.env.BASE_URL + "media/notebook/FONT-LICENCE.txt"}>
        {n.font}
      </a>
    </p>
  );
}
function NotebookHome() {
  return (
    <div className="notebook-home">
      <section className="notebook-welcome">
        <div>
          <span className="eyebrow">Video Lab</span>
          <h1>{courseCopy.title}</h1>
          <p>{courseCopy.intro}</p>
          <a className="button primary" href={pageHref(pages[0]!)}>
            {n.start} →
          </a>
          <p>{n.toolNote}</p>
        </div>
        <figure>
          <img
            src={import.meta.env.BASE_URL + "media/notebook/bunny-poster.jpg"}
            width="854"
            height="480"
            alt="Big Buck Bunny standing among trees and flowers"
          />
          <Credits />
        </figure>
      </section>
      <section aria-label={n.chapters}>
        <h2>{n.chapters}</h2>
        <ol className="notebook-chapter-cards">
          {chapters.map((c, i) => (
            <li key={c}>
              <span>{i + 1}</span>
              <div>
                <h3>
                  <a href={pageHref(pages.find((p) => p.chapter === c)!)}>
                    {courseCopy.chapters[c].title}
                  </a>
                </h3>
                <p>{courseCopy.chapters[c].summary}</p>
                <small>
                  {pages.filter((p) => p.chapter === c).length} concept pages
                </small>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
function NotebookPage({ page }: { page: PageDefinition }) {
  const w = useNotebook(),
    copy = courseCopy.pages[page.id]!,
    [hint, setHint] = useState(0),
    [solution, setSolution] = useState(false),
    [replay, setReplay] = useState(page.id === pages[0]!.id),
    [sourceName, setSourceName] = useState(page.assets[0]!),
    [error, setError] = useState("");
  const noteId = page.id + ":notes",
    notes = w.cells[noteId] ?? { id: noteId, command: "" };
  const index = pages.findIndex((p) => p.id === page.id);
  const chapterPages = pages.filter((p) => p.chapter === page.chapter);
  const required = page.assets.filter((name) => !w.files[name]);
  const source = w.files[sourceName];
  useEffect(() => {
    setHint(0);
    setSolution(false);
    setReplay(page.id === pages[0]!.id);
    setSourceName(page.assets[0]!);
    setError("");
  }, [page.id]);
  function note(patch: { prediction?: string; review?: string }) {
    w.edit(noteId, { command: "", ...patch });
  }
  function exportPage() {
    const records = Object.values(w.cells).filter((c) =>
      c.id.startsWith(page.id + ":"),
    );
    downloadBlob(
      page.slug + "-notebook.json",
      new Blob(
        [
          JSON.stringify(
            { format: "video-lab-notebook-page-v1", page: page.id, records },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
  }
  return (
    <article className="notebook-page" data-page={page.id}>
      <header className="notebook-page-heading">
        <p className="eyebrow">
          {n.chapter} {chapters.indexOf(page.chapter) + 1} ·{" "}
          {courseCopy.chapters[page.chapter].title} · {n.page}{" "}
          {chapterPages.indexOf(page) + 1} / {chapterPages.length}
        </p>
        <h1>{copy.title}</h1>
        <p className="notebook-goal">{copy.goal}</p>
      </header>
      <section className="notebook-source">
        <strong>{n.source}</strong>
        <code>{sourceName}</code>
        {copy.sourceNote && <p>{copy.sourceNote}</p>}
        {required.length > 0 ? (
          <>
            <p>{n.loadNote}</p>
            <button
              className="primary"
              disabled={!w.ready || w.busy}
              onClick={() =>
                void w
                  .load(
                    page.id === pages[0]!.id
                      ? [...page.assets, "bunny.mp4"]
                      : page.assets,
                  )
                  .then(() => setReplay(true))
                  .catch((e) =>
                    setError(e instanceof Error ? e.message : String(e)),
                  )
              }
            >
              {n.load}
            </button>
          </>
        ) : (
          <button onClick={() => setReplay((v) => !v)} aria-expanded={replay}>
            {n.replaySource}
          </button>
        )}
        {replay && source && (
          <div className="notebook-source-preview">
            {page.assets.filter((name) => name.endsWith(".mp4")).length > 1 && (
              <div
                className="notebook-source-choices"
                role="group"
                aria-label={n.source}
              >
                {page.assets
                  .filter((name) => name.endsWith(".mp4") && w.files[name])
                  .map((name) => (
                    <button
                      key={name}
                      aria-pressed={name === sourceName}
                      onClick={() => setSourceName(name)}
                    >
                      {name}
                    </button>
                  ))}
              </div>
            )}
            <strong>{sourceName}</strong>
            <FilePreview key={sourceName} file={source} />
          </div>
        )}
        {error && <p role="alert">{error}</p>}
      </section>
      <section className="notebook-concept">
        {copy.concept.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
      {page.worked.map((command, i) => (
        <CommandCell
          key={page.id + ":worked:" + i}
          id={page.id + ":worked:" + i}
          initial={command}
          title={copy.worked[i]!.title}
          teaching={copy.worked[i]!}
          preview={
            i === 0 && page.chapter === "first-edit"
              ? (current) => <ExampleDiagram page={page} command={current} />
              : undefined
          }
          illustration={
            i === 0 && page.chapter !== "first-edit" ? (
              <ExampleDiagram page={page} command={command} />
            ) : undefined
          }
        />
      ))}
      <section className="notebook-practice">
        <CommandCell
          key={page.id + ":practice"}
          id={page.id + ":practice"}
          initial={page.starter}
          title={n.practice}
          expected={page.expected}
          limit={copy.checkLimit}
          observe={copy.practiceObserve}
          introduction={[copy.practice]}
          options={copy.practiceOptions}
        />
        <div className="notebook-hints">
          <button
            disabled={hint === 5}
            onClick={() => setHint((v) => Math.min(5, v + 1))}
          >
            {n.hints} · {hint}/5
          </button>
          {hint > 0 && (
            <ol>
              {copy.hints.slice(0, hint).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ol>
          )}
          <button
            aria-expanded={solution}
            onClick={() => setSolution((v) => !v)}
          >
            {n.solution}
          </button>
          {solution && (
            <div>
              <pre tabIndex={0}>{page.solution}</pre>
              <p>{n.editor}</p>
            </div>
          )}
        </div>
      </section>
      {page.nativeScript && (
        <section className="notebook-native">
          <h2>{n.native}</h2>
          <p>{n.nativeNote}</p>
          <pre tabIndex={0}>{page.nativeScript}</pre>
          {copy.nativeExplanation?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <button
            onClick={() =>
              downloadBlob(
                "previews.sh",
                new Blob([page.nativeScript!], { type: "text/x-shellscript" }),
              )
            }
          >
            {n.nativeDownload}
          </button>
        </section>
      )}
      <details className="notebook-review">
        <summary>{n.notes}</summary>
        {notes.prediction !== undefined && (
          <label>
            {n.previousPrediction}
            <textarea
              rows={2}
              value={notes.prediction}
              onChange={(e) => note({ prediction: e.target.value })}
            />
          </label>
        )}
        <label>
          {n.notesLabel}
          <textarea
            rows={3}
            value={notes.review ?? ""}
            onChange={(e) => note({ review: e.target.value })}
          />
        </label>
        <button onClick={exportPage}>{n.exportNotebook}</button>
      </details>
      <Credits />
      <nav className="notebook-pager" aria-label="Lesson pages">
        {index > 0 ? (
          <a className="button" href={pageHref(pages[index - 1]!)}>
            ← {n.previous}
          </a>
        ) : (
          <a className="button" href="#/">
            {n.overview}
          </a>
        )}
        {index < pages.length - 1 ? (
          <a className="button primary" href={pageHref(pages[index + 1]!)}>
            {n.next}: {courseCopy.pages[pages[index + 1]!.id]!.title} →
          </a>
        ) : (
          <a className="button primary" href="#/">
            {n.overview} →
          </a>
        )}
      </nav>
    </article>
  );
}
function NotebookShell({ page }: { page?: PageDefinition }) {
  const w = useNotebook(),
    [filesOpen, setFilesOpen] = useState(false),
    menu = useRef<HTMLDialogElement>(null),
    filesButton = useRef<HTMLButtonElement>(null),
    menuButton = useRef<HTMLButtonElement>(null);
  return (
    <div className="notebook-shell" data-notebook-ready={w.ready}>
      <div className="notebook-toolbar">
        <a href="#/">{n.overview}</a>
        <button
          className="notebook-menu-button"
          ref={menuButton}
          onClick={() => menu.current?.showModal()}
        >
          {n.chapters}
        </button>
        <button ref={filesButton} onClick={() => setFilesOpen(true)}>
          {n.files} · {Object.keys(w.files).length}
        </button>
        <span role="status" aria-live="polite">
          {!w.ready
            ? n.loading
            : w.busy
              ? n.running
              : w.saving
                ? n.saving
                : w.sessionOnly
                  ? n.sessionOnly
                  : n.saved}
        </span>
        {w.active && (
          <>
            <a href={"#/learn/" + w.active.id.split(":")[0]}>{n.command}</a>
            <button onClick={w.cancel}>{n.cancel}</button>
          </>
        )}
      </div>
      {w.notice && (
        <p className="notebook-notice" role="status">
          {w.notice}
        </p>
      )}
      <div className="notebook-layout">
        <aside className="notebook-sidebar">
          <ChapterLinks page={page} />
        </aside>
        <div className="notebook-content">
          {page ? <NotebookPage page={page} /> : <NotebookHome />}
        </div>
      </div>
      <dialog
        className="notebook-menu"
        ref={menu}
        aria-label={n.chapters}
        onClose={() => menuButton.current?.focus()}
      >
        <header>
          <h2>{n.chapters}</h2>
          <button onClick={() => menu.current?.close()}>{n.close}</button>
        </header>
        <ChapterLinks page={page} onNavigate={() => menu.current?.close()} />
      </dialog>
      <FileManager
        open={filesOpen}
        onClose={() => {
          setFilesOpen(false);
          filesButton.current?.focus();
        }}
      />
    </div>
  );
}
export function NotebookCourse({ page }: { page?: PageDefinition }) {
  return (
    <NotebookWorkspace>
      <NotebookShell page={page} />
    </NotebookWorkspace>
  );
}
