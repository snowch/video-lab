// Copyright © 2026 Christopher Snow
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { ProbeGuide } from "./InspectDiagrams";

it("quotes file duration and bitrate separately from picture and sound fields", () => {
  const html = renderToStaticMarkup(createElement(ProbeGuide));
  expect(html).toContain("Duration: 00:00:08.00 … bitrate: 352 kb/s");
  expect(html).toContain("Stream #0:0 … Video: h264 … 854x480 … 24 fps");
  expect(html).not.toContain("… 0x1 …");
  expect(html).toContain("Stream #0:1 … Audio: aac … 48000 Hz");
});
