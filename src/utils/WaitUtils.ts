import { expect, Locator, Page } from '@playwright/test';
import { ConfigReader } from './ConfigReader';

export class WaitUtils {
    static async waitForVisible(page: Page, locator: Locator): Promise<Locator> {
        const timeout = ConfigReader.getInt('explicitWait') * 1000;
        await expect(locator).toBeVisible({ timeout });
        return locator;
    }

    static async waitForClickable(page: Page, locator: Locator): Promise<Locator> {
        const timeout = ConfigReader.getInt('explicitWait') * 1000;
        await expect(locator).toBeEnabled({ timeout });
        return locator;
    }

    static async waitForUrlContains(page: Page, text: string): Promise<boolean> {
        const timeout = ConfigReader.getInt('explicitWait') * 1000;
        await expect(page).toHaveURL(new RegExp(text), { timeout });
        return true;
    }

    /** Legacy habit kept on purpose for the demo: hard-coded sleeps. */
    static async hardWait(millis: number): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, millis));
    }
}
