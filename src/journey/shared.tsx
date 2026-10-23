// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  cancelProcessing,
  durationEvidence,
  type Probe,
} from "../processing/engine";
import { encoderManifestUrl } from "../processing/config";
import { workerMessage } from "../offline/client";
import { j } from "./strings";
import { useBlobURL, useProject, type MediaRecord } from "./project";
export const assetURL = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export function MediaView({
  record,
  title,
  download = j.common.download,
}: {
  record: MediaRecord;
  title: string;
  download?: string;
}) {
  const url = useBlobURL(record.blob);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [record.blob]);
  return (
    <section className="media-result" data-origin={record.origin}>
      <h3>{title}</h3>
      <p className="source-label">
        {record.origin === "capture"
          ? j.common.captured
          : record.origin === "provided"
            ? j.common.providedResult
            : record.origin === "imported"
              ? j.common.imported
              : j.common.generated}{" "}
        · {record.name} · {(record.blob.size / 1000).toFixed(1)} kB
      </p>
      {url && (
        <video
          src={url}
          controls
          playsInline
          preload="metadata"
          aria-label={title}
          onError={() => setFailed(true)}
        />
      )}
      {failed && <p role="alert">{j.common.playbackError}</p>}
      {url && (
        <a className="button" href={url} download={record.name}>
          {download}
        </a>
      )}
    </section>
  );
}
export function ProbeView({ probe }: { probe: Probe }) {
  const video = probe.streams.find((stream) => stream.codec_type === "video");
  const audio = probe.streams.filter((stream) => stream.codec_type === "audio");
  const duration = durationEvidence(probe);
  const rows = [
    [
      j.common.container,
      probe.format.format_name.includes("mp4")
        ? j.common.mp4Family
        : probe.format.format_name.includes("webm")
          ? j.common.webmFamily
          : probe.format.format_name,
    ],
    [
      duration?.basis === "container"
        ? j.inspect.declaredDuration
        : j.inspect.observedDuration,
      duration ? `${duration.seconds.toFixed(3)} s` : j.inspect.missingValue,
    ],
    [
      j.common.fileSize,
      probe.format.size
        ? `${Number(probe.format.size).toLocaleString()} B`
        : j.inspect.missingValue,
    ],
    [
      j.common.dimensions,
      video?.width && video.height
        ? `${video.width} × ${video.height}`
        : j.inspect.missingValue,
    ],
    [j.common.videoCodec, video?.codec_name ?? j.inspect.missingValue],
    [
      j.common.audioCodec,
      audio.length
        ? audio.map((stream) => stream.codec_name).join(", ")
        : j.common.audioAbsent,
    ],
  ];
  return (
    <div className="probe-result" data-probe-streams={probe.streams.length}>
      <dl className="metrics">
        {rows.map(([name, value]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p>{j.common.formatFamilyNote}</p>
      <p>{j.inspect.durationNote}</p>
      <details>
        <summary>{j.common.rawProbe}</summary>
        <pre>{JSON.stringify(probe, null, 2)}</pre>
      </details>
    </div>
  );
}
export function useTask() {
  const { setActive } = useProject();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<
    "busy" | "cancelled" | "processingFailed"
  >();
  const [logs, setLogs] = useState<string[]>([]);
  const generation = useRef(0);
  useEffect(() => {
    setActive(busy);
    return () => setActive(false);
  }, [busy, setActive]);
  useEffect(
    () => () => {
      generation.current++;
      cancelProcessing();
    },
    [],
  );
  async function run(
    action: (live: () => void, log: (line: string) => void) => Promise<void>,
  ) {
    if (busy) return;
    const operation = ++generation.current;
    const live = () => {
      if (operation !== generation.current) throw new Error("cancelled");
    };
    setBusy(true);
    setNotice("busy");
    setLogs([]);
    try {
      await action(live, (line) => {
        if (operation === generation.current)
          setLogs((current) => [...current.slice(-59), line]);
      });
      if (operation === generation.current) setNotice(undefined);
    } catch (error) {
      if (operation === generation.current) {
        setNotice("processingFailed");
        setLogs((current) => [
          ...current,
          error instanceof Error ? error.message : String(error),
        ]);
      }
    } finally {
      if (operation === generation.current) setBusy(false);
    }
  }
  function cancel() {
    generation.current++;
    cancelProcessing();
    setBusy(false);
    setNotice("cancelled");
  }
  return { busy, notice, logs, run, cancel };
}
export function TaskStatus({ task }: { task: ReturnType<typeof useTask> }) {
  return (
    <div aria-busy={task.busy}>
      {task.notice && (
        <p role={task.notice === "processingFailed" ? "alert" : "status"}>
          {j.common[task.notice]}
        </p>
      )}
      {task.busy && <button onClick={task.cancel}>{j.common.cancel}</button>}
      {!!task.logs.length && (
        <details>
          <summary>{j.common.evidence}</summary>
          <pre>{task.logs.join("\n")}</pre>
        </details>
      )}
    </div>
  );
}
export function ProjectStatus() {
  const project = useProject();
  return (
    <div className="project-status">
      <p>
        {project.persistent ? j.common.storageSaved : j.common.storageSession}
      </p>
      <button
        disabled={!project.ready || project.active}
        onClick={() => {
          if (confirm(j.common.clearConfirm)) void project.clear();
        }}
      >
        {j.common.clearProject}
      </button>
    </div>
  );
}
export function Step({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <article className="journey-page">
      <h1>{title}</h1>
      <p className="lesson-intro">{intro}</p>
      {children}
      <ProjectStatus />
    </article>
  );
}
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
