import { Page, expect } from '@playwright/test';

export class ListingPanel {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async getListings() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('.AdsList-adContainer', { timeout: 10000 });

    const items = this.page.locator('.AdsList-adContainer');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
    return { items, count };
  }

  async clickLastListing() {
    const { items, count } = await this.getListings();
    const last = items.nth(count - 1);
    await last.scrollIntoViewIfNeeded();
    const text = await last.innerText();
    const popup = this.page.waitForEvent('popup');
    await last.click();
    return { text, popup };
  }

  async expectResultsVisible() {
    const results = this.page.locator('div.Sidebar-container a');
    await expect(results.first()).toBeVisible({ timeout: 10000 });
  }
}
