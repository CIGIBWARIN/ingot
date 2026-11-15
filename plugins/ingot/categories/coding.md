
## Coding
- Tests guard behavior that could realistically break, such as logic, parsing, money, auth or data loss. A bug fix gets one test that reproduces the bug. Extend the existing tests and follow their patterns. Never weaken a test to make it pass.
- Put code where it's used: a page's or component's own styles, scripts and tests live with it, using the stack's scoping (such as CSS modules) where it has one. When a second place needs the same rule or helper, move it to the shared file instead of copying it. Colors, sizes and spacing come from design tokens, not repeated values.
- Group files by feature. Split a file along its jobs when a change would push it past about 500 lines.
- Git history is the record of what's done: no progress log in the repo, a to-do list changes in the same commit as the work, and no file records the id of the commit that changes it.
- Comment only what the code can't say: why, never what. Most code needs none. Update existing docs in place when behavior changes.
- Look at the real result: run it (`/run`), and for UI, open it in a browser.
- Before calling a multi-file or risky change done, run `/code-review` for a fresh-context review, and fix only its correctness findings.
