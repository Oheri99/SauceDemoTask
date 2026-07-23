import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  
  test('landing page visual comparison', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveScreenshot('landing-page.png');
  });

  test('playwright features section', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const featuresSection = page.locator('[class*="features"]').first();
    await expect(featuresSection).toHaveScreenshot('features-section.png');
  });

  test('get started section', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const gettingStarted = page.locator('text=Getting started').first();
    if (await gettingStarted.isVisible()) {
      await gettingStarted.scrollIntoViewIfNeeded();
      await expect(gettingStarted).toHaveScreenshot('getting-started.png');
    }
  });

  test.describe('Responsive Layout', () => {
    
    test('mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('https://playwright.dev');
      await expect(page).toHaveScreenshot('mobile-view.png');
    });

    test('tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('https://playwright.dev');
      await expect(page).toHaveScreenshot('tablet-view.png');
    });
  });

});
