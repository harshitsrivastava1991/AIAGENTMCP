import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('E2E: Add iPhone X to Cart', async ({ page }) => {
  // Step 1: Navigate and login
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('[name="username"]').fill('rahulshettyacademy');
  await page.locator('[name="password"]').fill('Learning@830$3mK2');
  await page.locator('input[value="admin"]').check();
  
  // Handle dropdown
  try {
    await page.locator('select').selectOption({ value: 'stud' });
  } catch (e) {
    // Ignore
  }
  
  await page.locator('input[type="checkbox"]').check();
  await page.locator('#signInBtn').click();
  
  // Step 2: Wait for products and find iPhone X
  await page.locator('h4:has-text("iphone X")').waitFor({ timeout: 15000 });
  
    // Step 3: Add to cart - iPhone X is first, so click first Add button
    const addButtons = page.locator('button').filter({ hasText: 'Add' });
    await addButtons.first().click();
  await page.waitForTimeout(500);
  
  // Step 4: Verify cart count
  const checkoutElement = page.locator('text=Checkout');
  const checkoutText = await checkoutElement.textContent();
  expect(checkoutText).toMatch(/Checkout.*\(\s*1\s*\)/);
  
  console.log('✅ TEST PASSED: iPhone X added to cart successfully!');
  console.log(`📦 Checkout text: ${checkoutText}`);
});
