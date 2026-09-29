# Protein Calculator

A single-page web calculator for adding up protein intake from foods, using one-tap food buttons.

## Why

The author follows a mostly plant-based diet where reaching a protein target is difficult. Tallying protein by hand across meals is tedious, so this tool turns common foods into buttons whose protein values are added with a tap.

## How it works

- A basic calculator (+, −, ×, ÷, =, AC). Numbers are typed; there are no number buttons.
- Food buttons sit below the calculator. Tapping one enters that food's protein grams into the calculator.
- The food list is hard-coded in the source. Foods are grouped into colour-coded categories by measurement: baby pink is 1 tbsp, mint green is 1 unit, and lilac is misc.

## Status

MVP achieved: the calculator and the food buttons work. Adding, deleting and resetting foods from the page are nice-to-haves that may never be built. See [SPEC.md](SPEC.md) for the specification.

## Hosting

Static site on GitHub Pages. No backend.

## Tests

`npm test` opens the page in a real browser and checks the calculator's behaviour against SPEC.md and the layout on phone and laptop sizes. It runs automatically before each commit and on every push to GitHub. First-time setup on a new machine: `npm install`, `npx playwright install chromium`, `git config core.hooksPath .githooks`.
