// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import { glossaryEntries } from "./glossary.strings";
import { notebookRoute, pages } from "./structure";
import media from "./visuals/media.json";

describe("glossary reference integrity", () => {
  it("gives each term a unique identity and an existing lesson destination", () => {
    const ids = new Set<string>();
    const terms = new Set<string>();
    for (const entry of glossaryEntries) {
      expect(ids.has(entry.id), entry.id).toBe(false);
      expect(terms.has(entry.term.toLowerCase()), entry.term).toBe(false);
      ids.add(entry.id);
      terms.add(entry.term.toLowerCase());
      expect(entry.id).toMatch(/^[a-z][a-z-]*$/);
      const target = pages.find((page) => page.id === entry.lesson);
      expect(target, entry.term).toBeDefined();
      expect(notebookRoute(`#/learn/${entry.lesson}`)).toMatchObject({
        home: false,
        page: target,
      });
    }
  });

  it("keeps glossary outside the lesson sequence", () => {
    expect(notebookRoute("#/glossary")).toEqual({ home: true, glossary: true });
    expect(notebookRoute("#glossary")).toEqual({ home: true, glossary: true });
    expect(pages.some((page) => page.id === "glossary")).toBe(false);
  });

  it("keeps source examples consistent with independently verified media facts", () => {
    const example = (id: string) =>
      glossaryEntries.find((entry) => entry.id === id)!.example;
    const video = media.source.streams.find(
      (stream) => stream.type === "video",
    )!;
    const audio = media.source.streams.find(
      (stream) => stream.type === "audio",
    )!;
    expect(example("frame")).toContain(`${video.width} × ${video.height}`);
    expect(example("audio-sample-rate")).toContain(`${audio.sampleRate} Hz`);
    expect(example("bitrate")).toContain(
      `${Math.floor((media.source.bytes * 8) / media.source.duration / 1000)} kb/s`,
    );
    expect(example("time-base")).toContain(media.timeline.timeBase);
    expect(example("time-base")).toContain(
      `${media.timeline.ticksPerFrame} ticks`,
    );
    const frame = media.timeline.frames[2]!;
    expect(example("presentation-timestamp")).toContain(`tick ${frame.pts}`);
    expect(example("presentation-timestamp")).toContain(
      `${frame.seconds} seconds`,
    );
    expect(example("timestamp")).toContain(
      media.timeline.frames
        .slice(0, 3)
        .map((frame) => frame.pts)
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1"),
    );
  });
});
