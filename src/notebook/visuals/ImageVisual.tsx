// Copyright © 2026 Christopher Snow
import media from "../images-media.json";
import { imageCopy } from "../images.strings";
import "./image.css";

const assetUrl = (name: string) =>
  `${import.meta.env.BASE_URL}media/images/${name}`;

export function ImageVisual({ pageId }: { pageId: string }) {
  if (pageId === "image-video/overlay") {
    const annotation = media.files.find(
      (file) => file.name === "annotation.png",
    )!;
    return (
      <figure className="image-visual">
        <div className="image-visual-transparency">
          <img
            src={assetUrl(annotation.name)}
            alt={annotation.name}
            width={annotation.width}
            height={annotation.height}
          />
        </div>
        <figcaption>{imageCopy.transparentPngExplanation}</figcaption>
      </figure>
    );
  }

  const prefix =
    pageId === "image-video/sequence"
      ? "drawing-"
      : pageId === "image-video/animation"
        ? "frame-"
        : null;
  if (!prefix) return null;

  const drawings = media.files
    .filter((file) => file.name.startsWith(prefix))
    .sort((first, second) => first.name.localeCompare(second.name));
  return (
    <figure className="image-visual">
      <ol className="image-visual-drawings">
        {drawings.map((file) => (
          <li key={file.name}>
            <img
              src={assetUrl(file.name)}
              alt={file.name}
              width={file.width}
              height={file.height}
            />
            <code>{file.name}</code>
          </li>
        ))}
      </ol>
      <figcaption>{imageCopy.filmstripCaption}</figcaption>
    </figure>
  );
}
