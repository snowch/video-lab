// Copyright © 2026 Christopher Snow
import { useId, useState, type CSSProperties } from "react";
import { formatVisuals as v } from "./format-visuals.strings";
import {
  pictureColours,
  enlargedColours,
  samplingModes,
  samplePlanes,
  type SamplingMode,
} from "./format-model";
import { InlineText } from "./InlineText";

function Streams({ container }: { container: string }) {
  return (
    <div className="format-container">
      <strong>{container}</strong>
      <div className="format-streams">
        <span className="format-video-stream">{v.h264Video}</span>
        <span className="format-audio-stream">{v.aacAudio}</span>
      </div>
    </div>
  );
}
export function ContainerDiagram() {
  return (
    <figure className="format-figure">
      <p className="format-figure-title">{v.containerDiagramLabel}</p>
      <Streams container={v.mp4} />
      <figcaption>{v.containerCaption}</figcaption>
    </figure>
  );
}
export function RemuxDiagram() {
  return (
    <figure className="format-figure">
      <div className="format-remux">
        <Streams container={v.sourceMp4} />
        <div className="format-copy-arrow">
          <span aria-hidden="true">↓</span>
          <strong>{v.copyAction}</strong>
        </div>
        <Streams container={v.destinationMatroska} />
      </div>
      <figcaption>{v.remuxCaption}</figcaption>
    </figure>
  );
}
export function PurposeDiagram() {
  return (
    <figure className="format-figure">
      <figcaption className="format-figure-title">{v.purposeTitle}</figcaption>
      <div className="format-purpose">
        {v.purposeGroups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            <p>
              <strong>{group.formats}</strong>
            </p>
            <p>{group.text}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
export function PixelMagnifier() {
  return (
    <figure className="format-figure">
      <p className="format-figure-title">{v.magnifyTitle}</p>
      <p>{v.magnifyIntro}</p>
      <div className="format-magnifier" aria-hidden="true">
        <div className="format-mini-picture">
          {pictureColours.flat().map((colour, i) => (
            <span key={i} style={{ background: colour }} />
          ))}
          <div className="format-selection" />
        </div>
        <span>→</span>
        <div className="format-pixel-group">
          {enlargedColours.map((colour, i) => (
            <span key={i} style={{ background: colour }}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      <figcaption>{v.magnifyCaption}</figcaption>
    </figure>
  );
}
export function SamplingDiagram() {
  const [mode, setMode] = useState<SamplingMode>("4:2:0");
  const id = useId();
  return (
    <figure className="format-figure format-sampling">
      <fieldset>
        <legend>{v.samplingLegend}</legend>
        <div className="format-sampling-options">
          {samplingModes.map((value) => (
            <label key={value}>
              <input
                type="radio"
                name={id}
                value={value}
                checked={mode === value}
                onChange={() => setMode(value)}
              />
              {value}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="format-planes">
        {samplePlanes(mode).map((plane) => (
          <div
            key={plane.component}
            className="format-plane"
            data-component={plane.component}
          >
            <strong>{v.componentLabels[plane.component]}</strong>
            <div
              className="format-sample-grid"
              aria-hidden="true"
              style={{
                gridTemplateColumns: `repeat(${plane.columns},1fr)`,
                gridTemplateRows: `repeat(${plane.rows},1fr)`,
              }}
            >
              {Array.from({ length: plane.count }, (_, i) => (
                <span key={i}>
                  {plane.component}
                  {i + 1}
                </span>
              ))}
            </div>
            <p>{v.sampleCount(plane.component, plane.count)}</p>
          </div>
        ))}
      </div>
      <p className="format-sampling-result" role="status">
        <InlineText>{v.samplingExplanation[mode]}</InlineText>
      </p>
      <figcaption>{v.samplingCaption}</figcaption>
    </figure>
  );
}
export function AlphaDiagram() {
  const [alpha, setAlpha] = useState(0.5);
  const id = useId();
  const state =
    alpha === 0
      ? v.alphaTransparent
      : alpha === 1
        ? v.alphaOpaque
        : v.alphaPartial;
  return (
    <figure className="format-figure">
      <label className="format-alpha-label" htmlFor={id}>
        {v.alphaRangeLabel}:{" "}
        <output htmlFor={id}>
          {alpha.toFixed(2)} · {state}
        </output>
      </label>
      <input
        id={id}
        className="format-alpha-range"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={alpha}
        onChange={(event) => setAlpha(Number(event.target.value))}
      />
      <div
        className="format-alpha-previews"
        style={{ "--drawing-opacity": alpha } as CSSProperties}
      >
        {[v.checkerPreviewLabel, v.compositePreviewLabel].map(
          (label, index) => (
            <div key={label}>
              <strong>{label}</strong>
              <div
                className={`format-alpha-preview ${index === 0 ? "format-checker" : "format-backdrop"}`}
                aria-hidden="true"
              >
                <div className="format-drawing">{v.drawing}</div>
              </div>
            </div>
          ),
        )}
      </div>
      <figcaption>{v.alphaCaption}</figcaption>
    </figure>
  );
}
