// tests/pages/checkoutPage.js
const { expect } = require('@playwright/test');
const { checkoutLocators } = require('../locators/checkoutLocators');

class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  get checkoutButton() {
    return this.page.locator(checkoutLocators.checkoutButton);
  }

  get firstNameInput() {
    return this.page.locator(checkoutLocators.firstNameInput);
  }

  get lastNameInput() {
    return this.page.locator(checkoutLocators.lastNameInput);
  }

  get postalCodeInput() {
    return this.page.locator(checkoutLocators.postalCodeInput);
  }

  get continueButton() {
    return this.page.locator(checkoutLocators.continueButton);
  }

  get finishButton() {
    return this.page.locator(checkoutLocators.finishButton);
  }

  get orderCompleteHeader() {
    return this.page.locator(checkoutLocators.orderCompleteHeader);
  }

  async proceedToCheckout(firstName, lastName, postalCode) {
    // on cart page
    await this.checkoutButton.click();

    // checkout step one
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishOrder() {
    // checkout step two
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.orderCompleteHeader).toBeVisible();
    await expect(this.orderCompleteHeader).toContainText('Thank you');
  }
}

module.exports = { CheckoutPage };
