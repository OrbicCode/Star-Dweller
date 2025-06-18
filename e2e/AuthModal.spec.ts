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
});
