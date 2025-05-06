import { test, expect } from '@playwright/test';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { CookiePolicyHandler } from '../helpers/CookiePolicyHandler';

// test.use({ storageState: '.auth/authState.json' });

// test('Search item and compare list vs card view', async ({ page }) => {
//   const searchPage = new SearchResultsPage(page);
//   const cookie = new CookiePolicyHandler(page); 

//   await page.goto('https://www.marktplaats.nl/');
//   await cookie.acceptCookieConsent();

//   await searchPage.performSearch('fiets');
//   await searchPage.expectSameFirstResultInBothViews();
// });

test('Listing is the same in list and card views', async ({ page }) => {
  const searchPage = new SearchResultsPage(page);

  await searchPage.gotoMarktplaatsMap();
  await searchPage.performSearch('fiets');
  await searchPage.expectSameFirstResultInBothViews();
});


