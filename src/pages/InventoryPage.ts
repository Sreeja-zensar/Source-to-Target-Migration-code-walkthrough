import { BasePage } from './BasePage';
import { CartPage } from './CartPage';
import { LoginPage } from './LoginPage';
import { WaitUtils } from '../utils/WaitUtils';
import { InventoryPageTasks } from './inventory-page/InventoryPageTasks';
import { InventoryPageQuestions } from './inventory-page/InventoryPageQuestions';

export class InventoryPage extends BasePage {
    constructor(page: import('@playwright/test').Page) {
        super(page);
    }

    async isInventoryPageDisplayed(): Promise<boolean> {
        return this.actor.asks(InventoryPageQuestions.isInventoryPageDisplayed());
    }

    async getTitleText(): Promise<string> {
        return this.actor.asks(InventoryPageQuestions.getTitleText());
    }

    async getAllProductNames(): Promise<string[]> {
        return this.actor.asks(InventoryPageQuestions.getAllProductNames());
    }

    async getAllProductPrices(): Promise<number[]> {
        return this.actor.asks(InventoryPageQuestions.getAllProductPrices());
    }

    async getProductCount(): Promise<number> {
        return this.actor.asks(InventoryPageQuestions.getProductCount());
    }

    async sortBy(visibleText: string): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.sortBy(visibleText));
    }

    async sortByValue(value: string): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.sortByValue(value));
    }

    async getSelectedSortOption(): Promise<string> {
        return this.actor.asks(InventoryPageQuestions.getSelectedSortOption());
    }

    async addProductToCart(productName: string): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.addProductToCart(productName));
    }

    async removeProductFromCart(productName: string): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.removeProductFromCart(productName));
    }

    async getCartCount(): Promise<number> {
        return this.actor.asks(InventoryPageQuestions.getCartCount());
    }

    async openCart(): Promise<CartPage> {
        await this.actor.attemptsTo(InventoryPageTasks.openCart());
        return new CartPage(this.page);
    }

    async openProductDetails(productName: string): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.openProductDetails(productName));
    }

    async getDetailsProductName(): Promise<string> {
        return this.actor.asks(InventoryPageQuestions.getDetailsProductName());
    }

    async getDetailsProductPrice(): Promise<number> {
        return this.actor.asks(InventoryPageQuestions.getDetailsProductPrice());
    }

    async backToProducts(): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.backToProducts());
    }

    async openMenu(): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.openMenu());
    }

    async closeMenu(): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.closeMenu());
    }

    async resetAppState(): Promise<void> {
        await this.actor.attemptsTo(InventoryPageTasks.resetAppState());
    }

    async logout(): Promise<LoginPage> {
        await this.actor.attemptsTo(InventoryPageTasks.logout());
        return new LoginPage(this.page);
    }
}
