import { test } from '@playwright/test';
import { MapSearchPage } from '../pages/MapSearchPage';
import { ListingPanel } from '../pages/ListingPanel';
import searchData from '../data/search-inputs.json';

test.describe('Test 2: Search via Map, Location and Postcode', () => {
  test('should search by location name', async ({ page }) => {
    const map = new MapSearchPage(page);
    const listings = new ListingPanel(page);

    await map.goto();
    await map.searchByText(searchData.location);
    await listings.expectResultsVisible();
  });

  test('should search by postcode', async ({ page }) => {
    const map = new MapSearchPage(page);
    const listings = new ListingPanel(page);

    await map.goto();
    await map.searchByText(searchData.postcode);
    await listings.expectResultsVisible();
  });

  test('should click specific coordinate on map', async ({ page }) => {
    const map = new MapSearchPage(page);
    const listings = new ListingPanel(page);

    await map.goto();
    await map.clickOnMap(searchData.coordinate.x, searchData.coordinate.y);
    await listings.expectResultsVisible();
  });
});
