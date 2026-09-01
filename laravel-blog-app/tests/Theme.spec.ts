import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Theme toggle', () => {
  test('clicking the theme toggle changes the <html> class attribute', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto('en');

    const htmlEl = page.locator('html');
    const classBefore = await htmlEl.getAttribute('class');

    await homePage.themeToggle.click();

    await expect
      .poll(async () => await htmlEl.getAttribute('class'))
      .not.toBe(classBefore);
  });

  test('selected theme persists after page reload', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto('en');

    const htmlEl = page.locator('html');
    await homePage.themeToggle.click();
    const classAfterToggle = await htmlEl.getAttribute('class');

    await page.reload();

    await expect(htmlEl).toHaveAttribute('class', classAfterToggle ?? '');
  });
});