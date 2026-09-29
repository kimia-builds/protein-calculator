// @ts-check
const { defineConfig } = require("@playwright/test");

// The site is static, so the tests just open index.html straight from disk.
module.exports = defineConfig({
  testDir: "./tests",
  reporter: [["list"]],
  fullyParallel: true,
  use: { browserName: "chromium" },
});
