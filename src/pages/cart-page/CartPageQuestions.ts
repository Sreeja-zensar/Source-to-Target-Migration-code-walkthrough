import { question, type Question } from '../../screenplay/core';
import { CartPageTargets } from './CartPageTargets';

export const CartPageQuestions = {
    cartItemCount: (): Question<number> =>
        question('cart item count', async (actor) => {
            const page = actor.abilityTo('BrowseTheWeb').getPage();
            return await CartPageTargets.cartItems(page).count();
        }),
    cartItemNames: (): Question<string[]> =>
        question('cart item names', async (actor) => {
            const page = actor.abilityTo('BrowseTheWeb').getPage();
            const items = await CartPageTargets.cartItemNames(page).all();
            const names: string[] = [];
            for (const item of items) {
                names.push(await item.innerText());
            }
            return names;
        })
};
