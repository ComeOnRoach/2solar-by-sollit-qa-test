import { Page, Locator, expect } from '@playwright/test';

export default class BuyingUsedOrNewCarPage {
  readonly page: Page;
  readonly homePageCategoriesBlock: Locator;
  readonly carCategorie: Locator;
  readonly model: Locator;
  readonly carPrice: Locator;
  readonly searchButton: Locator;
  groupListofItems: Locator;
  yearOfCar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePageCategoriesBlock = page.locator('[data-section="group-tabs"]', { hasText: 'categorieën' });
    this.carCategorie = page.locator('#l2CategoryId');
    this.model = page.locator('#model');
    this.carPrice = page.locator('#PriceCents\\.to');
    this.searchButton = page.getByRole('button', { name: 'auto\'s' });
    this.groupListofItems = page.locator('.hz-Listing--list-item-cars');
    this.yearOfCar = page.locator('[id="constructionYear\\.from"]');

  }

  // async navigateToCategory(homePageCategoryBlock: string) {
  //   await this.homePageCategoriesBlock.scrollIntoViewIfNeeded();
  //   this.homePageCategoriesBlock.getByRole('link', { name: homePageCategoryBlock, exact: true }).click();
  // }

  async selectCarModel({category, model, priceMax, year}: { category: string; model: string; priceMax: string; year: string; }): Promise<{ selectedCarModel: string; priceOption: string }> {
    await this.carCategorie.selectOption(category);
    await this.model.selectOption(model);
    await this.yearOfCar.selectOption(year);
    await this.carPrice.selectOption(priceMax);

    const selectedCarModel = (await this.page.locator('#model option:checked').textContent()) ?? '';
    const priceOption = (await this.page.locator('#PriceCents\\.to option:checked').textContent()) ?? '';
    await this.searchButton.click();

    await this.page.waitForTimeout(1000);

    return { selectedCarModel, priceOption };
  }

  /**
   * * Validates that all search results contain the selected car model in their titles.
   * * @param selectedCarModel - The car model selected by the user.
   * * This method iterates through all the items in the search results and checks if the title of each item contains the selected car model.
   */
  async assertModelInSearchResults({ selectedCarModel }: { selectedCarModel: string }) {
    for (let item of (await this.groupListofItems.all())) {
        const title = await item.locator('h3').innerText();
        expect(title.toLocaleLowerCase()).toContain(selectedCarModel.toLocaleLowerCase());
      }
  }

  /**
   * * Validates that all search results have prices below the selected limit.
   * * @param priceMax - The maximum price selected by the user.
   * * This method iterates through all the items in the search results and checks if the price of each item is less than the selected maximum price.
   */
  async assertPriceInSearchResults({ priceOption }: { priceOption: string }) {
    await this.page.waitForTimeout(1300);
    for (let item of await this.groupListofItems.all()) {
        const price = await item.locator('.hz-Listing-price-extended-details').innerText();
        const numericPrice = price.replace(/\D/g, '');
        const priceOptionNumber = priceOption ? parseInt(priceOption.replace(/\D/g, ''), 10) : 0;
        expect(parseInt(numericPrice)).toBeLessThan(priceOptionNumber);
    }
  }

  /**
   * * Validates that all search results are within the selected distance from the user.
   * * @param distance - The distance selected by the user.
   * * This method iterates through all the items in the search results and checks if the distance of each item is less than the selected maximum distance.
   */
  async assertDistanceInSearchResults({ searchDistanceFrom }: { searchDistanceFrom: string }) {
    for (let item of (await this.groupListofItems.all())) {
        const sellerDistance = await item.locator('.hz-Listing-sellerDistance').innerText();
        const parsedSearchDistance = searchDistanceFrom ? parseInt(searchDistanceFrom.replace(/\D/g, '')) : 0 ;
        expect(parseInt(sellerDistance.replace(/\D/g, ''))).toBeLessThan(parsedSearchDistance);
    }
  }
}
