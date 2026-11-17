import type { Page } from '@playwright/test';
import { type Target } from '../../screenplay/core';

export const InventoryPageTargets: Record<string, (value?: string) => Target> & {
    pageTitle: Target;
    cartLink: Target;
    cartBadge: Target;
    productNames: Target;
    productPrices: Target;
    sortDropdown: Target;
    detailsName: Target;
    detailsPrice: Target;
    backToProducts: Target;
    menuButton: Target;
    logoutLink: Target;
    resetAppLink: Target;
    closeMenu: Target;
    addButton: (productName: string) => Target;
    removeButton: (productName: string) => Target;
    productNameByText: (productName: string) => Target;
} = {
    pageTitle: (page: Page) => page.locator('.title'),
    cartLink: (page: Page) => page.locator('.shopping_cart_link'),
    cartBadge: (page: Page) => page.locator('.shopping_cart_badge'),
    productNames: (page: Page) => page.locator('.inventory_item_name'),
    productPrices: (page: Page) => page.locator('.inventory_item_price'),
    sortDropdown: (page: Page) => page.locator('.product_sort_container'),
    detailsName: (page: Page) => page.locator('.inventory_details_name'),
    detailsPrice: (page: Page) => page.locator('.inventory_details_price'),
    backToProducts: (page: Page) => page.locator('#back-to-products'),
    menuButton: (page: Page) => page.locator('#react-burger-menu-btn'),
    logoutLink: (page: Page) => page.locator('#logout_sidebar_link'),
    resetAppLink: (page: Page) => page.locator('#reset_sidebar_link'),
    closeMenu: (page: Page) => page.locator('#react-burger-cross-btn'),
    addButton: (productName: string) => (page: Page) =>
        page.locator(`xpath=//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`),
    removeButton: (productName: string) => (page: Page) =>
        page.locator(`xpath=//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button[text()='Remove']`),
    productNameByText: (productName: string) => (page: Page) =>
        page.locator(`xpath=//div[contains(@class,'inventory_item_name')][text()='${productName}']`)
};
