import { test, expect } from '@playwright/test';
import { DBUtil } from '../src/utils/DBUtil';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';

export class ProductTest {}

test.describe('ProductTest', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        const user = (await DBUtil.getUsersByType('VALID'))[0];
        const loginPage = new LoginPage(page);
        inventoryPage = await loginPage.login(user[0], user[1]);
        await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
    });

    test('productListMatchesDatabaseTest', async () => {
        const uiNames = await inventoryPage.getAllProductNames();
        const dbNames = await DBUtil.getAllProductNames();
        await expect(inventoryPage.getProductCount()).toBe(6);
        await expect(uiNames.includesAll ? uiNames.includesAll(dbNames) : dbNames.every((name) => uiNames.includes(name))).toBeTruthy();
    });

    test('sortByNameDescendingTest', async () => {
        await inventoryPage.sortBy('Name (Z to A)');

        const actual = await inventoryPage.getAllProductNames();
        const expected = [...actual].sort().reverse();
        await expect(actual).toEqual(expected);
    });

    test('sortByPriceLowToHighTest', async () => {
        await inventoryPage.sortByValue('lohi');

        const actual = await inventoryPage.getAllProductPrices();
        const expected = [...actual].sort((a, b) => a - b);
        await expect(actual).toEqual(expected);
        await expect(inventoryPage.getSelectedSortOption()).toBe('Price (low to high)');
    });

    test('addAndRemoveFromCartTest', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.getCartCount()).toBe(2);

        await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
        await expect(inventoryPage.getCartCount()).toBe(1);
    });

    test('productDetailsPriceTest', async () => {
        const product = 'Sauce Labs Fleece Jacket';
        await inventoryPage.openProductDetails(product);

        await expect(inventoryPage.getDetailsProductName()).toBe(product);
        await expect(inventoryPage.getDetailsProductPrice()).toBe(await DBUtil.getProductPrice(product));
    });
});
