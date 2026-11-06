// Copyright © 2026 Christopher Snow
import { InspectDiagram } from "./InspectDiagrams";
import { FrameRateDiagram, TimeDiagrams } from "./TimeDiagrams";
import { SampleRateDiagram } from "./SampleRateDiagram";
import { ToneFrequencyDiagram } from "./ToneFrequencyDiagram";
import { SampleRateReasoning } from "./SampleRateReasoning";
import { MediaDiagrams } from "./MediaDiagrams";
import { ImageVisual } from "./ImageVisual";

export function ConceptVisual({
  pageId,
  afterParagraph,
}: {
  pageId: string;
  afterParagraph?: number;
}) {
  if (pageId === "frames-time/rate") {
    if (afterParagraph === 0) return <FrameRateDiagram />;
    return null;
  }
  if (pageId === "frames-time/samples") {
    if (afterParagraph === 0)
      return (
        <>
          <ToneFrequencyDiagram />
          <SampleRateDiagram />
        </>
      );
    if (afterParagraph === 1) return <SampleRateReasoning />;
    return null;
  }
  if (afterParagraph !== undefined) return null;
  return (
    <>
      <InspectDiagram pageId={pageId} />
      <TimeDiagrams pageId={pageId} />
      <MediaDiagrams pageId={pageId} />
      <ImageVisual pageId={pageId} />
    </>
  );
}
