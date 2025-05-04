import { Page, expect } from '@playwright/test';

export class MapSearchPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.marktplaats.nl/map/kijkinjewijk/');
  }

  async searchByText(input: string) {
    const searchInput = this.page.getByRole('combobox', { name: 'Dropdown zoekbalk' });
    await searchInput.fill('');
    await searchInput.pressSequentially(input);
    await this.page.getByRole('button', { name: 'Zoek' }).click();
  }

  async clickOnMap(x: number, y: number) {
    const map = this.page.locator('div[style*="position: absolute"][style*="height"]');
    await map.nth(0).click({ position: { x, y } });
  }
}
