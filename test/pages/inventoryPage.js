// tests/pages/inventoryPage.js
const { expect } = require('@playwright/test');
const { inventoryLocators } = require('../locators/inventoryLocators');

class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  get addBackpackButton() {
    return this.page.locator(inventoryLocators.addToCartBackpack);
  }

  get addBikeLightButton() {
    return this.page.locator(inventoryLocators.addToCartBikeLight);
  }

  get cartIcon() {
    return this.page.locator(inventoryLocators.cartLink);
  }

  get cartBadge() {
    return this.page.locator(inventoryLocators.cartBadge);
  }

  async addTwoItemsToCart() {
    await this.addBackpackButton.click();
    await this.addBikeLightButton.click();
  }

  async expectCartBadgeCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.cartIcon.click();
  }
}

module.exports = { InventoryPage };
