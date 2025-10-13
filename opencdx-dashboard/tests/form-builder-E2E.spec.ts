import { test, expect } from '@playwright/test';
import path from 'path';
import { sendReport } from './SendReport';

test.describe('File Upload, Edit and Save', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/dashboard/auth/login');

    // Perform the login (mock backend success and navigate)
    await page.route('**/iam/user/login', async route => {
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true, redirect: '/dashboard/pages/form-builder' }) });
    });
    await page.getByLabel('Email Address').fill('admin@opencdx.org');
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait until the URL is the dashboard page
    await page.waitForURL('/dashboard/pages/form-builder', { timeout: 10000 });
  });

  test('upload form and save', async ({ page }) => {
    const jsonFilePath = path.join(__dirname, 'file', 'alpha.json');
    const fileInput = await page.locator('input[type="file"]');

    // Upload the JSON file
    await fileInput.setInputFiles(jsonFilePath);
    await page.getByRole('button', { name: 'Add ANF Statement' }).click();
    await page.locator('label:has-text("ANF Statement Name*")').fill('Test');
    await page.locator('button:has-text("Done")').click();
    await page.locator('//img[@alt="Expand"]').click();
    await page.locator('//span[contains(text(),"Main ANF Statement")]').click();
    await page.getByRole('button', { name: 'Save Form' }).click();
    await page.waitForTimeout(3000);
  });

  test('upload form, edit and save', async ({ page }) => {
    const jsonFilePath = path.join(__dirname, 'file', 'alpha.anf.json');
    const fileInput = await page.locator('input[type="file"]');

    // Upload the JSON file
    await fileInput.setInputFiles(jsonFilePath);
    await page.getByRole('button', { name: 'Add ANF Statement' }).click();
    await page.locator('label:has-text("ANF Statement Name*")').fill('Edit Test');
    await page.locator('button:has-text("Done")').click();
    await page.locator('//img[@alt="Expand"]').click();
    await page.locator('//span[contains(text(),"Main ANF Statement")]').click();
    await expect(page.getByRole('button', { name: 'Save Form' })).toBeVisible();
    await page.getByRole('button', { name: 'Save Form' }).click();
    await page.waitForTimeout(3000);
  });

  // Note: Do not manually close page/browser; Playwright manages lifecycle.
});