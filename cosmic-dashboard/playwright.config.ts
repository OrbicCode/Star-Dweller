import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e', // Directory for your E2E tests
	timeout: 30 * 1000, // Each test can run for up to 30 seconds
	retries: 0, // Set to >0 to retry failing tests
	reporter: [['html', { open: 'never' }]],
	use: {
		baseURL: 'http://localhost:3000', // Change if your dev server runs elsewhere
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		video: 'retain-on-failure', // Record video only when a test fails
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'Chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'Firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'WebKit',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 13'] }, // Add this block for mobile emulation
		},
	],
	webServer: {
		command: 'npm run dev',
		port: 3000,
		reuseExistingServer: !process.env.CI,
	},
});
