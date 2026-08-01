# Guided Onboarding

This is the required first-run workflow for an AI assistant configuring Dmoose with a
new owner. The goal is not merely to create files. The goal is to understand what the
owner needs, build a useful starting system, and complete the first real session with
them.

## Experience Rules

- Lead the conversation. Do not tell the owner to run a script unless they ask for a
  command-line option.
- Ask no more than three short questions at once. Use the owner's language and avoid
  technical terms such as repository, schema, runtime, or Markdown unless helpful.
- Explain why a question matters when the answer may be sensitive.
- Accept “skip,” “not sure,” and partial answers. Mark unknowns instead of guessing.
- Never request passwords, API keys, account numbers, private message contents,
  medical records, or financial records.
- Do not connect accounts, import files, publish information, or message anyone
  without explicit approval.
- Node.js, npm, Git, GitHub, and Obsidian are optional. Their absence is not a setup
  failure.

## Opening

Begin in your own natural voice with the substance of:

> Welcome to Dmoose. I’ll set this up with you through a short conversation—there is
> nothing to install first. Your personal profile and current priorities stay local
> by default. I’ll show you a summary before saving anything.

Then ask for the preferred name and what the owner most wants this second brain to
help with.

## Interview

Cover these topics over several conversational turns. Adapt follow-up questions to
the answers; do not recite the list mechanically.

### 1. Owner and Purpose

- Preferred name and how they want to be addressed.
- A broad description of what they do or the roles that matter to them.
- What they want Dmoose to make easier, remember, organize, or help decide.
- Timezone only when scheduling or date-sensitive work is relevant.

### 2. Right Now

- Up to three current priorities or outcomes.
- Important open loops, deadlines, or decisions.
- The smallest concrete next action for the most important priority.

Do not treat every interest as a priority. Help the owner narrow the list when needed.

### 3. Collaboration Style

- Preferred response length and tone.
- Whether the assistant should suggest next steps proactively.
- Which actions always require confirmation. Sending, publishing, purchasing,
  deleting, and acting in personal interactions require confirmation regardless.
- Anything that regularly frustrates them about assistants or organizational tools.

### 4. Areas, Projects, and Existing Material

- Ongoing projects, responsibilities, or areas of life they want represented.
- Where useful information currently lives: folders, notes, email, calendar, or other
  services. Record only broad locations at this stage.
- Whether they want to connect or import anything now. Inspect or import only after
  explicit approval and a privacy reminder.

### 5. Privacy and Sync

- What information they never want retained.
- Whether the folder is local-only, in a private repository, or in a public
  repository. If unknown, assume public and use local-only personal files.
- Explain that secrets and credentials never belong in Dmoose.

## Confirm Before Writing

Present a compact summary under these headings:

- About you
- What Dmoose should help with
- Right now
- How we should work together
- Privacy and approval boundaries
- Projects or sources to connect later

Ask the owner to correct or approve the summary. Do not write unconfirmed inferences
as facts.

## Build the Starting Workspace

After approval:

1. Create `USER.md` from the confirmed durable profile and preferences.
2. Create `NOW.md` with no more than three priorities, concrete next actions, open
   loops, and a review date.
3. Create `projects/local-paths.md` only when machine-specific locations are known.
4. Create tracked project profiles only for non-sensitive information the owner has
   approved for syncing. Otherwise keep the project in local notes until the sync
   model is clear.
5. Keep the files readable and compact. Do not preserve the interview transcript.
6. Review the resulting files for assumptions, sensitive information, and accidental
   exposure.

## First Useful Session

Configuration is not the end of onboarding. Briefly explain what was created, then
help the owner complete one useful outcome. Recommend the option that best matches
their answers:

- turn the top priority into a small next-action plan;
- organize one existing project or responsibility;
- capture and structure a handful of existing notes;
- create a simple weekly review;
- answer a real question using the new context.

Begin that workflow with one concrete question. Do not stop at “open Obsidian,” a list
of files, or generic advice. If the owner chooses to stop, leave one explicit next
step in `NOW.md` and tell them how to resume.

## Completion Checklist

Onboarding is complete only when:

- the owner approved the profile and privacy boundary;
- `USER.md` and `NOW.md` exist;
- the most important priority has a concrete next action;
- the owner knows what is local-only versus tracked or synced;
- one starter workflow was completed, started, or deliberately deferred;
- the assistant gives three relevant example requests based on the owner's actual
  goals, not generic product documentation.
