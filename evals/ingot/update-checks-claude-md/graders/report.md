---
type: llm
---

The project's CLAUDE.md listed a test command that runs no tests, a line about a `docs_build/` folder that doesn't exist, and the user's own rule about British English. The user asked to skip the shared updates.
PASS if the reply reports checking the project: it removed the `docs_build/` line, kept the user's rule, and either fixed the test command (for example to pytest) or reports that it finds no tests. It must not claim to have updated Claude Code, Ingot or plugins. FAIL otherwise.
