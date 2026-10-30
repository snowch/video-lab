// Copyright © 2026 Christopher Snow
export type CommandReferenceEntry = {
  id: string;
  name: string;
  summary: string;
  example: string;
  detail: string;
  href: string;
  link: string;
  aliases?: readonly string[];
  /** Literal command options covered by this entry, for inventory checks. */
  options?: readonly string[];
};
export type CommandReferenceGroup = {
  id: string;
  title: string;
  intro?: string;
  entries: readonly CommandReferenceEntry[];
};

export function filterCommandReference(
  groups: readonly CommandReferenceGroup[],
  query: string,
  category: string,
) {
  const words = query.trim().toLocaleLowerCase("en").split(/\s+/);
  return groups
    .filter((group) => !category || group.id === category)
    .map((group) => ({
      ...group,
      entries: group.entries.filter((entry) => {
        const text = [
          group.title,
          entry.name,
          entry.summary,
          entry.example,
          entry.detail,
          entry.link,
          ...(entry.aliases ?? []),
          ...(entry.options ?? []),
        ]
          .join(" ")
          .toLocaleLowerCase("en");
        return words.every((word) => text.includes(word));
      }),
    }))
    .filter((group) => group.entries.length);
}
