// import { expect, test } from '@playwright/test';
// import {
//   mockSignupSuccess,
//   mockSignupError,
//   mockLoginSuccess,
//   mockLoginError,
//   mockSignoutSuccess,
// } from './mocks/supabaseAuthResponses';

// test.describe('Authentication flow', () => {
//   test('user can sign up', async ({ page }) => {
//     await mockSignupSuccess(page);
//     await page.goto('/auth/signup');
//     await page.getByLabel('Email').type('test@example.com');
//     await page.getByLabel('Password').type('password123');
//     await page.getByRole('button', { name: 'Sign up button' }).click();
//     await expect(
//       page.getByText('Sign up successful, redirecting.')
//     ).toBeVisible();
//     await page.waitForURL('/dashboard');
//     await expect(
//       page.getByRole('heading', { name: 'Dashboard' })
//     ).toBeVisible();
//   });

//   test('signup page displays user already exists error', async ({ page }) => {
//     await mockSignupError(page);
//     await page.goto('/auth/signup');
//     await page.getByLabel('Email').type('test@example.com');
//     await page.getByLabel('Password').type('password123');
//     await page.getByRole('button', { name: 'Sign up button' }).click();
//     await expect(page.getByText('Email already in use')).toBeVisible();
//   });

//   test('user can log in', async ({ page }) => {
//     await mockLoginSuccess(page);
//     await page.goto('/auth/login');
//     await page.getByLabel('Email').type('test@example.com');
//     await page.getByLabel('Password').type('password123');
//     await page.getByRole('button', { name: 'Log in button' }).click();
//     await expect(
//       page.getByText('Log in successful, redirecting.')
//     ).toBeVisible();
//     await page.waitForURL('/dashboard');
//     await expect(
//       page.getByRole('heading', { name: 'Dashboard' })
//     ).toBeVisible();
//   });

//   test('login page displays invalid credentials error', async ({ page }) => {
//     console.log('Setting up mockLoginError');
//     await mockLoginError(page);
//     await page.goto('/auth/login');
//     await page.getByLabel('Email').type('invalid@example.com');
//     await page.getByLabel('Password').type('password123');
//     await page.getByRole('button', { name: 'Log in button' }).click();
//     await page.screenshot({ path: 'login-error.png' });
//     await expect(page.getByText('Invalid credentials')).toBeVisible();
//   });

//   test('user can sign out', async ({ page }) => {
//     await mockSignoutSuccess(page);
//     await page.goto('/dashboard');
//     await expect(page.getByText('Dashboard')).toBeVisible();
//     await page.getByRole('button', { name: 'Sign out button' }).click();
//     await page.waitForURL('/auth/login', { timeout: 10000 });
//     await expect(page.getByLabel('Email')).toBeVisible();
//   });
// });
