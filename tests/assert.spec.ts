import { test, expect } from '@playwright/test';

test('playingwithassertions', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/textinput/');

  //verificar que el imput es visible
  await expect(page.locator("#newButtonName")).toBeVisible();
  //selecciona imput y llenalo de texto
  await page.locator("#newButtonName").fill("Holaaa");
  //click button
  await page.locator("#updatingButton").click();
  //Verifica que despues del click aparezca de texto "chao"
  await expect(page.locator("#updatingButton")).toContainText("Holaaa")


  });
