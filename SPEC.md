# Specification

## 0. Status

**MVP achieved.** The MVP is the calculator (section 3) plus a hard-coded list of food buttons (section 4.1), all in a single section. It works on desktop and phone.

Everything marked *Nice to have* below is optional and may never be built.

## 1. Purpose and user

Primary user: the author, tracking protein on a mostly plant-based diet. Secondary: anyone else using the page, who may customise it.

## 2. Platform

- Static HTML/CSS/JavaScript, no backend, no dependencies required.
- Hosted on GitHub Pages at `kimia-builds/protein-calculator`.
- Must be usable on a phone.

## 3. Calculator

### 3.1 Controls
- Display (number screen).
- Operator buttons: `+`, `−`, `×`, `÷`.
- `=` and `AC` (clear all).
- No number buttons.

### 3.2 Input
- Numbers are entered by typing on the keyboard.
- Allowed characters: digits `0-9` and `.`.
- A `.` is accepted once per number. A second `.` in the same number is ignored as if never pressed.
- Any other character is ignored as if never pressed.
- Keyboard input never triggers functions: operators, `=`, `AC`, and Enter are usable only by clicking their buttons.
- Decimals are supported, but typing stops at 1 digit after the point (4.444 shows as 4.4).
- On a phone, tapping the display opens the phone's number keypad.
- Backspace/Delete removes the last digit or `.` of the number being typed. It never removes an operator.

### 3.3 Operators
- An operator pressed before any number is typed is ignored.
- An operator pressed straight after another operator replaces it.

### 3.4 Evaluation
- Expressions follow BIDMAS (multiplication/division before addition/subtraction).
- Nothing is evaluated or shown as a result until `=` is pressed. Before that, the display shows only what has been entered.
- `=` straight after an operator ignores that trailing operator.
- Results are rounded to at most 1 decimal place.
- Dividing by zero shows `Error`.
- `AC` clears the display and any pending expression.

### 3.5 After a result
- Pressing an operator continues the sum from the result.
- Typing a digit starts a new sum.

## 4. Food buttons

### 4.1 Behaviour
- Each button has a name and a protein amount (grams).
- Pressing a food button enters its protein amount into the calculator.
- If the calculator already contains a number or expression, `+` is applied before the amount. If the last entry is an operator, that operator is used instead.
- If a result is showing after `=`, pressing a food button starts a new sum with that amount.

### 4.2 Sections
- MVP: all buttons are in one section, in one soft pastel colour, below a divider line.
- Planned refinement: split the buttons into more sections (up to 7).
  - Sections are distinguished by soft pastel colours only; they have no names.
  - Sections are separated by a divider line.

### 4.3 Creating (*Nice to have*)
- Each section has a "create new..." button.
- "Create new..." prompts for a food name and protein amount.
- The new button is added to that section.

### 4.4 Deleting (*Nice to have*)
- Any button, including default ones, can be deleted.
- Buttons cannot be edited. To change one, delete and recreate it.

## 5. Default list and persistence

- The default food list (names, protein amounts, sections) is hard-coded in the source. It is the source of truth.
- Changes to the default list are made in the source code, not through the page.
- *Nice to have* (only needed if 4.3 or 4.4 is built): user customisations (created and deleted buttons) are stored in the browser (`localStorage`) on that device. They do not sync across devices.

## 6. Reset to default (*Nice to have*)

- Only needed if 4.3 or 4.4 is built.
- A "Refresh to default" button at the bottom of the page.
- Pressing it opens a confirmation popup stating that all customisations will be lost permanently.
- On confirm: stored customisations are erased and the page returns to the hard-coded default.
- On cancel: nothing changes.

## 7. Out of scope

- Editing existing buttons.
- Cross-device sync, accounts, or a backend.
- Naming sections.
- Daily logs, history, or targets.

## 8. Open items

- Which foods go in which section, and the pastel colour for each, to be chosen when sections are split.
- More foods to add to the default list (e.g. Linda sausage), once the author supplies their protein amounts.
