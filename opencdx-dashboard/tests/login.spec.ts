import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/dashboard/auth/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('form', { name: 'login form' })).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    // Update the password field selector
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should enable login button when both fields are filled', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeDisabled();

    await page.getByLabel('Email Address').fill('user@example.com');
    await page.getByLabel('Password', { exact: true }).fill('password123');

    await expect(loginButton).toBeEnabled();
  });

  test('should successfully log in with valid credentials', async ({ page }) => {
    // Mock successful login API response with redirect
    await page.route('**/iam/user/login', async route => {
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true, redirect: '/dashboard/pages/form-builder' }) });
    });

    await page.getByLabel('Email Address').fill('admin@opencdx.org');
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for navigation to the dashboard page
    await page.waitForURL('/dashboard/pages/form-builder', { timeout: 10000 });
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Mock failed login API response
    await page.route('**/iam/user/login', async route => {
      await route.fulfill({ status: 401, body: JSON.stringify({ error: 'Invalid credentials' }) });
    });

    await page.getByLabel('Email Address').fill('invalid@example.com');
    await page.getByLabel('Password', { exact: true }).fill('wrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert error toast is displayed
    await expect(page.getByText('Invalid credentials.')).toBeVisible();
  });

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByLabel('Password', { exact: true });
    // Button uses aria-label="toggle password visibility" (lowercase)
    const toggleButton = page.getByRole('button', { name: 'toggle password visibility' });

    await passwordInput.fill('secretPassword');
    
    // Password should be hidden by default
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click to hide password again
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.getByRole('link', { name: 'Forgot Password', exact: true }).click();
    await page.waitForURL('/dashboard/auth/forgot-password', { timeout: 10000 });
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.getByRole('link', { name: "Sign Up" }).click();
    await page.waitForURL('/dashboard/auth/signup', { timeout: 10000 });
  });

  test('upload form and save', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeDisabled();

    await page.getByLabel('Email Address').fill('admin@opencdx.org');
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Navigate to form builder
    await page.goto('/dashboard/pages/form-builder');
    // Upload JSON using the actual hidden input id
    const jsonFilePath = path.join(__dirname, 'file', 'alpha.json');
    await page.locator('#file-upload').setInputFiles(jsonFilePath);
    await page.waitForURL('/dashboard/pages/edit-questionnaire/upload-questionnaire');
    await page.getByRole('button', { name: 'Add ANF Statement' }).click();
    await page.locator('label:has-text("ANF Statement Name*")').fill('Test');
    await page.locator('button:has-text("Done")').click();
    await page.locator('//img[@alt="Expand"]').click();
    await page.locator('//span[contains(text(),"Main ANF Statement")]').click();
    await page.getByRole('button', { name: 'Save Form' }).click();
    await page.waitForTimeout(3000);
  });

  // Note: Do not manually close page/browser; Playwright test runner manages lifecycle.
});
