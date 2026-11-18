import { Click, task, type Task } from '../../screenplay/core';
import { CartPageTargets } from './CartPageTargets';

export const CartPageTasks = {
    clickCheckout: (): Task =>
        task('click checkout', async (actor) => {
            await actor.attemptsTo(Click.on(CartPageTargets.checkoutButton(actor.abilityTo('BrowseTheWeb').getPage())));
        }),
    continueShopping: (): Task =>
        task('continue shopping', async (actor) => {
            await actor.attemptsTo(Click.on(CartPageTargets.continueShoppingButton(actor.abilityTo('BrowseTheWeb').getPage())));
        })
};
