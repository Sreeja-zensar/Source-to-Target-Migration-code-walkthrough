import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../../screenplay/core';
import { LoginPageTargets } from './LoginPageTargets';

export const LoginPageTasks = {
    enterUsername: (username: string): Task =>
        task('enter username', async (actor) => {
            await actor.attemptsTo(Enter.theValue(username).into(LoginPageTargets.usernameInput(BrowseTheWeb.as(actor).getPage())));
        }),

    enterPassword: (password: string): Task =>
        task('enter password', async (actor) => {
            await actor.attemptsTo(Enter.theValue(password).into(LoginPageTargets.passwordInput(BrowseTheWeb.as(actor).getPage())));
        }),

    clickLogin: (): Task =>
        task('click login', async (actor) => {
            await actor.attemptsTo(Click.on(LoginPageTargets.loginButton(BrowseTheWeb.as(actor).getPage())));
        }),

    login: (username: string, password: string): Task =>
        task('login', async (actor) => {
            const page = BrowseTheWeb.as(actor).getPage();
            await actor.attemptsTo(
                Enter.theValue(username).into(LoginPageTargets.usernameInput(page)),
                Enter.theValue(password).into(LoginPageTargets.passwordInput(page)),
                Click.on(LoginPageTargets.loginButton(page))
            );
        })
};
