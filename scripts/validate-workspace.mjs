#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const required = [
  "AGENTS.md",
  "README.md",
  "CONFIGURATION.md",
  "Dashboard.md",
  "USER.example.md",
  "NOW.example.md",
  "projects/index.md",
  "wiki/index.md",
  "wiki/SCHEMA.md",
  "wiki/log.md",
];
const skippedDirectories = new Set([".git", ".obsidian", "node_modules", ".trash"]);
const optionalLocalFiles = new Set([
  "USER.md",
  "NOW.md",
  "projects/local-paths.md",
  "config/local.json",
  "runtime/automation-status.md",
]);
const privateByDefault = ["USER.md", "NOW.md", "projects/local-paths.md", "config/local.json"];
const textExtensions = new Set([".md", ".json", ".mjs", ".yml", ".yaml", ".svg"]);

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (skippedDirectories.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) errors.push(`Missing required file: ${relative}`);
}

const allFiles = walk(root);
const markdownFiles = allFiles.filter((file) => file.endsWith(".md"));
const markdownLink = /\[[^\]]*\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const relativeFile = path.relative(root, file);
  const contents = fs.readFileSync(file, "utf8");
  for (const match of contents.matchAll(markdownLink)) {
    let target = match[1].trim();
    if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
    target = target.split("#", 1)[0].split("?", 1)[0];
    if (!target || /^(https?:|mailto:|tel:|codex:|obsidian:|app:)/i.test(target)) continue;
    let decoded = target;
    try { decoded = decodeURIComponent(target); } catch {}
    const resolved = path.resolve(path.dirname(file), decoded);
    const relativeTarget = path.relative(root, resolved);
    if (optionalLocalFiles.has(relativeTarget)) continue;
    if (!fs.existsSync(resolved)) errors.push(`${relativeFile}: broken link -> ${match[1]}`);
  }
}

if (fs.existsSync(path.join(root, "wiki", "index.md"))) {
  const wikiIndex = fs.readFileSync(path.join(root, "wiki", "index.md"), "utf8");
  const wikiPages = fs.readdirSync(path.join(root, "wiki", "pages"))
    .filter((name) => name.endsWith(".md"));
  for (const page of wikiPages) {
    if (!wikiIndex.includes(`pages/${page}`)) {
      errors.push(`wiki/index.md does not link wiki/pages/${page}`);
    }
  }
}

if (fs.existsSync(path.join(root, "projects", "index.md"))) {
  const projectIndex = fs.readFileSync(path.join(root, "projects", "index.md"), "utf8");
  const excludedProjects = new Set([
    "README.md",
    "index.md",
    "project-template.md",
    "local-paths.md",
    "local-paths.example.md",
  ]);
  const projectProfiles = fs.readdirSync(path.join(root, "projects"))
    .filter((name) => name.endsWith(".md") && !excludedProjects.has(name));
  for (const profile of projectProfiles) {
    if (!projectIndex.includes(`(${profile})`)) {
      errors.push(`projects/index.md does not link projects/${profile}`);
    }
  }
}

const exampleLines = fs.readFileSync(path.join(root, "USER.example.md"), "utf8").split(/\r?\n/).length;
if (exampleLines > 100) errors.push(`USER.example.md has ${exampleLines} lines; maximum is 100`);

const gitFiles = spawnSync("git", ["-C", root, "ls-files", "-z"], { encoding: "utf8" });
if (gitFiles.status === 0) {
  const tracked = new Set(gitFiles.stdout.split("\0").filter(Boolean));
  for (const relative of privateByDefault) {
    if (tracked.has(relative)) errors.push(`${relative} is local-only but is tracked by Git`);
  }
}

for (const relative of privateByDefault) {
  const ignored = spawnSync("git", ["-C", root, "check-ignore", "-q", relative]);
  if (ignored.status !== 0) errors.push(`${relative} is not protected by .gitignore`);
}

const privateMarkers = [
  ["dono", "van"].join(""),
  ["mc", "henry"].join(""),
  ["n", "jit"].join(""),
  ["universal", "music", "group"].join(" "),
  ["new", "grad", "notifier"].join(""),
];

for (const file of allFiles.filter((candidate) => textExtensions.has(path.extname(candidate)))) {
  const relativeFile = path.relative(root, file);
  if (optionalLocalFiles.has(relativeFile)) continue;
  const contents = fs.readFileSync(file, "utf8").toLowerCase();
  for (const marker of privateMarkers) {
    if (contents.includes(marker)) errors.push(`${relativeFile}: contains source-owner data`);
  }
}

const privacyPatterns = [
  { label: "Codex deep link", pattern: /codex:\/\/threads\//i },
  { label: "Codex task identifier", pattern: /session\s*id\s*:/i },
  { label: "probable credential", pattern: /(?:api[_-]?key|client[_-]?secret|access[_-]?token)\s*[:=]\s*["'][^"']{8,}/i },
];

for (const file of allFiles.filter((candidate) => textExtensions.has(path.extname(candidate)))) {
  const relativeFile = path.relative(root, file);
  if (optionalLocalFiles.has(relativeFile)) continue;
  const contents = fs.readFileSync(file, "utf8");
  for (const rule of privacyPatterns) {
    if (rule.pattern.test(contents)) errors.push(`${relativeFile}: contains a ${rule.label}`);
  }
}

if (errors.length) {
  console.error(`Dmoose validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Dmoose validation passed: ${markdownFiles.length} Markdown files checked.`);
