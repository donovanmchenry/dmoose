# Dmoose Workspace Guide

Dmoose is a private-by-default second brain: one portable place for personal context,
current priorities, project discovery, and durable knowledge. Keep the structure
simple enough to browse as ordinary Markdown and useful across AI tools.

## Start of a Task

1. Read `USER.md` when it exists and personal context or preferences matter.
2. Read `NOW.md` when the task concerns current priorities or commitments.
3. Start project discovery at `projects/index.md`.
4. Start durable knowledge lookup at `wiki/index.md` and follow only relevant links.
5. If setup has not run, treat `USER.example.md` and `NOW.example.md` only as blank
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

Run `npm run validate` after structural changes. The same check runs in GitHub Actions.
