import type { Page } from '@playwright/test';
import { type Target } from '../../screenplay/core';

export const LoginPageTargets = {
    usernameInput: (page: Page): Target => page.locator('#user-name'),
    passwordInput: (page: Page): Target => page.locator('#password'),
    loginButton: (page: Page): Target => page.locator('#login-button'),
    errorMessage: (page: Page): Target => page.locator("h3[data-test='error']"),
    logo: (page: Page): Target => page.locator('.login_logo')
};
