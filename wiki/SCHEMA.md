# Wiki Schema

This file is the operating contract for Dmoose's long-term knowledge. The wiki is a
small, maintained set of interlinked Markdown pages, not an activity dump.

## Ownership

1. `raw/` holds approved source records or origin notes. Treat retained sources as
   immutable.
2. `pages/` holds maintained synthesis about durable subjects and relationships.
3. `index.md` links every durable page and summarizes its purpose.
4. `inbox.md` queues evidence that is not yet verified or synthesized.
5. `log.md` records meaningful wiki changes oldest first.

Personal identity and working preferences belong in the local `USER.md`. Short-lived
priorities belong in the local `NOW.md`. Current project state belongs in `projects/`
or the project repository.

## Page Rules

- Use lowercase kebab-case filenames under `pages/`.
- Give each durable subject one canonical page and extend it over time.
- Link the first useful mention of related subjects with relative Markdown links.
- Add every durable page to `index.md`; do not leave orphan pages.
- Separate confirmed observation from inference and label uncertainty.
- Every consequential claim needs provenance: a retained source, canonical workspace
  file, stable URL, or explicit user confirmation with a date.
- Do not store secrets, credentials, private message bodies, or sensitive raw data.
- Because this repository is public by default, keep personal knowledge local unless
  the owner deliberately changes the repository to private and approves syncing it.

Use this shape when helpful:

```markdown
# Page Title

## Summary

Current synthesis.

## Details

Durable facts, relationships, decisions, or implications.

## Open Questions

- Unresolved uncertainty or follow-up.

## Sources

- Source: `<relative path or stable URL>` — what it supports; confirmed YYYY-MM-DD.
```

## Ingest Workflow

1. Confirm that the source may be retained and record its provenance.
2. Read `index.md` and only the smallest relevant set of existing pages.
3. Put ambiguous or unverified evidence in `inbox.md`.
4. Integrate confirmed evidence into the narrowest canonical page.
5. Update affected links and the page summary in `index.md`.
6. Append a concise entry to `log.md`.
7. Run `npm run validate` and review the diff for private data.

## Query Workflow

1. Read `index.md` first and follow only relevant links.
2. Read `USER.md` only when personal context matters.
3. Verify uncertain or time-sensitive claims against their sources.
4. Cite the local pages and sources used; distinguish facts from inference.
5. Propose a narrow update when an answer creates durable new knowledge.

## Inbox Format

```markdown
## YYYY-MM-DD — Short label

- Source: relative path, stable URL, or user confirmation
- Status: unverified | ambiguous | awaiting synthesis | blocked
- Related pages: links or `none yet`
- Notes: what is known and what must be resolved
```

## Log Format

```markdown
## [YYYY-MM-DD] action | Short title

- Sources: paths, URLs, user confirmation, or `none`
- Pages: links to affected wiki pages
- Summary: what changed or what the review found
```

Use one of `setup`, `ingest`, `update`, `query`, or `lint` for `action`.
