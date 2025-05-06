import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.marktplaats.nl/');

  const categories = page.locator('[data-section="group-tabs"]', { hasText: 'categorieën' });
  await categories.scrollIntoViewIfNeeded();    
  await categories.getByRole('link', { name: 'Auto\'s', exact: true }).click();

  await page.locator('#l2CategoryId').selectOption('99');
  
  await page.locator('#model').selectOption('646');
  const model = await page.locator('#model option:checked').textContent();
  await page.getByRole('button', { name: 'Alle' }).click();
  await page.locator('#PriceCents\\.to').selectOption('2000000');
  const priceOption = await page.locator('#PriceCents\\.to option:checked').textContent();
  await page.getByRole('button', { name: 'auto\'s' }).click();

  await page.waitForTimeout(1000);

  await page.getByLabel('Kies afstand:').selectOption('50000');
  const searchDistanceFrom = await page.getByLabel('Kies afstand:').locator('option:checked').textContent();
  await page.getByRole('button', { name: 'Zoek' , exact: true}).click();

    await page.waitForTimeout(2000);
    const groupListofItems = page.locator('.hz-Listing--list-item-cars');
    for (let item of await groupListofItems.all()) {
        const title = await item.locator('h3').innerText();
        const price = await item.locator('.hz-Listing-price-extended-details').innerText();
        const numericPrice = price.replace(/\D/g, '');
        const sellerDistance = await item.locator('.hz-Listing-sellerDistance').innerText();
        console.log(`Title: ${title}, Price: ${price}, Location: ${sellerDistance}`);
        expect(title.toLocaleLowerCase()).toContain(model?.toLocaleLowerCase());
        const priceOptionNumber = priceOption ? parseInt(priceOption.replace(/\D/g, ''), 10) : 0;
        expect(parseInt(numericPrice)).toBeLessThan(priceOptionNumber);
        const parsedSearchDistance = searchDistanceFrom ? parseInt(searchDistanceFrom.replace(/\D/g, '')) : 0 ;
        expect(parseInt(sellerDistance.replace(/\D/g, ''))).toBeLessThan(parsedSearchDistance);
    }

    const groupListofItemsCount = await groupListofItems.count();
    console.log(`Sidebar count: ${groupListofItemsCount}`);
});