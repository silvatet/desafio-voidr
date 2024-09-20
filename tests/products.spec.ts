import { expect, test } from "@playwright/test";

// Teste que verifica se todos os nomes de produtos começam com "Sauce Labs"
test('todos os nomes de produtos começam com "Sauce Labs"', async ({ page }) => {
    // Faz login no site
    await test.step('faz login', async () => {
        // Acessa a página de login
        await page.goto('https://www.saucedemo.com/v1/');
        // Preenche os campos de usuário e senha
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        // Clica no botão de login
        await page.locator('[data-test="login-button"]').click();
    });

    // Adiciona um item ao carrinho
    await test.step('adiciona item ao carrinho', async () => {
        // Verifica o nome do produto
        const productName = await page.locator('.inventory_item_name');
        await expect(productName).toHaveText('Sauce Labs Backpack');
        // Clica no botão de adicionar ao carrinho
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        // Verifica se o botão de remover está visível
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    });

    // Remove o item do carrinho
    await test.step('remove item do carrinho', async () => {
        // Clica no botão de remover
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        // Verifica se o botão de adicionar está visível novamente
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    });
});