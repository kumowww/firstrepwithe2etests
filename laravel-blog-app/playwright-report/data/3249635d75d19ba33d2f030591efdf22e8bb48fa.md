# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: placeholder-pages.spec.ts >> Work-in-progress pages (placeholders) >> /en/products responds 200 and shows a clear message
- Location: tests\placeholder-pages.spec.ts:11:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Products Feature/i)
Expected: visible
Error: strict mode violation: getByText(/Products Feature/i) resolved to 2 elements:
    1) <h1>Products Feature</h1> aka getByRole('heading', { name: 'Products Feature' })
    2) <p>↵        The products feature is currently under …</p> aka getByText('The products feature is')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Products Feature/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - navigation [ref=e4]:
        - link "Home" [ref=e5] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/en
        - link "Posts" [ref=e6] [cursor=pointer]:
          - /url: https://laravelblogapplication.vercel.app/en/posts
        - link "Products" [ref=e7] [cursor=pointer]:
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
      - heading "Products Feature" [level=1] [ref=e19]
      - paragraph [ref=e20]: The products feature is currently under development. The future of this functionality is still being determined.
      - link "Back to Home" [ref=e22] [cursor=pointer]:
        - /url: https://laravelblogapplication.vercel.app/en
  - contentinfo [ref=e23]:
    - paragraph [ref=e24]: © 2026 Laravel Blog. All rights reserved.
    - paragraph [ref=e25]:
      - text: Created by
      - link "github:kumowww" [ref=e26] [cursor=pointer]:
        - /url: https://github.com/kumowww
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const placeholders = [
  4  |   { path: '/en/posts', message: /Posts Coming Soon/i },
  5  |   { path: '/en/products', message: /Products Feature/i },
  6  |   { path: '/en/register', message: /Registration Coming Soon/i },
  7  | ];
  8  | 
  9  | test.describe('Work-in-progress pages (placeholders)', () => {
  10 |   for (const { path, message } of placeholders) {
  11 |     test(`${path} responds 200 and shows a clear message`, async ({ page }) => {
  12 |       const response = await page.goto(path);
  13 |       expect(response?.status()).toBe(200);
> 14 |       await expect(page.getByText(message)).toBeVisible();
     |                                             ^ Error: expect(locator).toBeVisible() failed
  15 |     });
  16 | 
  17 |     test(`${path} has a working "Back to Home" link`, async ({ page }) => {
  18 |       await page.goto(path);
  19 |       const backLink = page.getByRole('link', { name: /Back to Home/i });
  20 |       await expect(backLink).toBeVisible();
  21 | 
  22 |       await backLink.click();
  23 |       await expect(page).toHaveURL(/\/en\/?$/);
  24 |     });
  25 |   }
  26 | });
```