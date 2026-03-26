#!/usr/bin/env node
/**
 * inject-gcse-nav.js
 * One-off script: inserts the GCSE Latin nav item into all CE HTML pages.
 * Inserts AFTER the Leaderboard <li> and BEFORE the Account <li>.
 * Safe to run multiple times — checks for existing insertion before modifying.
 */

const fs   = require('fs');
const path = require('path');

// All CE HTML files in the root (login.html gets the item too — non-gated pages
// still show the nav so users can navigate to GCSE landing / purchase)
const HTML_FILES = [
  'welcome.html',
  'terms.html',
  'how-to-use.html',
  'vocabulary.html',
  'grammar.html',
  'quiz.html',
  'account.html',
  'papers.html',
  'pathway.html',
  'practice-papers.html',
  'word-groups.html',
  'leaderboard.html',
  'speed-recall.html',
  'index.html',
  'login.html',
];

// The exact string to search for (the Leaderboard anchor closing tag + </li>)
const SEARCH  = '<li><a href="leaderboard.html">Leaderboard</a></li>';

// The GCSE nav item to insert after SEARCH
const INSERT  = '\n          <li><a href="gcse/index.html" class="nav-gcse-link">GCSE Latin <span class="nav-gcse-badge">GCSE</span></a></li>';

// Guard string — if already present, skip the file
const GUARD   = 'nav-gcse-link';

const rootDir = path.resolve(__dirname, '..');
let modified  = 0;
let skipped   = 0;
let missing   = 0;

for (const file of HTML_FILES) {
  const filePath = path.join(rootDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`MISSING: ${file}`);
    missing++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes(GUARD)) {
    console.log(`SKIP (already patched): ${file}`);
    skipped++;
    continue;
  }

  if (!content.includes(SEARCH)) {
    console.log(`WARN (search string not found): ${file}`);
    missing++;
    continue;
  }

  content = content.replace(SEARCH, SEARCH + INSERT);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`PATCHED: ${file}`);
  modified++;
}

console.log(`\nDone. Modified: ${modified}, Skipped: ${skipped}, Warnings: ${missing}`);
