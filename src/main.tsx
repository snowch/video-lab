// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LessonView,
  browserStorage,
  DEFAULT_STRINGS,
  type Book,
} from "@platform/lesson-runtime";
import { lesson } from "./content/lesson";
import { lesson2 } from "./module2/lesson";
import { prose as prose2 } from "./module2/prose";
import { m2 } from "./module2/strings";
import {
  CutSource,
  CutPrediction,
  CutExplorer,
  JoinExplorer,
  ClockExperiment,
  EditReflection,
} from "./module2/components";
import { prose } from "./content/module0.prose";
import { ui } from "./content/ui.strings";
import { home, modules } from "./content/home.strings";
import {
  Explorer,
  Streams,
  Prediction,
  Failure,
  Editor,
  Reflection,
} from "./components";
import { grade } from "./grade";
import { asset, frames } from "./media/model";
import "./style.css";
import { OfflineAccess } from "./offline/OfflineAccess";
import { ProjectProvider } from "./journey/project";
import {
  CapturePage,
  BuildPage,
  InspectPage,
  EditPage,
  PublishPage,
} from "./journey/pages";
import { routeFor } from "./journey/routes";
import { j } from "./journey/strings";
import { ReleaseStatus } from "./release/ReleaseStatus";
const storage = browserStorage();
const book: Book = {
  id: "video-lab",
  title: home.title,
  lessons: [lesson, lesson2],
  interactives: {
    explorer: Explorer,
    streams: Streams,
    prediction: Prediction,
    failure: Failure,
    reflection: Reflection,
    "cut-source": CutSource,
    "cut-prediction": CutPrediction,
    "cut-explorer": CutExplorer,
    "join-explorer": JoinExplorer,
    "edit-clock": ClockExperiment,
    "edit-reflection": EditReflection,
  },
  ChallengeEditor: Editor,
  grade,
  timeModelNotes: {
    recorded: prose.modelNote,
    "recorded-cuts": prose2.modelNote,
    "edit-clock": prose2.clockNote,
  },
};
const strings = {
  ...DEFAULT_STRINGS,
  lesson: {
    ...DEFAULT_STRINGS.lesson,
    timeModel: {
      recorded: ui.modelHeading,
      "recorded-cuts": m2.recordedLabel,
      "edit-clock": m2.clockLabel,
    },
    modelNote: ui.modelHeading,
    modelVsReality: ui.limitsHeading,
    modelVsRealityNoSimulator: ui.limitsHeading,
  },
};
function Home() {
  return (
    <div className="wrap">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{home.eyebrow}</span>
          <h1>{home.subtitle}</h1>
          <p>{home.intro}</p>
          <a className="button primary" href="#/capture">
            {home.start}
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <figure className="hero-media">
          <img
            src={asset(frames[72]!.image)}
            alt={ui.heroAlt}
            width="960"
            height="540"
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
          {modules.map((m) => (
            <li key={m.id}>
              <span className="module-number">
                {String(m.id).padStart(2, "0")}
              </span>
              <div>
                <small>{m.available ? ui.available : ui.planned}</small>
                <h3>{m.title}</h3>
                <p>{m.summary}</p>
              </div>
              {m.available && (
                <a className="button" href={`#/${m.route}`}>
                  {ui.open} →
                </a>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
function App() {
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
  const activeLesson = resolved.reference
    ? resolved.step === "inspect"
      ? lesson
      : lesson2
    : undefined;
  const step = resolved.step;
  const inLesson = !!activeLesson;
  const pageTitle = step ? j[step].title : home.subtitle;
  useEffect(() => {
    if (resolved.canonical) {
      history.replaceState(null, "", resolved.canonical);
      setRoute(resolved.canonical);
      return;
    }
    document.title = `${activeLesson?.title ?? pageTitle} · ${home.title}`;
    if (resolved.section) {
      requestAnimationFrame(() =>
        document
          .getElementById(`section-${resolved.section}`)
          ?.scrollIntoView(),
      );
    } else {
      window.scrollTo(0, 0);
      if (!initial.current) main.current?.focus();
    }
    initial.current = false;
  }, [route, inLesson, activeLesson, pageTitle]);
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
          <nav className="header-links" aria-label={ui.course}>
            <a href="#/">{ui.course}</a>
            <a href="https://github.com/snowch/video-lab">{ui.source}</a>
            <button
              aria-label={ui.theme}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? ui.light : ui.dark}
            </button>
          </nav>
        </div>
      </header>
      <OfflineAccess />
      {step && (
        <nav className="journey-nav" aria-label={home.planTitle}>
          {modules
            .filter((module) => module.available)
            .map((module) => (
              <a
                key={module.id}
                href={`#/${module.route}`}
                aria-current={module.route === step ? "step" : undefined}
              >
                {module.id} · {module.title}
              </a>
            ))}
        </nav>
      )}
      <main id="content" ref={main} tabIndex={-1}>
        {activeLesson ? (
          <div className="course-layout">
            <aside className="lesson-nav">
              <a href="#/">{ui.back}</a>
              <span className="eyebrow">{ui.onPage}</span>
              <ol>
                {activeLesson.sections.map((s, i) => (
                  <li key={s.kind}>
                    <a href={`#/${step}/reference/${s.kind}`}>
                      {String(i + 1).padStart(2, "0")} {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
            <div>
              <p>
                {step === "inspect"
                  ? j.inspect.referenceNote
                  : j.edit.referenceNote}
              </p>
              <a className="button" href={`#/${step}`}>
                {step === "inspect" ? j.inspect.title : j.edit.title}
              </a>
              <LessonView
                key={activeLesson.id}
                book={book}
                lesson={activeLesson}
                lessonHref={(id) =>
                  id === lesson.id ? "#/inspect/reference" : "#/edit/reference"
                }
                storage={storage}
                strings={strings}
              />
            </div>
          </div>
        ) : step ? (
          <div className="wrap journey-wrap">
            <a href="#/">{ui.back}</a>
            {step === "capture" && <CapturePage />}
            {step === "build" && <BuildPage />}
            {step === "inspect" && (
              <>
                <InspectPage />
                <a className="reference-link button" href="#/inspect/reference">
                  {j.inspect.referenceTitle}
                </a>
              </>
            )}
            {step === "edit" && (
              <>
                <EditPage />
                <a className="reference-link button" href="#/edit/reference">
                  {j.edit.referenceTitle}
                </a>
              </>
            )}
            {step === "publish" && <PublishPage />}
          </div>
        ) : (
          <Home />
        )}
      </main>
      <footer className="site-footer">
        <span>{ui.copyright}</span>
        <ReleaseStatus />
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
