// Copyright © 2026 Christopher Snow
import { useEffect, useState } from "react";
import { releaseStrings as s } from "./strings";
declare const __BUILD_COMMIT__: string | null;
export const runningCommit = __BUILD_COMMIT__;
type Status =
  | "checking"
  | "latest"
  | "outdated"
  | "offline"
  | "unavailable"
  | "development";
export function ReleaseStatus() {
  const [status, setStatus] = useState<Status>(
    runningCommit ? "checking" : "development",
  );
  useEffect(() => {
    if (!runningCommit) return;
    let disposed = false;
    let controller: AbortController | undefined;
    let generation = 0;
    async function check() {
      const request = ++generation;
      controller?.abort();
      if (!navigator.onLine) {
        setStatus("offline");
        return;
      }
      setStatus("checking");
      const current = new AbortController();
      controller = current;
      const timeout = setTimeout(() => current.abort(), 10000);
      try {
        const url = new URL(
          `${import.meta.env.BASE_URL}release.json`,
          location.href,
        );
        url.searchParams.set("check", `${Date.now()}-${request}`);
        const response = await fetch(url, {
          cache: "no-store",
          signal: current.signal,
        });
        if (!response.ok) throw new Error("Release check failed");
        const data: unknown = await response.json();
        const commit =
          typeof data === "object" && data !== null && "commit" in data
            ? data.commit
            : null;
        if (typeof commit !== "string" || !/^[a-f0-9]{40}$/i.test(commit))
          throw new Error("Invalid release metadata");
        if (!disposed && request === generation)
          setStatus(
            commit.toLowerCase() === runningCommit ? "latest" : "outdated",
          );
      } catch {
        if (!disposed && request === generation)
          setStatus(navigator.onLine ? "unavailable" : "offline");
      } finally {
        clearTimeout(timeout);
      }
    }
    const visible = () => {
      if (document.visibilityState === "visible") void check();
    };
    const interval = setInterval(() => {
      if (document.visibilityState === "visible" && navigator.onLine)
        void check();
    }, 60000);
    void check();
    addEventListener("online", check);
    addEventListener("offline", check);
    addEventListener("focus", visible);
    document.addEventListener("visibilitychange", visible);
    return () => {
      disposed = true;
      generation++;
      controller?.abort();
      clearInterval(interval);
      removeEventListener("online", check);
      removeEventListener("offline", check);
      removeEventListener("focus", visible);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  return (
    <div className="release-status" data-release-state={status}>
      <span>
        {s.commit}{" "}
        {runningCommit ? (
          <a
            href={`https://github.com/snowch/video-lab/commit/${runningCommit}`}
            title={runningCommit}
          >
            <code>{runningCommit.slice(0, 7)}</code>
          </a>
        ) : (
          s.development
        )}
      </span>
      <span role="status" aria-live="polite">
        <span aria-hidden="true">
          {status === "latest"
            ? "✓ "
            : status === "outdated"
              ? "✕ "
              : status === "checking"
                ? "… "
                : "? "}
        </span>
        {s[status]}
      </span>
      {status === "outdated" && <span>{s.updateHint}</span>}
    </div>
  );
}
