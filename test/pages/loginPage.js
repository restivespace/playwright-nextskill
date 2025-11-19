// tests/pages/loginPage.js
const { expect } = require('@playwright/test');
const { loginLocators } = require('../locators/loginLocators');

const BASE_URL = 'https://www.saucedemo.com/';

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(BASE_URL);
  }

  // --- element getters ---
  get usernameInput() {
    return this.page.locator(loginLocators.usernameInput);
  }

  get passwordInput() {
    return this.page.locator(loginLocators.passwordInput);
  }

  get loginButton() {
    return this.page.locator(loginLocators.loginButton);
  }

  get errorMessage() {
    return this.page.locator(loginLocators.errorMessage);
  }

  // --- actions ---
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // --- assertions ---
  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }

  async expectLockedOutError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText('locked out');
  }
}

module.exports = { LoginPage };
