import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../../screenplay/core';
import { LoginPageTargets } from './LoginPageTargets';

export const LoginPageQuestions = {
    isLoginPageDisplayed: (): Question<boolean> =>
        question('is login page displayed', async (actor) => {
            const page = BrowseTheWeb.as(actor).getPage();
            return (await actor.asks(Visibility.of(LoginPageTargets.logo(page)))) && (await actor.asks(Visibility.of(LoginPageTargets.loginButton(page))));
        }),

    getErrorMessage: (): Question<string> =>
        question('get error message', async (actor) => {
            const page = BrowseTheWeb.as(actor).getPage();
            return actor.asks(Text.of(LoginPageTargets.errorMessage(page)));
        })
};
