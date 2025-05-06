import { Page, expect } from '@playwright/test';

export class ListingDetailsPage {
  constructor(private page: Page) {}

  async assertLocation(city: string) {
    const locator = this.page.locator('div.SellerInfo-section button', { hasText: city });
    await expect.soft(locator).toHaveText(city, { timeout: 5000 });
  }

  async getTitle() {
    return await this.page.locator('h1.Listing-title').textContent();
  }

  async getPriceValue() {
    const price = await this.page.locator('.Listing-price').textContent();
    const match = price?.match(/€\s*([\d.,]+),-/);
    return match ? parseFloat(match[1]) : null;
  }

  async getCategoryText() {
    return await this.page.locator('.Breadcrumbs-root a').nth(1).innerText();
  }
}
