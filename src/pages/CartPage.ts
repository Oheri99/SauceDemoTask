import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItem = '.cart_item';
  readonly checkoutButton = '[data-test="checkout"]';
  readonly continueShoppingButton = '[data-test="continue-shopping"]';
  readonly removeButton = '[data-test="remove-';
  readonly cartQuantity = '.cart_quantity';

  constructor(page: Page) {
    super(page);
  }

  async getCartItemCount(): Promise<number> {
    return await this.page.locator(this.cartItem).count();
  }

  async removeItemFromCart(productName: string) {
    const removeBtn = `//button[@data-test="remove-${this.formatProductName(productName)}"]`;
    await this.click(removeBtn);
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }

  async getCartTotal(): Promise<string | null> {
    const totalSelector = '//div[@class="summary_total_label"]';
    return await this.getText(totalSelector);
  }

  async isCheckoutButtonVisible(): Promise<boolean> {
    const button = await this.page.$(this.checkoutButton);
    return button !== null;
  }

  private formatProductName(productName: string): string {
    return productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }
}
