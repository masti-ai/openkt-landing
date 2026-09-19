import { expect, test } from "@playwright/test";

// Critical content + interactive surfaces for the static landing.
// If any of these regress, openkt.ai goes out the door wrong.

const DMG = /openkt-downloads-724772068721\.s3\.ap-south-1\.amazonaws\.com\/desktop\/OpenKT-latest-arm64\.dmg$/;

test.describe("openkt.ai static landing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero states the problem and the promise", async ({ page }) => {
    await expect(page).toHaveTitle(/OpenKT/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Stop re-explaining your team to every AI/ }),
    ).toBeVisible();
  });

  test("Try free for Mac points at the DMG in nav and hero", async ({ page }) => {
    const links = page.getByRole("link", { name: "Try free for Mac" });
    await expect(links).toHaveCount(2);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", DMG);
    }
    await expect(page.getByText("Apple silicon · free · open source")).toBeVisible();
  });

  test("hero buttons reach setup and GitHub", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Add to your AI tool/ })).toHaveAttribute("href", "#setup");
    await expect(page.getByRole("link", { name: /View on GitHub/ }).first()).toHaveAttribute(
      "href",
      /^https:\/\/github\.com\/masti-ai\//,
    );
  });

  test("anchor targets exist on the page", async ({ page }) => {
    for (const id of ["how", "setup", "setup-prompt", "desktop", "install-mac", "open-source"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("setup shows the MCP URL and the prompts are copyable", async ({ page }) => {
    await expect(page.locator("#setup").getByText("https://mcp.openkt.ai/mcp").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy MCP URL" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy setup prompt" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy install prompt" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy xattr command" })).toBeVisible();
  });

  test("setup prompt file is served", async ({ request }) => {
    const res = await request.get("/setup-prompt.md");
    expect(res.ok()).toBeTruthy();
    expect(await res.text()).toContain("mcp.openkt.ai/mcp");
  });

  test("no horizontal scroll at phone width", async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 860 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
