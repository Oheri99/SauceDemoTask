  import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly productsContainer = '.inventory_list';
  readonly productItem = '.inventory_item';
  readonly cartButton = '[data-test="shopping-cart-link"]';
  readonly cartBadge = '.shopping_cart_badge';
  readonly sortDropdown = '[data-test="product-sort-container"]';

  constructor(page: Page) {
    super(page);
  }

  async addProductToCart(productName: string) {
    const addButton = `//button[@data-test="add-to-cart-${this.formatProductName(productName)}"]`;
    await this.page.click(addButton);
  }

  async removeProductFromCart(productName: string) {
    const removeButton = `//button[@data-test="remove-${this.formatProductName(productName)}"]`;
    await this.page.click(removeButton);
  }

  async getProductPrice(productName: string): Promise<string | null> {
    const priceSelector = `//div[contains(text(), "${productName}")]/ancestor::div[@class="inventory_item"]//div[@class="inventory_item_price"]`;
    return await this.getText(priceSelector);
  }

  async getProductCount(): Promise<number> {
    const items = await this.page.locator(this.productItem).count();
    return items;
  }

  async getCartCount(): Promise<string | null> {
    return await this.getText(this.cartBadge);
  }

  async goToCart() {
    await this.click(this.cartButton);
  }

  async sortProducts(sortOption: string) {
    await this.click(this.sortDropdown);
    await this.page.selectOption(this.sortDropdown, sortOption);
  }

  private formatProductName(productName: string): string {
    return productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }
}
