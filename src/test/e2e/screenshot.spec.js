import { test, expect } from '@playwright/test';

test('capture desktop screenshot', async ({ page }) => {
  await page.goto('/');
  // Wait for boot and lock screen
  await expect(page.getByText('CHERRY OS')).toBeVisible({ timeout: 10000 });
  // Unlock
  await page.click('body');
  // Wait for desktop
  await expect(page.getByText('Terminal')).toBeVisible();
  // Small delay for animations to settle
  await page.waitForTimeout(1000);
  // Capture screenshot
  await page.screenshot({ path: 'desktop-verification.png', fullPage: true });
  console.log('Screenshot saved to desktop-verification.png');
});
