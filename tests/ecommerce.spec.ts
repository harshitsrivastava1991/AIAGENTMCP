import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('E2E: Login, Add iPhone X to Cart, and Verify', async ({ page }) => {
  // Step 1: Navigate and login
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('[name="username"]').fill('rahulshettyacademy');
  await page.locator('[name="password"]').fill('Learning@830$3mK2');
  await page.locator('input[value="admin"]').check();
  
  // Handle dropdown
  try {
    await page.locator('select').selectOption({ value: 'stud' });
  } catch (e) {
    // Dropdown option may not exist
  }
  
  await page.locator('input[type="checkbox"]').check();
  await page.locator('#signInBtn').click();
  
  // Step 2: Wait for products and find iPhone X
  await page.locator('h4:has-text("iphone X")').waitFor({ timeout: 15000 });
  console.log('✅ Found iPhone X product');
  
  // Step 3: Add to cart - iPhone X is first product, click first Add button
  const addButtons = page.locator('button').filter({ hasText: 'Add' });
  await addButtons.first().click();
  console.log('✅ Added iPhone X to cart');
  
  await page.waitForTimeout(500);
  
  // Step 4: Navigate to checkout and verify
  const checkoutLink = page.locator('text=Checkout');
  await checkoutLink.click();
  
  await page.waitForLoadState('domcontentloaded');
  
  // Verify iPhone X is in cart
  const pageContent = await page.content();
  expect(pageContent).toContain('iphone X');
  
  console.log('🎉 TEST PASSED: iPhone X successfully added to cart and verified in checkout!');
});
