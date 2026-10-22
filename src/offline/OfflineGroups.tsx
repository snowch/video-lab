// Copyright © 2026 Christopher Snow
import { useCallback, useEffect, useRef, useState } from "react";
import { workerGroupMessage, workerMessage, installed } from "./client";
import { offline } from "./strings";

const MB = 1024 * 1024;
const formatBytes = (bytes: number) =>
  bytes >= MB
    ? `${(bytes / MB).toFixed(0)} MB`
    : `${(bytes / 1024).toFixed(0)} KB`;

interface GroupState {
  readonly known: boolean;
  readonly ready: boolean;
  readonly bytes: number;
}

/**
 * Opt-in offline downloads for the expensive assets: the FFmpeg WebAssembly
 * encoder core (needed for offline encoding in the build/cut lessons) and
 * optional reference samples. The baseline offline copy never includes them.
 */
export function OfflineGroups() {
  const supported =
    "serviceWorker" in navigator && "caches" in window && isSecureContext;
  const [encoding, setEncoding] = useState<GroupState>({
    known: false,
    ready: false,
    bytes: 0,
  });
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const registration = useRef<ServiceWorkerRegistration | null>(null);
  const scope = new URL(import.meta.env.BASE_URL, location.href).href;

  const refresh = useCallback(async () => {
    if (!supported) return;
    try {
      let reg = registration.current;
      if (!reg)
        reg = (await navigator.serviceWorker.getRegistration(scope)) ?? null;
      registration.current = reg;
      const worker = reg?.active;
      if (!worker) {
        setEncoding({ known: false, ready: false, bytes: 0 });
        return;
      }
      const status = await workerGroupMessage(worker, "GROUP:encoding");
      setEncoding({
        known: status.known,
        ready: status.ready,
        bytes: status.bytes,
      });
    } catch {
      setEncoding({ known: false, ready: false, bytes: 0 });
    }
  }, [supported, scope]);

  useEffect(() => {
    void refresh();
    const focus = () => void refresh();
    addEventListener("focus", focus);
    return () => removeEventListener("focus", focus);
  }, [refresh]);

  const download = async () => {
    setBusy(true);
    setFailed(false);
    try {
      let reg = registration.current;
      if (!reg || (!reg.active && !reg.installing && !reg.waiting)) {
        reg = await navigator.serviceWorker.register(`${scope}sw.js`, {
          scope,
          updateViaCache: "none",
        });
        if (reg.installing) await installed(reg.installing);
      }
      registration.current = reg;
      const worker = reg.active ?? reg.waiting;
      if (!worker) throw new Error("No offline worker");
      await workerGroupMessage(worker, "DOWNLOAD_GROUP:encoding");
      // Reading lessons offline also needs the baseline copy.
      await workerMessage(worker, "DOWNLOAD");
      await refresh();
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  if (!supported || !encoding.known) return null;
  const status = encoding.ready
    ? offline.groupReady
    : failed
      ? offline.groupFailed
      : busy
        ? offline.groupDownloading
        : offline.groupIdle;
  return (
    <div className="offline-group">
      <p role="status" aria-live="polite">
        {status}
      </p>
      {!encoding.ready && (
        <div className="offline-actions">
          <button disabled={busy} onClick={() => void download()}>
            {failed ? offline.groupRetry : offline.groupDownload}
          </button>
        </div>
      )}
      <p className="muted">{offline.groupNote(formatBytes(encoding.bytes))}</p>
    </div>
  );
}
