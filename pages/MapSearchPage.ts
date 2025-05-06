import { Page } from '@playwright/test';

export class MapSearchPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.marktplaats.nl/map/kijkinjewijk/');
  }

  async fillSearchKeyword(keyword: string) {
    await this.page.getByRole('combobox', { name: 'Dropdown zoekbalk' }).fill(keyword);
  }

  async fillPostcode(postcode: string) {
    const input = this.page.getByRole('textbox', { name: 'Postcode' });
    await input.clear();
    await input.pressSequentially(postcode, { delay: 200 });
  }

  async selectDistance(distance: string) {
    await this.page.getByLabel('Kies afstand:').selectOption(distance);
  }

  async selectCategory(value: string) {
    await this.page.getByLabel('Kies categorie:').selectOption(value);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Zoek' }).click();
  }

  async search({ keyword, postcode, distance, category }: {
    keyword: string,
    postcode: string,
    distance: string,
    category: string
  }) {
    await this.fillSearchKeyword(keyword);
    await this.fillPostcode(postcode);
    await this.selectDistance(distance);
    await this.selectCategory(category);
    await this.submit();
    await this.page.waitForTimeout(2000);
  }
}
