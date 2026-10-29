// Copyright © 2026 Christopher Snow
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { browserStorage } from "@platform/lesson-runtime";
import { ui } from "./content/ui.strings";
import { home, modules } from "./content/home.strings";
import { asset } from "./media/model";
import "./style.css";
import { AppStatus } from "./app-status/AppStatus";
import { useRestartGuard } from "./app-status/safety";
import { hasPendingFileDraft } from "./notebook/FileManager";
import { j } from "./journey/strings";
import { ProjectProvider } from "./journey/project";
import { CommandLab } from "./cli/Workspace";
import { progressiveUI as flow } from "./cli/progressive.strings";
import { routeFor } from "./journey/routes";
import { chapterOrder, chapterNumber } from "./course/structure";
import { chapterTitles, courseUI } from "./course/strings";
import { referenceLessons } from "./cli/reference.strings";
import { RecordingGuide } from "./capture/RecordingGuide";
import { recordingGuide } from "./capture/guide.strings";
import { NotebookCourse } from "./notebook/Notebook";
import { resolutionGuide } from "./notebook/resolution.strings";
import { notebookRoute } from "./notebook/structure";
import { courseCopy } from "./notebook/copy";
import { n as notebookUI } from "./notebook/ui.strings";
import { codecGuide } from "./notebook/codecs.strings";
import { pixelFormats } from "./notebook/pixel-formats.strings";
import { formatVisuals } from "./notebook/format-visuals.strings";
import { formatGuide } from "./notebook/formats.strings";
import { glossaryUI } from "./notebook/glossary.strings";
const storage = browserStorage();
function Home() {
  return (
    <div className="wrap">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{home.eyebrow}</span>
          <h2>{home.subtitle}</h2>
          <p>{home.intro}</p>
          <a className="button primary" href="#/capture">
            {home.start}
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <figure className="hero-media">
          <img
            src={asset("media/mousepad-frames/frame000.jpg")}
            alt={ui.heroAlt}
            width="1280"
            height="720"
            style={{ height: "auto" }}
          />
          <div className="mini-timeline" aria-hidden="true" />
          <figcaption>{ui.heroCaption}</figcaption>
        </figure>
      </section>
      <section className="intro-grid">
        <div>
          <h2>{home.audienceTitle}</h2>
          <p>{home.audience}</p>
        </div>
        <div>
          <h2>{home.outcomeTitle}</h2>
          <p>{home.outcome}</p>
        </div>
      </section>
      <section className="course-plan">
        <div className="plan-heading">
          <h2>{home.planTitle}</h2>
          <p className="muted">{home.planNote}</p>
        </div>
        <ol className="module-list">
          {chapterOrder.map((step) => {
            const m = modules.find((module) => module.route === step)!;
            return (
              <li key={step}>
                <span className="module-number">{chapterNumber(step)}</span>
                <div>
                  <small>
                    {courseUI.chapter} {chapterNumber(step)}
                  </small>
                  <h3>{chapterTitles[step]}</h3>
                  <p>{m.summary}</p>
                </div>
                <a className="button" href={`#/${step}`}>
                  {ui.open} →
                </a>
              </li>
            );
          })}
        </ol>
      </section>
      <section className="course-references">
        <h2>{courseUI.references}</h2>
        <p>{courseUI.referenceNote}</p>
        {(["inspect", "edit"] as const).map((step) => (
          <div key={step}>
            <h3>
              <a href={`#/${step}/reference`}>{referenceLessons[step].title}</a>
            </h3>
            <p>{flow.referenceIntro[step]}</p>
          </div>
        ))}
      </section>
      <section className="planned-topics">
        <h2>{courseUI.planned}</h2>
        <ul className="future-topics">
          {modules
            .filter((module) => !module.available)
            .map((module) => (
              <li key={module.id}>
                <small>{ui.planned}</small>
                <h3>{module.title}</h3>
                <p>{module.summary}</p>
              </li>
            ))}
        </ul>
      </section>
      <section className="appendix-links">
        <h2>{recordingGuide.overviewTitle}</h2>
        <p>{recordingGuide.overviewNote}</p>
        <a href="#/appendix/recording">{recordingGuide.link}</a>
      </section>
    </div>
  );
}
function App() {
  useRestartGuard(() => !hasPendingFileDraft());
  useEffect(() => {
    const keepDraft = (event: BeforeUnloadEvent) => {
      if (hasPendingFileDraft()) event.preventDefault();
    };
    addEventListener("beforeunload", keepDraft);
    return () => removeEventListener("beforeunload", keepDraft);
  }, []);
  const [route, setRoute] = useState(location.hash),
    [theme, setTheme] = useState(
      () =>
        storage.get("video-lab:theme") ??
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
    );
  const main = useRef<HTMLElement>(null);
  const initial = useRef(true);
  useEffect(() => {
    const change = () => setRoute(location.hash);
    addEventListener("hashchange", change);
    return () => removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    storage.set("video-lab:theme", theme);
  }, [theme]);
  const resolved = routeFor(route);
  const step = resolved.step;
  const notebook: ReturnType<typeof notebookRoute> =
    notebookRoute(route) ??
    (!step && !resolved.appendix && !route.includes("/earlier")
      ? { home: true as const }
      : undefined);
  const pageTitle = notebook?.resolution
    ? resolutionGuide.title
    : notebook?.formats
      ? notebook.formatSection === "pixel-formats"
        ? pixelFormats.title
        : notebook.formatSection === "video-containers"
          ? formatVisuals.containerTitle
          : formatGuide.title
      : notebook?.codecs
        ? codecGuide.title
        : notebook?.glossary
          ? glossaryUI.title
          : notebook
            ? !notebook.home
              ? courseCopy.pages[notebook.page.id]!.title
              : courseCopy.title
            : resolved.appendix
              ? recordingGuide.title
              : step
                ? resolved.reference && (step === "inspect" || step === "edit")
                  ? referenceLessons[step].title
                  : chapterTitles[step]
                : home.subtitle;
  useLayoutEffect(() => {
    if (resolved.canonical) {
      history.replaceState(null, "", resolved.canonical);
      setRoute(resolved.canonical);
      return;
    }
    document.title = `${pageTitle} · ${home.title}`;
    // Finish route focus before paint so it cannot steal a learner's next focus.
    if (notebook?.codecs && notebook.codecSection) {
      const heading = document.getElementById(notebook.codecSection);
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView();
    } else if (notebook?.formats && notebook.formatSection) {
      const heading = document.getElementById(notebook.formatSection);
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView();
    } else if (!notebook && resolved.section) {
      document.getElementById(`section-${resolved.section}`)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
      if (!initial.current) main.current?.focus();
    }
    initial.current = false;
  }, [route, pageTitle]);
  return (
    <>
      <a
        className="skip-link"
        href="#content"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        {ui.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#/">
            <span className="brand-mark" aria-hidden="true">
              ▶
            </span>
            {ui.brand}
          </a>
          <AppStatus />
          <div className="header-links">
            {notebook && <span id="notebook-header-tools" />}
            <button
              aria-label={ui.theme}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? ui.light : ui.dark}
            </button>
          </div>
        </div>
      </header>
      {step && (
        <nav className="journey-nav" aria-label={home.planTitle}>
          <label className="chapter-picker">
            {courseUI.chapterNav}
            <select
              aria-label={courseUI.chapterNav}
              value={resolved.reference ? "" : step}
              onChange={(event) => {
                location.hash = `#/${event.target.value}`;
              }}
            >
              {resolved.reference && (
                <option value="" disabled>
                  {courseUI.references}
                </option>
              )}
              {chapterOrder.map((item) => (
                <option key={item} value={item}>
                  {chapterNumber(item)} · {chapterTitles[item]}
                </option>
              ))}
            </select>
          </label>
          <div className="chapter-links">
            {chapterOrder.map((item) => (
              <a
                key={item}
                href={`#/${item}`}
                aria-current={item === step ? "page" : undefined}
              >
                <span aria-hidden="true">{chapterNumber(item)}</span>{" "}
                {chapterTitles[item]}
              </a>
            ))}
          </div>
        </nav>
      )}
      <main id="content" ref={main} tabIndex={-1}>
        {notebook ? (
          <NotebookCourse
            page={notebook.home ? undefined : notebook.page}
            glossary={notebook.glossary}
            resolution={notebook.resolution}
            codecs={notebook.codecs}
            formats={notebook.formats}
            formatSection={notebook.home ? notebook.formatSection : undefined}
          />
        ) : resolved.appendix ? (
          <RecordingGuide />
        ) : step ? (
          <div className="wrap journey-wrap">
            <p className="notebook-legacy-label">
              {notebookUI.earlier} · <a href="#/">{notebookUI.overview}</a>
            </p>
            <a href="#/">{ui.back}</a>
            <CommandLab
              step={step}
              reference={
                resolved.reference && (step === "inspect" || step === "edit")
                  ? step
                  : undefined
              }
            />
            {(step === "inspect" || step === "edit") && (
              <a
                className="reference-link button"
                href={resolved.reference ? `#/${step}` : `#/${step}/reference`}
              >
                {resolved.reference
                  ? chapterTitles[step]
                  : step === "inspect"
                    ? j.inspect.referenceTitle
                    : j.edit.referenceTitle}
              </a>
            )}
          </div>
        ) : (
          <>
            <div className="wrap notebook-archive">
              <h1>{notebookUI.earlier}</h1>
              <p>{notebookUI.earlierNote}</p>
              <a href="#/">{notebookUI.overview} →</a>
            </div>
            <Home />
          </>
        )}
      </main>
      <footer className="site-footer">
        <span>{ui.copyright}</span>
        <a href="#/glossary">{glossaryUI.title}</a>
        <a href="https://github.com/snowch/video-lab/blob/main/docs/sources.md">
          {ui.source}
        </a>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <ProjectProvider>
    <App />
  </ProjectProvider>,
);
