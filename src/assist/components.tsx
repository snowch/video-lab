// Copyright © 2026 Christopher Snow
import { useState } from "react";
import { useSlot, type InteractiveProps } from "@platform/lesson-runtime";
import { asset, frameAt } from "../media/model";
import { checkClaims, cutList, type Claim } from "./claims";
import { ai } from "./strings";

function Player({ file, label }: { file: string; label: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="edit-recording">
      <p>
        <strong>{label}</strong>
      </p>
      <video
        aria-label={label}
        controls
        playsInline
        preload="metadata"
        src={asset(file)}
        onError={() => setFailed(true)}
      />
      {failed && <p role="alert">{ai.unavailable}</p>}
    </div>
  );
}

export function TranscriptView() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="edit-boundaries">
      <Player file="build-queue.mp4" label="The real recording" />
      <div className="edit-boundary">
        <p>
          <strong>{ai.transcriptLabel}</strong>
        </p>
        <table className="sound-levels">
          <caption>{ai.claimsLabel}</caption>
          <tbody>
            {checkClaims().map((claim) => (
              <tr key={claim.index}>
                <td>{ai.claimRow(claim.index, claim.text, claim.timeLabel)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="player-note">{ai.transcriptNote}</p>
      </div>
      {failed && <p role="alert">{ai.unavailable}</p>}
    </div>
  );
}

export function ClaimChecker() {
  const [checked, setChecked] = useState<Claim[] | undefined>();
  const [failed, setFailed] = useState(false);
  const [running, setRunning] = useState(false);
  const run = () => {
    setFailed(false);
    setRunning(true);
    // The check is a real computation over the recording's verified frame
    // table; it resolves in a later tick so the running state is honest.
    setTimeout(() => {
      try {
        setChecked(checkClaims());
      } catch {
        setFailed(true);
      } finally {
        setRunning(false);
      }
    }, 0);
  };
  return (
    <div className="recorder">
      <div className="encode-controls">
        <button onClick={run} disabled={running || checked !== undefined}>
          {ai.check}
        </button>
      </div>
      <p className="player-note" aria-live="polite">
        {!running && !checked && ai.statusIdle}
        {running && ai.statusRunning}
        {checked && ai.statusDone}
      </p>
      {checked && (
        <div className="recorder-result">
          <table className="sound-levels">
            <caption>{ai.verdictLabel}</caption>
            <tbody>
              {checked.map((claim) => (
                <tr key={claim.index}>
                  <td>
                    <p>
                      <strong>
                        {ai.claimVerdict(claim.index, claim.matches)}
                      </strong>
                    </p>
                    <p>
                      {ai.claimRow(claim.index, claim.text, claim.timeLabel)}
                    </p>
                    <p className="player-note">{claim.evidence}</p>
                    <figure className="edit-boundary">
                      <figcaption>{ai.evidenceLabel}</figcaption>
                      <img
                        src={asset(frameAt(claim.time).image)}
                        alt={ai.evidenceAlt(claim.timeLabel)}
                        width={960}
                        height={540}
                        style={{ height: "auto" }}
                      />
                    </figure>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {failed && (
        <p className="player-note" role="note">
          {ai.unavailable}
        </p>
      )}
      <p className="player-note">{ai.note}</p>
    </div>
  );
}

export function CutList() {
  return (
    <div className="recorder">
      <table className="sound-levels">
        <caption>{ai.cutsLabel}</caption>
        <tbody>
          {cutList.map((cut) => (
            <tr key={cut.id}>
              <td>
                {ai.cutRow(
                  cut.name,
                  cut.startLabel,
                  cut.endLabel,
                  String(Math.round(cut.seconds * 10) / 10),
                )}
                <p className="player-note">{cut.carries}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="player-note">{ai.cutNote}</p>
    </div>
  );
}

export function AssistReflection({ store }: InteractiveProps) {
  const [notes, setNotes] = useSlot<string>(store, "assist-reflection");
  return (
    <div className="reflection">
      <label className="control-label">
        {ai.sections.reflection}
        <textarea
          value={notes ?? ""}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <p className="player-note">
        Saved in this browser when storage is available. These notes are not
        graded.
      </p>
      <button onClick={() => setNotes("")}>Clear notes</button>
    </div>
  );
}
