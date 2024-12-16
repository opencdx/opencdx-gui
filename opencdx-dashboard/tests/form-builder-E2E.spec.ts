import { test, expect } from '@playwright/test';
import path from 'path';
import { sendReport } from './SendReport';

test.describe('File Upload, Edit and Save', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/dashboard/auth/login');

    // Perform the login
    await page.getByLabel('Email Address').fill('admin@opencdx.org');
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait until the URL is the dashboard page
    await page.waitForURL('/dashboard/pages/form-builder');
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
    // await page.locator('span:has-text("User Question")').click();
    await page.getByRole('button', { name: 'Submit Form' }).click();
    await page.waitForTimeout(3000);
  });

  test('upload form, edit and save', async ({ page }) => {
    const jsonFilePath = path.join(__dirname, 'file', 'alpha.anf.json');
    const fileInput = await page.locator('input[type="file"]');

    // Upload the JSON file
    await fileInput.setInputFiles(jsonFilePath);
    await page.getByRole('button', { name: 'Add ANF Statement' }).click();
    await page.locator('span:has-text("ANF Statement")').click();
    await page.locator('span:has-text("Main ANF Statement")').click();
    await page.getByLabel('Select an operator').nth(1).click();
    await page.locator('span:has-text("Equal")').nth(0).click();
    await page.getByLabel('Enter an answer').fill('100');
    page.locator('input[placeholder="Lower Bound"]').fill('30');
    page.locator('input[placeholder="Upper Bound"]').fill('90');
    page.locator('input[placeholder="Semantic"]').fill('5 sec');
    page.locator('input[placeholder="Resolution"]').fill('2');
    await page.getByRole('button', { name: 'Submit Form' }).click();
    await page.waitForTimeout(3000);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test.afterAll(async ({ browser }) => {
    // Wait for the browser to close before sending the report
    await browser.close();

    // Step to send the email after the tests are done
    await sendReport();
  });
});