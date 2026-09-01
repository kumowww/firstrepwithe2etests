import { test, expect } from '@playwright/test';

const placeholders = [
  { path: '/en/posts', message: /Posts Coming Soon/i },
  { path: '/en/products', message: /Products Feature/i },
  { path: '/en/register', message: /Registration Coming Soon/i },
];

test.describe('Work-in-progress pages (placeholders)', () => {
  for (const { path, message } of placeholders) {
    test(`${path} responds 200 and shows a clear message`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByText(message)).toBeVisible();
    });

    test(`${path} has a working "Back to Home" link`, async ({ page }) => {
      await page.goto(path);
      const backLink = page.getByRole('link', { name: /Back to Home/i });
      await expect(backLink).toBeVisible();

      await backLink.click();
      await expect(page).toHaveURL(/\/en\/?$/);
    });
  }
});