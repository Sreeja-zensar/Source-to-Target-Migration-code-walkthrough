import { BasePage } from './BasePage';
import { CheckoutPage } from './CheckoutPage';
import { InventoryPage } from './InventoryPage';
import { CartPageTasks } from './cart-page/CartPageTasks';
import { CartPageQuestions } from './cart-page/CartPageQuestions';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async getCartItemCount() {
        return this.actor.asks(CartPageQuestions.cartItemCount());
    }

    async getCartItemNames() {
        return this.actor.asks(CartPageQuestions.cartItemNames());
    }

    async clickCheckout() {
        await this.actor.attemptsTo(CartPageTasks.clickCheckout());
        return new CheckoutPage(this.page);
    }

    async continueShopping() {
        await this.actor.attemptsTo(CartPageTasks.continueShopping());
        return new InventoryPage(this.page);
    }
}
