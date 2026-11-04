---
name: delegate
description: Coordinate one request across several projects, folders or parts ("do X in each of these", "update all my repos") by splitting it into well-briefed sessions or subagents, then checking each result before reporting. Use when one task fans out to several independent places.
---

# Delegate

Goal: one request, done in several places, with every piece briefed well enough to run without you and checked before you call it done. The helpers know only what their brief says, and their reports can be wrong, so the brief and the check are the whole job.

## 1. Settle the jobs (read-only)

1. List the targets: each project, folder or repo the request covers. If the user named a parent folder, list what's in it and ask which ones count.
2. For each target, look before you brief: is it in git, which branch, is the working tree clean (uncommitted changes may be another session's), what's the check that proves it works (tests, a build, a command), and is anything else running there.
3. Split the work into jobs. One job per target is the default. Merge jobs that touch the same files, and order any job that needs another one's result after it.
4. If a target is small (a handful of commands), do it yourself instead of delegating it, unless the user asked for the work to be split up.

## 2. Write each brief

Every brief is self-contained, in your own words, and has these five parts:

1. **Goal and scope:** what to change, in which folder, and what done looks like.
2. **Off limits:** files, branches, services and accounts it must not touch. Always include: leave uncommitted changes it didn't make alone, never push, deploy, merge, publish or send anything, and don't install or remove tools globally.
3. **Stay undoable:** in git, work on a new branch named for the job (or a worktree if the checkout is busy) and commit there. Outside git, copy what it will change to a restore folder first and say where. If a branch or worktree can't be made, it says so and falls back to a restore copy (or only new files, which are undone by deleting them) instead of stopping.
4. **Where to run:** the exact folder, and which ports or shared resources it may use (free ports only, never one another job uses).
5. **How done is checked:** the exact command or observation that proves it worked, to run and quote in the report. The report must also list what it changed, what it couldn't verify, and anything it skipped.

## 3. Agree before launching

Show the plan as a table: target, job, where it runs, how it's checked. Say roughly what it costs (each helper is a separate context) and ask once for a go-ahead, unless the user already gave one for this plan. Name any target you left out and why.

## 4. Launch

Use the most suitable tool this surface offers:

- **Separate sessions** when the app can start them (the user can open, steer and review each one). Best for long or independent jobs.
- **Subagents** (the Agent tool, with a worktree when it supports one) when you need the results back in this turn.
- **Sequentially, yourself**, when neither exists.

Run independent jobs in parallel. Never let two jobs write to the same files at the same time.

## 5. Check every result

A report is a claim, not proof. For each job:

1. Look at what actually changed: the branch's diff or the changed files.
2. Run the job's check yourself, or confirm the report quotes its real output.
3. Confirm it stayed inside its brief: right folder, its own branch, nothing off limits touched, nothing pushed.
4. If it failed or drifted, send it one follow-up with the exact problem, or fix it yourself. After a second failure, mark it failed and move on.

## 6. Report

One line per target: ✅ done and verified (with the check you ran), ⚠️ done but not verified (and why), or ❌ failed (and why). Then say where each piece is (branch, folder, restore copy) and list what needs the user: merges, pushes, deploys, or decisions. Do none of those without an explicit yes.
