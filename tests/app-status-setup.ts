// Copyright © 2026 Christopher Snow
import { cp, mkdir, readFile, writeFile, rm, symlink } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
export default async function setup() {
  const root = resolve(".media-work/status-release"),
    source = resolve(".media-work/status-source");
  await rm(root, { recursive: true, force: true });
  await rm(source, { recursive: true, force: true });
  await mkdir(source, { recursive: true });
  for (const path of [
    "src",
    "public",
    "platform",
    "scripts",
    "optional",
    "index.html",
    "package.json",
    "package-lock.json",
    "vite.config.ts",
    "tsconfig.json",
  ])
    await cp(path, resolve(source, path), { recursive: true });
  await symlink(
    resolve("node_modules"),
    resolve(source, "node_modules"),
    "dir",
  );
  // A genuine second build has a changed production asset, not edited bundle text or a fake worker version.
  await writeFile(
    resolve(source, "public/app-status-release-fixture.txt"),
    "Second real asset set for update verification.\n",
  );
  const release = JSON.parse(await readFile("dist/release.json", "utf8"));
  execFileSync("npm", ["run", "build"], {
    cwd: source,
    env: { ...process.env, GITHUB_SHA: release.commit ?? "" },
    stdio: "pipe",
  });
  await cp(resolve(source, "dist"), root, { recursive: true });
}
