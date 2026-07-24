import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  testDir: './tests',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail CI if test.only exists */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests in CI */
  retries: process.env.CI ? 2 : 0,

  /* One worker in CI for stability */
  workers: process.env.CI ? 1 : undefined,

  /* Reports */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['github'],
  ],

  /* Test artifacts */
  outputDir: 'test-results',

  /* Visual snapshot location */
  snapshotPathTemplate:
    '{testDir}/{testFilePath}-snapshots/{arg}{ext}',

  use: {

    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',

    headless: true,

    viewport: {
      width: 1440,
      height: 900,
    },

    deviceScaleFactor: 1,

    colorScheme: 'light',

    locale: 'en-GB',

    timezoneId: 'Europe/London',

    ignoreHTTPSErrors: true,

    actionTimeout: 10000,

    navigationTimeout: 30000,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    launchOptions: {
      args: [
        '--font-render-hinting=none',
        '--disable-dev-shm-usage',
      ],
    },
  },


  expect: {

    timeout: 10000,

    toHaveScreenshot: {

      animations: 'disabled',

      caret: 'hide',

      // Allows minor rendering differences
      maxDiffPixelRatio: 0.01,

      scale: 'css',
    },
  },


  projects: [

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],

        viewport: {
          width: 1440,
          height: 900,
        },
      },
    },

    // Enable later if required

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

  ],
});