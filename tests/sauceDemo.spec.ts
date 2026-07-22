import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage, CartPage, CheckoutPage } from '../src/pages';


test.describe('SauceDemo - End-to-End Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigateToLoginPage();
  });

  test('should successfully login with valid credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    expect(await productsPage.getTitle()).toContain('Swag Labs');
  });

  test('should show error message with invalid credentials', async () => {
    await loginPage.login('invalid_user', 'invalid_password');
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
  });

  test('should add product to cart', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('should complete purchase flow', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    
    expect(await cartPage.getCartItemCount()).toBe(1);
    
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.continueCheckout();
    await checkoutPage.completeOrder();
    
    expect(await checkoutPage.isOrderSuccessful()).toBeTruthy();
  });

  test('should remove product from cart', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    
    await cartPage.removeItemFromCart('Sauce Labs Backpack');
    expect(await cartPage.getCartItemCount()).toBe(0);
  });
});
