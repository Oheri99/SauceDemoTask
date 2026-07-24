# Visual Regression Testing Guide

This project uses **Playwright's built-in visual regression testing** to detect unintended UI changes.

Visual snapshots are committed to the repository and compared against screenshots captured during each test run.

---

# Overview

The framework provides:

- ✅ Login page visual regression
- ✅ Products page responsive visual regression
- ✅ Automatic GitHub Actions execution
- ✅ HTML reports
- ✅ Screenshot diff artifacts
- ✅ Pull Request integration

Visual baseline images are stored in one of the following locations depending on the Playwright configuration:

```
tests/
├── __screenshots__/
```

or the default Playwright location:

```
tests/
├── screenShot.spec.ts-snapshots/
```

These files are committed to Git and act as the visual baseline.

---

# Local Development

## Install

```bash
npm ci
npx playwright install --with-deps chromium
```

---

## Run Visual Tests

```bash
npm run test:visual
```

or

```bash
npm run test:screenshots
```

Runs visual regression using Chromium.

---

## Update Snapshots

After an intentional UI change:

```bash
npm run test:screenshots:update
```

or

```bash
npx playwright test tests/screenShot.spec.ts \
  --project=chromium \
  --update-snapshots
```

Review the updated screenshots before committing.

---

## Headed Mode

```bash
npm run test:headed
```

---

## Interactive UI

```bash
npm run test:ui
```

---

## HTML Report

```bash
npm run report
```

---

# GitHub Actions

## Visual Regression Tests

Workflow:

```
.github/workflows/visual-tests.yml
```

Runs automatically on:

- Push to `main`
- Push to `develop`
- Pull Requests

The workflow:

- Installs dependencies
- Installs Playwright Chromium
- Executes visual regression tests
- Uploads HTML report
- Uploads screenshot artifacts
- Uploads diff images
- Comments on Pull Requests

---

## Update Snapshots

Workflow:

```
.github/workflows/update-snapshots.yml
```

Trigger:

Comment

```
/update-snapshots
```

on a Pull Request.

The workflow:

- Checks out the PR branch
- Updates Playwright snapshots
- Commits new baseline screenshots
- Pushes the changes
- Adds a confirmation comment

---

# Pull Request Workflow

1. Create a feature branch.

2. Make UI changes.

3. Push your branch.

4. GitHub automatically runs visual regression tests.

5. Review the uploaded artifacts.

6. If the UI change is intentional:

```
/update-snapshots
```

7. GitHub updates the baseline images.

8. Merge the Pull Request.

---

# Repository Structure

```
.github/
└── workflows/
    ├── visual-tests.yml
    └── update-snapshots.yml

tests/
├── __screenshots__/
├── screenShot.spec.ts
├── sauceDemo.spec.ts

playwright.config.ts
```

---

# Screenshot Artifacts

When a visual test fails, GitHub uploads:

```
playwright-report/
```

Contains:

- HTML report

and

```
test-results/
```

Contains:

- expected.png
- actual.png
- diff.png
- trace.zip
- error-context.md

These files make it easy to identify visual differences.

---

# Environment Variables

Create a `.env` file.

```env
BASE_URL=https://www.saucedemo.com

STANDARD_USERNAME=standard_user
LOCKED_USERNAME=locked_out_user
PROBLEM_USERNAME=problem_user
PERFORMANCE_USERNAME=performance_glitch_user

PASSWORD=secret_sauce
```

GitHub Actions can use repository secrets:

- STANDARD_USERNAME
- PASSWORD

---

# Best Practices

- Review every visual diff before updating snapshots.
- Keep snapshots focused on individual pages or components.
- Commit snapshot updates separately from application changes.
- Keep Chromium as the baseline browser.
- Run Firefox and WebKit functional tests separately from visual regression.
- Disable animations before taking screenshots.
- Wait until images are fully loaded.
- Prefer `locator.toHaveScreenshot()` for component-level testing.

---

# Common Commands

| Command | Description |
|----------|-------------|
| `npm run test:visual` | Run visual regression tests |
| `npm run test:screenshots` | Execute screenshot tests |
| `npm run test:screenshots:update` | Update baseline images |
| `npm run test:headed` | Run headed browser |
| `npm run test:debug` | Debug tests |
| `npm run test:ui` | Interactive Playwright UI |
| `npm run report` | Open HTML report |

---

# Troubleshooting

## Snapshot Differences

Common causes:

- Browser version changed
- Font rendering changed
- Responsive layout changed
- Images not fully loaded
- Animation still running

---

## False Positives

Adjust Playwright settings.

Example:

```ts
await expect(page).toHaveScreenshot({
  maxDiffPixelRatio: 0.01,
});
```

or

```ts
await expect(page).toHaveScreenshot({
  maxDiffPixels: 100,
});
```

---

## Windows vs Linux Differences

GitHub Actions runs on Linux.

Windows and Linux render fonts differently.

For reliable visual regression:

- Generate baseline images on Linux
- Use GitHub Actions as the source of truth
- Use Chromium for snapshot comparison

---

# Resources

- Playwright Visual Comparisons  
  https://playwright.dev/docs/test-snapshots

- Playwright Configuration  
  https://playwright.dev/docs/test-configuration

- GitHub Actions  
  https://docs.github.com/actions

---

# Sauce Demo

Visual coverage includes:

- Login page
- Inventory page
- Mobile viewport
- Tablet viewport
- Desktop viewport

Responsive testing verifies:

- Product grid layout
- Images
- Product information
- Shopping cart icon
- Overall page rendering

This framework can be extended to include:

- Cart page
- Checkout flow
- Menu navigation
- Product sorting
- Accessibility testing
- Percy or Applitools integration