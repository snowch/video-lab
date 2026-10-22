// Copyright © 2026 Christopher Snow
// Absolute base URL for same-origin vendored assets, honouring the /video-lab/
// GitHub Pages base path.
export const base = new URL(
  import.meta.env.BASE_URL,
  globalThis.location?.href ?? "http://localhost/",
).href;
