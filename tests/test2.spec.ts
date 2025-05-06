import test, { expect } from "@playwright/test";

test('Search on map by coordinates Marktplaats', async ({ page }) => {
  // 1. open map page
  await page.goto('https://www.marktplaats.nl/map/kijkinjewijk/');

    // 2. select location
    await page.getByRole('combobox', { name: 'Dropdown zoekbalk' }).fill('Haarlem');

  // 3. select postcode
  await page.getByRole('textbox', { name: 'Postcode' }).clear();
  await page.getByRole('textbox', { name: 'Postcode' }).pressSequentially('2011', {delay: 200});

  //4. select distance 3 km
  page.getByLabel('Kies afstand:').selectOption('3000');

  // 5. select category
  const categorie = await page.getByLabel('Kies categorie:').selectOption('91');
  await page.getByLabel('Kies categorie:').selectOption('91');

  // 6. click on "Zoek"
  await page.getByRole('button', { name: 'Zoek' }).click();

  // 7. wait for markers to render
  await page.waitForTimeout(2000);

  const markers = page.locator('div[style*="background-color: transparent;"]')
  const markersCount = await page.locator('div[style*="background-color: transparent;"]').count();
  const randomIndex = Math.floor(Math.random() * markersCount);

  const markerElement = markers.nth(randomIndex);

  const style = await markerElement.getAttribute("style");
  
  const leftMatch = style ? style.match(/left:\s*(-?[\d.]+)px/) : null;
  const topMatch = style ? style.match(/top:\s*(-?[\d.]+)px/) : null;

  if (leftMatch && topMatch) {
    const boundingBox = await page.locator('div[style="width: 100%; height: 100%; left: 0px; top: 0px; margin: 0px; padding: 0px; position: absolute;"]').boundingBox();
    
    const left = parseFloat(leftMatch[1]);
    const top = parseFloat(topMatch[1]);
    const x = (boundingBox?.x ?? 0) + left + 12;
    const y = (boundingBox?.y ?? 0) + top + 12;
    await page.mouse.move(x, y)
    await page.mouse.click(x, y);
  }


  await page.waitForTimeout(2000);

    // 8. check if sidebar with ads is visible
  const sideBar = page.locator('.AdsList-adContainer');
  const sideBarCount = await sideBar.count();
  console.log(`Sidebar count: ${sideBarCount}`);
  // assert that sidebar count is greater than 0
  expect(sideBarCount).toBeGreaterThan(0);
  const sideBarLast = sideBar.nth(sideBarCount - 1);
  await sideBarLast.scrollIntoViewIfNeeded();

  const sideBarElements = await markerElement.innerText();
  const sideBarAsertElements = Number(sideBarElements) > 20 ? 20 : Number(sideBarElements);

  // assert that sidebar is visible
  await expect(sideBarLast).toBeVisible({ timeout: 5000 });
  // assert that sidebar count is correct
  expect(sideBarAsertElements).toEqual(sideBarCount);

  const sidebarLastInnerText = await sideBarLast.innerText();
  const page1Promise = page.waitForEvent('popup');
  await sideBarLast.click();
  const page1 = await page1Promise;
  
  await page1.waitForTimeout(3000);

  const city = page1.locator('div.SellerInfo-section', { hasText: /^Haarlem$/} );
  // assert that city is the same as postcode provided
  await expect.soft(city).toHaveText(/^Haarlem$/, { timeout: 5000 });
  const title = await page1.locator('h1.Listing-title').textContent();
  // assert title is the same as in sidebar
  expect.soft(sidebarLastInnerText).toContain(title);
  const price = await page1.locator('.Listing-price').textContent();
  const priceMatch = price ? price.match(/€\s*([\d.,]+),-/) : null;
  const priceValue = priceMatch ? parseFloat(priceMatch[1]) : null;
  // assert price is the same as in sidebar
  if (priceValue !== null) {
    expect.soft(sidebarLastInnerText).toContain(priceValue.toString());
  } else {
    console.error('Price value is null');
  }
  const itemCategory = page1.locator('.Breadcrumbs-root a').nth(1).innerText();
  expect.soft(await page.getByLabel('Kies categorie:').textContent()).toContain(await itemCategory);











  
//   await markers.nth(markersCount - 1).hover({ force: true });

//   const clusterMarkers = page.locator('div[class*="marker"], div[style*="z-index"] >> text=/^\\d+$/');
    //  const marker = page.locator('div[data-testid="marker"]');
    //  const markerElements = await marker.all();
    //  console.log(await markerElements[0].getAttribute('style'));
//   const listOfPlases = await page.locator('div[style="z-index: 3; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px; touch-action: pan-x pan-y;"]').all();
//   const listOfPlasesFirst = await listOfPlases[1].getAttribute('style');

  // 5. Дочекатись рендеру маркерів
//   const markerLocator = page.locator('[data-testid="marker"]');
//   await expect(markerLocator.first()).toBeVisible({ timeout: 10000 });

//   console.log(markerLocator.first().elementHandle());

//   // 6. Взяти перший маркер і зчитати його координати з батьківського стилю
//   const markerHandle = await markerLocator.first().elementHandle();
//   const markerWrapper = await markerHandle?.evaluateHandle(el => el.parentElement);

//   const style = await markerWrapper?.evaluate(el => el ? el.getAttribute('style') || '' : null);
//   console.log(`📍 Style: ${style}`);
//   if (!style) throw new Error('⛔ Стиль не знайдено');

//   const leftMatch = style.match(/left:\s*([\d.]+)px/);
//   const topMatch = style.match(/top:\s*([\d.]+)px/);

//   if (!leftMatch || !topMatch) throw new Error('⛔ Координати не знайдено');

//   const x = parseFloat(leftMatch[1]);
//   const y = parseFloat(topMatch[1]);
//   console.log(`📍 Click at: x=${x}, y=${y}`);

//   // 7. Навести мишку і клікнути
//   await page.mouse.move(x, y);
//   await page.mouse.click(x, y);

//   // 8. Перевірити, що зʼявився sidebar з оголошеннями
//   const sidebar = page.locator('div.Sidebar-container a');
//   await expect(sidebar.first()).toBeVisible({ timeout: 5000 });

});
