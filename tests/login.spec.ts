import { expect, test } from "@playwright/test";

test('the user login with success ', async ({ page })=>{
    await page.goto('https://www.saucedemo.com/v1/');
    await expect(await page.title()).toBe('Swag Labs');
    
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    await page.locator('[data-test="login-button"]').click();
    await expect(await page.url()).toBe('https://www.saucedemo.com/v1/inventory.html');

    const productTitle = await page.locator('.header_secondary_container > span ');
    await expect(productTitle).toHaveText('Products');
    await page.pause();
});

test('the user login with invalid credentials ', async ({ page })=>{
    await page.goto('https://www.saucedemo.com/v1/');
    await expect(await page.title()).toBe('Swag Labs');
    
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error-message"]')).toBeVisible();
    await expect(await page.locator('[data-test="error-message"]').textContent()).toContain('Username and password do not match any user in this service');
});