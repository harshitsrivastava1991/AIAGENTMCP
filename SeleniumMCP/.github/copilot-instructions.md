# Selenium Testing Project - Development Guide

This guide covers development and testing workflows for the Selenium testing project.

## Project Overview

A TypeScript-based Selenium WebDriver testing framework equipped with:
- Selenium WebDriver 4 for browser automation
- Mocha test framework for test execution
- TypeScript for type-safe test code
- Support for multiple browsers (Chrome, Firefox, Safari, Edge)
- Cross-browser testing capabilities

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
npm test
```

### 3. View Results
Test results are displayed in the console with detailed logging.

## Development Workflow

### Writing Tests

Create test files in the `tests/` directory with `.test.ts` extension using Mocha and Selenium:

```typescript
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as assert from 'assert';

describe('My Test Suite', () => {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should test something', async function() {
    this.timeout(15000);
    // Your test code here
  });
});
```

### Key Libraries and Methods

#### WebDriver Locators:
- `By.id()` - Find by element ID
- `By.name()` - Find by name attribute
- `By.css()` - Find by CSS selector
- `By.xpath()` - Find by XPath expression
- `By.linkText()` - Find by link text
- `By.className()` - Find by class name

#### Common Operations:
```typescript
await driver.get(url);                           // Navigate to URL
await driver.findElement(locator);               // Find single element
await driver.findElements(locator);              // Find multiple elements
await element.sendKeys(text);                    // Type text into field
await element.click();                           // Click element
await element.getText();                         // Get element text
await driver.wait(until.elementLocated(locator), timeout);  // Wait for element
```

### Running Specific Tests

```bash
# Run all tests
npm test

# Run a specific test file
npx mocha --require ts-node/register tests/ecommerce.test.ts

# Run tests with pattern matching
npx mocha --require ts-node/register tests/**/*.test.ts
```

### Debugging Tests

```bash
npm run test:debug
```

Add console logging in your tests:
```typescript
const element = await driver.findElement(By.id('myId'));
console.log('Element found:', await element.getText());
```

## Testing Browsers

Switch browser in test setup:
```typescript
// Chrome (default)
driver = await new Builder().forBrowser('chrome').build();

// Firefox
driver = await new Builder().forBrowser('firefox').build();

// Safari
driver = await new Builder().forBrowser('safari').build();

// Edge
driver = await new Builder().forBrowser('msedge').build();
```

## Configuration Files

Key files:
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and npm scripts
- `.github/copilot-instructions.md` - This development guide

## Best Practices

1. **Explicit Waits**: Use `WebDriverWait` with `until` conditions
   ```typescript
   await driver.wait(until.elementLocated(By.id('id')), 10000);
   ```

2. **Error Handling**: Implement try-catch for better error messages
   ```typescript
   try {
     await driver.findElement(By.id('element')).click();
   } catch (error) {
     console.error('Failed to click element:', error);
     throw error;
   }
   ```

3. **Timeouts**: Set appropriate timeouts
   ```typescript
   it('test name', async function() {
     this.timeout(30000); // 30 seconds
   });
   ```

4. **Cleanup**: Always quit driver in afterEach
   ```typescript
   afterEach(async () => {
     await driver.quit();
   });
   ```

5. **Assert Library**: Use assertions for validations
   ```typescript
   assert.strictEqual(actual, expected);
   assert.ok(condition);
   ```

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| ChromeDriver version mismatch | Update Chrome browser to latest version |
| Element not found | Add explicit wait before finding element |
| Timeout errors | Increase timeout value in test |
| Stale element reference | Re-find element after page navigation |
| Permission denied | Run with appropriate user privileges |

## Project Commands

```bash
npm test              # Run all tests
npm run test:debug    # Run tests with spec reporter
npm run build         # Compile TypeScript to JavaScript
npm run clean         # Remove build artifacts
```

## Resources and References

- [Selenium WebDriver for Node.js](https://selenium.dev/selenium/docs/api/javascript/)
- [Mocha Test Framework Docs](https://mochajs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WebDriver API Reference](https://w3c.github.io/webdriver/)
- [XPath Tutorial](https://developer.mozilla.org/en-US/docs/Web/XPath)

## Tips for Success

- Start with simple selectors, move to complex ones if needed
- Use page object model for complex applications
- Keep tests small and focused on single functionality
- Always use explicit waits for dynamic content
- Log important steps for debugging failed tests
