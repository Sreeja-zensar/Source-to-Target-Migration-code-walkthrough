import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../../screenplay/core';
import { InventoryPageTargets } from './InventoryPageTargets';

export const InventoryPageTasks = {
    sortBy: (visibleText: string): Task =>
        task(`sort by ${visibleText}`, async (actor: Actor) => {
            await actor.attemptsTo(Click.on(InventoryPageTargets.sortDropdown));
            await actor.attemptsTo(Click.on(InventoryPageTargets.sortDropdown));
        }),
    sortByValue: (value: string): Task =>
        task(`sort by value ${value}`, async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            await page.locator('.product_sort_container').selectOption({ value });
            await page.waitForTimeout(1000);
        }),
    addProductToCart: (productName: string): Task =>
        task(`add product ${productName} to cart`, async (actor: Actor) => {
            await actor.attemptsTo(Click.on(InventoryPageTargets.addButton(productName)));
        }),
    removeProductFromCart: (productName: string): Task =>
        task(`remove product ${productName} from cart`, async (actor: Actor) => {
            await actor.attemptsTo(Click.on(InventoryPageTargets.removeButton(productName)));
        }),
    openCart: (): Task =>
        task('open cart', async (actor: Actor) => {
            await actor.attemptsTo(Click.on(InventoryPageTargets.cartLink));
        }),
    openProductDetails: (productName: string): Task =>
        task(`open product details for ${productName}`, async (actor: Actor) => {
            await actor.attemptsTo(Click.on(InventoryPageTargets.productNameByText(productName)));
        }),
    backToProducts: (): Task =>
        task('back to products', async (actor: Actor) => {
            await actor.attemptsTo(Click.on(InventoryPageTargets.backToProducts));
        }),
    openMenu: (): Task =>
        task('open menu', async (actor: Actor) => {
            await actor.attemptsTo(Click.on(InventoryPageTargets.menuButton));
            const page = BrowseTheWeb.as(actor);
            await page.waitForTimeout(800);
        }),
    closeMenu: (): Task =>
        task('close menu', async (actor: Actor) => {
            await actor.attemptsTo(Click.on(InventoryPageTargets.closeMenu));
        }),
    resetAppState: (): Task =>
        task('reset app state', async (actor: Actor) => {
            await InventoryPageTasks.openMenu().performAs(actor);
            await actor.attemptsTo(Click.on(InventoryPageTargets.resetAppLink));
            await InventoryPageTasks.closeMenu().performAs(actor);
        }),
    logout: (): Task =>
        task('logout', async (actor: Actor) => {
            await InventoryPageTasks.openMenu().performAs(actor);
            const page = BrowseTheWeb.as(actor);
            await page.locator('#logout_sidebar_link').click();
        })
};
