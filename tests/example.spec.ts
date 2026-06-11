import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.codere.es/');
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.getByRole('button', { name: 'Acceder' }).click();
  await page.goto('https://m.apuestas.codere.es/deportesEs/#/HomePage?openlogin=true');
  await page.getByRole('radio', { name: 'Modo claro' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('textbox', { name: 'Usuario / Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Usuario / Correo electrónico' }).fill('sportses25');
  await page.locator('label').filter({ hasText: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('P');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Pruebas25');

  await page.locator('#btnaccess').getByRole('button', { name: 'Acceder' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('.codere-icon.icon-icono_avatar').click();
  await page.getByText('Cerrar sesión', { exact: true }).click();
});
