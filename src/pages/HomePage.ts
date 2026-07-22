import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly cartButton: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_container');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
  }

  async getInventoryItemCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async goToCart(): Promise<void> {
    await this.cartButton.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.page.locator('#logout_sidebar_link').click();
  }
}
