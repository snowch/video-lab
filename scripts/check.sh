#!/usr/bin/env bash
# Copyright © 2026 Christopher Snow
set -euo pipefail
npx prettier --check .
node scripts/copyright.mjs
node scripts/sync-platform.mjs --check
npx tsc --noEmit
npm run test
npm run media:verify
node scripts/module2-media.mjs
node scripts/journey-media.mjs
node scripts/verify-workbench.mjs
node scripts/verify-teaching.mjs
node scripts/verify-notebook.mjs
npm run build
npm run test:browser
