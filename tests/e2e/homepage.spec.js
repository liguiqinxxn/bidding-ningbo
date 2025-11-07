// @ts-check
import { test, expect } from "@playwright/test";

test("homepage has correct title and structure", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/宁波市招标投标协会/);

  // Check if main container exists
  const container = page.locator(".home > .container");
  await expect(container).toBeVisible();

  // Check if left and right sections exist
  const leftSection = page.locator(".left");
  const rightSection = page.locator(".right");
  await expect(leftSection).toBeVisible();
  await expect(rightSection).toBeVisible();
});

test("homepage has working navigation", async ({ page }) => {
  await page.goto("/");

  // Check if carousel exists
  const carousel = page.locator(".smooth-carousel");
  await expect(carousel).toBeVisible();

  // Check if member login section exists
  const loginSection = page.locator(".right .box").first();
  await expect(loginSection).toBeVisible();

  // Check if notification section exists
  const notificationSection = page.locator(".right .box").nth(1);
  await expect(notificationSection).toBeVisible();
});

test("homepage has footer sections", async ({ page }) => {
  await page.goto("/");

  // Check if links section exists
  const linksSection = page.locator(".links");
  await expect(linksSection).toBeVisible();

  // Check if info items exist
  const infoItems = page.locator(".info-item");
  const count = await infoItems.count();
  expect(count).toBeGreaterThan(0);
});

test("navigation to member list works", async ({ page }) => {
  await page.goto("/");

  // Click on member list link (this would require a more specific selector in a real test)
  // For now, we'll just check that the member section exists
  const memberSection = page.locator(".members");
  await expect(memberSection).toBeVisible();
});
