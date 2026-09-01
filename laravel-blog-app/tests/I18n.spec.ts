import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const languages = [
  { code: 'en', path: '/en', heading: /Welcome to Blog/i, current: /Current Language/i },
  { code: 'de', path: '/de', heading: /Willkommen im Blog/i, current: /Aktuelle Sprache/i },
  { code: 'ru', path: '/ru', heading: /Добро пожаловать/i, current: /Текущий язык/i },
];

test.describe('i18n: EN / DE / RU', () => {
  for (const lang of languages) {
    test(`direct navigation to ${lang.code.toUpperCase()} shows translated content`, async ({ page }) => {
      await page.goto(lang.path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(lang.heading);
      await expect(page.getByText(lang.current)).toBeVisible();
    });
  }

  test('switching language via header updates URL and content', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto('en');

    await homePage.switchLanguage('de');
    await expect(page).toHaveURL(/\/de\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Willkommen im Blog/i);

    await homePage.switchLanguage('ru');
    await expect(page).toHaveURL(/\/ru\/?$/);
  });

  test('navigation links are also translated on DE', async ({ page }) => {
    await page.goto('/de');
    await expect(page.getByRole('link', { name: 'Beiträge' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Produkte' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Anmelden' })).toBeVisible();
  });
});