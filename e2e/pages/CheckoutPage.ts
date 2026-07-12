import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput = '[data-test="firstName"]';
  readonly lastNameInput = '[data-test="lastName"]';
  readonly postalCodeInput = '[data-test="postalCode"]';
  readonly continueButton = '[data-test="continue"]';
  readonly finishButton = '[data-test="finish"]';
  readonly cancelButton = '[data-test="cancel"]';
  readonly orderSummary = '.summary_total_label';
  readonly successMessage = '.complete-header';

  constructor(page: Page) {
    super(page);
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  async continueCheckout() {
    await this.click(this.continueButton);
  }

  async completeOrder() {
    await this.click(this.finishButton);
  }

  async cancelCheckout() {
    await this.click(this.cancelButton);
  }

  async getOrderSummary(): Promise<string | null> {
    return await this.getText(this.orderSummary);
  }

  async isOrderSuccessful(): Promise<boolean> {
    const successElement = await this.page.$(this.successMessage);
    return successElement !== null;
  }

  async getSuccessMessage(): Promise<string | null> {
    return await this.getText(this.successMessage);
  }
}
