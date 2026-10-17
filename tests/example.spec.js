const { test, expect } = require('@playwright/test');

// This is a single example test showing the repo's convention - it is NOT
// the automation suite. Writing that suite (from the user stories in the
// SprintMart repo's docs/PHASE_1_USER_STORIES.md) is the exercise itself.
//
// Notice this test uses user-facing locators (getByRole, getByLabel) and
// relative paths (baseURL comes from playwright.config.js / BASE_URL)
// rather than CSS selectors or full URLs.

test('the shop page loads and shows the catalog', async ({ page }) => {
  await page.goto('/products');

  await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible();
  await expect(page.getByRole('link', { name: /2-Person Tent/ })).toBeVisible();
});
