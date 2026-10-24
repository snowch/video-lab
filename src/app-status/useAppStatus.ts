// Copyright © 2026 Christopher Snow
import { useCallback, useEffect, useRef, useState } from "react";
import { workerMessage, installed, activateWaiting } from "../offline/client";
import { releaseMetadata, ownedCache, type Release } from "./model";
import { runningBuild } from "./identity";
import { participate } from "./participant";
import { safeToRestart, useRestartGuard } from "./safety";
export function useAppStatus() {
  const scope = new URL(import.meta.env.BASE_URL, location.href).href;
  const supported =
    "serviceWorker" in navigator && "caches" in window && isSecureContext;
  const [version, setVersion] = useState<
    "checking" | "latest" | "outdated" | "offlineCheck" | "failedCheck"
  >("checking");
  const [deployed, setDeployed] = useState<Release>();
  const [phase, setPhase] = useState<
    | "downloading"
    | "ready"
    | "restarting"
    | "prepareUnavailable"
    | "restartFailed"
    | "updatePaused"
    | null
  >(null);
  const [offline, setOffline] = useState<
    | "offlineIdle"
    | "offlineSaving"
    | "offlineReady"
    | "offlineIncomplete"
    | "offlineUnavailable"
  >(supported ? "offlineIdle" : "offlineUnavailable");
  const [size, setSize] = useState<number>();
  const [progress, setProgress] = useState<{ done: number; total: number }>();
  const [wantOffline, setWantOffline] = useState(false);
  const [ready, setReady] = useState(false),
    [saving, setSaving] = useState(false),
    [downloadFailed, setDownloadFailed] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const refreshGeneration = useRef(0);
  const [removing, setRemoving] = useState(false);
  const [pending, setPending] = useState(false),
    [interrupted, setInterrupted] = useState(false);
  const cancelled = useRef(false);
  const [cancelling, setCancelling] = useState(false);
  const registration = useRef<ServiceWorkerRegistration | null>(null),
    busy = useRef(false),
    activeWorker = useRef<ServiceWorker | null>(null);
  const restartRequested = useRef(false);
  useRestartGuard(() => !busy.current || restartRequested.current);
  const checkRef = useRef<() => void>(() => {}),
    refreshRef = useRef<() => Promise<void>>(async () => {});
  const mounted = useRef(true);
  const refresh = useCallback(async () => {
    if (!supported || busy.current) return;
    const request = ++refreshGeneration.current;
    try {
      const reg = await navigator.serviceWorker.getRegistration(scope);
      if (
        !mounted.current ||
        busy.current ||
        request !== refreshGeneration.current
      )
        return;
      registration.current = reg?.scope === scope ? reg : null;
      if (!reg?.active) {
        setReady(false);
        setOffline("offlineIdle");
        return;
      }
      const [lessons, tools] = await Promise.all([
        workerMessage(reg.active, "STATUS"),
        workerMessage(reg.active, "ENCODER_STATUS"),
      ]);
      if (
        !mounted.current ||
        busy.current ||
        request !== refreshGeneration.current
      )
        return;
      if (lessons.total !== undefined) setSize(lessons.total);
      setWantOffline(lessons.offlineWanted === true);
      const complete = lessons.ready && tools.ready;
      setReady(complete);
      setOffline(
        complete
          ? "offlineReady"
          : lessons.ready || tools.ready || (lessons.count ?? 0) > 0
            ? "offlineIncomplete"
            : "offlineIdle",
      );
      if (reg.waiting ?? reg.active) {
        const state = await workerMessage(
          (reg.waiting ?? reg.active)!,
          "DETAILS",
        );
        if (
          !mounted.current ||
          busy.current ||
          request !== refreshGeneration.current
        )
          return;
        if (state.prepared && state.build && state.build !== runningBuild) {
          setPending(true);
          setPhase((current) =>
            current === "restartFailed" ||
            current === "restarting" ||
            current === "downloading"
              ? current
              : "ready",
          );
        }
      }
    } catch {
      if (
        mounted.current &&
        !busy.current &&
        request === refreshGeneration.current
      ) {
        setReady(false);
        setOffline("offlineUnavailable");
      }
    }
  }, [scope, supported]);
  refreshRef.current = refresh;
  useEffect(() => {
    mounted.current = true;
    let disposed = false,
      controller: AbortController | undefined,
      generation = 0,
      last = 0,
      inflight = false;
    async function check(force = false) {
      if (!navigator.onLine) {
        controller?.abort();
        generation++;
        inflight = false;
        setVersion("offlineCheck");
        return;
      }
      if (inflight || (!force && Date.now() - last < 2000)) return;
      last = Date.now();
      inflight = true;
      const request = ++generation;
      controller?.abort();
      controller = new AbortController();
      const current = controller;
      setVersion("checking");
      const timer = setTimeout(() => current.abort(), 10000);
      try {
        const url = new URL("release.json", scope);
        url.searchParams.set("check", `${Date.now()}-${request}`);
        const response = await fetch(url, {
          cache: "no-store",
          signal: current.signal,
        });
        if (!response.ok) throw new Error("Release unavailable");
        const release = releaseMetadata(await response.json());
        if (!disposed && request === generation) {
          setDeployed(release);
          if (
            release.build === runningBuild ||
            !navigator.serviceWorker?.controller
          )
            setSize(release.bytes);
          setVersion(release.build === runningBuild ? "latest" : "outdated");
        }
      } catch {
        if (!disposed && request === generation)
          setVersion(navigator.onLine ? "failedCheck" : "offlineCheck");
      } finally {
        clearTimeout(timer);
        if (request === generation) inflight = false;
      }
    }
    checkRef.current = () => void check(true);
    const connection = () => {
      setOnline(navigator.onLine);
      void check(true);
    };
    const visible = () => {
      if (document.visibilityState === "visible") {
        void check();
        void refreshRef.current();
      }
    };
    const channel =
      typeof BroadcastChannel !== "undefined"
        ? new BroadcastChannel("video-lab:app-status:" + scope)
        : undefined;
    if (channel) channel.onmessage = () => void refreshRef.current();
    const stop = supported ? participate() : () => {};
    const interval = setInterval(() => {
      if (document.visibilityState === "visible" && navigator.onLine)
        void check();
    }, 60000);
    addEventListener("online", connection);
    addEventListener("offline", connection);
    addEventListener("focus", visible);
    document.addEventListener("visibilitychange", visible);
    void check();
    void refreshRef.current();
    return () => {
      disposed = true;
      mounted.current = false;
      generation++;
      controller?.abort();
      clearInterval(interval);
      stop();
      channel?.close();
      removeEventListener("online", connection);
      removeEventListener("offline", connection);
      removeEventListener("focus", visible);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [scope, supported]);
  function notify() {
    const c =
      typeof BroadcastChannel !== "undefined"
        ? new BroadcastChannel("video-lab:app-status:" + scope)
        : undefined;
    c?.postMessage("refresh");
    c?.close();
  }
  async function registered(update = false) {
    let reg = await navigator.serviceWorker.getRegistration(scope);
    if (!reg || reg.scope !== scope) {
      reg = await navigator.serviceWorker.register(
        new URL("sw.js", scope).href,
        { scope, updateViaCache: "none" },
      );
    } else if (update) await reg.update();
    if (reg.installing) await installed(reg.installing);
    registration.current = reg;
    return reg;
  }
  async function transfer(update: boolean) {
    if (busy.current || !online || !supported) return;
    busy.current = true;
    refreshGeneration.current++;
    cancelled.current = false;
    setCancelling(false);
    setInterrupted(false);
    setDownloadFailed(false);
    setProgress(undefined);
    if (update) setPhase("downloading");
    else {
      setSaving(true);
      setOffline("offlineSaving");
    }
    try {
      const reg = await registered(update);
      if (cancelled.current)
        throw new DOMException("Download cancelled", "AbortError");
      const worker = update
        ? (reg.waiting ?? reg.active)
        : (reg.active ?? reg.waiting);
      if (!worker) throw new Error("Worker unavailable");
      activeWorker.current = worker;
      const selected = update
        ? undefined
        : await workerMessage(worker, "STATUS");
      if (
        selected &&
        selected.build !== runningBuild &&
        (selected.build !== deployed?.build ||
          selected.version !== deployed?.version)
      )
        throw new Error("Deployment changed");
      if (cancelled.current)
        throw new DOMException("Download cancelled", "AbortError");
      const result = await workerMessage(
        worker,
        update
          ? {
              type: "PREPARE",
              full: ready || wantOffline,
              build: deployed?.build,
              version: deployed?.version,
            }
          : {
              type: "DOWNLOAD_ALL",
              build: selected?.build,
              version: selected?.version,
            },
        setProgress,
      );
      if (!result.ready) throw new Error("Incomplete preparation");
      if (update || (result.build && result.build !== runningBuild)) {
        if (
          !deployed ||
          result.build !== deployed.build ||
          result.version !== deployed.version
        )
          throw new Error("Deployment changed");
        setPending(true);
        setPhase("ready");
      }
    } catch {
      if (update)
        setPhase(cancelled.current ? "updatePaused" : "prepareUnavailable");
      else setDownloadFailed(!cancelled.current);
    } finally {
      activeWorker.current = null;
      busy.current = false;
      setSaving(false);
      setCancelling(false);
      await refresh();
      notify();
    }
  }
  async function cancel() {
    cancelled.current = true;
    setCancelling(true);
    setInterrupted(true);
    if (activeWorker.current)
      await workerMessage(activeWorker.current, "CANCEL").catch(() => {});
  }
  async function restart() {
    if (busy.current) return;
    if (!safeToRestart()) {
      setPhase("restartFailed");
      return;
    }
    restartRequested.current = true;
    busy.current = true;
    setPhase("restarting");
    try {
      const reg = await navigator.serviceWorker.getRegistration(scope);
      const worker = reg?.waiting ?? reg?.active;
      if (!worker) throw new Error("No prepared update");
      if (reg?.waiting)
        await activateWaiting(worker, navigator.serviceWorker, 12000);
      else if (!(await workerMessage(worker, "ACTIVATE")).ready)
        throw new Error("Restart blocked");
      // All participating windows reload only after the coordinated commit, not controllerchange alone.
    } catch {
      document.documentElement.inert = false;
      setPhase("restartFailed");
      restartRequested.current = false;
      busy.current = false;
    }
  }
  async function remove() {
    if (busy.current) return;
    busy.current = true;
    refreshGeneration.current++;
    setRemoving(true);
    setReady(false);
    try {
      const reg = await navigator.serviceWorker.getRegistration(scope);
      if (reg?.scope === scope) {
        if (reg.waiting) await workerMessage(reg.waiting, "CANCEL");
        if (reg.active) await workerMessage(reg.active, "CANCEL");
        // Keep the lightweight controlling registration: immediate re-registration
        // of a still-controlled, unregistered worker can return a dying registration.
        // Completeness depends on verified assets, never on registration itself.
      }
      await Promise.all(
        (await caches.keys())
          .filter((k) => ownedCache(k, scope))
          .map((k) => caches.delete(k)),
      );
      setReady(false);
      setPending(false);
      setWantOffline(false);
      setPhase(null);
      setOffline("offlineIdle");
      setDownloadFailed(false);
      notify();
    } catch {
      setOffline("offlineUnavailable");
    } finally {
      busy.current = false;
      setRemoving(false);
    }
  }
  return {
    version,
    deployed,
    phase,
    offline,
    size,
    progress,
    ready,
    saving,
    removing,
    cancelling,
    downloadFailed,
    online,
    supported,
    pending,
    interrupted,
    check: () => checkRef.current(),
    open: () => {
      checkRef.current();
      void refresh();
    },
    download: () => transfer(false),
    update: () => transfer(true),
    cancel,
    restart,
    remove,
  };
}
