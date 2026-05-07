import { expect, test } from "@playwright/test";

// Critical content + interactive surfaces for the static landing.
// If any of these regress, openkt.ai goes out the door wrong.

test.describe("openkt.ai static landing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero heading and pilot CTA", async ({ page }) => {
    await expect(page).toHaveTitle(/Open KT/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Your team's AI shouldn't/ }),
    ).toBeVisible();
    // Sticky nav + hero both expose the primary CTA — check at least one.
    await expect(page.getByRole("link", { name: /Join the pilot/ }).first()).toBeVisible();
  });

  test("anchor nav targets exist on the page", async ({ page }) => {
    for (const id of ["problem", "compare", "solution", "how", "pilot", "faq"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("install tabs switch panels on click", async ({ page }) => {
    // Default panel is Claude Code.
    const codePanel = page.locator("#install-panel-claude-code");
    const cursorPanel = page.locator("#install-panel-cursor");
    await expect(codePanel).toBeVisible();
    await expect(cursorPanel).toBeHidden();

    await page.locator("#install-tab-cursor").click();
    await expect(cursorPanel).toBeVisible();
    await expect(codePanel).toBeHidden();
    await expect(page.getByRole("link", { name: /Install in Cursor/ })).toBeVisible();
  });

  test("copyable command exposes a copy button", async ({ page }) => {
    await page.locator("#install-tab-claude-code").click();
    const panel = page.locator("#install-panel-claude-code");
    await expect(panel.getByRole("button", { name: /Copy command/ })).toBeVisible();
  });

  test("FAQ entries open on click", async ({ page }) => {
    const firstFaq = page.locator("#faq details").first();
    await expect(firstFaq).not.toHaveAttribute("open", "");
    await firstFaq.locator("summary").click();
    await expect(firstFaq).toHaveAttribute("open", "");
  });

  test("footer links to the dashboard at app.openkt.ai", async ({ page }) => {
    const openApp = page.getByRole("link", { name: /Open app/ });
    await expect(openApp).toHaveAttribute("href", /app\.openkt\.ai/);
  });
});
