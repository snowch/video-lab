// Copyright © 2026 Christopher Snow
import { InspectDiagram } from "./InspectDiagrams";
import { FrameRateDiagram, TimeDiagrams } from "./TimeDiagrams";
import { SampleRateDiagram } from "./SampleRateDiagram";
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
    if (afterParagraph === 1) return <SampleRateDiagram />;
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
