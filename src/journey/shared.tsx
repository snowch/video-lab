// Copyright © 2026 Christopher Snow
import { useEffect, useState } from "react";
import { encoderManifestUrl } from "../processing/config";
import { workerMessage } from "../offline/client";
import { j } from "./strings";
export const assetURL = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export function EncoderOffline() {
  const [ready, setReady] = useState(false),
    [readingReady, setReadingReady] = useState(false);
  const [busy, setBusy] = useState(false),
    [failed, setFailed] = useState(false),
    [bytes, setBytes] = useState<number>();
  const scope = new URL(import.meta.env.BASE_URL, location.href).href;
  async function refresh() {
    const reg = await navigator.serviceWorker?.getRegistration(scope);
    if (!reg?.active) {
      setReady(false);
      setReadingReady(false);
      return;
    }
    setReadingReady((await workerMessage(reg.active, "STATUS")).ready);
    setReady((await workerMessage(reg.active, "ENCODER_STATUS")).ready);
  }
  useEffect(() => {
    void fetch(encoderManifestUrl)
      .then((response) => response.json())
      .then((manifest) => setBytes(manifest.bytes))
      .catch(() => {});
    if (!("serviceWorker" in navigator)) return;
    void refresh().catch(() => {});
    const refreshSafely = () => {
      void refresh().catch(() => {});
    };
    addEventListener("focus", refreshSafely);
    const status = document.querySelector("[data-offline-ready]");
    const observer = new MutationObserver(refreshSafely);
    if (status)
      observer.observe(status, {
        attributes: true,
        attributeFilter: ["data-offline-ready"],
      });
    return () => {
      removeEventListener("focus", refreshSafely);
      observer.disconnect();
    };
  }, []);
  async function save() {
    setBusy(true);
    setFailed(false);
    try {
      const reg = await navigator.serviceWorker.getRegistration(scope);
      if (
        !reg?.active ||
        !(await workerMessage(reg.active, "DOWNLOAD_ENCODER")).ready
      )
        throw new Error("Encoder not saved");
      await refresh();
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details
      className="encoder-offline"
      onToggle={() => {
        void refresh().catch(() => {});
      }}
    >
      <summary>{j.common.encoderTitle}</summary>
      <p>{j.common.encoderNote}</p>
      {bytes !== undefined && (
        <p>
          {(bytes / 1_000_000).toFixed(2)} MB · {bytes.toLocaleString()} B
        </p>
      )}
      <p role="status">
        {busy
          ? j.common.encoderSaving
          : failed
            ? j.common.encoderFailed
            : ready
              ? j.common.encoderReady
              : j.common.encoderMissing}
      </p>
      {!readingReady && <p>{j.common.encoderNeedLessons}</p>}
      <button
        disabled={busy || !readingReady || ready}
        onClick={() => void save()}
      >
        {j.common.encoderDownload}
      </button>
    </details>
  );
}
