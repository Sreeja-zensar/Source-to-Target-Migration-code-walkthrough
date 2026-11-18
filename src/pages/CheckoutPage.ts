import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';
import { WaitUtils } from '../utils/WaitUtils';
import { CheckoutPageTasks } from './checkout-page/CheckoutPageTasks';
import { CheckoutPageQuestions } from './checkout-page/CheckoutPageQuestions';

export class CheckoutPage extends BasePage {
    constructor(page: import('@playwright/test').Page) {
        super(page);
    }

    async enterCustomerDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.actor.attemptsTo(CheckoutPageTasks.enterCustomerDetails(firstName, lastName, postalCode));
    }

    async clickContinue(): Promise<void> {
        await this.actor.attemptsTo(CheckoutPageTasks.clickContinue());
    }

    async getErrorMessage(): Promise<string> {
        return this.actor.asks(CheckoutPageQuestions.getErrorMessage());
    }

    async getItemTotal(): Promise<number> {
        return this.actor.asks(CheckoutPageQuestions.getItemTotal());
    }

    async getTotalText(): Promise<string> {
        return this.actor.asks(CheckoutPageQuestions.getTotalText());
    }

    async clickFinish(): Promise<void> {
        await this.actor.attemptsTo(CheckoutPageTasks.clickFinish());
    }

    async getCompleteHeader(): Promise<string> {
        return this.actor.asks(CheckoutPageQuestions.getCompleteHeader());
    }

    async isOrderComplete(): Promise<boolean> {
        return this.actor.asks(CheckoutPageQuestions.isOrderComplete());
    }

    async backHome(): Promise<InventoryPage> {
        await this.actor.attemptsTo(CheckoutPageTasks.backHome());
        return new InventoryPage(this.page);
    }
}
