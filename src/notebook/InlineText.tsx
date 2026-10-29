// Copyright © 2026 Christopher Snow
import { Fragment } from "react";
import "./inline-text.css";

// Only authored teaching copy uses this small inline vocabulary. Logs and learner
// input remain plain text; HTML, links and block markup are never interpreted.
// **term** marks a term being defined, rather than general-purpose emphasis.
export function InlineText({ children }: { children: string }) {
  return children.split(/(`[^`\n]+`|\*\*[^*\n]+\*\*)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
      <code key={i}>{part.slice(1, -1)}</code>
    ) : part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <dfn className="notebook-definition" key={i}>
        {part.slice(2, -2)}
      </dfn>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
