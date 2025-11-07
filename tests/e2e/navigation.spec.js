// @ts-check
import { test, expect } from "@playwright/test";

test("navigation to different pages works", async ({ page }) => {
  await page.goto("/");

  // Test navigation to home page
  await page.goto("/home");
  await expect(page).toHaveURL(/.*home/);

  // Test navigation to association page
  await page.goto("/association");
  await expect(page).toHaveURL(/.*association/);

  // Test navigation to dynamics page
  await page.goto("/dynamics");
  await expect(page).toHaveURL(/.*dynamics/);
});

test("header navigation works", async ({ page }) => {
  await page.goto("/");

  // Check if header exists
  const header = page.locator("header");
  // Note: The actual header element might be part of the Layout component
  // This is just a placeholder test - you would need to adjust the selector
  // based on the actual structure of your header
});
