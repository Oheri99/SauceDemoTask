import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  
  test('landing page desktop view', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('landing-page-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  test.describe('Responsive Layout', () => {
    
    test('mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('https://playwright.dev');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot('mobile-view.png', {
        fullPage: true,
        maxDiffPixels: 100
      });
    });

    test('tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('https://playwright.dev');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot('tablet-view.png', {
        fullPage: true,
        maxDiffPixels: 100
      });
    });

    test('desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('https://playwright.dev');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot('desktop-view.png', {
        fullPage: true,
        maxDiffPixels: 100
      });
    });
  });

});
