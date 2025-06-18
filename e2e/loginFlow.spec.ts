// e2e/auth/Login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      'https://*.supabase.co/auth/v1/token',
      async (route, request) => {
        if (request.method() === 'POST') {
          await route.fulfill({
            status: 200,
            body: JSON.stringify({
              access_token: 'mocked-access-token',
              user: { id: '123', email: 'test@example.com' },
            }),
          });
        }
      }
    );
    await page.route('https://*.supabase.co/auth/v1/user', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: { id: '123', email: 'test@example.com' },
        }),
      });
    });
    await page.goto('/');
  });

  test('should login and redirect to dashboard', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Submit button' }).click();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome Earthling')).toBeVisible();
  });
});
