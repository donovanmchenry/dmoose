#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rawArgs = process.argv.slice(2);
const flags = new Map();

for (let index = 0; index < rawArgs.length; index += 1) {
  const argument = rawArgs[index];
  if (!argument.startsWith("--")) continue;
  const [rawKey, inlineValue] = argument.slice(2).split("=", 2);
  if (inlineValue !== undefined) flags.set(rawKey, inlineValue);
  else if (rawArgs[index + 1] && !rawArgs[index + 1].startsWith("--")) {
    flags.set(rawKey, rawArgs[index + 1]);
    index += 1;
  } else flags.set(rawKey, true);
}

if (flags.has("help")) {
  console.log(`Dmoose setup

Usage:
  npm run setup
  node scripts/setup.mjs --defaults [--force]
  node scripts/setup.mjs --name "Name" --role "Role" --focus "Focus"

Options:
  --name            Preferred name
  --role            Broad role or short self-description
  --timezone        IANA timezone, such as America/New_York
  --focus           One current area of focus
  --communication   Preferred response style
  --defaults        Use privacy-safe placeholder defaults without prompting
  --force           Replace existing USER.md and NOW.md
  --help            Show this help`);
  process.exit(0);
}

const nonInteractive = flags.has("defaults");
const readline = nonInteractive
  ? null
  : createInterface({ input: process.stdin, output: process.stdout });

function clean(value, fallback) {
  const normalized = String(value ?? "").replace(/\s+/g, " ").trim();
  return normalized || fallback;
}

async function ask(key, question, fallback) {
  if (flags.has(key)) return clean(flags.get(key), fallback);
  if (nonInteractive) return fallback;
  const response = await readline.question(`${question} [${fallback}]: `);
  return clean(response, fallback);
}

async function shouldReplace(paths) {
  const existing = paths.filter((file) => fs.existsSync(file));
  if (existing.length === 0 || flags.has("force")) return true;

  const names = existing.map((file) => path.relative(root, file)).join(", ");
  if (nonInteractive) {
    console.error(`Setup stopped: ${names} already exists. Use --force to replace it.`);
    return false;
  }

  const response = await readline.question(
    `${names} already exists. Replace the existing local profile? [y/N]: `,
  );
  return /^y(es)?$/i.test(response.trim());
}

const userPath = path.join(root, "USER.md");
const nowPath = path.join(root, "NOW.md");

if (!(await shouldReplace([userPath, nowPath]))) {
  readline?.close();
  process.exit(nonInteractive ? 1 : 0);
}

console.log("\nDmoose keeps these answers in gitignored local files by default.\n");

const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
const name = await ask("name", "Preferred name", "Your name");
const role = await ask("role", "What do you do, in a few words", "Not set yet");
const timezone = await ask("timezone", "Timezone", detectedTimezone);
const focus = await ask("focus", "Most important current focus", "Choose a current focus");
const communication = await ask(
  "communication",
  "How should assistants communicate",
  "Practical and concise, with clear next steps",
);
readline?.close();

const today = new Date().toISOString().slice(0, 10);
const userProfile = `# User Profile

Generated locally by \`npm run setup\` on ${today}. This file is gitignored. Keep it
compact and update it only with durable, user-confirmed information.

## Identity

- Preferred name: ${name}
- What I do: ${role}
- Timezone: ${timezone}

## Current Focus

- ${focus}

## Working Preferences

- Communication: ${communication}.
- Initiative: Be proactive with analysis, organization, drafting, and reversible work.
- Approval boundary: Ask before sending, publishing, purchasing, deleting, or acting
  on my behalf.

## Workspace Purpose

Dmoose is my file-based second brain for personal context, projects, current
priorities, and durable knowledge.

## Privacy

- Do not store secrets or credentials here.
- Ask before retaining sensitive or consequential personal information.
- Prefer confirmed facts and mark uncertainty explicitly.
`;

const nowPage = `# Right Now

Last reviewed: ${today}

## Current Focus

- ${focus}

## Next Actions

- [ ] Choose the next concrete action.

## Open Loops

- None recorded yet.

## Later

- None recorded yet.
`;

fs.writeFileSync(userPath, userProfile, { encoding: "utf8", mode: 0o600 });
fs.writeFileSync(nowPath, nowPage, { encoding: "utf8", mode: 0o600 });

const localPaths = path.join(root, "projects", "local-paths.md");
if (!fs.existsSync(localPaths)) {
  fs.copyFileSync(path.join(root, "projects", "local-paths.example.md"), localPaths);
  fs.chmodSync(localPaths, 0o600);
}

const validation = spawnSync(process.execPath, [path.join(root, "scripts", "validate-workspace.mjs")], {
  cwd: root,
  encoding: "utf8",
});

if (validation.stdout.trim()) console.log(`\n${validation.stdout.trim()}`);
if (validation.status !== 0) {
  if (validation.stderr.trim()) console.error(validation.stderr.trim());
  process.exit(validation.status ?? 1);
}

console.log(`
Setup complete.

Next:
  1. Open Dashboard.md.
  2. Review USER.md and NOW.md.
  3. Read CONFIGURATION.md before syncing personal information.
`);
