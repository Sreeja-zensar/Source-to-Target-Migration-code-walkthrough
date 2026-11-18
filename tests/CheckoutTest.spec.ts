import { test, expect } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { DBUtil } from '../src/utils/DBUtil';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';

export class CheckoutTest {
}

test.describe('CheckoutTest', () => {
    test('completeCheckoutTest', async ({ page }) => {
        const user = (await DBUtil.getUsersByType('VALID'))[0];
        const product = 'Sauce Labs Backpack';

        const inventoryPage = await new LoginPage(page).login(user[0], user[1]);
        await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();

        await inventoryPage.addProductToCart(product);
        await expect(inventoryPage.getCartCount()).toBe(1);

        const cartPage = await inventoryPage.openCart();
        await expect(cartPage.getCartItemCount()).toBe(1);
        await expect((await cartPage.getCartItemNames()).includes(product)).toBeTruthy();

        const checkoutPage = await cartPage.clickCheckout();
        await checkoutPage.enterCustomerDetails('Sreeja', 'Demo', '600001');
        await checkoutPage.clickContinue();

        // UI price should match the DB price
        await expect(checkoutPage.getItemTotal()).toBe(await DBUtil.getProductPrice(product));

        await checkoutPage.clickFinish();
        await expect(checkoutPage.isOrderComplete()).toBeTruthy();

        // write the result back to the DB and verify it
        await DBUtil.saveOrder(user[0], 'Sreeja', 'Demo', '600001', 1, 'COMPLETED');
        await expect(DBUtil.getLatestOrderStatus(user[0])).toBe('COMPLETED');
    });

    test('checkoutMissingFirstNameTest', async ({ page }) => {
        const user = (await DBUtil.getUsersByType('VALID'))[0];

        const inventoryPage = await new LoginPage(page).login(user[0], user[1]);
        await inventoryPage.addProductToCart('Sauce Labs Onesie');
        const checkoutPage = await (await inventoryPage.openCart()).clickCheckout();

        await checkoutPage.enterCustomerDetails('', 'Demo', '600001');
        await checkoutPage.clickContinue();
        await expect(checkoutPage.getErrorMessage()).toBe('Error: First Name is required');
    });
});
