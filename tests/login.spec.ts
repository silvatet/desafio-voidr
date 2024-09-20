import { expect, test } from "@playwright/test";

// Teste de login com credenciais válidas
test('o usuário faz login com sucesso', async ({ page }) => {
    // Acessa a página de login
    await page.goto('https://www.saucedemo.com/v1/');
    // Verifica se o título da página é "Swag Labs"
    await expect(await page.title()).toBe('Swag Labs');
    
    // Preenche os campos de usuário e senha
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Clica no botão de login
    await page.locator('[data-test="login-button"]').click();
    // Verifica se a URL atual é a página de inventário
    await expect(await page.url()).toBe('https://www.saucedemo.com/v1/inventory.html');

    // Verifica o título da página de inventário
    const productTitle = await page.locator('.header_secondary_container > span ');
    await expect(productTitle).toHaveText('Products');
    // Pausa a execução do teste para verificar o resultado
    await page.pause();
});

// Teste de login com credenciais inválidas
test('o usuário faz login com credenciais inválidas', async ({ page }) => {
    // Acessa a página de login
    await page.goto('https://www.saucedemo.com/v1/');
    // Verifica se o título da página é "Swag Labs"
    await expect(await page.title()).toBe('Swag Labs');
    
    // Preenche os campos de usuário e senha com credenciais inválidas
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    
    // Clica no botão de login
    await page.locator('[data-test="login-button"]').click();

    // Verifica se a mensagem de erro é exibida
    const errorText = await page.locator('text=Epic sadface: Username and password do not match any user in this service');
    await expect(errorText).toBeVisible();
    // Verifica se a mensagem de erro contém o texto esperado
    await expect(await errorText.textContent()).toContain('Username and password do not match any user in this service');
});