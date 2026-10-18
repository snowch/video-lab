// Copyright © 2026 Christopher Snow
import { chromium } from "playwright";
import { readFile, copyFile } from "node:fs/promises";
const svg = await readFile("public/icons/video-lab.svg", "utf8");
const browser = await chromium.launch();
try {
  for (const size of [32, 180, 192, 512]) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<style>body{margin:0}svg{display:block;width:100%;height:100%}</style>${svg}`,
    );
    await page.screenshot({ path: `public/icons/icon-${size}.png` });
    await page.close();
  }
  // The solid background and centred mark also meet the maskable safe-zone rule.
  await copyFile(
    "public/icons/icon-512.png",
    "public/icons/icon-maskable-512.png",
  );
} finally {
  await browser.close();
}
