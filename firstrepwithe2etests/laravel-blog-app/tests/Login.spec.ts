import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto('en');
  });

  test('login form renders all fields', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('email field has type="email"', async () => {
    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
  });

  test('empty form does not submit due to required fields', async ({ page }) => {
    await loginPage.submitEmpty();
    await expect(page).toHaveURL(/\/en\/login$/);
    await expect(loginPage.emailInput).toHaveAttribute('required', '');
  });

  test('invalid email fails native HTML5 validation', async ({ page }) => {
    await loginPage.emailInput.fill('not-an-email');
    await loginPage.passwordInput.fill('somepassword');
    await loginPage.submitButton.click();

    const isValid = await loginPage.emailInput.evaluate(
      (el: HTMLInputElement) => el.checkValidity()
    );
    expect(isValid).toBe(false);
    await expect(page).toHaveURL(/\/en\/login$/);
  });

  test.skip('valid credentials log the user in', async () => {
    // TODO: enable once a seeded test account is available
    // await loginPage.login('test@example.com', 'correct-password');
    // await expect(page).toHaveURL(/\/en\/(dashboard|profile)/);
  });
});