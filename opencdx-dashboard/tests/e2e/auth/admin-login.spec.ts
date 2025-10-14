import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('admin login redirects to form-builder', async ({ page }) => {
  const credsPath = path.resolve(process.cwd(), 'tests/local.credentials.json');
  if (!fs.existsSync(credsPath)) {
    throw new Error(
      'Missing credentials file: tests/local.credentials.json. Create it locally with {"email":"admin@opencdx.org","password":"password"} (do NOT commit).'
    );
  }

  const raw = fs.readFileSync(credsPath, 'utf-8');
  const { email, password } = JSON.parse(raw);

  // Use path relative to baseURL so it resolves to /dashboard/auth/login
  await page.goto('auth/login');
  await page.getByLabel('Email Address').fill(email);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/dashboard/pages/form-builder', { timeout: 15000 });
});


