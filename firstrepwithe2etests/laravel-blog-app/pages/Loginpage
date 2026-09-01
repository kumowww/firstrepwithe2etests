import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel(/Email/i);
    this.passwordInput = page.getByLabel(/Password/i);
    this.rememberMeCheckbox = page.getByLabel(/Remember me/i);
    this.submitButton = page.getByRole('button', { name: /^Login$/i });
  }

  async goto(lang: 'en' | 'de' | 'ru' = 'en') {
    await this.page.goto(`/${lang}/login`);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async submitEmpty() {
    await this.submitButton.click();
  }
}