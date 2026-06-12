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




