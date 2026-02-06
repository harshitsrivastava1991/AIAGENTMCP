import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as assert from 'assert';

describe('E2E Tests - Selenium WebDriver', () => {
  let driver: WebDriver;

  beforeEach(async function () {
    this.timeout(30000);
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('Login, Add iPhone X to Cart, and Verify', async function () {
    this.timeout(60000);

    try {
      // Step 1: Navigate to login page
      console.log('🔵 Navigating to login page...');
      await driver.get('https://rahulshettyacademy.com/loginpagePractise/');
      await driver.wait(until.titleContains('LoginPage'), 10000);

      // Step 2: Fill in login credentials
      console.log('🔵 Filling in login credentials...');
      const usernameField = await driver.findElement(By.name('username'));
      await usernameField.clear();
      await usernameField.sendKeys('rahulshettyacademy');

      const passwordField = await driver.findElement(By.name('password'));
      await passwordField.clear();
      await passwordField.sendKeys('Learning@830$3mK2');

      // Step 3: Select Admin role
      const adminRadio = await driver.findElement(By.css('input[value="admin"]'));
      await adminRadio.click();
      console.log('✅ Admin role selected');

      // Step 4: Handle dropdown - select Student
      try {
        const dropdown = await driver.findElement(By.css('select'));
        const options = await dropdown.findElements(By.css('option'));
        for (let option of options) {
          const value = await option.getAttribute('value');
          if (value === 'stud') {
            await option.click();
            console.log('✅ Student selected from dropdown');
            break;
          }
        }
      } catch (e) {
        console.log('⚠️ Dropdown selection skipped');
      }

      // Step 5: Check terms and conditions
      const termsCheckbox = await driver.findElement(By.css('input[type="checkbox"]'));
      await termsCheckbox.click();
      console.log('✅ Terms and conditions agreed');

      // Step 6: Click sign-in button
      console.log('🔵 Clicking sign-in button...');
      const signInBtn = await driver.findElement(By.id('signInBtn'));
      await signInBtn.click();

      // Step 7: Wait for products page to load
      console.log('🔵 Waiting for products page...');
      await driver.wait(until.urlContains('/angularpractice'), 15000);
      await driver.wait(until.elementLocated(By.css('h4')), 15000);

      // Step 8: Find and add iPhone X to cart
      console.log('🔵 Looking for iPhone X product...');
      const products = await driver.findElements(By.css('h4'));
      let addedToCart = false;

      for (let i = 0; i < products.length; i++) {
        const productText = await products[i].getText();
        console.log(`📦 Product found: ${productText}`);

        if (productText.toLowerCase().includes('iphone x')) {
          console.log('✅ Found iPhone X!');
          
          // Get the parent container and find the Add button
          const addButtons = await driver.findElements(By.css('button'));
          if (addButtons.length > i) {
            await addButtons[i].click();
            console.log('✅ Clicked Add button');
            addedToCart = true;
            break;
          }
        }
      }

      assert.strictEqual(addedToCart, true, 'Failed to add iPhone X to cart');

      // Step 9: Wait a moment for cart to update
      await driver.sleep(1000);

      // Step 10: Navigate to checkout
      console.log('🔵 Navigating to checkout...');
      const checkoutLink = await driver.findElement(By.linkText('Checkout'));
      await checkoutLink.click();

      // Step 11: Wait for checkout page and verify iPhone X is in cart
      console.log('🔵 Verifying iPhone X in cart...');
      await driver.wait(until.elementLocated(By.css('body')), 10000);
      
      const pageSource = await driver.getPageSource();
      assert.ok(pageSource.includes('iphone X'), 'iPhone X not found in cart');

      console.log('🎉 TEST PASSED: iPhone X successfully added to cart and verified!');
    } catch (error) {
      console.error('❌ Test failed:', error);
      throw error;
    }
  });

  it('Simple Cart Verification Test', async function () {
    this.timeout(45000);

    try {
      // Navigate and login
      await driver.get('https://rahulshettyacademy.com/loginpagePractise/');
      
      await driver.findElement(By.name('username')).sendKeys('rahulshettyacademy');
      await driver.findElement(By.name('password')).sendKeys('Learning@830$3mK2');
      await driver.findElement(By.css('input[value="admin"]')).click();

      // Handle dropdown
      try {
        const dropdown = await driver.findElement(By.css('select'));
        const studentOption = await dropdown.findElement(By.css('option[value="stud"]'));
        await studentOption.click();
      } catch (e) {
        // Skip if not found
      }

      await driver.findElement(By.css('input[type="checkbox"]')).click();
      await driver.findElement(By.id('signInBtn')).click();

      // Wait for products and add first item (iPhone X)
      await driver.wait(until.elementLocated(By.css('h4')), 15000);
      const addButtons = await driver.findElements(By.css('button'));
      
      if (addButtons.length > 0) {
        await addButtons[0].click();
        console.log('✅ Added item to cart');
      }

      await driver.sleep(500);

      // Check cart count
      const checkoutElement = await driver.findElement(By.xpath("//*[contains(text(), 'Checkout')]"));
      const checkoutText = await checkoutElement.getText();
      
      console.log(`📦 Checkout text: "${checkoutText}"`);
      assert.ok(checkoutText.includes('1'), 'Cart should contain 1 item');

      console.log('✅ TEST PASSED: Cart contains 1 item!');
    } catch (error) {
      console.error('❌ Test failed:', error);
      throw error;
    }
  });
});
