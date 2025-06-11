import { Page } from '@playwright/test';

export async function signupSuccess(page: Page) {
  await page.route('**/auth/v1/signup', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          user: { id: '123', email: 'test@example.com' },
          session: null,
        },
        error: null,
      }),
    });
  });
}

export async function signupExistError(page: Page) {
  await page.route('**/auth/v1/signup', async route => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'User already registered',
        error_description: 'User already registered',
      }),
    });
  });
}
