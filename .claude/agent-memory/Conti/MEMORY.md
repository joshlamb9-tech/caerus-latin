# Conti Agent Memory

## Josh's Teaching Context

- School: Mowden Hall School (independent prep, 13+)
- Roles: Head of Languages, Head of Year 7&8, Scholarship Lead
- Languages taught: French (primary focus), Spanish
- Year groups: KS2 (Y3-6) and KS3 (Y7-8)
- Exam target: ISEB Common Entrance 13+ French, Level 1 (Foundation) and Level 2 (Higher)

## Y8 French Revision Site

Location: `/Users/josh/marvin/y8-french-revision/`
Stylesheet: `styles-v2.css` — font is Dosis (Google Font), key CSS vars: --navy: #003B72, --text, --border, --white, --bg
JS nav: `js/nav.js` handles hamburger menu

### Pages built:
- 10 topic pages in `/topics/` folder
- vocab-challenge.html — category-based vocab challenge (supported/unsupported modes)
- speed-recall.html — 60-second timed drill (built March 2026)
- index.html, grammar.html, checklist.html, past-papers.html, spelling-test.html, grammar-trainer.html, speaking-prep.html

### Vocab Challenge categories (as of March 2026):
town, market, animals, presents, clothing, school subjects, hobbies, transport, food & drink, family members, body parts, rooms in a house, **numbers, colours, countries & nationalities, days/months/time, describing people (adjectives), opinions & connectives**

### CE Gap Analysis completed (March 2026)
Missing topics identified and added:
1. Numbers (cardinal 1-1000, including tricky ones: soixante-dix, quatre-vingts)
2. Colours (15 words including compound colours)
3. Countries & nationalities (18 entries, FR + EN directions)
4. Days, months & time expressions (25 words)
5. Describing people — adjectives (20 personality/appearance words)
6. Opinions & connectives (20 high-frequency phrases for CE writing)

### Speed Recall game (speed-recall.html)
- 60-second timed drill
- FR->EN and EN->FR direction toggle
- Multiple choice (4 options) or Type mode
- Topic filter: All Topics or individual categories
- Accent bar shown in type mode (EN->FR direction only)
- Score + missed words shown at end
- No leaderboard — school intranet only
- All vocab duplicated from CATEGORIES array (pragmatic for static site)
- Linked from index.html quick-access column and all nav bars

## Coding Patterns for This Site

- Pure HTML/JS/CSS, no frameworks, no build tools
- Unicode escapes for accented chars (é=\u00e9, è=\u00e8, etc.)
- All pages at root link to each other without path prefix
- Pages in /topics/ folder use ../ prefix for root links
- CATEGORIES array format: { id, name, prompt, emoji, words: [{fr, en}] }
- senseCheck() uses MyMemory API for open-ended vocab validation
- stripArticle() removes le/la/les/l'/du/de la/des/un/une from start
- checkWord() returns 'correct' | 'near' | 'wrong' (near = accent slip)
