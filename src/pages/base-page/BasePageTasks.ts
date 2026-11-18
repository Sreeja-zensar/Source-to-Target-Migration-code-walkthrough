import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../../screenplay/core';
import { BasePageTargets } from './BasePageTargets';

export const BasePageTasks = {
    click: (locator: Target): Task =>
        task('click element', async (actor) => {
            await actor.attemptsTo(Click.on(locator));
        }),
    type: (locator: Target, text: string): Task =>
        task('type text', async (actor) => {
            await actor.attemptsTo(Enter.theValue(text).into(locator));
        }),
};
