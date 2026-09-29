# Specification

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
- Buttons are grouped into 7 sections.
- Sections are distinguished by soft pastel colours only; they have no names.
- Sections are separated by a divider line.
- Each section has a "create new..." button.

### 4.3 Creating
- "Create new..." prompts for a food name and protein amount.
- The new button is added to that section.

### 4.4 Deleting
- Any button, including default ones, can be deleted.
- Buttons cannot be edited. To change one, delete and recreate it.

## 5. Default list and persistence

- The default food list (names, protein amounts, sections) is hard-coded in the source. It is the source of truth.
- User customisations (created and deleted buttons) are stored in the browser (`localStorage`) on that device. They do not sync across devices.
- Changes to the default list are made in the source code, not through the page.

## 6. Reset to default

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

- Starter food list (names, grams of protein, section) to be supplied by the author.
- Exact 7 pastel colours to be chosen when the food sections are built.
