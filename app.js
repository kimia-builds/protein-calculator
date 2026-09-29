// Protein Calculator — the calculator part (SPEC.md section 3).
//
// How it holds its state:
//   tokens       finished parts of the sum, e.g. ["12", "+", "3.5", "*"]
//   input.value  the number currently being typed (digits, one ".", max 1 decimal)
//   result       the answer shown after "=", or null

const input = document.getElementById("number-input");
const displayText = document.getElementById("display-text");

const OP_SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };

let tokens = [];
let result = null;
let showingError = false;

// ---------- Typing ----------

// Keeps only digits and the first ".", with at most 1 digit after the ".".
// Anything else is dropped as if never pressed.
function cleanNumber(text) {
  let cleaned = "";
  let hasDot = false;
  let decimals = 0;
  for (const ch of text) {
    if (ch >= "0" && ch <= "9") {
      if (hasDot) {
        if (decimals >= 1) continue;
        decimals++;
      }
      cleaned += ch;
    } else if (ch === "." && !hasDot) {
      cleaned += ch;
      hasDot = true;
    }
  }
  return cleaned;
}

input.addEventListener("input", () => {
  const cleaned = cleanNumber(input.value);
  if (cleaned !== input.value) input.value = cleaned;

  // Typing a digit after "=" (or after an error) starts a fresh sum.
  if (cleaned !== "" && (result !== null || showingError)) {
    tokens = [];
    result = null;
    showingError = false;
  }
  render();
});

// The cursor is invisible, so keep it at the end: Backspace then always
// removes the last digit typed.
function cursorToEnd() {
  const end = input.value.length;
  input.setSelectionRange(end, end);
}
input.addEventListener("keydown", cursorToEnd);
input.addEventListener("click", cursorToEnd);

// ---------- Buttons ----------

function pressOperator(op) {
  if (showingError) return;

  const typed = takeTypedNumber();
  if (typed !== null) {
    tokens.push(typed, op);
  } else if (result !== null) {
    // After "=", an operator carries on from the answer.
    tokens = [result, op];
    result = null;
  } else if (tokens.length > 0) {
    // Two operators in a row: the newer one replaces the older one.
    tokens[tokens.length - 1] = op;
  }
  // Nothing typed yet: ignore.
  render();
}

function pressEquals() {
  const typed = takeTypedNumber();
  if (typed !== null) tokens.push(typed);
  if (isOperator(tokens[tokens.length - 1])) tokens.pop();
  if (tokens.length === 0) {
    render();
    return;
  }

  const answer = evaluate(tokens);
  tokens = [];
  if (answer === null) {
    showingError = true;
    result = null;
  } else {
    result = answer;
  }
  render();
}

function pressClear() {
  tokens = [];
  result = null;
  showingError = false;
  input.value = "";
  render();
}

// Returns the number being typed (and clears it), or null if nothing typed.
function takeTypedNumber() {
  const text = input.value;
  input.value = "";
  if (text === "") return null;
  return text === "." ? "0" : text;
}

function isOperator(token) {
  return token in OP_SYMBOLS;
}

// ---------- Maths ----------

// Works out the sum using BIDMAS: × and ÷ first, then + and −.
// Returns the answer as text rounded to 1 decimal, or null for ÷ 0.
function evaluate(parts) {
  // Pass 1: fold × and ÷ into the number before them.
  const terms = [Number(parts[0])];
  const signs = [];
  for (let i = 1; i < parts.length; i += 2) {
    const op = parts[i];
    const n = Number(parts[i + 1]);
    if (op === "*") {
      terms[terms.length - 1] *= n;
    } else if (op === "/") {
      if (n === 0) return null;
      terms[terms.length - 1] /= n;
    } else {
      signs.push(op);
      terms.push(n);
    }
  }

  // Pass 2: add and subtract left to right.
  let total = terms[0];
  for (let i = 0; i < signs.length; i++) {
    total = signs[i] === "+" ? total + terms[i + 1] : total - terms[i + 1];
  }

  const rounded = Math.round(total * 10) / 10;
  return String(rounded === 0 ? 0 : rounded); // avoids showing "-0"
}

// ---------- Screen ----------

function formatToken(token) {
  if (isOperator(token)) return OP_SYMBOLS[token];
  return token.startsWith("-") ? "−" + token.slice(1) : token;
}

function render() {
  let text;
  if (showingError) {
    text = "Error";
  } else if (result !== null) {
    text = formatToken(result);
  } else {
    const parts = tokens.map(formatToken);
    if (input.value !== "") parts.push(input.value);
    text = parts.join(" ");
  }
  displayText.textContent = text === "" ? "0" : text;
}

// ---------- Food buttons (SPEC.md section 4) ----------

// The default food list: three categories by measurement (SPEC.md 4.2).
// Each food has a name and grams of protein per press.
const FOOD_CATEGORIES = [
  {
    colour: "pink", // 1 tbsp
    foods: [
      { name: "yoghurt", grams: 0.6 },
      { name: "hemp seed", grams: 3.2 },
      { name: "cashews", grams: 1.6 },
      { name: "almonds", grams: 1.8 },
      { name: "pistachios", grams: 1.0 },
      { name: "pumpkin seeds", grams: 2.7 },
      { name: "hummus", grams: 1.2 },
    ],
  },
  {
    colour: "mint", // 1 unit
    foods: [
      { name: "pastrami", grams: 1.5 },
      { name: "pepperoni", grams: 0.8 },
      { name: "sausage", grams: 5.0 },
      { name: "burger", grams: 12.0 },
      { name: "mackerel", grams: 17.0 },
      { name: "sardines", grams: 17.0 },
      { name: "egg", grams: 6.3 },
      { name: "cheese", grams: 5.0 },
    ],
  },
  {
    colour: "lilac", // misc
    foods: [
      { name: "soya latte", grams: 15.0 },
      { name: "half-tin beans", grams: 8.4 },
      { name: "jerky pack", grams: 8.0 },
      { name: "ryvita slice", grams: 0.9 },
      { name: "bowl tagliatelle", grams: 9.0 },
      { name: "bowl rice", grams: 4.0 },
    ],
  },
];

// Enters a food's grams into the sum, adding "+" first if needed.
function pressFood(grams) {
  if (result !== null || showingError) {
    // After "=", a food starts a new sum.
    tokens = [];
    result = null;
    showingError = false;
  } else {
    const typed = takeTypedNumber();
    if (typed !== null) tokens.push(typed, "+");
    // If the sum ends in an operator, that operator is used as it is.
  }
  input.value = String(grams);
  render();
}

const foodsBox = document.getElementById("foods");
for (const category of FOOD_CATEGORIES) {
  const section = document.createElement("div");
  section.className = "food-group food-" + category.colour;
  for (const food of category.foods) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "key food";
    button.textContent = food.name;
    button.dataset.grams = food.grams;
    section.appendChild(button);
  }
  foodsBox.appendChild(section);
}

// Buttons must not take focus away from the input, so the phone keypad
// stays open and desktop typing keeps working after a click.
document.querySelectorAll(".key").forEach((button) => {
  button.addEventListener("pointerdown", (e) => e.preventDefault());
  button.addEventListener("mousedown", (e) => e.preventDefault());
  button.addEventListener("click", () => {
    if (button.dataset.op) pressOperator(button.dataset.op);
    else if (button.dataset.action === "equals") pressEquals();
    else if (button.dataset.action === "clear") pressClear();
    else if (button.dataset.grams) pressFood(Number(button.dataset.grams));
  });
});

render();
