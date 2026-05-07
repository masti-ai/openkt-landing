import { defineConfig, devices } from "@playwright/test";
import * as path from "node:path";

// Static landing e2e harness. Builds the Next static export (out/) and
// serves it with `next start` against a copy via the preview script. The
// suite asserts the production HTML matches the original /landing route's
// critical surface — hero, install tabs, FAQ — so a regression in the
// extracted site is caught before deploy.

const E2E_DIR = path.resolve(__dirname, "e2e");
const PORT = Number(process.env.PORT ?? 3100);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: E2E_DIR,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `npm run preview -- -l ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
