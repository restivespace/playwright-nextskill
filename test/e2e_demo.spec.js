// tests/login.spec.js
const { test } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage');
const { InventoryPage } = require('./pages/inventoryPage');
const { CheckoutPage } = require('./pages/checkoutPage');
const { USERS } = require('./data/users'); // assuming you moved USERS here

test.describe('Saucedemo login & purchase flow', () => {
  // 1. locked_out account shows error
  test('locked_out_user should see error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectLockedOutError();
  });

  // 2–5 in one scenario: login once, then cart & checkout
  test('standard_user login, cart and checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 2. login using standard account
    await test.step('Login with standard_user', async () => {
      await loginPage.goto();
      await loginPage.login(USERS.standard.username, USERS.standard.password);
      await loginPage.expectSuccessfulLogin();
    });

    // 3. add 2 items and verify cart badge
    await test.step('Add 2 items and verify cart badge', async () => {
      await inventoryPage.addTwoItemsToCart();
      await inventoryPage.expectCartBadgeCount(2);
    });

    // 4. open cart page
    await test.step('Open cart page from cart icon', async () => {
      await inventoryPage.openCart();
      await page.waitForURL(/.*cart\.html/);
    });

    // 5. checkout and verify purchase success
    // await test.step('Checkout and verify order completion', async () => {
    //   await checkoutPage.proceedToCheckout('Muhammad', 'Tester', '12345');
    //   await checkoutPage.finishOrder();
    //   await checkoutPage.expectOrderComplete();
    // });
    // 5. checkout and verify purchase success
    await test.step('Checkout validation and successful order', async () => {
      // already on cart page here
      await checkoutPage.goToCheckout();

      // 🔹 click continue with empty fields → expect error
      await checkoutPage.clickContinue();
      await checkoutPage.expectMissingInfoError();

      // 🔹 now fill the required fields correctly and continue
      await checkoutPage.fillCheckoutInformation('Muhammad', 'Tester', '12345');

      // finish and verify success page
      await checkoutPage.finishOrder();
      await checkoutPage.expectOrderComplete();
    });

  });
});
