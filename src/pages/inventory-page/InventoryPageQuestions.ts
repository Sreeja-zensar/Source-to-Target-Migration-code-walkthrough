import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../../screenplay/core';
import { InventoryPageTargets } from './InventoryPageTargets';

export const InventoryPageQuestions = {
    isInventoryPageDisplayed: (): Question<boolean> =>
        question('is inventory page displayed', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            await page.waitForURL(/inventory/);
            return (await page.locator('.title').innerText()) === 'Products';
        }),
    getTitleText: (): Question<string> =>
        question('get title text', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            return await page.locator('.title').innerText();
        }),
    getAllProductNames: (): Question<string[]> =>
        question('get all product names', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            const names = await page.locator('.inventory_item_name').all();
            const results: string[] = [];
            for (const el of names) {
                results.push(await el.innerText());
            }
            return results;
        }),
    getAllProductPrices: (): Question<number[]> =>
        question('get all product prices', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            const prices = await page.locator('.inventory_item_price').all();
            const results: number[] = [];
            for (const el of prices) {
                results.push(parseFloat((await el.innerText()).replace('$', '')));
            }
            return results;
        }),
    getProductCount: (): Question<number> =>
        question('get product count', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            return await page.locator('.inventory_item_name').count();
        }),
    getSelectedSortOption: (): Question<string> =>
        question('get selected sort option', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            return await page.locator('.product_sort_container').inputValue();
        }),
    getCartCount: (): Question<number> =>
        question('get cart count', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            const badge = page.locator('.shopping_cart_badge');
            if (!(await badge.isVisible())) {
                return 0;
            }
            return parseInt(await badge.innerText(), 10);
        }),
    getDetailsProductName: (): Question<string> =>
        question('get details product name', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            return await page.locator('.inventory_details_name').innerText();
        }),
    getDetailsProductPrice: (): Question<number> =>
        question('get details product price', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            return parseFloat((await page.locator('.inventory_details_price').innerText()).replace('$', ''));
        })
};
