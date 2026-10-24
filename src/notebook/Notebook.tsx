// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { chapters, pages, pageHref, type PageDefinition } from "./structure";
import { courseCopy } from "./copy";
import { n } from "./ui.strings";
import { NotebookWorkspace, useNotebook, downloadBlob } from "./Workspace";
import { CommandCell } from "./Cell";
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
      <a className="notebook-earlier" href="#/earlier" onClick={onNavigate}>
        {n.earlier}
      </a>
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
      <section className="notebook-archive">
        <h2>{n.earlier}</h2>
        <p>{n.earlierNote}</p>
        <a href="#/earlier">{n.earlier} →</a>
      </section>
    </div>
  );
}
function NotebookPage({ page }: { page: PageDefinition }) {
  const w = useNotebook(),
    copy = courseCopy.pages[page.id]!,
    [reveal, setReveal] = useState(false),
    [hint, setHint] = useState(0),
    [solution, setSolution] = useState(false),
    [replay, setReplay] = useState(false),
    [error, setError] = useState("");
  const noteId = page.id + ":notes",
    notes = w.cells[noteId] ?? { id: noteId, command: "" };
  const index = pages.findIndex((p) => p.id === page.id);
  const chapterPages = pages.filter((p) => p.chapter === page.chapter);
  const required = page.assets.filter((name) => !w.files[name]);
  const source = w.files[page.assets[0]!];
  useEffect(() => {
    setReveal(false);
    setHint(0);
    setSolution(false);
    setReplay(false);
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
        <code>{page.assets[0]}</code>
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
        {replay && source && <FilePreview file={source} />}
        <Credits />
        {error && <p role="alert">{error}</p>}
      </section>
      <section className="notebook-concept">
        {copy.concept.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
      {copy.options.length > 0 && (
        <dl className="notebook-options">
          {copy.options.map((o, i) => (
            <div key={i}>
              <dt>
                <code>{o.flag}</code>
              </dt>
              <dd>{o.meaning}</dd>
            </div>
          ))}
        </dl>
      )}
      <section className="notebook-prediction">
        <h2>{n.predict}</h2>
        <p>{copy.prediction}</p>
        <label>
          {n.predictionLabel}
          <textarea
            rows={2}
            value={notes.prediction ?? ""}
            onChange={(e) => note({ prediction: e.target.value })}
          />
        </label>
        <button aria-expanded={reveal} onClick={() => setReveal((v) => !v)}>
          {n.reveal}
        </button>
        {reveal && <p>{copy.reveal}</p>}
      </section>
      {page.worked.map((command, i) => (
        <CommandCell
          key={page.id + ":worked:" + i}
          id={page.id + ":worked:" + i}
          initial={command}
          title={copy.workedLabels[i]!}
        />
      ))}
      <section className="notebook-change">
        <h2>{n.change}</h2>
        <p>{copy.change}</p>
      </section>
      <section className="notebook-practice">
        <h2>{n.practice}</h2>
        <p>{copy.practice}</p>
        <CommandCell
          key={page.id + ":practice"}
          id={page.id + ":practice"}
          initial={page.starter}
          title={n.practice}
          expected={page.expected}
          limit={copy.checkLimit}
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
          {copy.nativeExplanation?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <pre tabIndex={0}>{page.nativeScript}</pre>
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
      <section className="notebook-review">
        <h2>{n.review}</h2>
        <p>{copy.review}</p>
        <label>
          {n.reviewLabel}
          <textarea
            rows={3}
            value={notes.review ?? ""}
            onChange={(e) => note({ review: e.target.value })}
          />
        </label>
        <button onClick={exportPage}>{n.exportNotebook}</button>
        <p className="muted">{n.note}</p>
      </section>
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
