import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/login');
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
    // Mock successful login API response
    await page.route('**/iam/user/login', async route => {
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await page.getByLabel('Email Address').fill('admin@opencdx.org');
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert successful login (e.g., redirect to dashboard)
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL('/form-builder');
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
    // Update the aria-label for the toggle button
    const toggleButton = page.getByRole('button', { name: 'Toggle password visibility' });

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
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL('/forgot-password');
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.getByRole('link', { name: "Sign Up" }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL('/signup');
  });

  test('upload form and save', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeDisabled();

    await page.getByLabel('Email Address').fill('admin@opencdx.org');
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Save the file in variable to be uploaded
    const jsonFilePath = path.join(__dirname, 'file', 'alpha.json');

    // Locate the file input element
    const fileInput = await page.locator('input[type="file"]');

    // Upload the JSON file
    await fileInput.setInputFiles(jsonFilePath);

    await page.getByRole('button', { name: 'Add ANF Statement' }).click();
    // await page.locator('#riu').click();

    await page.locator('span:has-text("ANF Statement")').click();
    
    await page.locator('span:has-text("User Question")').click();

    await page.getByRole('button', { name: 'Submit Form' }).click();

    await page.waitForTimeout(3000);
  });

  test.afterEach(async ( { page} ) => {
    await page.close();
  });

  test.afterAll(async ( { browser }) => {
    await browser.close();
  });
});
