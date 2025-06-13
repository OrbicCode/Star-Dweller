import { Page } from '@playwright/test';

export async function mockSignupSuccess(page: Page) {
  await page.route('**/auth/v1/signup', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          user: { id: '123', email: 'test@example.com' },
          session: { access_token: 'mock_token' },
        },
        error: null,
      }),
    });
  });
}

export async function mockSignupError(page: Page) {
  await page.route('**/auth/v1/signup', async route => {
    await route.fulfill({
      status: 422,
      contentType: 'application/json',
      body: JSON.stringify({
        error: {
          code: 'user_already_exists',
          message: 'User already registered',
        },
      }),
    });
  });
}

export async function mockLoginSuccess(page: Page) {
  await page.route('**/auth/v1/token', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          user: { id: '123', email: 'test@example.com' },
          session: { access_token: 'mock_token' },
        },
        error: null,
      }),
    });
  });
}

export async function mockLoginError(page: Page) {
  await page.route('**/auth/v1/token', async route => {
    console.log('Mocking /auth/v1/token with error response');
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        error: {
          code: 'invalid_credentials',
          message: 'Invalid login credentials',
        },
      }),
    });
  });
}

export async function mockSignoutSuccess(page: Page) {
  await page.route('**/auth/v1/logout', async route => {
    console.log('Mocking signout success response:', route.request().url());
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });
}

export async function mockSignoutError(page: Page) {
  await page.route('**/auth/v1/logout', async route => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ error: { message: 'Failed to logout' } }),
    });
  });
}
