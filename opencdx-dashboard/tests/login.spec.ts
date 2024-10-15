import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('form', { name: 'login form' })).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    // Update the password field selector
    await expect(page.getByLabel('Password', { exact: true }).and(page.getByRole('textbox', { type: 'password' }))).toBeVisible();
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

    await page.getByLabel('Email Address').fill('Test@1.com');
    await page.getByLabel('Password', { exact: true }).fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert successful login (e.g., redirect to dashboard)
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
    await expect(page).toHaveURL('/forgot-password');
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.getByRole('link', { name: "Sign Up" }).click();
    await expect(page).toHaveURL('/signup');
  });
});
