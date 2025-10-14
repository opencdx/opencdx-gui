import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Cleanup - Delete forms created by E2E', () => {
  test('delete all "Playwright E2E Test" forms', async ({ page }) => {
    const credsPath = path.resolve(process.cwd(), 'tests/local.credentials.json');
    if (!fs.existsSync(credsPath)) {
      throw new Error(
        'Missing credentials file: tests/local.credentials.json. Create it locally with {"email":"admin@opencdx.org","password":"password"} (do NOT commit).'
      );
    }
    const raw = fs.readFileSync(credsPath, 'utf-8');
    const { email, password } = JSON.parse(raw);

    // Login
    await page.goto('auth/login');
    await page.getByLabel('Email Address').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/dashboard/pages/form-builder', { timeout: 15000 });

    // Switch to list view for reliable row operations
    const listViewBtn = page.getByRole('button', { name: 'List View' });
    if (await listViewBtn.count()) {
      await listViewBtn.click();
    }

    // Delete all rows containing the target title
    // Loop with a safety cap to avoid infinite loops
    for (let i = 0; i < 20; i++) {
      const targetRow = page.locator('table tbody tr').filter({ hasText: 'Playwright E2E Test' }).first();
      if ((await targetRow.count()) === 0) break;

      await targetRow.locator('[data-testid="delete-form"]').click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await dialog.getByRole('button', { name: 'Delete' }).click();
      // Wait for row to disappear
      await expect(targetRow).toHaveCount(0);
    }
  });
});


