import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../../screenplay/core';
import { CheckoutPageTargets } from './CheckoutPageTargets';

export const CheckoutPageTasks = {
    enterCustomerDetails: (firstName: string, lastName: string, postalCode: string): Task =>
        task('enter customer details', async (actor: Actor) => {
            await actor.attemptsTo(
                Enter.theValue(firstName).into(CheckoutPageTargets.firstNameInput),
                Enter.theValue(lastName).into(CheckoutPageTargets.lastNameInput),
                Enter.theValue(postalCode).into(CheckoutPageTargets.postalCodeInput)
            );
        }),
    clickContinue: (): Task =>
        task('click continue', async (actor: Actor) => {
            await actor.attemptsTo(Click.on(CheckoutPageTargets.continueButton));
        }),
    clickFinish: (): Task =>
        task('click finish', async (actor: Actor) => {
            await actor.attemptsTo(Click.on(CheckoutPageTargets.finishButton));
            const page = BrowseTheWeb.as(actor);
            await page.waitForTimeout(500);
        }),
    backHome: (): Task =>
        task('back home', async (actor: Actor) => {
            await actor.attemptsTo(Click.on(CheckoutPageTargets.backHomeButton));
        })
};
