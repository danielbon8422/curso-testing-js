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
  await expect(page.getByRole('heading', { name: 'Class Attribute' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Scenario' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible();

  //  Verificar que hay 3 botones
  await expect(page.locator('.btn-test')).toHaveCount(3);

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
  await expect(page.getByRole('heading', { name: 'Hidden Layers' })).toBeVisible();

  //  Verificar párrafo
  const paragraph = page.locator('p');
  await expect(paragraph).toBeVisible();
  await expect(paragraph).toContainText('DOM caching techniques');
  await expect(paragraph).toContainText('multi step process');
  await expect(paragraph).toContainText('invisible to a user');

  //  Verificar Scenario
  await expect(page.getByRole('heading', { name: 'Scenario' })).toBeVisible();

  //  Verificar lista
  const item1 = page.locator('li:has-text("Record button click")');
  await expect(item1).toBeVisible();

  const item2 = page.locator('li:has-text("green button")');
  await expect(item2).toBeVisible();

  //  Verificar Playground
  await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible();

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
  await expect(page.locator('p')).toHaveText('An element may appear on a page after processing of an AJAX request to a web server. A test should be able to wait for an element to show up.');

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
await expect(result).toBeVisible({ timeout: 40000 });

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

  await expect(page.getByText('Compare it with value in the yellow label.')).toBeVisible();

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

  // Test 9 Verificar "Progress bar"
  test('click en Progress Bar', async ({ page }) => {await page.goto('http://uitestingplayground.com/');

  // Click enlace
  await page.getByRole('link', { name: 'Progress Bar' }).click();

  // Validar clic enlace
  await expect(page).toHaveURL(/.*progressbar/);

  // Validar encabezado de la página
  await expect(page.locator('h3')).toHaveText('Progress Bar');

  // Validar primer parrafo
  await expect(page.locator('p').first()).toContainText('A web application may use a progress bar');

  // Validar Texto "Scenario"
  await expect(page.getByText('Scenario')).toBeVisible();

  // Validar segundo parrafo
  await expect(page.getByText('Create a test that clicks Start button')).toBeVisible();


  // Validar texto Playground
  await expect(page.getByRole('heading', { level: 4, name: 'Playground' })).toBeVisible();

  // Validar Botones Start, Stop y la ProgressBar

const progressBar = page.locator('#progressBar');

  // Start
  await page.getByRole('button', { name: 'Start' }).click();

  await page.waitForTimeout(2000);

  // Stop
  await page.getByRole('button', { name: 'Stop' }).click();

  const stoppedValue = await progressBar.textContent();

  await page.waitForTimeout(1000);

  const finalValue = await progressBar.textContent();

  // Validar que no cambia
  expect(stoppedValue).toBe(finalValue);

  // Validar Resultado
  await expect(page.locator('#result')).toContainText('Result:');
  await expect(page.locator('#result')).toContainText('duration:');
});

  // Test 10 Validar Visibility
  test('Validar Visibility', async ({ page }) => {await page.goto('http://uitestingplayground.com/');

  // Validar link
  await expect(page.getByRole('link', { name: 'Visibility' })).toBeVisible();

  // Click
  await page.getByRole('link', { name: 'Visibility' }).click();

  // Validar navegación
  await expect(page).toHaveURL(/.*visibility/);

  // Validar que cargó la página
  await expect(page.locator('h3')).toHaveText('Visibility');

  // Validar primer Parrafo
  await expect(page.locator('p', { hasText: 'Checking if element is visible' })).toBeVisible();

  // Validar li Parrafo
  await expect(page.locator('li', { hasText: 'removed' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'zero height' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'covered by another' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'opacity' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'offscreen' })).toBeVisible();

  // Validar Scenario
  await expect(page.locator('h4', { hasText: 'Scenario' })).toBeVisible();

  // Validar li Scenario
  await expect(page.locator('li', { hasText: 'Learn locators' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'Hide button' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'other buttons visible' })).toBeVisible();

  // Validar Playground
    await expect(page.locator('h4', { hasText: 'Playground' })).toBeVisible();

  // ("Validar boton Hide")
    const hideBtn = page.getByRole('button', { name: 'Hide' });await expect(hideBtn).toBeVisible();

// Click en Hide
  await hideBtn.click();

  // Validaciones importantes

  // Elemento eliminado del DOM
  await expect(page.locator('#removedButton')).not.toBeAttached();

  // Elemento con visibility hidden
  await expect(page.locator('#visibilityButton')).toBeHidden();

  // Elemento con opacity 0
  await expect(page.locator('#hiddenButton')).toBeHidden();

  // Elemento overlapped (no visible)
  await expect(page.locator('#overlappedButton')).toBeVisible();

  // Elemento offscreen
  await expect(page.locator('#offscreenButton')).toBeVisible();
});

  // Test 11 Sample App
  test('click en Sample App', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');

  // Validar link
  await expect(page.getByRole('link', { name: 'Sample App' })).toBeVisible();

  // Click
  await page.getByRole('link', { name: 'Sample App' }).click();

  // Validar navegación
  await expect(page).toHaveURL(/.*sampleapp/);

  // Validar Texto
  await expect(page.locator('h3')).toHaveText('Sample App');

  // Validar Primer Parrafo
  await expect(page.locator('p', { hasText: 'Fill in and submit the form' })).toBeVisible();

  // Validar user logged out
  await expect(page.locator('#loginstatus')).toContainText('User logged out');

  // Validar inputs
  await expect(page.getByPlaceholder('User Name')).toBeVisible();
  await expect(page.getByPlaceholder('********')).toBeVisible();

  // Rellenar formulario
  await page.getByPlaceholder('User Name').fill('Daniel');
  await page.getByPlaceholder('********').fill('pwd');

  // Click login
  await page.getByRole('button', { name: 'Log In' }).click();

  // Validar login correcto
  await expect(page.locator('#loginstatus')).toContainText('Welcome');
});

  // Test 12 Mouse Over
   test('Mouse Over completo', async ({ page }) => {

  // Ir directamente a la página (más estable)
  await page.goto('http://uitestingplayground.com/mouseover');

  // Título
  await expect(page.locator('h3')).toHaveText('Mouse Over');

  // Primer párrafo
  await expect(page.locator('p').first()).toContainText('Placing mouse over');

  // Segundo párrafo
  await expect(page.getByText('element may be modified', { exact: false })).toBeVisible();

  // Scenario
  await expect(page.getByText('Scenario')).toBeVisible();
  await expect(page.getByText('Record 2 consecutive link clicks.', { exact: false })).toBeVisible();

  // Playground
  await expect(page.getByText('Playground')).toBeVisible();
  await expect(page.getByText('new title assigned to it', { exact: false })).toBeVisible();

  // Importante("Hover": pasar por encima de un elemento sin hacer click)
  // Primer click
  await page.getByText('Click me').hover();
  await page.getByText('Click me').click();

  // Segundo click (para que siempre lo relocalize )
  await page.getByText('Click me').hover();
  await page.getByText('Click me').click();
  await expect(page.locator('#clickCount')).toContainText('2');

});

// Test 13 Non-Breacking Space
  test('Ir a Non-Breaking Space', async ({ page }) => {

  await page.goto('http://uitestingplayground.com/');

  // Click en el enlace
  await page.getByRole('link', { name: 'Non-Breaking Space' }).click();

  // Validar que navega
  await expect(page).toHaveURL('http://uitestingplayground.com/nbsp');

  // Validar texto
  await expect(page.locator('h3')).toHaveText('Non-Breaking Space');
  await expect(page.locator('p')).toContainText('non-breaking spaces');
  await expect(page.getByRole('heading', { name: 'Scenario' })).toBeVisible();
  await expect(page.locator('p')).toContainText('There are cases in test automation');
  await expect(page.locator('li').filter({ hasText: 'XPath does not work' })).toContainText("Change the space between 'My' and 'Button'");
  await expect(page.getByRole('heading', { level: 4, name: 'Playground' })).toBeVisible();

  // Validar Boton
  await page.getByRole("button", { name: "My Button" }).click();
});

  // Test 14 "Elemento Superpuesto"
  test('Ir a Overlapped Element', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');

  await page.getByRole("link", { name: "Overlapped Element" }).click();

  await expect(page).toHaveURL('http://uitestingplayground.com/overlapped');

  // Verificar Texto
  await expect(page.getByText("Overlapped Element")).toBeVisible();
  await expect(page.locator("p")).toContainText("partially visible element");
  await expect(page.getByRole("heading", { level: 4, name: "Scenario" })).toBeVisible();
  await expect(page.getByText("Record setting text into the Name input field (scroll element before entering the text).")).toBeVisible();
  await expect(page.getByText("Then execute your test to make sure that the text was entered correctly.")).toBeVisible();
  await expect(page.getByRole("heading", { level: 4, name: "Playground" })).toBeVisible();

  // Verificar Elemento Superpuesto
  await page.getByPlaceholder("Id").fill("123456");
  await expect(page.getByPlaceholder("Id")).toHaveValue("123456");

  const nameInput = page.locator('#name');

  await nameInput.scrollIntoViewIfNeeded();
  await page.evaluate(() => {document.querySelector('#name').value = 'DaniDaniel';});
  await expect(nameInput).toHaveValue('DaniDaniel');

  const overlay = page.locator('div[style*="position: absolute"]');

  await expect(overlay).toBeVisible();
  await expect(overlay).toHaveCSS("width", "300px");
  await expect(overlay).toHaveCSS("height", "50px");
  await expect(overlay).toHaveCSS("top", "67px");

  // Validar que se esta solapando encima del Imput Name
  const overlayBox = await overlay.boundingBox();
  const inputBox = await page.locator('#name').boundingBox();
  expect(overlayBox.y < inputBox.y + inputBox.height).toBeTruthy();

  });

  // Test 15 Shadow Dom
  test('Validar enlace Shadow DOM', async ({ page }) => {
  await page.goto('http://uitestingplayground.com');

  const link = page.getByRole("link", { name: "Shadow DOM" });

  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "/shadowdom");

  await link.click();
  await expect(page).toHaveURL(/shadowdom/);

  // Validar Texto
  const heading = page.getByRole("heading", { level: 3, name: "Shadow DOM" });
  await expect(heading).toBeVisible();
  await expect(page.getByText("This is a page with a Shadow DOM component guid-generator. Using it one can generate a guid and copy it to the clipboard.")).toBeVisible();

  const scenarioHeading = page.getByRole("heading", { level: 4, name: "Scenario" });
  await expect(scenarioHeading).toBeVisible();
  await expect(page.getByText("Scenario")).toBeVisible();
  await expect(page.getByText("Create a test that clicks on")).toBeVisible();
  await expect(page.getByText("Add an assertion step")).toBeVisible();
  await expect(page.getByText("Then execute the test")).toBeVisible();

  const playgroundHeading = page.getByRole("heading", { level: 4, name: "Playground" });
  await expect(playgroundHeading).toBeVisible();

  await expect(page.getByText("GUID Generator:")).toBeVisible();

  // Validar Field
  await expect(page.locator('.edit-field')).toBeVisible(); // por clase
  await expect(page.locator('#editField')).toHaveValue(''); // Validar que esta vacio
  // Validar que se puede escribir en el
  const input = page.locator('#editField');
  await input.fill('DaniDaniel');
  await expect(input).toHaveValue('DaniDaniel');
  //Validar Primer Boton
  const generateBtn = page.locator('#buttonGenerate');
  await expect(generateBtn).toBeVisible();
  await generateBtn.click();
  const value = await input.inputValue();
  expect(value.length).toBeGreaterThan(0);
  });

  // Test 16 Validar Segundo Boton
  test('Segundo Boton', async ({ page }) => {

  await page.goto('http://uitestingplayground.com/shadowdom');

  // Botón Copy
  const copyBtn = page.locator('#buttonCopy');
  await expect(copyBtn).toBeVisible();

  // Click
  await copyBtn.click();

  // Validación alternativa (no deberia fallar)
  await expect(copyBtn).toBeEnabled();

});

  // Test 17 Validar "Alerts"

  test('Validar Alerts', async ({ page }) => {
  await page.goto('http://uitestingplayground.com');

  const alertsLink = page.getByRole("link", { name: "Alerts" });

  await expect(alertsLink).toBeVisible();
  await expect(alertsLink).toHaveAttribute("href", "/alerts");

  await alertsLink.click();
  await expect(page).toHaveURL(/\/alerts/);

  // Validar Texto
  await expect(page.getByRole("heading", { level: 3, name: "Alerts" })).toBeVisible();
  await expect(page.getByText("Dealing with standard alerts")).toBeVisible();
  await expect(page.getByRole("heading", { level: 4, name: "Scenario" })).toBeVisible();
  await expect(page.locator("li", {hasText: "Record clicks on `Alert`, `Confirm` and `Prompt` buttons. Click `OK` to confirm, answer with non-default value to the prompt."})).toBeVisible();
  await expect(page.locator("li", {hasText: "Then execute your test to make sure that it passes completely without manual steps."})).toBeVisible();
  await expect(page.getByRole("heading", { level: 4, name: "Playground" })).toBeVisible();

  // Validar boton (Alert)
  const alertButton = page.getByRole('button', { name: 'Alert' });
  await expect(alertButton).toBeVisible();
  await alertButton.click();

  // Validar boton (Confirm)
  await page.locator('#confirmButton').click();

  // Validar boton (Prompt)
  const promptButton = page.getByRole('button', { name: 'Prompt' });
  await expect(promptButton).toBeVisible();
  await promptButton.click();
});

  // Test 18 Validar File Upload
  test('Validar File Upload', async ({ page }) => {
  await page.goto('http://uitestingplayground.com');

  const fileUploadLink = page.getByRole('link', { name: 'File Upload' });
  await expect(fileUploadLink).toBeVisible();
  await expect(fileUploadLink).toHaveAttribute('href', '/upload');
  await fileUploadLink.click();
  await expect(page).toHaveURL(/\/upload/);

  // Validar Texto
await expect(page.getByRole("heading", {level: 3,name: "File Upload",})).toBeVisible();
await expect(page.getByText("Modern web applications often include file upload functionality")).toBeVisible();
await expect(page.getByRole("heading", {level: 4,name: "Scenario",})).toBeVisible();
await expect(page.locator("li", {hasText: "Attach a file via drag&drop.",})).toBeVisible();
await expect(page.locator("li", {hasText: "Attach a file using `Browse files` button",})).toBeVisible();
await expect(page.getByRole("heading", {level: 4,name: "Playground",})).toBeVisible();
const frame = page.frameLocator('iframe');
await expect(frame.getByText(/Limit 15MB per file/i)).toBeVisible();
await expect(frame.getByText(/Browse files/i)).toBeVisible();
await expect(frame.locator("label", { hasText: "Browse files" })).toBeVisible();

  // Validar que se sube el archivo
await frame.locator('input[type="file"]').setInputFiles('tests/fixtures/testing.txt');
});

  // Test 19 Animated Button
  test('Validar Animated Button', async ({ page }) => {
  await page.goto('http://uitestingplayground.com');
  const animatedButtonLink = page.getByRole('link', {name: 'Animated Button'});
  await expect(animatedButtonLink).toBeVisible();
  await expect(animatedButtonLink).toHaveAttribute('href', '/animation');
  await animatedButtonLink.click();
  await expect(page).toHaveURL(/\/animation/);

  // Validar texto
  await expect(page.getByRole("heading", { level: 3, name: "Animated Button" })).toBeVisible();
  await expect(page.getByText("Before clicking a button we may need to wait for it to become stable")).toBeVisible();
  await expect(page.getByRole("heading", { level: 4, name: "Scenario" })).toBeVisible();
  await expect(page.locator("li", { hasText: "Record `Start Animation` button click. Wait for animation to complete and record click on `Moving Target`." })).toBeVisible();
  await expect(page.locator("li", { hasText: "Then execute your test to make sure that when Moving Target is clicked, it's class does not contain 'spin'. The class is printed on the status label below the buttons." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 4, name: "Playground" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Start Animation" })).toBeVisible();
  await expect(page.getByRole("button", {name: "Moving Target",})).toBeVisible();

  // Validar botones
  const movingTargetButton = page.locator("#movingTarget");
  const startAnimationButton = page.locator("#animationButton");
  await expect(movingTargetButton).toBeVisible();
  await startAnimationButton.click();
  // Esperar a que desaparezca la animación
  await expect(movingTargetButton).not.toHaveClass(/spin/);
  await movingTargetButton.click();
  await expect(page.locator("#opstatus")).toContainText("btn btn-primary")
  await expect(page.locator("#opstatus")).not.toContainText("spin");

});

  // Test 20 Disable Imput
  test('Validar Disabled Input', async ({ page }) => {
  await page.goto('http://uitestingplayground.com');
  const disabledInputLink = page.getByRole('link', {
    name: 'Disabled Input'
  });

  await expect(disabledInputLink).toBeVisible();
  await expect(disabledInputLink).toHaveAttribute('href', '/disabledinput');
  await disabledInputLink.click();
  await expect(page).toHaveURL(/\/disabledinput/);

  // Validar texto
  await expect(page.getByRole("heading", { level: 3, name: "Disabled Input" })).toBeVisible();
  await expect(page.getByText("Sometimes elements become enabled after some time they are rendered on the page. A test should be able to wait for an element to become enabled.")).toBeVisible();
  await expect(page.getByRole("heading", { level: 4, name: "Scenario" })).toBeVisible();
  await expect(page.locator("li", { hasText: "Record button click. Also record text input into an edit field." })).toBeVisible();
  await expect(page.locator("li", { hasText: "Make a test that enters text as soon as the edit field becomes enabled." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 4, name: "Playground" })).toBeVisible();

  // Validar input
const enableButton = page.locator("#enableButton");
const inputField = page.locator("#inputField");

await enableButton.click();

await expect(inputField).toBeEnabled();

await expect(
  page.locator("#opstatus")
).toContainText("Input Enabled");

await inputField.fill("DaniDaniel");
await expect(inputField).toHaveValue("DaniDaniel");
});

  //Test 21 Auto Wait
  test('Validar Auto Wait', async ({ page }) => {
  await page.goto('http://uitestingplayground.com');

  const autoWaitLink = page.getByRole('link', { name: 'Auto Wait' });
  await expect(autoWaitLink).toBeVisible();
  await expect(autoWaitLink).toHaveAttribute('href', '/autowait');
  await autoWaitLink.click();
  await expect(page).toHaveURL(/\/autowait/);

  // Validar texto
  await expect(page.getByText('Auto Wait')).toBeVisible();
  await expect(page.getByText(/Before clicking an element or entering text/i)).toBeVisible();
  await expect(page.getByText('Scenario')).toBeVisible();
  await expect(page.locator('li', {hasText: 'Choose an element type from the combobox.'})).toBeVisible();
  await expect(page.locator('li', {hasText: "Check the checkboxes to set the element's properties."})).toBeVisible();
  await expect(page.locator('li', {hasText: "Then click one of the Apply buttons to immediately apply the settings and restore interactable state of the element after a delay."})).toBeVisible();
  await expect(page.getByText('Interact with the element in the Playground section (click, select item, enter text).')).toBeVisible();
  await expect(page.getByText('Observe the status messages.')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible();
  await expect(page.getByText('Choose an element type:')).toBeVisible();

  // Verificar opciones de settings
  const options = await page.locator('#element-type option').allTextContents();

  expect(options).toEqual([
  'Button',
  'Input',
  'Textarea',
  'Select',
  'Label'
]);
  await expect(page.getByRole('checkbox', { name: 'Visible' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Enabled' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Editable' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'On Top' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Non Zero Size' })).toBeChecked();

  const playgroundButton = page.getByRole('button', {name: 'Button'});
  const status = page.locator('#opstatus');

  // Apply 3s
  await page.getByRole('button', { name: 'Apply 3s' }).click();
  await playgroundButton.click();
  await expect(status).toHaveText('Target clicked.');

  // Apply 5s
  await page.getByRole('button', { name: 'Apply 5s' }).click();
  await playgroundButton.click();
  await expect(status).toHaveText('Target element state restored.');

  // Apply 10s
  await page.getByRole('button', { name: 'Apply 10s' }).click();
  await playgroundButton.click();
  await expect(status).toHaveText('Target clicked.');
});

  //Test 22 Validar Frames
  test('Validar Frames', async ({ page }) => {
  await page.goto('http://uitestingplayground.com');

  const framesLink = page.getByRole('link', { name: 'Frames' });

  await expect(framesLink).toBeVisible();
  await expect(framesLink).toHaveAttribute('href', '/frames');

  await framesLink.click();

  await expect(page).toHaveURL(/\/frames/);

  //Validar textos
  await expect(page.getByRole('heading', { level: 3, name: 'Frames' })).toBeVisible();
  await expect(page.getByText('Working with frames requires switching context. Automation tools need to locate frames and switch into them before interacting with elements inside. This page contains nested frames with identical button markup to practice element location strategies.')).toBeVisible();
  await expect(page.getByRole('heading', { level: 4, name: 'Element Search Strategies' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'data-* attribute - find button by custom data attribute value' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'text - find button by inner text content' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'name - find button by @name attribute' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'xpath with class - find button by class using XPath' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 4, name: 'Scenario' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'Switch to the outer frame (level 1).' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'Find and click each button using different locator strategies.' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'Switch to the inner frame (level 2) nested inside the outer frame.' })).toBeVisible();
  await expect(page.locator('li', { hasText: 'Find and click the same buttons (identical markup) in the inner frame.' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 4, name: 'Playground' })).toBeVisible();

 const outerFrame = page.frameLocator('iframe');

// Outer frame
await outerFrame.getByRole('button', { name: 'Edit' }).click();
await outerFrame.getByRole('button', { name: 'Submit' }).click();
await outerFrame.getByRole('button', { name: 'Click me' }).click();
await outerFrame.getByRole('button', { name: 'Primary' }).click();

// Inner frame
const innerFrame = outerFrame.frameLocator('iframe');
await innerFrame.getByRole('button', { name: 'Edit' }).click();
await innerFrame.getByRole('button', { name: 'Submit' }).click();
await innerFrame.getByRole('button', { name: 'Click me' }).click({ force: true });
console.log(
  'Primary:',
  await innerFrame.getByRole('button', { name: 'Primary' }).count()
);
});





























