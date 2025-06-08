import { test, expect } from '@playwright/test';

test.describe('Sign Up page', () => {
	test('renders signup form', async ({ page }) => {
		await page.goto('/auth/signup');

		await expect(page.getByLabel('Email:')).toBeVisible();
		await expect(page.getByLabel('Password:')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Sign Up Button' })).toBeVisible();
	});

	test('signup successfully and redirect to dashboard', async ({ page }) => {
		await page.goto('/auth/signup');
		const emailInput = page.getByLabel('Email:');

		const uniqueEmail = `test${Date.now()}@example.com`;
		await emailInput.type(uniqueEmail);
		await expect(emailInput).toHaveValue(uniqueEmail);

		await page.getByLabel('Password:').type('password123');
		await page.getByRole('button', { name: 'Sign Up Button' }).click();

		await expect(page.getByText('Sign up successful! Redirecting...')).toBeVisible();
		await page.waitForURL('/dashboard');
		await expect(page).toHaveURL('/dashboard');
	});

	test('shows errors for missing email and password', async ({ page }) => {
		await page.goto('/auth/signup');

		await page.getByRole('button', { name: 'Sign Up Button' }).click();

		await expect(page.getByText('Email is required')).toBeVisible();
		await expect(page.getByText('Password is required')).toBeVisible();
	});
});
