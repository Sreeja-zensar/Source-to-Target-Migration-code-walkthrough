import { test, expect } from '@playwright/test';
import { DBUtil } from '../src/utils/DBUtil';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';

export class LoginTest {
}

test.describe('LoginTest', async () => {
    const invalidUsersData = async () => {
        const lockedUsers = await DBUtil.getUsersByType('LOCKED');
        const invalidUsers = await DBUtil.getUsersByType('INVALID');
        const rows = [...lockedUsers, ...invalidUsers];
        return rows.map((row) => [row[0], row[1], row[2]] as [string, string, string]);
    };

    test('validLoginTest', async ({ page }) => {
        const users = await DBUtil.getUsersByType('VALID');
        const user = users[0];

        const loginPage = new LoginPage(page);
        await expect(loginPage.isLoginPageDisplayed()).toBeTruthy();

        const inventoryPage = await loginPage.login(user[0], user[1]);
        await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
        await expect(inventoryPage.getPageTitle()).toBe('Swag Labs');
    });

    for (const [username, password, expectedError] of await invalidUsersData()) {
        test(`invalidLoginTest ${username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.login(username, password);
            await expect(loginPage.getErrorMessage()).toBe(expectedError);
        });
    }

    test('emptyUsernameTest', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await expect(loginPage.getErrorMessage()).toBe('Epic sadface: Username is required');
    });

    test('logoutTest', async ({ page }) => {
        const users = await DBUtil.getUsersByType('VALID');
        const user = users[0];
        const inventoryPage = await new LoginPage(page).login(user[0], user[1]);
        await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();

        const loginPage = await inventoryPage.logout();
        await expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
    });
});
