import { test, expect } from '@playwright/test';
import { MapViewPage } from '../pages/MapViewPage';
import { SidebarPanel } from '../pages/SidebarPanel';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { SearchBar } from '../pages/SearchBar';
import searchData from '../data/search-target.json';

test('Test 3: Map click → Search → Match result and ID', async ({ page }) => {
  const map = new MapViewPage(page);
  const sidebar = new SidebarPanel(page);

  await map.goto();
  const markerText = await map.clickFirstMarker();
  expect(markerText).not.toBe('');

  const item = await sidebar.getFirstItemDetails();
  const popupPage = await sidebar.openFirstItem();

  const productDetails = new ProductDetailsPage(popupPage);
  const advertentieNummer = await productDetails.getAdvertentieNummer();

  const search = new SearchBar(popupPage);
  await search.searchFor(item.title);

  const searchResult = popupPage.getByRole('heading', { name: item.title, exact: true });
  const price = popupPage.locator('ul li', { hasText: item.title }).locator('p.hz-Listing-price');
  const priceText = await price.textContent();
  const priceValue = priceText && priceText.match(/€\s*([\d.]+),/);
  const parsedPrice = priceValue && parseFloat(priceValue[1]);
  await expect(searchResult).toBeVisible({ timeout: 10000 });
  await expect(searchResult).toHaveText(item.title);

  if (item.price && parsedPrice !== null) {
    expect(parsedPrice.toString()).toBe(item.price);
  }

  await searchResult.click();
  await popupPage.waitForTimeout(2000);

  await productDetails.assertMatchWith(advertentieNummer);
});
