import { test, expect } from '@playwright/test';

test('Test 2: Click on marker by coordinates after postcode search', async ({ page }) => {
  // 1. Перейти на сторінку
  await page.goto('https://www.marktplaats.nl/map/kijkinjewijk/');

  // 2. Ввести поштовий код Роттердама
  await page.getByRole('textbox', { name: 'Postcode' }).fill('3011');

  // 3. Обрати відстань 5 км
  await page.getByLabel('Kies afstand:').selectOption('5000');

  // 4. Натиснути на "Zoek"
  await page.getByRole('button', { name: 'Zoek' }).click();

  // 5. Дочекатись рендеру маркерів
  const markerLocator = page.locator('[data-testid="marker"]');
  await expect(markerLocator.first()).toBeVisible({ timeout: 10000 });

  console.log(markerLocator.first().elementHandle());

  // 6. Взяти перший маркер і зчитати його координати з батьківського стилю
  const markerHandle = await markerLocator.first().elementHandle();
  const markerWrapper = await markerHandle?.evaluateHandle(el => el.parentElement);

  const style = await markerWrapper?.evaluate(el => el ? el.getAttribute('style') || '' : null);
  console.log(`📍 Style: ${style}`);
  if (!style) throw new Error('⛔ Стиль не знайдено');

  const leftMatch = style.match(/left:\s*([\d.]+)px/);
  const topMatch = style.match(/top:\s*([\d.]+)px/);

  if (!leftMatch || !topMatch) throw new Error('⛔ Координати не знайдено');

  const x = parseFloat(leftMatch[1]);
  const y = parseFloat(topMatch[1]);
  console.log(`📍 Click at: x=${x}, y=${y}`);

  // 7. Навести мишку і клікнути
  await page.mouse.move(x, y);
  await page.mouse.click(x, y);

  // 8. Перевірити, що зʼявився sidebar з оголошеннями
  const sidebar = page.locator('div.Sidebar-container a');
  await expect(sidebar.first()).toBeVisible({ timeout: 5000 });
});
