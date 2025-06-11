import { test, expect } from '@playwright/test';
import {
  loginSuccess,
  loginInvalidError,
} from './mocks/supabaseLoginResponses';

test.describe('Log In Form', () => {
  test('logs in successfully and redirects to dashboard', async ({ page }) => {
    await loginSuccess(page);
    await page.goto('/auth/login');
    await page.getByLabel('Email:').type('test@example.com');
    await page.getByLabel('Password:').type('password123');
    await page.getByRole('button', { name: 'Log In Button' }).click();

    await expect(
      page.getByText('Log in successful, redirecting.')
    ).toBeVisible();
    await page.waitForURL('/dashboard', { timeout: 5000 });
    await expect(page).toHaveURL('/dashboard');
  });

  test('displays required errors for empty inputs', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByRole('button', { name: 'Log In Button' }).click();

    await expect(page.getByText('Email required')).toBeVisible();
    await expect(page.getByText('Password required')).toBeVisible();
  });

  test('shows invalid credentials error', async ({ page }) => {
    await loginInvalidError(page);
    await page.goto('/auth/login');
    await page.getByLabel('Email:').type('invalid@example.com');
    await page.getByLabel('Password:').type('password123');
    await page.getByRole('button', { name: 'Log In Button' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
