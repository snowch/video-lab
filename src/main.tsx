// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { browserStorage } from "@platform/lesson-runtime";
import { ui } from "./content/ui.strings";
import { home, modules } from "./content/home.strings";
import { asset } from "./media/model";
import "./style.css";
import { OfflineAccess } from "./offline/OfflineAccess";
import { ProjectProvider } from "./journey/project";
import { CommandLab } from "./cli/Workspace";
import { routeFor } from "./journey/routes";
import { j } from "./journey/strings";
import { referenceLessons } from "./cli/reference.strings";
import { ReleaseStatus } from "./release/ReleaseStatus";
const storage = browserStorage();
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
  const step = resolved.step;
  const pageTitle = step
    ? resolved.reference && (step === "inspect" || step === "edit")
      ? referenceLessons[step].title
      : j[step].title
    : home.subtitle;
  useEffect(() => {
    if (resolved.canonical) {
      history.replaceState(null, "", resolved.canonical);
      setRoute(resolved.canonical);
      return;
    }
    document.title = `${pageTitle} · ${home.title}`;
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
        {step ? (
          <div className="wrap journey-wrap">
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
                  ? j[step].title
                  : step === "inspect"
                    ? j.inspect.referenceTitle
                    : j.edit.referenceTitle}
              </a>
            )}
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
