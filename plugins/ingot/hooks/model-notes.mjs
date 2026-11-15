// UserPromptSubmit: add notes for the model this session runs on (models/<name>.md), from Anthropic's prompting
// guide for that model. Added once per session, and again after a /model switch, /clear or /compact
// (SessionStart with argv[2] = reset forgets what was added). The model shows in the transcript only after its
// first reply, so until then every model's notes go in, each labeled.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'models');
const MODELS = { 'fable-5-2': 'Claude Fable 5.2', 'opus-5-5': 'Claude Opus 5.5', 'sonnet-5-5': 'Claude Sonnet 5.5' };
const known = (id) => Object.keys(MODELS).find((k) => id?.toLowerCase().includes(k)) ?? '';

// The last assistant message's model, read from the end of the transcript (it can be many MB).
function transcriptModel(file) {
  if (!file) return '';
  try {
    const fd = fs.openSync(file, 'r');
    const size = fs.fstatSync(fd).size, len = Math.min(size, 1 << 20), buf = Buffer.alloc(len);
    fs.readSync(fd, buf, 0, len, size - len);
    fs.closeSync(fd);
    const ids = [...buf.toString('utf8').matchAll(/"model":"([^"]+)"/g)].map((m) => m[1]).filter((m) => m !== '<synthetic>');
    return ids.at(-1) ?? '';
  } catch { return ''; }
}

try {
  let input = {};
  try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch {}
  const state = path.join(os.tmpdir(), `ingot-model-${String(input.session_id ?? 'none').replace(/[^\w-]/g, '')}`);
  if (process.argv[2] === 'reset') { fs.rmSync(state, { force: true }); process.exit(0); }
  const id = known(transcriptModel(input.transcript_path)) || known(process.env.ANTHROPIC_MODEL);
  let added = '';
  try { added = fs.readFileSync(state, 'utf8'); } catch {}
  // 'all' means the labeled set went in before the model was known; the first known model replaces it.
  if (id ? added === id : added) process.exit(0);
  const notes = (k) => fs.readFileSync(path.join(dir, `${k}.md`), 'utf8').trim();
  const context = id
    ? `## Notes for ${MODELS[id]}\nYou are running on ${MODELS[id]}; these come from Anthropic's prompting guide for it.\n${notes(id)}\n`
    : `## Notes per model\nFollow only the section for the model you are running on.\n${Object.entries(MODELS).map(([k, name]) => `### ${name}\n${notes(k)}`).join('\n')}\n`;
  fs.writeFileSync(state, id || 'all');
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: context } }));
} catch {
  // Never block a prompt over a missing notes file.
}
