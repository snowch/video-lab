// Copyright © 2026 Christopher Snow
import { useEffect, useRef, useState } from "react";
import { CaptureController, type CaptureState } from "../capture/controller";
import {
  inspectMedia,
  measuredDuration,
  runJob,
  type Probe,
} from "../processing/engine";
import {
  commandText,
  editCommand,
  fetchedInput,
  hasAudio,
  muxCommand,
  sourceFilename,
  videoCommand,
  type Range,
} from "./commands";
import { j } from "./strings";
import { useBlobURL, useProject, type MediaRecord } from "./project";
import {
  assetURL,
  EncoderOffline,
  MediaView,
  ProbeView,
  Step,
  TaskStatus,
  useTask,
} from "./shared";
export function CapturePage() {
  const project = useProject();
  const [state, setState] = useState<CaptureState>("idle"),
    [audio, setAudio] = useState(false),
    [failed, setFailed] = useState(false),
    [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    project.setActive(state !== "idle");
    return () => project.setActive(false);
  }, [state, project.setActive]);
  const controller = useRef<CaptureController | null>(null);
  const supported =
    typeof MediaRecorder !== "undefined" &&
    !!navigator.mediaDevices?.getDisplayMedia;
  useEffect(() => {
    const instance = new CaptureController({
      state: setState,
      error: () => setFailed(true),
      complete: (result) => {
        void project.save({
          id: "capture",
          blob: result.blob,
          name: result.mime.includes("mp4") ? "my-demo.mp4" : "my-demo.webm",
          origin: "capture",
          created: Date.now(),
          capture: {
            seconds: result.seconds,
            width: result.width,
            height: result.height,
            audio: result.audio,
          },
        });
      },
    });
    controller.current = instance;
    return () => {
      instance.destroy();
      controller.current = null;
    };
  }, []);
  useEffect(() => {
    if (state !== "recording") return;
    const start = Date.now();
    setElapsed(0);
    const interval = setInterval(
      () => setElapsed((Date.now() - start) / 1000),
      250,
    );
    return () => clearInterval(interval);
  }, [state]);
  async function fallback() {
    setFailed(false);
    try {
      const response = await fetch(assetURL("media/build-queue.mp4"));
      if (!response.ok) throw new Error("Source unavailable");
      await project.save({
        id: "capture",
        blob: await response.blob(),
        name: "build-queue.mp4",
        origin: "provided",
        created: Date.now(),
      });
    } catch {
      setFailed(true);
    }
  }
  return (
    <Step title={j.capture.title} intro={j.capture.intro}>
      <section>
        <h2>{j.capture.planTitle}</h2>
        <ol>
          {j.capture.plan.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ol>
        <p>{j.capture.prepare}</p>
        <a
          className="button"
          href={assetURL("demo.html")}
          target="_blank"
          rel="noreferrer"
        >
          {j.capture.openScene}
        </a>
        <p>{j.capture.sceneNote}</p>
      </section>
      <figure className="static-pipeline">
        <figcaption>{j.capture.diagramTitle}</figcaption>
        <ol>
          {[
            j.capture.diagramSurface,
            j.capture.diagramRecorder,
            j.capture.diagramFile,
          ].map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ol>
        <p>{j.capture.diagramNote}</p>
      </figure>
      <section className="workbench" aria-label={j.capture.title}>
        <label className="check-label">
          <input
            type="checkbox"
            checked={audio}
            disabled={state !== "idle"}
            onChange={(event) => setAudio(event.target.checked)}
          />
          {j.capture.audio}
        </label>
        <p>{j.capture.audioNote}</p>
        <p>{j.capture.limit}</p>
        <div className="actions">
          <button
            disabled={!supported || state !== "idle" || !project.ready}
            onClick={() => {
              setFailed(false);
              void controller.current?.start(audio);
            }}
          >
            {j.capture.start}
          </button>
          <button
            disabled={state !== "recording"}
            onClick={() => controller.current?.stop()}
          >
            {j.capture.stop}
          </button>
        </div>
        <p role="status">
          {supported ? j.capture[state] : j.capture.unsupported}
        </p>
        {state === "recording" && (
          <p>
            {j.capture.elapsed}: {elapsed.toFixed(1)} s
          </p>
        )}
        <p>{j.capture.elapsedNote}</p>
        {failed && <p role="alert">{j.capture.failed}</p>}
      </section>
      <section>
        <button
          disabled={state !== "idle" || !project.ready}
          onClick={() => void fallback()}
        >
          {j.capture.fallback}
        </button>
        <p>{j.capture.fallbackNote}</p>
      </section>
      {project.records.capture && (
        <>
          <MediaView
            record={project.records.capture}
            title={j.capture.replayTitle}
          />
          {project.records.capture.capture && (
            <dl className="metrics">
              <div>
                <dt>{j.capture.mime}</dt>
                <dd>{project.records.capture.blob.type}</dd>
              </div>
              <div>
                <dt>{j.common.dimensions}</dt>
                <dd>
                  {project.records.capture.capture.width ??
                    j.inspect.missingValue}{" "}
                  ×{" "}
                  {project.records.capture.capture.height ??
                    j.inspect.missingValue}
                </dd>
              </div>
              <div>
                <dt>{j.capture.elapsed}</dt>
                <dd>{project.records.capture.capture.seconds.toFixed(2)} s</dd>
              </div>
              <div>
                <dt>{j.capture.sharedAudio}</dt>
                <dd>
                  {project.records.capture.capture.audio
                    ? j.capture.yes
                    : j.capture.no}
                </dd>
              </div>
            </dl>
          )}
          <p>{j.capture.replayNote}</p>
          <p>{j.capture.sourceSaved}</p>
        </>
      )}
      <details>
        <summary>{j.capture.nativeTitle}</summary>
        <p>{j.capture.nativeNote}</p>
        <a href="https://github.com/snowch/video-lab/blob/main/docs/notes/issue-3/native-capture.md">
          {j.capture.nativeTitle}
        </a>
      </details>
      <p>{j.common.localNote}</p>
      <a className="button primary" href="#/build">
        {j.capture.next}
      </a>
    </Step>
  );
}
function Evidence({ command }: { command?: string[] }) {
  return command ? (
    <details>
      <summary>{j.common.command}</summary>
      <pre>{commandText(command)}</pre>
    </details>
  ) : null;
}
export function BuildPage() {
  const project = useProject(),
    task = useTask();
  const [rate, setRate] = useState(project.records.video?.rate ?? 1),
    [probe, setProbe] = useState<Probe>(),
    [stage, setStage] = useState<"video" | "muxed">("video"),
    [reference, setReference] = useState<MediaRecord>();
  const output = reference ?? project.records[stage];
  useEffect(() => {
    if (project.ready && project.records.video?.rate)
      setRate(project.records.video.rate);
  }, [project.ready]);
  async function encode() {
    setReference(undefined);
    setProbe(undefined);
    setStage("video");
    await project.discard("video");
    await project.discard("muxed");
    await task.run(async (live, log) => {
      const inputs = await Promise.all(
        ["000", "048", "072"].map((frame, index) =>
          fetchedInput(
            `media/frames/${frame}.jpg`,
            `frame${String(index).padStart(3, "0")}.jpg`,
          ),
        ),
      );
      live();
      const result = await runJob(
        { inputs, args: videoCommand(rate), output: "video.mp4" },
        log,
      );
      live();
      await project.save({
        id: "video",
        blob: new Blob([result.bytes], { type: "video/mp4" }),
        name: "video.mp4",
        origin: "generated",
        created: Date.now(),
        command: result.command,
        probe: result.probe,
        rate,
      });
      live();
      setProbe(result.probe);
    });
  }
  async function mux() {
    const video = project.records.video;
    if (!video) return;
    setReference(undefined);
    setProbe(undefined);
    setStage("muxed");
    await project.discard("muxed");
    await task.run(async (live, log) => {
      const data = new Uint8Array(await video.blob.arrayBuffer());
      const tone = await fetchedInput("media/journey/tone.wav", "tone.wav");
      live();
      const result = await runJob(
        {
          inputs: [{ name: "video.mp4", data }, tone],
          args: [...muxCommand],
          output: "demo.mp4",
        },
        log,
      );
      live();
      await project.save({
        id: "muxed",
        blob: new Blob([result.bytes], { type: "video/mp4" }),
        name: "demo.mp4",
        origin: "generated",
        created: Date.now(),
        command: result.command,
        probe: result.probe,
        rate,
      });
      live();
      setProbe(result.probe);
    });
  }
  async function provided() {
    setProbe(undefined);
    await task.run(async (live) => {
      const response = await fetch(assetURL("media/journey/with-audio.mp4"));
      if (!response.ok) throw new Error("Reference unavailable");
      const blob = await response.blob();
      const evidence = await (
        await fetch(assetURL("media/journey/evidence.json"))
      ).json();
      live();
      setReference({
        probe: evidence.files["with-audio.mp4"].probe,
        id: "muxed",
        blob,
        name: "provided-with-audio.mp4",
        origin: "provided",
        created: Date.now(),
      });
    });
  }
  return (
    <Step title={j.build.title} intro={j.build.intro}>
      <section>
        <h2>{j.build.picturesTitle}</h2>
        <p>{j.build.picturesNote}</p>
        <div className="filmstrip">
          {["000", "048", "072"].map((frame, index) => (
            <figure key={frame}>
              <img
                src={assetURL(`media/frames/${frame}.jpg`)}
                width="960"
                height="540"
                alt={j.build.pictureAlt}
              />
              <figcaption>
                {
                  [
                    j.build.firstPicture,
                    j.build.secondPicture,
                    j.build.thirdPicture,
                  ][index]
                }
                <br />
                {j.build.sourceTime}: {[0, 4, 6][index]} s<br />
                {j.build.outputInterval}: {index / rate}–{(index + 1) / rate} s
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <figure className="static-pipeline">
        <figcaption>{j.build.diagramTitle}</figcaption>
        <ol>
          <li>
            {j.build.diagramPictures} → {j.build.diagramVideoEncoder} →{" "}
            {j.build.diagramVideo}
          </li>
          <li>
            {j.build.diagramSound} → {j.build.diagramAudioEncoder} →{" "}
            {j.build.diagramAudio}
          </li>
          <li>
            {j.build.diagramMux} → {j.build.diagramContainer}
          </li>
        </ol>
        <p>{j.build.diagramNote}</p>
      </figure>
      <section className="workbench">
        <p>{j.common.firstProcessingDownload}</p>
        <h2>{j.build.encodingTitle}</h2>
        <p>{j.build.encodingNote}</p>
        <p>{j.build.rateQuestion}</p>
        <label>
          {j.build.rate}
          <select
            value={rate}
            disabled={task.busy}
            onChange={(event) => {
              setRate(Number(event.target.value));
              setProbe(undefined);
              setReference(undefined);
              void project.discard("video");
              void project.discard("muxed");
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <p>{j.build.rateNote}</p>
        <button
          disabled={task.busy || !project.ready}
          onClick={() => void encode()}
        >
          {j.build.encode}
        </button>
        <h2>{j.build.muxTitle}</h2>
        <p>{j.build.muxNote}</p>
        <button
          disabled={task.busy || !project.records.video}
          onClick={() => void mux()}
        >
          {j.build.mux}
        </button>
        {!project.records.video && <p>{j.build.needsVideo}</p>}
        <p>{j.common.processingLimits}</p>
        <TaskStatus task={task} />
        {output && (
          <>
            <MediaView
              record={output}
              title={
                output.origin === "provided"
                  ? j.common.providedResult
                  : stage === "video"
                    ? j.build.videoReady
                    : j.build.muxReady
              }
            />
            {output.origin === "provided" && <p>{j.build.referenceNote}</p>}
            <Evidence command={output.command} />
          </>
        )}
        {(probe ?? output?.probe) && (
          <ProbeView probe={(probe ?? output?.probe)!} />
        )}
      </section>
      <button disabled={task.busy} onClick={() => void provided()}>
        {j.build.reference}
      </button>
      <p>{j.build.referenceNote}</p>
      <EncoderOffline />
      <a className="button primary" href="#/inspect">
        {j.build.next}
      </a>
    </Step>
  );
}
export function InspectPage() {
  const project = useProject(),
    task = useTask();
  const [selected, setSelected] = useState("capture"),
    [probe, setProbe] = useState<Probe>();
  const record = project.records[selected as "capture" | "video" | "muxed"];
  useEffect(() => setProbe(undefined), [record?.blob]);
  async function measure() {
    if (!record) return;
    setProbe(undefined);
    await task.run(async (live, log) => {
      const result = await inspectMedia(record.blob, log);
      live();
      setProbe(result);
    });
  }
  async function importFile(file?: File) {
    if (!file) return;
    setProbe(undefined);
    await task.run(async (live) => {
      if (file.size > 20 * 1024 * 1024 || !/\.(mp4|webm)$/i.test(file.name))
        throw new Error(j.common.processingLimits);
      live();
      await project.save({
        id: "capture",
        blob: file,
        name: file.name,
        origin: "imported",
        created: Date.now(),
      });
      live();
      setSelected("capture");
    });
  }
  return (
    <Step title={j.inspect.title} intro={j.inspect.intro}>
      <section>
        <h2>{j.inspect.intentionTitle}</h2>
        <ul>
          {j.inspect.intention.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        <p>{j.inspect.intentionNote}</p>
      </section>
      <section className="workbench">
        <p>{j.common.firstProcessingDownload}</p>
        <label>
          {j.inspect.select}
          <select
            value={selected}
            disabled={task.busy}
            onChange={(event) => {
              setSelected(event.target.value);
              setProbe(undefined);
            }}
          >
            <option value="capture">{j.inspect.own}</option>
            <option value="video" disabled={!project.records.video}>
              {j.inspect.video}
            </option>
            <option value="muxed" disabled={!project.records.muxed}>
              {j.inspect.muxed}
            </option>
          </select>
        </label>
        <label>
          {j.inspect.upload}
          <input
            type="file"
            accept="video/mp4,video/webm,.mp4,.webm"
            disabled={task.busy || !project.ready}
            onChange={(event) => {
              void importFile(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </label>
        <p>{j.inspect.uploadNote}</p>
        {record ? (
          <MediaView record={record} title={j.common.source} />
        ) : (
          <p>{j.common.noSource}</p>
        )}
        <button disabled={!record || task.busy} onClick={() => void measure()}>
          {j.inspect.run}
        </button>
        <TaskStatus task={task} />
        {probe && (
          <section>
            <h2>{j.inspect.factsTitle}</h2>
            <p>{j.inspect.factsNote}</p>
            <ProbeView probe={probe} />
          </section>
        )}
      </section>
      <EncoderOffline />
      <a className="button primary" href="#/edit">
        {j.inspect.next}
      </a>
    </Step>
  );
}
export function EditPage() {
  const project = useProject(),
    task = useTask();
  const [probe, setProbe] = useState<Probe>(),
    [resultProbe, setResultProbe] = useState<Probe>(),
    [reference, setReference] = useState<MediaRecord>();
  const [start1, setStart1] = useState("0"),
    [end1, setEnd1] = useState("2"),
    [second, setSecond] = useState(true),
    [start2, setStart2] = useState("3"),
    [end2, setEnd2] = useState("7");
  const [rangeError, setRangeError] = useState(false);
  const source = project.records.capture;
  const duration = probe ? measuredDuration(probe) : undefined;
  useEffect(() => {
    setProbe(undefined);
    setResultProbe(undefined);
    setReference(undefined);
  }, [source?.blob]);
  function invalidate() {
    setRangeError(false);
    setReference(undefined);
    setResultProbe(undefined);
    void project.discard("edit");
  }
  async function measure() {
    if (!source) return;
    setProbe(undefined);
    await task.run(async (live, log) => {
      const data = await inspectMedia(source.blob, log);
      live();
      setProbe(data);
    });
  }
  async function edit() {
    if (!source || !probe || !duration) return;
    const ranges: Range[] = [
      { start: Number(start1), end: Number(end1) },
      ...(second ? [{ start: Number(start2), end: Number(end2) }] : []),
    ];
    invalidate();
    const values = [start1, end1, ...(second ? [start2, end2] : [])];
    let args: string[];
    const name = sourceFilename(source.blob);
    try {
      if (values.some((value) => !value.trim())) throw new Error("Blank range");
      args = editCommand(name, ranges, duration, hasAudio(probe));
    } catch {
      setRangeError(true);
      return;
    }
    await task.run(async (live, log) => {
      const buffer = await source.blob.arrayBuffer();
      const sourceSha256 = Array.from(
        new Uint8Array(await crypto.subtle.digest("SHA-256", buffer)),
        (byte) => byte.toString(16).padStart(2, "0"),
      ).join("");
      live();
      const result = await runJob(
        {
          inputs: [{ name, data: new Uint8Array(buffer) }],
          args,
          output: "edited-demo.mp4",
        },
        log,
      );
      live();
      await project.save({
        id: "edit",
        blob: new Blob([result.bytes], { type: "video/mp4" }),
        name: "edited-demo.mp4",
        origin: "generated",
        created: Date.now(),
        command: result.command,
        probe: result.probe,
        recipe: {
          source: source.name,
          workingInputName: name,
          sourceSha256,
          ranges,
          command: result.command,
          created: new Date().toISOString(),
        },
      });
      live();
      setResultProbe(result.probe);
    });
  }
  async function provided() {
    setResultProbe(undefined);
    await task.run(async (live) => {
      const response = await fetch(assetURL("media/journey/edited-demo.mp4"));
      if (!response.ok) throw new Error("Reference unavailable");
      const blob = await response.blob();
      const evidence = await (
        await fetch(assetURL("media/journey/evidence.json"))
      ).json();
      live();
      setReference({
        probe: evidence.files["edited-demo.mp4"].probe,
        id: "edit",
        blob,
        name: "provided-edited-demo.mp4",
        origin: "provided",
        created: Date.now(),
      });
    });
  }
  const field = (
    label: string,
    value: string,
    set: (value: string) => void,
  ) => (
    <label>
      {label}
      <input
        type="number"
        min="0"
        max={duration ?? 30}
        step="0.1"
        value={value}
        disabled={task.busy}
        onChange={(event) => {
          set(event.target.value);
          invalidate();
        }}
      />
    </label>
  );
  const output = reference ?? project.records.edit;
  return (
    <Step title={j.edit.title} intro={j.edit.intro}>
      <section className="workbench">
        <p>{j.common.firstProcessingDownload}</p>
        {source ? (
          <MediaView record={source} title={j.edit.source} />
        ) : (
          <p>{j.common.noSource}</p>
        )}
        <button disabled={!source || task.busy} onClick={() => void measure()}>
          {j.inspect.run}
        </button>
        {probe && <ProbeView probe={probe} />}
        <h2>{j.edit.rangesTitle}</h2>
        <p>{j.edit.defaultNote}</p>
        <p>{j.edit.rangeNote}</p>
        <div className="form-grid">
          {field(j.edit.firstStart, start1, setStart1)}
          {field(j.edit.firstEnd, end1, setEnd1)}
          <label className="check-label">
            <input
              type="checkbox"
              checked={second}
              disabled={task.busy}
              onChange={(event) => {
                setSecond(event.target.checked);
                invalidate();
              }}
            />
            {j.edit.secondRange}
          </label>
          {second && (
            <>
              {field(j.edit.secondStart, start2, setStart2)}
              {field(j.edit.secondEnd, end2, setEnd2)}
            </>
          )}
        </div>
        <button
          disabled={
            task.busy ||
            !duration ||
            duration > 30 ||
            (!!probe &&
              (probe.streams.find((stream) => stream.codec_type === "video")
                ?.width ?? 0) *
                (probe.streams.find((stream) => stream.codec_type === "video")
                  ?.height ?? 0) >
                1920 * 1080)
          }
          onClick={() => void edit()}
        >
          {j.edit.run}
        </button>
        {!duration && <p>{j.common.inspectFirst}</p>}
        {rangeError && <p role="alert">{j.edit.invalidRange}</p>}
        {probe &&
          (!duration ||
            duration > 30 ||
            (probe.streams.find((stream) => stream.codec_type === "video")
              ?.width ?? 0) *
              (probe.streams.find((stream) => stream.codec_type === "video")
                ?.height ?? 0) >
              1920 * 1080) && <p role="alert">{j.edit.resolutionLimit}</p>}
        <p>{j.common.processingLimits}</p>
        <TaskStatus task={task} />
        {output && (
          <>
            <MediaView
              record={output}
              title={
                output.origin === "provided"
                  ? j.common.providedResult
                  : j.edit.ready
              }
            />
            {output.origin === "provided" && <p>{j.edit.fallbackNote}</p>}
            <Evidence command={output.command} />
            {output.recipe && <RecipeLink record={output} />}
          </>
        )}
        {(resultProbe ?? output?.probe) && (
          <ProbeView probe={(resultProbe ?? output?.probe)!} />
        )}
      </section>
      <figure className="static-pipeline">
        <figcaption>{j.edit.pipelineTitle}</figcaption>
        <ol>
          {[
            j.edit.pipelineDecode,
            j.edit.pipelineTrim,
            j.edit.pipelineReset,
            j.edit.pipelineJoin,
            j.edit.pipelineEncode,
          ].map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ol>
        <p>{j.edit.pipelineNote}</p>
      </figure>
      <p>{j.edit.qualityNote}</p>
      <button disabled={task.busy} onClick={() => void provided()}>
        {j.edit.fallback}
      </button>
      <p>{j.edit.fallbackNote}</p>
      <EncoderOffline />
      <a className="button primary" href="#/publish">
        {j.edit.next}
      </a>
    </Step>
  );
}
function RecipeLink({ record }: { record: MediaRecord }) {
  // Stable source text avoids revoking and recreating a URL on unrelated renders.
  const text = record.recipe
    ? JSON.stringify(
        { ...record.recipe, commandLine: commandText(record.command ?? []) },
        null,
        2,
      )
    : undefined;
  const [url, setURL] = useState<string>();
  useEffect(() => {
    if (!text) return;
    const value = URL.createObjectURL(
      new Blob([text], { type: "application/json" }),
    );
    setURL(value);
    return () => URL.revokeObjectURL(value);
  }, [text]);
  return url ? (
    <>
      <p>{j.edit.recipeNote}</p>
      <a className="button" download="video-lab-edit-recipe.json" href={url}>
        {j.publish.downloadRecipe}
      </a>
    </>
  ) : null;
}
export function PublishPage() {
  const project = useProject(),
    record = project.records.edit;
  const [checked, setChecked] = useState<boolean[]>(() =>
    j.publish.checklist.map(() => false),
  );
  return (
    <Step title={j.publish.title} intro={j.publish.intro}>
      {record ? (
        <>
          <MediaView
            record={record}
            title={j.publish.outputTitle}
            download={j.publish.download}
          />
          <p>{j.publish.generatedNote}</p>
          <RecipeLink record={record} />
          <Evidence command={record.command} />
          {record.probe && <ProbeView probe={record.probe} />}
        </>
      ) : (
        <p>{j.publish.missing}</p>
      )}
      <h2>{j.publish.checklistTitle}</h2>
      <div className="review-checklist">
        {j.publish.checklist.map((text, index) => (
          <label className="check-label" key={text}>
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={(event) =>
                setChecked((values) =>
                  values.map((value, i) =>
                    i === index ? event.target.checked : value,
                  ),
                )
              }
            />
            {text}
          </label>
        ))}
      </div>
      <p>{j.publish.checklistNote}</p>
      <a className="button" href="#/edit">
        {j.publish.returnToEdit}
      </a>
      <h2>{j.publish.nextTitle}</h2>
      <p>{j.publish.nextNote}</p>
      <OptionalSample />
    </Step>
  );
}
function OptionalSample() {
  const [loaded, setLoaded] = useState(false);
  return (
    <section>
      <h2>{j.common.optionalSampleTitle}</h2>
      <p>{j.common.sampleNote}</p>
      {loaded ? (
        <video
          src={assetURL("optional/big-buck-bunny-5s.mp4")}
          controls
          playsInline
          preload="metadata"
          aria-label={j.common.optionalSampleTitle}
        />
      ) : (
        <button onClick={() => setLoaded(true)}>{j.common.loadSample}</button>
      )}
      <p>
        {j.common.sampleCredit}{" "}
        <a href="https://peach.blender.org/about/">Blender Foundation</a> ·{" "}
        <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>
      </p>
    </section>
  );
}
