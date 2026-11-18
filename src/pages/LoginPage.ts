import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';
import { LoginPageTasks } from './login-page/LoginPageTasks';
import { LoginPageQuestions } from './login-page/LoginPageQuestions';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async isLoginPageDisplayed(): Promise<boolean> {
        return this.actor.asks(LoginPageQuestions.isLoginPageDisplayed());
    }

    async enterUsername(username: string): Promise<void> {
        await this.actor.attemptsTo(LoginPageTasks.enterUsername(username));
    }

    async enterPassword(password: string): Promise<void> {
        await this.actor.attemptsTo(LoginPageTasks.enterPassword(password));
    }

    async clickLogin(): Promise<void> {
        await this.actor.attemptsTo(LoginPageTasks.clickLogin());
    }

    async login(username: string, password: string): Promise<InventoryPage> {
        await this.actor.attemptsTo(LoginPageTasks.login(username, password));
        return new InventoryPage(this.page);
    }

    async getErrorMessage(): Promise<string> {
        return this.actor.asks(LoginPageQuestions.getErrorMessage());
    }
}
