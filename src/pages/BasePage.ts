import { Actor, BrowseTheWeb, Click, Enter, Text, Visibility, actorCalled, task, question, interaction, type Target, type Task, type Question } from '../screenplay/core';
import { BasePageTasks } from './base-page/BasePageTasks';
import { BasePageQuestions } from './base-page/BasePageQuestions';
import { Page } from '@playwright/test';
import { WaitUtils } from '../utils/WaitUtils';

export class BasePage {
    protected readonly page: Page;
    protected readonly actor: Actor;

    constructor(page: Page) {
        this.page = page;
        this.actor = actorCalled('BasePage user', page);
    }

    protected async click(locator: Target): Promise<void> {
        await this.actor.attemptsTo(BasePageTasks.click(locator));
    }

    protected async type(locator: Target, text: string): Promise<void> {
        await this.actor.attemptsTo(BasePageTasks.type(locator, text));
    }

    protected async getText(locator: Target): Promise<string> {
        return this.actor.asks(BasePageQuestions.textOf(locator));
    }

    protected async isDisplayed(locator: Target): Promise<boolean> {
        return this.actor.asks(BasePageQuestions.isDisplayed(locator));
    }

    public async getPageTitle(): Promise<string> {
        return this.actor.asks(BasePageQuestions.pageTitle());
    }

    public async getCurrentUrl(): Promise<string> {
        return this.actor.asks(BasePageQuestions.currentUrl());
    }
}
