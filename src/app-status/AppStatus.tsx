// Copyright © 2026 Christopher Snow
import { useEffect, useRef } from "react";
import { useAppStatus } from "./useAppStatus";
import { appStatusStrings as s } from "./strings";
import { runningCommit, runningBuild } from "./identity";
import { InstallApp } from "../install/InstallApp";
import "./style.css";
export function AppStatus() {
  const app = useAppStatus(),
    root = useRef<HTMLElement>(null),
    details = useRef<HTMLDetailsElement>(null),
    content = useRef<HTMLDivElement>(null),
    confirm = useRef<HTMLDialogElement>(null),
    remove = useRef<HTMLButtonElement>(null);
  const freshness =
    app.version === "offlineCheck"
      ? "offline"
      : app.version === "failedCheck"
        ? "unavailable"
        : app.version;
  const status = app.phase ?? app.version;
  const available =
    app.pending || (app.deployed && app.deployed.build !== runningBuild);
  const transferring = app.saving || app.phase === "downloading";
  const locked = transferring || app.removing;
  const versionLabel =
    app.cancelling && app.phase === "downloading"
      ? s.cancelling
      : app.phase
        ? app.phase === "prepareUnavailable" ||
          app.phase === "restartFailed" ||
          app.phase === "updatePaused"
          ? s.phaseSummary[app.phase]
          : s[app.phase]
        : app.pending
          ? s.ready
          : available
            ? s.outdated
            : s[app.version];
  function close() {
    if (details.current) details.current.open = false;
    details.current?.querySelector("summary")?.focus();
  }
  function placePanel() {
    if (!details.current?.open || !content.current) return;
    const viewport = window.visualViewport;
    const height = viewport?.height ?? innerHeight;
    const offset = viewport?.offsetTop ?? 0;
    const headerBottom =
      root.current?.closest("header")?.getBoundingClientRect().bottom ?? 0;
    // Leave useful panel space even when enlarged header text fills a short screen.
    const top = Math.max(
      offset + 8,
      Math.min(
        headerBottom + 8,
        offset + height - Math.min(320, height * 0.65),
      ),
    );
    content.current.style.top = `${top}px`;
    content.current.style.maxHeight = `${Math.max(0, offset + height - top - 8)}px`;
  }
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (
        details.current?.open &&
        event.target instanceof Node &&
        !root.current?.contains(event.target)
      ) {
        details.current.open = false;
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        details.current?.open &&
        !confirm.current?.open
      ) {
        event.preventDefault();
        close();
      }
    };
    const navigate = () => {
      if (details.current) details.current.open = false;
    };
    window.addEventListener("hashchange", navigate);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    const header = root.current?.closest("header");
    const observer = new ResizeObserver(placePanel);
    if (header) observer.observe(header);
    window.addEventListener("resize", placePanel);
    window.addEventListener("scroll", placePanel);
    window.visualViewport?.addEventListener("resize", placePanel);
    window.visualViewport?.addEventListener("scroll", placePanel);
    return () => {
      window.removeEventListener("hashchange", navigate);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      observer.disconnect();
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", placePanel);
      window.visualViewport?.removeEventListener("resize", placePanel);
      window.visualViewport?.removeEventListener("scroll", placePanel);
    };
  }, []);
  return (
    <section
      ref={root}
      className="app-status offline-panel"
      aria-label={s.title}
      data-running-build={runningBuild}
      data-pending-update={Boolean(available)}
    >
      <details
        ref={details}
        onToggle={(e) => {
          if (e.currentTarget.open) {
            placePanel();
            app.open();
          }
        }}
      >
        <summary>
          <span className="app-status-label">
            {s.title} <span aria-hidden="true">▾</span>
          </span>
          <span className="release-status" data-release-state={freshness}>
            <span
              className={`app-status-badge${available ? " app-update-badge" : ""}`}
              role="status"
              aria-live="polite"
            >
              {versionLabel}
            </span>
          </span>
          <span
            className="app-status-badge"
            data-offline-state={app.offline}
            role="status"
            aria-live="polite"
          >
            {app.removing ? s.removing : s.offlineSummary[app.offline]}
          </span>
        </summary>
        <div className="app-status-content" ref={content}>
          <div className="app-status-dismiss">
            <button onClick={close}>{s.close}</button>
          </div>
          <section aria-labelledby="version-heading">
            <h2 id="version-heading">{s.version}</h2>
            <p>
              {s.running}{" "}
              {runningCommit ? (
                <a
                  href={`https://github.com/snowch/video-lab/commit/${runningCommit}`}
                  title={runningCommit}
                >
                  <code data-running-identity title={runningBuild}>
                    {runningCommit.slice(0, 7)}+{runningBuild.slice(0, 7)}
                  </code>
                </a>
              ) : (
                <>
                  <code data-running-identity title={runningBuild}>
                    {runningBuild.slice(0, 7)}
                  </code>{" "}
                  · {s.development}
                </>
              )}
            </p>
            <p role="status" aria-live="polite" data-version-state={status}>
              {s[status]}
            </p>
            {app.version === "offlineCheck" && (
              <p>{s.offlineCheckExplanation}</p>
            )}
            {app.version === "failedCheck" && <p>{s.failedCheckExplanation}</p>}
            {(app.pending || app.phase === "restartFailed") && (
              <p>{s.restartExplanation}</p>
            )}
            <div className="app-status-actions">
              <button
                disabled={locked || app.phase === "restarting" || !app.online}
                onClick={app.check}
              >
                {app.version === "failedCheck" ? s.retry : s.check}
              </button>
              {available && !app.pending && (
                <button
                  disabled={locked || !app.online || !app.supported}
                  onClick={() => void app.update()}
                >
                  {app.phase === "prepareUnavailable" ? s.retry : s.update}
                </button>
              )}
              {app.pending && (
                <>
                  <button
                    disabled={locked || app.phase === "restarting"}
                    onClick={() => void app.restart()}
                  >
                    {s.restart}
                  </button>
                  <button onClick={close}>{s.later}</button>
                </>
              )}
            </div>
          </section>
          {transferring && (
            <div className="app-download-progress" aria-live="polite">
              <label htmlFor="app-download-progress">
                {app.cancelling ? s.cancelling : s.progressLabel}
                {app.progress
                  ? ` · ${app.progress.done.toLocaleString()} / ${app.progress.total.toLocaleString()} B`
                  : ""}
              </label>
              <progress
                id="app-download-progress"
                max={app.progress?.total ?? 1}
                value={app.progress?.done}
              />
              <button
                disabled={app.cancelling}
                onClick={() => void app.cancel()}
              >
                {s.cancel}
              </button>
            </div>
          )}
          <section aria-labelledby="offline-heading">
            <h2 id="offline-heading">{s.offline}</h2>
            <p>{s.description}</p>
            {app.size !== undefined && (
              <p className="app-download-size">
                {(app.size / 1_000_000).toFixed(2)} MB ·{" "}
                {app.size.toLocaleString()} B
              </p>
            )}
            <p role="status" aria-live="polite" data-offline-ready={app.ready}>
              {app.removing ? s.removing : s[app.offline]}
            </p>
            {app.downloadFailed && (
              <p role="status">
                {s.downloadFailed}
                {app.ready && <> {s.retained}</>}
              </p>
            )}
            {app.interrupted && !transferring && !app.ready && (
              <p>{s.paused}</p>
            )}
            {!app.supported && <p>{s.unsupported}</p>}
            {app.size === undefined &&
              (app.version === "failedCheck" ||
                app.version === "offlineCheck") && <p>{s.sizeUnknown}</p>}
            {!app.online && !app.ready && <p>{s.offlineCannotDownload}</p>}
            {app.supported && (
              <div className="app-status-actions">
                {!app.ready && (
                  <button
                    disabled={
                      locked ||
                      app.phase === "restarting" ||
                      !app.online ||
                      app.size === undefined
                    }
                    onClick={() => void app.download()}
                  >
                    {app.downloadFailed
                      ? s.repair
                      : app.interrupted || app.offline === "offlineIncomplete"
                        ? s.resume
                        : s.download}
                  </button>
                )}
                <button
                  ref={remove}
                  disabled={locked || app.phase === "restarting"}
                  onClick={() => confirm.current?.showModal()}
                >
                  {s.remove}
                </button>
              </div>
            )}
            <p className="muted">{s.limits}</p>
          </section>
          <InstallApp />
        </div>
      </details>
      <dialog
        ref={confirm}
        aria-labelledby="remove-offline-heading"
        onClose={() => remove.current?.focus()}
      >
        <h2 id="remove-offline-heading">{s.removeTitle}</h2>
        <p>{s.removeExplanation}</p>
        <div className="app-status-actions">
          <button
            onClick={() => {
              void app.remove();
              confirm.current?.close();
            }}
          >
            {s.confirmRemove}
          </button>
          <button autoFocus onClick={() => confirm.current?.close()}>
            {s.keep}
          </button>
        </div>
      </dialog>
    </section>
  );
}
