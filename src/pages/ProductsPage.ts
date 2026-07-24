import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

  readonly productsContainer: Locator;
  readonly productItems: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productImages: Locator;

  constructor(page: Page) {
    super(page);

    this.productsContainer = page.locator('.inventory_list');
    this.productItems = page.locator('.inventory_item');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productImages = page.locator('.inventory_item_img');
  }


  async waitForPageLoaded(): Promise<void> {

    await expect(
      this.productsContainer
    ).toBeVisible();


    await this.page.waitForFunction(() => {

      const images = Array.from(
        document.querySelectorAll('img')
      );

      return images.every(
        img => img.complete && img.naturalHeight > 0
      );

    });

  }


  async addProductToCart(productName: string): Promise<void> {

    const addButton = this.page.locator(
      `[data-test="add-to-cart-${this.formatProductName(productName)}"]`
    );

    await expect(addButton).toBeVisible();

    await addButton.click();

  }


  async removeProductFromCart(productName: string): Promise<void> {

    const removeButton = this.page.locator(
      `[data-test="remove-${this.formatProductName(productName)}"]`
    );

    await expect(removeButton).toBeVisible();

    await removeButton.click();

  }


  async getProductPrice(
    productName: string
  ): Promise<string | null> {

    const product = this.page.locator('.inventory_item')
      .filter({
        hasText: productName,
      });


    return await product
      .locator('.inventory_item_price')
      .textContent();

  }


  async getProductCount(): Promise<number> {

    return await this.productItems.count();

  }


  async getCartCount(): Promise<string | null> {

    if (
      await this.cartBadge.isVisible()
    ) {
      return await this.cartBadge.textContent();
    }

    return null;

  }


  async goToCart(): Promise<void> {

    await this.cartButton.click();

  }


  async sortProducts(
    sortOption: string
  ): Promise<void> {

    await this.sortDropdown.selectOption(sortOption);

  }


  async getProductNames(): Promise<string[]> {

    return await this.page
      .locator('.inventory_item_name')
      .allTextContents();

  }


  async takeVisualSnapshot(
    name: string
  ): Promise<void> {

    await this.waitForPageLoaded();

    await expect(this.page)
      .toHaveScreenshot(name, {
        animations: 'disabled',
        caret: 'hide',
      });

  }


  private formatProductName(
    productName: string
  ): string {

    return productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

  }

}