import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import carsRecords from '../data/test-5-data.json';
import BuyingUsedOrNewCarPage from '../pages/BuyingUsedOrNewCarPage.ts';

test.describe('Test 5: Search autos and validate fields', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.marktplaats.nl/');
  });

  test('should contain model name in all titles', async ({page}) => {
    const home = new HomePage(page);
    const car = new BuyingUsedOrNewCarPage(page);

    await home.navigateTo(carsRecords.hovePageCategoryBlock);
    const { selectedCarModel } = await car.selectCarModel(carsRecords);
    await home.mainMenySearchDistance({ distance: carsRecords.distance })

    await car.assertModelInSearchResults({ selectedCarModel });
  });


  test('assert price in all models', async ({page}) => {
    const home = new HomePage(page);
    const car = new BuyingUsedOrNewCarPage(page);

    await home.navigateTo(carsRecords.hovePageCategoryBlock);

    const { priceOption } = await car.selectCarModel(carsRecords);
    await home.mainMenySearchDistance({ distance: carsRecords.distance })

    await car.assertPriceInSearchResults({ priceOption });

  });

  test('assert distance on all models', async ({page}) => {
    const home = new HomePage(page);
    const car = new BuyingUsedOrNewCarPage(page);

    await home.navigateTo(carsRecords.hovePageCategoryBlock);
    await car.selectCarModel(carsRecords);
    const searchDistanceFrom = await home.mainMenySearchDistance({ distance: carsRecords.distance });

    await car.assertDistanceInSearchResults({ searchDistanceFrom });

  });
});

