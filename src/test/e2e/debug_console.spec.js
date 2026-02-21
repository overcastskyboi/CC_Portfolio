import { test, expect } from '@playwright/test';

test('capture console logs', async ({ page }) => {
  page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));
  page.on('pageerror', err => console.log(`BROWSER ERROR: ${err}`));

  console.log('Navigating to page...');
  await page.goto('/');
  
  console.log('Waiting for BOOT_LOADER...');
  try {
    await expect(page.getByText('BOOT_LOADER')).toBeVisible({ timeout: 5000 });
    console.log('BOOT_LOADER visible');
  } catch (e) {
    console.log('BOOT_LOADER not found');
  }

  // Force wait to capture any subsequent errors
  await page.waitForTimeout(3000);
});
