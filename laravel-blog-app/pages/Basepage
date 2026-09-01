import { Page, Locator, expect } from '@playwright/test';

/**
 * Shared header/navigation elements, present on every page.
 */
export class BasePage {
  readonly page: Page;

  readonly homeLink: Locator;
  readonly postsLink: Locator;
  readonly productsLink: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;

  readonly langEn: Locator;
  readonly langDe: Locator;
  readonly langRu: Locator;

  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeLink = page.getByRole('link', { name: /^(Home|Startseite|Главная)$/ });
    this.postsLink = page.getByRole('link', { name: /^(Posts|Beiträge|Посты)$/ });
    this.productsLink = page.getByRole('link', { name: /^(Products|Produkte|Продукты)$/ });
    this.loginLink = page.getByRole('link', { name: /^(Login|Anmelden|Вход)$/ });
    this.registerLink = page.getByRole('link', { name: /^(Register|Registrieren|Регистрация)$/ });

    this.langEn = page.getByRole('link', { name: 'EN', exact: true });
    this.langDe = page.getByRole('link', { name: 'DE', exact: true });
    this.langRu = page.getByRole('link', { name: 'RU', exact: true });

    // No accessible name on the theme icon button (no aria-label/testid),
    // so we fall back to positional selection as the first header button.
    this.themeToggle = page.locator('header button, header [role="button"]').first();
  }

  async open(path: string = '/en') {
    await this.page.goto(path);
  }

  async switchLanguage(lang: 'en' | 'de' | 'ru') {
    const target = { en: this.langEn, de: this.langDe, ru: this.langRu }[lang];
    await target.click();
  }

  async expectLanguage(lang: 'EN' | 'DE' | 'RU') {
    await expect(this.page).toHaveURL(new RegExp(`/${lang.toLowerCase()}(/|$)`));
  }
}