# Protein Calculator: working rules for Claude

Kimia is a non-coder: explain things in plain language.

## Tests are part of every change

- Run `npm test` after EVERY change to index.html, app.js or style.css, and before saying anything is done. It opens the page in a real browser and takes about 10 seconds.
- A failing test means the change is not finished. Fix it, or tell Kimia plainly what failed. Never delete or loosen a test to make it pass.
- When adding a feature or fixing a bug, add or update a test for it in the same change. Behaviour tests live in `tests/calculator.spec.js` (grouped by SPEC.md section); display tests live in `tests/layout.spec.js` (checked at phone and laptop widths).
- If SPEC.md changes, update the matching tests so they still describe the spec.
- After a fresh clone, run `npm install`, `npx playwright install chromium`, and `git config core.hooksPath .githooks` (this makes commits run the tests automatically).
- GitHub also runs the tests on every push (`.github/workflows/tests.yml`).
