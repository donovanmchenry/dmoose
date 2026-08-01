# Configure Dmoose

## Recommended: Let the Assistant Lead

Open the Dmoose folder in Codex or another file-aware assistant and say:

> Set up this second brain with me.

The assistant must follow [the guided onboarding](ONBOARDING.md). It will ask a few
questions at a time, explain the privacy boundary, summarize what it understood, and
wait for confirmation before creating personal files. No terminal, Node.js, npm, Git,
or Obsidian setup is required.

The onboarding is not finished when files exist. The assistant will also help with
one real starter outcome—usually planning the top priority, organizing one project,
or structuring a small set of existing notes.

## Optional: Basic Terminal Wizard

If you prefer a command line and already have Node.js 20 or newer, run:

```bash
npm run setup
```

The wizard asks only for a preferred name, broad role, timezone, current focus, and
communication preference. Its answers stay in gitignored local files. Edit `USER.md`
and `NOW.md` directly at any time; both are ordinary Markdown. The terminal wizard is
a basic fallback and does not replace the richer guided conversation.

## Connect Projects

Copy `projects/project-template.md` to `projects/<project-id>.md`, fill in only stable,
non-sensitive facts, and add a link in `projects/index.md`.

For a repository outside Dmoose, copy `projects/local-paths.example.md` to
`projects/local-paths.md` and record its machine-specific path there. This file is
gitignored. Never move another repository into Dmoose just to connect it.

## Add Durable Knowledge

Start at `wiki/index.md` and follow `wiki/SCHEMA.md`. A good durable note states the
claim, whether it is confirmed or inferred, and where it came from. Current tasks and
short-lived status belong in `NOW.md`, not the wiki.

## Choose a Sync Model

The safe default is local-only personal configuration with a public starter repo.

- **Public repository:** keep personal facts in ignored files only. Track reusable
  structure and non-sensitive notes.
- **Private repository:** after changing GitHub visibility and reviewing the files,
  you may choose to sync selected personal context. Remove an ignore rule only when
  the owner understands that the file will enter Git history.
- **No Git sync:** Dmoose still works as a normal local folder or Obsidian vault.

Secrets and credentials never belong in Dmoose under any sync model.

## Validate Changes

When Node.js is already available, run `npm run validate` before a commit. It verifies
required files, relative links, wiki and project indexes, placeholder leakage, and the
local-only privacy boundary. Without Node.js, the assistant should review those same
boundaries manually; missing tooling must not block setup.

## Reuse This Pattern for Another Person

When making another second brain from Dmoose:

1. Remove all owner-specific files and confirm `USER.md` and `NOW.md` are absent.
2. Keep the first-run gate in `AGENTS.md` and the full `ONBOARDING.md` workflow.
3. Replace branding without weakening the privacy defaults.
4. Test from a fresh copy by asking the assistant to set it up. The assistant should
   begin with questions, not installation commands.
5. Do not call the test complete until the assistant creates confirmed local context
   and begins one useful real-world workflow with the new owner.
