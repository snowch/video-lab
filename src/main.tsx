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
          <a className="button primary" href="#/module-0">
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
                <small>
                  {book.lessons.some((l) => l.module === m.id)
                    ? ui.available
                    : ui.planned}
                </small>
                <h3>{m.title}</h3>
                <p>{m.summary}</p>
              </div>
              {book.lessons.some((l) => l.module === m.id) && (
                <a className="button" href={`#/module-${m.id}`}>
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
  const activeLesson = book.lessons.find(
    (l) =>
      l.module === Number(route.match(/^#\/module-(\d+)(?:\/|$)/)?.[1] ?? -1),
  );
  const inLesson = !!activeLesson;
  useEffect(() => {
    document.title = `${activeLesson ? activeLesson.title : home.subtitle} · ${home.title}`;
    const section = route.split("/")[2];
    if (section) {
      document.getElementById(`section-${section}`)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
      if (!initial.current) main.current?.focus();
    }
    initial.current = false;
  }, [route, inLesson, activeLesson]);
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
      <main id="content" ref={main} tabIndex={-1}>
        {activeLesson ? (
          <div className="course-layout">
            <aside className="lesson-nav">
              <a href="#/">{ui.back}</a>
              <span className="eyebrow">{ui.onPage}</span>
              <ol>
                {activeLesson.sections.map((s, i) => (
                  <li key={s.kind}>
                    <a href={`#/module-${activeLesson.module}/${s.kind}`}>
                      {String(i + 1).padStart(2, "0")} {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
            <div>
              <span className="eyebrow">
                {activeLesson.module === 0 ? ui.lessonNumber : m2.lessonNumber}
              </span>
              <LessonView
                key={activeLesson.id}
                book={book}
                lesson={activeLesson}
                lessonHref={(id) =>
                  `#/module-${book.lessons.find((l) => l.id === id)?.module ?? 0}`
                }
                storage={storage}
                strings={strings}
              />
            </div>
          </div>
        ) : (
          <Home />
        )}
      </main>
      <footer className="site-footer">
        <span>{ui.copyright}</span>
        <a href="https://github.com/snowch/video-lab/blob/main/docs/sources.md">
          {ui.source}
        </a>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
