import { Page } from '@playwright/test';

export async function loginSuccess(page: Page) {
  await page.route('**/auth/v1/token', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
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
        AuthApiError: 'Invalid login credentials',
        message: 'Invalid login credentials',
      }),
    });
  });
}
