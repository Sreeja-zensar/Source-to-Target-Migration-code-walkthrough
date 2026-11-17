import type { Page } from '@playwright/test';
import { type Target } from '../../screenplay/core';

export const CartPageTargets = {
    cartItems: (page: Page): Target => page.locator('.cart_item'),
    cartItemNames: (page: Page): Target => page.locator('.inventory_item_name'),
    checkoutButton: (page: Page): Target => page.locator('#checkout'),
    continueShoppingButton: (page: Page): Target => page.locator('#continue-shopping')
};
