// Copyright © 2026 Christopher Snow
import { describe, expect, it } from "vitest";
import { parseCommand } from "../cli/command";
import { pages, notebookRoute } from "./structure";
import { commandReferenceGroups } from "./command-reference.strings";
import { filterCommandReference } from "./command-reference";

const entries = commandReferenceGroups.flatMap((group) => group.entries);
describe("command reference", () => {
  it("covers every option in the current worked, starter and solution commands", () => {
    const covered = new Set(entries.flatMap((entry) => entry.options ?? []));
    const taught = new Set(
      pages.flatMap((page) =>
        [...page.worked, page.starter, page.solution].flatMap((command) =>
          parseCommand(command).filter((token) => /^-[a-z]/i.test(token)),
        ),
      ),
    );
    for (const option of taught) expect(covered.has(option), option).toBe(true);
    // Also taught in the retry UI, native script and optional appendices.
    for (const option of [
      "-h",
      "-y",
      "-n",
      "-b:a",
      "-encoders",
      "-devices",
      "-list_devices",
      "-capture_cursor",
      "-video_size",
    ])
      expect(covered.has(option), option).toBe(true);
  });
  it("gives each entry an identity and a real teaching destination", () => {
    expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
    expect(new Set(commandReferenceGroups.map((group) => group.id)).size).toBe(
      commandReferenceGroups.length,
    );
    for (const entry of entries) {
      expect(entry.example.trim(), entry.id).not.toBe("");
      expect(entry.summary.trim(), entry.id).not.toBe("");
      if (entry.href.startsWith("#/learn/")) {
        const id = entry.href.slice("#/learn/".length);
        expect(
          pages.some((page) => page.id === id),
          entry.href,
        ).toBe(true);
      } else {
        expect([
          "#/appendix/commands",
          "#/appendix/recording",
          "#/appendix/codecs",
          "#/appendix/formats",
          "#/appendix/formats/video-containers",
          "#/appendix/formats/pixel-formats",
          "#/appendix/resolution",
        ]).toContain(entry.href);
      }
    }
    expect(notebookRoute("#/appendix/commands?q=-ar&purpose=encoding")).toEqual(
      {
        home: true,
        commands: true,
      },
    );
  });
  it("covers the filters inside taught command arguments as well as option flags", () => {
    const filters = new Set<string>();
    for (const page of pages) {
      for (const command of [...page.worked, page.starter, page.solution]) {
        const args = parseCommand(command);
        for (const [index, arg] of args.entries()) {
          if (!["-vf", "-af", "-filter_complex"].includes(arg)) continue;
          const graph = args[index + 1]!;
          for (const match of graph.matchAll(/(?:^|,|\])([a-z]+)(?==|$)/g))
            filters.add(match[1]!);
        }
      }
    }
    for (const filter of filters)
      expect(
        entries.some((entry) => entry.name.includes(filter)),
        filter,
      ).toBe(true);
  });
  it("finds syntax and purpose together regardless of case or whitespace", () => {
    const result = filterCommandReference(
      commandReferenceGroups,
      "  -ar   SAMPLE  ",
      "",
    );
    expect(
      result
        .flatMap((group) => group.entries)
        .some((entry) => entry.options?.includes("-ar")),
    ).toBe(true);
    expect(
      filterCommandReference(commandReferenceGroups, "no-such-option-xyz", ""),
    ).toEqual([]);
    const category = commandReferenceGroups[0]!;
    expect(
      filterCommandReference(commandReferenceGroups, "", category.id).map(
        (group) => group.id,
      ),
    ).toEqual([category.id]);
  });
});
