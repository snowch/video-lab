// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { hasEarlierWork } from "./earlier-work";
import {
  chapters,
  pages,
  pageHref,
  type PageDefinition,
  type FormatSection,
} from "./structure";
import { courseCopy } from "./copy";
import { n } from "./ui.strings";
import { NotebookWorkspace, useNotebook, downloadBlob } from "./Workspace";
import { CommandCell } from "./Cell";
import { CodecGuide } from "./CodecGuide";
import { codecGuide } from "./codecs.strings";
import { FormatGuide } from "./FormatGuide";
import { pixelFormats } from "./pixel-formats.strings";
import { formatVisuals } from "./format-visuals.strings";
import { formatGuide } from "./formats.strings";
import { Glossary } from "./Glossary";
import { glossaryUI } from "./glossary.strings";
import { usePracticeFiles } from "./usePracticeFiles";
import { ExampleDiagram } from "./ExampleDiagram";
import { InlineText } from "./InlineText";
import { ConceptVisual } from "./visuals/ConceptVisual";
import { FileManager, FilePreview } from "./FileManager";
import { imageCopy } from "./images.strings";
import { svgWorkflow } from "./svg.strings";
import imageMedia from "./images-media.json";
import "./style.css";
const creditUrl =
  "https://github.com/snowch/video-lab/blob/main/docs/notes/notebook/media.json";
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
function NotebookHome({
  startRef,
}: {
  startRef: RefObject<HTMLAnchorElement | null>;
}) {
  return (
    <div className="notebook-home">
      <section className="notebook-welcome">
        <div>
          <span className="eyebrow">Video Lab</span>
          <h1>{courseCopy.title}</h1>
          <p>{courseCopy.intro}</p>
          <a
            ref={startRef}
            className="button primary"
            href={pageHref(pages[0]!)}
          >
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
          <a
            href={import.meta.env.BASE_URL + "media/notebook/bunny.mp4"}
            download="bunny.mp4"
          >
            {n.longPractice}
          </a>
        </figure>
      </section>
      <section aria-label={n.chapters}>
        <h2>{n.chapters}</h2>
        <ol className="notebook-chapter-cards">
          {chapters.map((c, i) => (
            <li key={c}>
              <span>{i + 1}</span>
              <div>
                <h3>{courseCopy.chapters[c].title}</h3>
                <p>{courseCopy.chapters[c].summary}</p>
                <ol className="notebook-page-links">
                  {pages
                    .filter((p) => p.chapter === c)
                    .map((p) => (
                      <li key={p.id}>
                        <a href={pageHref(p)}>
                          {courseCopy.pages[p.id]!.title}
                        </a>
                      </li>
                    ))}
                </ol>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <nav
        className="notebook-reference-card"
        aria-labelledby="reference-title"
      >
        <h2 id="reference-title">{n.referencesTitle}</h2>
        <p>{n.referencesIntro}</p>
        <ul className="notebook-page-links">
          <li>
            <a href="#/glossary">{glossaryUI.title}</a>
          </li>
          <li>
            <a href="#/appendix/codecs">{codecGuide.title}</a>
          </li>
          <li>
            <a href="#/appendix/formats">{formatGuide.title}</a>
          </li>
          <li>
            <a href="#/appendix/formats/video-containers">
              {formatVisuals.containerTitle}
            </a>
          </li>
          <li>
            <a href="#/appendix/formats/pixel-formats">{pixelFormats.title}</a>
          </li>
          <li>
            <a href="#/appendix/recording">{n.recordingGuide}</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
function NotebookPage({ page }: { page: PageDefinition }) {
  const w = useNotebook(),
    copy = courseCopy.pages[page.id]!,
    [hint, setHint] = useState(0),
    [solution, setSolution] = useState(false),
    [replay, setReplay] = useState(page.id === pages[0]!.id),
    [sourceName, setSourceName] = useState(page.assets[0]!);
  const preparation = usePracticeFiles(page.assets);
  const noteId = page.id + ":notes",
    notes = w.cells[noteId] ?? { id: noteId, command: "" };
  const index = pages.findIndex((p) => p.id === page.id);
  const chapterPages = pages.filter((p) => p.chapter === page.chapter);
  const source = w.files[sourceName];
  useEffect(() => {
    setHint(0);
    setSolution(false);
    setReplay(page.id === pages[0]!.id);
    setSourceName(page.assets[0]!);
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
        <p className="notebook-goal">
          <InlineText>{copy.goal}</InlineText>
        </p>
      </header>
      <section
        className="notebook-source"
        data-practice-ready={preparation.ready}
      >
        <strong>{n.source}</strong>
        <code>{sourceName}</code>
        {copy.sourceNote && (
          <p>
            <InlineText>{copy.sourceNote}</InlineText>
          </p>
        )}
        {!preparation.ready ? (
          preparation.loading ? (
            <p role="status">
              {preparation.waiting ? n.sourceWaiting : n.sourceLoading}
            </p>
          ) : (
            <div>
              <p role="alert">{preparation.error || n.sourceMissing}</p>
              <button disabled={!w.ready || w.busy} onClick={preparation.retry}>
                {n.sourceRetry}
              </button>
            </div>
          )
        ) : (
          <button onClick={() => setReplay((v) => !v)} aria-expanded={replay}>
            {/\.(png|jpg)$/i.test(sourceName)
              ? imageCopy.viewSource
              : n.replaySource}
          </button>
        )}
        {replay && source && (
          <div className="notebook-source-preview">
            {page.assets.filter((name) => /\.(mp4|png|jpg)$/i.test(name))
              .length > 1 && (
              <div
                className="notebook-source-choices"
                role="group"
                aria-label={n.source}
              >
                {page.assets
                  .filter(
                    (name) => /\.(mp4|png|jpg)$/i.test(name) && w.files[name],
                  )
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
      </section>
      {page.id === "image-video/hold" && (
        <p className="notebook-credit">
          {imageCopy.photoCredit}{" "}
          <a href={imageMedia.photograph.source}>
            {imageCopy.photoSourceLabel}
          </a>{" "}
          ·{" "}
          <a href={imageMedia.photograph.licenceUrl}>
            {imageCopy.photoLicenceLabel}
          </a>
          . {imageCopy.shareAlikeWarning}
        </p>
      )}
      <section className="notebook-concept">
        {copy.concept.map((p, i) => (
          <p key={i}>
            <InlineText>{p}</InlineText>
          </p>
        ))}
      </section>
      <ConceptVisual pageId={page.id} />
      {page.worked.map((command, i) => (
        <CommandCell
          key={page.id + ":worked:" + i}
          id={page.id + ":worked:" + i}
          initial={command}
          preparing={!preparation.ready && preparation.loading}
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
          preparing={!preparation.ready && preparation.loading}
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
                <li key={i}>
                  <InlineText>{h}</InlineText>
                </li>
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
      {page.id === "image-video/overlay" && (
        <section className="notebook-svg-workflow" aria-labelledby="svg-title">
          <h2 id="svg-title">{svgWorkflow.title}</h2>
          <p>
            <InlineText>{svgWorkflow.intro}</InlineText>
          </p>
          <ol>
            {svgWorkflow.steps.map((step, i) => (
              <li key={i}>
                <InlineText>{step}</InlineText>
              </li>
            ))}
          </ol>
          <p>
            <InlineText>{svgWorkflow.after}</InlineText>
          </p>
        </section>
      )}
      {page.nativeScript && (
        <section className="notebook-native">
          <h2>{n.native}</h2>
          <p>{n.nativeNote}</p>
          <pre tabIndex={0}>{page.nativeScript}</pre>
          {copy.nativeExplanation?.map((p, i) => (
            <p key={i}>
              <InlineText>{p}</InlineText>
            </p>
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
      {(page.chapter === "image-video" ||
        page.id === "inside-video/inspect" ||
        page.id === "export/format") && (
        <p>
          <a href="#/appendix/formats">{imageCopy.formatsAppendixLabel}</a>
        </p>
      )}
      {copy.codecGuide && (
        <p>
          <a href="#/appendix/codecs">{codecGuide.link}</a>
        </p>
      )}
      {copy.furtherReading && (
        <nav aria-labelledby="further-reading-title">
          <h2 id="further-reading-title">{copy.furtherReading.title}</h2>
          <ul className="notebook-page-links">
            {copy.furtherReading.pages.map((id) => {
              const target = pages.find((p) => p.id === id)!;
              return (
                <li key={id}>
                  <a href={pageHref(target)}>
                    {n.chapter} {chapters.indexOf(target.chapter) + 1}:{" "}
                    {courseCopy.pages[id]!.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
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
      {page.assets.some((name) => name.startsWith("bunny")) && <Credits />}
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
function NotebookShell({
  page,
  glossary = false,
  codecs = false,
  formats = false,
  formatSection,
}: {
  page?: PageDefinition;
  glossary?: boolean;
  codecs?: boolean;
  formats?: boolean;
  formatSection?: FormatSection;
}) {
  const w = useNotebook(),
    [filesOpen, setFilesOpen] = useState(false),
    [earlierWork, setEarlierWork] = useState(false),
    [headerTarget, setHeaderTarget] = useState<HTMLElement | null>(null),
    filesButton = useRef<HTMLButtonElement>(null),
    startLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    setHeaderTarget(document.getElementById("notebook-header-tools"));
  }, []);
  useEffect(() => {
    if (!filesOpen) return;
    let live = true;
    void hasEarlierWork().then((found) => {
      if (live) setEarlierWork(found);
    });
    return () => {
      live = false;
    };
  }, [filesOpen]);
  const filesControl = (
    <button
      ref={filesButton}
      aria-haspopup="dialog"
      aria-expanded={filesOpen}
      onClick={() => setFilesOpen(true)}
    >
      {n.files}
    </button>
  );
  const quiet =
    !w.active &&
    !w.sessionOnly &&
    (!w.ready || ((!w.busy || w.preparingPractice) && !w.saving));
  return (
    <div
      className={`notebook-shell${page || glossary || codecs || formats ? " notebook-lesson" : ""}${formats ? " notebook-formats" : ""}`}
      data-notebook-ready={w.ready}
    >
      {headerTarget && createPortal(filesControl, headerTarget)}
      {(page || glossary || codecs || formats) && (
        <nav className="notebook-toolbar" aria-label={n.overview}>
          <a href="#/">{n.overview}</a>
        </nav>
      )}
      <div className={`notebook-workspace-status${quiet ? " sr-only" : ""}`}>
        <span role="status" aria-live="polite">
          {!w.ready
            ? n.loading
            : w.busy && !w.preparingPractice
              ? n.running
              : w.saving
                ? n.saving
                : ""}
        </span>
        {w.sessionOnly && <p role="status">{n.sessionOnly}</p>}
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
      <div className="notebook-content">
        {page ? (
          <NotebookPage key={page.id} page={page} />
        ) : codecs ? (
          <CodecGuide />
        ) : formats ? (
          <FormatGuide section={formatSection} />
        ) : glossary ? (
          <Glossary />
        ) : (
          <NotebookHome startRef={startLink} />
        )}
      </div>
      <FileManager
        hasEarlierWork={earlierWork}
        open={filesOpen}
        onClose={() => {
          setFilesOpen(false);
          (filesButton.current ?? startLink.current)?.focus();
        }}
      />
    </div>
  );
}
export function NotebookCourse({
  page,
  glossary,
  codecs,
  formats,
  formatSection,
}: {
  page?: PageDefinition;
  glossary?: boolean;
  codecs?: boolean;
  formats?: boolean;
  formatSection?: FormatSection;
}) {
  return (
    <NotebookWorkspace>
      <NotebookShell
        page={page}
        glossary={glossary}
        codecs={codecs}
        formats={formats}
        formatSection={formatSection}
      />
    </NotebookWorkspace>
  );
}
