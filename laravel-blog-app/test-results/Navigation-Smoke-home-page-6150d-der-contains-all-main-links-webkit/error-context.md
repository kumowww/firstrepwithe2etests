# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Navigation.spec.ts >> Smoke: home page and navigation >> header contains all main links
- Location: tests\Navigation.spec.ts:18:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /^(Posts|Beiträge|Посты)$/ })
Expected: visible
Error: strict mode violation: getByRole('link', { name: /^(Posts|Beiträge|Посты)$/ }) resolved to 2 elements:
    1) <a href="https://laravelblogapplication.vercel.app/en/posts">Posts</a> aka getByRole('navigation').getByRole('link', { name: 'Posts' })
    2) <a class="btn" href="https://laravelblogapplication.vercel.app/en/posts">Posts</a> aka getByRole('main').getByRole('link', { name: 'Posts' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /^(Posts|Beiträge|Посты)$/ })

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
  4  | test.describe('Smoke: home page and navigation', () => {
  5  |   let homePage: HomePage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     homePage = new HomePage(page);
  9  |     await homePage.goto('en');
  10 |   });
  11 | 
  12 |   test('home page loads and shows heading', async ({ page }) => {
  13 |     await expect(page).toHaveTitle(/Home/i);
  14 |     await homePage.expectHeadingVisible();
  15 |     await expect(homePage.heading).toHaveText(/Welcome to Blog/i);
  16 |   });
  17 | 
  18 |   test('header contains all main links', async () => {
  19 |     await expect(homePage.homeLink).toBeVisible();
> 20 |     await expect(homePage.postsLink).toBeVisible();
     |                                      ^ Error: expect(locator).toBeVisible() failed
  21 |     await expect(homePage.productsLink).toBeVisible();
  22 |     await expect(homePage.loginLink).toBeVisible();
  23 |     await expect(homePage.registerLink).toBeVisible();
  24 |   });
  25 | 
  26 |   test('Posts link navigates to the Posts section', async ({ page }) => {
  27 |     await homePage.postsLink.click();
  28 |     await expect(page).toHaveURL(/\/en\/posts$/);
  29 |   });
  30 | 
  31 |   test('Products link navigates to the Products section', async ({ page }) => {
  32 |     await homePage.productsLink.click();
  33 |     await expect(page).toHaveURL(/\/en\/products$/);
  34 |   });
  35 | 
  36 |   test('Login link navigates to the login page', async ({ page }) => {
  37 |     await homePage.loginLink.click();
  38 |     await expect(page).toHaveURL(/\/en\/login$/);
  39 |   });
  40 | 
  41 |   test('footer contains a link to the author GitHub profile', async ({ page }) => {
  42 |     const authorLink = page.getByRole('link', { name: /kumowww/i });
  43 |     await expect(authorLink).toBeVisible();
  44 |     await expect(authorLink).toHaveAttribute('href', /github\.com\/kumowww/);
  45 |   });
  46 | });
```