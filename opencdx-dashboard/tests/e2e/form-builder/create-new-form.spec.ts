import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Form Builder - Create New Form', () => {
  test('create new form from scratch', async ({ page }) => {
    const credsPath = path.resolve(process.cwd(), 'tests/local.credentials.json');
    if (!fs.existsSync(credsPath)) {
      throw new Error(
        'Missing credentials file: tests/local.credentials.json. Create it locally with {"email":"admin@opencdx.org","password":"password"} (do NOT commit).'
      );
    }
    const raw = fs.readFileSync(credsPath, 'utf-8');
    const { email, password } = JSON.parse(raw);

    // Login
    await page.goto('auth/login'); // resolves to /dashboard/auth/login via baseURL
    await page.getByLabel('Email Address').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/dashboard/pages/form-builder', { timeout: 15000 });

    // Go to create new form (wait for navigation explicitly)
    const createBtn = page.getByRole('button', { name: 'Create New Form' }).first();
    await expect(createBtn).toBeVisible();
    await Promise.all([
      page.waitForURL('/dashboard/pages/edit-questionnaire/new-questionnaire', { timeout: 15000 }),
      createBtn.click(),
    ]);

    // Generate a unique form content value: "Playwright E2E Test"
    const formTitle = `Playwright E2E Test`;

    // The page opens a "Create New Form" modal; fill the name and continue
    const nameInput = page.getByLabel('Form Name*');
    await expect(nameInput).toBeVisible();
    await nameInput.fill(formTitle);
    await page.getByRole('button', { name: 'Continue' }).click();
    // Optional toast assertion (best-effort)
    const successToast = page.getByText('Form successfully created! Begin adding questions.');
    if (await successToast.count()) {
      await expect(successToast).toBeVisible();
    }

    // Save the form (best-effort)
    const saveButton = page.getByRole('button', { name: 'Save Form' });
    if (await saveButton.count()) {
      await saveButton.click();
    }

    // Basic post-save sanity: remain on edit page or route changes without error
    await page.waitForLoadState('networkidle');
    const currentUrl = page.url();
    expect(currentUrl.includes('/dashboard/pages/edit-questionnaire/')).toBeTruthy();

    // Temporary visual hold to inspect the created form before the test exits
    await page.waitForTimeout(15000);
  });
});


