import { test, expect } from '@playwright/test';
import { supabaseSuccess, supabaseExistError } from './mocks/supabaseResponses';

test.describe('Sign Up Page', () => {
  test('signup success shows message and redirects', async ({ page }) => {
    await supabaseSuccess(page);
    await page.goto('/auth/signup');
    await page.getByLabel('Email:').type('test@example.com');
    await page.getByLabel('Password:').type('password123');
    await page.getByRole('button', { name: 'Sign Up Button' }).click();

    await expect(
      page.getByText('Sign Up successful, redirecting.')
    ).toBeVisible();
    await page.waitForURL('/dashboard', { timeout: 10000 });
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  });

  test('shows user exists error', async ({ page }) => {
    await supabaseExistError(page);
    await page.goto('/auth/signup');
    await page.getByLabel('Email:').type('test@example.com');
    await page.getByLabel('Password:').type('password123');
    await page.getByRole('button', { name: 'Sign Up Button' }).click();

    await expect(page.getByText('Email already in use')).toBeVisible();
  });
});
