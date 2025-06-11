import { test, expect } from '@playwright/test';
import {
  signupSuccess,
  signupExistError,
} from './mocks/supabaseSignupResponses';

test.describe('Sign Up Page', () => {
  test('signup success shows message and redirects', async ({ page }) => {
    await signupSuccess(page);
    await page.goto('/auth/signup');
    await page.getByLabel('Email:').type('test@example.com');
    await page.getByLabel('Password:').type('password123');
    await page.getByRole('button', { name: 'Sign up button' }).click();

    await expect(
      page.getByText('Sign up successful, redirecting.')
    ).toBeVisible();
    await page.waitForURL('/dashboard', { timeout: 5000 });
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  });

  test('shows user exists error', async ({ page }) => {
    await signupExistError(page);
    await page.goto('/auth/signup');
    await page.getByLabel('Email:').type('test@example.com');
    await page.getByLabel('Password:').type('password123');
    await page.getByRole('button', { name: 'Sign up button' }).click();

    await expect(page.getByText('Email already in use')).toBeVisible();
  });
});
