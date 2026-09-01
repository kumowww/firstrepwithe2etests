# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Theme.spec.ts >> Theme toggle >> clicking the theme toggle changes the <html> class attribute
- Location: tests\Theme.spec.ts:5:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('header button, header [role="button"]').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - navigation [ref=e4]:
        - link "Home" [ref=e5]:
          - /url: https://laravelblogapplication.vercel.app/en
        - link "Posts" [ref=e6]:
          - /url: https://laravelblogapplication.vercel.app/en/posts
        - link "Products" [ref=e7]:
          - /url: https://laravelblogapplication.vercel.app/en/products
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
        - link "Login" [ref=e15] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/en/login
        - link "Register" [ref=e16] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/en/register
  - main [ref=e17]:
    - generic [ref=e18]:
      - heading "Welcome to Blog" [level=1] [ref=e19]
      - paragraph [ref=e20]:
        - text: "Current Language:"
        - strong [ref=e21]: EN
      - generic [ref=e22]:
        - button "Diagnostics" [ref=e24] [cursor=pointer]
        - button "Clear Cache" [ref=e26] [cursor=pointer]
      - generic [ref=e27]:
        - link "Posts" [ref=e28] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/en/posts
        - link "Products" [ref=e29] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/en/products
  - contentinfo [ref=e30]:
    - paragraph [ref=e31]: © 2026 Laravel Blog. All rights reserved.
    - paragraph [ref=e32]:
      - text: Created by
      - link "github:kumowww" [ref=e33]:
        - /url: https://github.com/kumowww
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { HomePage } from '../pages/HomePage';
  3  | 
  4  | test.describe('Theme toggle', () => {
  5  |   test('clicking the theme toggle changes the <html> class attribute', async ({ page }) => {
  6  |     const homePage = new HomePage(page);
  7  |     await homePage.goto('en');
  8  | 
  9  |     const htmlEl = page.locator('html');
  10 |     const classBefore = await htmlEl.getAttribute('class');
  11 | 
> 12 |     await homePage.themeToggle.click();
     |                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  13 | 
  14 |     await expect
  15 |       .poll(async () => await htmlEl.getAttribute('class'))
  16 |       .not.toBe(classBefore);
  17 |   });
  18 | 
  19 |   test('selected theme persists after page reload', async ({ page }) => {
  20 |     const homePage = new HomePage(page);
  21 |     await homePage.goto('en');
  22 | 
  23 |     const htmlEl = page.locator('html');
  24 |     await homePage.themeToggle.click();
  25 |     const classAfterToggle = await htmlEl.getAttribute('class');
  26 | 
  27 |     await page.reload();
  28 | 
  29 |     await expect(htmlEl).toHaveAttribute('class', classAfterToggle ?? '');
  30 |   });
  31 | });
```