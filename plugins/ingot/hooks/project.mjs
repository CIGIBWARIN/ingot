// Shared folder checks for the Ingot hooks.
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

export function safeList(dir) { try { return fs.readdirSync(dir); } catch { return []; } }

const MANIFESTS = ['package.json', 'pyproject.toml', 'requirements.txt', 'Cargo.toml', 'go.mod', 'pom.xml', 'build.gradle', 'composer.json', 'Gemfile', 'Makefile', 'manifest.json'];
const SOURCE = /\.(py|js|mjs|ts|tsx|jsx|ps1|sh|go|rs|java|kt|cs|csproj|sln|rb|php|swift|c|cpp|h)$/;

// A folder is a code project if it has a build manifest or source files at the top level.
export function isCodeProject(dir = '.') {
  const files = safeList(dir);
  return files.some((f) => MANIFESTS.includes(f) || SOURCE.test(f));
}

// Which model's notes model-notes.mjs last added in this session; session-rules.mjs deletes it when the context starts fresh.
export const modelState = (id) => path.join(os.tmpdir(), `ingot-model-${String(id).replace(/[^\w-]/g, '')}`);
