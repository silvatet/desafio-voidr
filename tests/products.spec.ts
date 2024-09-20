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
test('product details page displays correctly', async ({ page }) => {
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
  
    // Acessa a página de detalhes do produto
    await test.step('acessa página de detalhes do produto', async () => {
      await page.locator('.inventory_item_name').click();
    });
  
    // Verifica os detalhes do produto
    await test.step('verifica detalhes do produto', async () => {
      const productDetails = await page.locator('.product_details');
      await expect(productDetails).toHaveText([
        'Sauce Labs Backpack',
        'Carry all your belongings in style',
        // Add more details as needed
      ]);
    });
  });

  test('cart icon displays correct number of items', async ({ page }) => {
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
  
    // Adiciona múltiplos itens ao carrinho
    await test.step('adiciona múltiplos itens ao carrinho', async () => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      // Add more items as needed
    });
  
    // Verifica o número de itens no carrinho
    await test.step('verifica número de itens no carrinho', async () => {
      const cartItemCount = await page.locator('.shopping_cart_badge');
      await expect(cartItemCount).toHaveText('2'); // Update the expected count as needed
    });
  }); 

  test('all product prices are displayed correctly', async ({ page }) => {
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
  
    // Verifica os preços dos produtos
    await test.step('verifica preços dos produtos', async () => {
      const productPrices = await page.locator('.inventory_item_price');
      await expect(productPrices).toHaveText([
        '$29.99',
        '$9.99',
        '$15.99',
        // Add more prices as needed
      ]);
    });
  });

  test('sorting options work correctly', async ({ page }) => {
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
  
    // Seleciona a opção de ordenação
    await test.step('seleciona opção de ordenação', async () => {
      await page.locator('[data-test="product_sort_container"]').selectOption('az');
    });
  
    // Verifica se os produtos estão ordenados corretamente
    await test.step('verifica ordenação dos produtos', async () => {
      const productNames = await page.locator('.inventory_item_name');
      await expect(productNames).toHaveText([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        // Add more product names as needed
      ]);
    });
  });


  test('filter options work correctly', async ({ page }) => {
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
  
    // Seleciona a opção de filtro
    await test.step('seleciona opção de filtro', async () => {
      await page.locator('[data-test="product_filter_container"]').selectOption('price-low-to-high');
    });
  
    // Verifica se os produtos estão filtrados corretamente
    await test.step('verifica filtro dos produtos', async () => {
      const productPrices = await page.locator('.inventory_item_price');
      await expect(productPrices).toHaveText([
        '$9.99',
        '$15.99',
        // Add more product prices as needed
      ]);
    });
  });
