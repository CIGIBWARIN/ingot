---
name: kickoff
description: "Start a new project of any kind (coding, content, agentic or research): find out what it is, pick the simplest setup, produce a real first result, leave a lean CLAUDE.md. Use in an empty folder or for a new idea."
---

# Kickoff

Go from idea to a first real result the user can see, with nothing extra.

## 1. Understand the idea

Ask everything you need in a single batch, using AskUserQuestion if it's available:

- what it is and who it's for
- the category: coding (an app, site, script or extension), content (writing, video, social or design), agentic (an automation or recurring task), or research (sources, data or a report)
- the one result the first version must deliver

Skip anything the user already said.

## 2. Pick the simplest setup

- **Coding:** use the fewest moving parts, such as plain HTML/CSS/JS before a framework and one file before many. Add a database only when data must persist across users or devices, and prefer tools the user already has. A site starts with one shared stylesheet for design tokens and base styles, plus a folder per page or feature holding its own markup, styles and scripts.
- **Content:** a few folders (`drafts/`, `final/`, `assets/`) plus a voice and audience note in CLAUDE.md.
- **Agentic:** one script or workflow file, a dry-run mode, and a log of what each run did. Recurring jobs on local files run with the OS scheduler (or a desktop app scheduled task); `/schedule` is for cloud runs on a GitHub repo.
- **Research:** `sources/` or `data/` for inputs and one output file, with every claim sourced.

State your choice and why in one or two lines, plus one bigger alternative, then proceed. If a pack from `/ingot:specialize` clearly fits, mention it in one line.

## 3. Set up

- Run `git init`, then add a `.gitignore` covering secrets, dependencies and build output.
- For code, put secrets in a `.env` file with a matching `.env.example`.
- Set `env.INGOT_CATEGORY` in `.claude/settings.json` to the category.
- Add CI, Docker, linters, test frameworks or extra scaffolding only when they're needed.
- **If it handles money** (payments, balances, invoices, bookkeeping), build the first version on these rules and write them into CLAUDE.md under "Never break":
  - Amounts are whole minor units (cents) or a fixed-point decimal type, never a float, and each has a currency.
  - Money records are never deleted or edited in place: a correction is a new entry or a void with a reason, and every change records who made it and when.
  - Every page and API route checks sign-in and role on the server, and every id from a URL or form is checked against what that user may see.
  - Card numbers never touch the app: use a payment provider's hosted checkout. Never store or log full card, bank account or government ID numbers; show the last four digits.
  - The app never moves money on its own: a person approves each payment.
  - Totals, tax, interest and rounding have tests with known answers.
  - `/ingot:compliance` runs before real users or real money.

## 4. Produce the first real result

Make the one core thing for real: a running app, a working script, a first draft, a sourced first analysis, or a design that matches its target. For anything visual, use `/ingot:build-to-target`. Then show the user how to see or use it, with the exact command, URL or file path.

## 5. Leave it in good shape

1. Write a CLAUDE.md of 60 lines or fewer: what the project is, who it's for, the checked commands or workflow, and the layout.
2. Create the empty file `.claude/.ingot-checked`.
3. Commit with the message "first version".
4. Suggest the next 3 steps, smallest first.
