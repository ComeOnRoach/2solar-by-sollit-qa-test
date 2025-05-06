import { Page } from '@playwright/test';

export class CategoryPage {
  constructor(private page: Page) {}

  async selectCarModel({ l2, model }: { l2: string, model: string }) {
    await this.page.locator('#l2CategoryId').selectOption(l2);
    await this.page.locator('#model').selectOption(model);
  }

  async getSelectedModelText(): Promise<string> {
    return await this.page.locator('#model option:checked').textContent() || '';
  }

  async selectMaxPrice(value: string) {
    await this.page.locator('#PriceCents\\.to').selectOption(value);
  }

  async getSelectedPrice(): Promise<number> {
    const text = await this.page.locator('#PriceCents\\.to option:checked').textContent();
    return parseInt(text?.replace(/\D/g, '') || '0', 10);
  }

  async selectSearchDistance(value: string) {
    await this.page.getByRole('combobox', {name: 'Kies afstand:'}).selectOption(value);
  }

  async getSelectedDistance(): Promise<number> {
    const text = await this.page.getByLabel('Kies afstand:').locator('option:checked').textContent();
    return parseInt(text?.replace(/\D/g, '') || '0', 10);
  }

  async submitSearch() {
    await this.page.getByRole('button', { name: /auto/i }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('button', { name: 'Zoek', exact: true }).click();
    await this.page.waitForTimeout(2000);
  }
}
