import type { Page } from '@playwright/test';
import { type Target } from '../../screenplay/core';

export const CheckoutPageTargets: Record<string, (value?: string) => Target> & {
    firstNameInput: Target;
    lastNameInput: Target;
    postalCodeInput: Target;
    continueButton: Target;
    errorMessage: Target;
    itemTotalLabel: Target;
    totalLabel: Target;
    finishButton: Target;
    completeHeader: Target;
    backHomeButton: Target;
} = {
    firstNameInput: (page: Page) => page.locator('#first-name'),
    lastNameInput: (page: Page) => page.locator('#last-name'),
    postalCodeInput: (page: Page) => page.locator('#postal-code'),
    continueButton: (page: Page) => page.locator('#continue'),
    errorMessage: (page: Page) => page.locator("h3[data-test='error']"),
    itemTotalLabel: (page: Page) => page.locator('.summary_subtotal_label'),
    totalLabel: (page: Page) => page.locator('.summary_total_label'),
    finishButton: (page: Page) => page.locator('#finish'),
    completeHeader: (page: Page) => page.locator('.complete-header'),
    backHomeButton: (page: Page) => page.locator('#back-to-products')
};
