import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForNavigation() {
    await this.page.waitForNavigation();
  }
}
