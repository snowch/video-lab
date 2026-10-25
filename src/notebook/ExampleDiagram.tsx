// Copyright © 2026 Christopher Snow
import { useEffect, useState } from "react";
import { plannedCut, cutInterval } from "./cut-plan";
import { useNotebook } from "./Workspace";
import { hashBlob } from "./model";
import type { PageDefinition } from "./structure";
import { n } from "./ui.strings";
import { practiceAssets } from "./assets";

// Planned source intervals are separate from measured output and fixed teaching models.
function CutDiagram({ command }: { command: string }) {
  const w = useNotebook();
  const plan = plannedCut(command);
  const asset = plan ? practiceAssets[plan.input] : undefined;
  const blob = plan ? w.files[plan.input]?.blob : undefined;
  const [verified, setVerified] = useState<{ blob: Blob; hash: string }>();
  useEffect(() => {
    let live = true;
    if (blob)
      void hashBlob(blob)
        .then((hash) => {
          if (live) setVerified({ blob, hash });
        })
        .catch(() => {
          if (live) setVerified(undefined);
        });
    return () => {
      live = false;
    };
  }, [blob]);
  if (
    !plan ||
    !asset?.duration ||
    !blob ||
    verified?.blob !== blob ||
    verified.hash !== asset.sha256
  )
    return null;
  const interval = cutInterval(plan.start, plan.duration, asset.duration);
  if (!interval) return null;
  const { start, end, duration, total } = interval;
  const segments = [
    { length: start, kept: false },
    { length: duration, kept: true },
    { length: total - end, kept: false },
  ].filter((segment) => segment.length > 0);
  const seconds = (value: number) => Number(value.toFixed(3));
  return (
    <figure className="notebook-diagram notebook-cut-plan">
      <figcaption>
        {n.timelineModel} · {seconds(start)}–{seconds(end)} s{" "}
        <span>({seconds(duration)} s)</span>
      </figcaption>
      <div
        className="notebook-timeline"
        aria-hidden="true"
        style={{
          gridTemplateColumns: segments.map((s) => `${s.length}fr`).join(" "),
        }}
      >
        {segments.map((s, i) => (
          <span key={i} className={s.kept ? "kept" : "removed"} />
        ))}
      </div>
      <p className="notebook-plan-key">
        <span>
          <i aria-hidden="true" />
          {n.kept}
        </span>{" "}
        · {plan.input} · {total} s
      </p>
    </figure>
  );
}

export function ExampleDiagram({
  page,
  command,
}: {
  page: PageDefinition;
  command: string;
}) {
  if (page.chapter === "first-edit") return <CutDiagram command={command} />;
  if (page.id === "cut-join/join") {
    return (
      <figure className="notebook-diagram">
        <figcaption>{n.joinModel}</figcaption>
        <div className="notebook-join-inputs">
          <div>
            <strong>
              {n.input} 0 · {practiceAssets[page.assets[0]!]!.duration} s
            </strong>
            <code>bunny-short.mp4</code>
            <span>[0:v] [0:a]</span>
          </div>
          <div>
            <strong>
              {n.input} 1 · {practiceAssets[page.assets[1]!]!.duration} s
            </strong>
            <code>bunny-action.mp4</code>
            <span>[1:v] [1:a]</span>
          </div>
        </div>
        <div className="notebook-join-operation">
          <span aria-hidden="true">↓</span>
          <strong>concat</strong>
          <span>{n.firstThenSecond}</span>
          <span aria-hidden="true">↓</span>
        </div>
        <div className="notebook-join-output">
          <span>
            {n.joinedVideo} <code>[v]</code>
          </span>
          <span>
            {n.joinedAudio} <code>[a]</code>
          </span>
        </div>
        <p className="notebook-join-destination">
          <code>-map "[v]" -map "[a]"</code>
          <span aria-hidden="true"> ↓ </span>
          <code>joined.mp4</code>
        </p>
      </figure>
    );
  }
  if (page.id === "export/format") {
    return (
      <figure className="notebook-diagram">
        <figcaption>{n.colourModel}</figcaption>
        <div className="notebook-colour-grid">
          <div>
            <div className="notebook-luma-grid">
              {[0, 1, 2, 3].map((i) => (
                <span key={i}>Y</span>
              ))}
            </div>
            <p>{n.brightnessSamples}</p>
          </div>
          <div>
            <div className="notebook-chroma-grid">U</div>
            <p>{n.blueDifference}</p>
          </div>
          <div>
            <div className="notebook-chroma-grid">V</div>
            <p>{n.redDifference}</p>
          </div>
        </div>
        <p>{n.colourModelNote}</p>
      </figure>
    );
  }
  return null;
}
