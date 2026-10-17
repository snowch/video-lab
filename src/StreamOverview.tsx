// Copyright © 2026 Christopher Snow
import { streamOverview as copy } from "./content/stream-overview.strings";
import { asset, fixture, frames } from "./media/model";
import { ui } from "./content/ui.strings";

// Reuse the measured filmstrip: these are selected pictures, not adjacent frames.
const pictures = fixture.filmstrip
  .filter((_, index) => index % 2 === 0)
  .map((index) => frames[index]!);

export function StreamOverview() {
  return (
    <figure className="stream-overview" aria-labelledby="stream-overview-title">
      <figcaption id="stream-overview-title">{copy.title}</figcaption>
      <div className="stream-overview-file">
        <div className="stream-overview-filename">
          <span>{copy.fileLabel}</span>
          <code>{copy.file}</code>
        </div>
        <div className="stream-overview-lane">
          <h3>{copy.video}</h3>
          <p>{copy.pictures}</p>
          <ol className="stream-overview-pictures">
            {pictures.map((frame) => (
              <li key={frame.index}>
                <img
                  src={asset(frame.image)}
                  alt={`${copy.pictureAlt} ${frame.time} ${ui.seconds}`}
                  width="960"
                  height="540"
                  loading="lazy"
                />
                <span>
                  {frame.time} {ui.seconds}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="stream-overview-lane">
          <h3>{copy.audio}</h3>
          <div className="stream-overview-sound">{copy.tone}</div>
        </div>
        <div className="stream-overview-time">
          <span>{copy.time}</span>
          <span aria-hidden="true" />
        </div>
      </div>
      <p className="player-note">{copy.note}</p>
    </figure>
  );
}
