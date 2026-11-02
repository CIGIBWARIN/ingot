---
type: regex
target: {source: file, path: CLAUDE.md}
# Matches only when docs_build appears nowhere in the file.
pattern: '^(?![\s\S]*docs_build)'
---
