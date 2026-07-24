# Visual Regression Testing Guide

This project uses Playwright's built-in visual comparison feature to detect UI changes and regressions.

## Overview

Visual snapshots are stored in `tests/__screenshots__/` and are committed to git. They serve as the baseline for comparing visual changes across test runs.

## Local Development

### Running Visual Tests

```bash
# Run visual tests on chromium
npm run test:visual

# Update snapshots after intentional UI changes
npm run test:screenshots:update

# Run tests in headed mode to see the browser
npm run test:headed

# Run tests with UI for interactive debugging
npm run test:ui

# View test report
npm run report
```

### Updating Snapshots Locally

When you make intentional UI changes, update the visual snapshots:

```bash
npm run test:screenshots:update
```

This will regenerate all baseline screenshots. Review the changes in `tests/__screenshots__/` and commit them to git.

## CI/CD Integration

### GitHub Actions Workflows

Two workflows are configured:

#### 1. Visual Regression Tests (`visual-tests.yml`)
- **Trigger:** Push to `main`/`develop`, PR to `main`/`develop`
- **Browsers:** Chromium, Firefox, WebKit
- **Actions:**
  - Runs visual tests on all browsers
  - Uploads test reports as artifacts
  - Uploads screenshots as artifacts
  - Comments on PRs with test results

#### 2. Update Snapshots (`update-snapshots.yml`)
- **Trigger:** Comment `/update-snapshots` on a PR
- **Actions:**
  - Checks out the PR branch
  - Runs tests with `--update-snapshots`
  - Commits updated snapshots back to the PR
  - Comments confirmation

### PR Workflow

1. **Create a PR** with UI changes
2. **GitHub Actions** automatically runs visual tests
3. **If tests fail:** Review differences in artifacts
4. **To approve changes:** Comment `/update-snapshots` on the PR
5. **Action** commits the new snapshots to your branch
6. **Merge** when ready

## File Structure

```
tests/
├── __screenshots__/          # Baseline visual snapshots (committed to git)
├── screenShot.spec.ts        # Visual test specs
└── sauceDemo.spec.ts         # Functional tests
```

## Best Practices

1. **Review visual diffs carefully** before running `/update-snapshots`
2. **Separate UI changes** into dedicated commits/PRs for easier review
3. **Use descriptive snapshot names** in your test code
4. **Run tests on multiple browsers** to catch cross-browser issues
5. **Keep snapshots small** - focus on specific components, not entire pages

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run test:visual` | Run visual tests (chromium only) |
| `npm run test:screenshots:update` | Update all baseline snapshots |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Debug tests step-by-step |
| `npm run test:ui` | Interactive test UI |
| `npm run report` | View HTML test report |

## Troubleshooting

### Snapshots Not Updating in CI
- Make sure `.github/workflows/update-snapshots.yml` is in your repo
- Use exact comment `/update-snapshots` (case-sensitive)

### False Positives (Anti-Aliasing Differences)
- Add `maxDiffPixels` or `threshold` to test expectations
- Example: `expect(page).toHaveScreenshot({ maxDiffPixels: 100 })`

### Different Results on Different OS
- Snapshots include OS/browser in filename
- CI runs on Linux, local may be Windows - this is normal
- Test against the same OS for consistent comparisons

## Resources

- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Sauce Demo (project-specific)

This repo's visual tests target the Sauce Demo site. The tests capture the login page and the products inventory page across responsive viewports.

- Environment variables (optional — defaults provided):
  - `STANDARD_USERNAME` — default `standard_user`
  - `PASSWORD` — default `secret_sauce`

- Run the Sauce Demo visual tests locally:

```bash
# install deps
npm ci
npx playwright install --with-deps

# run visual screenshots (chromium)
npm run test:screenshots

# update snapshots after intentional UI changes
npm run test:screenshots:update
```

- Notes:
  - CI will need the credentials set as secrets (`STANDARD_USERNAME`, `PASSWORD`) if you don't want to use the public defaults.
