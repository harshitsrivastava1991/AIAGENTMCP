# Playwright Testing Project

A comprehensive Playwright testing project setup with TypeScript support, configured for end-to-end testing across multiple browsers and devices.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
├── tests/
│   └── example.spec.ts          # Sample test file
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Documentation
```

## Available Scripts

- **Run tests**: `npm test`
- **Run tests in headed mode**: `npm run test:headed`
- **Debug tests**: `npm run test:debug`
- **UI mode**: `npm run test:ui`
- **Codegen (recording)**: `npm run codegen`

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/example.spec.ts
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
```

### Run tests with UI
```bash
npm run test:ui
```

## Configuration

The `playwright.config.ts` file includes:
- Multiple browsers (Chromium, Firefox, WebKit)
- Mobile device testing (Pixel 5, iPhone 12)
- Screenshot and trace capture on failures
- HTML reporter for test results
- Parallel test execution

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Writing Tests

Create test files in the `tests/` directory with `.spec.ts` extension:

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## Recording Tests

Use the codegen tool to record tests:
```bash
npm run codegen https://example.com
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-test)
- [Best Practices](https://playwright.dev/docs/best-practices)

## License

ISC
