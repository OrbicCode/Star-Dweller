import { test, expect } from '@playwright/test';

test.describe('AuthModal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open AuthModal when login button is clicked', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
  });

  test('toggles between login and signup when button clicked', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'toggle' }).click();
    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
    await page.getByRole('button', { name: 'toggle' }).click();
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
  });

  test('should close AuthModal when close button is clicked', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
    await page.getByRole('button', { name: 'close' }).click();
    await expect(
      page.getByRole('heading', { name: 'Log in' })
    ).not.toBeVisible();
  });
});
