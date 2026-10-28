// Copyright © 2026 Christopher Snow
import { InspectDiagram } from "./InspectDiagrams";
import { TimeDiagrams } from "./TimeDiagrams";
import { MediaDiagrams } from "./MediaDiagrams";
import { ImageVisual } from "./ImageVisual";

export function ConceptVisual({ pageId }: { pageId: string }) {
  return (
    <>
      <InspectDiagram pageId={pageId} />
      <TimeDiagrams pageId={pageId} />
      <MediaDiagrams pageId={pageId} />
      <ImageVisual pageId={pageId} />
    </>
  );
}
