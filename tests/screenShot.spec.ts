import { test, expect } from '@playwright/test';

const STANDARD_USERNAME = process.env.STANDARD_USERNAME ?? 'standard_user';
const PASSWORD = process.env.PASSWORD ?? 'secret_sauce';

test.describe('SauceDemo Visual Regression', () => {

  test('login page snapshot', async ({ page }) => {

    await page.goto('/');

    await expect(
      page.locator('#login-button')
    ).toBeVisible();

    await expect(page).toHaveScreenshot('saucedemo-login.png', {
      animations: 'disabled',
      caret: 'hide',
    });

  });


  test.describe('Products page responsive', () => {

    const viewports = [
      {
        name: 'mobile',
        width: 375,
        height: 667,
        file: 'saucedemo-products-mobile.png',
      },
      {
        name: 'tablet',
        width: 768,
        height: 1024,
        file: 'saucedemo-products-tablet.png',
      },
      {
        name: 'desktop',
        width: 1440,
        height: 900,
        file: 'saucedemo-products-desktop.png',
      },
    ];


    for (const vp of viewports) {

      test(`${vp.name} viewport`, async ({ page }) => {

        await page.setViewportSize({
          width: vp.width,
          height: vp.height,
        });


        await page.goto('/');


        await expect(
          page.locator('#user-name')
        ).toBeVisible();


        await page.fill(
          '#user-name',
          STANDARD_USERNAME
        );

        await page.fill(
          '#password',
          PASSWORD
        );


        await page.click('#login-button');


        await expect(
          page
        ).toHaveURL(/inventory\.html/);


        await expect(
          page.locator('.inventory_list')
        ).toBeVisible();


        // Wait for product images
        await page.locator('.inventory_item_img')
          .first()
          .waitFor();


        await expect(page).toHaveScreenshot(vp.file, {

          animations: 'disabled',

          caret: 'hide',

          fullPage: false,

        });

      });

    }

  });

});