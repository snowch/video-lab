// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { workerMessage, installed } from "./client";
import { offline } from "./strings";
import { InstallApp } from "../install/InstallApp";
export function OfflineAccess() {
  const supported =
    "serviceWorker" in navigator && "caches" in window && isSecureContext;
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [waiting, setWaiting] = useState(false);
  const [notice, setNotice] = useState<
    "downloading" | "checking" | "current" | "failed" | null
  >(null);
  const registration = useRef<ServiceWorkerRegistration | null>(null);
  const scope = new URL(import.meta.env.BASE_URL, location.href).href;
  async function refresh(reg = registration.current) {
    setWaiting(!!reg?.waiting);
    try {
      const complete = reg?.active
        ? (await workerMessage(reg.active, "STATUS")).ready
        : false;
      setReady(complete);
      return complete;
    } catch (error) {
      setReady(false);
      throw error;
    }
  }
  async function reportFailure() {
    // Do not promise a retained copy merely because it was complete before the operation.
    await refresh().catch(() => {});
    setNotice("failed");
  }
  function attach(reg: ServiceWorkerRegistration) {
    registration.current = reg;
    const observe = () => {
      const worker = reg.installing;
      if (!worker) return;
      void installed(worker)
        .then(async () => {
          await refresh(reg);
          if (reg.waiting) setNotice(null);
        })
        .catch(() => reportFailure());
    };
    reg.onupdatefound = observe;
    observe();
  }
  useEffect(() => {
    if (!supported) return;
    let disposed = false;
    let controlled = !!navigator.serviceWorker.controller;
    const control = () => {
      // A new release replaces the document and scripts together in every open tab.
      if (controlled) location.reload();
      controlled = true;
      void refresh().catch(() => setNotice("failed"));
    };
    const connection = () => {
      setOnline(navigator.onLine);
      setNotice((current) =>
        current === "downloading" || current === "checking" ? current : null,
      );
    };
    const focus = () => {
      void refresh().catch(() => setNotice("failed"));
    };
    navigator.serviceWorker.addEventListener("controllerchange", control);
    addEventListener("online", connection);
    addEventListener("offline", connection);
    addEventListener("focus", focus);
    void navigator.serviceWorker
      .getRegistration(scope)
      .then(async (reg) => {
        if (disposed || reg?.scope !== scope) return;
        attach(reg);
        await refresh(reg);
      })
      .catch(() => setNotice("failed"));
    return () => {
      disposed = true;
      if (registration.current) registration.current.onupdatefound = null;
      navigator.serviceWorker.removeEventListener("controllerchange", control);
      removeEventListener("online", connection);
      removeEventListener("offline", connection);
      removeEventListener("focus", focus);
    };
    // The deployment scope is constant for this mounted app.
  }, []);
  async function download() {
    setBusy(true);
    setNotice("downloading");
    try {
      let reg = registration.current;
      if (!reg || (!reg.active && !reg.installing && !reg.waiting)) {
        reg = await navigator.serviceWorker.register(`${scope}sw.js`, {
          scope,
          updateViaCache: "none",
        });
        attach(reg);
      }
      if (reg.installing) await installed(reg.installing);
      const worker = reg.active ?? reg.waiting;
      if (!worker || !(await workerMessage(worker, "DOWNLOAD")).ready)
        throw new Error("Download failed");
      await refresh(reg);
      setNotice(null);
    } catch {
      await reportFailure();
    } finally {
      setBusy(false);
    }
  }
  async function check() {
    setBusy(true);
    setNotice("checking");
    try {
      const reg = registration.current!;
      // update() may resolve with a recently checked worker even while disconnected.
      // This file is deliberately outside the offline manifest: prove network reachability.
      const response = await fetch(`${scope}sw.js`, {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("Update check failed");
      await reg.update();
      if (reg.installing) await installed(reg.installing);
      const complete = await refresh(reg);
      setNotice(reg.waiting || !complete ? null : "current");
    } catch {
      await reportFailure();
    } finally {
      setBusy(false);
    }
  }
  const status = !supported
    ? offline.unsupported
    : notice
      ? notice === "failed" && ready
        ? offline.updateFailed
        : offline[notice]
      : waiting
        ? offline.updateReady
        : ready
          ? online
            ? offline.ready
            : offline.offlineReady
          : online
            ? offline.idle
            : offline.offlineMissing;
  return (
    <section className="offline-panel" aria-label={offline.title}>
      <details>
        <summary>{offline.title}</summary>
        <p>{offline.description}</p>
        <p role="status" aria-live="polite" data-offline-ready={ready}>
          {status}
        </p>
        {waiting && notice && <p>{offline.updateReady}</p>}
        {supported && (
          <div className="offline-actions">
            {!ready && (
              <button disabled={busy} onClick={() => void download()}>
                {notice === "failed" ? offline.retry : offline.download}
              </button>
            )}
            {ready && (
              <button disabled={busy} onClick={() => void check()}>
                {offline.check}
              </button>
            )}
            {waiting && (
              <button
                disabled={busy}
                onClick={() =>
                  registration.current?.waiting?.postMessage("ACTIVATE")
                }
              >
                {offline.reload}
              </button>
            )}
          </div>
        )}
        <p className="muted">{offline.limits}</p>
        <InstallApp />
      </details>
    </section>
  );
}
