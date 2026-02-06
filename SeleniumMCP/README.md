# Selenium Testing Project

A comprehensive Selenium WebDriver testing project with TypeScript and Mocha, configured for end-to-end testing across multiple browsers.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Chrome browser and ChromeDriver (automatically managed by Selenium)

## Installation

1. Install dependencies:
```bash
npm install
```

## Project Structure

```
├── tests/
│   ├── ecommerce.test.ts        # E-commerce workflow tests
│   └── additional.test.ts       # Additional verification tests
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # Documentation
```

## Available Scripts

- **Run tests**: `npm test`
- **Run tests with debug output**: `npm run test:debug`
- **Build TypeScript**: `npm run build`
- **Clean build artifacts**: `npm run clean`

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx mocha --require ts-node/register tests/ecommerce.test.ts
```

### Run tests with verbose output
```bash
npm run test:debug
```

## Test Coverage

The project includes comprehensive tests for:
- **E-commerce Flow**: Login → Browse Products → Add to Cart → Verify
- **Page Verification**: Title checks, element presence validation
- **Product Navigation**: Product count verification, item selection

## Configuration

Key configuration files:
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies (Selenium WebDriver, Mocha, TypeScript)

### Dependencies

- **selenium-webdriver**: Official Selenium bindings for Node.js
- **mocha**: Testing framework
- **ts-node**: TypeScript execution for Node.js
- **TypeScript**: Language and tooling

## Writing Tests

Create test files in the `tests/` directory with `.test.ts` extension:

```typescript
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as assert from 'assert';

describe('My Tests', () => {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should navigate to page and find element', async function() {
    this.timeout(15000);
    
    await driver.get('https://example.com');
    const element = await driver.findElement(By.id('myElement'));
    assert.strictEqual(element !== null, true);
  });
});
```

## Best Practices

1. **Element Waits**: Always use `WebDriverWait` to handle dynamic page loading
2. **Error Handling**: Wrap operations in try-catch for better error reporting
3. **Timeouts**: Set appropriate timeouts for operations (e.g., `this.timeout(30000)`)
4. **Cleanup**: Always quit the driver in `afterEach()` hooks
5. **Selectors**: Use specific selectors (ID, name) over generic ones (CSS class)
6. **Assertions**: Use the `assert` library for clear test validations

## Common Selectors

```typescript
By.id('elementId')                    // Find by ID
By.name('elementName')                // Find by name attribute
By.css('selector')                    // Find by CSS selector
By.xpath('//*[@attribute="value"]')   // Find by XPath
By.linkText('Link Text')              // Find by link text
By.classNameu('className')            // Find by class name
```

## Debugging

Enable detailed logging by running:
```bash
npm run test:debug
```

Or add custom logging in your test:
```typescript
const element = await driver.findElement(By.id('myId'));
console.log('Element text:', await element.getText());
```

## Troubleshooting

- **ChromeDriver version mismatch**: Ensure Chrome browser version matches ChromeDriver
- **Element not clickable**: Use `WebDriverWait` to ensure element is visible and enabled before clicking
- **Timeout errors**: Increase timeout value in test or Mocha configuration
- **Stale element references**: Re-find elements after page navigation

## Resources

- [Selenium WebDriver Documentation](https://selenium.dev/documentation/)
- [Mocha Testing Framework](https://mochajs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Selenium WebDriver API Reference](https://selenium.dev/selenium/docs/api/javascript/)

## License

ISC
