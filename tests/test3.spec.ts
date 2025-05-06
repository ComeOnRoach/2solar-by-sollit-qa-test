import test, { expect } from "@playwright/test";

test('Login to Marktplaats', async ({ page }) => {
    await page.goto('https://www.marktplaats.nl/map/kijkinjewijk/');

        const markerElements = page.locator('div[class*="marker"], div[style*="z-index"] >> text=/^\\d+$/');
    
        await expect(markerElements.first()).toBeVisible({ timeout: 10000 });
    
        // Отримаємо текст (число) першого маркера
        const markerTextValue = await markerElements.first().textContent();

        // click on the first marker    
        markerTextValue && await page.getByText(markerTextValue.toString()).click();
        await page.waitForSelector('div.Sidebar-container a', { timeout: 10000 });
        
        const sidebarLinks = await page.locator('div.Sidebar-container a').all();
        await sidebarLinks[0].scrollIntoViewIfNeeded();
        await expect(sidebarLinks[0]).toBeVisible();
        const itemTitle = await sidebarLinks[0].locator('span').innerText();
        const itemPrice = await sidebarLinks[0].locator('strong').innerText();
        console.log(`📍 rightPanel title: ${itemTitle}`);
        console.log(`📍 rightPanel price: ${itemPrice}`);

        const page1Promise = page.waitForEvent('popup');

        await sidebarLinks[0].click();

        const page1 = await page1Promise;

        const advertentieNummerElement = page1.getByText('Advertentienummer:');
        await advertentieNummerElement.scrollIntoViewIfNeeded();
        await expect(advertentieNummerElement).toBeVisible();

        const reportNumber = await advertentieNummerElement.textContent();
        console.log(`📍 reportNumber: ${reportNumber}`);
        await page1.getByRole('img', { name: 'Marktplaats Start' }).click();
        await page1.getByRole('combobox', { name: 'Dropdown zoekbalk'}).pressSequentially(itemTitle);
        await page1.getByRole('button', { name: 'Zoek' }).click();
        await page1.waitForTimeout(2000);
        const searchResult = page1.getByRole('heading', { name: itemTitle, exact: true });
        const searchResultPrice = page1.locator('ul li', {hasText: itemTitle}).locator('p.hz-Listing-price');
        await searchResult.scrollIntoViewIfNeeded();
        await expect(searchResult).toBeVisible({ timeout: 10000 });
        await expect(searchResult).toHaveText(itemTitle);
        await expect(searchResultPrice).toHaveText(itemPrice);
        await searchResult.click();

        await page1.waitForTimeout(2000);

        const advertisementIdElement = page1.getByText('Advertentienummer:');
        await advertisementIdElement.scrollIntoViewIfNeeded();
        await expect(advertisementIdElement).toBeVisible();
        expect(await advertisementIdElement.textContent()).toEqual(reportNumber);

});