import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../../screenplay/core';
import { BasePageTargets } from './BasePageTargets';

export const BasePageQuestions = {
    textOf: (locator: Target): Question<string> =>
        question('text of element', async (actor) => {
            return actor.asks(Text.of(locator));
        }),
    isDisplayed: (locator: Target): Question<boolean> =>
        question('is displayed', async (actor) => {
            return actor.asks(Visibility.of(locator));
        }),
    pageTitle: (): Question<string> =>
        question('page title', async (actor) => {
            return BrowseTheWeb.as(actor).page.title();
        }),
    currentUrl: (): Question<string> =>
        question('current url', async (actor) => {
            return BrowseTheWeb.as(actor).page.url();
        }),
};
