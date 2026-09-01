import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly currentLanguageLabel: Locator;
  readonly diagnosticsButton: Locator;
  readonly clearCacheButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.currentLanguageLabel = page.getByText(/Current Language|Aktuelle Sprache|Текущий язык/);
    this.diagnosticsButton = page.getByRole('button', { name: /Diagnostics|Diagnostik|Диагностика/ });
    this.clearCacheButton = page.getByRole('button', { name: /Clear Cache|Cache leeren|Очистить кэш/ });
  }

  async goto(lang: 'en' | 'de' | 'ru' = 'en') {
    await this.page.goto(`/${lang}`);
  }

  async expectHeadingVisible() {
    await expect(this.heading).toBeVisible();
  }
}