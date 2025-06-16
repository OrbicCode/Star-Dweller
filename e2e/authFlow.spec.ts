import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('shows validation errors on empty signup', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('button', { name: 'Submit button' }).click();

    await expect(page.getByText('Email required')).toBeVisible();
    await expect(page.getByText('Password required')).toBeVisible();
  });

  test('shows validation error for invalid email on signup', async ({
    page,
  }) => {
    await page.goto('/signup');
    await page.getByLabel('Email').fill('invalidemail.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Submit button' }).click();

    await expect(page.getByText('Invalid email')).toBeVisible();
  });

  test('shows validation error for short password on signup', async ({
    page,
  }) => {
    await page.goto('/signup');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('123');
    await page.getByRole('button', { name: 'Submit button' }).click();

    await expect(
      page.getByText('Password must be at least 6 characters')
    ).toBeVisible();
  });

  test('shows validation errors on empty login', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Submit button' }).click();

    await expect(page.getByText('Email required')).toBeVisible();
    await expect(page.getByText('Password required')).toBeVisible();
  });

  test('shows validation error for invalid email on login', async ({
    page,
  }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('invalidemail.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Submit button' }).click();

    await expect(page.getByText('Invalid email')).toBeVisible();
  });

  test('shows validation error for short password on login', async ({
    page,
  }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('123');
    await page.getByRole('button', { name: 'Submit button' }).click();

    await expect(
      page.getByText('Password must be at least 6 characters')
    ).toBeVisible();
  });
});
