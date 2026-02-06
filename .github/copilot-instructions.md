# Playwright Project Setup & Development

This guide covers development and testing workflows for the Playwright testing project.

## Project Overview

A TypeScript-based Playwright testing framework configured for:
- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile device testing (Pixel 5, iPhone 12)
- Automated test execution and reporting
- HTML test report generation

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Browsers
```bash
npx playwright install
```

### 3. Run Tests
```bash
npm test
```

## Development Workflow

### Writing Tests
- Create test files in the `tests/` directory with `.spec.ts` extension
- Use Playwright's assertions and locators for reliable test writing
- Tests run in parallel across configured browsers by default

### Recording Tests
Use the codegen tool to automatically generate test code:
```bash
npm run codegen https://example.com
```

### Debugging Tests
```bash
npm run test:debug
```

### Viewing Reports
```bash
npx playwright show-report
```

## Testing Browsers & Devices

The project is configured for:
- **Desktop**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5 (Chrome), iPhone 12 (Safari)

Run tests on specific browsers:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

## Configuration

Key configuration files:
- `playwright.config.ts` - Test runner, browser, and reporter settings
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and npm scripts

## Best Practices

1. Use page objects for maintainability
2. Wait for specific elements before interacting
3. Make assertions specific and meaningful
4. Use fixtures for test setup and teardown
5. Keep tests independent and isolated
6. Use descriptive test names

## Troubleshooting

- **Browsers not found**: Run `npx playwright install`
- **Tests timeout**: Increase timeout in playwright.config.ts
- **Connection refused**: Ensure test server is running if configured

## References

- [Playwright Documentation](https://playwright.dev)
- [Test API](https://playwright.dev/docs/api/class-test)
- [Assertions](https://playwright.dev/docs/assertions)