
## Coding
- Tests guard behavior that could realistically break, such as logic, parsing, money, auth or data loss. A bug fix gets one test that reproduces the bug. Extend the existing tests and follow their patterns. Never weaken a test to make it pass.
- Put code where it's used: a page's or component's own styles, scripts and tests live with it, using the stack's scoping (CSS modules, scoped styles) where it has one. The moment a second page needs the same rule or helper, move it to the shared file instead of copying it. Shared files hold only what several use: design tokens, base styles, common parts. Colors, sizes and spacing come from tokens, not repeated literal values.
- Group by feature, not one flat folder. When a change would push a file past about 500 lines, or it already does several unrelated jobs, split it along those jobs in the same change.
- Git history is the record of what's done. Don't keep a progress log in the repo; if the project keeps a to-do list, update it in the same commit as the work it tracks, never in a commit of its own. Don't make a tracked file record the id of the commit that changes it: that forces a second commit every time.
- Comments match the density of the surrounding code and explain why, not what. Update existing docs in place when behavior changes.
- Look at the real result: run it (`/run`), and for UI, open it in a browser.
- Before calling a multi-file or risky change done, run `/code-review` for a fresh-context review, and fix only its correctness findings.
