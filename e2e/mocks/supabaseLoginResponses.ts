import { Page } from '@playwright/test';

export async function loginSuccess(page: Page) {
  await page.route('**/auth/v1/token', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'mock-access-token',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'mock-refresh-token',
        user: {
          id: '123',
          email: 'test@example.com',
        },
      }),
    });
  });
}

export async function loginInvalidError(page: Page) {
  await page.route('**/auth/v1/token', async route => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'invalid_grant',
        error_description: 'Invalid login credentials',
      }),
    });
  });
}
