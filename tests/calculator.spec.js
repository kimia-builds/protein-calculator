// Behaviour tests. Each group is named after the SPEC.md section it checks.
const fs = require("fs");
const path = require("path");
const { test } = require("@playwright/test");
const { openCalc, shown, expect } = require("./helpers");

let c;
test.beforeEach(async ({ page }) => {
  c = await openCalc(page);
});

test.describe("3.1 controls", () => {
  test("has operators, = and AC, and no number buttons", async ({ page }) => {
    for (const name of ["divide", "multiply", "minus", "plus", "=", "AC"]) {
      await expect(page.getByRole("button", { name, exact: true })).toBeVisible();
    }
    for (let d = 0; d <= 9; d++) {
      await expect(page.getByRole("button", { name: String(d), exact: true })).toHaveCount(0);
    }
  });
  test("display starts at 0", async () => {
    expect(await shown(c)).toBe("0");
  });
});

test.describe("3.2 input", () => {
  test("digits show on the display", async () => {
    await c.type("123");
    expect(await shown(c)).toBe("123");
  });
  test("a second . in the same number is ignored", async () => {
    await c.type("1.2.3");
    expect(await shown(c)).toBe("1.2");
  });
  test("other characters are ignored", async () => {
    await c.type("1a-+*/=b2 !");
    expect(await shown(c)).toBe("12");
  });
  test("typing stops at 1 digit after the point", async () => {
    await c.type("4.444");
    expect(await shown(c)).toBe("4.4");
  });
  test("keyboard never triggers operators, = or Enter", async ({ page }) => {
    await c.type("5");
    await page.keyboard.press("+");
    await page.keyboard.press("Enter");
    await page.keyboard.press("=");
    expect(await shown(c)).toBe("5");
  });
  test("Backspace removes the last digit or .", async ({ page }) => {
    await c.type("12.5");
    await page.keyboard.press("Backspace");
    expect(await shown(c)).toBe("12.");
    await page.keyboard.press("Backspace");
    expect(await shown(c)).toBe("12");
  });
  test("Backspace never removes an operator", async ({ page }) => {
    await c.type("7");
    await c.key("plus").click();
    await page.keyboard.press("Backspace");
    expect(await shown(c)).toBe("7 +");
  });
  test("the display uses a decimal keypad on phones", async () => {
    await expect(c.input).toHaveAttribute("inputmode", "decimal");
  });
});

test.describe("3.3 operators", () => {
  test("an operator before any number is ignored", async () => {
    await c.key("plus").click();
    expect(await shown(c)).toBe("0");
  });
  test("an operator straight after another replaces it", async () => {
    await c.type("5");
    await c.key("plus").click();
    await c.key("multiply").click();
    expect(await shown(c)).toBe("5 ×");
  });
});

test.describe("3.4 evaluation", () => {
  test("nothing is evaluated until = is pressed", async () => {
    await c.type("2");
    await c.key("plus").click();
    await c.type("3");
    expect(await shown(c)).toBe("2 + 3");
  });
  test("simple sums", async () => {
    await c.type("2");
    await c.key("plus").click();
    await c.type("3");
    await c.key("=").click();
    expect(await shown(c)).toBe("5");
  });
  test("subtraction, and negatives use a proper minus sign", async () => {
    await c.type("2");
    await c.key("minus").click();
    await c.type("5");
    await c.key("=").click();
    expect(await shown(c)).toBe("−3");
  });
  test("BIDMAS: × and ÷ before + and −", async () => {
    await c.type("2");
    await c.key("plus").click();
    await c.type("3");
    await c.key("multiply").click();
    await c.type("4");
    await c.key("=").click();
    expect(await shown(c)).toBe("14");
  });
  test("= straight after an operator ignores that operator", async () => {
    await c.type("6");
    await c.key("plus").click();
    await c.key("=").click();
    expect(await shown(c)).toBe("6");
  });
  test("results are rounded to 1 decimal place", async () => {
    await c.type("10");
    await c.key("divide").click();
    await c.type("3");
    await c.key("=").click();
    expect(await shown(c)).toBe("3.3");
  });
  test("dividing by zero shows Error", async () => {
    await c.type("5");
    await c.key("divide").click();
    await c.type("0");
    await c.key("=").click();
    expect(await shown(c)).toBe("Error");
  });
  test("AC clears the display and the pending sum", async () => {
    await c.type("5");
    await c.key("plus").click();
    await c.key("AC").click();
    expect(await shown(c)).toBe("0");
    await c.type("1");
    await c.key("=").click();
    expect(await shown(c)).toBe("1");
  });
});

test.describe("3.5 after a result", () => {
  test("an operator continues the sum from the result", async () => {
    await c.type("2");
    await c.key("plus").click();
    await c.type("3");
    await c.key("=").click();
    await c.key("multiply").click();
    expect(await shown(c)).toBe("5 ×");
    await c.type("2");
    await c.key("=").click();
    expect(await shown(c)).toBe("10");
  });
  test("typing a digit starts a new sum", async () => {
    await c.type("2");
    await c.key("plus").click();
    await c.type("3");
    await c.key("=").click();
    await c.type("9");
    expect(await shown(c)).toBe("9");
  });
  test("typing after Error starts a new sum", async () => {
    await c.type("5");
    await c.key("divide").click();
    await c.type("0");
    await c.key("=").click();
    await c.type("4");
    expect(await shown(c)).toBe("4");
  });
});

test.describe("4.1 food buttons", () => {
  test("pressing a food enters its protein grams", async () => {
    await c.food("egg").click();
    expect(await shown(c)).toBe("6.3");
  });
  test("a second food adds with + automatically", async () => {
    await c.food("egg").click();
    await c.food("cheese").click();
    expect(await shown(c)).toBe("6.3 + 5");
    await c.key("=").click();
    expect(await shown(c)).toBe("11.3");
  });
  test("if the last entry is an operator, that operator is used", async () => {
    await c.food("egg").click();
    await c.key("multiply").click();
    await c.food("burger").click();
    expect(await shown(c)).toBe("6.3 × 12");
  });
  test("typed number then a food adds with +", async () => {
    await c.type("2");
    await c.food("egg").click();
    expect(await shown(c)).toBe("2 + 6.3");
  });
  test("after = a food starts a new sum", async () => {
    await c.food("egg").click();
    await c.food("egg").click();
    await c.key("=").click();
    await c.food("burger").click();
    expect(await shown(c)).toBe("12");
  });
  test("clicking buttons keeps the keyboard input focused", async ({ page }) => {
    await c.food("egg").click();
    await expect(c.input).toBeFocused();
  });
});

test.describe("4.2 categories and 5 default list", () => {
  test("three groups: pink, mint, lilac, in that order", async ({ page }) => {
    const classes = await page.locator(".food-group").evaluateAll((els) =>
      els.map((e) => e.className)
    );
    expect(classes).toEqual([
      "food-group food-pink",
      "food-group food-mint",
      "food-group food-lilac",
    ]);
  });
  test("every food has a name and a positive protein amount", async ({ page }) => {
    const foods = await page.locator(".food").evaluateAll((els) =>
      els.map((e) => ({ name: e.textContent.trim(), grams: Number(e.dataset.grams) }))
    );
    expect(foods.length).toBeGreaterThan(0);
    for (const f of foods) {
      expect(f.name.length, "food needs a name").toBeGreaterThan(0);
      expect(f.grams, `${f.name} needs grams > 0`).toBeGreaterThan(0);
    }
  });
  test("no two foods share a name", async ({ page }) => {
    const names = await page.locator(".food").allTextContents();
    expect(new Set(names).size).toBe(names.length);
  });
  test("food buttons show no category names", async ({ page }) => {
    const text = (await page.locator(".foods").textContent()).toLowerCase();
    for (const word of ["tablespoon", "unit", "miscellaneous"]) {
      expect(text).not.toContain(word);
    }
  });
});

test.describe("4.5 welcome text and key", () => {
  test("welcome text is present and exact", async ({ page }) => {
    await expect(page.locator(".welcome p")).toHaveText([
      "welcome to kimia's protein calculator.",
      "this regular calculator works to 1 decimal point and follows bidmas rules. just type the numbers you need with a regular keyboard.",
      "to calculate your daily protein, you can also press the food buttons.",
      "note: these foods correspond to exact protein values of specific (mostly vegan) brands of food that kimia eats. if you want it to include your go-to foods, use my github repo to build your own version.",
    ]);
  });
  test("\"github repo\" links to the repository", async ({ page }) => {
    await expect(page.locator(".welcome a")).toHaveText("github repo");
    await expect(page.locator(".welcome a")).toHaveAttribute(
      "href",
      "https://github.com/kimia-builds/protein-calculator"
    );
  });
  test("food buttons are all lower case", async ({ page }) => {
    const names = await page.locator(".food").allTextContents();
    for (const n of names) expect(n).toBe(n.toLowerCase());
  });
  test("key lists the three meanings", async ({ page }) => {
    await expect(page.locator(".legend li")).toHaveText([
      "1 tbsp",
      "1 unit",
      "misc",
    ]);
  });
  test("all text in the block is lower case", async ({ page }) => {
    const text = await page.locator(".about").innerText();
    expect(text).toBe(text.toLowerCase());
  });
  test("key swatches match the food button colours", async ({ page }) => {
    const bg = (sel) => page.locator(sel).first().evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(await bg(".swatch-pink")).toBe(await bg(".food-pink .food"));
    expect(await bg(".swatch-mint")).toBe(await bg(".food-mint .food"));
    expect(await bg(".swatch-lilac")).toBe(await bg(".food-lilac .food"));
  });
});

test.describe("FOODS.md matches the food buttons", () => {
  test("every button and its grams are listed in FOODS.md, and nothing extra", async ({ page }) => {
    const buttons = await page.locator(".food").evaluateAll((els) =>
      els.map((e) => [e.textContent.trim(), Number(e.dataset.grams)])
    );
    const doc = fs.readFileSync(path.resolve(__dirname, "..", "FOODS.md"), "utf8");
    const rows = [...doc.matchAll(/^\| (.+?) \| (\d+(?:\.\d+)?) \|/gm)].map((m) => [m[1], Number(m[2])]);
    expect(rows).toEqual(buttons);
  });
});
