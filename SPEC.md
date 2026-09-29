# Specification

## 0. Status

**MVP achieved.** The MVP is the calculator (section 3) plus a hard-coded list of food buttons (section 4.1), grouped into the three colour-coded categories in 4.2. It works on desktop and phone.

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

### 4.2 Categories
- Buttons are grouped into categories by **measurement**: what one press of the button's protein amount refers to.
- There are three categories, each shown in its own soft pastel colour:
  - **Baby pink**: 1 tbsp.
  - **Mint green**: 1 unit.
  - **Lilac**: misc.
- Categories have no names on the food buttons themselves; they are distinguished by colour. The side text (section 4.5) has a key explaining what each colour means.
- Categories are separated by a divider line.
- The key at the bottom of this document lists the category-to-colour system.

### 4.3 Creating (*Nice to have*)
- Each category has a "create new..." button.
- "Create new..." prompts for a food name and protein amount.
- The new button is added to that category.

### 4.4 Deleting (*Nice to have*)
- Any button, including default ones, can be deleted.
- Buttons cannot be edited. To change one, delete and recreate it.

### 4.5 Welcome text and key
- A block of text sits beside the calculator: to its left on a laptop, below it on a phone.
- It reads, as three paragraphs:
  1. "welcome to kimia's protein calculator."
  2. "this regular calculator works to 1 decimal point and follows bidmas rules."
  3. "to calculate your daily protein, press the food buttons. note: these foods correspond to exact protein values of specific (mostly vegan) brands of food that kimia eats. if you want it to include your go-to foods, use my github repo to build a copy."
- The words "github repo" link to https://github.com/kimia-builds/protein-calculator.
- Underneath the welcome text (still at the side on a laptop) is the key: a small swatch of each category colour with its meaning ("1 tbsp", "1 unit", "misc").
- All text in this block is lower case, and so are the food button names.

## 5. Default list and persistence

- The default food list (names, protein amounts, categories) is hard-coded in the source. It is the source of truth.
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
- Naming categories on the food buttons themselves (the key in 4.5 is the only place they are explained).
- Daily logs, history, or targets.

## 8. Open items

- More foods to add to the default list (e.g. Linda sausage), once the author supplies their protein amounts.

## Key: categories and colours

| Colour | Category |
|---|---|
| Baby pink | 1 tbsp |
| Mint green | 1 unit |
| Lilac | Miscellaneous |
