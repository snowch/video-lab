// Copyright © 2026 Christopher Snow
import type { CSSProperties } from "react";
import media from "./media.json";
import { mediaViewCopy as s } from "./media-views.strings";
import "./media-views.css";

type FramingKind = "scale" | "crop" | "pad";
type ImageFact = (typeof media.framing.images)["source"];

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const dimensions = (image: { width: number; height: number }) =>
  `${image.width} × ${image.height}`;

function EvidenceLink() {
  return (
    <p className="media-evidence">
      <a href="https://github.com/snowch/video-lab/blob/main/src/notebook/visuals/media.json">
        {s.evidence}
      </a>
    </p>
  );
}

function Pipeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="media-pipeline">
      <p>
        <strong>{title}</strong>
      </p>
      <ol
        className="media-pipeline-steps"
        style={{ "--media-step-count": steps.length } as CSSProperties}
      >
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

function CopyDiagram() {
  return (
    <figure className="media-view media-copy-view">
      <figcaption>{s.copyTitle}</figcaption>
      <Pipeline
        title={s.copyPath}
        steps={[s.compressedSource, s.copyPackets, s.compressedOutput]}
      />
      <Pipeline
        title={s.encodePath}
        steps={[
          s.compressedSource,
          s.decode,
          s.picturesAndSound,
          s.optionalFilters,
          s.encode,
          s.compressedOutput,
        ]}
      />
      <p>{s.copyNote}</p>
    </figure>
  );
}

function ModelPictures({ discard = false }: { discard?: boolean }) {
  return (
    <ol className={`media-pictures${discard ? " media-decoded-pictures" : ""}`}>
      {s.frameNames.map((frame, index) => (
        <li
          key={frame}
          className={[
            index === 0 ? "media-decoding-start" : "",
            index < 2 ? "media-before-start" : "media-kept-picture",
            index === 2 ? "media-requested-start" : "",
          ].join(" ")}
        >
          {frame}
        </li>
      ))}
    </ol>
  );
}

function DependencyDiagram() {
  return (
    <figure className="media-view media-dependency-view">
      <figcaption>{s.dependencyTitle}</figcaption>
      <p>
        <strong>{s.sourceOrder}</strong>
      </p>
      <ModelPictures />
      <p className="media-model-key">
        <span>{s.independent}</span>
        <span>{s.dependent}</span>
      </p>
      <p className="media-start-label">{s.requestedStart}</p>
      <div className="media-dependency-path">
        <p>
          <strong>{s.copyDependencies}</strong>
        </p>
        <ModelPictures />
        <p>{s.copyDependencyNote}</p>
      </div>
      <div className="media-dependency-path">
        <p>
          <strong>{s.decodeDiscard}</strong>
        </p>
        <ModelPictures discard />
        <div className="media-decode-key">
          <p>{s.decodedBefore}</p>
          <p>{s.encodedKept}</p>
        </div>
      </div>
      <p>{s.dependencyLimit}</p>
    </figure>
  );
}

function FrameImage({
  image,
  label,
  alt,
  sourceWidth,
}: {
  image: ImageFact;
  label: string;
  alt: string;
  sourceWidth: number;
}) {
  const style: CSSProperties = {
    width: `${(image.width / sourceWidth) * 100}%`,
  };
  return (
    <div className="media-frame-block">
      <p>
        <strong>{label}</strong>
        <span>
          {s.dimensions}: {dimensions(image)}
        </span>
      </p>
      <div className="media-frame-image" style={style}>
        <img
          src={assetUrl(image.path)}
          width={image.width}
          height={image.height}
          alt={alt}
          loading="lazy"
        />
      </div>
    </div>
  );
}

function FramingDiagram({ kind }: { kind: FramingKind }) {
  const source = media.framing.images.source;
  const output = media.framing.images[kind];
  return (
    <figure className={`media-view media-framing-view media-framing-${kind}`}>
      <figcaption>{s.framingTitles[kind]}</figcaption>
      <p>
        {s.sourceTime}: {media.framing.sourceTime} {s.seconds}
      </p>
      <FrameImage
        image={source}
        label={s.sourceFrame}
        alt={s.sourceImageAlt}
        sourceWidth={source.width}
      />
      <FrameImage
        image={output}
        label={s.outputFrame}
        alt={s.framingImageAlts[kind]}
        sourceWidth={source.width}
      />
      <p>{s.framingNotes[kind]}</p>
      <p>{s.framingSourceNote}</p>
      <EvidenceLink />
    </figure>
  );
}

function QualityDiagram() {
  return (
    <figure className="media-view media-quality-view">
      <figcaption>{s.qualityTitle}</figcaption>
      <p>{s.qualityNote}</p>
      <p>
        {s.sourceTime}: {media.quality.sourceTime} {s.seconds} · {s.qualityCrop}
        : {dimensions(media.quality.crop)} {s.pixels}
      </p>
      <div className="media-quality-comparison">
        {media.quality.encodes.map((encode) => (
          <div className="media-quality-example" key={encode.crf}>
            <p>
              <strong>
                {s.qualitySetting} {encode.crf}
              </strong>
            </p>
            <img
              src={assetUrl(encode.image.path)}
              width={encode.image.width}
              height={encode.image.height}
              alt={`${s.qualityImageAlt} ${encode.crf}.`}
              loading="lazy"
            />
            <p>
              {s.completeFile}: {encode.bytes.toLocaleString("en-GB")} {s.bytes}
            </p>
          </div>
        ))}
      </div>
      <p>{s.qualityLimit}</p>
      <EvidenceLink />
    </figure>
  );
}

function FileLayout({ frontIndex }: { frontIndex: boolean }) {
  const parts = frontIndex
    ? ["header", "index", "media"]
    : ["header", "media", "index"];
  return (
    <div className="media-file-layout">
      <p>
        <strong>{frontIndex ? s.afterFaststart : s.beforeFaststart}</strong>
      </p>
      <span className="media-file-begin">{s.fileBeginning}</span>
      <ol>
        {parts.map((part) => (
          <li key={part} className={`media-file-${part}`}>
            {part === "header"
              ? s.header
              : part === "index"
                ? s.index
                : s.media}
          </li>
        ))}
      </ol>
      <span className="media-file-end">{s.fileEnd}</span>
    </div>
  );
}

function FaststartDiagram() {
  return (
    <figure className="media-view media-faststart-view">
      <figcaption>{s.faststartTitle}</figcaption>
      <FileLayout frontIndex={false} />
      <FileLayout frontIndex />
      <p>{s.faststartNote}</p>
      <p>{s.faststartSourceNote}</p>
    </figure>
  );
}

export function MediaDiagrams({ pageId }: { pageId: string }) {
  switch (pageId) {
    case "cut-join/copy":
      return <CopyDiagram />;
    case "cut-join/keyframes":
      return <DependencyDiagram />;
    case "framing/scale":
      return <FramingDiagram kind="scale" />;
    case "framing/crop":
      return <FramingDiagram kind="crop" />;
    case "framing/pad":
      return <FramingDiagram kind="pad" />;
    case "quality/quality":
      return <QualityDiagram />;
    case "export/faststart":
      return <FaststartDiagram />;
    default:
      return null;
  }
}
