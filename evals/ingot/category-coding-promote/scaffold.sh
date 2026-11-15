mkdir -p .claude && echo '{"env":{"INGOT_CATEGORY":"coding"}}' > .claude/settings.json
cat > styles.css <<'C'
:root { --ink: #1d1d1f; --accent: #0a6cff; --paper: #fff; --space: 1rem; }
body { margin: 0; padding: var(--space); font-family: system-ui, sans-serif; color: var(--ink); }
a { color: var(--accent); }
C
cat > about.html <<'H'
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>About</title><link rel="stylesheet" href="styles.css">
<style>
  .card { background: var(--paper); border-radius: 12px; padding: calc(var(--space) * 2); box-shadow: 0 2px 12px rgb(0 0 0 / .08); max-width: 40rem; }
</style></head>
<body><nav><a href="about.html">About</a></nav><div class="card"><h1>About us</h1><p>We build things.</p></div></body></html>
H
