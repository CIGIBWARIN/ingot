mkdir -p .claude && echo '{"env":{"INGOT_CATEGORY":"coding"}}' > .claude/settings.json
cat > index.html <<'H'
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Home</title><link rel="stylesheet" href="styles.css"></head>
<body><nav><a href="index.html">Home</a></nav><h1>Welcome</h1></body></html>
H
cat > styles.css <<'C'
:root { --ink: #1d1d1f; --accent: #0a6cff; --space: 1rem; }
body { margin: 0; padding: var(--space); font-family: system-ui, sans-serif; color: var(--ink); }
a { color: var(--accent); }
C
