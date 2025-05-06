import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly homePageCategoriesBlock: Locator;
  submitButton: Locator;
  distanceComboBox: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.homePageCategoriesBlock = page.locator('[data-section="group-tabs"]', { hasText: 'categorieën' });
    this.distanceComboBox = page.getByLabel('Kies afstand:')
    this.submitButton = page.getByRole('button', { name: 'Zoek' , exact: true});
  }

  async gotoLocation() {
    await this.page.goto('https://www.marktplaats.nl/');
  }

  // async openCategory(name: string) {
  //   const categories = this.page.locator('[data-section="group-tabs"]', { hasText: 'categorieën' });
  //   await categories.scrollIntoViewIfNeeded();
  //   await categories.getByRole('link', { name, exact: true }).click();
  // }

  async navigateTo(homePageCategoryBlock: string) {
    await this.homePageCategoriesBlock.scrollIntoViewIfNeeded();
    this.homePageCategoriesBlock.getByRole('link', { name: homePageCategoryBlock, exact: true }).click();
    
  }

  async mainMenySearchDistance({ distance }: { distance: string }) {
    await this.distanceComboBox.selectOption(distance);
    const searchDistanceFrom = await this.page.getByLabel('Kies afstand:').locator('option:checked').textContent();
    await this.submitButton.click();

    await this.page.waitForTimeout(2000);

    return searchDistanceFrom ?? '';
  }
}
