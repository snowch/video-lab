// Copyright © 2026 Christopher Snow
import { parseCommand } from "../cli/command";
import type { PageDefinition } from "./structure";
import { n } from "./ui.strings";
import { practiceAssets } from "./assets";

// Explanatory models of the fixed example, never measurements of a learner's output.
export function ExampleDiagram({ page }: { page: PageDefinition }) {
  if (page.chapter === "first-edit") {
    const args = parseCommand(page.worked[0]!);
    const start = args.includes("-ss")
      ? Number(args[args.indexOf("-ss") + 1])
      : 0;
    const duration = Number(args[args.indexOf("-t") + 1]);
    const total = practiceAssets[page.assets[0]!]!.duration!;
    const segments = [
      { length: start, kept: false },
      { length: duration, kept: true },
      { length: total - start - duration, kept: false },
    ].filter((s) => s.length > 0);
    return (
      <figure className="notebook-diagram">
        <figcaption>{n.timelineModel}</figcaption>
        <div
          className="notebook-timeline"
          style={{
            gridTemplateColumns: segments.map((s) => `${s.length}fr`).join(" "),
          }}
        >
          {segments.map((s, i) => (
            <span key={i} className={s.kept ? "kept" : "removed"}>
              {s.kept ? n.kept : n.leftOut}
              <br />
              {s.length} s
            </span>
          ))}
        </div>
        <div className="notebook-timeline-ends">
          <span>0 s</span>
          <span>{total} s</span>
        </div>
        <p>
          {n.sourceInterval}: {start}–{start + duration} s · {n.outputDuration}:{" "}
          {duration} s
        </p>
      </figure>
    );
  }
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
