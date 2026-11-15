// UserPromptSubmit: add short notes for the model now answering, from Anthropic's prompting guide for that model.
// Hooks aren't told the model, so read it from the transcript's latest reply, or settings or env on the first prompt;
// failing both, send every model's notes once and let Claude, whose system prompt names its model, pick its own.
// Notes go in once per model per context: again after /model, and after a fresh start, /clear or /compact,
// which the session hook marks by deleting this session's state file.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { modelState } from './project.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FAMILIES = [[/fable|mythos/, 'fable'], [/opus/, 'opus'], [/sonnet/, 'sonnet']];

function latestModel(transcript) {
  try {
    const fd = fs.openSync(transcript, 'r');
    const size = fs.fstatSync(fd).size;
    const len = Math.min(size, 512 * 1024);
    const buf = Buffer.alloc(len);
    fs.readSync(fd, buf, 0, len, size - len);
    fs.closeSync(fd);
    const ids = [...buf.toString('utf8').matchAll(/"model":"(claude-[^"]+)"/g)].map((m) => m[1]);
    return ids.at(-1) ?? '';
  } catch { return ''; }
}

function configuredModel() {
  if (process.env.ANTHROPIC_MODEL) return process.env.ANTHROPIC_MODEL;
  for (const f of ['.claude/settings.local.json', '.claude/settings.json', path.join(os.homedir(), '.claude', 'settings.json')]) {
    try { const m = JSON.parse(fs.readFileSync(f, 'utf8').replace(/^﻿/, '')).model; if (m) return m; } catch {}
  }
  return '';
}

try {
  let input = {};
  try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch {}
  const model = (latestModel(input.transcript_path) || configuredModel()).toLowerCase();
  const family = FAMILIES.find(([re]) => re.test(model))?.[1];
  const known = FAMILIES.some(([re]) => re.test(model)) || /claude-/.test(model);
  if (input.session_id) {
    const state = modelState(input.session_id);
    let last = '';
    try { last = fs.readFileSync(state, 'utf8'); } catch {}
    const note = (f) => fs.readFileSync(path.join(root, 'models', `${f}.md`), 'utf8');
    let context = '';
    // Model not known yet (a first prompt on the account's default model): send every model's notes once, since
    // the system prompt names the model; the next prompt then only records which one it was.
    if (!known && !last) { context = '\nApply only the section below for the model you are.\n' + FAMILIES.map(([, f]) => note(f)).join(''); last = 'all'; }
    else if (last === 'all' && known) last = family ?? 'none';
    else if (known && last !== (family ?? 'none')) { last = family ?? 'none'; if (family) context = note(family); }
    fs.writeFileSync(state, last);
    if (context) process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: context } }));
  }
} catch {
  // Never block a prompt over missing notes.
}
