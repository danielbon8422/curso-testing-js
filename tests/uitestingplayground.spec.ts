import { test, expect } from '@playwright/test';




test('test', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');

  await expect(page.locator('#title')).toBeVisible();
  await expect(page.locator('.alert')).toBeVisible();

  await page.locator('a.navbar-brand').click();

  await page.getByRole('link', { name: 'Load Delay' }).click();

  await expect(page).toHaveURL(/loaddelay/);

  await page.getByRole('button', { name: 'Button Appearing After Delay' }).click();

  await expect(page.getByText('Scenario')).toBeVisible();




  // await page.locator("#title");
  // await page.locator(".alert");
  // await page.locator(".a");
  // await page.locator('text=Aristotle').click();
  //await page.getByText('Aristotle').click();
  //  await page.locator('text=Resources').click();
  //await page.getByRole('link', { name: 'Resources' }).click();
  // await page.locator('a:has-text("Home")').click();
  //await page.getByRole('link', { name: 'Home' }).click();
});
