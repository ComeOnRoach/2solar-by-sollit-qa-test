import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.funda.nl/detail/koop/verkocht/waalre/huis-anna-paulownalaan-7/43823451/');

  await page.waitForTimeout(2000);

  const paginaAfdrukken = page.getByRole('link', { name: 'Pagina afdrukken' });

  await paginaAfdrukken.scrollIntoViewIfNeeded();

  await page.waitForTimeout(2500);

  await paginaAfdrukken.click();


});