import { Builder, By, until, WebDriver, WebElement, Key } from 'selenium-webdriver';
import * as assert from 'assert';

describe('Additional Selenium Tests', () => {
  let driver: WebDriver;

  before(async function () {
    this.timeout(15000);
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('Test page title after login', async function () {
    this.timeout(30000);

    await driver.get('https://rahulshettyacademy.com/loginpagePractise/');
    
    await driver.findElement(By.name('username')).sendKeys('rahulshettyacademy');
    await driver.findElement(By.name('password')).sendKeys('Learning@830$3mK2');
    await driver.findElement(By.css('input[value="admin"]')).click();
    await driver.findElement(By.css('input[type="checkbox"]')).click();
    await driver.findElement(By.id('signInBtn')).click();

    // Wait for new page title
    await driver.wait(until.titleContains('ProtoCommerce'), 15000);
    
    const title = await driver.getTitle();
    console.log(`✅ Page title confirmed: ${title}`);
    assert.ok(title.includes('ProtoCommerce'), 'Title should contain ProtoCommerce');
  });

  it('Test product count on shop page', async function () {
    this.timeout(30000);

    await driver.get('https://rahulshettyacademy.com/loginpagePractise/');
    
    await driver.findElement(By.name('username')).sendKeys('rahulshettyacademy');
    await driver.findElement(By.name('password')).sendKeys('Learning@830$3mK2');
    await driver.findElement(By.css('input[value="admin"]')).click();
    await driver.findElement(By.css('input[type="checkbox"]')).click();
    await driver.findElement(By.id('signInBtn')).click();

    // Wait and count products
    await driver.wait(until.elementLocated(By.css('h4')), 15000);
    
    const productHeaders = await driver.findElements(By.css('h4'));
    const productCount = productHeaders.length;
    
    console.log(`✅ Found ${productCount} products`);
    assert.ok(productCount >= 3, 'Should have at least 3 products');
  });
});
