import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Application URLs
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  
  // Test Credentials
  testUsers: {
    standard: {
      username: process.env.STANDARD_USER || 'standard_user',
      password: process.env.STANDARD_PASSWORD || 'secret_sauce',
    },
    locked: {
      username: process.env.LOCKED_USER || 'locked_out_user',
      password: process.env.LOCKED_PASSWORD || 'secret_sauce',
    },
    problem: {
      username: process.env.PROBLEM_USER || 'problem_user',
      password: process.env.PROBLEM_PASSWORD || 'secret_sauce',
    },
  },

  // Browser Settings
  browser: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO || '0'),
    timeout: parseInt(process.env.TIMEOUT || '30000'),
  },

  // Test Settings
  test: {
    retries: parseInt(process.env.RETRIES || '0'),
    workers: parseInt(process.env.WORKERS || '1'),
  },

  // Environment
  env: process.env.ENV || 'staging',
  isCI: process.env.CI === 'true',
};

export const environment = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
};