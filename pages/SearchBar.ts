import { Page } from '@playwright/test';

export class SearchBar {
  constructor(private page: Page) {}

  async searchFor(query: string) {
    await this.page.getByRole('img', { name: 'Marktplaats Start' }).click();
    const input = this.page.getByRole('combobox', { name: 'Dropdown zoekbalk' });
    await input.pressSequentially(query);
    await this.page.getByRole('button', { name: 'Zoek' }).click();
    await this.page.waitForTimeout(2000);
  }
}
