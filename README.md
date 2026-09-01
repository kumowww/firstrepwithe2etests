# firstrepwithe2etests# E2E Tests

End-to-end test suites for my own projects, written with [Playwright](https://playwright.dev/) + TypeScript.

Each top-level folder is a self-contained test project targeting one of my repositories. Every folder has its own `package.json`, `playwright.config.ts`, and README, so it can be set up and run independently.

## Projects

| Folder | Target | Source repo |
|---|---|---|
| [`laravel-blog-app/`](./laravel-blog-app) | [laravelblogapplication.vercel.app](https://laravelblogapplication.vercel.app/) | [kumowww/laravelblogapplication](https://github.com/kumowww) |

More projects will be added here as new repos get E2E coverage.

## Why Playwright

This complements my [Selenium/pytest suite](https://github.com/kumowww/autotests). Playwright is the newer industry-standard framework alongside Selenium and Cypress:

- Auto-waiting assertions instead of manual explicit waits
- Locators resolved by role/label (`getByRole`, `getByLabel`) instead of brittle CSS/XPath
- Built-in trace/screenshot/video capture on failure
- One API runs against Chromium, Firefox, and WebKit

## CI

Each project has its own GitHub Actions workflow under [`.github/workflows`](./.github/workflows), scoped to its folder via `working-directory`, so projects build and run independently of each other.
