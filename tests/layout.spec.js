// Display tests: catch the "wonky" problems. Runs at phone and laptop sizes.
const { test } = require("@playwright/test");
const { openCalc, expect } = require("./helpers");

const SIZES = {
  "small phone": { width: 320, height: 640 },
  phone: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1280, height: 800 },
};

const box = (loc) => loc.first().boundingBox();

for (const [label, size] of Object.entries(SIZES)) {
  test.describe(`layout at ${label} (${size.width}px)`, () => {
    let c;
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(size);
      c = await openCalc(page);
    });

    test("page never scrolls sideways", async ({ page }) => {
      const { scrollW, clientW } = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));
      expect(scrollW).toBeLessThanOrEqual(clientW);
    });

    test("everything stays inside the screen width", async ({ page }) => {
      const offenders = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        return [...document.querySelectorAll("body *")]
          .filter((e) => e.getClientRects().length && !e.classList.contains("number-input"))
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return r.left < -0.5 || r.right > w + 0.5;
          })
          .map((e) => e.tagName + "." + e.className);
      });
      expect(offenders).toEqual([]);
    });

    test("food button text fits inside its button", async ({ page }) => {
      const clipped = await page.locator(".food").evaluateAll((els) =>
        els
          .filter((e) => e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 1)
          .map((e) => e.textContent.trim())
      );
      expect(clipped).toEqual([]);
    });

    test("no buttons overlap each other", async ({ page }) => {
      const rects = await page.locator(".key").evaluateAll((els) =>
        els.map((e) => {
          const r = e.getBoundingClientRect();
          return { name: e.textContent.trim(), l: r.left, r: r.right, t: r.top, b: r.bottom };
        })
      );
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i], b = rects[j];
          const overlap = a.l < b.r - 1 && b.l < a.r - 1 && a.t < b.b - 1 && b.t < a.b - 1;
          expect(overlap, `${a.name} overlaps ${b.name}`).toBe(false);
        }
      }
    });

    test("buttons are big enough to tap (at least 40px tall)", async ({ page }) => {
      const small = await page.locator(".key").evaluateAll((els) =>
        els.filter((e) => e.getBoundingClientRect().height < 40).map((e) => e.textContent.trim())
      );
      expect(small).toEqual([]);
    });

    test("the number display stays inside its screen with a long sum", async ({ page }) => {
      await c.type("99999999");
      await c.key("plus").click();
      await c.type("99999999");
      await c.key("multiply").click();
      await c.type("99999999");
      const inside = await page.evaluate(() => {
        const d = document.querySelector(".display").getBoundingClientRect();
        const t = document.querySelector(".display-text").getBoundingClientRect();
        return t.left >= d.left - 0.5 && t.right <= d.right + 0.5 && t.bottom <= d.bottom + 0.5;
      });
      expect(inside).toBe(true);
    });

    test("welcome text is readable: light on dark", async ({ page }) => {
      const colours = await page.locator(".welcome").evaluate((e) => {
        const parse = (s) => s.match(/\d+/g).slice(0, 3).map(Number);
        const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return {
          text: lum(parse(getComputedStyle(e).color)),
          page: lum(parse(getComputedStyle(document.body).backgroundColor)),
        };
      });
      expect(colours.text - colours.page).toBeGreaterThan(100);
    });
  });
}

test("laptop: welcome text and key sit to the LEFT of the calculator", async ({ page }) => {
  await page.setViewportSize(SIZES.laptop);
  await openCalc(page);
  const about = await box(page.locator(".about"));
  const calc = await box(page.locator(".calculator"));
  expect(about.x + about.width).toBeLessThanOrEqual(calc.x + 1);
});

test("phone: welcome text and key sit BELOW the calculator", async ({ page }) => {
  await page.setViewportSize(SIZES.phone);
  await openCalc(page);
  const about = await box(page.locator(".about"));
  const calc = await box(page.locator(".calculator"));
  expect(about.y).toBeGreaterThanOrEqual(calc.y + calc.height - 1);
});

test("the three colour groups are stacked in order with dividers", async ({ page }) => {
  await page.setViewportSize(SIZES.phone);
  await openCalc(page);
  const groups = await page.locator(".food-group").evaluateAll((els) =>
    els.map((e) => ({ top: e.getBoundingClientRect().top, border: getComputedStyle(e).borderTopWidth }))
  );
  expect(groups.map((g) => g.top)).toEqual([...groups.map((g) => g.top)].sort((a, b) => a - b));
  for (const g of groups) expect(parseFloat(g.border)).toBeGreaterThan(0);
});

test("the web fonts actually load (otherwise the look falls back to plain fonts)", async ({ page }) => {
  await openCalc(page);
  const loaded = await page.evaluate(async () => {
    await document.fonts.load('1rem "DSEG7"');
    await document.fonts.load('1rem "Michroma"');
    return {
      statuses: [...document.fonts].map((f) => f.family + ":" + f.status),
    };
  });
  expect(loaded.statuses).toContain("DSEG7:loaded");
  expect(loaded.statuses).toContain("Michroma:loaded");
});

test("no errors in the browser console", async ({ page }) => {
  const problems = [];
  page.on("pageerror", (e) => problems.push(e.message));
  page.on("console", (m) => m.type() === "error" && problems.push(m.text()));
  await openCalc(page);
  expect(problems).toEqual([]);
});
