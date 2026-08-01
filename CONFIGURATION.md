# Configure Dmoose

## 1. Create the Local Profile

Run:

```bash
npm run setup
```

The wizard asks only for a preferred name, broad role, timezone, current focus, and
communication preference. Its answers stay in gitignored local files. Edit `USER.md`
and `NOW.md` directly at any time; both are ordinary Markdown.

## 2. Connect Projects

Copy `projects/project-template.md` to `projects/<project-id>.md`, fill in only stable,
non-sensitive facts, and add a link in `projects/index.md`.

For a repository outside Dmoose, copy `projects/local-paths.example.md` to
`projects/local-paths.md` and record its machine-specific path there. This file is
gitignored. Never move another repository into Dmoose just to connect it.

## 3. Add Durable Knowledge

Start at `wiki/index.md` and follow `wiki/SCHEMA.md`. A good durable note states the
claim, whether it is confirmed or inferred, and where it came from. Current tasks and
short-lived status belong in `NOW.md`, not the wiki.

## 4. Choose a Sync Model

The safe default is local-only personal configuration with a public starter repo.

- **Public repository:** keep personal facts in ignored files only. Track reusable
  structure and non-sensitive notes.
- **Private repository:** after changing GitHub visibility and reviewing the files,
  you may choose to sync selected personal context. Remove an ignore rule only when
  the owner understands that the file will enter Git history.
- **No Git sync:** Dmoose still works as a normal local folder or Obsidian vault.

Secrets and credentials never belong in Dmoose under any sync model.

## 5. Validate Changes

Run `npm run validate` before every commit. It verifies required files, relative links,
wiki and project indexes, placeholder leakage, and the local-only privacy boundary.
