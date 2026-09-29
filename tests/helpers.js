const path = require("path");
const { expect } = require("@playwright/test");

const PAGE_URL = "file://" + path.resolve(__dirname, "..", "index.html");

// Opens the calculator and waits for fonts, so layout checks are stable.
async function openCalc(page) {
  await page.goto(PAGE_URL);
  await page.evaluate(() => document.fonts.ready);
  return {
    screen: page.locator("#display-text"),
    input: page.locator("#number-input"),
    // Types like a person at the keyboard (only real keystrokes).
    type: (text) => page.locator("#number-input").pressSequentially(text),
    key: (name) => page.getByRole("button", { name, exact: true }),
    food: (name) => page.locator(".food", { hasText: name }).first(),
  };
}

// Reads the display text, e.g. "12 + 3.5".
async function shown(calc) {
  return (await calc.screen.textContent()).trim();
}

module.exports = { openCalc, shown, expect, PAGE_URL };
