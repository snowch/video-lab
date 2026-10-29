// Copyright © 2026 Christopher Snow
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { InlineText } from "./InlineText";

describe("authored inline teaching copy", () => {
  it("makes definitions and literal output distinguishable without accepting HTML", () => {
    const text = 'A **container** holds `Stream #0:0`. <img onerror="bad">';
    expect(
      renderToStaticMarkup(
        createElement("p", null, createElement(InlineText, { children: text })),
      ),
    ).toBe(
      '<p>A <dfn class="notebook-definition">container</dfn> holds <code>Stream #0:0</code>. &lt;img onerror=&quot;bad&quot;&gt;</p>',
    );
  });
  it("keeps markup inside literal code literal and preserves unfinished notation", () => {
    expect(
      renderToStaticMarkup(
        createElement(InlineText, {
          children: "`**literal**` **unfinished `open",
        }),
      ),
    ).toBe("<code>**literal**</code> **unfinished `open");
  });
});
