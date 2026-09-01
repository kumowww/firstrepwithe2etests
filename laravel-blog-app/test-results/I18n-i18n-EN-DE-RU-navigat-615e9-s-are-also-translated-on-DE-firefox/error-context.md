# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: I18n.spec.ts >> i18n: EN / DE / RU >> navigation links are also translated on DE
- Location: tests\I18n.spec.ts:31:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Beiträge' })
Expected: visible
Error: strict mode violation: getByRole('link', { name: 'Beiträge' }) resolved to 2 elements:
    1) <a href="https://laravelblogapplication.vercel.app/de/posts">Beiträge</a> aka getByRole('navigation').getByRole('link', { name: 'Beiträge' })
    2) <a class="btn" href="https://laravelblogapplication.vercel.app/de/posts">Beiträge</a> aka getByRole('main').getByRole('link', { name: 'Beiträge' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Beiträge' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - navigation [ref=e4]:
        - link "Startseite" [ref=e5] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/de
        - link "Beiträge" [ref=e6] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/de/posts
        - link "Produkte" [ref=e7] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/de/products
      - generic [ref=e8]:
        - generic [ref=e9]:
          - link "EN" [ref=e10] [cursor=pointer]:
            - /url: /en
          - link "DE" [ref=e11] [cursor=pointer]:
            - /url: /de
          - link "RU" [ref=e12] [cursor=pointer]:
            - /url: /ru
        - generic [ref=e13]:
          - checkbox "☀ ☾"
          - generic [ref=e14] [cursor=pointer]:
            - generic: ☀
            - generic: ☾
        - link "Anmelden" [ref=e15] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/de/login
        - link "Registrieren" [ref=e16] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/de/register
  - main [ref=e17]:
    - generic [ref=e18]:
      - heading "Willkommen im Blog" [level=1] [ref=e19]
      - paragraph [ref=e20]:
        - text: "Aktuelle Sprache:"
        - strong [ref=e21]: DE
      - generic [ref=e22]:
        - button "Diagnostik" [ref=e24] [cursor=pointer]
        - button "Cache leeren" [ref=e26] [cursor=pointer]
      - generic [ref=e27]:
        - link "Beiträge" [ref=e28] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/de/posts
        - link "Produkte" [ref=e29] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/de/products
  - contentinfo [ref=e30]:
    - paragraph [ref=e31]: © 2026 Laravel Blog. Alle Rechte vorbehalten.
    - paragraph [ref=e32]:
      - text: Erstellt von
      - link "github:kumowww" [ref=e33] [cursor=pointer]:
        - /url: https://github.com/kumowww
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { HomePage } from '../pages/HomePage';
  3  | 
  4  | const languages = [
  5  |   { code: 'en', path: '/en', heading: /Welcome to Blog/i, current: /Current Language/i },
  6  |   { code: 'de', path: '/de', heading: /Willkommen im Blog/i, current: /Aktuelle Sprache/i },
  7  |   { code: 'ru', path: '/ru', heading: /Добро пожаловать/i, current: /Текущий язык/i },
  8  | ];
  9  | 
  10 | test.describe('i18n: EN / DE / RU', () => {
  11 |   for (const lang of languages) {
  12 |     test(`direct navigation to ${lang.code.toUpperCase()} shows translated content`, async ({ page }) => {
  13 |       await page.goto(lang.path);
  14 |       await expect(page.getByRole('heading', { level: 1 })).toHaveText(lang.heading);
  15 |       await expect(page.getByText(lang.current)).toBeVisible();
  16 |     });
  17 |   }
  18 | 
  19 |   test('switching language via header updates URL and content', async ({ page }) => {
  20 |     const homePage = new HomePage(page);
  21 |     await homePage.goto('en');
  22 | 
  23 |     await homePage.switchLanguage('de');
  24 |     await expect(page).toHaveURL(/\/de\/?$/);
  25 |     await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Willkommen im Blog/i);
  26 | 
  27 |     await homePage.switchLanguage('ru');
  28 |     await expect(page).toHaveURL(/\/ru\/?$/);
  29 |   });
  30 | 
  31 |   test('navigation links are also translated on DE', async ({ page }) => {
  32 |     await page.goto('/de');
> 33 |     await expect(page.getByRole('link', { name: 'Beiträge' })).toBeVisible();
     |                                                                ^ Error: expect(locator).toBeVisible() failed
  34 |     await expect(page.getByRole('link', { name: 'Produkte' })).toBeVisible();
  35 |     await expect(page.getByRole('link', { name: 'Anmelden' })).toBeVisible();
  36 |   });
  37 | });
```