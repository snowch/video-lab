// Copyright © 2026 Christopher Snow
import { useRef } from "react";
import { useAppStatus } from "./useAppStatus";
import { appStatusStrings as s } from "./strings";
import { runningCommit, runningBuild } from "./identity";
import { InstallApp } from "../install/InstallApp";
import "./style.css";
export function AppStatus() {
  const app = useAppStatus(),
    details = useRef<HTMLDetailsElement>(null),
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
  return (
    <section
      className="app-status offline-panel"
      aria-label={s.title}
      data-running-build={runningBuild}
      data-pending-update={Boolean(available)}
    >
      <details
        ref={details}
        onToggle={(e) => {
          if (e.currentTarget.open) app.open();
        }}
      >
        <summary>
          <strong>{s.title}</strong>
          <span className="release-status" data-release-state={freshness}>
            <span>
              {s.running}{" "}
              <code title={runningBuild}>
                {runningCommit
                  ? `${runningCommit.slice(0, 7)}+${runningBuild.slice(0, 7)}`
                  : runningBuild.slice(0, 7)}
              </code>
              {!runningCommit && <> · {s.development}</>}
            </span>
            <span
              className={available ? "app-update-badge" : ""}
              role="status"
              aria-live="polite"
            >
              {app.pending ? s.ready : available ? s.outdated : s[app.version]}
            </span>
          </span>
        </summary>
        <div className="app-status-content">
          <section aria-labelledby="version-heading">
            <h2 id="version-heading">{s.version}</h2>
            <p>
              {s.running}{" "}
              {runningCommit ? (
                <a
                  href={`https://github.com/snowch/video-lab/commit/${runningCommit}`}
                  title={runningCommit}
                >
                  <code>{runningCommit.slice(0, 7)}</code>
                </a>
              ) : (
                <>
                  <code>{runningBuild.slice(0, 7)}</code> · {s.development}
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
                  <button
                    onClick={() => {
                      if (details.current) details.current.open = false;
                    }}
                  >
                    {s.later}
                  </button>
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
