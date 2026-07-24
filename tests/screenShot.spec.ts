import { test, expect } from '@playwright/test';

const SAUCE_URL = 'https://www.saucedemo.com';
const STANDARD_USERNAME = process.env.STANDARD_USERNAME ?? 'standard_user';
const PASSWORD = process.env.PASSWORD ?? 'secret_sauce';

test.describe('SauceDemo Visual Regression', () => {

  test('login page snapshot', async ({ page }) => {
    await page.goto(SAUCE_URL);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('saucedemo-login.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test.describe('Products page responsive', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667, file: 'saucedemo-products-mobile.png' },
      { name: 'tablet', width: 768, height: 1024, file: 'saucedemo-products-tablet.png' },
      { name: 'desktop', width: 1920, height: 1080, file: 'saucedemo-products-desktop.png' },
    ];

    for (const vp of viewports) {
      test(`${vp.name} viewport`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(SAUCE_URL);
        await page.fill('#user-name', STANDARD_USERNAME);
        await page.fill('#password', PASSWORD);
        await page.click('#login-button');
        await page.waitForURL('**/inventory.html');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveScreenshot(vp.file, {
          fullPage: true,
          maxDiffPixels: 150,
        });
      });
    }
  });

});
