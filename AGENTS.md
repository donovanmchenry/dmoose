# Dmoose Workspace Guide

Dmoose is a private-by-default second brain: one portable place for personal context,
current priorities, project discovery, and durable knowledge. Keep the structure
simple enough to browse as ordinary Markdown and useful across AI tools.

## First-Run Gate

Treat setup as a guided conversation, not a command-line installation.

If either `USER.md` or `NOW.md` is missing and the user asks to set up, configure,
personalize, start using, or build out Dmoose:

1. Welcome the user and immediately follow `ONBOARDING.md`.
2. Ask short, plain-language questions in small groups. Do not hand the user a form.
3. Do not require Node.js, npm, Obsidian, Git, or any other tool. Create the Markdown
   files directly from confirmed answers.
4. Explain the privacy boundary before retaining personal information.
5. Confirm the proposed profile and priorities before writing them.
6. Complete one useful starter workflow with the user after configuration. Do not end
   setup by merely telling them to open Obsidian or read the documentation.

If the user asks an unrelated read-only question, answer it and briefly offer guided
setup. If the user declines setup, continue without inventing personal context.

## Start of a Task

1. Apply the first-run gate before ordinary workspace work.
2. Read `USER.md` when it exists and personal context or preferences matter.
3. Read `NOW.md` when the task concerns current priorities or commitments.
4. Start project discovery at `projects/index.md`.
5. Start durable knowledge lookup at `wiki/index.md` and follow only relevant links.
6. If setup has not run, treat `USER.example.md` and `NOW.example.md` only as blank
   templates, never as facts about the user.

## Memory Rules

- Update `USER.md` only with compact, durable, user-confirmed information.
- Update `NOW.md` for short-lived priorities, open loops, and the next few outcomes.
- For durable facts, decisions, and relationships, follow `wiki/SCHEMA.md`.
- Project source remains authoritative for current code and operational state.
- Keep secrets, credentials, private message bodies, health details, financial data,
  and other sensitive source material out of tracked files.
- Mark uncertainty instead of turning guesses into memory.

## Project Rules

- `projects/index.md` is the tracked discovery map.
- `projects/<project-id>.md` contains stable, non-sensitive project profiles.
- `projects/local-paths.md` maps external projects to this machine and is gitignored.
- Do not move, rewrite, or combine independent repositories into Dmoose.

## Working Style

- Match the confirmed preferences in `USER.md`.
- Prefer practical, concise help and reversible changes.
- Never send messages, publish content, spend money, delete data, or act in personal
  interactions without explicit approval.
- Ask before storing sensitive or consequential personal information.
- Use plain Markdown links and text search; do not add a database unless the user
  explicitly chooses that complexity.

## Validation

Run `npm run validate` after structural changes when Node.js is already available. If
it is not available, inspect required files, links, and privacy boundaries manually.
Missing developer tooling must never block or interrupt onboarding. The automated
check also runs in GitHub Actions.
