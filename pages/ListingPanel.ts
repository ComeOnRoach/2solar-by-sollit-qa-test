import { Page, expect } from '@playwright/test';

export class ListingPanel {
  constructor(private page: Page) {}

  async expectResultsVisible() {
    const results = this.page.locator('div.Sidebar-container a');
    await expect(results.first()).toBeVisible({ timeout: 10000 });
  }
}
