import { Page, Locator, expect } from '@playwright/test';

export class CarSearchResultsPage {
  constructor(private page: Page) {}

  async expectResultsVisible() {
    await expect(this.page.locator('.hz-Listing--list-item-cars').first()).toBeVisible({ timeout: 5000 });
  }

  async getAllResults(): Promise<Locator[]> {
    return await this.page.locator('.hz-Listing--list-item-cars').all();
  }

  async getTitle(item: Locator): Promise<string> {
    return (await item.locator('h3').textContent())?.trim() || '';
  }

  async getPrice(item: Locator): Promise<number> {
    const text = await item.locator('.hz-Listing-price-extended-details').innerText();
    return parseInt(text.replace(/\D/g, '') || '0', 10);
  }

  async getDistance(item: Locator): Promise<number> {
    const text = await item.locator('.hz-Listing-sellerDistance').innerText();
    return parseInt(text.replace(/\D/g, '') || '0', 10);
  }
}
