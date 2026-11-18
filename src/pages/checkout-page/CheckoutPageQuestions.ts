import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../../screenplay/core';
import { CheckoutPageTargets } from './CheckoutPageTargets';

export const CheckoutPageQuestions = {
    getErrorMessage: (): Question<string> =>
        question('get error message', async (actor: Actor) => {
            return actor.asks(Text.of(CheckoutPageTargets.errorMessage));
        }),
    getItemTotal: (): Question<number> =>
        question('get item total', async (actor: Actor) => {
            const text = await actor.asks(Text.of(CheckoutPageTargets.itemTotalLabel));
            return parseFloat(text.substring(text.indexOf('$') + 1));
        }),
    getTotalText: (): Question<string> =>
        question('get total text', async (actor: Actor) => {
            return actor.asks(Text.of(CheckoutPageTargets.totalLabel));
        }),
    getCompleteHeader: (): Question<string> =>
        question('get complete header', async (actor: Actor) => {
            return actor.asks(Text.of(CheckoutPageTargets.completeHeader));
        }),
    isOrderComplete: (): Question<boolean> =>
        question('is order complete', async (actor: Actor) => {
            const page = BrowseTheWeb.as(actor);
            const urlContains = page.url().includes('checkout-complete');
            const header = await actor.asks(Text.of(CheckoutPageTargets.completeHeader));
            return urlContains && header === 'Thank you for your order!';
        })
};
