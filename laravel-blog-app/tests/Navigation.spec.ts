import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Smoke: home page and navigation', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto('en');
  });

  test('home page loads and shows heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Home/i);
    await homePage.expectHeadingVisible();
    await expect(homePage.heading).toHaveText(/Welcome to Blog/i);
  });

  test('header contains all main links', async () => {
    await expect(homePage.homeLink).toBeVisible();
    await expect(homePage.postsLink).toBeVisible();
    await expect(homePage.productsLink).toBeVisible();
    await expect(homePage.loginLink).toBeVisible();
    await expect(homePage.registerLink).toBeVisible();
  });

  test('Posts link navigates to the Posts section', async ({ page }) => {
    await homePage.postsLink.click();
    await expect(page).toHaveURL(/\/en\/posts$/);
  });

  test('Products link navigates to the Products section', async ({ page }) => {
    await homePage.productsLink.click();
    await expect(page).toHaveURL(/\/en\/products$/);
  });

  test('Login link navigates to the login page', async ({ page }) => {
    await homePage.loginLink.click();
    await expect(page).toHaveURL(/\/en\/login$/);
  });

  test('footer contains a link to the author GitHub profile', async ({ page }) => {
    const authorLink = page.getByRole('link', { name: /kumowww/i });
    await expect(authorLink).toBeVisible();
    await expect(authorLink).toHaveAttribute('href', /github\.com\/kumowww/);
  });
});