import { test, expect } from '@playwright/test';

//  Test 1: Text Input
test('playingwithassertions', async ({ page }) => {

  await page.goto('http://uitestingplayground.com/textinput/');

  // verificar que el input es visible
  await expect(page.locator('#newButtonName')).toBeVisible();

  // escribir texto
  await page.locator('#newButtonName').fill('Holaaa');

  // click en el botón
  await page.locator('#updatingButton').click();

  // verificar que cambió el texto
  await expect(page.locator('#updatingButton')).toContainText('Holaaa');
});


//  Test 2: Dynamic ID
test('verificar botón con ID dinámico', async ({ page }) => {

  await page.goto('http://uitestingplayground.com/dynamicid');

  const button = page.getByRole('button', { name: 'Button with Dynamic ID' });

  await expect(button).toBeVisible();
});


// Test 3: Class Attribute
test('verificar Class Attribute', async ({ page }) => {

  await page.goto('http://uitestingplayground.com/classattr');

  //  Verificar títulos
  await expect(
    page.getByRole('heading', { name: 'Class Attribute' })
  ).toBeVisible();


await expect(
  page.getByRole('heading', { name: 'Scenario' })
).toBeVisible();


await expect(
  page.getByRole('heading', { name: 'Playground' })
).toBeVisible();



  //  Verificar que hay 3 botones
  await expect(
    page.locator('.btn-test')
  ).toHaveCount(3);

  //  Manejar el popup (ANTES del click)
  page.on('dialog', async dialog => {
    //await expect(dialog.message()).toBe('Primary button pressed');
    expect(dialog.message()).toBe('Primary button pressed');
    await dialog.accept();
  });

  //  Click en el botón azul
  await page.locator('.btn-primary').click();
});

// Test 4: Hidden Layers
test('verificar Hidden Layers', async ({ page }) => {

  //  Ir directamente a la página correcta
  await page.goto('http://uitestingplayground.com/hiddenlayers');

  //  Verificar título principal
  await expect(
    page.getByRole('heading', { name: 'Hidden Layers' })
  ).toBeVisible();

  //  Verificar párrafo
  const paragraph = page.locator('p');
  await expect(paragraph).toBeVisible();
  await expect(paragraph).toContainText('DOM caching techniques');
  await expect(paragraph).toContainText('multi step process');
  await expect(paragraph).toContainText('invisible to a user');

  //  Verificar Scenario
  await expect(
    page.getByRole('heading', { name: 'Scenario' })
  ).toBeVisible();

  //  Verificar lista
  const item1 = page.locator('li:has-text("Record button click")');
  await expect(item1).toBeVisible();

  const item2 = page.locator('li:has-text("green button")');
  await expect(item2).toBeVisible();

  //  Verificar Playground
  await expect(
    page.getByRole('heading', { name: 'Playground' })
  ).toBeVisible();

  //  BOTÓN VERDE (PRIMERO)
  const greenButton = page.locator('.btn-success');
  await expect(greenButton).toBeVisible();

  //  CLICK EN EL VERDE (PASO CLAVE 🔥)
  await greenButton.click();

  //  BOTÓN AZUL (DESPUÉS)
  const blueButton = page.locator('.btn-primary');

  //  ahora sí existe
  await expect(blueButton).toBeVisible();

  //  click (puede estar cubierto → force)
  await blueButton.click({ force: true });
  });

  // Test 5 "Ajax Data"
test('click en AJAX Data', async ({ page }) => {
  // URL
  await page.goto('http://uitestingplayground.com/');

  // Click AJAX
  await page.getByRole('link', { name: 'AJAX Data' }).click();

  // Validar
  await expect(page).toHaveURL('http://uitestingplayground.com/ajax');
  await expect(page.locator('h3')).toHaveText('AJAX Data');

  //Revisar texto

await expect(page.locator('p')).toHaveText(
  'An element may appear on a page after processing of an AJAX request to a web server. A test should be able to wait for an element to show up.'
);

//Revisar Scenario
await expect(page.getByRole('heading', { name: 'Scenario' })).toBeVisible();

//Revisar Text
const items = page.locator('li');

//primer li
await expect(page.locator('li:has-text("Record the following steps")')).toBeVisible();

//segundo li
await expect(page.locator('li:has-text("waits for label text")')).toBeVisible();

//Revisar playground
await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible();

// Revisar Boton
await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();

// Selector del resultado
  const result = page.locator('.bg-success');

  // Esperar a que aparezca
  await expect(result).toBeVisible({ timeout: 20000 });

  // Verificar el texto
  await expect(result).toContainText('Data loaded with AJAX get request');
});

// Test 6 Verificar Dynamic Table
test('verificar Dynamic Table completa', async ({ page }) => {

  // Ir a la página principal
  await page.goto('http://uitestingplayground.com/');

  // Click en Dynamic Table
  await page.getByRole('link', { name: 'Dynamic Table' }).click();

  // Verificar URL
  await expect(page).toHaveURL(/dynamictable/);

  // Verificación visual Dynamic table
  await expect(page.getByRole('heading', { name: 'Dynamic Table' })).toBeVisible();

  // Verificar texto
  await expect(page.locator('p').filter({ hasText: 'Below you see a table' })).toContainText('Below you see a table');

  // Validar el Link
  const link = page.getByRole('link', { name: 'WAI-ARIA' });

  await expect(link).toBeVisible();

  // Validar el href del link
  await expect(link).toHaveAttribute(
    'href',
    'https://www.w3.org/TR/wai-aria-practices/examples/table/table.html'
  );

  // Verificacion Visual Scenario
  await expect(page.getByRole('heading', { name: 'Scenario' })).toBeVisible();

// Verificar Texto
await expect(page.getByText('For Chrome process get value of CPU load.')).toBeVisible();

await expect(
  page.getByText('Compare it with value in the yellow label.')).toBeVisible();

//Verificacion Visual Playground

await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible();

//Verificar texto
await expect(page.locator('#table_desc')).toHaveText('Task Manager');
});

// Test 7 Validar tabla Playground
test('validar tabla dinámica completa', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/dynamictable');

  //  Validar todas las filas
  const nombres = ['Firefox', 'Internet Explorer', 'Chrome', 'System'];

  for (const nombre of nombres) {
    const fila = page.locator('div[role="row"]', { hasText: nombre });

    await expect(fila).toContainText('MB');    // Memory
    await expect(fila).toContainText('MB/s');  // Disk
    await expect(fila).toContainText('Mbps');  // Network
    await expect(fila).toContainText('%');     // CPU
  }


  //  Validar linea amarilla
  const label = page.locator('.bg-warning');

  await expect(label).toBeVisible();
  await expect(label).toContainText('Chrome');
  await expect(label).toContainText('CPU');
  await expect(label).toContainText('%');

  // Comparar CPU de Chome

  // Valor del label : "2.8%"
  const textoLabel = await label.textContent();
  const cpuLabel = textoLabel.split(': ')[1];

  // sacar CPU desde la tabla (por %, no por posición)
  const cpuTabla = await page
    .locator('div[role="row"]', { hasText: 'Chrome' })
    .locator('span', { hasText: '%' })
    .textContent();

  // comparación final
  expect(cpuTabla).toBe(cpuLabel);
});

// Test 8 Verify text
test('click en Verify Text', async ({ page }) => {


  // Ir a home y hacer click

  await page.goto('http://uitestingplayground.com');

  await page.getByRole('link', { name: 'Verify Text' }).click();


  // Validar titulo
  await expect(page.getByRole('heading', { level: 3, name: 'Verify Text' })).toBeVisible();

  // Validar Primer parrafo
  await expect(page.locator('p').first()).toContainText('inner text of a DOM element');

  // Texto duplicado (Hello UserName)
  const saludo = page.getByText('Hello UserName!');
  await expect(saludo).toHaveCount(2); // hay 2
  await expect(saludo.first()).toBeVisible();

  // Validar Parrafo
  await expect(page.locator('p', { hasText: 'searching for an element' })).toBeVisible();

  // Bloques Explicativos
  await expect(page.getByText('Does not work')).toBeVisible();
  await expect(page.getByText('Works')).toBeVisible();

  // Validar Header Scenario
  await expect(page.getByRole('heading', { level: 4, name: 'Scenario' })).toBeVisible();
  await expect(page.locator('.badge-secondary', { hasText: 'Welcome...' })).toBeVisible();


  // Validar Playground
  await expect(page.locator('.badge-secondary', { hasText: 'Welcome UserName!' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 4, name: 'Playground' })).toBeVisible();


});


















